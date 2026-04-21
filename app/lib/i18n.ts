export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      projects: "Projets",
      skills: "Compétences",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Blockchain & DeFi Developer",
      greeting: "Salut, je suis",
      name: "Joffrey",
      subtitle: "Je construis des",
      words: ["Protocoles DeFi", "Smart Contracts", "NFT Marketplaces", "Outils IA on-chain", "DEX Perpétuels"],
      desc: "7 protocoles déployés en production sur Alephium & MegaETH. Du NFT Marketplace aux Perpetuals style GMX v2, en passant par la génération de smart contracts assistée par IA.",
      cta_projects: "Voir les projets",
      cta_skills: "Compétences",
      stats: [
        { value: "7", label: "Projets livrés" },
        { value: "92", label: "Skills" },
        { value: "5+", label: "ans dans la crypto" },
      ],
    },
    projects: {
      section_label: "Réalisations",
      section_title: "Projets",
      view_more: "Voir tous les projets",
      featured_label: "À la une",
      all_title: "Tous les projets",
      back: "← Retour",
      visit_site: "Visiter le site",
      tech_stack: "Stack technique",
      highlights: "Points clés",
      overview: "Vue d'ensemble",
    },
    skills: {
      section_label: "Expertise",
      section_title: "Compétences",
    },
    contact: {
      section_label: "Contact",
      section_title: "Travaillons ensemble",
      desc: "Disponible pour des missions freelance, du conseil en architecture DeFi, ou des collaborations sur des protocoles Web3.",
      github: "GitHub",
      telegram: "Telegram",
    },
    footer: {
      tagline: "7 projets · 92 skills · dans la crypto depuis 2020",
      available: "Open for work",
    },
    lang_switch: "EN",
  },
  en: {
    nav: {
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Blockchain & DeFi Developer",
      greeting: "Hey, I'm",
      name: "Joffrey",
      subtitle: "I build",
      words: ["DeFi Protocols", "Smart Contracts", "NFT Marketplaces", "AI Dev Tools", "Perpetual DEXs"],
      desc: "7 protocols deployed on Alephium & MegaETH. From NFT Marketplace to GMX v2-style Perpetuals and AI-assisted smart contract generation.",
      cta_projects: "View projects",
      cta_skills: "Skills",
      stats: [
        { value: "7", label: "Projects shipped" },
        { value: "92", label: "Skills" },
        { value: "5+", label: "years in crypto" },
      ],
    },
    projects: {
      section_label: "Work",
      section_title: "Projects",
      view_more: "View all projects",
      featured_label: "Featured",
      all_title: "All projects",
      back: "← Back",
      visit_site: "Visit site",
      tech_stack: "Tech stack",
      highlights: "Highlights",
      overview: "Overview",
    },
    skills: {
      section_label: "Expertise",
      section_title: "Skills",
    },
    contact: {
      section_label: "Contact",
      section_title: "Let's work together",
      desc: "Available for freelance missions, DeFi architecture consulting, or Web3 protocol collaborations.",
      github: "GitHub",
      telegram: "Telegram",
    },
    footer: {
      tagline: "7 projects · 92 skills · in crypto since 2020",
      available: "Open for work",
    },
    lang_switch: "FR",
  },
} as const;

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "fr";
  const lang = navigator.language || (navigator as unknown as { userLanguage: string }).userLanguage || "fr";
  return lang.toLowerCase().startsWith("fr") ? "fr" : "en";
}
