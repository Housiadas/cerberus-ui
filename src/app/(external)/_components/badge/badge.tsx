import { ComponentProps } from "react";

export function Badge({ title }: ComponentProps<"span">) {
  return (
    <div className="inline-flex items-center space-x-2 rounded-full border border-[oklch(0.6723_0.1606_244.9955)]/20 bg-[oklch(0.6723_0.1606_244.9955)]/10 px-4 py-2">
      <span className="text-sm text-[oklch(0.6723_0.1606_244.9955)]">{title}</span>
    </div>
  );
}
