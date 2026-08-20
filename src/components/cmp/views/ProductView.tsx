"use client";

import { useState } from "react";
import { useStore, formatMXN } from "@/lib/store";
import { useCatalog, productsByIds, findKit } from "@/lib/use-catalog";
import { StarRating } from "../StarRating";
import { CmpBadge } from "../Badge";
import { PriceTag } from "../PriceTag";
import { ProductCard } from "../ProductCard";
import { KitCard } from "../KitCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronLeft,
  ShoppingCart,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  Stethoscope,
  PackageCheck,
  Sparkles,
  AlertCircle,
  Info,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProductView({ slug }: { slug: string }) {
  const navigate = useStore((s) => s.navigate);
  const addToCart = useStore((s) => s.addToCart);
  const { data: catalog } = useCatalog();

  const product = catalog?.products.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Producto no encontrado.</p>
        <Button onClick={() => navigate({ name: "home" })} className="mt-4">
          Volver al inicio
        </Button>
      </div>
    );
  }

  const category = catalog?.categories.find((c) => c.id === product.categoryId);
  const crossSellProducts = productsByIds(catalog, product.crossSellIds).filter(
    (p) => p.id !== product.id
  );
  const relatedKits = catalog?.kits.filter((k) =>
    k.items.some((it) => it.product.id === product.id)
  ) ?? [];

  const handleAdd = () => {
    addToCart(
      {
        id: product.id,
        kind: "product",
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: product.images[0],
        presentation: product.presentation,
      },
      quantity
    );
    setAdded(true);
    toast.success("Añadido al carrito", {
      description: `${quantity} × ${product.title}`,
    });
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 text-sm sm:px-6">
          <button onClick={() => navigate({ name: "home" })} className="text-muted-foreground hover:text-foreground">
            Inicio
          </button>
          <ChevronLeft size={14} className="rotate-180 text-muted-foreground" />
          {category && (
            <button
              onClick={() => navigate({ name: "category", slug: category.slug })}
              className="text-muted-foreground hover:text-foreground"
            >
              {category.name}
            </button>
          )}
          <ChevronLeft size={14} className="rotate-180 text-muted-foreground" />
          <span className="font-medium text-foreground line-clamp-1">{product.title}</span>
        </div>
      </div>

      {/* PDP principal */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Galería */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
              {product.badge && (
                <div className="absolute left-4 top-4 z-10">
                  <CmpBadge variant={product.badge}>{product.badge}</CmpBadge>
                </div>
              )}
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="aspect-square w-full"
              />
            </div>
            {/* Thumbnails (solo si hay varias, aquí simulamos con el mismo) */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "h-16 w-16 overflow-hidden rounded-lg border-2",
                      activeImage === i ? "border-cmp-teal" : "border-border"
                    )}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Compra */}
          <div className="space-y-5">
            <div className="space-y-3">
              {category && (
                <button
                  onClick={() => navigate({ name: "category", slug: category.slug })}
                  className="text-xs font-bold uppercase tracking-wider text-cmp-teal hover:underline"
                >
                  {category.name}
                </button>
              )}
              <h1 className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                {product.title}
              </h1>
              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} size={16} showNumber reviewCount={product.reviewCount} />
              </div>
              <p className="text-base text-muted-foreground">{product.shortBenefit}</p>
            </div>

            <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />

            {/* Presentación + activo */}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-foreground">
                <PackageCheck size={14} className="text-cmp-teal" /> {product.presentation}
              </span>
              {product.activeIngredient && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-foreground">
                  <Info size={14} className="text-cmp-teal" /> {product.activeIngredient}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-foreground">
                <Sparkles size={14} className="text-cmp-teal" /> {product.careLevel}
              </span>
            </div>

            {/* Cantidad + CTA */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 rounded-xl border border-border p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent"
                  aria-label="Reducir cantidad"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent"
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button
                size="lg"
                className={cn(
                  "flex-1 text-base",
                  added ? "bg-cmp-sage text-cmp-graphite hover:bg-cmp-sage" : "bg-cmp-teal hover:bg-cmp-teal-dark"
                )}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <Check size={18} className="mr-1" /> Añadido
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} className="mr-1" /> Añadir — {formatMXN(product.price * quantity)}
                  </>
                )}
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-accent/40 p-3 sm:grid-cols-4">
              {[
                { icon: Truck, label: "Envío a todo México" },
                { icon: ShieldCheck, label: "Compra segura" },
                { icon: RotateCcw, label: "Devoluciones" },
                { icon: CreditCard, label: "Múltiples pagos" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1 text-center">
                  <item.icon size={18} className="text-cmp-teal" />
                  <span className="text-[11px] font-medium text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bloques de información (Beneficios, Uso, Seguridad, etc.) */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Beneficios */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cmp-teal/10">
                <Check size={18} className="text-cmp-teal" />
              </span>
              <h2 className="font-display text-base font-bold text-foreground">Beneficios</h2>
            </div>
            <ul className="space-y-2">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check size={15} className="mt-0.5 shrink-0 text-cmp-teal" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Cómo usarlo */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cmp-sage/30">
                <Info size={18} className="text-cmp-teal" />
              </span>
              <h2 className="font-display text-base font-bold text-foreground">Cómo usarlo</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.howToUse}</p>
            {product.routineStep && (
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-cmp-sage/20 px-2 py-1 text-xs font-medium text-cmp-teal">
                <Sparkles size={12} /> {product.routineStep}
              </span>
            )}
          </div>

          {/* Seguridad */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
                <AlertCircle size={18} className="text-amber-600" />
              </span>
              <h2 className="font-display text-base font-bold text-foreground">Seguridad</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-foreground">Precauciones</p>
                <p className="text-muted-foreground">{product.precautions}</p>
              </div>
              <div className="border-t border-amber-200 pt-3">
                <p className="flex items-center gap-1.5 font-semibold text-cmp-teal">
                  <Stethoscope size={14} /> Cuándo pedir orientación
                </p>
                <p className="mt-1 text-muted-foreground">{product.whenToConsult}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kit relacionado */}
        {relatedKits.length > 0 && (
          <div className="mt-12">
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-cmp-teal">
                Completa tu rutina
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-foreground">
                Este producto forma parte de una rutina
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedKits.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))}
            </div>
          </div>
        )}

        {/* Cross-sell */}
        {crossSellProducts.length > 0 && (
          <div className="mt-12">
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-cmp-teal">
                También te puede interesar
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-foreground">
                Complementa tu cuidado
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {crossSellProducts.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        )}

        {/* Reseñas */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cmp-teal">
                  Reseñas verificadas
                </span>
                <h2 className="mt-1 font-display text-xl font-bold text-foreground">
                  Lo que dicen quienes lo usan
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size={18} />
                <span className="font-bold">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {product.reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cmp-teal/10 text-sm font-bold text-cmp-teal">
                        {review.authorName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{review.authorName}</p>
                        {review.isVerified && (
                          <span className="flex items-center gap-1 text-[11px] text-cmp-teal">
                            <Check size={10} /> Compra verificada
                          </span>
                        )}
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={14} />
                  </div>
                  <p className="font-semibold text-foreground text-sm">{review.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{review.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Descripción larga */}
        <div className="mt-12">
          <Accordion type="single" collapsible>
            <AccordionItem value="desc" className="rounded-xl border border-border bg-card px-4">
              <AccordionTrigger className="text-left font-display font-bold hover:no-underline">
                Descripción completa
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
