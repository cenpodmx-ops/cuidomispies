import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CuidoMisPies — Soluciones para cada paso",
  description:
    "Productos especializados, kits y rutinas para las necesidades más comunes de tus pies. Encuentra tu solución sin tener que saber qué producto buscar.",
  keywords: [
    "cuidado de pies",
    "podología",
    "hongos uñas",
    "juanetes",
    "diabetes pies",
    "urea",
    "talones secos",
    "ecommerce México",
    "CuidoMisPies",
  ],
  authors: [{ name: "CuidoMisPies" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "CuidoMisPies — Soluciones para cada paso",
    description:
      "Productos especializados, kits y rutinas para las necesidades más comunes de tus pies.",
    siteName: "CuidoMisPies",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "CuidoMisPies",
    description: "Soluciones para cada paso.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
