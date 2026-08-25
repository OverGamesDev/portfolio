"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import BlockRail from "@/components/chain/BlockRail";
import { getProject, projects } from "@/lib/projects";
import { useLang } from "@/lib/useLang";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProject(slug);
  const { t, lang } = useLang();

  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === slug);
  const otherProjects = projects.filter((p) => p.id !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <BlockRail initial={1} />
      <main className="subpage">
        <Link href="/projects" className="subpage-back">← {t.projects.all_title}</Link>

        <div className="pd-hero">
          {project.banner && (
            <Image src={project.banner} alt="" fill className="pd-hero-banner" sizes="100vw" priority />
          )}
          <div className="pd-hero-shade" aria-hidden="true" />
          <div className="pd-hero-content">
            <Image src={project.logo} alt={project.name} width={84} height={84} className="pd-logo" />
            <div>
              <span className="pj-index">BLOCK_{String(index + 1).padStart(2, "0")} / {project.chain.toUpperCase()}</span>
              <h1 className="pd-name display">{project.name}</h1>
              <div className="pj-type">{project.type[lang]}</div>
            </div>
          </div>
        </div>

        <div className="pd-body">
          <div>
            <section className="pd-section">
              <h2>{t.projects.overview}</h2>
              <p className="pd-overview">{project.overview[lang]}</p>
            </section>

            <section className="pd-section">
              <h2>{t.projects.highlights}</h2>
              <ul className="pd-highlights">
                {project.highlights[lang].map((h) => <li key={h}>{h}</li>)}
              </ul>
            </section>

            <section className="pd-section">
              <h2>{t.projects.other}</h2>
              <div className="pj-grid">
                {otherProjects.map((p, i) => (
                  <Link
                    href={`/projects/${p.id}`}
                    key={p.id}
                    className="pj-card"
                    style={{ "--pj-accent": p.accent, animationDelay: `${i * 0.07}s`, minHeight: "auto" } as React.CSSProperties}
                  >
                    <div className="pj-card-top">
                      <span className="pj-index">{p.chain.toUpperCase()}</span>
                      <Image src={p.logo} alt="" width={40} height={40} className="pj-logo" style={{ width: 40, height: 40 }} />
                    </div>
                    <div>
                      <h3 className="pj-name" style={{ fontSize: "1rem" }}>{p.name}</h3>
                      <div className="pj-type">{p.type[lang]}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="pd-sidebar">
            <div className="pd-meta-row">
              <span className="pd-meta-key">{t.protocols.chain_label}</span>
              <span className="pd-meta-val" style={{ color: project.chainColor }}>{project.chain}</span>
            </div>
            <div className="pd-meta-row">
              <span className="pd-meta-key">{t.projects.status}</span>
              <span className="pd-meta-val" style={{ color: project.closed ? "var(--ember)" : "var(--ok)" }}>
                {project.closed ? t.protocols.closed : t.protocols.live}
              </span>
            </div>
            <div className="pd-meta-row">
              <span className="pd-meta-key">{t.projects.tech_stack}</span>
              <div className="pd-stack" style={{ marginTop: "0.5rem" }}>
                {project.techStack.map((tech) => <span className="p-tag" key={tech}>{tech}</span>)}
              </div>
            </div>
            {project.site && !project.closed && (
              <a href={project.site} target="_blank" rel="noopener noreferrer" className="pd-visit">
                {t.projects.visit_site} ↗
              </a>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}
