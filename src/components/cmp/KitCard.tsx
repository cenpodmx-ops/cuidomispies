"use client";

import { cn } from "@/lib/utils";
import { useStore, formatMXN } from "@/lib/store";
import type { Kit } from "@/lib/types/catalog";
import { StarRating } from "./StarRating";
import { Layers, ArrowRight } from "lucide-react";

export function KitCard({
  kit,
  className,
  variant = "default",
}: {
  kit: Kit;
  className?: string;
  variant?: "default" | "compact";
}) {
  const navigate = useStore((s) => s.navigate);

  return (
    <article
      onClick={() => navigate({ name: "kit", slug: kit.slug })}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-cmp-ivory to-white transition-all hover:shadow-lg hover:shadow-cmp-teal/10 hover:border-cmp-teal/40",
        className
      )}
    >
      {/* Header con composición */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cmp-teal to-cmp-teal-dark p-5 text-white">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-cmp-sage/20" />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm">
              <Layers size={12} /> Kit de rutina
            </span>
            {kit.isAnchor && (
              <span className="rounded-full bg-cmp-amber px-2.5 py-0.5 text-[11px] font-semibold text-white">
                Ancla
              </span>
            )}
          </div>
          <h3 className="font-display text-lg font-bold leading-tight">{kit.title}</h3>
          <p className="mt-1 text-sm text-white/80 line-clamp-2">{kit.shortBenefit}</p>
        </div>
      </div>

      {/* Composición (productos incluidos) */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {variant !== "compact" && (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Incluye {kit.items.length} productos
            </p>
            <ul className="space-y-1.5">
              {kit.items.slice(0, 4).map((item) => (
                <li key={item.id} className="flex items-center gap-2 text-xs text-foreground/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cmp-sage/30 text-[10px] font-bold text-cmp-teal">
                    {item.stepNumber}
                  </span>
                  <span className="truncate">{item.product.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold text-foreground">
                {formatMXN(kit.price)}
              </span>
              {kit.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatMXN(kit.compareAtPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-semibold text-cmp-teal">
              {kit.savingsLabel}
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-cmp-teal transition-transform group-hover:translate-x-0.5">
            Ver rutina <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}
