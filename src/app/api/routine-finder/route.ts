// /api/routine-finder — Quiz determinístico con lógica de seguridad.
// El quiz NO diagnostica. Si se reportan señales que ameritan valoración,
// deriva a orientación profesional en lugar de recomendar productos.

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serializeProduct, serializeKit } from "@/lib/types/catalog";

export const dynamic = "force-dynamic";

// Preguntas del quiz (4-6 máximo según blueprint)
export const QUIZ_QUESTIONS = [
  {
    id: "zone",
    label: "¿Qué zona quieres cuidar?",
    help: "Elige la zona donde notas la necesidad.",
    options: [
      { value: "uñas", label: "Uñas" },
      { value: "piel", label: "Piel del pie" },
      { value: "dedos", label: "Dedos (roce o presión)" },
      { value: "talones", label: "Talones" },
      { value: "calzado", label: "Calzado (olor o higiene)" },
      { value: "general", label: "Todo el pie en general" },
    ],
  },
  {
    id: "need",
    label: "¿Qué necesitas resolver?",
    help: "Elige la opción que mejor describa tu situación.",
    options: [
      { value: "hongos", label: "Hongos en uñas o piel" },
      { value: "sequedad", label: "Piel muy seca o talones agrietados" },
      { value: "sudor", label: "Sudor o mal olor" },
      { value: "roce", label: "Roce entre dedos o juanete" },
      { value: "confort", label: "Confort o cansancio al caminar" },
      { value: "diabetes", label: "Cuidado preventivo por diabetes" },
    ],
  },
  {
    id: "frequency",
    label: "¿Con qué frecuencia cuidas tus pies?",
    help: "Nos ayuda a recomendar la rutina adecuada.",
    options: [
      { value: "diaria", label: "A diario" },
      { value: "semanal", label: "Algunas veces por semana" },
      { value: "ocasional", label: "Solo cuando tengo molestia" },
    ],
  },
  {
    id: "severity",
    label: "¿Cómo describirías la molestia?",
    help: "Importante: esta pregunta no es un diagnóstico. Si tienes una condición, te recomendamos orientación profesional.",
    options: [
      { value: "leve", label: "Leve o preventiva" },
      { value: "moderada", label: "Moderada, llevaba tiempo con esto" },
      { value: "intensa", label: "Intensa o reciente" },
      { value: "no-se", label: "No sé bien qué tengo" },
    ],
  },
  {
    id: "safety",
    label: "¿Tienes alguna de estas señales?",
    help: "Pregunta de seguridad. Si marcas alguna, te derivaremos a orientación profesional.",
    options: [
      { value: "no", label: "Ninguna de estas" },
      { value: "herida", label: "Herida, fisura con sangrado o lesión abierta" },
      { value: "diabetes-lesion", label: "Tengo diabetes y noto cambios en el pie" },
      { value: "dolor", label: "Dolor importante al caminar" },
      { value: "sensibilidad", label: "Pérdida de sensibilidad o cambio de color" },
    ],
  },
];

export async function POST(req: Request) {
  const body = await req.json();
  const answers: Record<string, string> = body.answers ?? {};

  // ─── Lógica de seguridad (prioridad absoluta) ───
  // Si el usuario reporta señales de riesgo, derivar a orientación.
  const safety = answers.safety;
  if (safety && safety !== "no") {
    return NextResponse.json({
      type: "guidance",
      title: "Recomendamos orientación profesional antes de elegir un producto",
      message:
        "Has indicado una señal que conviene valorar antes de iniciar o continuar una rutina de cuidado por tu cuenta. " +
        "En CuidoMisPies creemos que el autocuidado y la orientación profesional se complementan.",
      recommendations: {
        primary: "Agenda una asesoría profesional",
        secondary:
          "Mientras tanto, puedes explorar productos de cuidado diario o pedirnos una recomendación general por WhatsApp.",
      },
      safetyNote:
        "Esta recomendación no sustituye una valoración clínica. Ante dolor intenso, fiebre, signos de infección o una herida que no mejora, acude a un profesional.",
      suggestedProducts: [] as string[],
    });
  }

  // ─── Lógica determinística de recomendación ───
  const need = answers.need;
  const zone = answers.zone;
  const severity = answers.severity;

  // Mapeo de necesidad → categoría
  const needToCategory: Record<string, string> = {
    hongos: "hongos",
    sequedad: "piel-seca-talones",
    sudor: "sudor-mal-olor",
    roce: "juanetes-dedos",
    confort: "talon-confort",
    diabetes: "diabetes",
  };

  const categorySlug = needToCategory[need] ?? "cuidado-diario";
  const category = await db.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) {
    return NextResponse.json({
      type: "guidance",
      title: "Cuéntanos un poco más",
      message:
        "No pudimos afinar una recomendación con las respuestas. Te sugerimos explorar las categorías o solicitar asesoría.",
      recommendations: {
        primary: "Explora por necesidad",
        secondary: "O pide orientación profesional",
      },
      suggestedProducts: [],
    });
  }

  // Productos de la categoría
  const products = await db.product.findMany({
    where: { categoryId: category.id },
    include: { category: true, reviews: true },
    orderBy: [{ isHero: "desc" }, { rating: "desc" }],
  });

  // Kits de la categoría (priorizar featured y anchor)
  const kits = await db.kit.findMany({
    where: { categoryId: category.id },
    include: {
      category: true,
      items: { include: { product: { include: { category: true } } } },
    },
    orderBy: [{ isAnchor: "desc" }, { isFeatured: "desc" }, { price: "asc" }],
  });

  // Si la intensidad es "intensa" o "no sé", sugerir orientación además de productos
  const suggestGuidance = severity === "intensa" || severity === "no-se";

  // Productos héroe de la categoría (top 3-4)
  const heroProducts = products.filter((p) => p.isHero).slice(0, 4);
  const topProducts = (heroProducts.length > 0 ? heroProducts : products.slice(0, 4)).map((p) =>
    serializeProduct(p, true)
  );

  // Kit recomendado (featured o el primero)
  const recommendedKit = kits.find((k) => k.isFeatured) ?? kits[0];

  const result = {
    type: "routine",
    category: {
      slug: category.slug,
      name: category.name,
      tagline: category.tagline,
    },
    title: `Rutina recomendada para ${category.name.toLowerCase()}`,
    message:
      severity === "intensa"
        ? "Por la intensidad que indicas, te recomendamos combinar estos productos con orientación profesional si no mejoras en algunas semanas."
        : severity === "moderada"
          ? "Estos productos y kits pueden ayudarte a construir una rutina constante. La mejoría requiere constancia."
          : "Estos productos son una buena base de cuidado. La constancia hace la diferencia.",
    suggestedProducts: topProducts.map((p) => p.sku),
    recommendedKitSlug: recommendedKit?.slug ?? null,
    suggestGuidance,
    guidanceNote: suggestGuidance
      ? "Como indicaste intensidad alta o no estás seguro, considera solicitar asesoría profesional antes de elegir un tratamiento específico."
      : null,
    products: topProducts,
    kit: recommendedKit ? serializeKit(recommendedKit) : null,
    allKits: kits.map(serializeKit),
  };

  return NextResponse.json(result);
}

// GET devuelve las preguntas del quiz (para la UI)
export async function GET() {
  return NextResponse.json({ questions: QUIZ_QUESTIONS });
}
