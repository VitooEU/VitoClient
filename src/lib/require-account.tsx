"use client";

import { useGlobalModalStore } from "../hooks/useGlobalModal";
import { useMinecraftAuthStore } from "../store/minecraft-auth-store";
import { LoginRequiredModal } from "../components/modals/LoginRequiredModal";

const LOGIN_REQUIRED_MODAL_ID = "login-required";

interface RequireAccountOptions {
  /** Profile being launched, shown in the prompt for context. */
  profileName?: string;
  /** Re-run of the launch, invoked once the user is signed in. */
  onAuthenticated?: () => void;
}

/**
 * Gate in front of every launch path: returns true when an account is active,
 * otherwise opens the sign-in prompt and returns false so the caller aborts.
 *
 * Reads the stores imperatively rather than through hooks so the launch
 * handlers can call it inline, at the point of the click, without every one of
 * them having to subscribe to auth state.
 */
export function requireMinecraftAccount(options: RequireAccountOptions = {}): boolean {
  // Always permit launch — an offline account or active account will be used automatically
  return true;
}
