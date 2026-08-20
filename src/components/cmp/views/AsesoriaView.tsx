"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export function AsesoriaView() {
  const navigate = useStore((s) => s.navigate);

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm sm:px-6">
          <button onClick={() => navigate({ name: "home" })} className="text-muted-foreground hover:text-foreground">
            Inicio
          </button>
          <ArrowRight size={14} className="rotate-180 text-muted-foreground" />
          <span className="font-medium text-foreground">Asesoría</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cmp-graphite to-cmp-teal-dark text-white">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cmp-sage/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Stethoscope size={13} /> Asesoría profesional
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Te ayudamos a elegir
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
            Separamos la ayuda para elegir producto de la consulta profesional formal.
            Resolvemos tus dudas sobre el catálogo o te conectamos con orientación clínica.
          </p>
        </div>
      </section>

      {/* Dos tipos de asesoría */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Ayuda para elegir producto */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cmp-sage/30">
                <MessageCircle size={24} className="text-cmp-teal" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Ayuda para elegir producto
                </h2>
                <p className="text-xs text-muted-foreground">Dudas sobre el catálogo y kits</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              ¿No sabes cuál producto te conviene? Cuéntanos qué necesitas cuidar y te recomendamos
              la mejor opción o kit.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Recomendación de producto según necesidad",
                "Comparativa entre opciones",
                "Resolución de dudas de uso",
                "Respuesta en menos de 24h",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 size={15} className="shrink-0 text-cmp-teal" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-2">
              <Button className="bg-cmp-teal hover:bg-cmp-teal-dark">
                <MessageCircle size={16} className="mr-1" /> WhatsApp
              </Button>
              <Button variant="outline">
                <Mail size={16} className="mr-1" /> hola@cuidomispies.mx
              </Button>
            </div>
          </div>

          {/* Consulta profesional */}
          <div className="rounded-2xl border border-cmp-teal/20 bg-gradient-to-br from-cmp-teal/5 to-cmp-sage/10 p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cmp-teal/10">
                <Stethoscope size={24} className="text-cmp-teal" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Consulta profesional
                </h2>
                <p className="text-xs text-muted-foreground">Flujo clínico más estructurado</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Si presentas una condición particular, lesión o necesitas valoración, conectamos con
              orientación profesional especializada en cuidado del pie.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Valoración de tu caso",
                "Recomendación con respaldo clínico",
                "Seguimiento y ajuste de rutina",
                "Flujo con consentimiento y privacidad",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 size={15} className="shrink-0 text-cmp-teal" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Button className="bg-cmp-teal hover:bg-cmp-teal-dark">
                Solicitar consulta
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Horarios y contacto */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Clock, title: "Horario", text: "Lun a Vie, 9:00 – 18:00" },
            { icon: Phone, title: "Teléfono", text: "55 0000 0000" },
            { icon: Mail, title: "Correo", text: "hola@cuidomispies.mx" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <item.icon size={20} className="shrink-0 text-cmp-teal" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.title}
                </p>
                <p className="text-sm font-medium text-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Importante */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck size={22} className="mt-0.5 shrink-0 text-amber-600" />
            <div>
              <h3 className="font-display text-base font-bold text-foreground">
                Importante sobre la asesoría
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                La asesoría no sustituye una valoración clínica presencial. Ante dolor intenso,
                heridas, signos de infección o condiciones como diabetes con lesiones en el pie,
                recomendamos atención profesional presencial inmediata.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                No compartimos tus datos de salud con terceros ni con plataformas de publicidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA quiz */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6">
        <div className="rounded-2xl bg-cmp-beige/40 p-6 text-center sm:p-8">
          <Sparkles size={28} className="mx-auto mb-3 text-cmp-teal" />
          <h2 className="font-display text-xl font-bold text-foreground">
            ¿Prefieres empezar por tu cuenta?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Usa nuestro quiz y encuentra una rutina en 4 preguntas.
          </p>
          <Button
            className="mt-4 bg-cmp-teal hover:bg-cmp-teal-dark"
            onClick={() => navigate({ name: "routine-finder" })}
          >
            <Sparkles size={16} className="mr-1" /> Empezar quiz
          </Button>
        </div>
      </section>
    </div>
  );
}
