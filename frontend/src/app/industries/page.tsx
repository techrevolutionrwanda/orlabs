import type { Metadata } from "next";
import { CtaBand } from "@/src/components/site/CtaBand";
import { PageHero } from "@/src/components/site/PageHero";
import { SectionHead } from "@/src/components/site/SectionHead";
import { industries } from "@/src/content/industries";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Industries — Software for finance, health, agriculture and more | OrLabs",
  description:
    "One engineering team, many industries: finance and microfinance, health, agriculture, construction, logistics, education, hospitality, government and NGOs, and retail and e-commerce.",
};

export default function IndustriesPage() {
  return (
    <main className="flex-1" id="main">
      <RevealController />
      <PageHero
        eyebrow="Industries"
        title="One engineering team. Many industries."
        lead="That is the “Industries” in our name — the same craft applied wherever technology can bring clarity. We learn the way your sector works, then build for it."
      />

      <section className="section">
        <div className="container-page">
          <SectionHead
            eyebrow="Challenge → how we help"
            title="Every sector meets a different problem."
          />

          <ul
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="grid list-none grid-cols-1 gap-5 p-0 lg:grid-cols-2"
          >
            {industries.map((industry) => (
              <li
                key={industry.slug}
                className="grid content-start gap-3 rounded-card border border-border bg-surface p-7"
              >
                <h3 className="text-h3 font-semibold">{industry.name}</h3>
                <p className="text-[0.9375rem] text-ink-muted">
                  <span className="font-semibold text-ink">The challenge. </span>
                  {industry.challenge}
                </p>
                <p className="text-[0.9375rem] text-ink-muted">
                  <span className="font-semibold text-ink">How OrLabs helps. </span>
                  {industry.help}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Your sector is not on this list?"
        body="Tell us what your industry needs. We will reply within one working day with next steps."
      />
    </main>
  );
}
