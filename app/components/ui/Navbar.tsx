"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/useLang";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.skills, href: "/skills" },
    { label: t.nav.contact, href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: "0 2rem",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(5,6,8,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,34,53,0.8)" : "1px solid transparent",
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "0.78rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-2)",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        joffrey.pro
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
          {navLinks.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-2)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-2)")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--accent)",
            background: "rgba(91,124,246,0.08)",
            border: "1px solid rgba(91,124,246,0.25)",
            borderRadius: "4px",
            padding: "0.25rem 0.6rem",
            cursor: "pointer",
            fontWeight: 600,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(91,124,246,0.18)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(91,124,246,0.08)"; }}
        >
          {t.lang_switch}
        </button>
      </div>
    </motion.nav>
  );
}
