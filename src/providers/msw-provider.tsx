"use client";

import { type ReactNode, useEffect, useState } from "react";

export const MSWProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async (): Promise<void> => {
      const { initMocks } = await import("@/mocks");
      await initMocks();
      setReady(true);
    };

    init();
  }, []);

  if (!ready) return null;

  return children;
};
