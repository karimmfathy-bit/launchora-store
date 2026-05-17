"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, total, clearCart } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] flex flex-col"
            style={{
              width: "min(420px, 100vw)",
              background: "var(--bg-secondary)",
              borderLeft: "1px solid var(--border)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" style={{ color: "var(--accent-purple)" }} />
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "18px" }}>
                  Your Cart
                </span>
                {items.length > 0 && (
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "var(--accent-purple)", color: "white" }}>
                    {items.length}
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingCart className="w-12 h-12" style={{ color: "var(--text-muted)" }} />
                  <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>Your cart is empty</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 rounded-2xl"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                            {item.name}
                          </p>
                          <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.5" }}>
                            {item.description}
                          </p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors shrink-0">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                      <div className="mt-3 pt-3 flex justify-between items-center"
                        style={{ borderTop: "1px solid var(--border)" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>Price</span>
                        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "20px", color: "var(--accent-purple)" }}>
                          ${item.price}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="flex justify-between items-center mb-6">
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "16px" }}>Total</span>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "28px", color: "var(--accent-gold)" }}>
                    ${total}
                  </span>
                </div>

                <button onClick={handleCheckout} className="btn-gold w-full justify-center text-base py-4 mb-3">
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </button>

                <button onClick={closeCart} className="btn-outline w-full justify-center py-3 text-sm">
                  Continue Shopping
                </button>

                <div className="flex items-center justify-center gap-2 mt-4"
                  style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Secure checkout · Instant delivery · 30-day guarantee
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
