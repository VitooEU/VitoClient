"use client";

import { useSettingsModalStore } from "../../store/settings-modal-store";
import { useThemeStore } from "../../store/useThemeStore";
import { SettingsTab } from "../tabs/SettingsTab";
import { cn } from "../../lib/utils";

export function SettingsModal() {
  const { isOpen, close } = useSettingsModalStore();
  const accentColor = useThemeStore((state) => state.accentColor);

  return (
    <>
      {/* Blur Backdrop — identisch zu FriendsSidebar (z-40 backdrop, z-50 panel) */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={close}
      />

      {/* Settings Panel — gleiche Slide-Animation & gleiches Design wie FriendsSidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full flex flex-col z-[1000]",
          "w-[90%] max-w-5xl",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          background: `linear-gradient(180deg, ${accentColor.value}45 0%, ${accentColor.value}25 30%, ${accentColor.value}30 100%)`,
          borderLeft: `2px solid ${accentColor.value}60`,
          boxShadow: `inset 0 0 120px ${accentColor.value}20, -5px 0 30px rgba(0,0,0,0.6)`,
          backdropFilter: "blur(16px)",
        }}
      >
        {isOpen && <SettingsTab onClose={close} />}
      </div>
    </>
  );
}
