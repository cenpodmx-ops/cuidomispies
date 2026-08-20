"use client";

import { cn } from "@/lib/utils";
import { formatMXN } from "@/lib/store";

export function PriceTag({
  price,
  compareAtPrice,
  size = "md",
  className,
}: {
  price: number;
  compareAtPrice?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discount = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const sizeCls = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  }[size];

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn("font-bold text-foreground", sizeCls)}>
        {formatMXN(price)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-sm text-muted-foreground line-through">
            {formatMXN(compareAtPrice!)}
          </span>
          <span className="rounded bg-cmp-teal/10 px-1.5 py-0.5 text-[11px] font-bold text-cmp-teal">
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
}
