"use client";

import { cn } from "@/lib/utils";
import { useStore, formatMXN } from "@/lib/store";
import type { Product } from "@/lib/types/catalog";
import { StarRating } from "./StarRating";
import { CmpBadge } from "./Badge";
import { PriceTag } from "./PriceTag";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ProductCard({
  product,
  className,
  compact = false,
}: {
  product: Product;
  className?: string;
  compact?: boolean;
}) {
  const navigate = useStore((s) => s.navigate);
  const addToCart = useStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      kind: "product",
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0] ?? "/products/placeholder.svg",
      presentation: product.presentation,
    });
    setAdded(true);
    toast.success("Añadido al carrito", { description: product.title });
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      onClick={() => navigate({ name: "product", slug: product.slug })}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-cmp-teal/5 hover:border-cmp-teal/30",
        className
      )}
    >
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <div className="absolute left-3 top-3">
            <CmpBadge variant={product.badge}>{product.badge}</CmpBadge>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-sm font-semibold leading-snug text-foreground line-clamp-2">
            {product.title}
          </h3>
        </div>

        {!compact && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.shortBenefit}
          </p>
        )}

        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} showNumber reviewCount={product.reviewCount} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          <button
            onClick={handleAdd}
            aria-label={`Añadir ${product.title} al carrito`}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all",
              added
                ? "bg-cmp-sage text-cmp-graphite"
                : "bg-cmp-teal text-white hover:bg-cmp-teal-dark active:scale-95"
            )}
          >
            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </article>
  );
}
