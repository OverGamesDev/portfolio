"use client";

import { useState, useRef, useCallback } from "react";
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(null);
  const inView = useInView(scrollRef, { once: true, margin: "-60px" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({
      x: ((y - cy) / cy) * -7,
      y: ((x - cx) / cx) * 7,
    });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: "easeOut" }}
      style={{ perspective: "800px" }}
    >
      <Link
        href={`/projects/${project.id}`}
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            scale: hovered ? 1.02 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            position: "relative",
            background: hovered ? "var(--surface-2)" : "var(--surface)",
            border: `1px solid ${hovered ? project.accent + "55" : "var(--border)"}`,
            borderRadius: "12px",
            padding: "1.75rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            height: "100%",
            transformStyle: "preserve-3d",
            boxShadow: hovered
              ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.accent}18`
              : "0 4px 20px rgba(0,0,0,0.2)",
            transition: "background 0.22s, border-color 0.22s, box-shadow 0.22s",
          }}
        >
          {/* Mouse-following gradient glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "12px",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s",
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${project.accent}18 0%, transparent 65%)`,
              pointerEvents: "none",
            }}
          />

          {/* Top accent line on hover */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: hovered
              ? `linear-gradient(90deg, transparent, ${project.accent}90, transparent)`
              : "transparent",
            transition: "background 0.3s",
          }} />

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
            <motion.div
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{
                width: "48px", height: "48px", borderRadius: "10px",
                background: "#0d1117", border: `1px solid ${hovered ? project.accent + "55" : "var(--border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, overflow: "hidden", padding: "6px",
                transition: "border-color 0.2s",
                boxShadow: hovered ? `0 0 16px ${project.accent}30` : "none",
              }}
            >
              <Image
                src={project.logo}
                alt={project.name}
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
              />
            </motion.div>
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
            gap: hovered ? "0.55rem" : "0.35rem",
            fontSize: "0.75rem",
            color: hovered ? project.accent : "var(--text-3)",
            fontWeight: 600,
            transition: "color 0.2s, gap 0.2s",
          }}>
            {lang === "fr" ? "Voir le projet" : "View project"}
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{ display: "inline-block" }}
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
