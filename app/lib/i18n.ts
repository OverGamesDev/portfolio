export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      projects: "Protocoles",
      skills: "Compétences",
      contact: "Contact",
      open: "Dispo",
    },
    genesis: {
      block: "BLOC #00 · GENESIS",
      role: "Développeur Blockchain & DeFi",
      firstname: "JOFFREY",
      tagline:
        "Je conçois des blockchains et des protocoles on-chain : une Layer 2 Ethereum, des DEX perpétuels, du lending CDP, des marketplaces NFT, ainsi que les outils IA qui accélèrent leur développement.",
      ledger: [
        { key: "PROTOCOLES_DÉPLOYÉS", value: "08" },
        { key: "COMPÉTENCES_CONFIRMÉES", value: "112" },
        { key: "DANS_LA_CRYPTO_DEPUIS", value: "2020" },
        { key: "CHAÎNES", value: "ALEPHIUM · MEGAETH · PICKLE" },
      ],
      scroll: "Scroller pour produire le bloc suivant",
    },
    protocols: {
      block: "BLOC #01 · PROTOCOLS",
      study: "Étudier le protocole",
      all: "Explorer les 8 protocoles",
      live: "EN LIGNE",
      closed: "ARRÊTÉ",
      chain_label: "CHAÎNE",
      type_label: "TYPE",
    },
    mempool: {
      block: "BLOC #02 · MEMPOOL",
      title: "transactions en attente",
      desc: "Chaque compétence est une transaction confirmée par un protocole en production.",
      confirmed: "TX CONFIRMÉES",
      all: "Explorer le mempool complet",
    },
    finality: {
      block: "BLOC #03 · FINALITY",
      title: "Travaillons ensemble",
      desc: "Disponible pour des missions freelance, du conseil en architecture DeFi, ou des collaborations sur des protocoles Web3.",
      cta: "Démarrer une mission",
      github: "GitHub",
      telegram: "Telegram",
      finalized: "CHAÎNE FINALISÉE · 8 PROTOCOLES · 112 TX · DEPUIS 2020",
      rights: "© 2026 Joffrey · tous les blocs sont immuables.",
    },
    projects: {
      section_label: "Réalisations",
      section_title: "Projets",
      view_more: "Voir tous les projets",
      featured_label: "À la une",
      all_title: "Tous les protocoles",
      all_sub: "8 blocs produits sur Alephium, MegaETH, Pickle Chain et le web.",
      back: "Retour à la chaîne",
      visit_site: "Visiter le site",
      tech_stack: "Stack technique",
      highlights: "Points clés",
      overview: "Vue d'ensemble",
      status: "Statut",
      other: "Autres blocs",
    },
    skills: {
      section_label: "Expertise",
      section_title: "Le mempool complet",
      section_sub: "92 transactions confirmées, groupées par domaine.",
    },
    lang_switch: "EN",
  },
  en: {
    nav: {
      projects: "Protocols",
      skills: "Skills",
      contact: "Contact",
      open: "Open",
    },
    genesis: {
      block: "BLOCK #00 · GENESIS",
      role: "Blockchain & DeFi Developer",
      firstname: "JOFFREY",
      tagline:
        "I design blockchains and on-chain protocols: an Ethereum Layer 2, perpetual DEXs, CDP lending, NFT marketplaces, plus the AI tools that speed up building them.",
      ledger: [
        { key: "PROTOCOLS_DEPLOYED", value: "08" },
        { key: "SKILLS_CONFIRMED", value: "112" },
        { key: "IN_CRYPTO_SINCE", value: "2020" },
        { key: "CHAINS", value: "ALEPHIUM · MEGAETH · PICKLE" },
      ],
      scroll: "Scroll to produce the next block",
    },
    protocols: {
      block: "BLOCK #01 · PROTOCOLS",
      study: "Study the protocol",
      all: "Explore all 8 protocols",
      live: "LIVE",
      closed: "SUNSET",
      chain_label: "CHAIN",
      type_label: "TYPE",
    },
    mempool: {
      block: "BLOCK #02 · MEMPOOL",
      title: "pending transactions",
      desc: "Every skill is a transaction confirmed by a protocol running in production.",
      confirmed: "TX CONFIRMED",
      all: "Explore the full mempool",
    },
    finality: {
      block: "BLOCK #03 · FINALITY",
      title: "Let's work together",
      desc: "Available for freelance missions, DeFi architecture consulting, or Web3 protocol collaborations.",
      cta: "Start a mission",
      github: "GitHub",
      telegram: "Telegram",
      finalized: "CHAIN FINALIZED · 8 PROTOCOLS · 112 TX · SINCE 2020",
      rights: "© 2026 Joffrey · all blocks are immutable.",
    },
    projects: {
      section_label: "Work",
      section_title: "Projects",
      view_more: "View all projects",
      featured_label: "Featured",
      all_title: "All protocols",
      all_sub: "8 blocks produced on Alephium, MegaETH, Pickle Chain and the web.",
      back: "Back to the chain",
      visit_site: "Visit site",
      tech_stack: "Tech stack",
      highlights: "Highlights",
      overview: "Overview",
      status: "Status",
      other: "Other blocks",
    },
    skills: {
      section_label: "Expertise",
      section_title: "The full mempool",
      section_sub: "92 confirmed transactions, grouped by domain.",
    },
    lang_switch: "FR",
  },
} as const;

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "fr";
  const lang = navigator.language || (navigator as unknown as { userLanguage: string }).userLanguage || "fr";
  return lang.toLowerCase().startsWith("fr") ? "fr" : "en";
}
