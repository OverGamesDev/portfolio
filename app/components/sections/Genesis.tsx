"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/useLang";
import { randomHash, scrambleTo } from "@/lib/scramble";
import { reportBlock } from "@/components/chain/BlockRail";

gsap.registerPlugin(ScrollTrigger);

type HashCol = { left: string; text: string; dur: number };

export default function Genesis() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const [cols, setCols] = useState<HashCol[]>([]);

  // background hash columns are random → generate client-side only
  useEffect(() => {
    setCols(
      [8, 30, 55, 78, 93].map((left) => ({
        left: `${left}%`,
        text: Array.from({ length: 26 }, () => randomHash(6)).join("\n"),
        dur: 14 + Math.random() * 14,
      }))
    );
  }, []);

  // decode ledger values on mount
  useEffect(() => {
    const cancels = Array.from(root.current?.querySelectorAll<HTMLElement>(".val") ?? []).map(
      (el, i) => scrambleTo(el, el.dataset.value ?? "", 700 + i * 250)
    );
    return () => cancels.forEach((c) => c());
  }, [t]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);

      // intro: these tweens touch the same properties as the scrub timeline
      // below, so they are force-completed and killed on the first scroll —
      // after that the scrub timeline is the only owner of those properties.
      const introTweens = [
        gsap.from(q(".ch"), {
          yPercent: 115,
          opacity: 0,
          stagger: 0.055,
          duration: 0.95,
          ease: "power4.out",
          delay: 0.15,
        }),
        gsap.from(q(".genesis-role, .genesis-ledger, .genesis-scroll, .g-tag"), {
          y: 26,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.65,
        }),
      ];
      let introDone = false;
      const finishIntro = () => {
        if (introDone) return;
        introDone = true;
        introTweens.forEach((tw) => {
          tw.progress(1);
          tw.kill();
        });
      };
      // frame lines only conflict with nothing scrubbed (scrub animates .frame itself)
      gsap.from(q(".frame .ft, .frame .fb"), { scaleX: 0, duration: 1.3, ease: "power3.inOut", delay: 0.3 });
      gsap.from(q(".frame .fl, .frame .fr"), { scaleY: 0, duration: 1.3, ease: "power3.inOut", delay: 0.3 });

      // scroll: the genesis block disassembles · letters scatter like tx data
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=90%",
          pin: true,
          scrub: 0.8,
          onToggle: (self) => self.isActive && reportBlock(0),
          onUpdate: (self) => {
            if (self.progress > 0) finishIntro();
          },
        },
      });
      // plain .to() tweens: their start values are captured lazily on the
      // first scrubbed render, which is guaranteed to happen AFTER finishIntro
      // put every element in its resting state — so scrubbing back to the top
      // always restores the fully visible hero.
      tl.to(
        q(".ch"),
        {
          y: () => gsap.utils.random(-160, -320),
          x: () => gsap.utils.random(-160, 160),
          rotation: () => gsap.utils.random(-30, 30),
          opacity: 0,
          stagger: { each: 0.025, from: "random" },
          ease: "power2.in",
          duration: 0.55,
        },
        // never place scrubbed tweens at the exact 0 position: a child whose
        // startTime is 0 is not re-rendered when the scrub returns to 0,
        // leaving it stuck at its scrolled-out state
        0.01
      )
        .to(q(".g-tag"), { y: -40, opacity: 0, duration: 0.3 }, 0.01)
        .to(q(".genesis-role"), { y: -70, opacity: 0, duration: 0.35 }, 0.06)
        .to(q(".genesis-ledger"), { y: -50, opacity: 0, duration: 0.35 }, 0.14)
        .to(q(".genesis-scroll"), { opacity: 0, duration: 0.15 }, 0.01)
        .to(q(".genesis-bg"), { opacity: 0, duration: 0.5 }, 0.25)
        .to(q(".frame"), { scale: 0.9, opacity: 0, duration: 0.4, ease: "power2.in" }, 0.5);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="scene" aria-label="Intro">
      <div className="genesis-bg" aria-hidden="true">
        <div className="genesis-grid" />
        {cols.map((c, i) => (
          <div
            key={i}
            className="hash-column"
            style={{ left: c.left, animationDuration: `${c.dur}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
          >
            {c.text}
          </div>
        ))}
      </div>

      <div className="frame" aria-hidden="true">
        <i className="ft" /><i className="fb" /><i className="fl" /><i className="fr" />
        <i className="fc c1" /><i className="fc c2" /><i className="fc c3" /><i className="fc c4" />
      </div>

      <div className="scene-inner">
        <span className="block-tag g-tag">{t.genesis.block}</span>
        <h1 className="genesis-name display" style={{ marginTop: "2rem", overflow: "hidden" }}>
          {t.genesis.firstname.split("").map((c, i) => (
            <span className="ch" key={i}>{c}</span>
          ))}
        </h1>
        <p className="genesis-role">
          <strong style={{ color: "var(--ivory)", fontWeight: 550 }}>{t.genesis.role}.</strong>{" "}
          {t.genesis.tagline}
        </p>
        <div className="genesis-ledger">
          {t.genesis.ledger.map((row) => (
            <div className="genesis-ledger-row" key={row.key}>
              <span>{row.key}</span>
              <span className="dots" />
              <span className="val" data-value={row.value}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="genesis-scroll">{t.genesis.scroll}</div>
    </section>
  );
}
