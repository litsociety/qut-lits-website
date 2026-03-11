import React from "react";
import { ArrowRight, Calendar, Clock, MapPin, Tag } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { Tiltable, TiltableAnchor } from "../components/Tiltable";

const EVENTS = [
  {
    id: 1,
    title: "Technology in Legal Investigations",
    date: "9 March 2026",
    time: "5:00 PM – 6:00 PM",
    location: "D-106, QUT Gardens Point",
    description:
      "Discover how cutting-edge technology is reshaping legal investigations. Join us for an immersive session exploring digital forensics, AI-assisted evidence analysis, and the legal frameworks governing modern investigative tools.",
    badge: "Free",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
    link: "https://campus.hellorubric.com/?eid=53722",
    status: "upcoming",
  },
  {
    id: 2,
    title: "LITS x GRC",
    date: "Week 7, 2026",
    time: "TBA",
    location: "QUT Gardens Point",
    description:
      "A special collaboration between LITS and the Governance, Risk & Compliance Society. Explore the intersection of legal compliance, technology risk, and governance in today's digital landscape.",
    badge: "Upcoming",
    badgeColor: "bg-white/10 text-white/80 border-white/20",
    link: null,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Law & Tech Networking Night",
    date: "TBA",
    time: "TBA",
    location: "TBA",
    description:
      "Build your professional network with legal tech startups, law firms, and technology companies. Discover opportunities in tech law, regulatory compliance, and innovation policy.",
    badge: "Book Now",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
    link: "https://campus.hellorubric.com/?eid=53724",
    status: "upcoming",
  },
];

function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden" aria-label="Events section">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tomorrow">
          Events
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto font-montserrat leading-relaxed">
          Stay up to date with QUT LITS events — workshops, networking nights, and more.
        </p>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section className="py-16 relative" aria-label="Upcoming events">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        {EVENTS.map((event) => (
          <Tiltable key={event.id} tiltOptions={{ maxTilt: 4, scale: 1.01 }}>
            <div className="group bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:bg-white/10">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Date block */}
                <div className="shrink-0 flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-w-[100px] text-center">
                  <Calendar className="h-5 w-5 text-primary mb-1" />
                  <span className="text-white font-bold font-rubik text-sm leading-tight">{event.date}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-white font-tomorrow">{event.title}</h2>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border font-rubik ${event.badgeColor}`}>
                      {event.badge}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-white/60 text-sm font-montserrat mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {event.location}
                    </span>
                  </div>

                  <p className="text-white/70 font-montserrat leading-relaxed mb-5">{event.description}</p>

                  {event.link && (
                    <TiltableAnchor
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-white/20 to-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:from-white/30 hover:to-white/20 border border-white/30 transition-all duration-300 font-rubik text-sm"
                      tiltOptions={{ maxTilt: 5, scale: 1.03 }}
                    >
                      {event.badge === "Book Now" ? "Book Now" : "Register"} <ArrowRight className="h-4 w-4" />
                    </TiltableAnchor>
                  )}
                </div>
              </div>
            </div>
          </Tiltable>
        ))}
      </div>
    </section>
  );
}

function Events() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <EventsSection />
      </main>
    </div>
  );
}

export default Events;
