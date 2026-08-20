// CuidoMisPies — Seed del catálogo MVP
// Implementa fielmente el blueprint: 8 categorías, 25 SKU, 9 kits, FAQs y reviews.
// Precios en MXN (representativos; el blueprint indica que los precios finales se cargarán en Etapa 5).

import { db } from "@/lib/db";

async function main() {
  console.log("🧹 Limpiando base de datos...");
  await db.review.deleteMany();
  await db.kitItem.deleteMany();
  await db.kit.deleteMany();
  await db.product.deleteMany();
  await db.faq.deleteMany();
  await db.routine.deleteMany();
  await db.category.deleteMany();

  // ───────────────────────────────────────────────
  // 1. CATEGORÍAS (8 necesidades)
  // ───────────────────────────────────────────────
  const categories = [
    {
      slug: "hongos",
      name: "Hongos",
      shortName: "Hongos",
      tagline: "Uñas, piel y calzado",
      description: "Cuidado de hongos en uñas y piel, con higiene del calzado como parte de la rutina.",
      longText: "El cuidado de hongos en los pies no termina en la uña. Organizamos la rutina en tres frentes: la zona afectada, la higiene del pie y el cuidado del calzado. Combinar estos pasos aumenta la probabilidad de éxito y reduce la reincidencia.",
      iconKey: "Shield",
      accentColor: "#176B6B",
      order: 1,
      isPriority: true,
    },
    {
      slug: "diabetes",
      name: "Cuidado del pie en diabetes",
      shortName: "Diabetes",
      tagline: "Protección, hidratación y rutina diaria",
      description: "Rutina preventiva de cuidado del pie para personas con diabetes: hidratación, calcetines sin compresión y educación.",
      longText: "Las personas con diabetes requieren un cuidado del pie más atento: hidratación diaria, revisión periódica, calzado adecuado y calcetines diseñados sin costuras que no compriman. Ante cualquier lesión, cambio de color o pérdida de sensibilidad, recomendamos orientación profesional antes de elegir un producto.",
      iconKey: "HeartHandshake",
      accentColor: "#A9C5B5",
      order: 2,
      isPriority: true,
    },
    {
      slug: "piel-seca-talones",
      name: "Talones y piel seca",
      shortName: "Piel seca",
      tagline: "Resequedad, piel engrosada, talones",
      description: "Hidratación y renovación de piel muy seca, talones agrietados y piel engrosada.",
      longText: "La resequedad en talones y plantas puede deberse a fricción, calzado abierto, clima seco o falta de hidratación. La urea es un activo con efecto queratolítico e hidratante: a mayor concentración, mayor renovación. La rutina combina hidratación diaria con cuidado intensivo semanal.",
      iconKey: "Droplet",
      accentColor: "#D99C5C",
      order: 3,
      isPriority: true,
    },
    {
      slug: "sudor-mal-olor",
      name: "Sudor y mal olor",
      shortName: "Sudor y olor",
      tagline: "Pies y calzado",
      description: "Control de humedad y olor en pies y calzado con rutina diaria y semanal.",
      longText: "El sudor y el olor se controlan combinando dos frentes: los pies y el calzado. Un antitranspirante reduce la humedad, el desodorante controla el olor y el spray higienizante mantiene el calzado en buen estado entre usos.",
      iconKey: "Wind",
      accentColor: "#176B6B",
      order: 4,
      isPriority: false,
    },
    {
      slug: "juanetes-dedos",
      name: "Juanetes y dedos",
      shortName: "Juanetes y dedos",
      tagline: "Roce, separación, protección",
      description: "Protección y separación para juanetes y dedos que se rozan dentro del calzado.",
      longText: "El roce entre dedos o contra el calzado genera molestias y callosidades. Los protectores de gel separan y absorben la presión. El cuidado de día y de noche puede combinarse: protectores de día, correctores nocturnos suaves.",
      iconKey: "Footprints",
      accentColor: "#A9C5B5",
      order: 5,
      isPriority: false,
    },
    {
      slug: "callos-roce-presion",
      name: "Callos, roce y presión",
      shortName: "Callos y roce",
      tagline: "Protección localizada",
      description: "Protección puntual para zonas de roce, presión y callosidades.",
      longText: "Los callos aparecen por fricción repetida o presión localizada. Los protectores con punto de gel alivian la zona y reducen la molestia al caminar. Es importante combinar la protección con revisión del calzado y de la pisada.",
      iconKey: "CircleDot",
      accentColor: "#D99C5C",
      order: 6,
      isPriority: false,
    },
    {
      slug: "talon-confort",
      name: "Talón y confort",
      shortName: "Confort",
      tagline: "Amortiguación y comodidad",
      description: "Amortiguación y confort para quienes pasan muchas horas de pie o caminando.",
      longText: "El cansancio en talón y planta del pie se reduce con taloneras y almohadillas que absorben el impacto. Para quienes trabajan de pie o caminan distancias largas, una buena amortiguación cambia la jornada.",
      iconKey: "Waves",
      accentColor: "#176B6B",
      order: 7,
      isPriority: false,
    },
    {
      slug: "cuidado-diario",
      name: "Cuidado diario",
      shortName: "Cuidado diario",
      tagline: "Higiene, mantenimiento y prevención",
      description: "Productos transversales para higiene, mantenimiento y prevención del pie.",
      longText: "El cuidado diario del pie previene la mayoría de los problemas. Hidratación, higiene del calzado y revisión periódica son la base. Esta categoría cruza todas las necesidades y funciona como cross-sell transversal.",
      iconKey: "Sparkles",
      accentColor: "#A9C5B5",
      order: 8,
      isPriority: false,
    },
  ];

  const categoryMap: Record<string, { id: string }> = {};
  for (const c of categories) {
    const created = await db.category.create({ data: c });
    categoryMap[c.slug] = { id: created.id };
    console.log(`  ✓ Categoría: ${c.name}`);
  }

  // ───────────────────────────────────────────────
  // 2. PRODUCTOS (25 SKU del MVP)
  // ───────────────────────────────────────────────
  type ProductSeed = {
    sku: string;
    slug: string;
    title: string;
    shortBenefit: string;
    description: string;
    categorySlug: string;
    careLevel: string;
    howToUse: string;
    benefits: string;
    precautions: string;
    whenToConsult: string;
    badge?: string;
    routineStep?: string;
    activeIngredient?: string;
    presentation: string;
    price: number;
    compareAtPrice?: number;
    rating: number;
    reviewCount: number;
    isHero?: boolean;
    isBestseller?: boolean;
    isDiscoverable?: boolean;
    isReorderable?: boolean;
    needs: string;
    images: string[];
    crossSellSkus?: string[];
  };

  const products: ProductSeed[] = [
    // ─── HONGOS ───
    {
      sku: "HON-01",
      slug: "solucion-antifungica-unas",
      title: "Solución antifúngica para uñas",
      shortBenefit: "Cuida la uña afectada y ayuda a una renovación saludable.",
      description: "Solución de aplicación directa sobre la uña afectada. Su formato con pincel facilita cubrir la zona de forma precisa y constante. Pensada para uso continuo como parte de una rutina que también incluye el cuidado del calzado.",
      categorySlug: "hongos",
      careLevel: "Diario",
      howToUse: "Aplica sobre la uña limpia y seca una o dos veces al día, cubriendo toda la superficie afectada y el borde. Deja secar. Mantén el uso durante el periodo indicado aunque la mejora sea visible antes.",
      benefits: "Aplicación precisa con pincel\nFormato práctico para uso diario\nComplementa la higiene del calzado\nApto para rutina de cuidado continuo",
      precautions: "Uso externo. Evita el contacto con ojos y mucosas. No aplicar sobre piel lesionada. Mantén fuera del alcance de niños.",
      whenToConsult: "Si la uña presenta dolor, cambio de color extenso, separación de la lámina o tienes diabetes. Si no hay mejora tras varias semanas de uso constante.",
      badge: "Más vendido",
      routineStep: "Paso 1 — Uñas",
      activeIngredient: "Clotrimazol",
      presentation: "15 ml con pincel aplicador",
      price: 189,
      compareAtPrice: 229,
      rating: 4.6,
      reviewCount: 124,
      isHero: true,
      isBestseller: true,
      needs: "hongos,uñas",
      images: ["/products/hon-01.svg"],
      crossSellSkus: ["HON-03", "HON-04"],
    },
    {
      sku: "HON-02",
      slug: "crema-antifungica-pies",
      title: "Crema antifúngica para pies",
      shortBenefit: "Cuida la piel entre los dedos y la planta del pie.",
      description: "Crema de textura ligera para aplicación en la piel del pie afectada. Su fórmula combina el activo antifúngico con ingredientes que cuidan la piel sensible de la zona.",
      categorySlug: "hongos",
      careLevel: "Diario",
      howToUse: "Aplica una capa fina sobre la zona afectada y alrededores, limpia y seca, una o dos veces al día. Seca rápidamente y no deja sensación grasa.",
      benefits: "Textura ligera de rápida absorción\nCuida la piel sensible de la zona\nFácil aplicación entre dedos\nApto para uso continuo",
      precautions: "Uso externo. Evitar contacto con ojos. No usar sobre piel lesionada. Suspender si aparece irritación.",
      whenToConsult: "Si la lesión se extiende, aparece supuración, dolor o tienes diabetes. Si la zona no mejora en 4 semanas.",
      routineStep: "Paso 2 — Piel",
      activeIngredient: "Terbinafina",
      presentation: "30 g tubo",
      price: 165,
      compareAtPrice: 199,
      rating: 4.5,
      reviewCount: 87,
      needs: "hongos,piel",
      images: ["/products/hon-02.svg"],
      crossSellSkus: ["HON-03", "SUD-02"],
    },
    {
      sku: "HON-03",
      slug: "spray-higiene-calzado",
      title: "Spray para higiene del calzado",
      shortBenefit: "Higiene del calzado que complementa la rutina de pies.",
      description: "Spray higienizante para aplicar dentro del calzado. Su fórmula reduce los microorganismos responsables del olor y ayuda a mantener el calzado en buenas condiciones entre usos.",
      categorySlug: "hongos",
      careLevel: "Semanal",
      howToUse: "Pulveriza 2 o 3 veces dentro del calzado limpio y seco, idealmente tras cada uso. Deja secar antes de volver a calzar.",
      benefits: "Reduce el olor del calzado\nComplementa la rutina de pies\nFormato spray de aplicación rápida\nApto para uso frecuente",
      precautions: "No inhalar. No aplicar sobre la piel. Usar en zonas ventiladas. Mantener lejos de fuentes de calor.",
      whenToConsult: "Si el problema persiste tras varias semanas de uso combinado con la rutina de pies.",
      routineStep: "Paso 3 — Calzado",
      activeIngredient: "Cloruro de alquildimetilbencilamonio",
      presentation: "100 ml spray",
      price: 145,
      rating: 4.4,
      reviewCount: 62,
      isReorderable: true,
      needs: "hongos,sudor,calzado",
      images: ["/products/hon-03.svg"],
      crossSellSkus: ["HON-01", "SUD-01"],
    },
    {
      sku: "HON-04",
      slug: "aceite-higienizante-tea-tree-neem",
      title: "Aceite higienizante Tea Tree + Neem",
      shortBenefit: "Complemento natural para la rutina de uñas y piel.",
      description: "Aceite con árbol de té y neem que complementa la rutina antifúngica. Aplicación local sobre uñas y piel para reforzar la higiene de la zona.",
      categorySlug: "hongos",
      careLevel: "Diario",
      howToUse: "Aplica una gota sobre la uña o zona afectada, limpia y seca. Deja absorber. Usa 1-2 veces al día como complemento del tratamiento principal.",
      benefits: "Fórmula con aceites esenciales\nRefuerza la rutina antifúngica\nAplicación local precisa\nFormato gotero controlado",
      precautions: "Uso externo. No ingerir. Evitar contacto con ojos y mucosas. Realizar prueba de sensibilidad en piel antes del primer uso.",
      whenToConsult: "Si aparece irritación o enrojecimiento. Si tienes piel sensible o atopia.",
      routineStep: "Paso 4 — Complemento",
      activeIngredient: "Aceite de árbol de té (Melaleuca alternifolia) y neem",
      presentation: "10 ml con gotero",
      price: 129,
      rating: 4.3,
      reviewCount: 41,
      needs: "hongos,uñas,piel",
      images: ["/products/hon-04.svg"],
      crossSellSkus: ["HON-01", "HON-02"],
    },

    // ─── DIABETES ───
    {
      sku: "DIA-01",
      slug: "calcetin-personas-diabetes",
      title: "Calcetín para personas con diabetes",
      shortBenefit: "Calcetín sin compresión, sin costuras, que cuida el pie sensible.",
      description: "Calcetín diseñado para personas con diabetes. Sin goma ajustada, sin costuras prominentes, tejido suave que reduce la fricción. Disponible en paquetes de 1, 3 y 5 pares.",
      categorySlug: "diabetes",
      careLevel: "Diario",
      howToUse: "Uso diario. Lavar a máquina en agua tibia. Evitar suavizante agresivo. Renovar cuando el tejido muestre desgaste.",
      benefits: "Sin compresión en el tobillo\nSin costuras prominentes\nTejido suave de baja fricción\nDiseñado para pie sensible",
      precautions: "Revisa el pie a diario. Cambia los calcetines diariamente. Si notas ampollas, roce o cambios de color, solicita orientación profesional.",
      whenToConsult: "Ante cualquier herida, ampolla, cambio de color, pérdida de sensibilidad o dolor en el pie. En diabetes, la revisión temprana es fundamental.",
      badge: "Recomendado",
      routineStep: "Paso 1 — Protección",
      presentation: "1 / 3 / 5 pares — Tallas 24-27 y 28-31",
      price: 99,
      compareAtPrice: 129,
      rating: 4.8,
      reviewCount: 156,
      isHero: true,
      isReorderable: true,
      needs: "diabetes,cuidado-diario",
      images: ["/products/dia-01.svg"],
      crossSellSkus: ["DIA-02", "SEC-01"],
    },
    {
      sku: "DIA-02",
      slug: "crema-cuidado-diario-diabetes",
      title: "Crema de cuidado diario para diabetes",
      shortBenefit: "Hidratación diaria para pie diabético sin grasitud.",
      description: "Crema de hidratación suave formulada para el pie de personas con diabetes. Hidrata sin dejar sensación grasa, ayuda a mantener la piel del pie en buen estado.",
      categorySlug: "diabetes",
      careLevel: "Diario",
      howToUse: "Aplica sobre el pie limpio y seco, masajeando suavemente. Evita aplicar entre los dedos salvo indicación. Usa una o dos veces al día.",
      benefits: "Hidratación suave y diaria\nTextura no grasa\nAyuda a mantener la piel del pie\nFácil aplicación",
      precautions: "No aplicar entre los dedos a menos que lo indique un profesional. No aplicar sobre heridas o piel lesionada.",
      whenToConsult: "Si aparece enrojecimiento, picor, o si tienes una herida en el pie.",
      routineStep: "Paso 2 — Hidratación",
      presentation: "75 ml tubo",
      price: 159,
      compareAtPrice: 189,
      rating: 4.6,
      reviewCount: 73,
      isReorderable: true,
      needs: "diabetes,piel,cuidado-diario",
      images: ["/products/dia-02.svg"],
      crossSellSkus: ["DIA-01", "SEC-01"],
    },

    // ─── PIEL SECA / TALONES ───
    {
      sku: "SEC-01",
      slug: "urea-20-hidratacion-diaria",
      title: "Urea 20 — hidratación diaria",
      shortBenefit: "Hidratante diario con urea al 20% para piel seca.",
      description: "Crema de hidratación diaria con urea al 20%. Mantiene la piel del pie suave e hidratada con uso continuo. Textura equilibrada para uso cotidiano.",
      categorySlug: "piel-seca-talones",
      careLevel: "Diario",
      howToUse: "Aplica sobre el pie limpio y seco, masajeando hasta absorber. Una vez al día, idealmente por la noche.",
      benefits: "Urea 20% para uso diario\nHidratación de mantenimiento\nTextura equilibrada\nPara piel seca general",
      precautions: "No aplicar sobre piel lesionada o heridas. Evitar contacto con ojos y mucosas.",
      whenToConsult: "Si la piel presenta fisuras profundas, sangrado o signos de infección.",
      presentation: "75 ml tubo",
      price: 139,
      rating: 4.4,
      reviewCount: 58,
      needs: "piel-seca,talones,cuidado-diario",
      images: ["/products/sec-01.svg"],
      crossSellSkus: ["SEC-02", "SEC-04"],
    },
    {
      sku: "SEC-02",
      slug: "urea-40-cuidado-intensivo",
      title: "Urea 40 — cuidado intensivo",
      shortBenefit: "Cuidado intensivo para talones y piel muy seca.",
      description: "Crema concentrada con urea al 40% para zonas con piel engrosada y talones resecos. Acción queratolítica e hidratante. Producto héroe por su visibilidad y facilidad de explicación.",
      categorySlug: "piel-seca-talones",
      careLevel: "Intensivo",
      howToUse: "Aplica sobre la zona afectada limpia y seca, preferentemente por la noche. Una vez al día. No aplicar entre los dedos.",
      benefits: "Alta concentración de urea (40%)\nRenueva piel engrosada\nHidrata en profundidad\nEfecto visible en pocas semanas",
      precautions: "Uso externo. No aplicar sobre piel lesionada, heridas ni mucosas. Puede causar leve escozor inicial. Suspender si aparece irritación importante.",
      whenToConsult: "Si la piel presenta fisuras profundas con sangrado, signos de infección o si tienes diabetes.",
      badge: "Más vendido",
      routineStep: "Paso 1 — Tratamiento",
      activeIngredient: "Urea 40%",
      presentation: "50 ml tubo",
      price: 199,
      compareAtPrice: 249,
      rating: 4.7,
      reviewCount: 203,
      isHero: true,
      isBestseller: true,
      isReorderable: true,
      needs: "piel-seca,talones",
      images: ["/products/sec-02.svg"],
      crossSellSkus: ["SEC-04", "SEC-01"],
    },
    {
      sku: "SEC-03",
      slug: "urea-60-cuidado-extra",
      title: "Urea 60 — cuidado extra intensivo",
      shortBenefit: "Máxima concentración para zonas muy engrosadas.",
      description: "Tratamiento de máxima concentración con urea al 60% para zonas con hiperqueratosis importante, callosidades extensas o talones muy agrietados. Uso puntual controlado.",
      categorySlug: "piel-seca-talones",
      careLevel: "Extra intensivo",
      howToUse: "Aplica una capa fina solo sobre la zona muy engrosada, por la noche. Cubre con calcetín de algodón. Usa 2-3 veces por semana, no más.",
      benefits: "Urea 60% máxima concentración\nPara zonas muy engrosadas\nRenovación intensa de la piel\nUso puntual controlado",
      precautions: "Uso externo exclusivamente. No aplicar sobre piel sana, heridas, mucosas ni entre los dedos. No usar en niños. Puede causar escozor.",
      whenToConsult: "Siempre recomendable orientación profesional antes de iniciar tratamiento con esta concentración. Si tienes diabetes, no usar sin valoración.",
      badge: "Premium",
      routineStep: "Paso 2 — Extra",
      activeIngredient: "Urea 60%",
      presentation: "30 ml tubo",
      price: 249,
      compareAtPrice: 299,
      rating: 4.5,
      reviewCount: 49,
      isReorderable: true,
      needs: "piel-seca,talones,callos",
      images: ["/products/sec-03.svg"],
      crossSellSkus: ["SEC-02", "SEC-05"],
    },
    {
      sku: "SEC-04",
      slug: "crema-piel-extremadamente-seca",
      title: "Crema para piel extremadamente seca",
      shortBenefit: "Hidratación complementaria para piel muy seca.",
      description: "Crema complementaria para pieles extremadamente secas. Combina urea con agentes emolientes que suavizan y reponen la barrera cutánea.",
      categorySlug: "piel-seca-talones",
      careLevel: "Intensivo",
      howToUse: "Aplica sobre el pie limpio y seco, masajeando hasta absorber. Una o dos veces al día.",
      benefits: "Complementa la acción de la urea\nSuaviza piel muy seca\nRepara la barrera cutánea\nTextura rica pero no pesada",
      precautions: "Uso externo. No aplicar sobre heridas. Suspender si aparece irritación.",
      whenToConsult: "Si la piel no mejora o presenta fisuras con sangrado.",
      routineStep: "Paso 2 — Reparación",
      presentation: "100 ml tubo",
      price: 179,
      rating: 4.4,
      reviewCount: 67,
      needs: "piel-seca,talones",
      images: ["/products/sec-04.svg"],
      crossSellSkus: ["SEC-02", "SEC-05"],
    },
    {
      sku: "SEC-05",
      slug: "mousse-intensiva-pies",
      title: "Mousse intensiva para pies",
      shortBenefit: "Textura mousse premium de rápida absorción.",
      description: "Mousse de textura ligera y sensorial para hidratación intensa del pie. Se absorbe rápidamente sin dejar sensación grasa, ideal para quienes prefieren texturas ligeras.",
      categorySlug: "piel-seca-talones",
      careLevel: "Extra intensivo",
      howToUse: "Aplica una pequeña cantidad sobre el pie limpio. Masajea suavemente. Se absorbe en segundos. Una o dos veces al día.",
      benefits: "Textura mousse sensorial\nRápida absorción sin grasa\nHidratación intensa\nExperiencia premium",
      precautions: "Uso externo. No inhalar. No aplicar sobre heridas.",
      whenToConsult: "Si la piel no mejora o empeora.",
      badge: "Premium",
      routineStep: "Paso 3 — Sensorial",
      presentation: "150 ml",
      price: 219,
      compareAtPrice: 259,
      rating: 4.6,
      reviewCount: 38,
      needs: "piel-seca,talones,cuidado-diario",
      images: ["/products/sec-05.svg"],
      crossSellSkus: ["SEC-03", "SEC-04"],
    },

    // ─── SUDOR Y OLOR ───
    {
      sku: "SUD-01",
      slug: "antitranspirante-pies",
      title: "Antitranspirante para pies",
      shortBenefit: "Controla el exceso de sudor en el pie.",
      description: "Antitranspirante en lotion o spray para reducir el exceso de sudor en los pies. Su uso constante ayuda a controlar la humedad y, con ella, el olor y la maceración de la piel.",
      categorySlug: "sudor-mal-olor",
      careLevel: "Diario",
      howToUse: "Aplica sobre el pie limpio y seco, especialmente en la planta y entre los dedos, por la noche. No aplicar sobre piel lesionada. Reduce frecuencia si la sudoración disminuye.",
      benefits: "Reduce el exceso de sudor\nControla la humedad del pie\nDisminuye la maceración\nAyuda a reducir el olor",
      precautions: "No aplicar sobre piel lesionada, heridas ni mucosas. Suspender si aparece irritación. No usar en niños pequeños.",
      whenToConsult: "Si la sudoración es muy abundante, aparece solo en un pie, o se acompaña de cambios en la piel.",
      badge: "Más vendido",
      routineStep: "Paso 1 — Control",
      activeIngredient: "Cloruro de aluminio",
      presentation: "50 ml",
      price: 169,
      compareAtPrice: 199,
      rating: 4.5,
      reviewCount: 118,
      isHero: true,
      isBestseller: true,
      isReorderable: true,
      needs: "sudor,olor,pies",
      images: ["/products/sud-01.svg"],
      crossSellSkus: ["SUD-02", "HON-03"],
    },
    {
      sku: "SUD-02",
      slug: "desodorante-pies-calzado",
      title: "Desodorante para pies y calzado",
      shortBenefit: "Controla el olor en pies y calzado.",
      description: "Desodorante para pies y calzado que neutraliza el olor sin tapizarlo con fragancia agresiva. Aplicación cómoda para uso diario.",
      categorySlug: "sudor-mal-olor",
      careLevel: "Diario",
      howToUse: "Pulveriza sobre el pie limpio y seco, y dentro del calzado. Usa por la mañana antes de calzar.",
      benefits: "Neutraliza el olor\nApto para pie y calzado\nFragancia ligera\nAplicación rápida",
      precautions: "No inhalar. No aplicar sobre piel lesionada. Mantener lejos del fuego.",
      whenToConsult: "Si el olor persiste o se acompaña de lesiones en la piel.",
      routineStep: "Paso 2 — Olor",
      presentation: "100 ml spray",
      price: 139,
      rating: 4.3,
      reviewCount: 72,
      isReorderable: true,
      needs: "sudor,olor,calzado",
      images: ["/products/sud-02.svg"],
      crossSellSkus: ["SUD-01", "HON-03"],
    },

    // ─── JUANETES Y DEDOS ───
    {
      sku: "JUA-01",
      slug: "protector-separador-juanete",
      title: "Protector + separador para juanete",
      shortBenefit: "Protege la zona del juanete y separa el dedo del roce.",
      description: "Protector de gel con separador que cushiona la zona del juanete y mantiene el dedo gordo en posición separada del segundo dedo. Uso diurno dentro del calzado.",
      categorySlug: "juanetes-dedos",
      careLevel: "Diario",
      howToUse: "Coloca el protector sobre el dedo gordo de modo que el separador quede entre el primero y segundo dedo. Apto para uso con calzado.",
      benefits: "Cushiona la zona del juanete\nSepara los dedos del roce\nGel suave y reutilizable\nApto para uso con calzado",
      precautions: "No usar sobre piel lesionada. Lavar con agua y jabón neutro. Secar al aire. No dormir con él a menos que el fabricante lo indique.",
      whenToConsult: "Si el juanete duele intensamente, presenta enrojecimiento, o si la desviación es importante.",
      badge: "Más vendido",
      routineStep: "Paso 1 — Día",
      presentation: "1 par — universal reversible",
      price: 149,
      compareAtPrice: 179,
      rating: 4.5,
      reviewCount: 94,
      isHero: true,
      isDiscoverable: true,
      needs: "juanetes,dedos,roce",
      images: ["/products/jua-01.svg"],
      crossSellSkus: ["JUA-02", "JUA-03"],
    },
    {
      sku: "JUA-02",
      slug: "corrector-nocturno-juanete",
      title: "Corrector nocturno para juanete",
      shortBenefit: "Cuidado nocturno suave para la zona del juanete.",
      description: "Corrector nocturno que mantiene el dedo gordo en posición separada durante la noche. Suave y ajustable. Complementa el protector de día.",
      categorySlug: "juanetes-dedos",
      careLevel: "Intensivo",
      howToUse: "Coloca el corrector antes de dormir, ajustando la separación a una posición cómoda. Retira por la mañana. No caminar con él puesto.",
      benefits: "Cuidado nocturno suave\nAjustable según comodidad\nComplementa el protector de día\nMaterial suave",
      precautions: "No usar para caminar. Si aparece dolor o adormecimiento, aflojar o retirar. No usar sobre heridas.",
      whenToConsult: "Si el juanete presenta dolor intenso, cambios de color o desviación importante.",
      badge: "Premium",
      routineStep: "Paso 2 — Noche",
      presentation: "1 unidad ajustable",
      price: 219,
      compareAtPrice: 259,
      rating: 4.3,
      reviewCount: 41,
      needs: "juanetes,dedos",
      images: ["/products/jua-02.svg"],
      crossSellSkus: ["JUA-01", "JUA-03"],
    },
    {
      sku: "JUA-03",
      slug: "separador-gel-protector",
      title: "Separador de gel con protector",
      shortBenefit: "Separa dedos y protege la zona de roce.",
      description: "Separador de gel que se coloca entre dos dedos para evitar el roce directo. Incorpora un protector para la zona adyacente. Uso diario.",
      categorySlug: "juanetes-dedos",
      careLevel: "Diario",
      howToUse: "Coloca entre los dedos que se rozan. El protector debe quedar sobre la zona sensible. Apto para uso con calzado.",
      benefits: "Evita el roce entre dedos\nProtege la zona sensible\nGel suave y lavable\nUso cómodo con calzado",
      precautions: "No usar sobre piel lesionada. Lavar con jabón neutro. Secar al aire.",
      whenToConsult: "Si el roce produce herida, o si hay deformidad importante de los dedos.",
      routineStep: "Paso 1 — Día",
      presentation: "2 separadores universales",
      price: 119,
      rating: 4.4,
      reviewCount: 56,
      needs: "juanetes,dedos,roce",
      images: ["/products/jua-03.svg"],
      crossSellSkus: ["JUA-01", "JUA-04"],
    },
    {
      sku: "JUA-04",
      slug: "dedal-protector-gel",
      title: "Dedal protector de gel",
      shortBenefit: "Protege un dedo del roce dentro del calzado.",
      description: "Dedal de gel que cubre un dedo completo para protegerlo del roce contra el calzado o contra el dedo vecino. Ideal para dedos con uña encarnada o sensible.",
      categorySlug: "juanetes-dedos",
      careLevel: "Diario",
      howToUse: "Coloca el dedal sobre el dedo afectado, cubriéndolo completamente. Recorta si es necesario para ajustar la talla.",
      benefits: "Cubre el dedo completo\nProtege del roce y la presión\nGel suave y elástico\nRecortable para ajustar talla",
      precautions: "No usar si el dedo presenta herida abierta o infección. Lavar con jabón neutro.",
      whenToConsult: "Si el dedo presenta uña encarnada con signos de infección, dolor importante o sangrado.",
      badge: "Descubrimiento",
      presentation: "2 dedales universales recortables",
      price: 89,
      rating: 4.2,
      reviewCount: 34,
      isDiscoverable: true,
      needs: "dedos,roce,uñas",
      images: ["/products/jua-04.svg"],
      crossSellSkus: ["JUA-05", "JUA-03"],
    },
    {
      sku: "JUA-05",
      slug: "tubo-protector-gel-dedos",
      title: "Tubo protector de gel para dedos",
      shortBenefit: "Protege cualquier dedo del roce y la presión.",
      description: "Tubo de gel que se corta a la medida del dedo. Cubre el dedo completo para proteger del roce y la presión. Producto héroe de descubrimiento: muchos usuarios no sabían que existía.",
      categorySlug: "juanetes-dedos",
      careLevel: "Diario",
      howToUse: "Corta el tubo a la longitud del dedo. Desliza sobre el dedo. Apto para cualquier dedo del pie.",
      benefits: "Universal para cualquier dedo\nRecortable a medida\nCubre y protege completo\nGel suave y reutilizable",
      precautions: "No usar sobre heridas abiertas. Lavar y secar entre usos. Retirar si causa adormecimiento.",
      whenToConsult: "Si la molestia no mejora o aparece dolor intenso.",
      badge: "Descubrimiento",
      presentation: "1 tubo recortable (~12 cm)",
      price: 99,
      rating: 4.5,
      reviewCount: 67,
      isHero: true,
      isDiscoverable: true,
      needs: "dedos,roce,presion",
      images: ["/products/jua-05.svg"],
      crossSellSkus: ["JUA-04", "ROC-01"],
    },

    // ─── CALLOS, ROCE Y PRESIÓN ───
    {
      sku: "ROC-01",
      slug: "anillos-protectores",
      title: "Anillos protectores",
      shortBenefit: "Anillo de gel que rodea el dedo para proteger la zona de roce.",
      description: "Anillos de gel que se colocan alrededor del dedo para proteger zonas de roce entre dedos. Diseño en anillo que cushiona sin cubrir el dedo completo.",
      categorySlug: "callos-roce-presion",
      careLevel: "Diario",
      howToUse: "Coloca el anillo alrededor del dedo, sobre la zona que se roza con el dedo vecino. Ajusta para que quede cómodo.",
      benefits: "Cushiona el roce entre dedos\nDiseño en anillo ligero\nFácil de colocar y retirar\nReutilizable",
      precautions: "No usar sobre heridas. Lavar con jabón neutro. Retirar si causa molestia.",
      whenToConsult: "Si el roce produce herida o callosidad importante.",
      presentation: "4 anillos universales",
      price: 89,
      rating: 4.3,
      reviewCount: 48,
      needs: "roce,dedos,callos",
      images: ["/products/roc-01.svg"],
      crossSellSkus: ["JUA-05", "ROC-02"],
    },
    {
      sku: "ROC-02",
      slug: "protector-punto-gel",
      title: "Protector con punto de gel",
      shortBenefit: "Protección localizada con punto de gel para zonas puntuales.",
      description: "Protector adhesivo con un punto de gel central que cushiona zonas puntuales de roce o presión (callos, juanetes, prominencias óseas).",
      categorySlug: "callos-roce-presion",
      careLevel: "Diario",
      howToUse: "Pega el protector sobre la zona limpia y seca, con el punto de gel sobre la zona sensible. Cambia cada 1-2 días o cuando se desprenda.",
      benefits: "Punto de gel cushiona zonas puntuales\nAdhesivo de larga duración\nDiscreto bajo el calzado\nAplicación rápida",
      precautions: "No aplicar sobre piel lesionada. Suspender si aparece irritación por el adhesivo.",
      whenToConsult: "Si la zona duele, se enrojece o presenta signos de infección.",
      presentation: "6 protectores adhesivos",
      price: 99,
      rating: 4.2,
      reviewCount: 29,
      needs: "roce,callos,presion",
      images: ["/products/roc-02.svg"],
      crossSellSkus: ["ROC-01", "ROC-03"],
    },
    {
      sku: "ROC-03",
      slug: "protector-callos",
      title: "Protector para callos",
      shortBenefit: "Protección para callosidades en planta y talón.",
      description: "Protector de gel para callosidades en la planta del pie o el talón. Reduce la presión al caminar sobre la zona endurecida.",
      categorySlug: "callos-roce-presion",
      careLevel: "Diario",
      howToUse: "Coloca el protector sobre la zona del callo, dentro del calcetín para fijarlo. Apto para uso con calzado.",
      benefits: "Reduce la presión al caminar\nCushiona callosidades\nApto para planta y talón\nReutilizable",
      precautions: "No usar sobre piel lesionada. Lavar con jabón neutro.",
      whenToConsult: "Si el callo duele, cambia de color o presenta signos de infección.",
      presentation: "2 protectores universales",
      price: 109,
      rating: 4.3,
      reviewCount: 37,
      needs: "callos,roce,presion",
      images: ["/products/roc-03.svg"],
      crossSellSkus: ["ROC-02", "SEC-02"],
    },

    // ─── TALÓN Y CONFORT ───
    {
      sku: "CON-01",
      slug: "almohadilla-metatarsal-confort",
      title: "Almohadilla metatarsal de confort",
      shortBenefit: "Amortigua la zona metatarsal al caminar.",
      description: "Almohadilla metatarsal que se coloca bajo la cabeza de los metatarsianos para absorber el impacto al caminar. Alivia el dolor en la bola del pie.",
      categorySlug: "talon-confort",
      careLevel: "Diario",
      howToUse: "Coloca la almohadilla dentro del calzado, bajo la zona metatarsal. Ajusta la posición hasta que resulte cómoda.",
      benefits: "Amortigua la zona metatarsal\nAlivia el dolor al caminar\nSe adapta al calzado\nMaterial durable",
      precautions: "Lavar con agua y jabón neutro. Reemplazar cuando pierda adherencia o forma.",
      whenToConsult: "Si el dolor metatarsal es intenso, persistente o se acompaña de inflamación.",
      presentation: "1 par — universal",
      price: 129,
      rating: 4.4,
      reviewCount: 52,
      needs: "confort,presion,dolor",
      images: ["/products/con-01.svg"],
      crossSellSkus: ["CON-02", "CON-03"],
    },
    {
      sku: "CON-02",
      slug: "talonera-alto-impacto",
      title: "Talonera de alto impacto",
      shortBenefit: "Amortiguación de alto impacto para talón.",
      description: "Talonera de gel de alta densidad que absorbe el impacto al caminar o estar de pie. Producto héroe para quienes pasan jornadas largas de pie.",
      categorySlug: "talon-confort",
      careLevel: "Diario",
      howToUse: "Pega la talonera dentro del calzado, en la zona del talón. Ajusta para que el pie quede centrado.",
      benefits: "Gel de alta densidad\nAbsorbe el impacto\nAlivia el dolor de talón\nIdeal para jornadas largas de pie",
      precautions: "Lavar con agua y jabón neutro. Reemplazar cuando pierda propiedades.",
      whenToConsult: "Si el dolor de talón es intenso, aparece de forma súbita, o no mejora con el uso.",
      badge: "Más vendido",
      presentation: "1 par — universal",
      price: 149,
      compareAtPrice: 179,
      rating: 4.6,
      reviewCount: 89,
      isHero: true,
      isBestseller: true,
      needs: "confort,talon,presion",
      images: ["/products/con-02.svg"],
      crossSellSkus: ["CON-01", "CON-03"],
    },
    {
      sku: "CON-03",
      slug: "talonera-fascitis-plantar",
      title: "Talonera para fascitis plantar",
      shortBenefit: "Soporte específico para la zona de fascitis plantar.",
      description: "Talonera con diseño específico para quienes presentan molestias asociadas a fascitis plantar. Combina amortiguación y soporte del arco.",
      categorySlug: "talon-confort",
      careLevel: "Diario",
      howToUse: "Coloca dentro del calzado bajo el talón, con la parte de soporte bajo el arco. Ajusta la posición.",
      benefits: "Diseño específico para fascitis\nAmortiguación y soporte\nAyuda a reducir la tensión\nApto para uso prolongado",
      precautions: "Lavar con agua y jabón neutro. Reemplazar cuando pierda forma.",
      whenToConsult: "Si el dolor empeora, aparece de forma aguda, o no mejora tras algunas semanas. La fascitis plantar puede requerir valoración profesional.",
      presentation: "1 par — universal",
      price: 179,
      rating: 4.4,
      reviewCount: 44,
      needs: "confort,talon,fascitis,dolor",
      images: ["/products/con-03.svg"],
      crossSellSkus: ["CON-01", "CON-02"],
    },
  ];

  const productMap: Record<string, { id: string }> = {};
  for (const p of products) {
    const catId = categoryMap[p.categorySlug].id;
    const created = await db.product.create({
      data: {
        sku: p.sku,
        slug: p.slug,
        title: p.title,
        shortBenefit: p.shortBenefit,
        description: p.description,
        categoryId: catId,
        careLevel: p.careLevel,
        howToUse: p.howToUse,
        benefits: p.benefits,
        precautions: p.precautions,
        whenToConsult: p.whenToConsult,
        badge: p.badge ?? null,
        routineStep: p.routineStep ?? null,
        activeIngredient: p.activeIngredient ?? null,
        presentation: p.presentation,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        rating: p.rating,
        reviewCount: p.reviewCount,
        isHero: p.isHero ?? false,
        isBestseller: p.isBestseller ?? false,
        isDiscoverable: p.isDiscoverable ?? false,
        isReorderable: p.isReorderable ?? true,
        needs: p.needs,
        images: JSON.stringify(p.images),
        crossSellIds: p.crossSellSkus?.join(",") ?? null,
      },
    });
    productMap[p.sku] = { id: created.id };
    console.log(`  ✓ Producto: ${p.sku} — ${p.title}`);
  }

  // ───────────────────────────────────────────────
  // 3. KITS (9 configuraciones de rutina)
  // ───────────────────────────────────────────────
  type KitSeed = {
    slug: string;
    title: string;
    shortBenefit: string;
    description: string;
    categorySlug: string;
    routineName: string;
    routineSummary: string;
    savingsLabel: string;
    steps: { title: string; description: string }[];
    howToCombine: string;
    price: number;
    compareAtPrice: number;
    isFeatured?: boolean;
    isAnchor?: boolean;
    items: { sku: string; stepNumber: number; stepLabel: string; quantity?: number }[];
  };

  const kits: KitSeed[] = [
    {
      slug: "kit-antihongos-unas-calzado",
      title: "Kit Antihongos — Uñas + Calzado",
      shortBenefit: "Rutina para uñas con cuidado completo del calzado.",
      description: "Combina la solución para uñas, el spray para calzado y el aceite higienizante para una rutina que cuida la uña afectada y el entorno del calzado.",
      categorySlug: "hongos",
      routineName: "Rutina Uñas + Calzado",
      routineSummary: "Solución uñas + spray calzado + aceite higienizante",
      savingsLabel: "Ahorra $44",
      steps: [
        { title: "Paso 1 — Uñas", description: "Aplica la solución sobre la uña limpia y seca, 1-2 veces al día." },
        { title: "Paso 2 — Complemento", description: "Aplica una gota de aceite higienizante sobre la uña, dejando absorber." },
        { title: "Paso 3 — Calzado", description: "Pulveriza el spray dentro del calzado tras cada uso para mantener la higiene." },
      ],
      howToCombine: "Usa la solución y el aceite en la uña por la mañana y/o noche. El spray se aplica en el calzado, no sobre la piel.",
      price: 419,
      compareAtPrice: 463,
      isFeatured: true,
      items: [
        { sku: "HON-01", stepNumber: 1, stepLabel: "Paso 1 — Uñas" },
        { sku: "HON-04", stepNumber: 2, stepLabel: "Paso 2 — Complemento" },
        { sku: "HON-03", stepNumber: 3, stepLabel: "Paso 3 — Calzado" },
      ],
    },
    {
      slug: "kit-antihongos-piel-calzado",
      title: "Kit Antihongos — Piel + Calzado",
      shortBenefit: "Rutina para la piel del pie con higiene del calzado.",
      description: "Para casos en los que la zona afectada es la piel del pie. Combina la crema antifúngica con el spray de calzado y el desodorante.",
      categorySlug: "hongos",
      routineName: "Rutina Piel + Calzado",
      routineSummary: "Crema antifúngica + spray + desodorante",
      savingsLabel: "Ahorra $44",
      steps: [
        { title: "Paso 1 — Piel", description: "Aplica la crema sobre la piel afectada, 1-2 veces al día." },
        { title: "Paso 2 — Olor", description: "Usa el desodorante por la mañana para controlar el olor." },
        { title: "Paso 3 — Calzado", description: "Pulveriza el spray dentro del calzado tras cada uso." },
      ],
      howToCombine: "La crema se aplica sobre la piel. El desodorante y el spray se aplican sobre pie y calzado respectivamente, no sobre la lesión.",
      price: 399,
      compareAtPrice: 443,
      items: [
        { sku: "HON-02", stepNumber: 1, stepLabel: "Paso 1 — Piel" },
        { sku: "SUD-02", stepNumber: 2, stepLabel: "Paso 2 — Olor" },
        { sku: "HON-03", stepNumber: 3, stepLabel: "Paso 3 — Calzado" },
      ],
    },
    {
      slug: "kit-antihongos-completo",
      title: "Kit Antihongos Completo",
      shortBenefit: "Rutina completa: uñas + piel + calzado + complemento.",
      description: "El kit ancla de precio. Combina todos los frentes de cuidado: uñas, piel, calzado y el complemento natural. Pensado para una rutina completa de cuidado antifúngico.",
      categorySlug: "hongos",
      routineName: "Rutina Completa Antihongos",
      routineSummary: "Uñas + piel + calzado + complemento",
      savingsLabel: "Ahorra $98",
      steps: [
        { title: "Paso 1 — Uñas", description: "Aplica la solución sobre la uña limpia y seca." },
        { title: "Paso 2 — Piel", description: "Aplica la crema sobre la piel afectada." },
        { title: "Paso 3 — Calzado", description: "Pulveriza el spray dentro del calzado tras cada uso." },
        { title: "Paso 4 — Complemento", description: "Aplica una gota de aceite sobre uña o zona afectada." },
      ],
      howToCombine: "Repartimos la rutina en los tres frentes: uña, piel y calzado, con el aceite como complemento. Mantén el uso constante durante el periodo indicado.",
      price: 619,
      compareAtPrice: 717,
      isAnchor: true,
      items: [
        { sku: "HON-01", stepNumber: 1, stepLabel: "Paso 1 — Uñas" },
        { sku: "HON-02", stepNumber: 2, stepLabel: "Paso 2 — Piel" },
        { sku: "HON-03", stepNumber: 3, stepLabel: "Paso 3 — Calzado" },
        { sku: "HON-04", stepNumber: 4, stepLabel: "Paso 4 — Complemento" },
      ],
    },
    {
      slug: "kit-talones-intensivo",
      title: "Kit Talones Intensivo",
      shortBenefit: "Rutina de hidratación intensa para talones resecos.",
      description: "Combina la urea 40 con la crema para piel extremadamente seca. La urea renueva la piel engrosada y la crema reparadora repone la barrera cutánea.",
      categorySlug: "piel-seca-talones",
      routineName: "Rutina Talones Intensivos",
      routineSummary: "Urea 40 + crema piel extremadamente seca",
      savingsLabel: "Ahorra $39",
      steps: [
        { title: "Paso 1 — Renovación", description: "Aplica urea 40 sobre la zona engrosada por la noche, 1 vez al día." },
        { title: "Paso 2 — Reparación", description: "Aplica la crema reparadora sobre el resto del pie, 1-2 veces al día." },
      ],
      howToCombine: "La urea 40 solo sobre la zona engrosada. La crema reparadora sobre todo el pie. No mezclar en la misma aplicación.",
      price: 339,
      compareAtPrice: 378,
      isFeatured: true,
      items: [
        { sku: "SEC-02", stepNumber: 1, stepLabel: "Paso 1 — Renovación" },
        { sku: "SEC-04", stepNumber: 2, stepLabel: "Paso 2 — Reparación" },
      ],
    },
    {
      slug: "kit-talones-sos",
      title: "Kit Talones SOS",
      shortBenefit: "Máxima concentración para talones muy agrietados.",
      description: "Para casos extremos. Combina la urea 60 con la mousse intensiva. Tratamiento de choque para talones muy engrosados y agrietados.",
      categorySlug: "piel-seca-talones",
      routineName: "Rutina Talones SOS",
      routineSummary: "Urea 60 + mousse intensiva",
      savingsLabel: "Ahorra $49",
      steps: [
        { title: "Paso 1 — Extra intensivo", description: "Aplica urea 60 solo sobre la zona muy engrosada, 2-3 veces por semana." },
        { title: "Paso 2 — Sensorial", description: "Aplica la mousse sobre el resto del pie, 1-2 veces al día." },
      ],
      howToCombine: "La urea 60 solo en la zona muy engrosada, con frecuencia controlada. La mousse para hidratación diaria del resto del pie.",
      price: 439,
      compareAtPrice: 488,
      items: [
        { sku: "SEC-03", stepNumber: 1, stepLabel: "Paso 1 — Extra intensivo" },
        { sku: "SEC-05", stepNumber: 2, stepLabel: "Paso 2 — Sensorial" },
      ],
    },
    {
      slug: "kit-pie-calzado",
      title: "Kit Pie + Calzado",
      shortBenefit: "Control de sudor y olor en pie y calzado.",
      description: "Combina el antitranspirante, el desodorante y el spray para calzado. Una rutina completa para quienes sufren de sudor y olor.",
      categorySlug: "sudor-mal-olor",
      routineName: "Rutina Pie + Calzado",
      routineSummary: "Antitranspirante + desodorante + spray",
      savingsLabel: "Ahorra $34",
      steps: [
        { title: "Paso 1 — Sudor", description: "Aplica el antitranspirante por la noche sobre el pie limpio y seco." },
        { title: "Paso 2 — Olor", description: "Usa el desodorante por la mañana sobre el pie limpio." },
        { title: "Paso 3 — Calzado", description: "Pulveriza el spray dentro del calzado tras cada uso." },
      ],
      howToCombine: "El antitranspirante se aplica por la noche, no sobre la piel lesionada. El desodorante por la mañana, y el spray sobre el calzado.",
      price: 389,
      compareAtPrice: 423,
      isFeatured: true,
      items: [
        { sku: "SUD-01", stepNumber: 1, stepLabel: "Paso 1 — Sudor" },
        { sku: "SUD-02", stepNumber: 2, stepLabel: "Paso 2 — Olor" },
        { sku: "HON-03", stepNumber: 3, stepLabel: "Paso 3 — Calzado" },
      ],
    },
    {
      slug: "kit-juanete-diario",
      title: "Kit Juanete Diario",
      shortBenefit: "Protección de día y cuidado de noche para juanete.",
      description: "Combina el protector diurno, el separador de gel y el corrector nocturno. Rutina completa de descubrimiento para la zona del juanete.",
      categorySlug: "juanetes-dedos",
      routineName: "Rutina Juanete Diario",
      routineSummary: "Protector + separador + corrector nocturno",
      savingsLabel: "Ahorra $49",
      steps: [
        { title: "Paso 1 — Día", description: "Usa el protector con separador durante el día dentro del calzado." },
        { title: "Paso 2 — Día", description: "Complementa con el separador de gel entre los dedos que se rozan." },
        { title: "Paso 3 — Noche", description: "Coloca el corrector nocturno antes de dormir. Retira por la mañana." },
      ],
      howToCombine: "Los protectores de día se usan con calzado. El corrector nocturno no se usa para caminar, solo para dormir.",
      price: 449,
      compareAtPrice: 498,
      isFeatured: true,
      items: [
        { sku: "JUA-01", stepNumber: 1, stepLabel: "Paso 1 — Día" },
        { sku: "JUA-03", stepNumber: 2, stepLabel: "Paso 2 — Día" },
        { sku: "JUA-02", stepNumber: 3, stepLabel: "Paso 3 — Noche" },
      ],
    },
    {
      slug: "kit-dedos-sin-roce",
      title: "Kit Dedos sin Roce",
      shortBenefit: "Todo lo que necesitas para dedos que se rozan.",
      description: "Combina el dedal, el tubo protector y los anillos protectores. Un kit de descubrimiento para quienes sufren roce entre dedos.",
      categorySlug: "juanetes-dedos",
      routineName: "Rutina Dedos sin Roce",
      routineSummary: "Dedal + tubo + anillos",
      savingsLabel: "Ahorra $29",
      steps: [
        { title: "Paso 1 — Dedo completo", description: "Corta el tubo a la medida del dedo y deslízalo sobre el dedo afectado." },
        { title: "Paso 2 — Punta del dedo", description: "Usa el dedal si la molestia está en la punta o la uña del dedo." },
        { title: "Paso 3 — Entre dedos", description: "Coloca los anillos entre los dedos que se rozan." },
      ],
      howToCombine: "El tubo cubre el dedo completo, el dedal la punta, los anillos separan dedos vecinos. Combina según la necesidad concreta.",
      price: 259,
      compareAtPrice: 288,
      isFeatured: true,
      items: [
        { sku: "JUA-05", stepNumber: 1, stepLabel: "Paso 1 — Dedo completo" },
        { sku: "JUA-04", stepNumber: 2, stepLabel: "Paso 2 — Punta del dedo" },
        { sku: "ROC-01", stepNumber: 3, stepLabel: "Paso 3 — Entre dedos" },
      ],
    },
    {
      slug: "kit-cuidado-diario-diabetes",
      title: "Kit Cuidado Diario Diabetes",
      shortBenefit: "Rutina preventiva diaria para pie diabético.",
      description: "Combina la crema de cuidado diario con calcetines para diabetes (disponible en 1, 3 o 5 pares). Pensado para el cuidado preventivo del pie en diabetes.",
      categorySlug: "diabetes",
      routineName: "Rutina Cuidado Diario Diabetes",
      routineSummary: "Crema + calcetines (1/3/5 pares)",
      savingsLabel: "Recomendado",
      steps: [
        { title: "Paso 1 — Hidratación", description: "Aplica la crema sobre el pie limpio y seco, masajeando suavemente. Evita entre los dedos." },
        { title: "Paso 2 — Protección", description: "Usa los calcetines diariamente. Cámbialos a diario y revisa el pie al hacerlo." },
      ],
      howToCombine: "Aplica la crema primero y deja absorber antes de calzar los calcetines. La revisión diaria del pie es parte esencial de la rutina.",
      price: 249,
      compareAtPrice: 258,
      isFeatured: true,
      items: [
        { sku: "DIA-02", stepNumber: 1, stepLabel: "Paso 1 — Hidratación" },
        { sku: "DIA-01", stepNumber: 2, stepLabel: "Paso 2 — Protección" },
      ],
    },
  ];

  for (const k of kits) {
    const catId = categoryMap[k.categorySlug].id;
    const created = await db.kit.create({
      data: {
        slug: k.slug,
        title: k.title,
        shortBenefit: k.shortBenefit,
        description: k.description,
        categoryId: catId,
        routineName: k.routineName,
        routineSummary: k.routineSummary,
        savingsLabel: k.savingsLabel,
        steps: JSON.stringify(k.steps),
        howToCombine: k.howToCombine,
        price: k.price,
        compareAtPrice: k.compareAtPrice,
        isFeatured: k.isFeatured ?? false,
        isAnchor: k.isAnchor ?? false,
      },
    });

    for (const item of k.items) {
      await db.kitItem.create({
        data: {
          kitId: created.id,
          productId: productMap[item.sku].id,
          stepNumber: item.stepNumber,
          stepLabel: item.stepLabel,
          quantity: item.quantity ?? 1,
        },
      });
    }
    console.log(`  ✓ Kit: ${k.title}`);
  }

  // ───────────────────────────────────────────────
  // 4. FAQs (metaobject FAQ)
  // ───────────────────────────────────────────────
  const faqs = [
    { question: "¿CuidoMisPies es una tienda especializada en pies?", answer: "Sí. CuidoMisPies es un ecommerce mexicano enfocado en cuidado especializado del pie, dirigido al consumidor final. Traducimos necesidades cotidianas de los pies en soluciones comprensibles.", category: "general", order: 1 },
    { question: "¿Necesito receta para comprar?", answer: "La mayoría de los productos del catálogo no requieren receta. Si algún producto la requiriera, se indicará claramente en la ficha. Ante cualquier duda, puedes solicitar asesoría.", category: "general", order: 2 },
    { question: "¿Hacen envíos a todo México?", answer: "Sí, realizamos envíos a todo México. El tiempo de entrega depende de tu ubicación y del paquetero seleccionado.", category: "general", order: 3 },
    { question: "¿Puedo comprar como invitado?", answer: "Sí, puedes completar tu compra como invitado sin necesidad de crear una cuenta.", category: "general", order: 4 },
    { question: "¿Cómo se si un producto es para mí?", answer: "Puedes usar el selector de necesidades en la home o el quiz 'Encuentra tu rutina'. Si tienes una condición particular, te recomendamos orientación profesional antes de elegir.", category: "general", order: 5 },
    { question: "¿El quiz diagnostica mi problema?", answer: "No. El quiz no diagnostica. Te ayuda a encontrar productos según la necesidad que indiques. Si reportas señales que ameritan valoración, te derivaremos a orientación profesional.", category: "general", order: 6 },

    { question: "¿Cuánto tarda en mejorar una uña con hongos?", answer: "La renovación de la uña es lenta porque crece de forma lenta. El tratamiento requiere constancia, varias semanas o meses, y debe acompañarse de higiene del calzado.", category: "hongos", order: 1, categoryId: categoryMap["hongos"].id },
    { question: "¿Por qué debo cuidar también el calzado?", answer: "El calzado puede contener microorganismos que re infectan la zona tratada. Cuidar el calzado es parte esencial de la rutina antifúngica.", category: "hongos", order: 2, categoryId: categoryMap["hongos"].id },
    { question: "¿Puedo usar los productos si tengo diabetes?", answer: "Si tienes diabetes, te recomendamos orientación profesional antes de iniciar cualquier tratamiento antifúngico. La piel del pie diabético requiere precauciones especiales.", category: "hongos", order: 3, categoryId: categoryMap["hongos"].id },

    { question: "¿Qué diferencia hay entre Urea 20, 40 y 60?", answer: "La concentración de urea determina la intensidad: 20% para hidratación diaria, 40% para piel engrosada y talones resecos, 60% para zonas muy engrosadas con uso controlado puntual.", category: "piel-seca", order: 1, categoryId: categoryMap["piel-seca-talones"].id },
    { question: "¿La urea 60 la puedo usar todos los días?", answer: "No. La urea 60 es de uso puntual, 2-3 veces por semana, solo sobre la zona muy engrosada. Un uso más frecuente puede causar irritación.", category: "piel-seca", order: 2, categoryId: categoryMap["piel-seca-talones"].id },

    { question: "¿El antitranspirante elimina el olor?", answer: "El antitranspirante reduce el sudor. El olor se controla mejor combinando antitranspirante, desodorante y spray para calzado.", category: "sudor", order: 1, categoryId: categoryMap["sudor-mal-olor"].id },

    { question: "¿El corrector nocturno elimina el juanete?", answer: "No. El corrector nocturno ayuda a mantener el dedo separado durante la noche de forma suave. No corrige la deformidad. Para valorar opciones, recomendamos orientación profesional.", category: "juanetes", order: 1, categoryId: categoryMap["juanetes-dedos"].id },

    { question: "¿Los protectores de gel son reutilizables?", answer: "Sí. La mayoría son reutilizables. Se lavan con agua y jabón neutro y se secan al aire. Reemplázalos cuando pierdan forma o propiedades.", category: "general", order: 7 },
  ];

  for (const f of faqs) {
    await db.faq.create({
      data: {
        question: f.question,
        answer: f.answer,
        category: f.category,
        categoryId: f.categoryId ?? null,
        order: f.order,
      },
    });
  }
  console.log(`  ✓ ${faqs.length} FAQs creadas`);

  // ───────────────────────────────────────────────
  // 5. REVIEWS (social proof representativo)
  // ───────────────────────────────────────────────
  const reviewsBySku: Record<string, { author: string; rating: number; title: string; body: string }[]> = {
    "HON-01": [
      { author: "María G.", rating: 5, title: "Constancia que vale la pena", body: "Después de varias semanas de uso constante la uña mejora. El pincel facilita mucho la aplicación." },
      { author: "Carlos R.", rating: 4, title: "Buen formato", body: "El aplicador con pincel hace que cubrir la uña sea fácil. Hay que tener paciencia pero funciona." },
    ],
    "SEC-02": [
      { author: "Laura M.", rating: 5, title: "Talones renovados", body: "Lo noté en dos semanas. Talones que estaban agrietados ahora mucho mejor. Uso nocturno." },
      { author: "Roberto J.", rating: 5, title: "Funciona muy bien", body: "Excelente para piel muy seca. El formato es cómodo y rinde bastante." },
      { author: "Ana P.", rating: 4, title: "Buen resultado", body: "Al principio algo de escozor, pero después bien. Los talones mejoraron notablemente." },
    ],
    "DIA-01": [
      { author: "José L.", rating: 5, title: "Por fin un calcetín cómodo", body: "No aprieta el tobillo y no tiene costuras que molesten. Mi pie sensible lo agradece." },
      { author: "Patricia V.", rating: 5, title: "Compré para mi papá", body: "Le quedan muy bien y no lo aprietan. La compra de 3 pares fue lo más conveniente." },
    ],
    "SUD-01": [
      { author: "Fernanda L.", rating: 5, title: "Por fin controlé el sudor", body: "Funciona. Lo uso por las noches como indica y durante el día el sudor bajó bastante." },
      { author: "Miguel A.", rating: 4, title: "Notable", body: "Se nota la diferencia. Lo recomiendo para quien tiene problema de sudor en los pies." },
    ],
    "JUA-01": [
      { author: "Sofía R.", rating: 5, title: "Me cambió el día", body: "Ya no me duele el juanete al caminar con calzado cerrado. Muy cómodo y discreto." },
      { author: "Eduardo N.", rating: 4, title: "Funciona", body: "Separa el dedo y cushiona el juanete. Hay que acostumbrarse pero ayuda mucho." },
    ],
    "JUA-05": [
      { author: "Daniela C.", rating: 5, title: "No sabía que existía", body: "Me rocé un dedo con el calzado y esto lo resolvió. Lo recortas a la medida, genial." },
    ],
    "CON-02": [
      { author: "Trabajador de pie", rating: 5, title: "Jornada mucho más llevadera", body: "Trabajo de pie 8 horas y esto cambia todo. El talón ya no me duele al final del día." },
      { author: "Marta Q.", rating: 4, title: "Buena amortiguación", body: "Se nota que absorbe el impacto. Se ajusta bien al calzado." },
    ],
  };

  for (const [sku, reviews] of Object.entries(reviewsBySku)) {
    const productId = productMap[sku].id;
    for (const r of reviews) {
      await db.review.create({
        data: {
          productId,
          authorName: r.author,
          rating: r.rating,
          title: r.title,
          body: r.body,
        },
      });
    }
  }
  console.log(`  ✓ Reviews creadas para ${Object.keys(reviewsBySku).length} productos`);

  // ───────────────────────────────────────────────
  // 6. RUTINAS (metaobject Routine) — para QR postventa
  // ───────────────────────────────────────────────
  const routines = [
    {
      slug: "rutina-antihongos-completa",
      name: "Rutina Antihongos Completa",
      need: "hongos",
      shortDescription: "Cuidado de uñas, piel y calzado en una rutina completa.",
      stepsJson: JSON.stringify([
        { step: 1, title: "Uñas", description: "Aplica la solución sobre la uña limpia y seca, 1-2 veces al día." },
        { step: 2, title: "Piel", description: "Aplica la crema sobre la piel afectada." },
        { step: 3, title: "Calzado", description: "Pulveriza el spray dentro del calzado tras cada uso." },
        { step: 4, title: "Complemento", description: "Aplica el aceite higienizante sobre la uña." },
      ]),
      precautions: "Uso externo. Constancia en la rutina. No suspender antes de tiempo.",
      whenToConsult: "Si tienes diabetes, o si no hay mejora tras varias semanas.",
      qrContent: "Rutina Antihongos Completa — CuidoMisPies",
    },
    {
      slug: "rutina-talones-intensivos",
      name: "Rutina Talones Intensivos",
      need: "piel-seca",
      shortDescription: "Renovación y reparación de talones resecos.",
      stepsJson: JSON.stringify([
        { step: 1, title: "Renovación", description: "Urea 40 sobre la zona engrosada, por la noche." },
        { step: 2, title: "Reparación", description: "Crema reparadora sobre todo el pie, 1-2 veces al día." },
      ]),
      precautions: "No aplicar urea 40 entre los dedos. Uso externo.",
      whenToConsult: "Si hay fisuras con sangrado o signos de infección.",
      qrContent: "Rutina Talones Intensivos — CuidoMisPies",
    },
    {
      slug: "rutina-cuidado-diario-diabetes",
      name: "Rutina Cuidado Diario Diabetes",
      need: "diabetes",
      shortDescription: "Hidratación y protección preventiva del pie diabético.",
      stepsJson: JSON.stringify([
        { step: 1, title: "Hidratación", description: "Crema de cuidado diario sobre el pie limpio y seco." },
        { step: 2, title: "Protección", description: "Calcetines para diabetes, cambio diario." },
        { step: 3, title: "Revisión", description: "Revisa el pie a diario al cambiar los calcetines." },
      ]),
      precautions: "No aplicar crema entre los dedos. Revisión diaria esencial.",
      whenToConsult: "Ante cualquier herida, cambio de color o pérdida de sensibilidad.",
      qrContent: "Rutina Cuidado Diario Diabetes — CuidoMisPies",
    },
  ];

  for (const r of routines) {
    await db.routine.create({ data: r });
  }
  console.log(`  ✓ ${routines.length} rutinas creadas`);

  console.log("\n✅ Seed completado: catálogo MVP de CuidoMisPies listo.");
  console.log(`   ${categories.length} categorías, ${products.length} productos, ${kits.length} kits`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
