"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { cn } from "../../lib/utils";
import { useMinecraftAuthStore } from "../../store/minecraft-auth-store";
import { RunningInstancesIndicator } from "../process/RunningInstancesIndicator";
import { CurrentAccountDisplay } from "../account/CurrentAccountDisplay";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { MinecraftAccountManager } from "../account/MinecraftAccountManager";
import { IconButton } from "../ui/buttons/IconButton";
import { useSocialsModalStore } from "../../store/socials-modal-store";
import { useFriendsStore } from "../../store/friends-store";
import { Icon } from "@iconify/react";
import { NotificationBell } from "./NotificationBell";
import { useThemeStore } from "../../store/useThemeStore";

interface UserProfileBarProps {
  className?: string;
}

export function UserProfileBar({ className }: UserProfileBarProps) {
  const { t } = useTranslation();
  const profileButtonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { initializeAccounts } = useMinecraftAuthStore();
  const accountCount = useMinecraftAuthStore((s) => s.accounts.length);
  const [_, setMounted] = useState(false);
  const { openModal: openSocialsModal } = useSocialsModalStore();
  const { toggleSidebar: toggleFriendsSidebar } = useFriendsStore();
  const macWindowControls = useThemeStore((state) => state.macWindowControls);

  useEffect(() => {
    setMounted(true);
    initializeAccounts();
    return () => setMounted(false);
  }, [initializeAccounts]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".profile-bar-container", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // Removing the last account hands the screen over to the welcome gate. That
  // gate has to render below this dropdown (it opens the browser-login modal
  // itself, so it sits under the modal layer, while the dropdown portals above
  // it), so an open dropdown would be left floating over the sign-in screen —
  // an account manager for zero accounts. Close it instead.
  useEffect(() => {
    if (accountCount === 0) setIsAccountDropdownOpen(false);
  }, [accountCount]);

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsAccountDropdownOpen(false);
  };

  return (
    <div className={cn("relative flex items-center gap-3", className)}>
      <div className="profile-bar-container flex items-center gap-2">
        <IconButton
          icon={<Icon icon="solar:users-group-rounded-linear" className="w-5 h-5" />}
          onClick={() => {
            // Settings schließen wenn Friends öffnet
            import("../../store/settings-modal-store").then(({ useSettingsModalStore }) => {
              if (useSettingsModalStore.getState().isOpen) {
                useSettingsModalStore.getState().close();
              }
            });
            toggleFriendsSidebar();
          }}
          variant="flat"
          size="sm"
          aria-label={t('header.toggle_friends')}
          className="text-white/70 hover:text-white h-10 w-10"
        />
      </div>
    </div>
  );
}
