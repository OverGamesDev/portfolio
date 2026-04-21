export type SkillLevel = "expert" | "advanced" | "intermediate";

export type Skill = {
  name: string;
  level: SkillLevel;
  note?: { fr: string; en: string };
};

export type SkillGroup = {
  id: string;
  title: { fr: string; en: string };
  color: string;
  preview: number; // how many to show on homepage
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "smart-contracts",
    title: { fr: "Smart Contracts", en: "Smart Contracts" },
    color: "#5b7cf6",
    preview: 4,
    skills: [
      { name: "Solidity", level: "expert", note: { fr: "EVM : Ethereum, Arbitrum, Base, MegaETH", en: "EVM: Ethereum, Arbitrum, Base, MegaETH" } },
      { name: "Ralph", level: "expert", note: { fr: "Langage natif Alephium", en: "Alephium native language" } },
      { name: "Upgradeable Proxies", level: "advanced", note: { fr: "UUPS, Transparent, Beacon", en: "UUPS, Transparent, Beacon" } },
      { name: "Hardhat", level: "expert" },
      { name: "Foundry / Forge", level: "advanced" },
      { name: "Fuzzing & Invariant Testing", level: "advanced" },
      { name: "Security Auditing", level: "intermediate", note: { fr: "Reentrancy, flash loan attacks, oracle manip.", en: "Reentrancy, flash loan attacks, oracle manip." } },
      { name: "Gas Optimization", level: "advanced" },
      { name: "ERC-20 / ERC-721 / ERC-1155", level: "expert" },
      { name: "EIP-2612 Permit", level: "advanced" },
      { name: "Multi-sig & Timelocks", level: "advanced" },
      { name: "ABI Encoding / Decoding", level: "advanced" },
    ],
  },
  {
    id: "defi",
    title: { fr: "Protocoles DeFi", en: "DeFi Protocols" },
    color: "#00e5a0",
    preview: 4,
    skills: [
      { name: "AMM (Uniswap v2/v3 style)", level: "expert" },
      { name: "TWAMM", level: "expert", note: { fr: "Time-Weighted Average Market Maker", en: "Time-Weighted Average Market Maker" } },
      { name: "Perpetuals (GMX v2 style)", level: "expert", note: { fr: "GLP pool, delta-neutral, funding rates", en: "GLP pool, delta-neutral, funding rates" } },
      { name: "Lending / CDP", level: "expert", note: { fr: "Vaults, liquidations, oracle, peg", en: "Vaults, liquidations, oracle, peg" } },
      { name: "Stablecoins synthétiques", level: "advanced" },
      { name: "ve(3,3) / veDEX", level: "expert", note: { fr: "Gauge voting, bribes, emissions", en: "Gauge voting, bribes, emissions" } },
      { name: "NFT Marketplace", level: "expert", note: { fr: "Listing, offers, royalties on-chain", en: "Listing, offers, royalties on-chain" } },
      { name: "P2P Lending", level: "advanced" },
      { name: "Multi-hop Router", level: "expert" },
      { name: "Price Oracles", level: "advanced", note: { fr: "Chainlink, TWAP, manipulation résistance", en: "Chainlink, TWAP, manipulation resistance" } },
      { name: "Flash Loans", level: "advanced" },
      { name: "Yield Farming / Liquidity Mining", level: "advanced" },
      { name: "Cross-chain Bridges", level: "intermediate" },
    ],
  },
  {
    id: "ai",
    title: { fr: "IA & Machine Learning", en: "AI & Machine Learning" },
    color: "#a78bfa",
    preview: 3,
    skills: [
      { name: "RAG (Retrieval-Augmented Generation)", level: "expert", note: { fr: "Architecture complète, chunking, reranking", en: "Full architecture, chunking, reranking" } },
      { name: "LLM Integration", level: "expert", note: { fr: "OpenAI, Claude, Mistral, Groq", en: "OpenAI, Claude, Mistral, Groq" } },
      { name: "Vector Databases", level: "advanced", note: { fr: "Pinecone, Qdrant, pgvector", en: "Pinecone, Qdrant, pgvector" } },
      { name: "LangChain / LlamaIndex", level: "advanced" },
      { name: "Prompt Engineering", level: "expert" },
      { name: "Text Embeddings", level: "advanced" },
      { name: "Semantic Search", level: "advanced" },
      { name: "Fine-tuning (LoRA)", level: "intermediate" },
      { name: "AI Agents & Tool Calling", level: "advanced" },
      { name: "Streaming Responses", level: "advanced" },
    ],
  },
  {
    id: "frontend",
    title: { fr: "Frontend & Web", en: "Frontend & Web" },
    color: "#5b7cf6",
    preview: 4,
    skills: [
      { name: "TypeScript", level: "expert" },
      { name: "React", level: "expert" },
      { name: "Next.js (App Router)", level: "expert" },
      { name: "Tailwind CSS", level: "expert" },
      { name: "Framer Motion", level: "advanced" },
      { name: "Three.js / R3F", level: "advanced" },
      { name: "Ethers.js v6", level: "expert" },
      { name: "Viem / Wagmi", level: "expert" },
      { name: "WalletConnect / RainbowKit", level: "expert" },
      { name: "TanStack Query", level: "advanced" },
      { name: "Zustand / Jotai", level: "advanced" },
      { name: "WebSockets", level: "advanced" },
      { name: "GraphQL / The Graph", level: "advanced" },
      { name: "REST APIs", level: "expert" },
      { name: "PWA", level: "intermediate" },
    ],
  },
  {
    id: "backend",
    title: { fr: "Backend & APIs", en: "Backend & APIs" },
    color: "#f59e0b",
    preview: 3,
    skills: [
      { name: "Node.js", level: "expert" },
      { name: "Bun", level: "advanced" },
      { name: "Hono / Express / Fastify", level: "advanced" },
      { name: "tRPC", level: "advanced" },
      { name: "PostgreSQL", level: "advanced" },
      { name: "MongoDB", level: "advanced" },
      { name: "Redis", level: "advanced" },
      { name: "Prisma / Drizzle ORM", level: "advanced" },
      { name: "JWT / OAuth2", level: "advanced" },
      { name: "On-chain Indexers", level: "expert", note: { fr: "Squid SDK, custom indexers", en: "Squid SDK, custom indexers" } },
      { name: "Event Listeners / Keepers", level: "expert" },
      { name: "WebSocket Servers", level: "advanced" },
    ],
  },
  {
    id: "infra",
    title: { fr: "Infrastructure & DevOps", en: "Infrastructure & DevOps" },
    color: "#6b7a99",
    preview: 3,
    skills: [
      { name: "Docker / Docker Compose", level: "advanced" },
      { name: "GitHub Actions (CI/CD)", level: "advanced" },
      { name: "Cloudflare Workers", level: "advanced" },
      { name: "Cloudflare Pages", level: "advanced" },
      { name: "Vercel", level: "expert" },
      { name: "Linux / VPS", level: "advanced" },
      { name: "Nginx", level: "advanced" },
      { name: "Monorepos (Turborepo)", level: "intermediate" },
      { name: "Secrets & env management", level: "advanced" },
    ],
  },
  {
    id: "blockchains",
    title: { fr: "Blockchains & Écosystèmes", en: "Blockchains & Ecosystems" },
    color: "#00e5a0",
    preview: 3,
    skills: [
      { name: "Alephium", level: "expert", note: { fr: "UTXO + smart contracts Ralph, 3 projets", en: "UTXO + Ralph smart contracts, 3 projects" } },
      { name: "MegaETH", level: "expert", note: { fr: "EVM haute perf, 2 projets", en: "High-perf EVM, 2 projects" } },
      { name: "Ethereum", level: "advanced" },
      { name: "Arbitrum / Base / Optimism", level: "advanced" },
      { name: "EVM architecture", level: "expert" },
      { name: "UTXO model (Alephium)", level: "advanced" },
      { name: "Mempool & gas dynamics", level: "advanced" },
      { name: "RPC nodes & providers", level: "advanced" },
    ],
  },
  {
    id: "tools",
    title: { fr: "Outils & Workflow", en: "Tools & Workflow" },
    color: "#6b7a99",
    preview: 3,
    skills: [
      { name: "Git / GitHub", level: "expert" },
      { name: "Cursor / VS Code", level: "expert" },
      { name: "Postman / Insomnia", level: "advanced" },
      { name: "Tenderly", level: "advanced" },
      { name: "Dune Analytics", level: "intermediate" },
      { name: "Figma (UI review)", level: "intermediate" },
      { name: "Linear / Notion", level: "advanced" },
    ],
  },
];

export const levelLabel = {
  expert: { fr: "Expert", en: "Expert", color: "#00e5a0" },
  advanced: { fr: "Avancé", en: "Advanced", color: "#5b7cf6" },
  intermediate: { fr: "Intermédiaire", en: "Intermediate", color: "#6b7a99" },
} as const;
