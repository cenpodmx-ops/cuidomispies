"use client";

import { useState } from "react";
import { useStore, formatMXN } from "@/lib/store";
import { useCatalog, findKit } from "@/lib/use-catalog";
import { KitCard } from "../KitCard";
import { Button } from "@/components/ui/button";
import { StarRating } from "../StarRating";
import {
  ChevronLeft,
  ShoppingCart,
  Check,
  Layers,
  Sparkles,
  ArrowRight,
  Truck,
  ShieldCheck,
  Stethoscope,
  Minus,
  Plus,
  ListChecks,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function KitView({ slug }: { slug: string }) {
  const navigate = useStore((s) => s.navigate);
  const addToCart = useStore((s) => s.addToCart);
  const { data: catalog } = useCatalog();

  const kit = catalog?.kits.find((k) => k.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!kit) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Kit no encontrado.</p>
        <Button onClick={() => navigate({ name: "home" })} className="mt-4">
          Volver al inicio
        </Button>
      </div>
    );
  }

  const category = catalog?.categories.find((c) => c.id === kit.categoryId);
  const relatedKits =
    catalog?.kits.filter((k) => k.categoryId === kit.categoryId && k.id !== kit.id).slice(0, 3) ?? [];

  const handleAdd = () => {
    addToCart(
      {
        id: kit.id,
        kind: "kit",
        slug: kit.slug,
        title: kit.title,
        price: kit.price,
        image: kit.items[0]?.product.images[0] ?? "/products/placeholder.svg",
        items: kit.items.map((it) => ({ title: it.product.title, stepLabel: it.stepLabel })),
      },
      quantity
    );
    setAdded(true);
    toast.success("Kit añadido al carrito", {
      description: kit.title,
    });
    setTimeout(() => setAdded(false), 1800);
  };

  const savings = kit.compareAtPrice ? kit.compareAtPrice - kit.price : 0;

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
          <span className="font-medium text-foreground line-clamp-1">{kit.title}</span>
        </div>
      </div>

      {/* Hero del kit */}
      <section className="bg-gradient-to-br from-cmp-teal to-cmp-teal-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Info */}
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Layers size={13} /> {kit.routineName}
              </span>
              <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                {kit.title}
              </h1>
              <p className="text-lg text-white/85">{kit.shortBenefit}</p>
              <p className="text-sm text-white/70">{kit.routineSummary}</p>

              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-display text-3xl font-bold">{formatMXN(kit.price)}</span>
                {kit.compareAtPrice && (
                  <span className="text-lg text-white/60 line-through">
                    {formatMXN(kit.compareAtPrice)}
                  </span>
                )}
                {savings > 0 && (
                  <span className="rounded-full bg-cmp-amber px-2.5 py-0.5 text-xs font-bold text-white">
                    {kit.savingsLabel}
                  </span>
                )}
              </div>

              <StarRating rating={kit.rating} size={16} />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 rounded-xl border border-white/20 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
                    aria-label="Reducir cantidad"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <Button
                  size="lg"
                  variant="secondary"
                  className={cn(
                    "flex-1 text-base",
                    added ? "bg-cmp-sage text-cmp-graphite hover:bg-cmp-sage" : "bg-white text-cmp-teal hover:bg-cmp-ivory"
                  )}
                  onClick={handleAdd}
                >
                  {added ? (
                    <><Check size={18} className="mr-1" /> Añadido</>
                  ) : (
                    <><ShoppingCart size={18} className="mr-1" /> Añadir kit — {formatMXN(kit.price * quantity)}</>
                  )}
                </Button>
              </div>
            </div>

            {/* Composición visual */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {kit.items.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => navigate({ name: "product", slug: item.product.slug })}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur transition-all hover:border-white/40",
                      i % 2 === 1 && "mt-6"
                    )}
                  >
                    <img src={item.product.images[0]} alt={item.product.title} className="aspect-square w-full" />
                    <div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-cmp-sage text-xs font-bold text-cmp-graphite">
                      {item.stepNumber}
                    </div>
                    <div className="p-2 text-center">
                      <p className="text-xs font-semibold leading-tight line-clamp-2">{item.product.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pasos de la rutina */}
      <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cmp-teal">
            Rutina explicada
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground">
            Cómo usar este kit
          </h2>
          <p className="mt-2 text-muted-foreground">
            No son solo productos juntos: cada paso tiene un propósito.
          </p>
        </div>

        {/* Steps timeline */}
        <div className="space-y-4">
          {kit.items.map((item, idx) => (
            <div
              key={item.id}
              className="relative flex gap-4 rounded-2xl border border-border bg-card p-5"
            >
              {/* Conector */}
              {idx < kit.items.length - 1 && (
                <div className="absolute left-[3.25rem] top-full h-4 w-0.5 bg-border" />
              )}
              {/* Número / imagen */}
              <div className="relative shrink-0">
                <div className="h-16 w-16 overflow-hidden rounded-xl border-2 border-cmp-teal/30 bg-muted/30">
                  <img src={item.product.images[0]} alt={item.product.title} className="h-full w-full object-cover" />
                </div>
                <span className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-cmp-teal text-xs font-bold text-white">
                  {item.stepNumber}
                </span>
              </div>
              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-cmp-teal">
                      {item.stepLabel}
                    </p>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {item.product.title}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-xs"
                    onClick={() => navigate({ name: "product", slug: item.product.slug })}
                  >
                    Ver producto <ArrowRight size={12} />
                  </Button>
                </div>
                {/* Step description from kit.steps */}
                {kit.steps[idx] && (
                  <p className="mt-1.5 text-sm text-muted-foreground">{kit.steps[idx].description}</p>
                )}
                {/* Benefits del producto */}
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                  {item.product.benefits.slice(0, 2).map((b, i) => (
                    <li key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Check size={11} className="text-cmp-teal" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Cómo combinar */}
        <div className="mt-8 rounded-2xl border border-cmp-teal/20 bg-cmp-teal/5 p-5">
          <div className="mb-2 flex items-center gap-2">
            <ListChecks size={18} className="text-cmp-teal" />
            <h3 className="font-display text-base font-bold text-foreground">Cómo combinar los productos</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{kit.howToCombine}</p>
        </div>
      </section>

      {/* Comprar por separado */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-border bg-accent/30 p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <Info size={18} className="text-cmp-teal" />
            <h2 className="font-display text-lg font-bold text-foreground">
              ¿Prefieres comprar por separado?
            </h2>
          </div>
          <p className="mb-5 text-sm text-muted-foreground">
            Estos son los productos que componen el kit. Comprar el kit te ahorra{" "}
            <strong className="text-cmp-teal">{formatMXN(savings)}</strong>.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {kit.items.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate({ name: "product", slug: item.product.slug })}
                className="group flex flex-col rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-cmp-teal/40 hover:shadow-sm"
              >
                <div className="mb-2 aspect-square overflow-hidden rounded-lg bg-muted/30">
                  <img src={item.product.images[0]} alt={item.product.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <p className="text-xs font-semibold leading-snug line-clamp-2">{item.product.title}</p>
                <p className="mt-1 text-sm font-bold text-cmp-teal">{formatMXN(item.product.price)}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Truck, label: "Envío a todo México", text: "2-5 días hábiles" },
            { icon: ShieldCheck, label: "Compra segura", text: "Pago protegido" },
            { icon: Stethoscope, label: "Respaldo profesional", text: "Orientación disponible" },
            { icon: Sparkles, label: "Rutina con QR", text: "Instrucciones postventa" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <item.icon size={22} className="mx-auto mb-1.5 text-cmp-teal" />
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kits relacionados */}
      {relatedKits.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
          <h2 className="mb-5 font-display text-xl font-bold text-foreground">
            Otras rutinas que te pueden interesar
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedKits.map((k) => (
              <KitCard key={k.id} kit={k} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
