"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { type Lang, translations, detectLang } from "./i18n";

export type { Lang };
export { translations };

import { createContext as _createContext } from "react";

export const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)["fr"] | (typeof translations)["en"];
}>({
  lang: "fr",
  setLang: () => {},
  t: translations.fr,
});

export function useLang() {
  return useContext(LangContext);
}
