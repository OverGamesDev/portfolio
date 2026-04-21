"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useLang } from "@/lib/useLang";

const BlockchainNetwork = dynamic(
  () => import("@/components/three/BlockchainNetwork"),
  { ssr: false }
);

function TypewriterText({ words }: { words: readonly string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const stateRef = useRef({ wordIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (!ref.current) return;
      const { wordIdx, charIdx, deleting } = stateRef.current;
      const current = words[wordIdx];

      if (deleting) {
        stateRef.current.charIdx--;
        ref.current.textContent = current.slice(0, stateRef.current.charIdx);
        if (stateRef.current.charIdx === 0) {
          stateRef.current.deleting = false;
          stateRef.current.wordIdx = (wordIdx + 1) % words.length;
        }
        timer = setTimeout(tick, 40);
      } else {
        stateRef.current.charIdx++;
        ref.current.textContent = current.slice(0, stateRef.current.charIdx);
        if (stateRef.current.charIdx === current.length) {
          stateRef.current.deleting = true;
          timer = setTimeout(tick, 1800);
        } else {
          timer = setTimeout(tick, 70);
        }
      }
    };
    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span
      ref={ref}
      style={{
        color: "var(--accent)",
        borderRight: "2px solid var(--accent)",
        paddingRight: "2px",
        animation: "blink 1s step-end infinite",
      }}
    />
  );
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
  const { t } = useLang();

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <BlockchainNetwork />

      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(5,6,8,0.75) 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
        background: "linear-gradient(to bottom, transparent, var(--bg))",
        zIndex: 2, pointerEvents: "none",
      }} />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{
          position: "relative", zIndex: 10,
          maxWidth: "900px", margin: "0 auto",
          padding: "0 2rem", paddingTop: "80px",
        }}
      >
        <motion.div variants={item}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase",
            color: "var(--accent)", fontWeight: 600, marginBottom: "1.5rem",
            padding: "0.3rem 0.8rem", border: "1px solid rgba(91,124,246,0.3)",
            borderRadius: "4px", background: "rgba(91,124,246,0.06)",
          }}>
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%",
              background: "var(--green)", animation: "glow-pulse 2s infinite",
            }} />
            {t.hero.eyebrow}
          </div>
        </motion.div>

        <motion.div variants={item} style={{ marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "var(--text-2)", fontWeight: 400 }}>
            {t.hero.greeting}{" "}
          </span>
          <span style={{
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "var(--text)",
            fontWeight: 800, letterSpacing: "-0.02em",
          }}>
            {t.hero.name}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em",
            marginBottom: "1.2rem", color: "var(--text)",
          }}
        >
          {t.hero.subtitle}
          <br />
          <TypewriterText words={t.hero.words} />
        </motion.h1>

        <motion.p
          variants={item}
          style={{ fontSize: "1.05rem", color: "var(--text-2)", maxWidth: "560px", lineHeight: 1.8, marginBottom: "2.5rem" }}
        >
          {t.hero.desc}
        </motion.p>

        <motion.div variants={item} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              padding: "0.75rem 1.75rem", background: "var(--accent)", color: "#fff",
              borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600,
              textDecoration: "none", letterSpacing: "0.02em", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            {t.hero.cta_projects}
          </a>
          <a
            href="#skills"
            style={{
              padding: "0.75rem 1.75rem", background: "transparent", color: "var(--text-2)",
              borderRadius: "6px", fontSize: "0.85rem", fontWeight: 500,
              textDecoration: "none", border: "1px solid var(--border-2)",
              letterSpacing: "0.02em", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
          >
            {t.hero.cta_skills}
          </a>
        </motion.div>

        <motion.div
          variants={item}
          style={{
            display: "flex", gap: "3rem", marginTop: "4rem",
            paddingTop: "2rem", borderTop: "1px solid var(--border)",
          }}
        >
          {t.hero.stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-2)", marginTop: "0.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <style>{`@keyframes blink { 0%,100% { border-color: var(--accent); } 50% { border-color: transparent; } }`}</style>
    </section>
  );
}
