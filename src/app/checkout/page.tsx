"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, Package, CheckCircle2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb";

const PRODUCT = {
  id: "ai-business-launch-system",
  name: "The AI Business Launch System",
  price: 197,
  description: "Complete PDF guide: 7 modules + 50 launch prompts",
};

type CheckoutState = "idle" | "processing" | "success" | "error";

export default function CheckoutPage() {
  const { clearCart } = useCart();
  const [state, setState] = useState<CheckoutState>("idle");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [orderId, setOrderId] = useState("");

  const createOrder = async (_data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: String(PRODUCT.price),
            currency_code: "USD",
          },
          description: PRODUCT.name,
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
  };

  const onApprove = async (data: any) => {
    setState("processing");
    try {
      const res = await fetch("/api/paypal/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderID: data.orderID,
          email,
          name,
        }),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        throw new Error(result.error || "Capture failed");
      }

      setOrderId(result.captureId);
      setState("success");
      clearCart();
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setState("error");
    }
  };

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Back link */}
          <Link href="/products/ai-business-launch-system"
            className="inline-flex items-center gap-2 mb-8 hover:text-white transition-colors"
            style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            <ArrowLeft className="w-4 h-4" /> Back to product
          </Link>

          <AnimatePresence mode="wait">

            {/* ── SUCCESS STATE ── */}
            {state === "success" && (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg mx-auto text-center">
                <div className="glass-card p-12 rounded-3xl"
                  style={{ borderColor: "rgba(45,212,191,0.3)", boxShadow: "0 0 60px rgba(45,212,191,0.1)" }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2, stiffness: 200 }}>
                    <CheckCircle2 className="w-20 h-20 mx-auto mb-6" style={{ color: "var(--accent-teal)" }} />
                  </motion.div>
                  <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "32px", marginBottom: "12px" }}>
                    Payment Confirmed! 🎉
                  </h1>
                  <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: "1.7", marginBottom: "8px" }}>
                    Thank you for your purchase. A receipt with your <strong style={{ color: "var(--text-primary)" }}>PDF download link</strong> has been sent to your email.
                  </p>
                  {orderId && (
                    <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "32px", fontFamily: "monospace" }}>
                      Order ID: {orderId}
                    </p>
                  )}
                  <div className="p-4 rounded-2xl mb-8" style={{ background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.2)" }}>
                    <p style={{ color: "var(--accent-teal)", fontSize: "14px", fontWeight: 600 }}>
                      📧 Check your inbox — the PDF link is in your email receipt.
                    </p>
                  </div>
                  <Link href="/products">
                    <button className="btn-outline">Browse More Products</button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* ── CHECKOUT FORM ── */}
            {state !== "success" && (
              <motion.div key="checkout"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">

                {/* Left — Order Summary */}
                <div className="md:col-span-2">
                  <div className="glass-card p-6 rounded-3xl mb-4"
                    style={{ borderColor: "rgba(99,102,241,0.2)" }}>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "13px",
                      color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
                      Order Summary
                    </p>

                    <div className="flex gap-4 items-start mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.2)" }}>
                        <Package className="w-6 h-6" style={{ color: "var(--accent-teal)" }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                          {PRODUCT.name}
                        </p>
                        <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>{PRODUCT.description}</p>
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                      <div className="flex justify-between items-center">
                        <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Subtotal</span>
                        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>${PRODUCT.price}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Delivery</span>
                        <span style={{ color: "var(--accent-teal)", fontSize: "14px", fontWeight: 600 }}>Instant (Email)</span>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3"
                        style={{ borderTop: "1px solid var(--border)" }}>
                        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "16px" }}>Total</span>
                        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "28px", color: "var(--accent-gold)" }}>
                          ${PRODUCT.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-col gap-2">
                    {[
                      { icon: <ShieldCheck className="w-4 h-4" />, text: "Secure PayPal checkout" },
                      { icon: <Lock className="w-4 h-4" />, text: "Your data is protected" },
                      { icon: <CheckCircle2 className="w-4 h-4" />, text: "30-day money-back guarantee" },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-2"
                        style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                        <span style={{ color: "var(--accent-teal)" }}>{icon}</span>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — Payment */}
                <div className="md:col-span-3">
                  <div className="glass-card p-8 rounded-3xl">
                    <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "24px", marginBottom: "24px" }}>
                      Complete Your Purchase
                    </h1>

                    {/* Contact fields */}
                    <div className="flex flex-col gap-4 mb-8">
                      <div>
                        <label style={{ display: "block", fontSize: "13px", color: "var(--text-muted)", marginBottom: "6px" }}>
                          Your Name (for receipt)
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="John Doe"
                          style={{
                            width: "100%", padding: "12px 16px", borderRadius: "12px",
                            background: "var(--bg-card)", border: "1px solid var(--border)",
                            color: "var(--text-primary)", fontSize: "15px", outline: "none",
                            fontFamily: "DM Sans, sans-serif",
                          }}
                          onFocus={e => (e.target.style.borderColor = "var(--accent-purple)")}
                          onBlur={e => (e.target.style.borderColor = "var(--border)")}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", color: "var(--text-muted)", marginBottom: "6px" }}>
                          Email (PDF will be sent here)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          style={{
                            width: "100%", padding: "12px 16px", borderRadius: "12px",
                            background: "var(--bg-card)", border: "1px solid var(--border)",
                            color: "var(--text-primary)", fontSize: "15px", outline: "none",
                            fontFamily: "DM Sans, sans-serif",
                          }}
                          onFocus={e => (e.target.style.borderColor = "var(--accent-purple)")}
                          onBlur={e => (e.target.style.borderColor = "var(--border)")}
                        />
                        <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                          ⚡ Your PDF download link will be sent to this address immediately after payment.
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                      <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                      <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Pay securely with</span>
                      <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                    </div>

                    {/* Error */}
                    {state === "error" && (
                      <div className="flex items-start gap-3 p-4 rounded-xl mb-6"
                        style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)" }}>
                        <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p style={{ color: "#f87171", fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>Payment failed</p>
                          <p style={{ color: "#f87171", fontSize: "13px" }}>{errorMsg}</p>
                        </div>
                      </div>
                    )}

                    {/* Processing overlay */}
                    {state === "processing" && (
                      <div className="text-center py-8">
                        <div className="w-10 h-10 border-2 border-t-[var(--accent-purple)] rounded-full animate-spin mx-auto mb-4"
                          style={{ borderColor: "var(--border)", borderTopColor: "var(--accent-purple)" }} />
                        <p style={{ color: "var(--text-secondary)" }}>Processing your payment…</p>
                      </div>
                    )}

                    {/* PayPal Buttons */}
                    {state !== "processing" && (
                      <PayPalScriptProvider options={{
                        clientId: PAYPAL_CLIENT_ID,
                        currency: "USD",
                        intent: "capture",
                      }}>
                        <PayPalButtons
                          style={{
                            layout: "vertical",
                            color: "gold",
                            shape: "rect",
                            label: "pay",
                            height: 48,
                          }}
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={(err) => {
                            console.error("PayPal error:", err);
                            setErrorMsg("PayPal encountered an error. Please try again.");
                            setState("error");
                          }}
                          onCancel={() => {
                            setState("idle");
                          }}
                          disabled={state === "processing"}
                        />
                      </PayPalScriptProvider>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
