"use client";

import type React from "react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";

import { BottomNavbar } from "../navigation/BottomNavbar";
import { UserProfileBar } from ".././header/UserProfileBar";
import { NavigationHistory } from "../ui/NavigationHistory";
import { useThemeStore } from "../../store/useThemeStore";
import {
  BACKGROUND_EFFECTS,
  useBackgroundEffectStore,
} from "../../store/background-effect-store";
import { useQualitySettingsStore } from "../../store/quality-settings-store";
import { MatrixRainEffect } from ".././effects/MatrixRainEffect";
import { EnchantmentParticlesEffect } from ".././effects/EnchantmentParticlesEffect";
import { NebulaWaves } from ".././effects/NebulaWaves";
import { NebulaParticles } from ".././effects/NebulaParticles";
import { NebulaGrid } from ".././effects/NebulaGrid";
import { NebulaVoxels } from ".././effects/NebulaVoxels";
import { NebulaLightning } from ".././effects/NebulaLightning";
import { NebulaLiquidChrome } from ".././effects/NebulaLiquidChrome";
import { RetroGridEffect } from "../effects/RetroGridEffect";
import PlainBackground from "../effects/PlainBackground";
import CustomMediaBackground from "../effects/CustomMediaBackground";
import { Snowfall } from "../../features/snow-effect/Snowfall";
import { useSnowEffectStore } from "../../store/snow-effect-store";
import { useLauncherTheme } from "../../hooks/useLauncherTheme";
import * as ConfigService from "../../services/launcher-config-service";
import { SocialsModal } from "../modals/SocialsModal";
import { FriendsSidebar } from "../friends/FriendsSidebar";
// TODO: Re-enable when WebSocket is stable
// import { useFriendsWebSocket } from "../../hooks/useFriendsWebSocket";
import { useFriendsStore } from "../../store/friends-store";
import { useClipsStore } from "../../store/clips-store";
import { closeClipEditorThen } from "../../services/clip-service";
import { useChatStore } from "../../store/chat-store";
import { checkUpdateAvailable, downloadAndInstallUpdate } from "../../services/vtc-service";
import type { UpdateInfo } from "../../types/updater";
import { ProfileWizardV2Modal } from "../modals/ProfileWizardV2Modal";
import { ProfileSettingsModal } from "../modals/ProfileSettingsModal";
import { SettingsModal } from "../modals/SettingsModal";
import { ProfileDuplicateModal } from "../modals/ProfileDuplicateModal";
import { exit, relaunch } from '@tauri-apps/plugin-process';
import { Tooltip } from "../ui/Tooltip";
import { HeaderInfoCarousel } from "../header/HeaderInfoCarousel";
import { toast } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { parseErrorMessage } from "../../utils/error-utils";

const appConfig = {
  version: "v0.5.22",
};

interface AppLayoutProps {
  children: ReactNode;
  activeTab: string;
  onNavChange: (tabId: string) => void;
}

