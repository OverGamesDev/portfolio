"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import { useLang } from "@/lib/useLang";
import { skillGroups, levelLabel, type SkillLevel } from "@/lib/skills";

const SkillsBackground = dynamic(() => import("@/components/three/SkillsBackground"), { ssr: false });

function LevelDots({ level }: { level: SkillLevel }) {
  const map: Record<SkillLevel, number> = { expert: 3, advanced: 2, intermediate: 1 };
  const count = map[level];
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: n <= count ? levelLabel[level].color : "var(--border-2)",
            transition: "background 0.2s",
          }}
        />
      ))}
    </div>
  );
}

function SkillRow({ skill, index, lang }: { skill: { name: string; level: SkillLevel; note?: { fr: string; en: string } }; index: number; lang: "fr" | "en" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.6rem 0.85rem",
        borderRadius: "6px",
        gap: "1rem",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: "0.87rem", color: "var(--text)", fontWeight: 500 }}>{skill.name}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
        <LevelDots level={skill.level} />
        <span style={{
          fontSize: "0.65rem", letterSpacing: "0.06em", textTransform: "uppercase",
          color: levelLabel[skill.level].color, fontWeight: 600, width: "80px", textAlign: "right",
        }}>
          {levelLabel[skill.level][lang]}
        </span>
      </div>
    </motion.div>
  );
}

function GroupCard({ group, lang, delay }: { group: (typeof skillGroups)[0]; lang: "fr" | "en"; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);

  const displaySkills = expanded ? group.skills : group.skills.slice(0, group.preview + 2);
  const hasMore = group.skills.length > group.preview + 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        overflow: "hidden",
      }}
    >
      {/* Group header */}
      <div style={{
        padding: "1.25rem 1.5rem",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: `${group.color}18`, border: `1px solid ${group.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: group.color }} />
          </div>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>
              {group.title[lang]}
            </div>
            <div style={{ fontSize: "0.68rem", color: "var(--text-3)", marginTop: "1px" }}>
              {group.skills.length} {lang === "fr" ? "technologies" : "technologies"}
            </div>
          </div>
        </div>
        {/* Level legend */}
        <div style={{ display: "flex", gap: "1rem" }}>
          {(["expert", "advanced", "intermediate"] as SkillLevel[]).map((l) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: levelLabel[l].color }} />
              <span style={{ fontSize: "0.6rem", color: "var(--text-3)", letterSpacing: "0.04em" }}>
                {levelLabel[l][lang]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills list */}
      <div style={{ padding: "0.5rem 0.65rem" }}>
        <AnimatePresence initial={false}>
          {displaySkills.map((skill, i) => (
            <SkillRow key={skill.name} skill={skill} index={i} lang={lang} />
          ))}
        </AnimatePresence>
      </div>

      {/* Expand / collapse */}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: "flex", width: "100%", alignItems: "center", justifyContent: "center",
            gap: "0.4rem", padding: "0.75rem",
            borderTop: "1px solid var(--border)", background: "transparent",
            border: "none", borderTopColor: "var(--border)",
            fontSize: "0.75rem", color: "var(--text-3)",
            cursor: "pointer", transition: "all 0.2s",
            borderTopWidth: "1px", borderTopStyle: "solid",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = group.color; (e.currentTarget as HTMLElement).style.background = `${group.color}08`; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          {expanded
            ? (lang === "fr" ? "Réduire" : "Collapse")
            : `+${group.skills.length - displaySkills.length} ${lang === "fr" ? "de plus" : "more"}`}
          <span style={{
            display: "inline-block",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s",
          }}>
            ↓
          </span>
        </button>
      )}
    </motion.div>
  );
}

const totalSkills = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

export default function SkillsPage() {
  const { lang, t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const expertCount = skillGroups.flatMap((g) => g.skills).filter((s) => s.level === "expert").length;
  const advancedCount = skillGroups.flatMap((g) => g.skills).filter((s) => s.level === "advanced").length;

  return (
    <>
      <Navbar />
      <style>{`
        .skills-page-main { padding-top: 100px; padding-bottom: 100px; }
        .skills-page-inner { max-width: 1100px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 1; }
        .skills-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .skills-groups-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        @media (max-width: 700px) {
          .skills-page-main { padding-top: 80px; padding-bottom: 60px; }
          .skills-page-inner { padding: 0 1rem; }
          .skills-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
          .skills-groups-grid { grid-template-columns: 1fr; gap: 1rem; }
        }
      `}</style>
      <main className="skills-page-main" style={{ minHeight: "100vh", position: "relative" }}>
        <SkillsBackground />
        <div className="skills-page-inner">

          {/* Header */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "3.5rem" }}
          >
            <Link
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-2)", textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-2)")}
            >
              ← {lang === "fr" ? "Retour" : "Back"}
            </Link>

            <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "0.5rem", fontWeight: 600 }}>
              {t.skills.section_label}
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "2.5rem" }}>
              {t.skills.section_title}
            </h1>

            {/* Stats row */}
            <div className="skills-stats-grid">
              {[
                { value: String(totalSkills), label: lang === "fr" ? "Technologies" : "Technologies" },
                { value: String(skillGroups.length), label: lang === "fr" ? "Domaines" : "Domains" },
                { value: String(expertCount), label: "Expert" },
                { value: String(advancedCount), label: lang === "fr" ? "Avancé" : "Advanced" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: "10px", padding: "1.25rem",
                  }}
                >
                  <div style={{ fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-3)", marginTop: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

                  {/* Level legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: "flex", gap: "2rem", marginBottom: "2.5rem",
              padding: "0.85rem 1.25rem",
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "8px", alignItems: "center", flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "0.68rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
              {lang === "fr" ? "Légende" : "Legend"}
            </span>
            {(["expert", "advanced", "intermediate"] as SkillLevel[]).map((l) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ display: "flex", gap: "3px" }}>
                  {[1, 2, 3].map((n) => {
                    const map: Record<SkillLevel, number> = { expert: 3, advanced: 2, intermediate: 1 };
                    return (
                      <div key={n} style={{ width: "7px", height: "7px", borderRadius: "50%", background: n <= map[l] ? levelLabel[l].color : "var(--border-2)" }} />
                    );
                  })}
                </div>
                <span style={{ fontSize: "0.75rem", color: levelLabel[l].color, fontWeight: 600 }}>
                  {levelLabel[l][lang]}
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-3)" }}>
                  {l === "expert"
                    ? lang === "fr" ? "Utilisé en production" : "Used in production"
                    : l === "advanced"
                    ? lang === "fr" ? "Maîtrise solide" : "Solid mastery"
                    : lang === "fr" ? "Expérience pratique" : "Practical experience"}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Skills grid */}
          <div className="skills-groups-grid">
            {skillGroups.map((group, i) => (
              <GroupCard
                key={group.id}
                group={group}
                lang={lang}
                delay={i * 0.06}
              />
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
