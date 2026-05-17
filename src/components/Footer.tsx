"use client";
import Link from "next/link";

const products = [
  { href: "/products/freelancer-kit", label: "Freelancer AI Command Kit" },
  { href: "/products/local-business-playbook", label: "Local Business AI Playbook" },
  { href: "/products/ai-business-launch-system", label: "AI Business Launch System" },
];

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }} className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)]" />
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "18px" }}>AI Business OS</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.7" }}>
              Three plug-and-play digital products.<br />One complete system. Start today.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "16px" }}>hello@aibusinessos.com</p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, marginBottom: "16px", fontSize: "14px", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Navigation</p>
            <div className="flex flex-col gap-3">
              {links.map(({ href, label }) => (
                <Link key={href} href={href} style={{ color: "var(--text-secondary)", fontSize: "14px" }}
                  className="hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, marginBottom: "16px", fontSize: "14px", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Products</p>
            <div className="flex flex-col gap-3">
              {products.map(({ href, label }) => (
                <Link key={href} href={href} style={{ color: "var(--text-secondary)", fontSize: "14px" }}
                  className="hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "24px" }} className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>© 2026 AI Business OS. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(t => (
              <span key={t} style={{ color: "var(--text-muted)", fontSize: "13px", cursor: "default" }}
                className="hover:text-white transition-colors">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
