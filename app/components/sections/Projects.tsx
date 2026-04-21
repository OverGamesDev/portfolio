"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import { useLang } from "@/lib/useLang";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  const { t, lang } = useLang();

  return (
    <section id="projects" style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 2rem" }}>
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}
      >
        <div>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "0.5rem", fontWeight: 600 }}>
            {t.projects.section_label}
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>
            {t.projects.section_title}
          </h2>
        </div>
        <Link
          href="/projects"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontSize: "0.82rem", color: "var(--text-2)", textDecoration: "none",
            border: "1px solid var(--border)", borderRadius: "6px",
            padding: "0.5rem 1rem", transition: "all 0.2s", whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
        >
          {t.projects.view_more} →
        </Link>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
        {featuredProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}
