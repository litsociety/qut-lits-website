import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { TiltableLink } from "../components/Tiltable";
import PathwayTimeline from "../components/PathwayTimeline";
import { PATHWAYS, MOCK_NOTE } from "../data/pathways";

function PathwayDetail() {
  const { track } = useParams();
  const pathway = PATHWAYS[track];

  if (!pathway) {
    return <Navigate to="/pathways" replace />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <section className="pt-28 pb-6" aria-label="Pathway overview">
          <div className="max-w-5xl mx-auto px-6 animate-rise-in">
            <TiltableLink
              to="/pathways"
              className="inline-block text-white/60 hover:text-white transition-colors duration-300 font-rubik text-sm mb-8"
              tiltOptions={{ maxTilt: 0, scale: 1 }}
              aria-label="Back to all pathways"
            >
              Back to Pathways
            </TiltableLink>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-tomorrow leading-tight">
              {pathway.title}
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-3xl font-montserrat leading-relaxed mb-4">
              {pathway.blurb}
            </p>
            <p className="text-xs text-white/40 font-montserrat">{MOCK_NOTE}</p>
          </div>
        </section>

        <section className="pb-24" aria-label="Pathway timeline">
          <div className="max-w-5xl mx-auto px-6">
            {/* key resets the active stage when switching pathways */}
            <PathwayTimeline key={pathway.slug} stages={pathway.stages} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default PathwayDetail;
