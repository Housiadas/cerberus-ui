"use client";

import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

export const QueryProvider = ({ children }: { children: ReactNode }): ReactNode => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
