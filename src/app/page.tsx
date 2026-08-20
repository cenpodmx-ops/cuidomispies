"use client";

import { QueryProvider } from "@/lib/query-provider";
import { useStore } from "@/lib/store";
import { Header } from "@/components/cmp/layout/Header";
import { Footer } from "@/components/cmp/layout/Footer";
import { CartDrawer } from "@/components/cmp/layout/CartDrawer";
import { SearchOverlay } from "@/components/cmp/layout/SearchOverlay";
import { HomePage } from "@/components/cmp/home/HomePage";
import { CategoryView } from "@/components/cmp/views/CategoryView";
import { ProductView } from "@/components/cmp/views/ProductView";
import { KitView } from "@/components/cmp/views/KitView";
import { RoutineFinderView } from "@/components/cmp/views/RoutineFinderView";
import { AsesoriaView } from "@/components/cmp/views/AsesoriaView";

export default function Home() {
  return (
    <QueryProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
      </div>
    </QueryProvider>
  );
}

function Router() {
  const route = useStore((s) => s.route);

  switch (route.name) {
    case "home":
      return <HomePage />;
    case "category":
      return <CategoryView slug={route.slug} />;
    case "product":
      return <ProductView slug={route.slug} />;
    case "kit":
      return <KitView slug={route.slug} />;
    case "routine-finder":
      return <RoutineFinderView />;
    case "asesoria":
      return <AsesoriaView />;
    default:
      return <HomePage />;
  }
}
