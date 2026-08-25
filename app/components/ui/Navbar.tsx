"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/useLang";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    if (!isHome) return;
    e.preventDefault();
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <Link href="/" className="nav-mark">
        JOFFREY<span>_</span>
      </Link>
      <div className="nav-links">
        <span className="nav-open nav-link--hide-sm">{t.nav.open}</span>
        <Link href="/projects" className="nav-link">{t.nav.projects}</Link>
        <Link href="/skills" className="nav-link">{t.nav.skills}</Link>
        <Link href={isHome ? "#contact" : "/#contact"} className="nav-link nav-link--hide-sm" onClick={scrollToContact}>
          {t.nav.contact}
        </Link>
        <button
          className="nav-lang"
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          aria-label="Switch language"
        >
          {t.lang_switch}
        </button>
      </div>
    </nav>
  );
}
