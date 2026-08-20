"use client";

import { useStore } from "@/lib/store";
import { Truck, ShieldCheck, CreditCard, Headphones, Instagram, Facebook } from "lucide-react";

export function Footer() {
  const navigate = useStore((s) => s.navigate);

  return (
    <footer className="mt-auto border-t border-border bg-cmp-graphite text-white/80">
      {/* Trust bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 md:grid-cols-4">
          {[
            { icon: Truck, title: "Envíos a todo México", text: "Entregas en 2-5 días hábiles" },
            { icon: ShieldCheck, title: "Compra segura", text: "Pago encriptado y protegido" },
            { icon: CreditCard, title: "Múltiples pagos", text: "Tarjeta, transferencia, efectivo" },
            { icon: Headphones, title: "Atención profesional", text: "Resolvemos tus dudas" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <item.icon size={22} className="shrink-0 text-cmp-sage" />
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-white/60">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Comprar */}
          <div>
            <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">
              Comprar
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate({ name: "category", slug: "hongos" })} className="hover:text-cmp-sage">
                  Hongos
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ name: "category", slug: "diabetes" })} className="hover:text-cmp-sage">
                  Diabetes
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ name: "category", slug: "piel-seca-talones" })} className="hover:text-cmp-sage">
                  Piel seca y talones
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ name: "category", slug: "sudor-mal-olor" })} className="hover:text-cmp-sage">
                  Sudor y olor
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ name: "category", slug: "juanetes-dedos" })} className="hover:text-cmp-sage">
                  Juanetes y dedos
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ name: "routine-finder" })} className="font-semibold text-cmp-sage hover:text-white">
                  Encuentra tu rutina
                </button>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">
              Ayuda
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-cmp-sage" href="#">Preguntas frecuentes</a></li>
              <li><a className="hover:text-cmp-sage" href="#">Envíos y entregas</a></li>
              <li><a className="hover:text-cmp-sage" href="#">Devoluciones</a></li>
              <li><a className="hover:text-cmp-sage" href="#">Métodos de pago</a></li>
              <li>
                <button onClick={() => navigate({ name: "asesoria" })} className="font-semibold text-cmp-sage hover:text-white">
                  Asesoría profesional
                </button>
              </li>
            </ul>
          </div>

          {/* CuidoMisPies */}
          <div>
            <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">
              CuidoMisPies
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-cmp-sage" href="#">Sobre nosotros</a></li>
              <li><a className="hover:text-cmp-sage" href="#">Aprende</a></li>
              <li><a className="hover:text-cmp-sage" href="#">Compromiso profesional</a></li>
              <li><a className="hover:text-cmp-sage" href="#">Contacto</a></li>
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">
              Recibe consejos y promociones
            </h4>
            <p className="mb-3 text-xs text-white/60">
              Rutinas, novedades y ofertas. Sin spam.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Tu correo"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-cmp-sage focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-cmp-sage px-3 py-2 text-sm font-semibold text-cmp-graphite transition-colors hover:bg-cmp-sage-light"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} CuidoMisPies. Soluciones para cada paso.</p>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-white/80" href="#">Aviso de privacidad</a>
            <a className="hover:text-white/80" href="#">Términos y condiciones</a>
            <a className="hover:text-white/80" href="#">Política de envíos</a>
          </div>
        </div>

        {/* Disclaimer regulatorio */}
        <p className="mt-4 text-[11px] leading-relaxed text-white/40">
          Los productos de este sitio no sustituyen valoración profesional. Las recomendaciones del quiz
          no constituyen un diagnóstico. Ante dolor, lesiones, diabetes o condiciones persistentes,
          consulta a un profesional de la salud. COFEPRIS: la publicidad de insumos para la salud
          puede requerir autorización.
        </p>
      </div>
    </footer>
  );
}
