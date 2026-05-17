"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

type FormState = { name: string; email: string; subject: string; message: string };
type ErrorState = Partial<FormState>;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "General Question", message: "" });
  const [errors, setErrors] = useState<ErrorState>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: ErrorState = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  const inputStyle = (field: keyof ErrorState) => ({
    width: "100%",
    padding: "14px 16px",
    background: "var(--bg-card)",
    border: `1px solid ${errors[field] ? "rgba(248,113,113,0.5)" : "var(--border)"}`,
    borderRadius: "12px",
    color: "var(--text-primary)",
    fontSize: "15px",
    fontFamily: "DM Sans, sans-serif",
    outline: "none",
    transition: "border-color 0.2s ease",
  });

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <section className="pt-36 pb-20 px-6" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-xl mx-auto text-center">
          <span className="badge badge-purple mb-6 inline-flex">Contact</span>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px,5vw,48px)", marginBottom: "16px" }}>Get in Touch</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "17px" }}>Have a question before purchasing? We respond within 24 hours.</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Info */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="glass-card p-6 rounded-2xl">
              <Mail className="w-6 h-6 mb-3" style={{ color: "var(--accent-purple)" }} />
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, marginBottom: "4px" }}>Email</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>hello@aibusinessos.com</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <Clock className="w-6 h-6 mb-3" style={{ color: "var(--accent-gold)" }} />
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, marginBottom: "4px" }}>Response Time</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Within 24 hours</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, marginBottom: "12px" }}>Follow Us</p>
              <div className="flex flex-col gap-3">
                {[{ label: "TikTok", handle: "@aibusinessos" }, { label: "Instagram", handle: "@aibusinessos" }, { label: "X (Twitter)", handle: "@aibusinessos" }].map(s => (
                  <div key={s.label} className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
                    <span style={{ color: "var(--accent-purple)" }}>{s.handle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-12 rounded-3xl text-center h-full flex flex-col items-center justify-center gap-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                    <CheckCircle className="w-16 h-16" style={{ color: "var(--accent-teal)" }} />
                  </motion.div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "24px" }}>Message Sent!</h3>
                  <p style={{ color: "var(--text-secondary)" }}>We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={{ fontSize: "13px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Name *</label>
                      <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name" style={inputStyle("name")}
                        onFocus={e => (e.target.style.borderColor = "var(--accent-purple)")}
                        onBlur={e => (e.target.style.borderColor = errors.name ? "rgba(248,113,113,0.5)" : "var(--border)")} />
                      {errors.name && <p style={{ color: "#f87171", fontSize: "12px", marginTop: "4px" }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={{ fontSize: "13px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Email *</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com" style={inputStyle("email")}
                        onFocus={e => (e.target.style.borderColor = "var(--accent-purple)")}
                        onBlur={e => (e.target.style.borderColor = errors.email ? "rgba(248,113,113,0.5)" : "var(--border)")} />
                      {errors.email && <p style={{ color: "#f87171", fontSize: "12px", marginTop: "4px" }}>{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "13px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Subject</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle("subject"), cursor: "none" }}>
                      {["General Question", "Pre-Purchase Question", "After Purchase Support", "Partnership"].map(o => (
                        <option key={o} value={o} style={{ background: "var(--bg-card)" }}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "13px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what's on your mind..." rows={5}
                      style={{ ...inputStyle("message"), resize: "vertical" }}
                      onFocus={e => (e.target.style.borderColor = "var(--accent-purple)")}
                      onBlur={e => (e.target.style.borderColor = errors.message ? "rgba(248,113,113,0.5)" : "var(--border)")} />
                    {errors.message && <p style={{ color: "#f87171", fontSize: "12px", marginTop: "4px" }}>{errors.message}</p>}
                    <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "4px" }}>{form.message.length}/20 minimum</p>
                  </div>

                  <button type="submit" className="btn-primary justify-center" disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1 }}>
                    {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
