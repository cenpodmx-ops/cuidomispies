"use client";

// Hook para cargar el catálogo completo una sola vez.
// Usa TanStack Query con staleTime alto porque el catálogo cambia poco.

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import type { Catalog } from "@/lib/types/catalog";

export function useCatalog() {
  const setCatalogLoaded = useStore((s) => s.setCatalogLoaded);

  const query = useQuery<Catalog>({
    queryKey: ["catalog"],
    queryFn: async () => {
      const res = await fetch("/api/catalog");
      if (!res.ok) throw new Error("Error al cargar catálogo");
      return res.json();
    },
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (query.isSuccess) setCatalogLoaded(true);
  }, [query.isSuccess, setCatalogLoaded]);

  return query;
}

// Helper para buscar en el catálogo ya cargado
export function findProduct(catalog: Catalog | undefined, slug: string) {
  return catalog?.products.find((p) => p.slug === slug);
}

export function findKit(catalog: Catalog | undefined, slug: string) {
  return catalog?.kits.find((k) => k.slug === slug);
}

export function findCategory(catalog: Catalog | undefined, slug: string) {
  return catalog?.categories.find((c) => c.slug === slug);
}

export function productsByCategory(catalog: Catalog | undefined, categorySlug: string) {
  if (!catalog) return [];
  const cat = catalog.categories.find((c) => c.slug === categorySlug);
  if (!cat) return [];
  return catalog.products.filter((p) => p.categoryId === cat.id);
}

export function kitsByCategory(catalog: Catalog | undefined, categorySlug: string) {
  if (!catalog) return [];
  const cat = catalog.categories.find((c) => c.slug === categorySlug);
  if (!cat) return [];
  return catalog.kits.filter((k) => k.categoryId === cat.id);
}

export function productsByIds(catalog: Catalog | undefined, ids: string[]) {
  if (!catalog) return [];
  return ids
    .map((id) => catalog.products.find((p) => p.sku === id))
    .filter(Boolean) as Catalog["products"];
}

export function faqsByCategory(catalog: Catalog | undefined, categorySlug: string) {
  if (!catalog) return [];
  const cat = catalog.categories.find((c) => c.slug === categorySlug);
  return catalog.faqs.filter((f) => f.categoryId === cat?.id);
}
