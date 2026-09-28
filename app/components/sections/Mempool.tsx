"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups, type Skill } from "@/lib/skills";
import { useLang } from "@/lib/useLang";
import { reportBlock } from "@/components/chain/BlockRail";

gsap.registerPlugin(ScrollTrigger);

const ROWS = 6;

export default function Mempool() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const { rows, total } = useMemo(() => {
    const all: Skill[] = skillGroups.flatMap((g) => g.skills);
    const perRow = Math.ceil(all.length / ROWS);
    return {
      rows: Array.from({ length: ROWS }, (_, i) => all.slice(i * perRow, (i + 1) * perRow)),
      total: all.length,
    };
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=230%",
          pin: true,
          scrub: 0.6,
          onToggle: (self) => self.isActive && reportBlock(2),
        },
      });

      // rows drift horizontally in alternating directions · the mempool flows
      // 0.01, not 0: a scrubbed child at the exact 0 position is not
      // re-rendered when the scrub returns to 0
      q(".m-row").forEach((row, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        tl.fromTo(row, { x: dir * -220 }, { x: dir * 220, ease: "none", duration: 0.99 }, 0.01);
      });

      // tx counter confirms 0 → total while pinned
      const state = { v: 0 };
      tl.to(state, {
        v: total,
        duration: 0.75,
        ease: "power1.inOut",
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = String(Math.round(state.v)).padStart(2, "0");
        },
      }, 0.01);

      // center content entrance (toggle, not scrubbed)
      gsap.from(q(".m-center > *"), {
        y: 46,
        opacity: 0,
        stagger: 0.09,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });
    });
    return () => mm.revert();
  }, [total]);

  return (
    <section ref={root} className="scene mempool-scene" aria-label="Skills">
      <div className="m-rows" aria-hidden="true">
        {rows.map((row, i) => (
          <div className="m-row" key={i} style={{ justifyContent: i % 2 ? "flex-end" : "flex-start" }}>
            {row.map((s) => (
              <span key={s.name} className={`m-skill m-skill--${s.level}`}>{s.name}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="m-fade" aria-hidden="true" />

      <div className="m-center scene-inner">
        <span className="block-tag">{t.mempool.block}</span>
        <div className="m-counter" style={{ marginTop: "1.6rem" }}>
          <em><span ref={counterRef}>00</span></em>
          <span style={{ fontSize: "0.22em", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.2em", marginLeft: "0.6em" }}>
            / {t.mempool.confirmed}
          </span>
        </div>
        <div className="mono-label m-sub">{t.mempool.title}</div>
        <p className="m-desc">{t.mempool.desc}</p>
        <Link href="/skills" className="m-all">{t.mempool.all} →</Link>
      </div>
    </section>
  );
}
