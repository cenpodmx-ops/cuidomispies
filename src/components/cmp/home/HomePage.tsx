"use client";

import { useStore } from "@/lib/store";
import { useCatalog } from "@/lib/use-catalog";
import { ProductCard } from "../ProductCard";
import { KitCard } from "../KitCard";
import { NeedCard } from "../NeedCard";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Stethoscope,
  HeartHandshake,
  ShieldCheck,
  Truck,
  Star,
  MessageCircle,
  BookOpen,
  CheckCircle2,
  Quote,
} from "lucide-react";

export function HomePage() {
  const navigate = useStore((s) => s.navigate);
  const { data: catalog } = useCatalog();

  const categories = catalog?.categories ?? [];
  const featuredKits = catalog?.kits.filter((k) => k.isFeatured) ?? [];
  const heroKit = catalog?.kits.find((k) => k.slug === "kit-antihongos-unas-calzado") ?? featuredKits[0];
  const allKits = catalog?.kits ?? [];
  const discoveryProducts =
    catalog?.products.filter((p) => p.isDiscoverable).slice(0, 4) ?? [];
  const bestsellers =
    catalog?.products.filter((p) => p.isBestseller).slice(0, 8) ?? [];
  const diabetesProducts =
    catalog?.products.filter((p) => p.needs.includes("diabetes")).slice(0, 3) ?? [];

  return (
    <div className="flex flex-col">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cmp-ivory via-white to-cmp-beige/30">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-cmp-sage/20 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cmp-teal/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-cmp-teal/20 bg-white/60 px-3 py-1 text-xs font-semibold text-cmp-teal backdrop-blur">
                <Sparkles size={13} /> Cuidado especializado del pie
              </span>
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Cuida tus pies
                <br />
                <span className="text-cmp-teal">como se merecen.</span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Productos especializados, kits y rutinas para las necesidades más comunes de tus pies.
                No necesitas saber qué producto buscar.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-cmp-teal text-base hover:bg-cmp-teal-dark"
                  onClick={() => navigate({ name: "routine-finder" })}
                >
                  Encontrar mi solución
                  <ArrowRight size={18} className="ml-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cmp-teal/30 text-base"
                  onClick={() => {
                    document.getElementById("necesidades")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explorar por necesidad
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Truck size={15} className="text-cmp-teal" /> Envíos a todo México
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-cmp-teal" /> Compra segura
                </span>
                <span className="flex items-center gap-1.5">
                  <Stethoscope size={15} className="text-cmp-teal" /> Respaldo profesional
                </span>
              </div>
            </div>

            {/* Visual hero */}
            <div className="relative">
              <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-md">
                    <img src="/products/hon-01.svg" alt="Solución antifúngica" className="aspect-square w-full" />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-md">
                    <img src="/products/sec-02.svg" alt="Urea 40" className="aspect-square w-full" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-md">
                    <img src="/products/jua-05.svg" alt="Tubo protector" className="aspect-square w-full" />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-md">
                    <img src="/products/dia-01.svg" alt="Calcetín diabetes" className="aspect-square w-full" />
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cmp-sage/30">
                      <HeartHandshake size={20} className="text-cmp-teal" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">+1,200 pies</p>
                      <p className="text-[11px] text-muted-foreground">cuidados con nosotros</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SELECTOR DE NECESIDADES */}
      <section id="necesidades" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cmp-teal">
            ¿Qué quieres cuidar?
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Ocho necesidades, soluciones claras
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Navega por lo que sientes, no por nombres técnicos. Cada necesidad tiene productos,
            kits y orientación pensados para ti.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((c) => (
            <NeedCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* 3. KIT HÉROE */}
      {heroKit && (
        <section className="bg-gradient-to-br from-cmp-teal to-cmp-teal-dark text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Sparkles size={13} /> Kit héroe de temporada
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                {heroKit.title}
              </h2>
              <p className="text-lg text-white/85">{heroKit.shortBenefit}</p>
              <div className="space-y-2">
                {heroKit.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cmp-sage text-sm font-bold text-cmp-graphite">
                      {item.stepNumber}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{item.product.title}</p>
                      <p className="text-xs text-white/70">{item.stepLabel}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-cmp-teal hover:bg-cmp-ivory"
                  onClick={() => navigate({ name: "kit", slug: heroKit.slug })}
                >
                  Ver rutina completa · ${heroKit.price} MXN
                </Button>
                <span className="text-sm text-white/80">{heroKit.savingsLabel}</span>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {heroKit.items.map((item, i) => (
                  <div
                    key={item.id}
                    className={`overflow-hidden rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur ${i % 2 === 1 ? "mt-6" : ""}`}
                  >
                    <img src={item.product.images[0]} alt={item.product.title} className="aspect-square w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. RUTINAS HECHAS MÁS SIMPLES (carrusel de kits) */}
      {allKits.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cmp-teal">
                Rutinas hechas más simples
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Kits que resuelven, no que suman
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Cada kit combina los productos correctos en una rutina con pasos claros.
                El valor está en la simplicidad.
              </p>
            </div>
            <Button variant="ghost" className="hidden shrink-0 sm:flex" onClick={() => navigate({ name: "home" })}>
              Ver todos <ArrowRight size={16} />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allKits.slice(0, 4).map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        </section>
      )}

      {/* 5. NO NECESITAS SABER QUÉ PRODUCTO BUSCAR */}
      <section className="bg-cmp-beige/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-cmp-teal">
                Encuentra tu rutina
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                No necesitas saber qué producto buscar.
              </h2>
              <p className="text-lg text-muted-foreground">
                Dinos qué quieres cuidar y te recomendamos una rutina en 4 preguntas.
                Si tu caso lo requiere, te derivamos a orientación profesional.
              </p>
              <ul className="space-y-2.5">
                {[
                  "4 preguntas, 1 minuto",
                  "Recomendación de productos y kit",
                  "Lógica de seguridad ante señales de riesgo",
                  "Sin diagnóstico: orientación, no remplazo profesional",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                    <CheckCircle2 size={18} className="shrink-0 text-cmp-teal" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="bg-cmp-teal hover:bg-cmp-teal-dark"
                onClick={() => navigate({ name: "routine-finder" })}
              >
                <Sparkles size={18} className="mr-1" /> Empezar quiz
              </Button>
            </div>
            <div className="relative">
              <div className="mx-auto max-w-sm space-y-3">
                {[
                  { q: "¿Qué zona quieres cuidar?", a: "Uñas", color: "bg-cmp-teal/10" },
                  { q: "¿Qué necesitas resolver?", a: "Hongos en uñas", color: "bg-cmp-sage/30" },
                  { q: "¿Tienes señales de riesgo?", a: "Ninguna", color: "bg-cmp-beige/60" },
                ].map((step, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border border-border bg-white p-4 shadow-sm ${i === 0 ? "ml-0" : i === 1 ? "ml-8" : "ml-4"}`}
                  >
                    <p className="text-xs text-muted-foreground">Pregunta {i + 1}</p>
                    <p className="text-sm font-semibold text-foreground">{step.q}</p>
                    <span className={`mt-2 inline-block rounded-md ${step.color} px-2 py-1 text-xs font-medium`}>
                      {step.a}
                    </span>
                  </div>
                ))}
                <div className={`ml-12 rounded-2xl border-2 border-cmp-teal bg-cmp-teal p-4 text-white shadow-lg`}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Resultado</p>
                  <p className="font-display text-base font-bold">Rutina recomendada</p>
                  <p className="text-sm text-white/80">Kit Antihongos — Uñas + Calzado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCTOS DESCUBRIMIENTO */}
      {discoveryProducts.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-cmp-teal">
              Productos que probablemente no sabías que existían
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Descubrimiento
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Soluciones discretas y muy útiles para necesidades cotidianas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {discoveryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 7. BLOQUE DIABETES */}
      <section className="bg-cmp-sage/15">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-cmp-teal/10 px-3 py-1 text-xs font-semibold text-cmp-teal">
                <HeartHandshake size={13} /> Cuidado del pie en diabetes
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                Cuidado preventivo que cambia el día a día
              </h2>
              <p className="text-lg text-muted-foreground">
                Hidratación, calcetines sin compresión y educación. Para personas con diabetes,
                la revisión diaria del pie es la mejor prevención.
              </p>
              <div className="rounded-xl border border-cmp-teal/20 bg-white p-4">
                <p className="text-sm font-semibold text-cmp-teal">
                  Ante cualquier lesión, cambio de color o pérdida de sensibilidad
                </p>
                <p className="text-sm text-muted-foreground">
                  Recomendamos orientación profesional antes de elegir un producto.
                </p>
              </div>
              <Button
                className="bg-cmp-teal hover:bg-cmp-teal-dark"
                onClick={() => navigate({ name: "category", slug: "diabetes" })}
              >
                Ver productos para diabetes <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {diabetesProducts.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. ASESORÍA PROFESIONAL */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-cmp-graphite to-cmp-teal-dark p-8 text-white sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cmp-sage/10 blur-3xl" />
          <div className="relative grid items-center gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Stethoscope size={13} /> Asesoría profesional
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                ¿No sabes cuál elegir?
              </h2>
              <p className="text-lg text-white/85">
                Podemos orientarte. Separamos la ayuda para elegir producto de la consulta
                profesional formal.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-cmp-graphite hover:bg-cmp-ivory"
                  onClick={() => navigate({ name: "asesoria" })}
                >
                  Solicitar asesoría
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => navigate({ name: "asesoria" })}
                >
                  <MessageCircle size={18} className="mr-1" /> WhatsApp
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Ayuda para elegir producto</p>
                <p className="text-xs text-white/70">
                  Dudas sobre el catálogo, recomendaciones y kits.
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Consulta profesional</p>
                <p className="text-xs text-white/70">
                  Flujo clínico más estructurado, con valoración.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. MÁS VENDIDOS */}
      {bestsellers.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cmp-teal">
                Lo que más cuida a nuestros clientes
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Más vendidos
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {bestsellers.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 10. CONTENIDO EDUCATIVO */}
      <section className="bg-cmp-beige/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-cmp-teal">Aprende</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Guías para cuidar mejor tus pies
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Urea 20, 40 y 60: no cumplen el mismo papel",
                excerpt: "La concentración de urea determina la intensidad del cuidado. Te explicamos cuándo usar cada una.",
                tag: "Piel seca",
                color: "bg-cmp-amber",
              },
              {
                title: "Por qué el cuidado de hongos también incluye el calzado",
                excerpt: "La rutina antifúngica no termina en la uña. El calzado es parte esencial.",
                tag: "Hongos",
                color: "bg-cmp-teal",
              },
              {
                title: "Qué buscar en un calcetín para pie diabético",
                excerpt: "Sin compresión, sin costuras, tejido suave. Detalles que importan.",
                tag: "Diabetes",
                color: "bg-cmp-sage",
              },
            ].map((article) => (
              <article
                key={article.title}
                className="group cursor-pointer rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md"
                onClick={() => navigate({ name: "asesoria" })}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${article.color} text-white`}>
                    <BookOpen size={18} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {article.tag}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold leading-snug text-foreground group-hover:text-cmp-teal">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cmp-teal">
                  Leer guía <ArrowRight size={12} />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. RESEÑAS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Lo que dicen quienes ya cuidan sus pies
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              author: "María G.",
              product: "Solución antifúngica para uñas",
              body: "Después de varias semanas de uso constante la uña mejora. El pincel facilita mucho la aplicación.",
            },
            {
              author: "Trabajador de pie",
              product: "Talonera de alto impacto",
              body: "Trabajo de pie 8 horas y esto cambia todo. El talón ya no me duele al final del día.",
            },
            {
              author: "José L.",
              product: "Calcetín para personas con diabetes",
              body: "No aprieta el tobillo y no tiene costuras que molesten. Mi pie sensible lo agradece.",
            },
          ].map((review, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <Quote size={24} className="mb-3 text-cmp-sage" />
              <p className="text-sm text-foreground leading-relaxed">&ldquo;{review.body}&rdquo;</p>
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cmp-teal/10 text-sm font-bold text-cmp-teal">
                  {review.author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{review.author}</p>
                  <p className="text-xs text-muted-foreground">{review.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. NEWSLETTER / WHATSAPP */}
      <section className="bg-cmp-teal text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Rutinas, consejos y promociones
              </h2>
              <p className="mt-1 text-white/80">
                Sin spam. Solo contenido útil para cuidar mejor tus pies.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                placeholder="tu@correo.com"
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-cmp-sage focus:outline-none"
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-cmp-sage text-cmp-graphite hover:bg-cmp-sage-light"
              >
                Suscribirme
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
