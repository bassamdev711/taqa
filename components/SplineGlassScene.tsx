"use client";

import "@splinetool/viewer";
import Image from "next/image";
import { useEffect, useRef } from "react";

const DEFAULT_SCENE_URL = "/spline/hero-glass.splinecode";

export default function SplineGlassScene({ sceneUrl = process.env.NEXT_PUBLIC_SPLINE_HERO_URL || DEFAULT_SCENE_URL }: { sceneUrl?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const viewer = document.createElement("spline-viewer");
    viewer.setAttribute("url", sceneUrl);
    viewer.setAttribute("events-target", "global");
    viewer.setAttribute("background", "transparent");
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    viewer.style.display = "block";
    viewer.style.opacity = "0.52";
    mount.replaceChildren(viewer);

    return () => mount.replaceChildren();
  }, [sceneUrl]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
      <Image src="/spline/reeded-liquid-glass-crop-v2.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 700px" className="object-cover opacity-20 mix-blend-screen" priority />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(239,179,74,0.18),transparent_42%)]" />
      <div ref={mountRef} className="absolute inset-0 z-10" />
    </div>
  );
}
