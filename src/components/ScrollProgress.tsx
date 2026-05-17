"use client";
import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${pct})`;
      bar.style.width = "100%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div id="scroll-progress" />;
}
