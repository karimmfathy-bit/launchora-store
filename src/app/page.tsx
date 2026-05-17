"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown, Check, X, Star, Zap, Briefcase, Rocket, Users, Globe, Award, DollarSign } from "lucide-react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), { ssr: false });

const GUMROAD = {
  kit: "https://gumroad.com/l/freelancer-ai-kit", // TODO: Replace with real Gumroad URL
  playbook: "https://gumroad.com/l/local-business-playbook", // TODO: Replace with real Gumroad URL
  launch: "https://gumroad.com/l/ai-business-launch-system", // TODO: Replace with real Gumroad URL
  bundle: "https://gumroad.com/l/ai-business-os-bundle", // TODO: Replace with real Gumroad URL
};

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray<HTMLElement>(".gs-fade-up").forEach((el) => {
      gsap.fromTo(el, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    });
    gsap.utils.toArray<HTMLElement>(".gs-stagger").forEach((parent) => {
      const children = parent.querySelectorAll<HTMLElement>(".gs-child");
      gsap.fromTo(children, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: parent, start: "top 80%", once: true },
      });
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const products = [
    {
      icon: <Zap className="w-6 h-6 text-[var(--accent-purple)]" />,
      iconBg: "rgba(99,102,241,0.15)",
      badge: "ENTRY · $37",
      badgeClass: "badge-purple",
      title: "The Freelancer AI Command Kit",
      desc: "50 done-for-you AI prompts for client pitching, proposals, invoices, content, and social media — ready to use in ChatGPT or Claude.",
      features: ["50 role-specific prompts", "Client email scripts", "Proposal generator system", "Social media content vault"],
      cta: "Get It — $37",
      ctaClass: "btn-outline",
      href: "/products/freelancer-kit",
      gumroad: GUMROAD.kit,
      featured: false,
    },
    {
      icon: <Briefcase className="w-6 h-6" style={{ color: "var(--accent-gold)" }} />,
      iconBg: "rgba(245,166,35,0.15)",
      badge: "MOST POPULAR · $97",
      badgeClass: "badge-gold",
      title: "The Local Business AI Playbook",
      subtitle: "Real Estate Edition",
      desc: "A complete AI operating playbook for real estate agents — prompt library, 30-day content calendar, client email templates, lead generation scripts, and full AI tool setup guide.",
      features: ["Industry-specific prompt library", "30-day content calendar", "Client email templates", "Lead generation scripts", "AI tool setup guide", "Premium designed PDF"],
      cta: "Get It — $97",
      ctaClass: "btn-gold",
      href: "/products/local-business-playbook",
      gumroad: GUMROAD.playbook,
      featured: true,
    },
    {
      icon: <Rocket className="w-6 h-6 text-[var(--accent-teal)]" />,
      iconBg: "rgba(45,212,191,0.15)",
      badge: "PREMIUM · $197",
      badgeClass: "badge-teal",
      title: "The AI Business Launch System",
      desc: "The complete start-to-revenue blueprint — niche selection, branding, product creation, store setup, content engine, and first-sale plan. 7 modules + 50 launch prompts.",
      features: ["7 complete modules", "Full niche selector framework", "AI tool stack guide (free)", "24-hour product creation system", "Marketing & content engine", "50 ready-to-use business prompts"],
      cta: "Get It — $197",
      ctaClass: "btn-outline",
      href: "/products/ai-business-launch-system",
      gumroad: GUMROAD.launch,
      featured: false,
    },
  ];

  const testimonials = [
    { text: "I made my first digital product sale 4 days after buying the AI Business Launch System. This is not a course — it's a cheat code.", name: "Ahmed K.", loc: "Cairo" },
    { text: "The Freelancer Kit alone saved me 6 hours a week. My client response rate doubled.", name: "Sara M.", loc: "Dubai" },
    { text: "I'm a real estate agent. The Local Business Playbook gave me 30 days of content in one afternoon.", name: "Marcus T.", loc: "London" },
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, val: "2,400+", label: "Customers" },
    { icon: <Globe className="w-6 h-6" />, val: "40+", label: "Countries" },
    { icon: <Star className="w-6 h-6" />, val: "4.9★", label: "Average Rating" },
    { icon: <DollarSign className="w-6 h-6" />, val: "$0", label: "Cost to Start Using" },
  ];

  const oldWay = ["Expensive agency fees", "Months of learning", "Need a developer", "No clear system", "Guessing what to build"];
  const newWay = ["Free AI tools that do the work", "Launch in 24 hours", "No code required", "Step-by-step system", "Products that sell themselves"];

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <ScrollProgress />
      <CustomCursor />
      <ParticleCanvas />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
        {/* Ambient blobs */}
        <div className="blob-purple" style={{ top: "-15%", left: "-5%", zIndex: 1 }} />
        <div className="blob-gold" style={{ bottom: "-10%", right: "-5%", zIndex: 1 }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="badge badge-purple mb-6 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-gold)" }} />
              ✦ The AI Business Operating System — 2026 Edition
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: "clamp(48px,8vw,88px)", fontFamily: "Syne, sans-serif", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 }}
            className="mb-6">
            Launch Your <span className="text-gradient-accent">AI Business.</span><br />
            From Zero to Revenue.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            style={{ color: "var(--text-secondary)", fontSize: "20px", maxWidth: "560px", margin: "0 auto 40px" }}>
            Three plug-and-play digital products. One complete system. Everything a beginner needs to build a profitable AI-powered business in 2026 — starting today.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/products">
              <button className="btn-primary text-lg py-4 px-8">Explore Products <ArrowRight className="w-5 h-5" /></button>
            </Link>
            <Link href="/pricing">
              <button className="btn-outline text-lg py-4 px-8">See Pricing</button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2" style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />)}
            </div>
            <span>Trusted by 2,400+ entrepreneurs across 40 countries</span>
          </motion.div>
        </div>

        {/* Scroll chevron */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10" style={{ animation: "bounce-chevron 2s ease-in-out infinite", color: "var(--text-muted)" }}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ── PROBLEM / HOOK ── */}
      <section className="py-28 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="gs-fade-up">
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontFamily: "Syne, sans-serif", fontWeight: 700, marginBottom: "24px" }}>
              Starting a business used to require: capital, a team, and years of experience.<br />
              <span className="text-gradient-accent">That's no longer true.</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "17px", lineHeight: "1.8" }}>
              In 2026, the barrier to entry has collapsed. AI gives a one-person operation the output of a 10-person team. But most people don't know where to start — and get lost in a sea of tools, advice, and noise.
              <br /><br />
              <strong style={{ color: "var(--text-primary)" }}>That's exactly what AI Business OS solves.</strong>
            </p>
          </div>

          <div className="gs-stagger flex flex-col gap-4">
            <p className="gs-child" style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>Old Way vs New Way</p>
            {oldWay.map((item, i) => (
              <div key={i} className="gs-child flex gap-4">
                <div className="glass-card p-3 flex-1 flex items-center gap-3" style={{ borderRadius: "12px" }}>
                  <X className="w-4 h-4 shrink-0 text-red-400" />
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{item}</span>
                </div>
                <div className="glass-card p-3 flex-1 flex items-center gap-3" style={{ borderRadius: "12px", borderColor: "rgba(45,212,191,0.2)" }}>
                  <Check className="w-4 h-4 shrink-0 text-[var(--accent-teal)]" />
                  <span style={{ color: "var(--text-primary)", fontSize: "14px" }}>{newWay[i]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 gs-fade-up">
            <h2 style={{ fontSize: "clamp(32px,5vw,52px)", fontFamily: "Syne, sans-serif", fontWeight: 800, marginBottom: "16px" }}>
              Three Products. One Complete System.
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>
              Choose your entry point. Stack them all. Build your AI business.
            </p>
          </div>

          <div className="gs-stagger grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {products.map((p) => (
              <div key={p.title} className="gs-child relative">
                <div className={`glass-card p-8 h-full flex flex-col ${p.featured ? "border-[var(--accent-gold)]/40 shadow-[0_0_60px_rgba(245,166,35,0.12)]" : ""}`}
                  style={p.featured ? { borderColor: "rgba(245,166,35,0.3)", transform: "scale(1.03)" } : {}}>
                  {p.featured && <div className="ribbon">BEST VALUE</div>}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: p.iconBg }}>{p.icon}</div>
                  <span className={`badge ${p.badgeClass} mb-4 self-start`}>{p.badge}</span>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "20px", marginBottom: p.subtitle ? "4px" : "12px" }}>{p.title}</h3>
                  {p.subtitle && <p style={{ color: "var(--accent-gold)", fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>{p.subtitle}</p>}
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.7", marginBottom: "20px" }}>{p.desc}</p>
                  <ul className="flex flex-col gap-2 mb-8 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                        <Check className="w-3.5 h-3.5 shrink-0 text-[var(--accent-teal)]" />{f}
                      </li>
                    ))}
                  </ul>
                  <a href={p.gumroad} target="_blank" rel="noopener noreferrer">
                    <button className={`${p.ctaClass} w-full justify-center`}>{p.cta} <ArrowRight className="w-4 h-4" /></button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 gs-fade-up">
            <Link href="/pricing" style={{ color: "var(--accent-gold)", fontSize: "16px", fontWeight: 600 }}
              className="hover:underline">Or get all 3 for $247 — Save $84 →</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 gs-fade-up">
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontFamily: "Syne, sans-serif", fontWeight: 800 }}>How It Works</h2>
          </div>
          <div className="gs-stagger flex flex-col md:flex-row items-start gap-8 relative">
            {[
              { n: "01", title: "Choose Your Product", desc: "Pick one or all three based on where you are in your journey." },
              { n: "02", title: "Download Instantly", desc: "Instant PDF delivery. No waiting. No shipping. Start in minutes." },
              { n: "03", title: "Launch & Earn", desc: "Follow the system. Create your product. Make your first sale." },
            ].map((step, i) => (
              <div key={i} className="gs-child flex-1 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-glow)", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "18px", color: "var(--accent-purple)" }}>
                  {step.n}
                </div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "18px", marginBottom: "10px" }}>{step.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.7" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 gs-fade-up">
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontFamily: "Syne, sans-serif", fontWeight: 800 }}>What People Are Saying</h2>
          </div>
          <div className="gs-stagger grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {testimonials.map((t, i) => (
              <div key={i} className="gs-child glass-card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />)}
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.75", marginBottom: "24px", fontStyle: "italic" }}>"{t.text}"</p>
                <div>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "15px" }}>{t.name}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>{t.loc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="gs-stagger grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="gs-child text-center glass-card p-6">
                <div className="flex justify-center mb-3" style={{ color: "var(--accent-purple)" }}>{s.icon}</div>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "36px", marginBottom: "4px" }}>{s.val}</p>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-glow)" }}>
        <div className="max-w-3xl mx-auto text-center gs-fade-up">
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontFamily: "Syne, sans-serif", fontWeight: 800, marginBottom: "20px" }}>
            Ready to Build Your AI Business?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "17px", marginBottom: "12px" }}>Start with one product. Scale to all three.</p>
          <p style={{ color: "var(--text-muted)", fontSize: "16px", marginBottom: "40px" }}>
            The system is here. The tools are free. The market is ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products"><button className="btn-primary text-lg py-4 px-8">Browse Products <ArrowRight className="w-5 h-5" /></button></Link>
            <Link href="/pricing"><button className="btn-outline text-lg py-4 px-8">View Pricing</button></Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
