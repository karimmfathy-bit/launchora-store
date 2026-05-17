import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import { getAllProducts } from "@/lib/shopify";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-20 px-6 text-center" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-2xl mx-auto gs-fade-up">
          <span className="badge badge-purple mb-6 inline-flex">All Products</span>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,56px)", marginBottom: "16px" }}>
            Everything you need to launch.
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>
            Dynamically fetched from Shopify.
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {products.map((p: any, index: number) => {
            const price = p.variants.edges[0]?.node.price.amount || "0";
            return (
              <div key={p.id} className="gs-fade-up glass-card p-8 md:p-10" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 md:w-16">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(99,102,241,0.15)" }}>
                      <Package className="w-6 h-6 text-[var(--accent-purple)]" />
                    </div>
                    <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "42px", color: `rgba(99,102,241,0.2)`, lineHeight: 1 }}>0{index + 1}</span>
                  </div>

                  <div className="flex-1">
                    <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "24px", marginBottom: "12px" }}>{p.title}</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.75", marginBottom: "20px" }}>
                      {p.description.length > 200 ? p.description.substring(0, 200) + "..." : p.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-center md:items-end justify-center gap-6 md:w-48 shrink-0">
                    <div className="text-center md:text-right">
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "36px", color: "var(--accent-purple)" }}>${price}</p>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      <Link href={`/products/${p.handle}`} className="w-full">
                        <button className="btn-primary w-full justify-center">View Details <ArrowRight className="w-4 h-4 ml-2" /></button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
