"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";
import { useLang } from "@/lib/useLang";
import { reportBlock } from "@/components/chain/BlockRail";

gsap.registerPlugin(ScrollTrigger);

// deterministic pseudo-hash per project (SSR-safe, no Math.random)
function fakeHash(id: string): string {
  let h = 0x811c9dc5;
  let out = "";
  for (let i = 0; i < 46; i++) {
    h = Math.imul(h ^ id.charCodeAt(i % id.length) ^ i, 0x01000193) >>> 0;
    out += (h % 16).toString(16);
  }
  return out;
}

const N = projects.length;

export default function Protocols() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const slides = gsap.utils.toArray<HTMLElement>(".p-slide", root.current!);
      gsap.set(slides.slice(1), { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });

      // entrance of slide 0 when the scene arrives — force-completed and killed
      // as soon as the pinned timeline starts scrubbing, so the scrub tweens
      // are the only owner of these properties (see Genesis for the rationale)
      const entrance = gsap.from(slides[0].querySelectorAll(".p-info > *, .p-visual"), {
        y: 70,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      let entranceDone = false;
      const finishEntrance = () => {
        if (entranceDone) return;
        entranceDone = true;
        entrance.progress(1);
        entrance.scrollTrigger?.kill();
        entrance.kill();
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${N * 85}%`,
          pin: true,
          scrub: 0.7,
          onToggle: (self) => self.isActive && reportBlock(1),
          onUpdate: (self) => {
            if (self.progress > 0) finishEntrance();
            setIdx(Math.min(N - 1, Math.floor(self.progress * N)));
          },
        },
      });

      for (let i = 1; i < N; i++) {
        const prev = slides[i - 1];
        const cur = slides[i];
        const at = i;
        tl.to(prev.querySelectorAll(".p-info > *"), {
          y: -60, opacity: 0, stagger: 0.035, duration: 0.32, ease: "power2.in",
        }, at - 0.5)
          .to(prev.querySelector(".p-visual"), {
            y: -90, opacity: 0, scale: 0.93, duration: 0.36, ease: "power2.in",
          }, at - 0.47)
          .to(prev.querySelector(".p-watermark"), {
            yPercent: -35, opacity: 0, duration: 0.4,
          }, at - 0.5)
          .set(prev, { autoAlpha: 0 }, at - 0.1)
          .set(cur, { autoAlpha: 1 }, at - 0.1)
          .fromTo(cur.querySelector(".p-watermark"),
            { yPercent: 35, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.42 }, at - 0.1)
          .fromTo(cur.querySelectorAll(".p-info > *"),
            { y: 70, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.05, duration: 0.45, ease: "power3.out" }, at - 0.08)
          .fromTo(cur.querySelector(".p-visual"),
            { y: 100, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, at - 0.1);
      }
      // dwell on the last slide
      tl.to({}, { duration: 0.5 });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="scene protocols-scene" aria-label="Projects">
      <div className="p-header">
        <span className="block-tag">{t.protocols.block}</span>
        <Link href="/projects" className="p-all-link">{t.protocols.all} →</Link>
      </div>

      <div className="p-slides">
        {projects.map((p, i) => (
          <article
            className="p-slide"
            key={p.id}
            style={{ "--p-accent": p.accent } as React.CSSProperties}
          >
            <div className="p-watermark" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
            <div className="p-slide-grid">
              <div className="p-info">
                <div className="p-meta-row">
                  <span className="p-chip" style={{ color: p.chainColor, borderColor: `${p.chainColor}55` }}>
                    {p.chain}
                  </span>
                  <span className={`p-chip p-chip--status-${p.closed ? "closed" : "live"}`}>
                    {p.closed ? t.protocols.closed : t.protocols.live}
                  </span>
                </div>
                <h2 className="p-name display">{p.name}</h2>
                <div className="p-type">{p.type[lang]}</div>
                <p className="p-desc">{p.description[lang]}</p>
                <div className="p-tags">
                  {p.tags.map((tag) => <span className="p-tag" key={tag}>{tag}</span>)}
                </div>
                <div>
                  <Link href={`/projects/${p.id}`} className="p-study">{t.protocols.study} →</Link>
                </div>
              </div>
              <div className="p-visual">
                {p.banner && (
                  <Image src={p.banner} alt="" fill className="p-visual-banner" sizes="45vw" />
                )}
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={150}
                  height={150}
                  className="p-visual-logo"
                />
                <div className="p-visual-hash">0x{fakeHash(p.id)}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="p-progress" aria-hidden="true">
        {projects.map((p, i) => <i key={p.id} className={i <= idx ? "on" : ""} />)}
      </div>
      <div className="p-counter" style={{ position: "absolute", bottom: "6.5vh", right: "3vw", zIndex: 5 }}>
        <b>{String(idx + 1).padStart(2, "0")}</b> / {String(N).padStart(2, "0")}
      </div>
    </section>
  );
}
