import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Users, Calendar, Award, BookOpen, Briefcase, Globe, Zap, Network, Scale, Cpu, Database, Brain, Code, Rocket, Search, GitBranch, Layers, Sparkles, Target, TrendingUp, Shield, Eye, Lock, Instagram, Facebook, Linkedin, Mail } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { useTilt } from "../hooks/useTilt";
import { useSwipe } from "../hooks/useSwipe";
import { Tiltable, TiltableButton, TiltableAnchor, TiltableLink } from "../components/Tiltable";

// Hero section data
const HERO_DATA = {
  title: "Welcome to the Law, Innovation and Technology Society",
  subtitle: "Immersing students in the disruptive world of law and technology",
  description: "Established in 2023, our society is dedicated to connecting students with the people, tools and processes that are shaping the future. As the only student society in Australia focused on law and technology, we are fostering bold conversations and empowering the next generation of legal innovators.",
  cta: "Join Our Community",
  ctaLink: "https://campus.hellorubric.com/?tab=memberships&s=6719",
  stats: [
    { number: "500+", label: "Active Members", icon: Users },
    { number: "50+", label: "Industry Partners", icon: Network },
    { number: "100+", label: "Workshops Hosted", icon: Calendar }
  ]
};

// Banner slideshow data
const BANNER_SLIDES = [
  {
    id: 1,
    title: "Welcome to Law, Innovation and Technology Society",
    subtitle: "Where Law Meets Innovation",
    description: "Join the premier society bridging legal education with cutting-edge technology. Learn from industry experts, build real-world projects, and launch your career in legal tech and tech law.",
    image: "/lits-slideshow-5.jpg",
    cta: "Discover More",
    link: "/about",
    techIcons: [Scale, Cpu, Database]
  },
  {
    id: 2,
    title: "AI & Legal Innovation",
    subtitle: "Hands-On Workshop",
    description: "Master AI-powered legal research, contract analysis, and case management tools. Explore the legal implications of AI and how to navigate emerging regulatory frameworks.",
    image: "/lits-slideshow-4.jpg",
    cta: "Register Now",
    link: "/",
    techIcons: [Brain, Code, Rocket]
  },
  {
    id: 3,
    title: "Tech Law & Innovation",
    subtitle: "Connect with Industry Leaders",
    description: "Build your professional network with legal tech startups, law firms, and technology companies. Discover opportunities in tech law, regulatory compliance, and innovation policy.",
    image: "/lits-slideshow-6.jpg",
    cta: "Connect Now",
    link: "/",
    techIcons: [Network, Globe, Briefcase]
  },
  {
    id: 4,
    title: "Legal Technology Excellence",
    subtitle: "Innovation in Practice",
    description: "Explore cutting-edge legal technology solutions and their impact on the legal profession.",
    image: "/lits-slideshow-7.jpg",
    cta: "Learn More",
    link: "/about",
    techIcons: [Code, Database, Brain]
  },
  {
    id: 5,
    title: "Future of Legal Tech",
    subtitle: "Shaping Tomorrow",
    description: "Join us in shaping the future of legal technology and innovation.",
    image: "/lits-slideshow-8.jpg",
    cta: "Join Us",
    link: "/",
    techIcons: [Rocket, Target, TrendingUp]
  },
  {
    id: 6,
    title: "Legal Innovation Community",
    subtitle: "Connect & Grow",
    description: "Be part of a vibrant community of legal tech enthusiasts and innovators.",
    image: "/lits-slideshow-9.jpeg",
    cta: "Get Involved",
    link: "/contact",
    techIcons: [Network, Users, Globe]
  },
  {
    id: 7,
    title: "Law Meets Technology",
    subtitle: "Bridging the Gap",
    description: "Discover how technology is transforming the legal landscape.",
    image: "/lits-slideshow-1.jpeg",
    cta: "Explore",
    link: "/about",
    techIcons: [Scale, Cpu, Database]
  },
  {
    id: 8,
    title: "Tech Law Excellence",
    subtitle: "Industry Leadership",
    description: "Connect with leaders in technology law and legal innovation.",
    image: "/lits-slideshow-3.jpeg",
    cta: "Connect",
    link: "/contact",
    techIcons: [Network, Globe, Briefcase]
  }
];

// Key benefits data
const BENEFITS = [
  {
    icon: Brain,
    title: "Explore the Impact of Technology",
    description: "Engage in bold discussions surrounding the disruptive impact of emerging technology",
    color: "primary",
    features: ["Machine Learning", "Contract Analysis", "Legal Research AI"],
    techElements: [Cpu, Database, Search]
  },
  {
    icon: Target,
    title: "Connect with Industry Leaders",
    description: "Attend premiere events with the the companies that are championing legal innovation",
    color: "primary",
    features: ["Regulatory Compliance", "Tech Policy", "Innovation Law"],
    techElements: [GitBranch, Layers, Cpu]
  },
  {
    icon: Rocket,
    title: "Discover Altnerative Pathways to Success",
    description: "Learn about the wide variety of opportunities available in this rapidly evolving space",
    color: "primary",
    features: ["Prototyping", "Startup Support", "Innovation"],
    techElements: [Zap, Sparkles, Target]
  },
  {
    icon: Code,
    title: "Stand Out from the Crowd",
    description: "Access exclusive opportunities and build your skills with the tools shaping the industry",
    color: "primary",
    features: ["Industry Insights", "Mentorship", "Job Placement"],
    techElements: [TrendingUp, Briefcase, Network]
  }
];




function BannerSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);

  const changeSlide = (next) => {
    if (next === currentSlide) return;
    setPrevSlide(currentSlide);
    setCurrentSlide(next);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        setPrevSlide(prev);
        return (prev + 1) % BANNER_SLIDES.length;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => changeSlide((currentSlide + 1) % BANNER_SLIDES.length);
  const prevSlideNav = () => changeSlide((currentSlide - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);

  const swipeRef = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlideNav,
    threshold: 50
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevSlideNav();
      else if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <section
      ref={swipeRef}
      className="relative h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[600px] overflow-hidden z-10 bg-black"
      aria-label="Featured slideshow"
      role="region"
      tabIndex={0}
    >
      {/* Render all slides — CSS transition handles the crossfade.
          Previous slide stays fully opaque at z-1 as a backdrop.
          Current slide fades in on top at z-2. No black flash. */}
      {BANNER_SLIDES.map((slide, index) => {
        const isCurrent = index === currentSlide;
        const isPrev = index === prevSlide && prevSlide !== currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? 'opacity-100 z-[2]' : isPrev ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
            }`}
            aria-hidden={!isCurrent}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/55" />
            </div>

            {isCurrent && (
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="max-w-6xl mx-auto px-6 text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
                      <Zap className="h-4 w-4 text-white/80" />
                      <span className="text-sm font-rubik text-white/90">QUT's Premier Society for Law and Technology</span>
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-8 font-tomorrow leading-tight">
                    {HERO_DATA.title}
                  </h1>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {BANNER_SLIDES.map((_, index) => (
          <TiltableButton
            key={index}
            onClick={() => changeSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/40'
            }`}
            tiltOptions={{ maxTilt: 2, scale: 1.05 }}
          />
        ))}
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-8 sm:pt-10 pb-8 sm:pb-12 flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 font-montserrat max-w-3xl mx-auto leading-relaxed">
          {HERO_DATA.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <TiltableAnchor
            href={HERO_DATA.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-white/20 to-white/10 text-white px-6 py-3.5 sm:px-10 sm:py-5 rounded-2xl text-base sm:text-xl font-semibold hover:from-white/30 hover:to-white/20 border border-white/30 transition-all duration-300 shadow-2xl font-rubik overflow-hidden"
            tiltOptions={{ maxTilt: 4, scale: 1.02 }}
          >
            <span className="relative z-10">{HERO_DATA.cta}</span>
            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </TiltableAnchor>

          <TiltableLink
            to="/about"
            className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-6 py-3.5 sm:px-10 sm:py-5 rounded-2xl text-base sm:text-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm font-rubik"
            tiltOptions={{ maxTilt: 4, scale: 1.02 }}
          >
            Learn More
            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </TiltableLink>
        </div>
      </div>
    </section>
  );
}

const SPONSORS = [
  { name: "Ashurst",            logo: "/ashurst-logo.png",                             url: "https://www.ashurst.com/",               maxWidth: 80  },
  { name: "Verlata Consulting", logo: "/verlata-consulting-logo.png",                  url: "https://www.verlata.com/",               maxWidth: 130 },
  { name: "Dundas Lawyers",     logo: "/dundas-lawyers-logo.png",                      url: "https://www.dundaslawyers.com.au/",      maxWidth: 120, white: true },
  { name: "Clayton Utz",        logo: "/clayton-utz-logo.png",                         url: "https://www.claytonutz.com/",            maxWidth: 130, white: true },
  { name: "PwC",                logo: "/2218a457-c3df-4a2b-b98e-c45b60e56fb7.png",    url: "https://www.pwc.com.au/",               maxWidth: 60  },
];

