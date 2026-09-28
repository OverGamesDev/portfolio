import type { Metadata } from "next";
import { Unbounded, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import LangProvider from "@/components/ui/LangProvider";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joffrey | Blockchain & DeFi Developer",
  description:
    "Blockchain & DeFi developer. Ethereum Layer 2, NFT Marketplace, Perpetuals, Lending protocols, AI smart contract generation. 8 protocols shipped on Alephium, MegaETH & Pickle Chain.",
  keywords: ["blockchain", "DeFi", "Solidity", "Ralph", "Alephium", "MegaETH", "Pickle Chain", "Layer 2", "Rust", "web3", "Joffrey"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${unbounded.variable} ${instrument.variable} ${plexMono.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
