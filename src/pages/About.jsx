import React, { useState } from "react";
import { Linkedin, Users, Target, Lightbulb, Award, Building, BookOpen } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { CTASection } from "../components/Footer";

const EXECUTIVE_TEAM = [
  {
    name: "Kevin Flanagan",
    role: "President",
    image: "/kevin-flanagan.jpg",
    bio: "",
    email: "",
    linkedin: "https://www.linkedin.com/in/kevin-flanagan-6043392b2/"
  },
  {
    name: "Lachlan Douglass",
    role: "Vice President",
    image: "/lachlan-douglass.jpg",
    bio: "",
    email: "",
    linkedin: "https://www.linkedin.com/in/lachlan-douglass-383a7430a/"
  },
  {
    name: "John Wynter",
    role: "Secretary",
    image: "/john-wynter.jpg",
    bio: "",
    email: "",
    linkedin: "https://www.linkedin.com/in/john-wynter/"
  },
  {
    name: "Yiru Jones",
    role: "Treasurer",
    image: "/yiru-jones.jpg",
    bio: "",
    email: "",
    linkedin: "https://www.linkedin.com/in/yiru-jones-b7651256/"
  }
];

const PAST_PRESIDENTS = [
  {
    name: "Vinesh Nangia",
    role: "2025 President & Chief Returning Officer",
    image: "/vinesh.jpg",
    bio: "",
    email: "",
    linkedin: "https://www.linkedin.com/in/vinesh-nangia/"
  },
  {
    name: "Nikhil Kaniyur",
    role: "2024 President & Executive Office",
    image: "/nikhil-kaniyur.jpg",
    bio: "",
    email: "",
    linkedin: "https://www.linkedin.com/in/nikhil-kaniyur/"
  },
  {
    name: "Sarah Deeb",
    role: "Founder & 2023 President",
    image: "/sarah.jpg",
    bio: "",
    email: "",
    linkedin: "#"
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
  { number: "12+", label: "Annual Workshops", icon: BookOpen },
  { number: "95%", label: "Member Satisfaction", icon: Award }
];



function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden" aria-label="About section">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tomorrow">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto font-montserrat leading-relaxed">
            We are Queensland University of Technology's premier society for students
            interested in the intersection of law, innovation, and technology.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple/20 border border-primary/30 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-tomorrow">{stat.number}</div>
              <div className="text-white/80 font-montserrat">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="pt-16 pb-16 relative" aria-label="Mission and vision section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
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
          </div>

          <div>
            <div>
              <div className="liquid-glass-strong rounded-3xl p-10 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 font-tomorrow text-center">Our Values</h3>
                <div className="grid grid-cols-2 gap-6">
                  {SOCIETY_VALUES.map((value, index) => (
                    <div key={value.title} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm h-full flex flex-col">
                      <value.icon className="h-12 w-12 text-primary mx-auto mb-4 flex-shrink-0" />
                      <h4 className="text-lg font-semibold text-white mb-2 font-rubik flex-shrink-0">{value.title}</h4>
                      <p className="text-sm text-white/70 font-montserrat flex-1">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member, index }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:bg-white/10 h-full flex flex-col">
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary to-purple border-2 border-primary/30 group-hover:border-primary transition-all duration-300 flex items-center justify-center">
          {!imageError ? (
            <img
              src={member.image}
              alt={`${member.name} - ${member.role}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
            />
          ) : (
            <Users className="h-12 w-12 text-primary/50" />
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-1 font-rubik group-hover:text-primary transition-colors duration-300">{member.name}</h3>
        <p className="text-primary font-semibold font-montserrat">{member.role}</p>
      </div>

      {member.bio && member.bio !== "placeholder" && (
        <p className="text-white/80 text-center mb-6 font-montserrat leading-relaxed flex-1">{member.bio}</p>
      )}

      <div className="flex justify-center gap-3 mt-auto">
        {member.linkedin && member.linkedin !== "#" && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-300 group/link"
            title={`Connect with ${member.name} on LinkedIn`}
            aria-label={`${member.name}'s LinkedIn profile`}
          >
            <Linkedin className="h-5 w-5 group-hover/link:scale-110 transition-transform duration-300" />
          </a>
        )}
      </div>
    </div>
  );
}

function ExecutiveTeamSection() {
  return (
    <section className="py-24 relative" aria-label="Executive team section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-tomorrow">Executive Team</h2>
          <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
            Meet the dedicated students leading QUT LITS and driving our mission forward
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXECUTIVE_TEAM.map((member, index) => (
            <MemberCard key={`${member.name}-${index}`} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PastPresidentsSection() {
  return (
    <section className="py-24 relative" aria-label="Past presidents section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-tomorrow">Past Presidents</h2>
          <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
            Honoring the leaders who have shaped QUT LITS from its founding
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PAST_PRESIDENTS.map((member, index) => (
            <MemberCard key={`${member.name}-${index}`} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// CTASection imported from shared Footer component - uses custom secondary CTA
function AboutCTASection() {
  return (
    <CTASection
      secondaryCTA={{ text: "Contact Us", to: "/contact" }}
    />
  );
}

function About() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <StatsSection />
        <MissionSection />
        <ExecutiveTeamSection />
        <PastPresidentsSection />
        <AboutCTASection />
      </main>
    </div>
  );
}

export default About;
