import { Clients } from "@/src/components/landing/Clients";
import { Cta } from "@/src/components/landing/Cta";
import { Hero } from "@/src/components/landing/Hero";
import { Industries } from "@/src/components/landing/Industries";
import { Process } from "@/src/components/landing/Process";
import { Services } from "@/src/components/landing/Services";
import { WhyOrLabs } from "@/src/components/landing/WhyOrLabs";
import { Work } from "@/src/components/landing/Work";
import { AboutTeam } from "@/src/components/site/AboutTeam";
import { RevealController } from "@/src/components/site/RevealController";

export default function HomePage() {
  return (
    <main className="flex-1" id="main">
      <RevealController />
      <Hero />
      <Clients />
      <Services />
      <Industries />
      <Process />
      <WhyOrLabs />
      <Work />
      <Cta />
      <AboutTeam/>
    </main>
  );
}
