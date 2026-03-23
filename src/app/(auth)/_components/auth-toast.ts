// Shared toast classNames for auth pages — uses the primary background from the theme.
import type { ExternalToast } from "sonner";

export const authToastOptions: ExternalToast = {
  classNames: {
    toast: "!bg-primary !text-primary-foreground !border-primary",
    description: "!text-primary-foreground/80",
  },
};
