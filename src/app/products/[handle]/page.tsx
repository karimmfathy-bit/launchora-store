import { getProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import ClientAddToCart from "./ClientAddToCart"; // We'll create this to handle cart interactions

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  const product = await getProductByHandle(resolvedParams.handle);

  if (!product) {
    notFound();
  }

  const price = product.variants.edges[0]?.node.price.amount || "0";

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <section className="pt-36 pb-20 px-6" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/products" className="inline-flex items-center gap-2 mb-8 hover:text-white transition-colors" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            ← Back to products
          </Link>
          <br/>
          <span className="badge badge-teal mb-6 inline-flex">Shopify Product</span>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,56px)", marginBottom: "20px" }}>
            {product.title}
          </h1>
          <p> style={{ color: "var(--text-secondary)", fontSize: "18px", lineHeight: "1.7", marginBottom: "32px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto"
            {product.description}
          </p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "52px", color: "var(--accent-teal)" }}>
              ${price}
            </span>
          </div>

          <ClientAddToCart product={{
            id: product.handle,
            name: product.title,
            price: Number(price),
            description: product.description.substring(0, 100) + "..."
          }} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
