"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 60 : 150;

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    resize();
    window.addEventListener("resize", resize);

    // Particles
    const positions = new Float32Array(COUNT * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities.push({
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.002,
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const dotMat = new THREE.PointsMaterial({ color: 0x6366f1, size: 0.04, transparent: true, opacity: 0.7 });
    const dots = new THREE.Points(geo, dotMat);
    scene.add(dots);

    // Lines between close particles
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(COUNT * COUNT * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.08 })
    );
    scene.add(lineMat);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      const pos = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;
        if (pos[i * 3] > 10 || pos[i * 3] < -10) velocities[i].x *= -1;
        if (pos[i * 3 + 1] > 6 || pos[i * 3 + 1] < -6) velocities[i].y *= -1;
        if (pos[i * 3 + 2] > 4 || pos[i * 3 + 2] < -4) velocities[i].z *= -1;
      }
      geo.attributes.position.needsUpdate = true;

      // Update lines
      let lineIdx = 0;
      const lp = lineGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 3 && lineIdx < linePositions.length - 5) {
            lp[lineIdx++] = pos[i * 3]; lp[lineIdx++] = pos[i * 3 + 1]; lp[lineIdx++] = pos[i * 3 + 2];
            lp[lineIdx++] = pos[j * 3]; lp[lineIdx++] = pos[j * 3 + 1]; lp[lineIdx++] = pos[j * 3 + 2];
          }
        }
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.setDrawRange(0, lineIdx / 3);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
