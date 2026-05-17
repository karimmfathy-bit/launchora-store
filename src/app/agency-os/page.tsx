"use client";

import { useEffect, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Zap, Users, Clock, Star, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX - 16); cursorY.set(e.clientY - 16); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-purple-400/70 pointer-events-none z-[100] mix-blend-difference hidden md:block"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    />
  );
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 300, damping: 30 });
  const ry = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(ry, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(rx, [-0.5, 0.5], ["-8deg", "8deg"]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className={`relative ${className}`}>
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}

const sops = [
  {
    id: "01", title: "Client Onboarding SOP", desc: "5-step intake system that sets expectations, collects assets, and starts every engagement on the right foot. Includes email templates + Notion board.",
    tags: ["Email Templates", "Notion Board", "Contract Checklist"],
  },
  {
    id: "02", title: "Project Delivery SOP", desc: "From kickoff call to final handoff — a repeatable delivery framework that makes you look like a 10-person agency even if you're a solo operator.",
    tags: ["Milestone Tracker", "Review Process", "Handoff Checklist"],
  },
  {
    id: "03", title: "Invoice & Payment SOP", desc: "Chase payments without the awkwardness. Includes automated follow-up sequences, net-30 templates, and a late fee enforcement system.",
    tags: ["Invoice Templates", "Follow-up Sequences", "Stripe Setup Guide"],
  },
  {
    id: "04", title: "Team Hiring & Onboarding SOP", desc: "Hire contractors or full-time staff with a proven 3-stage interview process, offer letter templates, and a 30-60-90 day onboarding plan.",
    tags: ["Interview Scripts", "Offer Templates", "90-Day Plan"],
  },
  {
    id: "05", title: "Client Retention & Upsell SOP", desc: "Monthly check-in scripts, quarterly business review templates, and a proven upsell cadence that grows LTV without feeling pushy.",
    tags: ["QBR Deck Template", "Upsell Scripts", "Churn Prevention"],
  },
  {
    id: "06", title: "Scope Creep Protection SOP", desc: "Stop working for free. Change request forms, firm-but-kind 'out of scope' email templates, and a re-pricing framework.",
    tags: ["Change Order Form", "Email Templates", "Pricing Framework"],
  },
  {
    id: "07", title: "Social Proof & Testimonial SOP", desc: "An automated sequence to capture reviews, case studies, and video testimonials at the perfect moment in the client journey.",
    tags: ["Review Request Sequence", "Case Study Template", "Video Script"],
  },
  {
    id: "08", title: "Off-boarding & Referral SOP", desc: "End every project with a goodbye that generates the next client. Includes a referral incentive structure and a re-engagement campaign.",
    tags: ["Goodbye Sequence", "Referral System", "Re-engagement Email"],
  },
];

const testimonials = [
  { name: "James K.", role: "Creative Agency Owner", text: "I was spending 3 hours a week chasing invoices. This SOP literally paid for itself in week one.", stars: 5 },
  { name: "Priya M.", role: "Freelance Brand Strategist", text: "The client onboarding SOP alone saved me from 2 nightmare projects. I send it to every new client now.", stars: 5 },
  { name: "Marcus D.", role: "Digital Marketing Agency", text: "Scaled from 3 to 11 clients without hiring anyone full-time. The team onboarding SOP made it possible.", stars: 5 },
];

export default function AgencyOSPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white cursor-none overflow-x-hidden selection:bg-purple-500 selection:text-white">
      <CustomCursor />

      {/* Gradient background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-800/15 blur-[100px]" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[80px]" />
      </div>

      <div className="relative z-10">
        {/* Nav */}
        <nav className="fixed top-0 w-full px-6 py-4 flex justify-between items-center backdrop-blur-xl bg-black/40 border-b border-white/5 z-50">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Launchora
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-purple-400 uppercase">Agency OS</span>
          </div>
          <a href="#pricing" className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors text-sm font-semibold">
            Get Access →
          </a>
        </nav>

        {/* Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8 text-sm font-medium text-purple-300">
              <Zap className="w-4 h-4" /> 8 SOPs · 40+ Templates · Instant Download
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-6">
              The <span style={{ background: "linear-gradient(to right, #a855f7, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Agency OS</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
              The $5,000 operations consultant in a <span className="text-white font-semibold">$47 download.</span>
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-500 max-w-xl mx-auto mb-12">
              8 battle-tested Standard Operating Procedures for agencies and freelancers — plug-and-play Notion templates + email sequences ready to use today.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#pricing" className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Get The Agency OS <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#kits" className="px-10 py-4 rounded-full border border-gray-700 bg-black/40 backdrop-blur-md font-semibold hover:bg-gray-900 transition-colors">
                See What's Inside
              </a>
            </motion.div>

            {/* Social proof bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              {[["500+", "Agencies Using It"], ["4.9★", "Average Rating"], ["$0", "Recurring Fees"], ["48h", "Results Reported"]].map(([val, label]) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-white">{val}</p>
                  <p>{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Pain Section */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Sound familiar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                "You re-write the same onboarding email every single time",
                "Clients ghost you after delivery and you don't know why",
                "You're doing work that's clearly out of scope — for free",
                "You've lost 3 nights of sleep chasing unpaid invoices",
                "You hired someone but they have no idea what to do",
                "You deliver good work but clients don't refer you to anyone",
              ].map((pain, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                  <span className="text-red-500 mt-1 text-lg">✕</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{pain}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-10 text-xl text-gray-400">
              These aren't productivity problems. They're <span className="text-white font-semibold">systems problems.</span> And every single one has a documented fix inside Agency OS.
            </p>
          </motion.div>
        </section>

        {/* SOP Kit Grid */}
        <section id="kits" className="py-24 px-6 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight mb-4">What's Inside</h2>
            <p className="text-gray-400 text-lg">8 SOPs. Every one solves a specific operational nightmare.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sops.map((sop, i) => (
              <motion.div key={sop.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}>
                <TiltCard>
                  <div className="h-full p-8 rounded-3xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 group cursor-default"
                    style={{ background: "rgba(20,10,40,0.5)", backdropFilter: "blur(16px)" }}>
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl font-black text-purple-800/60 leading-none">{sop.id}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-purple-400" />
                          <h3 className="font-bold text-lg group-hover:text-purple-300 transition-colors">{sop.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{sop.desc}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {sop.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-300 border border-purple-800/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-gray-400">Three steps from purchase to fully operational.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Zap className="w-6 h-6 text-purple-400" />, step: "01", title: "Download Instantly", desc: "One-click delivery to your inbox. Includes a Notion workspace link and a PDF version of every SOP." },
              { icon: <FileText className="w-6 h-6 text-purple-400" />, step: "02", title: "Duplicate to Notion", desc: "Hit 'Duplicate' on the template gallery and you have your entire Agency OS set up in under 10 minutes." },
              { icon: <Users className="w-6 h-6 text-purple-400" />, step: "03", title: "Run Your Agency on It", desc: "Send your team the relevant SOPs. Use the email templates as-is. Watch your operation transform." },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                <div className="p-8 rounded-3xl border border-gray-800 text-center h-full"
                  style={{ background: "rgba(15,5,30,0.6)", backdropFilter: "blur(12px)" }}>
                  <div className="w-14 h-14 rounded-2xl bg-purple-900/30 border border-purple-800/40 flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  <span className="text-5xl font-black text-purple-800/40">{step.step}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight mb-4">Real Operators. Real Results.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                <TiltCard>
                  <div className="p-8 rounded-3xl border border-gray-800 hover:border-purple-500/40 transition-colors h-full"
                    style={{ background: "rgba(20,10,40,0.4)", backdropFilter: "blur(16px)" }}>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                    <div>
                      <p className="font-bold text-white">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 px-6 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-5xl font-bold tracking-tight mb-4">One Price. Everything Included.</h2>
            <p className="text-gray-400">No subscriptions. No upsells. No BS.</p>
          </motion.div>

          <TiltCard>
            <div className="rounded-3xl p-1" style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5, #7c3aed)" }}>
              <div className="rounded-[22px] p-10 relative overflow-hidden" style={{ background: "#080510" }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #a855f7, transparent)" }} />

                <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-700/40 text-purple-300 text-xs font-bold mb-6 tracking-wider uppercase">
                      Founder's Pricing — Limited Time
                    </div>
                    <h3 className="text-3xl font-bold mb-6">Agency OS — Complete Kit</h3>
                    <ul className="space-y-3">
                      {[
                        "8 Full SOP Documents (Notion + PDF)",
                        "40+ Email & Message Templates",
                        "Client Onboarding Checklist",
                        "Scope Creep Change Order Form",
                        "Hiring & Interview Script Pack",
                        "Referral & Retention System",
                        "Lifetime Access + Free Updates",
                        "Private Community Access",
                      ].map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-shrink-0 w-full md:w-64 p-8 rounded-2xl border border-purple-800/40 text-center"
                    style={{ background: "rgba(124,58,237,0.08)" }}>
                    <p className="text-gray-500 text-sm mb-1">Consultant charges</p>
                    <p className="text-gray-600 line-through text-xl mb-3">$5,000+</p>
                    <p className="text-gray-400 text-sm mb-2">Your price today</p>
                    <p className="text-6xl font-black text-white mb-2">$47</p>
                    <p className="text-gray-600 text-xs mb-8">One-time · Instant access</p>

                    <motion.a href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="block w-full py-4 rounded-xl font-bold text-lg text-white mb-4 transition-all"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                      Get Instant Access
                    </motion.a>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                      <ShieldCheck className="w-3 h-3" /> Secure checkout via Stripe
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Urgency */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl border border-yellow-800/30 bg-yellow-950/20 text-center">
            <p className="text-yellow-400 font-semibold text-sm flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" /> Founder's pricing ends when we hit 1,000 customers. Currently at <strong>847/1000.</strong>
            </p>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: "Do I need Notion?", a: "All SOPs come in both Notion format (recommended) and PDF. You can use either." },
              { q: "I'm a solo freelancer, not an agency. Is this for me?", a: "Absolutely — 60% of our customers are solo operators. The SOPs scale from 1-person to 20-person teams." },
              { q: "Are these generic templates?", a: "No. Every SOP is built specifically for service businesses: agencies, consultants, and freelancers. Not generic business fluff." },
              { q: "What if I don't like it?", a: "30-day money-back guarantee. Email us, no questions asked." },
            ].map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-gray-800" style={{ background: "rgba(15,5,30,0.5)" }}>
                <p className="font-bold text-white mb-2">{faq.q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 px-6 text-center border-t border-gray-800/50">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-bold tracking-tight mb-6">
              Stop Winging It.<br />
              <span style={{ background: "linear-gradient(to right, #a855f7, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Run a Real Operation.
              </span>
            </h2>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto">Join 500+ agencies that replaced chaos with systems. One purchase. Lifetime access.</p>
            <a href="#pricing" className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-lg text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
              Get The Agency OS for $47 <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </section>

        <footer className="py-8 px-6 text-center border-t border-gray-800/30">
          <p className="text-gray-600 text-sm">© 2026 Launchora Inc. · <Link href="/" className="hover:text-gray-400 transition-colors">Back to Launchora</Link></p>
        </footer>
      </div>
    </main>
  );
}
