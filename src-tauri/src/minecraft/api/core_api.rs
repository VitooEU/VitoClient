use crate::{
    error::Result,
    minecraft::dto::afkpoints::{AfkPointsBalance, DailyClaimResult, DailyClaimState},
    minecraft::dto::vito_user::VitoUserMinimal,
    utils::http_client::{vtc_get, vtc_post},
};
use serde::Deserialize;
use uuid::Uuid;

#[derive(Deserialize)]
struct ApplixirSessionResponse {
    token: String,
}

pub struct CoreApi;

impl CoreApi {
    pub fn new() -> Self {
        Self
    }

    pub fn get_api_base(is_experimental: bool) -> &'static str {
        if is_experimental {
            "https://api-staging.norisk.gg/api/v1/core"
        } else {
            "https://api.norisk.gg/api/v1/core"
        }
    }

    pub async fn get_minimal_user_info(
        &self,
        vito_token: &str,
        target_uuid: &Uuid,
        requester_uuid: &Uuid,
        is_experimental: bool,
    ) -> Result<VitoUserMinimal> {
        let url = format!("{}/user/info/{}", Self::get_api_base(is_experimental), target_uuid);

        vtc_get(&url)
            .query(&[("uuid", requester_uuid.to_string())])
            .bearer(vito_token)
            .json::<VitoUserMinimal>("Minimal user info")
            .await
    }

    pub async fn mint_applixir_session(
        &self,
        vito_token: &str,
        is_experimental: bool,
    ) -> Result<String> {
        let url = format!("{}/applixir/session", Self::get_api_base(is_experimental));
        let session = vtc_get(&url)
            .bearer(vito_token)
            .json::<ApplixirSessionResponse>("AppLixir session")
            .await?;
        Ok(session.token)
    }

    pub async fn get_afkpoints_balance(
        &self,
        vito_token: &str,
        is_experimental: bool,
    ) -> Result<AfkPointsBalance> {
        let url = format!("{}/afkpoints/balance", Self::get_api_base(is_experimental));
        vtc_get(&url)
            .bearer(vito_token)
            .json::<AfkPointsBalance>("AFK Points balance")
            .await
    }

    pub async fn get_daily_claim_state(
        &self,
        vito_token: &str,
        is_experimental: bool,
    ) -> Result<DailyClaimState> {
        let url = format!("{}/afkpoints/daily", Self::get_api_base(is_experimental));
        vtc_get(&url)
            .bearer(vito_token)
            .json::<DailyClaimState>("AFK daily state")
            .await
    }

    pub async fn claim_daily(
        &self,
        vito_token: &str,
        is_experimental: bool,
    ) -> Result<DailyClaimResult> {
        let url = format!("{}/afkpoints/daily/claim", Self::get_api_base(is_experimental));
        vtc_post(&url)
            .bearer(vito_token)
            .json::<DailyClaimResult>("AFK daily claim")
            .await
    }
}

impl Default for CoreApi {
    fn default() -> Self {
        Self::new()
    }
}
