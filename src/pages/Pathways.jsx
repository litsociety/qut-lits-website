import React from "react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { Tiltable, TiltableLink } from "../components/Tiltable";
import { PATHWAYS, PATHWAY_ORDER, MOCK_NOTE } from "../data/pathways";

function HeroSection() {
  return (
    <section className="relative pt-32 pb-12" aria-label="Pathways hero">
      <div className="max-w-3xl mx-auto px-6 text-center animate-rise-in">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tomorrow leading-tight">
          Build Your Career in Law and Technology
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-montserrat leading-relaxed">
          Two pathways, Legal Tech and Tech Law, mapped from first year to graduate program.
        </p>
        <p className="text-xs text-white/40 font-montserrat mt-6">{MOCK_NOTE}</p>
      </div>
    </section>
  );
}

function PathwayCard({ pathway, index }) {
  return (
    <div className="animate-rise-in h-full" style={{ animationDelay: `${index * 100}ms` }}>
      <Tiltable className="block h-full" tiltOptions={{ maxTilt: 5, scale: 1.01 }}>
        <div className="group h-full flex flex-col bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/25 hover:-translate-y-1 transition-all duration-300 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-white mb-3 font-tomorrow leading-tight">{pathway.title}</h2>
          <p className="text-white/70 font-montserrat text-base leading-relaxed mb-8 flex-1">{pathway.tagline}</p>
          <TiltableLink
            to={`/pathways/${pathway.slug}`}
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-primary to-purple text-white px-5 py-3.5 rounded-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 font-rubik"
            tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            aria-label={`View the ${pathway.title} timeline`}
          >
            View Timeline
          </TiltableLink>
        </div>
      </Tiltable>
    </div>
  );
}

function PathwaysSection() {
  return (
    <section className="pb-24 relative" aria-label="Career pathways">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {PATHWAY_ORDER.map((slug, index) => (
            <PathwayCard key={slug} pathway={PATHWAYS[slug]} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pathways() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <PathwaysSection />
      </main>
    </div>
  );
}

export default Pathways;
