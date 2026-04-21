import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LangProvider from "@/components/ui/LangProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joffrey | Blockchain & DeFi Developer",
  description:
    "Blockchain & DeFi developer. NFT Marketplace, Perpetuals, Lending protocols, AI smart contract generation. 7 projects shipped on Alephium & MegaETH.",
  keywords: ["blockchain", "DeFi", "Solidity", "Ralph", "Alephium", "MegaETH", "web3", "Joffrey"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
