"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useCatalog, productsByCategory, kitsByCategory, faqsByCategory } from "@/lib/use-catalog";
import { ProductCard } from "../ProductCard";
import { KitCard } from "../KitCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sparkles, Stethoscope, ChevronLeft, Filter, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryView({ slug }: { slug: string }) {
  const navigate = useStore((s) => s.navigate);
  const { data: catalog } = useCatalog();
  const category = catalog?.categories.find((c) => c.slug === slug);
  const products = productsByCategory(catalog, slug);
  const kits = kitsByCategory(catalog, slug);
  const faqs = faqsByCategory(catalog, slug);

  // Sub-selector (por ejemplo uñas/piel/calzado para Hongos)
  const subselectorMap: Record<string, { value: string; label: string }[]> = {
    hongos: [
      { value: "all", label: "Todo" },
      { value: "uñas", label: "Uñas" },
      { value: "piel", label: "Piel" },
      { value: "calzado", label: "Calzado" },
    ],
    "piel-seca-talones": [
      { value: "all", label: "Todo" },
      { value: "diario", label: "Diario" },
      { value: "intensivo", label: "Intensivo" },
      { value: "extra", label: "Extra intensivo" },
    ],
  };
  const subselectors = subselectorMap[slug];
  const [filter, setFilter] = useState("all");

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Categoría no encontrada.</p>
        <Button onClick={() => navigate({ name: "home" })} className="mt-4">
          Volver al inicio
        </Button>
      </div>
    );
  }

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.needs.some((n) => n.includes(filter)) || p.careLevel.toLowerCase().includes(filter));

  const recommendedKit = kits.find((k) => k.isFeatured) ?? kits[0];
  const heroProduct = products.find((p) => p.isHero) ?? products[0];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm sm:px-6">
          <button onClick={() => navigate({ name: "home" })} className="text-muted-foreground hover:text-foreground">
            Inicio
          </button>
          <ChevronLeft size={14} className="rotate-180 text-muted-foreground" />
          <span className="font-medium text-foreground">{category.name}</span>
        </div>
      </div>

      {/* Category hero */}
      <section
        className="relative overflow-hidden border-b border-border"
        style={{
          background: `linear-gradient(135deg, ${category.accentColor}10, ${category.accentColor}25)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: category.accentColor + "20", color: category.accentColor }}
          >
            <Sparkles size={13} /> {category.tagline}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{category.description}</p>
        </div>
      </section>

      {/* Bloque educativo */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-border bg-accent/50 p-6 sm:p-8">
          <h2 className="mb-3 font-display text-lg font-bold text-foreground">
            Sobre {category.name.toLowerCase()}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {category.longText}
          </p>
        </div>
      </section>

      {/* Kit recomendado */}
      {recommendedKit && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
          <div className="rounded-2xl border border-cmp-teal/20 bg-gradient-to-br from-cmp-teal/5 to-cmp-sage/10 p-5 sm:p-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cmp-teal">
                  Rutina recomendada
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                  {recommendedKit.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{recommendedKit.shortBenefit}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {recommendedKit.items.map((item) => (
                    <span key={item.id} className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-foreground">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cmp-teal text-[9px] font-bold text-white">
                        {item.stepNumber}
                      </span>
                      {item.product.title}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                className="bg-cmp-teal hover:bg-cmp-teal-dark"
                onClick={() => navigate({ name: "kit", slug: recommendedKit.slug })}
              >
                Ver rutina <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Sub-selector + Grid de productos */}
      {products.length > 0 && (
        <section id="productos" className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Productos
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({filteredProducts.length})
              </span>
            </h2>
            {subselectors && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <Filter size={14} className="shrink-0 text-muted-foreground" />
                {subselectors.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setFilter(s.value)}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                      filter === s.value
                        ? "bg-cmp-teal text-white"
                        : "bg-accent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Kits de la categoría */}
      {kits.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            Kits y rutinas para {category.name.toLowerCase()}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kits.map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Asesoría */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-accent/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cmp-teal/10">
              <Stethoscope size={22} className="text-cmp-teal" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                ¿No estás seguro de qué elegir?
              </h3>
              <p className="text-sm text-muted-foreground">
                Solicita asesoría o usa el quiz para encontrar tu rutina.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate({ name: "routine-finder" })}>
              <Sparkles size={16} className="mr-1" /> Quiz
            </Button>
            <Button className="bg-cmp-teal hover:bg-cmp-teal-dark" onClick={() => navigate({ name: "asesoria" })}>
              Asesoría
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6">
          <h2 className="mb-6 text-center font-display text-2xl font-bold text-foreground">
            Preguntas frecuentes sobre {category.name.toLowerCase()}
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="overflow-hidden rounded-xl border border-border bg-card px-4"
              >
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </div>
  );
}