export function AppLayout({
  children,
  activeTab,
  onNavChange,
}: AppLayoutProps) {
  const { t } = useTranslation();
  const launcherRef = useRef<HTMLDivElement>(null);
  const backgroundPatternRef = useRef<HTMLDivElement>(null);
  const minimizeRef = useRef<HTMLDivElement>(null);
  const maximizeRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const { currentEffect, customMediaUrl, customMediaOnlyOnPlay, customMediaHideEffects } = useBackgroundEffectStore();
  const isCustomMediaVisible = Boolean(customMediaUrl) && (!customMediaOnlyOnPlay || activeTab === 'play');
  const shouldShowEffects = !(isCustomMediaVisible && customMediaHideEffects);

  const clipsEnabled = useClipsStore((state) => state.enabled);
  const refreshClips = useClipsStore((state) => state.refresh);

  useEffect(() => {
    void refreshClips();
  }, [refreshClips]);

  const navItems = [
    { id: "play", icon: "solar:play-bold", label: t("nav.play") },
    { id: "profiles", icon: "solar:user-id-bold", label: t("nav.profiles") },
    { id: "mods", icon: "solar:widget-bold", label: t("nav.mods") },
    { id: "skins", icon: "solar:emoji-funny-circle-bold", label: t("nav.skins") },
    { id: "capes", icon: "solar:shop-bold", label: t("nav.capes") },
    ...(clipsEnabled
      ? [{ id: "clips", icon: "solar:videocamera-record-bold", label: t("nav.clips") }]
      : []),
    // DISABLED: Advent Calendar (seasonal feature)
    // { id: "advent-calendar", icon: "solar:gift-bold", label: t("nav.advent") },
    { id: "settings", icon: "solar:settings-bold", label: t("nav.settings"), isAction: true },
  ];
  const { qualityLevel } = useQualitySettingsStore();
  const { isBackgroundAnimationEnabled, accentColor: themeAccentColor, accentColor } = useThemeStore();
  const { isEnabled: isSnowEnabled } = useSnowEffectStore();
  const { selectedTheme, isThemeActive } = useLauncherTheme();
  const { connectWebSocket, loadCurrentUser, loadFriends } = useFriendsStore();
  const { loadChats } = useChatStore();

  // TODO: Re-enable when WebSocket is stable
  // useFriendsWebSocket();

  useEffect(() => {
    const initFriends = async () => {
      try {
        await loadCurrentUser();
        await loadFriends();
        await loadChats();
        // TODO: Re-enable when WebSocket is stable
        // await connectWebSocket();
      } catch (e) {
        // Silently fail - user might not be logged in yet
      }
    };
    initFriends();
  }, []);

  const getComplementaryBackground = () => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : { r: 34, g: 34, b: 34 };
    };

    const rgb = hexToRgb(themeAccentColor.value);

    const darkR = Math.floor(rgb.r * 0.1);
    const darkG = Math.floor(rgb.g * 0.1);
    const darkB = Math.floor(rgb.b * 0.1);

    const finalR = Math.min(darkR, 30);
    const finalG = Math.min(darkG, 30);
    const finalB = Math.min(darkB, 30);

    return `rgb(${finalR}, ${finalG}, ${finalB})`;
  };

  const getComplementaryBackgroundWithAlpha = (alpha: number) => {
    const rgb = getComplementaryBackground();
    return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  };

  const backgroundColor = getComplementaryBackground();

  const getQualityParams = () => {
    switch (qualityLevel) {
      case "low":
        return { particleCount: 30, opacity: 0.2, speed: 0.5 };
      case "high":
        return { particleCount: 80, opacity: 0.4, speed: 1.5 };
      default:
        return { particleCount: 50, opacity: 0.3, speed: 1 };
    }
  };

  const qualityParams = getQualityParams();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(launcherRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
      });

      if (backgroundPatternRef.current) {
        gsap.to(backgroundPatternRef.current, {
          backgroundPosition: "100% 100%",
          duration: 120,
          repeat: -1,
          ease: "none",
        });
      }
    });

    const setupWindowControls = async () => {
      try {
        const tauriModule = await import("@tauri-apps/api/window").catch(
          () => null,
        );

        if (tauriModule) {
          const { Window } = tauriModule;
          const currentWindow = Window.getCurrent();

          if (minimizeRef.current) {
            minimizeRef.current.addEventListener("click", () =>
              currentWindow.minimize(),
            );
          }

          if (maximizeRef.current) {
            maximizeRef.current.addEventListener("click", () =>
              currentWindow.toggleMaximize(),
            );
          }

          if (closeRef.current) {
            closeRef.current.addEventListener("click", () =>
              closeClipEditorThen(() => exit(0)).catch(() => exit(0)),
            );
          }
        } else {
          console.log(
            "Tauri API not available, window controls will be decorative only",
          );
        }
      } catch (error) {
        console.error("Failed to initialize window controls:", error);
      }
    };

    setupWindowControls();

    return () => ctx.revert();
  }, []);

  const renderBackgroundEffect = () => {
    // Show theme background image only on play screen - override all other effects
    if (isThemeActive && selectedTheme?.backgroundImage && activeTab === "play") {
      return (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${selectedTheme.backgroundImage})`,
          }}
        />
      );
    }

    // Regular background effects for other tabs or when no theme background
    switch (currentEffect) {
      case BACKGROUND_EFFECTS.MATRIX_RAIN:
        return (
          <MatrixRainEffect
            speed={qualityParams.speed}
            opacity={qualityParams.opacity}
            forceEnable={false}
          />
        );
      case BACKGROUND_EFFECTS.ENCHANTMENT_PARTICLES:
        return (
          <EnchantmentParticlesEffect
            opacity={qualityParams.opacity}
            particleCount={qualityParams.particleCount}
            speed={qualityParams.speed}
            forceEnable={false}
          />
        );
      case BACKGROUND_EFFECTS.NEBULA_WAVES:
        return (
          <NebulaWaves
            opacity={qualityParams.opacity}
            speed={qualityParams.speed}
          />
        );
      case BACKGROUND_EFFECTS.NEBULA_PARTICLES:
        return (
          <NebulaParticles
            opacity={qualityParams.opacity}
            particleCount={qualityParams.particleCount}
            speed={qualityParams.speed}
          />
        );
      case BACKGROUND_EFFECTS.NEBULA_GRID:
        return (
          <NebulaGrid
            opacity={qualityParams.opacity}
            speed={qualityParams.speed}
            gridSize={30}
          />
        );
      case BACKGROUND_EFFECTS.NEBULA_VOXELS:
        return (
          <NebulaVoxels
            opacity={qualityParams.opacity}
            cubeCount={qualityParams.particleCount}
            speed={qualityParams.speed}
          />
        );
      case BACKGROUND_EFFECTS.NEBULA_LIGHTNING:
        return (
          <NebulaLightning
            opacity={qualityParams.opacity * 2}
            speed={qualityParams.speed}
            intensity={qualityParams.speed * 1.2}
            size={1.5}
          />
        );
      case BACKGROUND_EFFECTS.NEBULA_LIQUID_CHROME:
        return (
          <NebulaLiquidChrome
            opacity={qualityParams.opacity * 2}
            speed={qualityParams.speed * 0.2}
            amplitude={0.5}
            frequencyX={3}
            frequencyY={2}
          />
        );
      case BACKGROUND_EFFECTS.RETRO_GRID:
        const hexToRgbaWithLowOpacity = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, 0.05)`;
        };
        return (
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: hexToRgbaWithLowOpacity(themeAccentColor.value) }}
          ></div>
        );
      case BACKGROUND_EFFECTS.PLAIN_BACKGROUND:
        return <PlainBackground accentColorValue={themeAccentColor.value} />;
      default:
        return (
          <div className="absolute inset-0 bg-red-500/20">
            Unknown effect: {currentEffect}
          </div>
        );
    }
  };

  return (
    <div
      ref={launcherRef}
      className="h-screen w-full liquid-glass-shell overflow-hidden relative flex flex-col border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
      style={{
        backgroundColor: backgroundColor,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: isCustomMediaVisible 
          ? `linear-gradient(to bottom right, ${getComplementaryBackgroundWithAlpha(0.3)}, rgba(0,0,0,0.5))`
          : `linear-gradient(135deg, rgba(16, 20, 30, 0.94) 0%, rgba(8, 10, 16, 0.97) 100%)`,
      }}
    >
      <BorderGlowEffects accentColor={themeAccentColor.value} />

      <HeaderBar
        minimizeRef={minimizeRef}
        maximizeRef={maximizeRef}
        closeRef={closeRef}
      />

      <div className="flex-1 relative overflow-hidden flex flex-col">
        <CustomMediaBackground activeTab={activeTab} />
        {shouldShowEffects && renderBackgroundEffect()}
        {/* Snow overlay - independent of theme/background */}
        {shouldShowEffects && isSnowEnabled && <Snowfall />}

        <div className="relative z-10 flex-1 overflow-hidden custom-scrollbar pb-16">
          {children}
        </div>

        {/* Navigation Leiste - Unten in der Mitte */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center z-30 pointer-events-none">
          <BottomNavbar
            items={navItems}
            activeItem={activeTab}
            onItemClick={onNavChange}
          />
        </div>
      </div>
      {/* Global Modals Portal */}
      <SocialsModal />
      <ProfileWizardV2Modal />
      <ProfileSettingsModal />
      <SettingsModal />
      <ProfileDuplicateModal />
      <FriendsSidebar />
    </div>
  );
}

