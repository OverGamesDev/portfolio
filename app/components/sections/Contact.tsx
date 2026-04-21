"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useLang } from "@/lib/useLang";

const ContactScene = dynamic(() => import("@/components/three/ContactScene"), { ssr: false });

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useLang();

  const links = [
    {
      label: "Email",
      value: "contact@joffrey.pro",
      href: "mailto:contact@joffrey.pro",
      color: "var(--accent)",
    },
    {
      label: t.contact.github,
      value: "OverGamesDev",
      href: "https://github.com/OverGamesDev",
      color: "var(--text-2)",
    },
    {
      label: t.contact.telegram,
      value: "@OverGamesDev",
      href: "https://t.me/OverGamesDev",
      color: "#2AABEE",
    },
  ];

  return (
    <section
      id="contact"
      style={{ position: "relative", padding: "100px 2rem 80px", borderTop: "1px solid var(--border)", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "0.5rem", fontWeight: 600 }}>
              {t.contact.section_label}
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1.2rem", color: "var(--text)" }}>
              {t.contact.section_title}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "var(--text-2)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "420px" }}>
              {t.contact.desc}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "1rem 1.2rem",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: "8px", textDecoration: "none", transition: "all 0.2s",
                    maxWidth: "380px",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}
                >
                  <span style={{ fontSize: "0.73rem", color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
                    {link.label}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: link.color, fontWeight: 600 }}>
                    {link.value}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ height: "400px" }}
          >
            <ContactScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
