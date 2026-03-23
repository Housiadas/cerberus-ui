// Initialize MSW in browser + dev mode only.

export const initMocks = async (): Promise<void> => {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "development") return;

  const { worker } = await import("./browser");
  await worker.start({ onUnhandledRequest: "bypass" });
};
