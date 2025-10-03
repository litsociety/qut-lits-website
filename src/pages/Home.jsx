import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Users, Calendar, Award, BookOpen, Briefcase, Globe, Zap, Network, Scale, Cpu, Database, Brain, Code, Rocket, Search, GitBranch, Layers, Sparkles, Target, TrendingUp, Shield, Eye, Lock } from "lucide-react";
import Navigation from "../components/Navigation";

// Hero section data
const HERO_DATA = {
  title: "QUT LITS",
  subtitle: "Law, Innovation & Technology Society",
  description: "Empowering QUT students to become the next generation of legal tech innovators and tech law pioneers. Master AI-powered legal tools, blockchain contracts, emerging technologies, and the legal frameworks that govern innovation.",
  cta: "Join Our Community",
  stats: [
    { number: "500+", label: "Active Members", icon: Users },
    { number: "50+", label: "Industry Partners", icon: Network },
    { number: "100+", label: "Events Hosted", icon: Calendar }
  ]
};

// Banner slideshow data
const BANNER_SLIDES = [
  {
    id: 1,
    title: "Welcome to QUT LITS",
    subtitle: "Where Law Meets Innovation",
    description: "Join the premier society bridging legal education with cutting-edge technology. Learn from industry experts, build real-world projects, and launch your career in legal tech and tech law.",
    image: "/headshot.png",
    cta: "Discover More",
    link: "/about",
    techIcons: [Scale, Cpu, Database]
  },
  {
    id: 2,
    title: "AI & Legal Innovation",
    subtitle: "Hands-On Workshop",
    description: "Master AI-powered legal research, contract analysis, and case management tools. Explore the legal implications of AI and how to navigate emerging regulatory frameworks.",
    image: "/headshot.png",
    cta: "Register Now",
    link: "/",
    techIcons: [Brain, Code, Rocket]
  },
  {
    id: 3,
    title: "Tech Law & Innovation",
    subtitle: "Connect with Industry Leaders",
    description: "Build your professional network with legal tech startups, law firms, and technology companies. Discover opportunities in tech law, regulatory compliance, and innovation policy.",
    image: "/headshot.png",
    cta: "Connect Now",
    link: "/",
    techIcons: [Network, Globe, Briefcase]
  }
];

// Key benefits data
const BENEFITS = [
  {
    icon: Brain,
    title: "Legal Tech & AI Mastery",
    description: "Master cutting-edge technologies reshaping the legal industry through hands-on workshops and real-world projects",
    color: "primary",
    features: ["Machine Learning", "Contract Analysis", "Legal Research AI"],
    techElements: [Cpu, Database, Search]
  },
  {
    icon: Code,
    title: "Tech Law & Innovation",
    description: "Develop expertise in the legal frameworks governing technology, from AI regulation to blockchain law and beyond",
    color: "secondary",
    features: ["Regulatory Compliance", "Tech Policy", "Innovation Law"],
    techElements: [GitBranch, Layers, Cpu]
  },
  {
    icon: Rocket,
    title: "Innovation & Entrepreneurship",
    description: "Access cutting-edge tools and build innovative solutions at the intersection of law and technology",
    color: "purple",
    features: ["Prototyping", "Startup Support", "Innovation"],
    techElements: [Zap, Sparkles, Target]
  },
  {
    icon: Target,
    title: "Dual Career Pathways",
    description: "Navigate both legal tech development and tech law careers with expert mentorship and industry connections",
    color: "orange",
    features: ["Industry Insights", "Mentorship", "Job Placement"],
    techElements: [TrendingUp, Briefcase, Network]
  }
];

// Upcoming events data
const UPCOMING_EVENTS = [
  {
    title: "placeholder",
    date: "placeholder",
    time: "placeholder",
    location: "placeholder",
    type: "placeholder",
    spots: "placeholder",
    description: "placeholder",
    techIcons: [Brain, Cpu, Database]
  },
  {
    title: "placeholder",
    date: "placeholder",
    time: "placeholder",
    location: "placeholder",
    type: "placeholder",
    spots: "placeholder",
    description: "placeholder",
    techIcons: [Network, Globe, Briefcase]
  },
  {
    title: "placeholder",
    date: "placeholder",
    time: "placeholder",
    location: "placeholder",
    type: "placeholder",
    spots: "placeholder",
    description: "placeholder",
    techIcons: [Code, Rocket, Target]
  }
];

