"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  ShieldAlert,
  Stethoscope,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";
import { ProductCard } from "../ProductCard";
import { KitCard } from "../KitCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type QuizResult =
  | {
      type: "routine";
      title: string;
      message: string;
      products: any[];
      kit: any | null;
      allKits: any[];
      suggestGuidance: boolean;
      guidanceNote: string | null;
    }
  | {
      type: "guidance";
      title: string;
      message: string;
      recommendations: { primary: string; secondary: string };
      safetyNote: string;
    }
  | null;

export function RoutineFinderView() {
  const navigate = useStore((s) => s.navigate);
  const [questions, setQuestions] = useState<any[]>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/routine-finder")
      .then((r) => r.json())
      .then((d) => setQuestions(d.questions))
      .catch(() => toast.error("No se pudieron cargar las preguntas"));
  }, []);

  const totalSteps = questions.length;
  const current = questions[step];
  const isLast = step === totalSteps - 1;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);

    if (isLast) {
      submit(newAnswers);
    } else {
      setTimeout(() => setStep((s) => s + 1), 200);
    }
  };

  const submit = async (finalAnswers: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await fetch("/api/routine-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      toast.error("No pudimos procesar tu respuesta. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  // ─── Pantalla de resultado ───
  if (result) {
    return (
      <div className="flex flex-col">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-background">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm sm:px-6">
            <button onClick={() => navigate({ name: "home" })} className="text-muted-foreground hover:text-foreground">
              Inicio
            </button>
            <ChevronLeft size={14} className="rotate-180 text-muted-foreground" />
            <span className="font-medium text-foreground">Encuentra tu rutina</span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
          {/* Header del resultado */}
          <div
            className={cn(
              "rounded-3xl border p-8 text-center",
              result.type === "guidance"
                ? "border-amber-300 bg-amber-50"
                : "border-cmp-teal/30 bg-gradient-to-br from-cmp-teal/5 to-cmp-sage/10"
            )}
          >
            <div
              className={cn(
                "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full",
                result.type === "guidance" ? "bg-amber-100" : "bg-cmp-teal/10"
              )}
            >
              {result.type === "guidance" ? (
                <ShieldAlert size={32} className="text-amber-600" />
              ) : (
                <Check size={32} className="text-cmp-teal" />
              )}
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {result.title}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{result.message}</p>
          </div>

          {/* Resultado guidance (seguridad) */}
          {result.type === "guidance" && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start gap-3">
                  <Stethoscope size={24} className="shrink-0 text-cmp-teal" />
                  <div>
                    <h2 className="font-display text-lg font-bold text-foreground">
                      {result.recommendations.primary}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.recommendations.secondary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                  <p className="text-sm text-foreground/80">{result.safetyNote}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-cmp-teal hover:bg-cmp-teal-dark"
                  onClick={() => navigate({ name: "asesoria" })}
                >
                  <Stethoscope size={18} className="mr-1" /> Solicitar asesoría
                </Button>
                <Button size="lg" variant="outline" onClick={restart}>
                  <RotateCcw size={16} className="mr-1" /> Volver a empezar
                </Button>
              </div>
            </div>
          )}

          {/* Resultado rutina */}
          {result.type === "routine" && (
            <div className="mt-8 space-y-8">
              {/* Kit recomendado */}
              {result.kit && (
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-cmp-teal" />
                    <h2 className="font-display text-xl font-bold text-foreground">
                      Rutina recomendada
                    </h2>
                  </div>
                  <KitCard kit={result.kit} />
                </div>
              )}

              {/* Sugerencia de orientación */}
              {result.suggestGuidance && result.guidanceNote && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-600" />
                    <div>
                      <p className="font-semibold text-foreground">Considera orientación profesional</p>
                      <p className="text-sm text-muted-foreground">{result.guidanceNote}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => navigate({ name: "asesoria" })}
                      >
                        Solicitar asesoría
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Productos sugeridos */}
              {result.products.length > 0 && (
                <div>
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">
                    Productos para empezar
                  </h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {result.products.map((p: any) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* Otros kits */}
              {result.allKits.length > 1 && (
                <div>
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">
                    Otras rutinas disponibles
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {result.allKits
                      .filter((k: any) => k.id !== result.kit?.id)
                      .map((k: any) => (
                        <KitCard key={k.id} kit={k} />
                      ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <Button variant="outline" onClick={restart}>
                  <RotateCcw size={16} className="mr-1" /> Volver a hacer el quiz
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Pantalla de quiz (preguntas) ───
  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm sm:px-6">
          <button onClick={() => navigate({ name: "home" })} className="text-muted-foreground hover:text-foreground">
            Inicio
          </button>
          <ChevronLeft size={14} className="rotate-180 text-muted-foreground" />
          <span className="font-medium text-foreground">Encuentra tu rutina</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cmp-teal/20 bg-cmp-teal/5 px-3 py-1 text-xs font-semibold text-cmp-teal">
            <Sparkles size={13} /> Encuentra tu rutina
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            No necesitas saber qué producto buscar.
          </h1>
          <p className="mt-2 text-muted-foreground">
            Dinos qué quieres cuidar y te recomendamos una rutina en {totalSteps} preguntas.
          </p>
        </div>

        {/* Progress */}
        {questions.length > 0 && (
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Pregunta {step + 1} de {totalSteps}
              </span>
              <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cmp-sage to-cmp-teal transition-all duration-300"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Pregunta */}
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-cmp-teal/20 border-t-cmp-teal" />
            <p className="text-sm text-muted-foreground">Preparando tu recomendación…</p>
          </div>
        ) : current ? (
          <div className="animate-fade-up rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground">{current.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{current.help}</p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {current.options.map((opt: any) => {
                const selected = answers[current.id] === opt.value;
                const isSafety = current.id === "safety" && opt.value !== "no";
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={cn(
                      "group flex items-center justify-between gap-3 rounded-xl border p-4 text-left transition-all",
                      selected
                        ? "border-cmp-teal bg-cmp-teal/5"
                        : "border-border hover:border-cmp-teal/40 hover:bg-accent",
                      isSafety && "border-amber-200 hover:border-amber-300 hover:bg-amber-50/50"
                    )}
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                      {isSafety && <AlertTriangle size={16} className="shrink-0 text-amber-600" />}
                      {opt.label}
                    </span>
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                        selected ? "border-cmp-teal bg-cmp-teal" : "border-border group-hover:border-cmp-teal/40",
                        isSafety && selected && "border-amber-500 bg-amber-500"
                      )}
                    >
                      {selected && <Check size={12} className="text-white" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Nota de seguridad */}
            {current.id === "safety" && (
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3">
                <ShieldAlert size={16} className="mt-0.5 shrink-0 text-amber-600" />
                <p className="text-xs text-foreground/70">
                  Si marcas alguna de estas señales, te derivaremos a orientación profesional en lugar de
                  recomendarte productos. El quiz no diagnostica.
                </p>
              </div>
            )}

            {/* Navegación */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Atrás
              </button>
              {step < totalSteps - 1 && (
                <button
                  onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  Saltar <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="h-12 w-12 mx-auto animate-spin rounded-full border-4 border-cmp-teal/20 border-t-cmp-teal" />
            <p className="mt-4 text-sm text-muted-foreground">Cargando preguntas…</p>
          </div>
        )}

        {/* Disclaimer */}
        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
          El quiz no constituye un diagnóstico médico. Ante dolor, lesiones, diabetes o condiciones
          persistentes, consulta a un profesional de la salud. Tus respuestas no se envían a terceros.
        </p>
      </div>
    </div>
  );
}
