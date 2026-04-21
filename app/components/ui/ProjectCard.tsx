"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import type { Lang } from "@/lib/i18n";

const tagColorMap: Record<string, string> = {
  green: "rgba(0,229,160,0.12)",
  accent: "rgba(91,124,246,0.12)",
  neutral: "rgba(26,34,53,0.6)",
};
const tagTextMap: Record<string, string> = {
  green: "#00e5a0",
  accent: "#7c9cff",
  neutral: "#6b7a99",
};

export default function ProjectCard({
  project,
  index,
  lang,
}: {
  project: Project;
  index: number;
  lang: Lang;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link
        href={`/projects/${project.id}`}
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            position: "relative",
            background: hovered ? "var(--surface-2)" : "var(--surface)",
            border: `1px solid ${hovered ? "var(--border-2)" : "var(--border)"}`,
            borderRadius: "12px",
            padding: "1.75rem",
            transition: "all 0.22s ease",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            height: "100%",
          }}
        >
          {/* Top accent line on hover */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: hovered
              ? `linear-gradient(90deg, transparent, ${project.accent}70, transparent)`
              : "transparent",
            transition: "background 0.3s",
          }} />

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "10px",
              background: "#0d1117", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, overflow: "hidden", padding: "6px",
              transition: "border-color 0.2s",
              borderColor: hovered ? "var(--border-2)" : "var(--border)",
            }}>
              <Image
                src={project.logo}
                alt={project.name}
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: project.accent, fontWeight: 600, marginBottom: "0.2rem",
              }}>
                {project.type[lang]}
              </div>
              <div style={{
                fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em",
                color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {project.name}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem", flexShrink: 0 }}>
              <span style={{
                fontSize: "0.65rem", padding: "0.2rem 0.55rem", borderRadius: "4px",
                border: "1px solid var(--border)", color: project.chainColor,
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                {project.chain}
              </span>
              {project.closed && (
                <span style={{
                  fontSize: "0.6rem", padding: "0.15rem 0.45rem", borderRadius: "4px",
                  background: "rgba(107,122,153,0.12)", color: "var(--text-3)",
                  letterSpacing: "0.06em", textTransform: "uppercase", border: "1px solid var(--border)",
                }}>
                  {lang === "fr" ? "Fermé" : "Closed"}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: "0.85rem", color: "var(--text-2)", lineHeight: 1.7,
            marginBottom: "1.25rem", flex: 1,
          }}>
            {project.description[lang]}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
            {project.tags.map((tag) => {
              const colorKey = project.tagColors[tag] || "neutral";
              return (
                <span key={tag} style={{
                  fontSize: "0.68rem", padding: "0.22rem 0.6rem", borderRadius: "4px",
                  background: tagColorMap[colorKey], color: tagTextMap[colorKey],
                }}>
                  {tag}
                </span>
              );
            })}
          </div>

          {/* Arrow indicator */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.75rem",
            color: hovered ? project.accent : "var(--text-3)",
            fontWeight: 600,
            transition: "color 0.2s, gap 0.2s",
          }}>
            {lang === "fr" ? "Voir le projet" : "View project"}
            <span style={{
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.2s",
              display: "inline-block",
            }}>
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
