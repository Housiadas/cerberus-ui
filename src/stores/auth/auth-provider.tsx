// Auth store provider and hook for accessing auth state throughout the app.
// Usage: wrap app with <AuthStoreProvider>, then use useAuthStore(selector) in components.

"use client";

import type React from "react";
import { createContext, useContext, useEffect, useRef } from "react";

import { type StoreApi, useStore } from "zustand";

import { getSession } from "@/lib/api/session";
import type { AuthState } from "@/types/rbac";

import { createAuthStore, isTokenExpired } from "./auth-store";

const AuthStoreContext = createContext<StoreApi<AuthState> | null>(null);

export const AuthStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<StoreApi<AuthState> | null>(null);

  storeRef.current ??= createAuthStore();

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    const { accessToken, refreshToken } = getSession();
    if (accessToken && refreshToken && !isTokenExpired(accessToken)) {
      store.getState().setTokens(accessToken, refreshToken);
    }
    store.getState().setLoading(false);
  }, []);

  return <AuthStoreContext.Provider value={storeRef.current}>{children}</AuthStoreContext.Provider>;
};

/** Access auth state with a selector. Must be used inside AuthStoreProvider. */
export const useAuthStore = <T,>(selector: (state: AuthState) => T): T => {
  const store = useContext(AuthStoreContext);
  if (!store) throw new Error("Missing AuthStoreProvider");
  return useStore(store, selector);
};
