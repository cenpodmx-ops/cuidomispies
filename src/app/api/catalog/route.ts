// /api/catalog — Devuelve todo el catálogo para la SPA.
// La SPA carga este endpoint una vez y navega por estado (Home → Categoría → Producto → Kit).

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  serializeProduct,
  serializeKit,
  serializeCategory,
  serializeFaq,
} from "@/lib/types/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const [categories, products, kits, faqs] = await Promise.all([
    db.category.findMany({ orderBy: { order: "asc" } }),
    db.product.findMany({
      include: { category: true, reviews: true },
      orderBy: { sku: "asc" },
    }),
    db.kit.findMany({
      include: {
        category: true,
        items: { include: { product: { include: { category: true } } } },
      },
      orderBy: { price: "asc" },
    }),
    db.faq.findMany({ orderBy: { order: "asc" } }),
  ]);

  return NextResponse.json({
    categories: categories.map(serializeCategory),
    products: products.map((p) => serializeProduct(p, true)),
    kits: kits.map(serializeKit),
    faqs: faqs.map(serializeFaq),
  });
}
