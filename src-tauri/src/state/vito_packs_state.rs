use crate::config::{ProjectDirsExt, LAUNCHER_DIRECTORY};
use crate::error::Result;
use crate::integrations::vito_packs::VitoModpacksConfig;
use crate::minecraft::api::vito_api::VitoApi;
use crate::state::post_init::PostInitializationHandler;
use async_trait::async_trait;
use log::{debug, error, info, trace};
use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;
use tokio::fs;
use tokio::sync::Mutex;
use tokio::sync::RwLock;

// Default filename for the Vito packs configuration
const VITO_PACKS_FILENAME: &str = "vito_modpacks.json";

/// Returns the path for the vito packs config depending on experimental mode
pub fn vito_packs_path_for(is_experimental: bool) -> PathBuf {
    let filename = if is_experimental {
        "vito_modpacks_exp.json"
    } else {
        VITO_PACKS_FILENAME
    };
    LAUNCHER_DIRECTORY.root_dir().join(filename)
}

pub struct VitoPackManager {
    config: Arc<RwLock<VitoModpacksConfig>>,
    config_path: PathBuf,
    save_lock: Mutex<()>,
}

impl VitoPackManager {
    /// Creates a new VitoPackManager instance, loading the configuration from the specified path.
    /// If the file doesn't exist, it initializes with a default empty configuration.
    pub fn new(config_path: PathBuf) -> Result<Self> {
        trace!(
            "VitoPackManager: Initializing with path: {:?} (config loading deferred)",
            config_path
        );
        Ok(Self {
            config: Arc::new(RwLock::new(VitoModpacksConfig::default())),
            config_path,
            save_lock: Mutex::new(()),
        })
    }

    /// Loads the Vito packs configuration from a JSON file.
    /// Returns a default empty config if the file doesn't exist or cannot be parsed.
    async fn load_config_internal(&self, path: &PathBuf) -> Result<VitoModpacksConfig> {
        if !path.exists() {
            info!(
                "Vito packs config file not found at {:?}, using default empty config.",
                path
            );
            return Ok(VitoModpacksConfig {
                packs: HashMap::new(),
                repositories: HashMap::new(),
            });
        }

        let data = fs::read_to_string(path).await?;

        match serde_json::from_str(&data) {
            Ok(config) => Ok(config),
            Err(e) => {
                error!("Failed to parse vito_modpacks.json at {:?}: {}. Returning default empty config.", path, e);
                Ok(VitoModpacksConfig {
                    packs: HashMap::new(),
                    repositories: HashMap::new(),
                })
            }
        }
    }

    /// Fetches the latest Vito packs configuration from the API and updates the local state.
    /// Saves the updated configuration to the file on success.
    pub async fn fetch_and_update_config(
        &self,
        vito_token: &str,
        is_experimental: bool,
    ) -> Result<()> {
        info!("Fetching latest Vito packs config from API...");

        match VitoApi::get_modpacks(vito_token, is_experimental).await {
            Ok(new_config) => {
                debug!(
                    "Successfully fetched {} packs definitions from API.",
                    new_config.packs.len()
                );
                {
                    // Scope for the write lock
                    let mut config_guard = self.config.write().await;
                    *config_guard = new_config;
                } // Write lock released here

                // Save the newly fetched config
                match self.save_config().await {
                    Ok(_) => {
                        info!("Successfully updated and saved Vito packs config from API.");
                        Ok(())
                    }
                    Err(e) => {
                        error!("Fetched config from API, but failed to save it: {}", e);
                        Err(e) // Return the save error
                    }
                }
            }
            Err(e) => {
                error!("Failed to fetch Vito packs config from API: {}", e);
                Err(e) // Return the fetch error
            }
        }
    }

    /// Saves the current configuration back to the JSON file.
    async fn save_config(&self) -> Result<()> {
        let _guard = self.save_lock.lock().await;

        let config_data = {
            // Limit the scope of the read lock
            let config_guard = self.config.read().await;
            serde_json::to_string_pretty(&*config_guard)?
        }; // Read lock is released here

        // Choose path based on experimental mode if available; fall back to manager's path
        let path_to_write = if let Ok(state) = crate::state::state_manager::State::get().await {
            let is_exp = state.config_manager.is_experimental_mode().await;
            vito_packs_path_for(is_exp)
        } else {
            self.config_path.clone()
        };

        if let Some(parent_dir) = path_to_write.parent() {
            if !parent_dir.exists() {
                fs::create_dir_all(parent_dir).await?;
                info!(
                    "Created directory for vito packs config: {:?}",
                    parent_dir
                );
            }
        }

        fs::write(&path_to_write, config_data).await?;
        info!(
            "Successfully saved vito packs config to {:?}",
            path_to_write
        );
        Ok(())
    }

    /// Returns a clone of the entire current VitoModpacksConfig.
    pub async fn get_config(&self) -> VitoModpacksConfig {
        self.config.read().await.clone()
    }

    /// Updates the entire configuration and saves it to the file.
    pub async fn update_config(&self, new_config: VitoModpacksConfig) -> Result<()> {
        {
            let mut config_guard = self.config.write().await;
            *config_guard = new_config;
        }
        self.save_config().await // Save the updated config (already handles locking)
    }

    /// Prints the current configuration to the console for debugging.
    #[allow(dead_code)] // Allow unused function for debugging purposes
    pub async fn print_current_config(&self) {
        let _config_guard = self.config.read().await;
        println!("--- Current Vito Packs Config ---");
       //println!("{:#?}", *config_guard); // Use pretty-print debug format
       //match config_guard.print_resolved_packs() {
       //    Ok(_) => (),
       //    Err(e) => error!("Failed to print resolved packs: {}", e),
       //}
        println!("--- End Vito Packs Config ---");
    }

    // Add more specific accessor methods if needed, e.g.:
    // pub async fn get_pack_definition(&self, pack_id: &str) -> Option<VitoPackDefinition> { ... }
    // pub async fn get_repository_url(&self, repo_ref: &str) -> Option<String> { ... }
}

#[async_trait]
impl PostInitializationHandler for VitoPackManager {
    async fn on_state_ready(&self, _app_handle: Arc<tauri::AppHandle>) -> Result<()> {
        trace!("VitoPackManager: on_state_ready called. Loading configuration...");
        // Select load path based on experimental mode if accessible
        let load_path = if let Ok(state) = crate::state::state_manager::State::get().await {
            let is_exp = state.config_manager.is_experimental_mode().await;
            vito_packs_path_for(is_exp)
        } else {
            self.config_path.clone()
        };
        let loaded_config = self.load_config_internal(&load_path).await?;
        let pack_count = loaded_config.packs.len();
        let mut config_guard = self.config.write().await;
        *config_guard = loaded_config;
        drop(config_guard);
        info!("VitoPackManager: {} packs loaded from {:?}", pack_count, load_path);
        Ok(())
    }
}

/// Returns the default path for the vito_modpacks.json file within the launcher directory.
pub fn default_vito_packs_path() -> PathBuf {
    LAUNCHER_DIRECTORY.root_dir().join(VITO_PACKS_FILENAME)
}
