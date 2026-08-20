"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  size = 14,
  className,
  showNumber = false,
  reviewCount,
}: {
  rating: number;
  size?: number;
  className?: string;
  showNumber?: boolean;
  reviewCount?: number;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFull = i < full;
          const isHalf = i === full && hasHalf;
          return (
            <Star
              key={i}
              size={size}
              className={
                isFull || isHalf
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-muted-foreground/30"
              }
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-xs font-medium text-muted-foreground">
          {rating.toFixed(1)}
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
}
