"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/lib/useLang";
import { skillGroups, levelLabel } from "@/lib/skills";

function SkillPreviewCard({
  group,
  index,
  lang,
}: {
  group: (typeof skillGroups)[0];
  index: number;
  lang: "fr" | "en";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const preview = group.skills.slice(0, group.preview);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{
        padding: "1.1rem 1.25rem 0.9rem",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: group.color, flexShrink: 0 }} />
          <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: group.color, fontWeight: 700 }}>
            {group.title[lang]}
          </span>
        </div>
        <span style={{ fontSize: "0.65rem", color: "var(--text-3)" }}>
          {group.skills.length} {lang === "fr" ? "skills" : "skills"}
        </span>
      </div>

      {/* Preview skills */}
      <div style={{ padding: "0.85rem 1.25rem", flex: 1 }}>
        {preview.map((skill) => (
          <div
            key={skill.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.38rem 0",
              borderBottom: "1px solid rgba(26,34,53,0.5)",
            }}
          >
            <span style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>{skill.name}</span>
            <span style={{
              fontSize: "0.6rem", letterSpacing: "0.06em", textTransform: "uppercase",
              color: levelLabel[skill.level].color, fontWeight: 600,
            }}>
              {levelLabel[skill.level][lang]}
            </span>
          </div>
        ))}
      </div>

      {/* View more footer */}
      <Link
        href="/skills"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.25rem",
          borderTop: "1px solid var(--border)",
          textDecoration: "none",
          fontSize: "0.72rem",
          color: "var(--text-3)",
          transition: "all 0.2s",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = group.color;
          (e.currentTarget as HTMLElement).style.background = `${group.color}08`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--text-3)";
          (e.currentTarget as HTMLElement).style.background = "transparent";
        }}
      >
        <span>+{group.skills.length - group.preview} {lang === "fr" ? "de plus" : "more"}</span>
        <span>→</span>
      </Link>
    </motion.div>
  );
}

export default function Skills() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  const { t, lang } = useLang();

  return (
    <section id="skills" style={{ borderTop: "1px solid var(--border)" }} className="skills-section">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Title row */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}
        >
          <div>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "0.5rem", fontWeight: 600 }}>
              {t.skills.section_label}
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>
              {t.skills.section_title}
            </h2>
          </div>
          <Link
            href="/skills"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontSize: "0.82rem", color: "var(--text-2)", textDecoration: "none",
              border: "1px solid var(--border)", borderRadius: "6px",
              padding: "0.5rem 1rem", transition: "all 0.2s", whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            {lang === "fr" ? "Tout voir →" : "View all →"}
          </Link>
        </motion.div>

        {/* Preview grid */}
        <div className="skills-preview-grid">
          {skillGroups.slice(0, 6).map((g, i) => (
            <SkillPreviewCard key={g.id} group={g} index={i} lang={lang} />
          ))}
        </div>
        <style>{`
          .skills-section { padding: 100px 2rem; }
          @media (max-width: 600px) {
            .skills-section { padding: 60px 1rem; }
          }
          .skills-preview-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          @media (max-width: 900px) {
            .skills-preview-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 600px) {
            .skills-preview-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    </section>
  );
}
