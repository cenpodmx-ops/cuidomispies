"use client";

import { cn } from "@/lib/utils";

const variants = {
  "Más vendido": "bg-cmp-teal text-white",
  Recomendado: "bg-cmp-sage text-cmp-graphite",
  Premium: "bg-cmp-graphite text-white",
  Descubrimiento: "bg-cmp-amber text-white",
  Nuevo: "bg-cmp-teal-light text-white",
  default: "bg-muted text-muted-foreground",
};

export function CmpBadge({
  children,
  variant,
  className,
}: {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}) {
  const cls = variants[variant as keyof typeof variants] ?? variants.default;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        cls,
        className
      )}
    >
      {children}
    </span>
  );
}
