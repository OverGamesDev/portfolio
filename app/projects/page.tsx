"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import BlockRail from "@/components/chain/BlockRail";
import { projects } from "@/lib/projects";
import { useLang } from "@/lib/useLang";

export default function ProjectsPage() {
  const { t, lang } = useLang();

  return (
    <>
      <Navbar />
      <BlockRail initial={1} />
      <main className="subpage">
        <div className="subpage-head">
          <Link href="/" className="subpage-back">← {t.projects.back}</Link>
          <div>
            <span className="block-tag">{t.protocols.block}</span>
          </div>
          <h1 className="subpage-title display">{t.projects.all_title}</h1>
          <p className="subpage-sub">{t.projects.all_sub}</p>
        </div>

        <div className="pj-grid">
          {projects.map((p, i) => (
            <Link
              href={`/projects/${p.id}`}
              key={p.id}
              className="pj-card"
              style={{ "--pj-accent": p.accent, animationDelay: `${i * 0.07}s` } as React.CSSProperties}
            >
              <div className="pj-card-top">
                <span className="pj-index">BLOCK_{String(i + 1).padStart(2, "0")}</span>
                <Image src={p.logo} alt="" width={52} height={52} className="pj-logo" />
              </div>
              <div>
                <h2 className="pj-name">{p.name}</h2>
                <div className="pj-type">{p.type[lang]}</div>
              </div>
              <p className="pj-desc">{p.description[lang]}</p>
              <div className="pj-foot">
                <span style={{ color: p.chainColor }}>{p.chain}</span>
                <span style={{ color: p.closed ? "var(--ember)" : "var(--ok)" }}>
                  {p.closed ? t.protocols.closed : t.protocols.live}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
