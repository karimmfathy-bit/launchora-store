"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)] shadow-[0_0_8px_var(--accent-purple)] group-hover:shadow-[0_0_14px_var(--accent-purple)] transition-all" />
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "18px", letterSpacing: "-0.02em" }}>
              AI Business OS
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}
                  className="relative text-sm font-medium transition-colors duration-200 group"
                  style={{ color: active ? "var(--text-primary)" : "var(--text-secondary)" }}>
                  {label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-[var(--accent-purple)] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/products">
              <button className="btn-outline py-2 px-5 text-sm">View Products</button>
            </Link>
            <Link href="/pricing">
              <button className="btn-primary py-2 px-5 text-sm">Get Started</button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "rgba(8,8,16,0.97)", backdropFilter: "blur(20px)" }}>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map(({ href, label }, i) => (
                <motion.div key={href}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}>
                  <Link href={href} className="text-3xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="flex gap-4 mt-4">
                <Link href="/products"><button className="btn-outline">View Products</button></Link>
                <Link href="/pricing"><button className="btn-primary">Get Started</button></Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
