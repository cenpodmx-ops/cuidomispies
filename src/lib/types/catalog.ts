// Tipos compartidos del dominio CuidoMisPies.
// Estos tipos reflejan el modelo de datos de Shopify (productos, kits, metafields).

export type Category = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longText: string;
  iconKey: string;
  accentColor: string;
  heroImage: string | null;
  order: number;
  isPriority: boolean;
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  title: string;
  shortBenefit: string;
  description: string;
  categoryId: string;
  categorySlug?: string;
  careLevel: string;
  howToUse: string;
  benefits: string[];
  precautions: string;
  whenToConsult: string;
  badge: string | null;
  routineStep: string | null;
  activeIngredient: string | null;
  presentation: string;
  brand: string;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  reviewCount: number;
  isHero: boolean;
  isBestseller: boolean;
  isDiscoverable: boolean;
  isReorderable: boolean;
  needs: string[];
  images: string[];
  crossSellIds: string[];
  reviews?: Review[];
};

export type KitItem = {
  id: string;
  stepNumber: number;
  stepLabel: string;
  quantity: number;
  product: Product;
};

export type Kit = {
  id: string;
  slug: string;
  title: string;
  shortBenefit: string;
  description: string;
  categoryId: string;
  categorySlug?: string;
  routineName: string;
  routineSummary: string;
  savingsLabel: string;
  steps: { title: string; description: string }[];
  howToCombine: string;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isAnchor: boolean;
  heroImage: string | null;
  items: KitItem[];
};

export type Review = {
  id: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
  isVerified: boolean;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  categoryId: string | null;
  order: number;
};

export type Catalog = {
  categories: Category[];
  products: Product[];
  kits: Kit[];
  faqs: Faq[];
};

// ─── Helpers de serialización ───

export function serializeProduct(p: any, withReviews = false): Product {
  return {
    id: p.id,
    sku: p.sku,
    slug: p.slug,
    title: p.title,
    shortBenefit: p.shortBenefit,
    description: p.description,
    categoryId: p.categoryId,
    categorySlug: p.category?.slug,
    careLevel: p.careLevel,
    howToUse: p.howToUse,
    benefits: p.benefits.split("\n").filter(Boolean),
    precautions: p.precautions,
    whenToConsult: p.whenToConsult,
    badge: p.badge,
    routineStep: p.routineStep,
    activeIngredient: p.activeIngredient,
    presentation: p.presentation,
    brand: p.brand,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    rating: p.rating,
    reviewCount: p.reviewCount,
    isHero: p.isHero,
    isBestseller: p.isBestseller,
    isDiscoverable: p.isDiscoverable,
    isReorderable: p.isReorderable,
    needs: p.needs.split(",").filter(Boolean),
    images: JSON.parse(p.images),
    crossSellIds: p.crossSellIds ? p.crossSellIds.split(",").filter(Boolean) : [],
    reviews: withReviews
      ? (p.reviews ?? []).map((r: any) => ({
          id: r.id,
          authorName: r.authorName,
          rating: r.rating,
          title: r.title,
          body: r.body,
          isVerified: r.isVerified,
        }))
      : undefined,
  };
}

export function serializeKit(k: any): Kit {
  return {
    id: k.id,
    slug: k.slug,
    title: k.title,
    shortBenefit: k.shortBenefit,
    description: k.description,
    categoryId: k.categoryId,
    categorySlug: k.category?.slug,
    routineName: k.routineName,
    routineSummary: k.routineSummary,
    savingsLabel: k.savingsLabel,
    steps: JSON.parse(k.steps),
    howToCombine: k.howToCombine,
    price: k.price,
    compareAtPrice: k.compareAtPrice,
    rating: k.rating,
    reviewCount: k.reviewCount,
    isFeatured: k.isFeatured,
    isAnchor: k.isAnchor,
    heroImage: k.heroImage,
    items: (k.items ?? [])
      .sort((a: any, b: any) => a.stepNumber - b.stepNumber)
      .map((it: any) => ({
        id: it.id,
        stepNumber: it.stepNumber,
        stepLabel: it.stepLabel,
        quantity: it.quantity,
        product: serializeProduct(it.product),
      })),
  };
}

export function serializeCategory(c: any): Category {
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    shortName: c.shortName,
    tagline: c.tagline,
    description: c.description,
    longText: c.longText,
    iconKey: c.iconKey,
    accentColor: c.accentColor,
    heroImage: c.heroImage,
    order: c.order,
    isPriority: c.isPriority,
  };
}

export function serializeFaq(f: any): Faq {
  return {
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
    categoryId: f.categoryId,
    order: f.order,
  };
}
