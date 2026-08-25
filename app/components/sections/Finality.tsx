"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/useLang";
import { reportBlock } from "@/components/chain/BlockRail";

gsap.registerPlugin(ScrollTrigger);

export default function Finality() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);
      gsap.from(q(".f-in"), {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 62%",
          onToggle: (self) => self.isActive && reportBlock(3),
        },
      });
    });
    return () => mm.revert();
  }, []);

  const title = t.finality.title.split(" ");
  const lastWord = title.pop();

  return (
    <section ref={root} id="contact" className="scene finality-scene" aria-label="Contact">
      <div className="scene-inner" style={{ paddingTop: "10vh", paddingBottom: "4vh" }}>
        <span className="block-tag f-in">{t.finality.block}</span>
        <h2 className="f-title display f-in">
          {title.join(" ")} <em>{lastWord}</em>
        </h2>
        <p className="f-desc f-in">{t.finality.desc}</p>
        <div className="f-in">
          <a href="mailto:contact@joffrey.pro" className="f-cta">
            {t.finality.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="f-links f-in">
          <a href="https://github.com/OverGamesDev" target="_blank" rel="noopener noreferrer" className="f-link">
            {t.finality.github} ↗
          </a>
          <a href="https://t.me/OverGamesDev" target="_blank" rel="noopener noreferrer" className="f-link">
            {t.finality.telegram} ↗
          </a>
          <a href="mailto:contact@joffrey.pro" className="f-link">contact@joffrey.pro</a>
        </div>

        <div className="f-footer f-in">
          <span>{t.finality.finalized}</span>
          <span>{t.finality.rights}</span>
        </div>
      </div>
    </section>
  );
}
