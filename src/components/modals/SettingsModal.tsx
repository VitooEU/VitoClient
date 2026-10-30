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
          background: "linear-gradient(180deg, rgba(16, 18, 25, 0.96) 0%, rgba(12, 13, 18, 0.98) 100%)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "-12px 0 40px rgba(0, 0, 0, 0.7), inset 1px 0 0 rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        }}
      >
        {isOpen && <SettingsTab onClose={close} />}
      </div>
    </>
  );
}
