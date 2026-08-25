"use client";

const GLYPHS = "0123456789ABCDEF·#><$%&";

export function randomHash(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) s += GLYPHS[Math.floor(Math.random() * 16)];
  return s;
}

/**
 * Progressively decodes `target` into `el`, hex-scramble style.
 * Returns a cancel function.
 */
export function scrambleTo(el: HTMLElement, target: string, duration = 900): () => void {
  const start = performance.now();
  let raf = 0;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const settled = Math.floor(p * target.length);
    let out = target.slice(0, settled);
    for (let i = settled; i < target.length; i++) {
      out += target[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export function usePrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