function SponsorsStrip() {
  const marqueeItems = [...SPONSORS, ...SPONSORS];
  return (
    <section className="py-6 sm:py-10 relative border-t border-white/10" aria-label="Sponsors">
      <div className="mb-5 sm:mb-7 text-center">
        <p className="text-xs font-montserrat text-white/40 uppercase tracking-widest">Proudly supported by</p>
      </div>

      {/* Mobile: static grid of all logos */}
      <div className="sm:hidden flex flex-wrap justify-center items-center gap-x-8 gap-y-4 px-6">
        {SPONSORS.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={sponsor.name}
            className="opacity-75 hover:opacity-100 transition-opacity duration-300"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className={`h-6 w-auto object-contain${sponsor.white ? " brightness-0 invert" : ""}`}
              style={{ maxWidth: sponsor.maxWidth }}
              loading="lazy"
              draggable={false}
            />
          </a>
        ))}
      </div>

      {/* Desktop: scrolling marquee */}
      <div className="hidden sm:block relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/70 to-transparent z-10 pointer-events-none" />
        <div className="w-max flex gap-24 items-center will-change-transform animate-marquee">
          {marqueeItems.map((sponsor, i) => (
            <a
              key={i}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sponsor.name}
              className="flex-shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`h-7 w-auto object-contain${sponsor.white ? " brightness-0 invert" : ""}`}
                style={{ maxWidth: sponsor.maxWidth }}
                loading="lazy"
                draggable={false}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCounterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, 100, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayCount(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView]);

  return (
    <section className="py-10 sm:py-16 relative" aria-label="Member count">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center" ref={ref}>
        <Tiltable tiltOptions={{ maxTilt: 3, scale: 1.01 }}>
          <div
            className="bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm p-8 sm:p-16"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Users className="h-8 w-8 text-white/80" />
            </div>

            <div className="flex items-baseline justify-center">
              <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-white font-tomorrow">
                {displayCount}
              </span>
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/60 font-tomorrow">
                +
              </span>
            </div>

            <p className="text-xl sm:text-2xl text-white/90 font-rubik mt-4 tracking-wide">
              Members
            </p>
            <p className="text-base text-white/50 font-montserrat mt-2">
              and growing
            </p>

            <div className="mt-8">
              <TiltableAnchor
                href="https://campus.hellorubric.com/?tab=memberships&s=6719"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-rubik transition-colors duration-300"
                tiltOptions={{ maxTilt: 4, scale: 1.02 }}
              >
                <span>Join our community</span>
                <ArrowRight className="h-4 w-4" />
              </TiltableAnchor>
            </div>
          </div>
        </Tiltable>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="pt-8 sm:pt-12 pb-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 font-tomorrow">
            Why Join Us?
          </h2>
          <p className="text-base sm:text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
            Discover the unique advantages of being part of our community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 items-stretch">
          {BENEFITS.map((benefit, index) => (
            <Tiltable
              key={benefit.title}
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
              className="h-full"
            >
              <div className="group text-center p-6 sm:p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:bg-white/10 h-full flex flex-col">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-${benefit.color}/20 to-${benefit.color}/10 border border-${benefit.color}/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`h-8 w-8 sm:h-10 sm:w-10 text-${benefit.color}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 font-rubik">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-white/80 font-montserrat leading-relaxed">{benefit.description}</p>
              </div>
            </Tiltable>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-10 sm:py-16 relative" aria-label="Call to action section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Tiltable tiltOptions={{ maxTilt: 3, scale: 1.01 }}>
          <div className="liquid-glass-strong rounded-3xl p-6 sm:p-16 border border-white/20 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 font-tomorrow">
            Ready to Shape the Future?
          </h2>
          <p className="text-base sm:text-xl text-white/80 mb-8 sm:mb-10 font-montserrat max-w-2xl mx-auto leading-relaxed">
            Join us today and become part of a community that's driving innovation
            at the intersection of law and technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-10">
            <TiltableAnchor
              href="https://campus.hellorubric.com/?tab=memberships&s=6719"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-white/20 to-white/10 text-white px-6 py-3.5 sm:px-10 sm:py-5 rounded-2xl text-base sm:text-xl font-semibold hover:from-white/30 hover:to-white/20 border border-white/30 transition-all duration-300 shadow-2xl font-rubik overflow-hidden"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              <span className="relative z-10">Join Now</span>
            </TiltableAnchor>
            <TiltableLink
              to="/about"
              className="group inline-flex items-center justify-center gap-3 border-2 border-white/30 text-white px-6 py-3.5 sm:px-10 sm:py-5 rounded-2xl text-base sm:text-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm font-rubik"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              Learn More
              <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </TiltableLink>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 pt-6 border-t border-white/10">
            <TiltableAnchor
              href="https://www.facebook.com/lawinnovationandtechsociety/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              aria-label="Facebook"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Facebook className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300" />
            </TiltableAnchor>
            <TiltableAnchor
              href="https://www.instagram.com/qutlitsociety/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              aria-label="Instagram"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Instagram className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300" />
            </TiltableAnchor>
            <TiltableAnchor
              href="https://www.linkedin.com/company/law-innovation-and-technology-society/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              aria-label="LinkedIn"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Linkedin className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300" />
            </TiltableAnchor>
            <TiltableAnchor
              href="mailto:litsociety@qut.edu.au"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              aria-label="Email"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Mail className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300" />
            </TiltableAnchor>
          </div>
          </div>
        </Tiltable>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <BannerSlideshow />
        <SponsorsStrip />
        <HeroSection />
        <MemberCounterSection />
        <BenefitsSection />
        <CTASection />
      </main>
    </div>
  );
}

export default Home;