function BorderGlowEffects({ accentColor }: { accentColor: string }) {
  return (
    <>
      <div
        className="absolute top-0 left-0 right-0 h-[1px] z-50 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 5%, rgba(255, 255, 255, 0.22) 50%, transparent 95%)`,
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] z-50 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 10%, rgba(255, 255, 255, 0.06) 50%, transparent 90%)`,
        }}
      ></div>
    </>
  );
}

interface HeaderBarProps {
  minimizeRef: React.RefObject<HTMLDivElement>;
  maximizeRef: React.RefObject<HTMLDivElement>;
  closeRef: React.RefObject<HTMLDivElement>;
}

function HeaderBar({ minimizeRef, maximizeRef, closeRef }: HeaderBarProps) {
  const { t } = useTranslation();
  const accentColor = useThemeStore((state) => state.accentColor);
  const [appVersion, setAppVersion] = useState<string | null>(null);
  const [availableUpdate, setAvailableUpdate] = useState<UpdateInfo | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateClick = async () => {
    if (isUpdating) return; // Prevent multiple simultaneous downloads

    setIsUpdating(true);
    try {
      await toast.promise(
        downloadAndInstallUpdate(),
        {
          loading: t('header.update.downloading'),
          success: t('header.update.success'),
          error: (err) => t('header.update.failed', { error: parseErrorMessage(err) }),
        }
      );
    } catch (error) {
      console.error("Failed to download and install update:", error);
      // Toast error is already handled by the promise toast
    } finally {
      setIsUpdating(false);
    }
  };

  // Calculate complementary/update highlight color based on current accent
  const getUpdateHighlightColor = () => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : { r: 245, g: 158, b: 11 }; // fallback to amber
    };

    const rgb = hexToRgb(accentColor.value);

    // Calculate a complementary warning color
    // Mix current accent with amber/yellow for good visibility
    const accentWeight = 0.4; // How much of the accent color to include
    const warningWeight = 0.9; // How much of the warning color (amber)

    const warningRgb = { r: 245, g: 158, b: 100 }; // Amber base

    const mixedR = Math.round(rgb.r * accentWeight + warningRgb.r * warningWeight);
    const mixedG = Math.round(rgb.g * accentWeight + warningRgb.g * warningWeight);
    const mixedB = Math.round(rgb.b * accentWeight + warningRgb.b * warningWeight);

    return `rgb(${mixedR}, ${mixedG}, ${mixedB})`;
  };

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const fetchedVersion = await ConfigService.getAppVersion();
        setAppVersion(fetchedVersion);
      } catch (error) {
        console.error("Failed to fetch app version:", error);
        setAppVersion("?.?.?");
      }
    };

  const checkForUpdates = async () => {
    try {
      const updateInfo = await checkUpdateAvailable();
      if (updateInfo) {
        console.log("Update available:", updateInfo);
        setAvailableUpdate(updateInfo);
      }
    } catch (error) {
      console.error("Failed to check for updates:", error);
      // Don't show error to user, just silently fail
    }
  };

    fetchVersion();
    checkForUpdates();

    // Check for updates every 4 hours (4 * 60 * 60 * 1000 = 14,400,000 ms)
    const updateCheckInterval = setInterval(() => {
      console.log("Performing scheduled update check...");
      checkForUpdates();
    }, 4 * 60 * 60 * 1000);

    return () => {
      clearInterval(updateCheckInterval);
    };
  }, []);

  return (
    <div
      className="h-16 flex-shrink-0 liquid-glass-header flex items-center justify-between px-6 z-10"
      data-tauri-drag-region
    >
      <div className="flex items-center gap-4" data-tauri-drag-region>
        {/* Brand Logo - Ganz ganz oben links */}
        <div className="flex items-center gap-3 select-none" data-tauri-drag-region>
          <div className="p-1.5 rounded-xl bg-white/[0.06] border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.4)] flex items-center justify-center hover:scale-105 transition-transform">
            <img
              src="/vt.png"
              alt="VT Logo"
              className="w-8 h-8 object-contain rounded-lg select-none pointer-events-none drop-shadow"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2.5">
              <h1
                className="font-smallcaps text-2xl tracking-wider font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                data-tauri-drag-region
              >
                VitoClient
              </h1>
              {availableUpdate && (
                <Tooltip content={isUpdating ? t('header.update.tooltip_updating') : t('header.update.tooltip_available', { version: availableUpdate.version })}>
                  <div
                    className={isUpdating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    onClick={handleUpdateClick}
                  >
                    <Icon
                      icon={isUpdating ? "solar:download-minimalistic-bold" : "solar:download-minimalistic-bold"}
                      className={`w-6 h-6 transition-colors ${isUpdating ? 'animate-pulse' : ''}`}
                      style={{
                        color: accentColor.value,
                      }}
                    />
                  </div>
                </Tooltip>
              )}
            </div>
            <HeaderInfoCarousel version={appVersion} />
          </div>
        </div>

        <div className="h-6 w-[1px] bg-white/10 mx-1" />

        <NavigationHistory />
      </div>

      <div className="flex items-center gap-4">
        <UserProfileBar />

        <WindowControls
          minimizeRef={minimizeRef}
          maximizeRef={maximizeRef}
          closeRef={closeRef}
        />
      </div>
    </div>
  );
}

interface WindowControlsProps {
  minimizeRef: React.RefObject<HTMLDivElement>;
  maximizeRef: React.RefObject<HTMLDivElement>;
  closeRef: React.RefObject<HTMLDivElement>;
}

function WindowControls({
  minimizeRef,
  maximizeRef,
  closeRef,
}: WindowControlsProps) {
  const { t } = useTranslation();
  const macWindowControls = useThemeStore((state) => state.macWindowControls);

  if (macWindowControls) {
    return (
      <div className="flex items-center gap-2.5 ml-4 group">
        {/* macOS Close (Red) */}
        <div
          ref={closeRef}
          className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff3b30] border border-[#e0443e] flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-sm"
          title={t('window.close')}
        >
          <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/70 leading-none select-none transition-opacity">✕</span>
        </div>
        {/* macOS Minimize (Yellow) */}
        <div
          ref={minimizeRef}
          className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:bg-[#ffaa00] border border-[#dea123] flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-sm"
          title={t('window.minimize')}
        >
          <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-black/70 leading-none select-none transition-opacity">−</span>
        </div>
        {/* macOS Maximize (Green) */}
        <div
          ref={maximizeRef}
          className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-[#1fb334] border border-[#1aab29] flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-sm"
          title={t('window.maximize')}
        >
          <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/70 leading-none select-none transition-opacity">+</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 ml-4">
      <div
        ref={minimizeRef}
        className="titlebar-button-borderless w-5 h-5 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
        title={t('window.minimize')}
      >
        <Icon icon="pixel:minus-solid" className="w-4 h-4" />
      </div>
      <div
        ref={maximizeRef}
        className="titlebar-button-borderless w-5 h-5 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
        title={t('window.maximize')}
      >
        <Icon icon="pixel:expand-solid" className="w-4 h-4" />
      </div>
      <div
        ref={closeRef}
        className="titlebar-button-borderless w-5 h-5 flex items-center justify-center text-white/60 hover:text-red-500 transition-colors cursor-pointer"
        title={t('window.close')}
      >
        <Icon icon="pixel:window-close-solid" className="w-4 h-4" />
      </div>
    </div>
  );
}
