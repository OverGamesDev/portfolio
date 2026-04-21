"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getProject, projects } from "@/lib/projects";
import { useLang } from "@/lib/useLang";
import Navbar from "@/components/ui/Navbar";
import { notFound } from "next/navigation";

const ContactScene = dynamic(() => import("@/components/three/ContactScene"), { ssr: false });

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

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProject(slug);
  const { t, lang } = useLang();

  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.id !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: "80px", overflowX: "hidden" }}>
        {/* Hero header with optional banner as background */}
        <div className="project-hero-section" style={{
          position: "relative", overflow: "hidden",
          background: project.banner ? "transparent" : "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "4rem 2rem",
          minHeight: project.banner ? "280px" : undefined,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
        }}>
        <style>{`
          @media (max-width: 640px) {
            .project-hero-section { padding: 3rem 1rem !important; }
          }
        `}</style>
          {/* Banner background */}
          {project.banner && (
            <>
              <Image
                src={project.banner}
                alt={`${project.name} banner`}
                fill
                style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
                priority
              />
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(to bottom, rgba(5,6,8,0.35) 0%, rgba(5,6,8,0.82) 60%, rgba(5,6,8,0.97) 100%)",
              }} />
            </>
          )}
          {/* Glow accent (when no banner) */}
          {!project.banner && (
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              background: `radial-gradient(ellipse 60% 80% at 80% 50%, ${project.accent}10 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />
          )}

          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2, width: "100%" }}>
            <Link
              href="/projects"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontSize: "0.78rem", fontWeight: 600,
                color: "var(--text-2)",
                textDecoration: "none",
                marginBottom: "2.5rem",
                padding: "0.45rem 0.9rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(6px)",
                transition: "all 0.18s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--text)";
                el.style.borderColor = "var(--border-2)";
                el.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--text-2)";
                el.style.borderColor = "var(--border)";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {t.projects.back}
            </Link>

            <div className="project-hero-header" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }}>
            <style>{`
              @media (max-width: 640px) {
                .project-hero-header { grid-template-columns: 1fr !important; gap: 0 !important; }
                .project-hero-3d { display: none !important; }
              }
            `}</style>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "14px",
                    background: "#0d1117", border: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "8px", flexShrink: 0,
                  }}>
                    <Image src={project.logo} alt={project.name} width={48} height={48} style={{ objectFit: "contain" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: project.accent, fontWeight: 600, marginBottom: "0.2rem" }}>
                      {project.type[lang]}
                    </div>
                    <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1 }}>
                      {project.name}
                    </h1>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.72rem", padding: "0.25rem 0.7rem", borderRadius: "4px", border: "1px solid var(--border)", color: project.chainColor, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {project.chain}
                  </span>
                  {project.closed && (
                    <span style={{
                      fontSize: "0.72rem", padding: "0.25rem 0.7rem", borderRadius: "4px",
                      border: "1px solid var(--border)", color: "var(--text-3)",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      background: "rgba(107,122,153,0.08)",
                    }}>
                      {lang === "fr" ? "Projet fermé" : "Project closed"}
                    </span>
                  )}
                  {project.site && !project.closed && (
                    <a
                      href={project.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.4rem",
                        fontSize: "0.78rem", color: "var(--text-2)", textDecoration: "none",
                        border: "1px solid var(--border)", borderRadius: "4px",
                        padding: "0.25rem 0.7rem", transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                    >
                      {t.projects.visit_site} ↗
                    </a>
                  )}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {project.tags.map((tag) => {
                    const ck = project.tagColors[tag] || "neutral";
                    return (
                      <span key={tag} style={{ fontSize: "0.72rem", padding: "0.28rem 0.65rem", borderRadius: "4px", background: tagColorMap[ck], color: tagTextMap[ck] }}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* 3D visual */}
              <div className="project-hero-3d" style={{ width: "200px", height: "200px", flexShrink: 0 }}>
                <ContactScene />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <style>{`
          .project-detail-content {
            max-width: 1100px;
            margin: 0 auto;
            padding: 4rem 2rem;
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 3rem;
          }
          @media (max-width: 860px) {
            .project-detail-content {
              grid-template-columns: 1fr;
              padding: 2rem 1rem;
              gap: 2rem;
            }
            .project-sidebar-sticky {
              position: static !important;
              top: unset !important;
            }
            .project-sidebar-grid {
              display: grid !important;
              grid-template-columns: 1fr 1fr;
              gap: 1rem;
            }
          }
          @media (max-width: 520px) {
            .project-sidebar-grid {
              grid-template-columns: 1fr !important;
            }
          }
          .project-iframe-wrapper {
            width: 100%;
            overflow: hidden;
          }
          .project-iframe-wrapper iframe {
            width: 100%;
            max-width: 100%;
            height: 500px;
            border: none;
            display: block;
          }
          @media (max-width: 640px) {
            .project-iframe-wrapper iframe {
              height: 320px;
            }
          }
        `}</style>
        <div className="project-detail-content">
          {/* Main */}
          <div>
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: "3rem" }}
            >
              <h2 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text)", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
                {t.projects.overview}
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--text-2)", lineHeight: 1.85 }}>
                {project.overview[lang]}
              </p>
            </motion.section>

            {/* Highlights */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ marginBottom: "3rem" }}
            >
              <h2 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text)", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
                {t.projects.highlights}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {project.highlights[lang].map((hl, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
                  >
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: project.accent, marginTop: "0.45rem", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.6 }}>{hl}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Site embed if available and not closed */}
            {project.site && !project.closed && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text)", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
                  {t.projects.visit_site}
                </h2>
                <div style={{
                  border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden",
                  background: "var(--surface)", position: "relative",
                }}>
                  {/* Browser chrome */}
                  <div style={{
                    background: "var(--surface-2)", borderBottom: "1px solid var(--border)",
                    padding: "0.6rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem",
                  }}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                        <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                      ))}
                    </div>
                    <div style={{
                      flex: 1, background: "var(--bg)", borderRadius: "4px",
                      padding: "0.2rem 0.75rem", fontSize: "0.72rem", color: "var(--text-2)",
                      marginLeft: "0.5rem",
                    }}>
                      {project.site}
                    </div>
                    <a
                      href={project.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "0.72rem", color: "var(--accent)", textDecoration: "none" }}
                    >
                      ↗
                    </a>
                  </div>
                  <div className="project-iframe-wrapper">
                    <iframe
                      src={project.site}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      title={`${project.name} website`}
                    />
                  </div>
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="project-sidebar-sticky"
            style={{ display: "contents" }}
          >
          <div className="project-sidebar-grid" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Tech Stack */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-3)", fontWeight: 600, marginBottom: "1.25rem" }}>
                {t.projects.tech_stack}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "0.78rem", padding: "0.3rem 0.7rem",
                      borderRadius: "6px", background: "var(--bg)",
                      border: "1px solid var(--border-2)", color: "var(--text-2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Other projects */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-3)", fontWeight: 600, marginBottom: "1.25rem" }}>
                {lang === "fr" ? "Autres projets" : "Other projects"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {otherProjects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      textDecoration: "none", transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "8px",
                      background: "#0d1117", border: "1px solid var(--border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: "5px", flexShrink: 0,
                    }}>
                      <Image src={p.logo} alt={p.name} width={26} height={26} style={{ objectFit: "contain" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)" }}>{p.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-3)" }}>{p.type[lang]}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/projects"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                  marginTop: "1.25rem", fontSize: "0.75rem", fontWeight: 600,
                  color: "var(--text-2)", textDecoration: "none",
                  padding: "0.5rem 1rem", borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "rgba(255,255,255,0.03)",
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--text)";
                  el.style.borderColor = "var(--border-2)";
                  el.style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--text-2)";
                  el.style.borderColor = "var(--border)";
                  el.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                {lang === "fr" ? "← Tous les projets" : "← All projects"}
              </Link>
            </div>
          </div>
          </motion.aside>
        </div>
      </main>
    </>
  );
}
