import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Instagram, Facebook, Linkedin, Mail, Download, FileText, ExternalLink, BookOpen, ChevronUp } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { useTilt } from "../hooks/useTilt";
import { Tiltable, TiltableAnchor } from "../components/Tiltable";

// Sponsor data organized by tier
const SPONSOR_TIERS = [
  {
    name: "Ruby",
    color: "#E8475F",
    sponsors: [
      {
        name: "Ashurst",
        logo: "/ashurst-logo.png",
        url: "https://www.ashurst.com/",
        logoHeight: "40px",
        logoMaxWidth: "200px",
      },
      {
        name: "Verlata Consulting",
        logo: "/verlata-consulting-logo.png",
        url: "https://www.verlata.com/",
      }
    ]
  },
  {
    name: "Sapphire",
    color: "#3B82F6",
    sponsors: [
      {
        name: "Dundas Lawyers",
        logo: "/dundas-lawyers-logo.png",
        url: "https://www.dundaslawyers.com.au/",
        whiteFilter: true,
      },
      {
        name: "Clayton Utz",
        logo: "/clayton-utz-logo.png",
        url: "https://www.claytonutz.com/",
        whiteFilter: true,
      }
    ]
  },
  {
    name: "Emerald",
    color: "#10B981",
    sponsors: [
      {
        name: "PwC",
        logo: "/2218a457-c3df-4a2b-b98e-c45b60e56fb7.png",
        url: "https://www.pwc.com.au/",
      }
    ]
  }
];

function HeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-32 pb-10" aria-label="Sponsors section">
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

