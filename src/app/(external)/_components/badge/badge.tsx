import type { ComponentProps } from "react";

export function Badge({ title }: ComponentProps<"span">) {
  return (
    <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
      <span className="text-primary text-sm">{title}</span>
    </div>
  );
}
