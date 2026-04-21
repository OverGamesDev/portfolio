"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/useLang";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navLinks = [
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.skills, href: "/skills" },
    { label: t.nav.contact, href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          padding: "0 1.5rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled || menuOpen ? "rgba(5,6,8,0.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(26,34,53,0.8)" : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease",
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

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="desktop-nav">
          <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}>
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

        {/* Mobile right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="mobile-nav">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              background: "rgba(91,124,246,0.08)",
              border: "1px solid rgba(91,124,246,0.25)",
              borderRadius: "4px",
              padding: "0.2rem 0.5rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {t.lang_switch}
          </button>

          {/* Burger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              width: "36px",
              height: "36px",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            <span style={{
              display: "block", width: "18px", height: "1.5px",
              background: "var(--text-2)",
              transition: "transform 0.25s, opacity 0.25s",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: "18px", height: "1.5px",
              background: "var(--text-2)",
              transition: "opacity 0.25s",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: "18px", height: "1.5px",
              background: "var(--text-2)",
              transition: "transform 0.25s, opacity 0.25s",
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "60px", left: 0, right: 0,
              zIndex: 49,
              background: "rgba(5,6,8,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              padding: "1.25rem 1.5rem 1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
            className="mobile-menu"
          >
            {navLinks.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.9rem 0.5rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--text-2)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                    letterSpacing: "0.02em",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-2)")}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav  { display: none  !important; }
        .mobile-menu { display: flex  !important; }
        @media (max-width: 640px) {
          .desktop-nav { display: none  !important; }
          .mobile-nav  { display: flex  !important; }
        }
        @media (min-width: 641px) {
          .mobile-menu { display: none  !important; }
        }
      `}</style>
    </>
  );
}
