"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import type { Category } from "@/lib/types/catalog";
import { CategoryIcon } from "./icons";
import { ArrowRight } from "lucide-react";

export function NeedCard({
  category,
  className,
  variant = "grid",
}: {
  category: Category;
  className?: string;
  variant?: "grid" | "list";
}) {
  const navigate = useStore((s) => s.navigate);

  if (variant === "list") {
    return (
      <button
        onClick={() => navigate({ name: "category", slug: category.slug })}
        className="group flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-cmp-teal/40 hover:bg-accent/50"
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: category.accentColor + "20" }}
        >
          <CategoryIcon iconKey={category.iconKey} size={20} style={{ color: category.accentColor }} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{category.shortName}</p>
          <p className="text-xs text-muted-foreground truncate">{category.tagline}</p>
        </div>
        <ArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate({ name: "category", slug: category.slug })}
      className={cn(
        "group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-border bg-card p-5 text-left transition-all hover:shadow-md hover:shadow-cmp-teal/5 hover:-translate-y-0.5 hover:border-cmp-teal/40",
        className
      )}
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: category.accentColor + "20" }}
      >
        <CategoryIcon iconKey={category.iconKey} size={24} style={{ color: category.accentColor }} />
      </span>
      <div className="space-y-0.5">
        <h3 className="font-display text-sm font-bold leading-tight text-foreground">
          {category.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{category.tagline}</p>
      </div>
      <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-cmp-teal opacity-0 transition-opacity group-hover:opacity-100">
        Explorar <ArrowRight size={14} />
      </span>
    </button>
  );
}
