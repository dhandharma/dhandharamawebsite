import { About } from "@/components/About";
import { Areas } from "@/components/Areas";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { StructuredData } from "@/components/StructuredData";
import { TrustStrip } from "@/components/TrustStrip";

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <TrustStrip />
        <About />
        <Process />
        <Services />
        <Areas />
        <CtaBand
          title="Ready to talk about your loan?"
          text="Send us an enquiry or call the branch. An advisor will help you with gold valuation and your loan options."
        />
      </main>
      <StructuredData />
    </>
  );
}
