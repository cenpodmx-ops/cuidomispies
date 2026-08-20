"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { useCatalog } from "@/lib/use-catalog";
import { Search, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchOverlay() {
  const isOpen = useStore((s) => s.searchOpen);
  const setOpen = useStore((s) => s.setSearchOpen);
  const navigate = useStore((s) => s.navigate);
  const { data: catalog } = useCatalog();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      // Reset query when closing using a microtask to avoid synchronous setState in effect
      Promise.resolve().then(() => setQuery(""));
    }
  }, [isOpen]);

  // Manejo de Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, setOpen]);

  const results = useMemo(() => {
    if (!catalog || query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return catalog.products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortBenefit.toLowerCase().includes(q) ||
          p.needs.some((n) => n.includes(q)) ||
          p.sku.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [catalog, query]);

  const needSuggestions = useMemo(() => {
    if (!catalog || query.trim().length > 0) return [];
    return catalog.categories.slice(0, 4);
  }, [catalog, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative mx-auto mt-20 w-full max-w-2xl px-4 animate-scale-in">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search size={20} className="text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué quieres cuidar hoy?"
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-cmp">
            {/* Sugerencias por necesidad */}
            {query.length === 0 && needSuggestions.length > 0 && (
              <div className="p-2">
                <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Explora por necesidad
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {needSuggestions.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => {
                        navigate({ name: "category", slug: c.slug });
                        setOpen(false);
                      }}
                      className="flex items-center justify-between rounded-lg p-2.5 text-left hover:bg-accent"
                    >
                      <span className="text-sm font-medium">{c.shortName}</span>
                      <ArrowRight size={14} className="text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Resultados */}
            {query.length > 0 && results.length > 0 && (
              <ul className="space-y-1">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => {
                        navigate({ name: "product", slug: p.slug });
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left hover:bg-accent"
                    >
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                        <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-snug line-clamp-1">{p.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{p.shortBenefit}</p>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Sin resultados */}
            {query.length > 1 && results.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No encontramos productos para &quot;{query}&quot;.
                </p>
                <button
                  onClick={() => {
                    navigate({ name: "routine-finder" });
                    setOpen(false);
                  }}
                  className="mt-3 text-sm font-semibold text-cmp-teal hover:underline"
                >
                  Prueba el quiz Encuentra tu rutina →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
