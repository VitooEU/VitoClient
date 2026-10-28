"use client";

import { useMinecraftAuthStore } from "../../../store/minecraft-auth-store";
import { PlayerHead } from "../../common/PlayerHead";
import { Button } from "../../ui/buttons/Button";
import { Icon } from "@iconify/react";
import { useAddMinecraftAccount } from "../../../hooks/useAddMinecraftAccount";
import { useTranslation } from "react-i18next";

export function AccountsSettingsTab() {
  const { t } = useTranslation();
  const { accounts, activeAccount, setActiveAccount, removeAccount, isLoading } = useMinecraftAuthStore();
  const { startLogin: handleAddAccount } = useAddMinecraftAccount();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white font-minecraft">Accounts</h3>
          <p className="text-sm text-white/60">Verwalte deine Minecraft Accounts, Namen und Details.</p>
        </div>
        <Button
          onClick={handleAddAccount}
          disabled={isLoading}
          icon={<Icon icon="solar:user-plus-bold" className="w-5 h-5" />}
          size="sm"
        >
          Account hinzufügen
        </Button>
      </div>

      <div className="space-y-3">
        {accounts.map((acc) => {
          const isActive = activeAccount?.id === acc.id;
          return (
            <div
              key={acc.id}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                isActive
                  ? "bg-white/[0.08] border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                  : "bg-white/[0.03] border-white/10 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center gap-4">
                <PlayerHead
                  uuid={acc.id}
                  username={acc.minecraft_username || acc.username}
                  size={48}
                  className="rounded-lg shadow"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-white font-minecraft">
                      {acc.minecraft_username || acc.username}
                    </span>
                    {isActive && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                        AKTIV
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-white/50 font-mono mt-0.5">
                    UUID: {acc.id}
                  </span>
                  <span className="text-xs text-white/40">
                    Status: {acc.access_token === "offline" ? "Offline Account" : "Microsoft / Online"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isActive && (
                  <Button
                    variant="flat"
                    size="sm"
                    onClick={() => setActiveAccount(acc.id)}
                  >
                    Auswählen
                  </Button>
                )}
                <button
                  onClick={() => removeAccount(acc.id)}
                  className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Account entfernen"
                >
                  <Icon icon="solar:trash-bin-trash-bold" className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}

        {accounts.length === 0 && (
          <div className="p-8 text-center text-white/50 border border-dashed border-white/10 rounded-xl">
            Keine Accounts gefunden. Füge einen hinzu!
          </div>
        )}
      </div>
    </div>
  );
}
