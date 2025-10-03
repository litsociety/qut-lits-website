import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Linkedin, Github, Users, Target, Lightbulb, Award, Building, Globe, BookOpen, ArrowRight } from "lucide-react";
import Navigation from "../components/Navigation";

const EXECUTIVE_TEAM = [
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  },
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  },
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  },
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  },
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  },
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  }
];

const SOCIETY_VALUES = [
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive network of students passionate about law and technology"
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Exploring cutting-edge legal technology and emerging industry trends"
  },
  {
    icon: Lightbulb,
    title: "Learning",
    description: "Providing opportunities for skill development and knowledge sharing"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for the highest standards in all our activities and initiatives"
  }
];

const STATS = [
  { number: "150+", label: "Active Members", icon: Users },
  { number: "25+", label: "Industry Partners", icon: Building },
  { number: "12+", label: "Annual Events", icon: BookOpen },
  { number: "95%", label: "Member Satisfaction", icon: Award }
];



function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-blue via-dark-purple to-dark-blue"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tomorrow">
            About QUT LITS
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto font-montserrat leading-relaxed">
            We are Queensland University of Technology's premier society for students 
            interested in the intersection of law, innovation, and technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-dark-purple/30 to-dark-blue/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple/20 border border-primary/30 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-tomorrow">{stat.number}</div>
              <div className="text-white/80 font-montserrat">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-tomorrow">
              Our Mission & Vision
            </h2>
            <div className="space-y-6 text-white/80 font-montserrat">
              <p className="text-lg leading-relaxed">
                QUT LITS exists to bridge the gap between legal education and technological innovation. 
                We believe that the future of law lies in understanding and leveraging technology to 
                create more efficient, accessible, and just legal systems.
              </p>
              <p className="text-lg leading-relaxed">
                Through workshops, networking events, and industry partnerships, we prepare our members 
                for the evolving landscape of legal technology and innovation.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="liquid-glass-strong rounded-3xl p-10 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 font-tomorrow text-center">Our Values</h3>
              <div className="grid grid-cols-2 gap-6">
                {SOCIETY_VALUES.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                  >
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2 font-rubik">{value.title}</h4>
                    <p className="text-sm text-white/70 font-montserrat">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExecutiveTeamSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-dark-purple/20 to-dark-blue/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-tomorrow">Executive Team</h2>
          <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
            Meet the dedicated students leading QUT LITS and driving our mission forward
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXECUTIVE_TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary to-purple border border-primary/30">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 font-rubik">{member.name}</h3>
                <p className="text-primary font-semibold font-montserrat">{member.role}</p>
              </div>
              
              <p className="text-white/80 text-center mb-6 font-montserrat leading-relaxed">{member.bio}</p>
              
              <div className="flex justify-center gap-3">
                <a
                  href={`mailto:${member.email}`}
                  className="p-3 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-300 hover:scale-110"
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href={member.linkedin}
                  className="p-3 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-300 hover:scale-110"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={member.github}
                  className="p-3 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-300 hover:scale-110"
                  title="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
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

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-purple to-dark-blue">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <MissionSection />
      <ExecutiveTeamSection />
      <CTASection />
    </div>
  );
}

export default About;
