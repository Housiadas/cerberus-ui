"use client";

import type * as React from "react";

import type { SimpleIcon } from "simple-icons";

import { cn } from "@/lib/utils";

type SimpleIconProps = {
  icon: SimpleIcon;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export function SimpleIconEle({ icon, className, ...props }: SimpleIconProps) {
  const { title, path } = icon;

  return (
    <svg
      viewBox="0 0 24 24"
      aria-label={title}
      aria-hidden="false"
      focusable="false"
      className={cn("size-5 fill-foreground", className)}
      {...props}
    >
      <title>{title}</title>
      <path d={path} />
    </svg>
  );
}
