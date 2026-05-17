"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const values = [
  { icon: "⚡", title: "Speed Over Perfection", desc: "Launch fast. Improve with feedback. The market rewards action more than perfection." },
  { icon: "🎯", title: "Outcome Focused", desc: "Every product delivers one clear, tangible result. No fluff. No filler. No theory." },
  { icon: "🔓", title: "Accessible to Everyone", desc: "Free tools. Zero experience required. The only barrier is taking the first step." },
];

export default function AboutPage() {
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

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 text-center" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-3xl mx-auto gs-fade-up">
          <span className="badge badge-purple mb-6 inline-flex">About</span>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px,5vw,52px)", marginBottom: "20px" }}>
            Built by AI entrepreneurs.<br />For AI entrepreneurs.
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "18px", lineHeight: "1.8" }}>
            AI Business OS was created because the gap between "wanting to start" and "actually starting" was too wide. The tools existed. The opportunity was real. What was missing was a clear, no-fluff system built specifically for beginners.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto gs-fade-up">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "28px", marginBottom: "20px" }}>The Story</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "17px", lineHeight: "1.9", marginBottom: "20px" }}>
            Every product in this store was built using the exact process it teaches. No theory. No filler. Just systems that work — validated by real results, not just good intentions.
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "17px", lineHeight: "1.9" }}>
            We watched beginners spend months consuming content, buying courses, and getting nowhere — not because they lacked capability, but because they lacked a clear, step-by-step system. We built that system. We packaged it into affordable, instant-access products. And we keep improving it based on what our customers tell us.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 text-center" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-3xl mx-auto gs-fade-up">
          <p style={{ fontSize: "clamp(20px,3vw,28px)", lineHeight: "1.6", fontStyle: "italic", color: "var(--text-secondary)" }}>
            "Our mission:{" "}
            <span className="text-gradient-accent" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              give every beginner the same unfair advantage that only experienced entrepreneurs used to have.
            </span>"
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "32px", marginBottom: "40px", textAlign: "center" }}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="gs-fade-up glass-card p-8 rounded-3xl text-center">
                <div className="text-4xl mb-5">{v.icon}</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "18px", marginBottom: "12px" }}>{v.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.7" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
