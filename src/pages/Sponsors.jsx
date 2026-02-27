import React from "react";
import { motion } from "framer-motion";
import { Gem, Heart, Download } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { SocialLinks } from "../components/Footer";
import { URLS } from "../constants";

// Sponsor data organized by tier
const SPONSOR_TIERS = [
  {
    name: "Ruby",
    color: "ruby",
    icon: Gem,
    description: "Strategic partners supporting our mission",
    sponsors: [
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Empowering the next generation of legal professionals"
      // },
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Advancing legal tech education"
      // },
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Building the future of law"
      // }
    ]
  },
  {
    name: "Sapphire",
    color: "sapphire",
    icon: Gem,
    description: "Valued partners in our journey",
    sponsors: [
      {
        name: "Dundas Lawyers",
        logo: "/dundas-lawyers-logo.png",
        website: "https://www.dundaslawyers.com.au/",
        description: "Supporting legal innovation and technology education"
      }
    ]
  },
  {
    name: "Emerald",
    color: "emerald",
    icon: Gem,
    description: "Our premium partners driving innovation",
    sponsors: [
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Leading the future of legal technology"
      // },
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Innovating at the intersection of law and tech"
      // }
    ]
  }
];

function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32" aria-label="Sponsors section">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-rubik text-white/90">Gratitude & Partnership            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tomorrow leading-tight">
          Thank You to Our Sponsors
        </h1>

        <p className="text-xl md:text-2xl text-white/90 font-montserrat max-w-3xl mx-auto leading-relaxed">
          We are grateful for the generous support of our sponsors who make our mission possible.
          Together, we're shaping the future of law and technology.
        </p>
      </div>
    </section>
  );
}

const TIER_STYLES = {
  emerald: {
    primary: '#10B981',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  ruby: {
    primary: '#F43F5E',
    borderColor: 'rgba(244, 63, 94, 0.3)',
  },
  sapphire: {
    primary: '#3B82F6',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  }
};

function SponsorTierCard({ tier, index }) {
  const styles = TIER_STYLES[tier.color] || TIER_STYLES.sapphire;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="relative rounded-3xl overflow-hidden backdrop-blur-md bg-white/[0.04]"
        style={{ border: `1px solid ${styles.borderColor}` }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: `linear-gradient(to bottom right, ${styles.primary}20, ${styles.primary}10, transparent)` }}
        />

        {/* Glass highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-10">
          {/* Tier header */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.06]"
              style={{ border: `1px solid ${styles.borderColor}` }}
            >
              <tier.icon
                className="h-5 w-5"
                style={{ color: styles.primary }}
              />
              <h2
                className="text-xl md:text-2xl font-bold font-tomorrow"
                style={{ color: styles.primary }}
              >
                {tier.name} Tier
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-center text-white/50 font-montserrat text-sm mb-8 max-w-sm mx-auto">
            {tier.description}
          </p>

          {/* Sponsors area */}
          {tier.sponsors.length > 0 ? (
            <div className="flex flex-wrap justify-center items-center gap-10">
              {tier.sponsors.map((sponsor, sponsorIndex) => (
                <a
                  key={sponsorIndex}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-opacity duration-300 hover:opacity-80"
                  title={`Visit ${sponsor.name}`}
                >
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="max-h-20 md:max-h-28 max-w-[280px] object-contain brightness-0 invert"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] py-6 px-8">
              <p className="text-white/30 font-montserrat italic text-center text-sm">
                Sponsor announcements coming soon
              </p>
            </div>
          )}
        </div>

        {/* Bottom accent */}
        <div
          className="h-px w-full opacity-40"
          style={{ background: `linear-gradient(90deg, transparent 10%, ${styles.primary} 50%, transparent 90%)` }}
        />
      </div>
    </motion.div>
  );
}

function SponsorsSection() {
  return (
    <section className="py-24 relative" aria-label="Sponsors section">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        {SPONSOR_TIERS.map((tier, index) => (
          <SponsorTierCard key={tier.name} tier={tier} index={index} />
        ))}
      </div>
    </section>
  );
}

function BecomeASponsorSection() {
  return (
    <section className="py-24 relative" aria-label="Become a sponsor section">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="liquid-glass-strong rounded-3xl p-16 border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6 font-tomorrow">
            Become a Sponsor
          </h2>
          <p className="text-xl text-white/80 mb-10 font-montserrat max-w-2xl mx-auto leading-relaxed">
            Partner with us to empower the next generation of legal tech innovators.
            Your support helps students bridge the gap between law and technology.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <a
              href={URLS.prospectus}
              download="LITS 2026 Prospectus.pdf"
              className="group relative inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/20 hover:border-primary/50 font-rubik"
            >
              <Download className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Download Prospectus</span>
            </a>
            <a
              href="/contact"
              className="group relative inline-flex items-center bg-gradient-to-r from-primary to-purple text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-2xl hover:shadow-primary/25 font-rubik overflow-hidden"
            >
              <span className="relative z-10">Get in Touch</span>
            </a>
          </div>

          {/* Social Links */}
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}

function Sponsors() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <SponsorsSection />
        <BecomeASponsorSection />
      </main>
    </div>
  );
}

export default Sponsors;
