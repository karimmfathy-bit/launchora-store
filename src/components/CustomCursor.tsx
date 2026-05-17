"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
      ring.style.transform = `translate(${mx - 18}px, ${my - 18}px)`;
    };

    const expand = () => { dot.classList.add("expanded"); ring.classList.add("expanded"); };
    const shrink = () => { dot.classList.remove("expanded"); ring.classList.remove("expanded"); };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });

    return () => { window.removeEventListener("mousemove", move); };
  }, []);

  return (
    <>
      <div id="cursor-dot" className="hidden md:block" />
      <div id="cursor-ring" className="hidden md:block" />
    </>
  );
}
