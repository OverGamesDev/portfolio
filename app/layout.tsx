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
    "Blockchain & DeFi developer. NFT Marketplace, Perpetuals, Lending protocols, AI smart contract generation. 7 protocols shipped on Alephium & MegaETH.",
  keywords: ["blockchain", "DeFi", "Solidity", "Ralph", "Alephium", "MegaETH", "web3", "Joffrey"],
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
