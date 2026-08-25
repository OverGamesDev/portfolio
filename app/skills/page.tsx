"use client";

import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import BlockRail from "@/components/chain/BlockRail";
import { skillGroups, levelLabel } from "@/lib/skills";
import { useLang } from "@/lib/useLang";

export default function SkillsPage() {
  const { t, lang } = useLang();

  return (
    <>
      <Navbar />
      <BlockRail initial={2} />
      <main className="subpage">
        <div className="subpage-head">
          <Link href="/" className="subpage-back">← {t.projects.back}</Link>
          <div>
            <span className="block-tag">{t.mempool.block}</span>
          </div>
          <h1 className="subpage-title display">{t.skills.section_title}</h1>
          <p className="subpage-sub">{t.skills.section_sub}</p>
        </div>

        <div className="sk-legend">
          {(Object.keys(levelLabel) as Array<keyof typeof levelLabel>).map((lvl) => (
            <span key={lvl}>
              <i className={`sk-dot sk-dot--${lvl}`} style={{ display: "inline-block" }} />
              {levelLabel[lvl][lang]}
            </span>
          ))}
        </div>

        {skillGroups.map((g, gi) => (
          <section className="sk-group" key={g.id} style={{ animationDelay: `${gi * 0.06}s` }}>
            <div className="sk-group-head">
              <h2 className="sk-group-title">{g.title[lang]}</h2>
              <span className="sk-group-count">
                {String(g.skills.length).padStart(2, "0")} TX
              </span>
            </div>
            <div className="sk-list">
              {g.skills.map((s) => (
                <div className="sk-item" key={s.name}>
                  <i className={`sk-dot sk-dot--${s.level}`} />
                  <div>
                    <div className="sk-name">{s.name}</div>
                    {s.note && <div className="sk-note">{s.note[lang]}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
