import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, Code, Rocket, Target, Network, Globe, Briefcase, Zap, Sparkles, Scale, Cpu, Database, Shield, Eye, Layers, Lock, TrendingUp, GitBranch, Users, Calendar, Award, FileText, Search, BarChart3 } from "lucide-react";
import Navigation from "../components/Navigation";

// Learning resources data
const LEARNING_TOPICS = [
  {
    icon: Brain,
    title: "placeholder",
    description: "placeholder",
    color: "primary",
    resources: [
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" },
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" },
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" }
    ],
    techIcons: [Cpu, Database, Search]
  },
  {
    icon: Code,
    title: "placeholder",
    description: "placeholder",
    color: "secondary",
    resources: [
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" },
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" },
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" }
    ],
    techIcons: [GitBranch, Layers, Cpu]
  },
  {
    icon: Rocket,
    title: "placeholder",
    description: "placeholder",
    color: "purple",
    resources: [
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" },
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" },
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" }
    ],
    techIcons: [Zap, Sparkles, Target]
  },
  {
    icon: Target,
    title: "placeholder",
    description: "placeholder",
    color: "orange",
    resources: [
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" },
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" },
      { title: "placeholder", type: "placeholder", duration: "placeholder", level: "placeholder" }
    ],
    techIcons: [TrendingUp, Briefcase, Network]
  }
];

const FEATURED_RESOURCES = [
  {
    title: "placeholder",
    description: "placeholder",
    image: "/headshot.png",
    category: "placeholder",
    readTime: "placeholder",
    level: "placeholder",
    techIcons: [Scale, Cpu, Database]
  },
  {
    title: "placeholder",
    description: "placeholder",
    image: "/headshot.png",
    category: "placeholder",
    readTime: "placeholder",
    level: "placeholder",
    techIcons: [Brain, Shield, Eye]
  },
  {
    title: "placeholder",
    description: "placeholder",
    image: "/headshot.png",
    category: "placeholder",
    readTime: "placeholder",
    level: "placeholder",
    techIcons: [Layers, Lock, Code]
  }
];

const LEARNING_PATHS = [
  {
    title: "placeholder",
    description: "placeholder",
    duration: "placeholder",
    courses: ["placeholder", "placeholder", "placeholder"],
    icon: BookOpen
  },
  {
    title: "placeholder",
    description: "placeholder",
    duration: "placeholder",
    courses: ["placeholder", "placeholder", "placeholder", "placeholder"],
    icon: Brain
  },
  {
    title: "placeholder",
    description: "placeholder",
    duration: "placeholder",
    courses: ["placeholder", "placeholder", "placeholder", "placeholder"],
    icon: Code
  }
];

function Learn() {
  const navigate = useNavigate();
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
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-rubik text-white/90">Learning Resources</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-tomorrow leading-tight"
          >
            Learn Legal Technology
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto leading-relaxed"
          >
            Master the skills and knowledge needed to excel in legal technology. From AI and machine learning to programming and innovation, we've got you covered.
          </motion.p>
        </div>
      </section>

      {/* Learning Topics */}
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
              Learning Topics
            </h2>
            <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
              Explore our comprehensive learning areas designed to build your legal tech expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {LEARNING_TOPICS.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group text-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-${topic.color}/20 to-${topic.color}/10 border border-${topic.color}/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <topic.icon className={`h-10 w-10 text-${topic.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-rubik">{topic.title}</h3>
                <p className="text-white/80 font-montserrat leading-relaxed mb-6">{topic.description}</p>
                
                {/* Resources List */}
                <div className="space-y-3 mb-6">
                  {topic.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="text-left bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-white font-rubik">{resource.title}</span>
                        <span className="text-xs text-primary font-rubik px-2 py-1 bg-primary/20 rounded-full">
                          {resource.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <span>{resource.type}</span>
                        <span>•</span>
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Icons */}
                <div className="flex justify-center gap-3">
                  {topic.techIcons.map((TechIcon, techIndex) => (
                    <div
                      key={techIndex}
                      className="p-2 rounded-lg bg-white/5 border border-white/10"
                    >
                      <TechIcon className="h-4 w-4 text-white/60" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
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
              Learning Paths
            </h2>
            <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
              Follow structured learning paths designed to take you from beginner to expert
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {LEARNING_PATHS.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-purple/20 border border-primary/30 flex items-center justify-center">
                  <path.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-rubik text-center">{path.title}</h3>
                <p className="text-white/80 font-montserrat text-center mb-6">{path.description}</p>
                
                <div className="text-center mb-6">
                  <span className="text-sm text-primary font-semibold font-rubik px-3 py-1 bg-primary/20 rounded-full">
                    {path.duration}
                  </span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-white/60 font-montserrat font-semibold">Courses:</p>
                  {path.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="text-sm text-white/70 font-montserrat">
                      • {course}
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold font-rubik text-sm hover:scale-105 transition-all duration-300"
                  >
                    Start Learning Path
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
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
              Featured Resources
            </h2>
            <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
              Start with these essential resources to build your legal tech foundation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_RESOURCES.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple/20 flex items-center justify-center relative overflow-hidden">
                  <BookOpen className="h-16 w-16 text-primary/60" />
                  
                  {/* Floating Tech Icons */}
                  <div className="absolute inset-0">
                    {resource.techIcons.map((TechIcon, techIndex) => (
                      <motion.div
                        key={techIndex}
                        className="absolute text-primary/40"
                        style={{
                          left: `${20 + techIndex * 30}%`,
                          top: `${30 + techIndex * 20}%`,
                        }}
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 180, 360],
                          opacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{
                          duration: 8 + techIndex * 2,
                          repeat: Infinity,
                          delay: techIndex * 0.5
                        }}
                      >
                        <TechIcon className="h-6 w-6" />
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-primary font-semibold font-rubik px-2 py-1 bg-primary/20 rounded-full">
                      {resource.category}
                    </span>
                    <span className="text-xs text-white/50 font-montserrat">
                      {resource.readTime}
                    </span>
                    <span className="text-xs text-white/50 font-montserrat">
                      • {resource.level}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 font-rubik group-hover:text-primary transition-colors duration-300">
                    {resource.title}
                  </h3>
                  
                  <p className="text-white/70 font-montserrat leading-relaxed mb-4">
                    {resource.description}
                  </p>
                  
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold font-rubik text-sm hover:scale-105 transition-all duration-300"
                  >
                    Access Resource
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                onClick={() => navigate('/')}
                className="group relative inline-flex items-center bg-gradient-to-r from-primary to-purple text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-2xl hover:shadow-primary/25 font-rubik overflow-hidden"
              >
                <span className="relative z-10">Join Now</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Learn;
