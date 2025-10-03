import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Users, MapPin, Clock, Award, Brain, Code, Rocket, Target, Network, Globe, Briefcase, Zap, Sparkles, Scale, Cpu, Database, Shield, Eye, Layers, Lock, TrendingUp, GitBranch } from "lucide-react";
import Navigation from "../components/Navigation";

// Events data
const UPCOMING_EVENTS = [
  {
    title: "placeholder",
    date: "placeholder",
    time: "placeholder",
    location: "placeholder",
    type: "placeholder",
    spots: "placeholder",
    description: "placeholder",
    techIcons: [Brain, Cpu, Database],
    category: "placeholder"
  },
  {
    title: "placeholder",
    date: "placeholder",
    time: "placeholder",
    location: "placeholder",
    type: "placeholder",
    spots: "placeholder",
    description: "placeholder",
    techIcons: [Network, Globe, Briefcase],
    category: "placeholder"
  },
  {
    title: "placeholder",
    date: "placeholder",
    time: "placeholder",
    location: "placeholder",
    type: "placeholder",
    spots: "placeholder",
    description: "placeholder",
    techIcons: [Code, Rocket, Target],
    category: "placeholder"
  },
  {
    title: "placeholder",
    date: "placeholder",
    time: "placeholder",
    location: "placeholder",
    type: "placeholder",
    spots: "placeholder",
    description: "placeholder",
    techIcons: [Layers, Lock, Code],
    category: "placeholder"
  },
  {
    title: "placeholder",
    date: "placeholder",
    time: "placeholder",
    location: "placeholder",
    type: "placeholder",
    spots: "placeholder",
    description: "placeholder",
    techIcons: [Briefcase, Network, TrendingUp],
    category: "placeholder"
  },
  {
    title: "placeholder",
    date: "placeholder",
    time: "placeholder",
    location: "placeholder",
    type: "placeholder",
    spots: "placeholder",
    description: "placeholder",
    techIcons: [Brain, Shield, Eye],
    category: "placeholder"
  }
];

const PAST_EVENTS = [
  {
    title: "placeholder",
    date: "placeholder",
    attendees: "placeholder",
    highlights: ["placeholder", "placeholder", "placeholder"]
  },
  {
    title: "placeholder",
    date: "placeholder",
    attendees: "placeholder",
    highlights: ["placeholder", "placeholder", "placeholder"]
  },
  {
    title: "placeholder",
    date: "placeholder",
    attendees: "placeholder",
    highlights: ["placeholder", "placeholder", "placeholder"]
  }
];

function Events() {
  const navigate = useNavigate();
  
  const handleJoinClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-purple to-dark-blue">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-purple/80 to-dark-blue/80"></div>
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
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-rubik text-white/90">Events & Workshops</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-tomorrow leading-tight"
          >
            QUT LITS Events
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto leading-relaxed"
          >
            Join us for cutting-edge workshops, networking opportunities, and hands-on learning experiences in legal technology and innovation.
          </motion.p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
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
              Don't miss these exciting opportunities to learn, network, and grow your legal tech skills
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-purple/20 rounded-full px-3 py-1 border border-primary/30">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-xs font-rubik text-primary font-semibold">{event.type}</span>
                    </div>
                    <span className="text-xs text-white/60 font-rubik px-2 py-1 bg-white/10 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-rubik group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 font-montserrat leading-relaxed">
                    {event.description}
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-white/70">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-montserrat">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-montserrat">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-montserrat">{event.location}</span>
                  </div>
                </div>

                {/* Tech Icons */}
                <div className="flex gap-3 mb-4">
                  {event.techIcons.map((TechIcon, techIndex) => (
                    <div key={techIndex} className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <TechIcon className="h-4 w-4 text-white/60" />
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-primary font-semibold font-rubik mb-3">{event.spots}</p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold font-rubik text-sm hover:scale-105 transition-all duration-300"
                  >
                    Register Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-gradient-to-br from-dark-purple/30 to-dark-blue/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-tomorrow">
              Past Events
            </h2>
            <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
              Check out our successful events from the past year
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {PAST_EVENTS.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold text-white mb-4 font-rubik">
                  {event.title}
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-white/70">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-montserrat">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-montserrat">{event.attendees} attendees</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-white/60 font-montserrat font-semibold mb-2">Highlights:</p>
                  {event.highlights.map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="text-sm text-white/70 font-montserrat">
                      • {highlight}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-16 border border-white/10"
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-tomorrow">
              Want to Stay Updated?
            </h2>
            <p className="text-xl text-white/80 mb-10 font-montserrat max-w-2xl mx-auto leading-relaxed">
              Join our mailing list to receive updates about upcoming events, workshops, and opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleJoinClick}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary to-purple text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-2xl hover:shadow-primary/25 font-rubik overflow-hidden"
              >
                <span className="relative z-10">Join QUT LITS</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm font-rubik hover:scale-105"
              >
                Contact Us
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Events;
