"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { projects } from "@/lib/projects";
import { useLang } from "@/lib/useLang";
import ProjectCard from "@/components/ui/ProjectCard";
import Navbar from "@/components/ui/Navbar";

const HexBackground = dynamic(() => import("@/components/three/HexBackground"), { ssr: false });

export default function ProjectsPage() {
  const { t, lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="projects-page-main" style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "80px", position: "relative" }}>
        <HexBackground />
        <div className="projects-page-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "3.5rem" }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                fontSize: "0.78rem", color: "var(--text-2)", textDecoration: "none",
                marginBottom: "2rem", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-2)")}
            >
              {t.projects.back}
            </Link>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "0.5rem", fontWeight: 600 }}>
              {t.projects.section_label}
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>
              {t.projects.all_title}
            </h1>
          </motion.div>

          {/* Grid */}
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
