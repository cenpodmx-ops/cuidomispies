"use client";

import { useState, useEffect } from "react";
import { useStore, useCartCount } from "@/lib/store";
import { useCatalog } from "@/lib/use-catalog";
import { cn } from "@/lib/utils";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  Truck,
  ShieldCheck,
  Stethoscope,
  User,
  Sparkles,
} from "lucide-react";
import { CategoryIcon } from "../icons";

export function Header() {
  const navigate = useStore((s) => s.navigate);
  const openCart = useStore((s) => s.openCart);
  const setSearchOpen = useStore((s) => s.setSearchOpen);
  const mobileMenuOpen = useStore((s) => s.mobileMenuOpen);
  const setMobileMenuOpen = useStore((s) => s.setMobileMenuOpen);
  const cartCount = useCartCount();
  const { data: catalog } = useCatalog();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = catalog?.categories ?? [];
  const heroKits = catalog?.kits.filter((k) => k.isFeatured).slice(0, 4) ?? [];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Barra superior */}
      <div className="bg-cmp-graphite text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-[11px] sm:px-6">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="hidden items-center gap-1.5 sm:flex">
              <Truck size={12} /> Envíos a todo México
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={12} /> Compra segura
            </span>
            <span className="hidden items-center gap-1.5 md:flex">
              <Stethoscope size={12} /> Atención profesional
            </span>
          </div>
          <span className="hidden text-white/70 sm:block">Soluciones para cada paso</span>
        </div>
      </div>

      {/* Header principal */}
      <div
        className={cn(
          "border-b border-border bg-background/95 backdrop-blur transition-shadow",
          scrolled && "shadow-sm"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-accent lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <button
            onClick={() => navigate({ name: "home" })}
            className="flex items-center shrink-0"
            aria-label="CuidoMisPies inicio"
          >
            <img src="/logo.svg" alt="CuidoMisPies" className="h-8 w-auto sm:h-9" />
          </button>

          {/* Desktop nav */}
          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            <NavDropdown label="¿Qué quieres cuidar?" categories={categories} />
            <NavItem onClick={() => navigate({ name: "home" })} section="kits">
              Kits y rutinas
            </NavItem>
            <NavItem onClick={() => navigate({ name: "home" })} section="descubrimiento">
              Productos
            </NavItem>
            <NavItem onClick={() => navigate({ name: "routine-finder" })}>
              Encuentra tu rutina
            </NavItem>
            <NavItem onClick={() => navigate({ name: "asesoria" })}>Asesoría</NavItem>
          </nav>

          {/* Search */}
          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-cmp-teal/40 sm:px-4"
              aria-label="Buscar productos"
            >
              <Search size={16} />
              <span className="hidden sm:inline">¿Qué necesitas cuidar?</span>
            </button>

            {/* Account (desktop) */}
            <button
              onClick={() => navigate({ name: "asesoria" })}
              className="hidden h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-accent sm:flex"
              aria-label="Mi cuenta"
            >
              <User size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-accent"
              aria-label={`Carrito (${cartCount} productos)`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cmp-teal px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <MobileMenu
          categories={categories}
          heroKits={heroKits}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

function NavItem({
  children,
  onClick,
  section,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  section?: string;
}) {
  const navigate = useStore((s) => s.navigate);
  return (
    <button
      onClick={() => {
        if (section) {
          navigate({ name: "home" });
          setTimeout(() => {
            document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          onClick?.();
        }
      }}
      className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
    >
      {children}
    </button>
  );
}

function NavDropdown({
  label,
  categories,
}: {
  label: string;
  categories: { slug: string; name: string; shortName: string; tagline: string; iconKey: string; accentColor: string }[];
}) {
  const [open, setOpen] = useState(false);
  const navigate = useStore((s) => s.navigate);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
      >
        {label}
        <ChevronRight size={14} className={`transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 w-[560px] pt-2">
          <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card p-3 shadow-xl">
            {categories.map((c) => {
              return (
                <button
                  key={c.slug}
                  onClick={() => {
                    navigate({ name: "category", slug: c.slug });
                    setOpen(false);
                  }}
                  className="group flex items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-accent"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: c.accentColor + "20" }}
                  >
                    <CategoryIcon iconKey={c.iconKey} size={18} style={{ color: c.accentColor }} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">
                      {c.name}
                    </span>
                    <span className="block text-xs text-muted-foreground truncate">
                      {c.tagline}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  categories,
  heroKits,
  onClose,
}: {
  categories: any[];
  heroKits: any[];
  onClose: () => void;
}) {
  const navigate = useStore((s) => s.navigate);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-background shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-border p-4">
          <img src="/logo.svg" alt="CuidoMisPies" className="h-7 w-auto" />
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent"
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            ¿Qué quieres cuidar?
          </p>
          <div className="space-y-1">
            {categories.map((c) => {
              return (
                <button
                  key={c.slug}
                  onClick={() => {
                    navigate({ name: "category", slug: c.slug });
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left hover:bg-accent"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: c.accentColor + "20" }}
                  >
                    <CategoryIcon iconKey={c.iconKey} size={18} style={{ color: c.accentColor }} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">
                      {c.shortName}
                    </span>
                    <span className="block text-xs text-muted-foreground truncate">
                      {c.tagline}
                    </span>
                  </span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              );
            })}
          </div>

          <div className="mt-6 space-y-1 border-t border-border pt-4">
            <button
              onClick={() => {
                navigate({ name: "routine-finder" });
                onClose();
              }}
              className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left hover:bg-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cmp-teal/15">
                <Sparkles size={18} className="text-cmp-teal" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                Encuentra tu rutina
              </span>
            </button>
            <button
              onClick={() => {
                navigate({ name: "asesoria" });
                onClose();
              }}
              className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left hover:bg-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cmp-sage/30">
                <Stethoscope size={18} className="text-cmp-teal" />
              </span>
              <span className="text-sm font-semibold text-foreground">Asesoría</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
