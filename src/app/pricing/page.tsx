"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const GUMROAD = {
  kit: "https://gumroad.com/l/freelancer-ai-kit", // TODO: Replace with real Gumroad URL
  playbook: "https://gumroad.com/l/local-business-playbook", // TODO: Replace with real Gumroad URL
  launch: "https://gumroad.com/l/ai-business-launch-system", // TODO: Replace with real Gumroad URL
  bundle: "https://gumroad.com/l/ai-business-os-bundle", // TODO: Replace with real Gumroad URL
};

const tiers = [
  {
    name: "Freelancer AI Command Kit",
    badge: "Entry Level",
    badgeClass: "badge-purple",
    price: "$37",
    oldPrice: "$67",
    accent: "var(--accent-purple)",
    desc: "Perfect first step. 50 done-for-you prompts for freelancers and solopreneurs.",
    features: ["50 AI prompt templates", "Client email scripts", "Proposal generator system", "Social media content vault", "Instant PDF download", "Free updates"],
    cta: "Buy Now — $37",
    ctaClass: "btn-outline",
    gumroad: GUMROAD.kit,
    href: "/products/freelancer-kit",
    featured: false,
  },
  {
    name: "Local Business AI Playbook",
    badge: "⭐ Most Popular",
    badgeClass: "badge-gold",
    price: "$97",
    oldPrice: "$147",
    accent: "var(--accent-gold)",
    desc: "The complete AI system for real estate agents and local business owners.",
    features: ["Everything in Starter", "Industry-specific prompt library", "30-day content calendar", "Client email templates", "Lead generation scripts", "AI tool setup guide", "Premium designed PDF", "Priority email support"],
    cta: "Buy Now — $97",
    ctaClass: "btn-gold",
    gumroad: GUMROAD.playbook,
    href: "/products/local-business-playbook",
    featured: true,
  },
  {
    name: "AI Business Launch System",
    badge: "Premium",
    badgeClass: "badge-teal",
    price: "$197",
    oldPrice: "$297",
    accent: "var(--accent-teal)",
    desc: "The full end-to-end blueprint. 7 modules, 50 launch prompts, complete system.",
    features: ["Everything in Professional", "7 complete learning modules", "Niche selector framework", "24-hour product creation system", "Content & marketing engine", "First-sale 7-day action plan", "50 business launch prompts", "Lifetime access & updates"],
    cta: "Buy Now — $197",
    ctaClass: "btn-primary",
    gumroad: GUMROAD.launch,
    href: "/products/ai-business-launch-system",
    featured: false,
  },
];

const bundleFeatures = [
  "The Freelancer AI Command Kit (50 prompts)",
  "The Local Business AI Playbook (60+ prompts + 30-day calendar)",
  "The AI Business Launch System (7 modules + 50 launch prompts)",
  "Every email template, script, and framework from all 3 products",
  "Lifetime access & all future updates",
  "Priority email support",
];

const faqs = [
  { q: "What format are the products?", a: "All products are instant-download PDFs, optimized for both screen and print. You'll also receive a Notion-friendly version where applicable." },
  { q: "How do I receive my purchase?", a: "Immediately after purchase, Gumroad sends a download link to your email. No waiting. No account creation required." },
  { q: "Is there a money-back guarantee?", a: "Yes — 30 days, no questions asked. Email us and we'll process your refund immediately." },
  { q: "Can I use these products to build my business?", a: "Absolutely. That's exactly what they're designed for. You get full rights to use every template, prompt, and framework in your own business." },
  { q: "Do I need any experience?", a: "No. Every product assumes you're starting from zero. Step-by-step instructions are included." },
  { q: "Will there be updates?", a: "Yes. All updates to products you've purchased are delivered free, forever." },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray<HTMLElement>(".gs-fade-up").forEach((el) => {
      gsap.fromTo(el, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 text-center" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-2xl mx-auto gs-fade-up">
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,52px)", marginBottom: "16px" }}>
            Simple, Honest Pricing.
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>
            One-time payment. Instant download. No subscriptions.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto gs-fade-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {tiers.map((tier) => (
              <div key={tier.name} className="relative">
                <div className={`glass-card p-8 rounded-3xl flex flex-col h-full ${tier.featured ? "" : ""}`}
                  style={tier.featured ? { borderColor: "rgba(245,166,35,0.35)", boxShadow: "0 0 60px rgba(245,166,35,0.1)", transform: "scale(1.04)" } : {}}>
                  {tier.featured && <div className="ribbon">BEST VALUE</div>}
                  <span className={`badge ${tier.badgeClass} mb-4 self-start`}>{tier.badge}</span>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "18px", marginBottom: "12px", minHeight: "48px" }}>{tier.name}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>{tier.desc}</p>
                  <div className="mb-6">
                    <p style={{ color: "var(--text-muted)", textDecoration: "line-through", fontSize: "14px" }}>{tier.oldPrice}</p>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "48px", color: tier.accent, lineHeight: 1 }}>{tier.price}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "4px" }}>one-time · instant download</p>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[var(--accent-teal)]" />{f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3">
                    <a href={tier.gumroad} target="_blank" rel="noopener noreferrer">
                      <button className={`${tier.ctaClass} w-full justify-center`}>{tier.cta} <ArrowRight className="w-4 h-4" /></button>
                    </a>
                    <Link href={tier.href}>
                      <button className="btn-outline w-full justify-center py-2 text-sm" style={{ fontSize: "12px" }}>View Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto gs-fade-up">
          <div className="p-10 md:p-14 rounded-3xl relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(245,166,35,0.06))", border: "1px solid rgba(99,102,241,0.25)" }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, var(--accent-gold), transparent)" }} />
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <p style={{ fontSize: "24px", marginBottom: "8px" }}>🔥</p>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "28px", marginBottom: "12px" }}>
                  Get All Three — The Complete Bundle
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "20px" }}>
                  Save $84 when you get all three products together.
                </p>
                <ul className="flex flex-col gap-2">
                  {bundleFeatures.map(f => (
                    <li key={f} className="flex items-start gap-2" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[var(--accent-gold)]" />{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 text-center">
                <p style={{ color: "var(--text-muted)", textDecoration: "line-through", fontSize: "18px" }}>$331</p>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "56px", color: "var(--accent-gold)", lineHeight: 1, marginBottom: "8px" }}>$247</p>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "24px" }}>You save $84</p>
                <a href={GUMROAD.bundle} target="_blank" rel="noopener noreferrer">
                  <button className="btn-gold text-lg px-8 py-4">Get the Bundle — $247 <ArrowRight className="w-5 h-5" /></button>
                </a>
                <div className="flex items-center justify-center gap-2 mt-4" style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                  <ShieldCheck className="w-3.5 h-3.5" /> 30-day money-back guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "32px", marginBottom: "24px", textAlign: "center" }}>Common Questions</h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden">
                <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "15px" }}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} style={{ color: "var(--accent-purple)" }} />
                </button>
                <div className={`accordion-content ${openFaq === i ? "open" : ""}`}>
                  <p className="px-6 pb-6" style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.7" }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
