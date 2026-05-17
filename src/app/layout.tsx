import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "AI Business OS — Launch Your AI Business in 2026",
  description: "Three plug-and-play digital products. One complete system. Everything a beginner needs to build a profitable AI-powered business in 2026.",
  keywords: "AI business, digital products, freelancer kit, AI prompts, business launch system",
  openGraph: {
    title: "AI Business OS",
    description: "Launch your AI business. From zero to revenue.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
