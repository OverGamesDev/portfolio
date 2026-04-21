export type Project = {
  id: string;
  name: string;
  type: { fr: string; en: string };
  chain: string;
  chainColor: string;
  logo: string;
  banner?: string;
  site?: string;
  closed?: boolean;
  accent: string;
  featured: boolean;
  tags: string[];
  tagColors: Record<string, string>;
  description: { fr: string; en: string };
  overview: { fr: string; en: string };
  highlights: { fr: string[]; en: string[] };
  techStack: string[];
};

export const projects: Project[] = [
  {
    id: "alphaga",
    name: "Alphaga",
    type: { fr: "NFT Marketplace", en: "NFT Marketplace" },
    chain: "Alephium",
    chainColor: "#5b7cf6",
    logo: "/logos/alphaga.png",
    banner: "/logos/alphaga_banner.png",
    site: "https://alphaga.app",
    closed: true,
    accent: "#5b7cf6",
    featured: true,
    tags: ["Ralph", "NFT", "Smart Contracts", "TypeScript"],
    tagColors: { Ralph: "accent", NFT: "neutral", "Smart Contracts": "neutral", TypeScript: "neutral" },
    description: {
      fr: "Marketplace NFT complète sur Alephium. Listing, achat, offres, collections et royalties on-chain. Premiers smart contracts écrits en Ralph, langage natif d'Alephium.",
      en: "Full-featured NFT marketplace on Alephium. Listing, buying, offers, collections and on-chain royalties. First smart contracts written in Ralph, Alephium's native language.",
    },
    overview: {
      fr: "Alphaga est la première marketplace NFT de l'écosystème Alephium. Développée entièrement en Ralph (le langage smart contract natif d'Alephium), elle permet aux créateurs de lancer des collections, de gérer des royalties on-chain, et aux collectionneurs de trader des NFTs en toute sécurité. L'interface est construite en TypeScript/React et communique directement avec la blockchain via le SDK Alephium.",
      en: "Alphaga is the first NFT marketplace in the Alephium ecosystem. Built entirely in Ralph (Alephium's native smart contract language), it allows creators to launch collections, manage on-chain royalties, and collectors to trade NFTs securely. The interface is built with TypeScript/React and communicates directly with the blockchain via the Alephium SDK.",
    },
    highlights: {
      fr: [
        "Premier marketplace NFT sur Alephium",
        "Smart contracts 100% en Ralph",
        "Système de royalties automatique on-chain",
        "Support des offres et contre-offres",
        "Interface de gestion des collections",
        "Tableau de bord statistiques en temps réel",
      ],
      en: [
        "First NFT marketplace on Alephium",
        "Smart contracts 100% in Ralph",
        "Automatic on-chain royalties system",
        "Offer and counter-offer support",
        "Collection management interface",
        "Real-time stats dashboard",
      ],
    },
    techStack: ["Ralph", "TypeScript", "React", "Alephium SDK", "Node.js", "MongoDB"],
  },
  {
    id: "ralphbuilder",
    name: "RalphBuilder",
    type: { fr: "Outil IA / Smart Contracts", en: "AI Smart Contract Tool" },
    chain: "Alephium",
    chainColor: "#5b7cf6",
    logo: "/logos/ralphbuilder.png",
    banner: "/logos/ralphbuilder_banner.png",
    site: "https://app.ralphbuilder.org",
    accent: "#00e5a0",
    featured: true,
    tags: ["RAG", "AI / LLM", "Ralph", "Vector DB"],
    tagColors: { RAG: "green", "AI / LLM": "green", Ralph: "accent", "Vector DB": "neutral" },
    description: {
      fr: "Générateur de smart contracts assisté par IA avec système RAG. Crée des contrats Ralph à partir de descriptions en langage naturel, avec base vectorielle enrichie.",
      en: "AI-powered smart contract generator with RAG system. Creates Ralph contracts from natural language descriptions, using an enriched vector database.",
    },
    overview: {
      fr: "RalphBuilder révolutionne le développement de smart contracts sur Alephium en combinant Claude (Anthropic) avec un système RAG (Retrieval-Augmented Generation). La base vectorielle contient toute la documentation Ralph, des exemples de contrats et des patterns communs. L'utilisateur décrit ce qu'il veut construire en langage naturel, et RalphBuilder génère un contrat Ralph fonctionnel avec explications. Un vrai copilot pour les développeurs Alephium.",
      en: "RalphBuilder revolutionizes smart contract development on Alephium by combining Claude (Anthropic) with a RAG (Retrieval-Augmented Generation) system. The vector database contains all Ralph documentation, contract examples, and common patterns. The user describes what they want to build in natural language, and RalphBuilder generates a functional Ralph contract with explanations. A true copilot for Alephium developers.",
    },
    highlights: {
      fr: [
        "Génération de smart contracts en langage naturel",
        "Base vectorielle avec toute la doc Ralph",
        "Système RAG pour un contexte précis",
        "Explications ligne par ligne du code généré",
        "Détection des erreurs de syntaxe Ralph",
        "Suggestions d'optimisation de gas",
      ],
      en: [
        "Smart contract generation in natural language",
        "Vector database with all Ralph documentation",
        "RAG system for precise context",
        "Line-by-line explanation of generated code",
        "Ralph syntax error detection",
        "Gas optimization suggestions",
      ],
    },
    techStack: ["TypeScript", "Next.js", "Anthropic API", "Pinecone", "LangChain", "Ralph", "Alephium SDK", "MongoDB"],
  },
  {
    id: "alphbanx",
    name: "AlphBanX",
    type: { fr: "Protocole de Lending", en: "Lending Protocol" },
    chain: "Alephium",
    chainColor: "#5b7cf6",
    logo: "/logos/alphbanx.png",
    site: "https://app.alphbanx.com",
    accent: "#00e5a0",
    featured: true,
    tags: ["CDP", "Stablecoin", "Lending", "Oracle"],
    tagColors: { CDP: "accent", Stablecoin: "accent", Lending: "neutral", Oracle: "neutral" },
    description: {
      fr: "Protocole de prêt on-chain avec émission de stablecoin collatéralisé. CDP vaults, liquidations automatisées, oracle de prix et gestion des paramètres de risque.",
      en: "On-chain lending protocol with collateralized stablecoin issuance. CDP vaults, automated liquidations, price oracle and risk parameter management.",
    },
    overview: {
      fr: "AlphBanX est un protocole CDP (Collateralized Debt Position) sur Alephium. Les utilisateurs déposent de l'ALPH comme collatéral pour emprunter un stablecoin synthétique. Le système gère automatiquement les liquidations quand le ratio de collatéralisation passe sous le seuil minimum, grâce à des keepers on-chain. Un oracle de prix décentralisé sécurise le protocole contre les manipulations de marché.",
      en: "AlphBanX is a CDP (Collateralized Debt Position) protocol on Alephium. Users deposit ALPH as collateral to borrow a synthetic stablecoin. The system automatically manages liquidations when the collateralization ratio falls below the minimum threshold, through on-chain keepers. A decentralized price oracle secures the protocol against market manipulation.",
    },
    highlights: {
      fr: [
        "CDP vaults avec ratio de collatéralisation configurable",
        "Stablecoin synthétique adossé à l'ALPH",
        "Liquidations automatisées via keepers",
        "Oracle de prix décentralisé",
        "Frais de stabilité et mécanismes de peg",
        "Tableau de bord de santé du protocole",
      ],
      en: [
        "CDP vaults with configurable collateralization ratio",
        "Synthetic stablecoin backed by ALPH",
        "Automated liquidations via keepers",
        "Decentralized price oracle",
        "Stability fees and peg mechanisms",
        "Protocol health dashboard",
      ],
    },
    techStack: ["Ralph", "TypeScript", "React", "Alephium SDK", "Python (keepers)", "PostgreSQL", "MongoDB"],
  },
  {
    id: "megabanx",
    name: "MegaBanX",
    type: { fr: "DEX Perpétuels", en: "Perpetual DEX" },
    chain: "MegaETH",
    chainColor: "#00e5a0",
    logo: "/logos/megabanx.png",
    site: "https://testnet.megabanx.xyz",
    accent: "#00e5a0",
    featured: false,
    tags: ["Perpetuals", "GMX v2", "Solidity", "Funding Rate"],
    tagColors: { Perpetuals: "green", "GMX v2": "green", Solidity: "accent", "Funding Rate": "neutral" },
    description: {
      fr: "Exchange de contrats perpétuels inspiré de GMX v2. GLP pool, market-making delta-neutral, positions longues/courtes avec levier et frais de financement dynamiques.",
      en: "Perpetual contracts exchange inspired by GMX v2. GLP pool, delta-neutral market-making, long/short positions with leverage and dynamic funding rates.",
    },
    overview: {
      fr: "MegaBanX est un exchange de perpetuals déployé sur MegaETH, inspiré de l'architecture GMX v2. Les liquidités sont fournies dans un pool GLP multi-actifs qui sert de contrepartie à tous les traders. Le système de funding rate dynamique équilibre les positions longues et courtes. Déployé sur MegaETH pour profiter de sa haute fréquence de blocs et faible latence.",
      en: "MegaBanX is a perpetuals exchange deployed on MegaETH, inspired by GMX v2 architecture. Liquidity is provided in a multi-asset GLP pool that acts as a counterparty to all traders. The dynamic funding rate system balances long and short positions. Deployed on MegaETH to leverage its high block frequency and low latency.",
    },
    highlights: {
      fr: [
        "Pool GLP multi-actifs comme market maker",
        "Positions longues/courtes jusqu'à 50x de levier",
        "Funding rate dynamique pour équilibrer les positions",
        "Liquidations en temps réel via bots",
        "Oracle low-latency pour les prix",
        "Interface de trading avancée",
      ],
      en: [
        "Multi-asset GLP pool as market maker",
        "Long/short positions up to 50x leverage",
        "Dynamic funding rate to balance positions",
        "Real-time liquidations via bots",
        "Low-latency oracle for prices",
        "Advanced trading interface",
      ],
    },
    techStack: ["Solidity", "TypeScript", "React", "Ethers.js", "MegaETH", "Chainlink", "The Graph", "PostgreSQL"],
  },
  {
    id: "vordex",
    name: "Vordex",
    type: { fr: "veDEX + TWAMM", en: "veDEX + TWAMM" },
    chain: "MegaETH",
    chainColor: "#00e5a0",
    logo: "/logos/vordex.png",
    banner: "/logos/vordex_banner.png",
    site: "https://vordex.app",
    accent: "#5b7cf6",
    featured: false,
    tags: ["veDEX", "TWAMM", "Multi-hop Router", "Solidity"],
    tagColors: { veDEX: "accent", TWAMM: "green", "Multi-hop Router": "green", Solidity: "neutral" },
    description: {
      fr: "DEX avec gouvernance ve(3,3), TWAMM pour les grands ordres et router multi-hop optimisant les routes de swap. Token natif VEX avec mécanisme de veVEX pour le vote.",
      en: "DEX with ve(3,3) governance, TWAMM for large orders and multi-hop router optimizing swap routes. Native VEX token with veVEX mechanism for voting.",
    },
    overview: {
      fr: "Vordex est un DEX nouvelle génération sur MegaETH combinant trois innovations majeures : un modèle de gouvernance ve(3,3) où les holders de veVEX (VEX locké) dirigent les émissions de récompenses vers les pools de liquidité, un TWAMM (Time-Weighted AMM) qui décompose les grands ordres en petites transactions continues pour minimiser le slippage, et un router multi-hop qui trouve automatiquement la meilleure route de swap à travers tous les pools disponibles. Les pools sont des AMM classiques à liquidité uniforme.",
      en: "Vordex is a next-generation DEX on MegaETH combining three major innovations: a ve(3,3) governance model where veVEX holders (locked VEX) direct reward emissions to liquidity pools, a TWAMM (Time-Weighted AMM) that breaks large orders into small continuous transactions to minimize slippage, and a multi-hop router that automatically finds the best swap route across all available pools. Pools use classic AMMs with uniform liquidity.",
    },
    highlights: {
      fr: [
        "Token VEX avec veVEX pour la gouvernance ve(3,3)",
        "Vote des émissions de récompenses vers les pools",
        "TWAMM pour exécution des grands ordres sans slippage",
        "Router multi-hop avec pathfinding automatique",
        "Pools AMM classiques à liquidité uniforme",
        "Bribes et incitations pour les liquidity providers",
      ],
      en: [
        "VEX token with veVEX for ve(3,3) governance",
        "Emission voting towards liquidity pools",
        "TWAMM for large order execution without slippage",
        "Multi-hop router with automatic pathfinding",
        "Classic AMM pools with uniform liquidity",
        "Bribes and incentives for liquidity providers",
      ],
    },
    techStack: ["Solidity", "TypeScript", "React", "Viem", "MegaETH", "MongoDB", "Redis"],
  },
  {
    id: "alpacafi",
    name: "AlpacaFi",
    type: { fr: "Lending P2P", en: "P2P Lending" },
    chain: "Alephium",
    chainColor: "#5b7cf6",
    logo: "/logos/alpacafi.png",
    accent: "#f59e0b",
    closed: true,
    featured: false,
    tags: ["P2P Lending", "Escrow", "Ralph", "Collateral"],
    tagColors: { "P2P Lending": "neutral", Escrow: "neutral", Ralph: "accent", Collateral: "neutral" },
    description: {
      fr: "Plateforme de prêt pair-à-pair on-chain. Les emprunteurs et prêteurs négocient directement les conditions avec escrow automatisé et gestion des défauts.",
      en: "On-chain peer-to-peer lending platform. Borrowers and lenders directly negotiate terms with automated escrow and default management.",
    },
    overview: {
      fr: "AlpacaFi est une plateforme de lending P2P sur Alephium qui connecte directement emprunteurs et prêteurs. Contrairement aux protocoles de lending classiques avec des pools, chaque prêt est une relation directe entre deux parties. Les conditions (taux, durée, collatéral) sont négociées on-chain via un mécanisme d'offres et contre-offres. Un smart contract escrow gère automatiquement les remboursements et les liquidations en cas de défaut.",
      en: "AlpacaFi is a P2P lending platform on Alephium that directly connects borrowers and lenders. Unlike traditional pool-based lending protocols, each loan is a direct relationship between two parties. Terms (rate, duration, collateral) are negotiated on-chain via an offer/counter-offer mechanism. An escrow smart contract automatically manages repayments and liquidations in case of default.",
    },
    highlights: {
      fr: [
        "Prêts P2P directs sans pool de liquidités",
        "Négociation des conditions on-chain",
        "Escrow automatisé pour les deux parties",
        "Gestion des défauts et saisie de collatéral",
        "Marché des offres de prêt en temps réel",
        "Historique de crédit on-chain",
      ],
      en: [
        "Direct P2P loans without liquidity pools",
        "On-chain term negotiation",
        "Automated escrow for both parties",
        "Default management and collateral seizure",
        "Real-time loan offer market",
        "On-chain credit history",
      ],
    },
    techStack: ["Ralph", "TypeScript", "React", "Alephium SDK", "Node.js"],
  },
  {
    id: "taleops",
    name: "TaleOps",
    type: { fr: "Plateforme Gaming", en: "Gaming Platform" },
    chain: "Web",
    chainColor: "#6b7a99",
    logo: "/logos/taleops.png",
    site: "https://taleops.com",
    accent: "#f59e0b",
    featured: false,
    tags: ["Hytale", "Gaming", "Next.js", "MongoDB"],
    tagColors: { Hytale: "neutral", Gaming: "neutral", "Next.js": "accent", MongoDB: "neutral" },
    description: {
      fr: "Site officiel d'un serveur Hytale. Profil joueur avec stats et achievements, news, système de vote et suivi des quêtes.",
      en: "Official website for a Hytale server. Player profile with stats and achievements, news, voting system and quest tracking.",
    },
    overview: {
      fr: "TaleOps est le site officiel d'un serveur communautaire Hytale. Il permet à chaque joueur de consulter son profil personnel avec ses statistiques, ses quêtes en cours et ses achievements débloqués. Le site affiche également les news du serveur, les informations sur les modes de jeu disponibles et un système de vote communautaire. Toutes les données joueurs sont synchronisées depuis le serveur via l'API du jeu et stockées dans MongoDB.",
      en: "TaleOps is the official website of a Hytale community server. Players can view their personal profile with statistics, active quests and unlocked achievements. The site also displays server news, available game modes and a community voting system. All player data is synced from the game server via the game API and stored in MongoDB.",
    },
    highlights: {
      fr: [
        "Profil joueur avec stats, quêtes et achievements",
        "Affichage des informations du serveur",
        "Système de vote communautaire",
        "News et annonces du serveur",
        "Synchronisation des données via l'API du jeu",
        "Design gaming immersif",
      ],
      en: [
        "Player profile with stats, quests and achievements",
        "Server information display",
        "Community voting system",
        "Server news and announcements",
        "Data sync via game API",
        "Immersive gaming design",
      ],
    },
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export const featuredProjects = projects.filter((p) => p.featured);