function SponsorsSection() {
  return (
    <section className="pt-0 pb-16 relative" aria-label="Sponsors section">
      <div className="max-w-5xl mx-auto px-6">
        {SPONSOR_TIERS.map((tier) => (
          <div key={tier.name} className="mb-16 last:mb-0">
            {/* Tier Header */}
            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl font-bold font-tomorrow"
                style={{ color: tier.color }}
              >
                {tier.name} Tier
              </h2>
            </div>

            {/* Sponsors */}
            {tier.sponsors.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-8">
                {tier.sponsors.map((sponsor) =>
                  sponsor.url ? (
                    <TiltableAnchor
                      key={sponsor.name}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={sponsor.name}
                      tiltOptions={{ maxTilt: 8, scale: 1.04 }}
                    >
                      <div className="flex items-center justify-center px-10 py-8">
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          className={`w-auto object-contain${sponsor.whiteFilter ? " filter brightness-0 invert" : ""}`}
                          style={sponsor.logoHeight ? { height: sponsor.logoHeight, maxWidth: sponsor.logoMaxWidth } : { maxHeight: "80px", maxWidth: "240px" }}
                          loading="lazy"
                        />
                      </div>
                    </TiltableAnchor>
                  ) : (
                    <Tiltable key={sponsor.name} tiltOptions={{ maxTilt: 8, scale: 1.04 }}>
                      <div className="flex items-center justify-center px-10 py-8">
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          className={`w-auto object-contain${sponsor.whiteFilter ? " filter brightness-0 invert" : ""}`}
                          style={sponsor.logoHeight ? { height: sponsor.logoHeight, maxWidth: sponsor.logoMaxWidth } : { maxHeight: "80px", maxWidth: "240px" }}
                          loading="lazy"
                        />
                      </div>
                    </Tiltable>
                  )
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-white/40 font-montserrat italic text-base">
                  Sponsor announcements coming soon
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProspectusViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const pageRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    setContainerWidth(containerRef.current.offsetWidth);
    return () => observer.disconnect();
  }, []);

  // Track which page is visible as user scrolls
  useEffect(() => {
    if (!scrollRef.current || !numPages) return;
    const el = scrollRef.current;
    const onScroll = () => {
      const scrollTop = el.scrollTop;
      const pageHeight = el.scrollHeight / numPages;
      const page = Math.min(numPages, Math.floor(scrollTop / pageHeight) + 1);
      setCurrentPage(page);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [numPages]);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  const pageWidth = Math.min(containerWidth - 32, 900);

  return (
    <div ref={containerRef} className="w-full relative">
      {/* Page indicator */}
      {numPages && (
        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white/70 text-xs font-montserrat px-3 py-1.5 rounded-full border border-white/10">
          {currentPage} / {numPages}
        </div>
      )}

      {/* Scrollable PDF container — custom scrollbar */}
      <div
        ref={scrollRef}
        className="pdf-scroll w-full overflow-y-scroll"
        style={{ maxHeight: "80vh" }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center py-16 text-white/50 font-montserrat text-sm">
              <FileText className="h-10 w-10 mb-3 opacity-40" />
              <p>Unable to load PDF.</p>
            </div>
          }
        >
          {numPages && Array.from({ length: numPages }, (_, i) => (
            <div key={i} ref={el => pageRefs.current[i] = el} className="flex justify-center mb-2 last:mb-0">
              <Page
                pageNumber={i + 1}
                width={pageWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}

function ProspectusSection() {
  const [open, setOpen] = useState(false);
  const pdfUrl = "/LITS 2026 Prospectus.pdf";

  return (
    <section className="pt-0 pb-16 relative" aria-label="Prospectus section">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-4">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-rubik text-white/90">2026 Sponsorship Prospectus</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-tomorrow mb-8">
            Partnership Opportunities
          </h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Tiltable tiltOptions={{ maxTilt: 4, scale: 1.02 }}>
              <button
                onClick={() => setOpen(o => !o)}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-purple text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-xl font-rubik"
              >
                {open ? <ChevronUp className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                <span>{open ? "Close Prospectus" : "View Prospectus"}</span>
              </button>
            </Tiltable>
            <TiltableAnchor
              href={pdfUrl}
              download="LITS 2026 Prospectus.pdf"
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-primary/50 font-rubik"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              <Download className="h-5 w-5" />
              <span>Download Prospectus</span>
            </TiltableAnchor>
          </div>
        </div>

        {/* PDF Viewer — collapses/expands */}
        {open && (
          <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-900 p-4 mt-2">
            <ProspectusViewer pdfUrl={pdfUrl} />
          </div>
        )}
      </div>
    </section>
  );
}

function BecomeASponsorSection() {
  return (
    <section className="py-20 relative" aria-label="Become a sponsor section">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Tiltable tiltOptions={{ maxTilt: 3, scale: 1.01 }}>
          <div className="liquid-glass-strong rounded-3xl p-8 sm:p-16 border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6 font-tomorrow">
            Become a Sponsor
          </h2>
          <p className="text-xl text-white/80 mb-10 font-montserrat max-w-2xl mx-auto leading-relaxed">
            Partner with us to empower the next generation of legal tech innovators. 
            Your support helps students bridge the gap between law and technology.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <TiltableAnchor
              href="/contact"
              className="group relative inline-flex items-center bg-gradient-to-r from-primary to-purple text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-2xl hover:shadow-primary/25 font-rubik overflow-hidden"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              <span className="relative z-10">Get in Touch</span>
            </TiltableAnchor>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 pt-6 border-t border-white/10">
            <TiltableAnchor
              href="https://www.facebook.com/lawinnovationandtechsociety/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
              aria-label="Facebook"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Facebook className="h-5 w-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
            </TiltableAnchor>
            <TiltableAnchor
              href="https://www.instagram.com/qutlitsociety/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
              aria-label="Instagram"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Instagram className="h-5 w-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
            </TiltableAnchor>
            <TiltableAnchor
              href="https://www.linkedin.com/company/law-innovation-and-technology-society/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
              aria-label="LinkedIn"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Linkedin className="h-5 w-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
            </TiltableAnchor>
            <TiltableAnchor
              href="mailto:litsociety@qut.edu.au"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
              aria-label="Email"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Mail className="h-5 w-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
            </TiltableAnchor>
          </div>
          </div>
        </Tiltable>
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
        <ProspectusSection />
        <BecomeASponsorSection />
      </main>
    </div>
  );
}

export default Sponsors;

