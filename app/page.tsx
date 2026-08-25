import Navbar from "@/components/ui/Navbar";
import BlockRail from "@/components/chain/BlockRail";
import Genesis from "@/components/sections/Genesis";
import Protocols from "@/components/sections/Protocols";
import Mempool from "@/components/sections/Mempool";
import Finality from "@/components/sections/Finality";

export default function Home() {
  return (
    <main>
      <Navbar />
      <BlockRail />
      <Genesis />
      <Protocols />
      <Mempool />
      <Finality />
    </main>
  );
}
