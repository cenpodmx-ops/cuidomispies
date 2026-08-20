"use client";

import { useStore, useCartTotal, formatMXN } from "@/lib/store";
import { useCatalog, productsByIds } from "@/lib/use-catalog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, X, Truck, ArrowRight, Sparkles } from "lucide-react";
import { PriceTag } from "../PriceTag";
import { cn } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 599;

export function CartDrawer() {
  const isOpen = useStore((s) => s.cart.isOpen);
  const closeCart = useStore((s) => s.closeCart);
  const items = useStore((s) => s.cart.items);
  const updateQuantity = useStore((s) => s.updateQuantity);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const navigate = useStore((s) => s.navigate);
  const total = useCartTotal();
  const { data: catalog } = useCatalog();

  // Cross-sell: productos sugeridos basados en lo que ya está en el carrito
  const cartProductIds = items.filter((i) => i.kind === "product").map((i) => i.id);
  const crossSellSkus = items
    .filter((i) => i.kind === "product")
    .flatMap((i) => {
      const p = catalog?.products.find((pr) => pr.id === i.id);
      return p?.crossSellIds ?? [];
    });
  const crossSellProducts = productsByIds(catalog, [...new Set(crossSellSkus)])
    .filter((p) => !cartProductIds.includes(p.id))
    .slice(0, 2);

  const addToCart = useStore((s) => s.addToCart);

  const remaining = FREE_SHIPPING_THRESHOLD - total;
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={(v) => !v && closeCart()}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 font-display text-lg">
            <ShoppingBag size={20} /> Tu carrito
          </SheetTitle>
          <SheetDescription className="sr-only">
            {items.length === 0 ? "Carrito vacío" : `${items.length} productos en el carrito`}
          </SheetDescription>
        </SheetHeader>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="border-b border-border bg-accent/50 px-5 py-3">
            {remaining > 0 ? (
              <p className="mb-2 text-xs text-foreground">
                Te faltan <strong className="text-cmp-teal">{formatMXN(remaining)}</strong> para{" "}
                <strong>envío gratis</strong>
              </p>
            ) : (
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-cmp-teal">
                <Truck size={14} /> ¡Tienes envío gratis!
              </p>
            )}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cmp-sage to-cmp-teal transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-cmp">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <ShoppingBag size={28} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-display text-base font-semibold">Tu carrito está vacío</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Explora nuestras soluciones para cada necesidad del pie.
                </p>
              </div>
              <Button
                onClick={() => {
                  closeCart();
                  navigate({ name: "home" });
                }}
                className="bg-cmp-teal hover:bg-cmp-teal-dark"
              >
                Explorar productos
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        {item.kind === "kit" && (
                          <span className="mb-0.5 inline-flex items-center gap-1 rounded-full bg-cmp-teal/10 px-1.5 py-0.5 text-[10px] font-semibold text-cmp-teal">
                            <Sparkles size={9} /> Kit
                          </span>
                        )}
                        <p className="text-sm font-semibold leading-snug text-foreground line-clamp-2">
                          {item.title}
                        </p>
                        {item.presentation && (
                          <p className="text-[11px] text-muted-foreground">{item.presentation}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-accent"
                          aria-label="Reducir cantidad"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-accent"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-sm font-bold">{formatMXN(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Cross-sell */}
          {items.length > 0 && crossSellProducts.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Completa tu rutina
              </p>
              <div className="space-y-2">
                {crossSellProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 rounded-xl border border-dashed border-cmp-sage/40 bg-cmp-sage/5 p-3"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                      <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold leading-snug line-clamp-1">{p.title}</p>
                      <p className="text-xs text-cmp-teal font-bold">{formatMXN(p.price)}</p>
                    </div>
                    <button
                      onClick={() =>
                        addToCart({
                          id: p.id,
                          kind: "product",
                          slug: p.slug,
                          title: p.title,
                          price: p.price,
                          image: p.images[0],
                          presentation: p.presentation,
                        })
                      }
                      className="flex h-8 items-center gap-1 rounded-lg bg-cmp-teal px-2.5 text-xs font-semibold text-white hover:bg-cmp-teal-dark"
                    >
                      <Plus size={12} /> Añadir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer del carrito */}
        {items.length > 0 && (
          <div className="border-t border-border bg-card px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-lg font-bold">{formatMXN(total)}</span>
            </div>
            <p className="mb-3 text-[11px] text-muted-foreground">
              Los costos de envío se calculan al finalizar la compra.
            </p>
            <Button
              className="w-full bg-cmp-teal text-base hover:bg-cmp-teal-dark"
              size="lg"
              onClick={() => {
                toastCheckout();
              }}
            >
              Finalizar compra · {formatMXN(total)}
              <ArrowRight size={16} className="ml-1" />
            </Button>
            <button
              onClick={closeCart}
              className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Seguir explorando
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function toastCheckout() {
  import("sonner").then(({ toast }) => {
    toast.success("¡Casi listo!", {
      description:
        "Esta es una demostración del flujo de checkout. En producción, aquí se procesaría el pago con tu pasarela.",
    });
  });
}
