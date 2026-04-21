"use client";

import { useState, useEffect } from "react";
import { LangContext } from "@/lib/useLang";
import { type Lang, translations, detectLang } from "@/lib/i18n";

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Lang | null;
    setLang(saved ?? detectLang());
  }, []);

  const handleSetLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("portfolio-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}
