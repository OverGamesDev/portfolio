"use client";

import { useEffect, useRef, useState } from "react";
import { randomHash } from "@/lib/scramble";

export const BLOCK_NAMES = ["GENESIS", "PROTOCOLS", "MEMPOOL", "FINALITY"] as const;

/** Fixed HUD · the chain's block explorer. Scenes report their index via the `chain:block` event. */
export default function BlockRail({ initial = 0 }: { initial?: number }) {
  const [active, setActive] = useState(initial);
  const fillRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const hashRef = useRef<HTMLSpanElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);
  const mobileNumRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onBlock = (e: Event) => setActive((e as CustomEvent<{ index: number }>).detail.index);
    window.addEventListener("chain:block", onBlock);

    let lastHash = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      const height = Math.floor(2_847_119 + p * 392);
      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      if (numRef.current) numRef.current.textContent = `#${height.toLocaleString("en-US")}`;
      if (mobileBarRef.current) mobileBarRef.current.style.width = `${p * 100}%`;
      if (mobileNumRef.current) mobileNumRef.current.textContent = `#${height.toLocaleString("en-US")}`;
      const now = performance.now();
      if (hashRef.current && now - lastHash > 90) {
        lastHash = now;
        hashRef.current.textContent = `0x${randomHash(14)}`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("chain:block", onBlock);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <aside className="rail" aria-hidden="true">
        <div className="rail-logo">◆</div>
        <div className="rail-height-label">BLOCK HEIGHT</div>
        <div className="rail-track">
          <div ref={fillRef} className="rail-fill" />
        </div>
        <div className="rail-blocks">
          {BLOCK_NAMES.map((name, i) => (
            <div
              key={name}
              className={`rail-block ${i < active ? "is-done" : ""} ${i === active ? "is-active" : ""}`}
            />
          ))}
        </div>
        <span ref={numRef} className="rail-num">#2,847,119</span>
        <span className="rail-name">{BLOCK_NAMES[active]}</span>
        <span ref={hashRef} className="rail-hash">0x00000000000000</span>
      </aside>

      <div className="rail-mobile" aria-hidden="true">
        <span className="rail-mobile-label">
          BLOCK #{String(active).padStart(2, "0")} · {BLOCK_NAMES[active]}
        </span>
        <span ref={mobileNumRef} className="rail-mobile-num">#2,847,119</span>
        <div ref={mobileBarRef} className="rail-mobile-bar" />
      </div>
    </>
  );
}

export function reportBlock(index: number) {
  window.dispatchEvent(new CustomEvent("chain:block", { detail: { index } }));
}
