// Auth store provider and hook for accessing auth state throughout the app.
// Usage: wrap app with <AuthStoreProvider>, then use useAuthStore(selector) in components.

"use client";

import type React from "react";
import { createContext, useContext, useRef } from "react";

import { type StoreApi, useStore } from "zustand";

import type { AuthState } from "@/types/rbac";

import { createAuthStore } from "./auth-store";

const AuthStoreContext = createContext<StoreApi<AuthState> | null>(null);

export const AuthStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<StoreApi<AuthState> | null>(null);

  storeRef.current ??= createAuthStore();

  return <AuthStoreContext.Provider value={storeRef.current}>{children}</AuthStoreContext.Provider>;
};

/** Access auth state with a selector. Must be used inside AuthStoreProvider. */
export const useAuthStore = <T,>(selector: (state: AuthState) => T): T => {
  const store = useContext(AuthStoreContext);
  if (!store) throw new Error("Missing AuthStoreProvider");
  return useStore(store, selector);
};