// Featured content
const FEATURED_CONTENT = [
  {
    title: "Legal Tech & Innovation Trends 2025",
    description: "Explore the latest developments in legal technology and tech law. From AI-powered research to blockchain contracts and regulatory frameworks.",
    image: "/headshot.png",
    category: "Research",
    readTime: "5 min read",
    techIcons: [TrendingUp, Cpu, Database]
  },
  {
    title: "AI Ethics & Legal Innovation",
    description: "Understanding the ethical implications of AI adoption in legal practice and the regulatory frameworks that govern innovation.",
    image: "/headshot.png",
    category: "Ethics",
    readTime: "8 min read",
    techIcons: [Brain, Shield, Eye]
  },
  {
    title: "Blockchain Law & Smart Contracts",
    description: "How blockchain technology is revolutionizing contract law and the legal frameworks that govern decentralized innovation.",
    image: "/headshot.png",
    category: "Technology",
    readTime: "6 min read",
    techIcons: [Layers, Lock, Code]
  }
];



function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-blue via-dark-purple to-dark-blue"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-rubik text-white/90">QUT's Premier Society</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold text-white mb-6 font-tomorrow leading-tight"
        >
          {HERO_DATA.title}
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-semibold mb-6 text-primary font-rubik max-w-3xl mx-auto"
        >
          {HERO_DATA.subtitle}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl mb-10 text-white/90 font-montserrat max-w-3xl mx-auto leading-relaxed"
        >
          {HERO_DATA.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <Link
            to="/"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary to-purple text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-2xl hover:shadow-primary/25 font-rubik overflow-hidden"
          >
            <span className="relative z-10">{HERO_DATA.cta}</span>
            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <Link
            to="/about"
            className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm font-rubik hover:scale-105"
          >
            Learn More
            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {HERO_DATA.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-purple/20 border border-primary/30 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary font-tomorrow mb-2">
                {stat.number}
              </div>
              <div className="text-white/80 font-rubik">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-dark-purple/50 to-dark-blue/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-tomorrow">
            Why Join QUT LITS?
          </h2>
          <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
            Discover the unique advantages of being part of our community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group text-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-${benefit.color}/20 to-${benefit.color}/10 border border-${benefit.color}/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className={`h-10 w-10 text-${benefit.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-rubik">{benefit.title}</h3>
              <p className="text-white/80 font-montserrat leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-tomorrow">
            Upcoming Events
          </h2>
          <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
            Join us for these exciting opportunities to learn, network, and grow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UPCOMING_EVENTS.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-purple/20 rounded-full px-3 py-1 border border-primary/30 mb-4">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-xs font-rubik text-primary font-semibold">{event.type}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-rubik group-hover:text-primary transition-colors duration-300">
                  {event.title}
                </h3>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-white/70">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-montserrat">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-montserrat">{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-montserrat">{event.location}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-primary font-semibold font-rubik">{event.spots}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold font-rubik text-lg hover:scale-105 transition-all duration-300"
          >
            View all events
            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const navigate = useNavigate();
  
  const handleJoinClick = () => {
    navigate('/');
  };

  return (
    <section className="py-24 bg-gradient-to-r from-primary/10 to-purple/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="liquid-glass-strong rounded-3xl p-16 border border-white/20 shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-white mb-6 font-tomorrow">
            Ready to Shape the Future?
          </h2>
          <p className="text-xl text-white/80 mb-10 font-montserrat max-w-2xl mx-auto leading-relaxed">
            Join QUT LITS today and become part of a community that's driving innovation 
            at the intersection of law and technology.
          </p>
          
          <div className="flex justify-center">
            <button
              onClick={handleJoinClick}
              className="group relative inline-flex items-center bg-gradient-to-r from-primary to-purple text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-2xl hover:shadow-primary/25 font-rubik overflow-hidden"
            >
              <span className="relative z-10">Join Now</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-purple to-dark-blue">
      <Navigation />
      <HeroSection />
      <BenefitsSection />
      <EventsSection />
      <CTASection />
    </div>
  );
}

export default Home;
