import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin, Clock, Users, Calendar, Award, Brain, Code, Rocket, Target, Network, Globe, Briefcase, Zap, Sparkles, Scale, Cpu, Database, Shield, Eye, Layers, Lock, TrendingUp, GitBranch, Send, MessageCircle, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import Navigation from "../components/Navigation";

// Contact form component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add actual form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
    >
      <h3 className="text-2xl font-bold text-white mb-6 font-rubik">Send us a Message</h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-white/80 font-rubik mb-2">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary/50 transition-colors duration-300"
            placeholder="Your full name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-white/80 font-rubik mb-2">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary/50 transition-colors duration-300"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="subject" className="block text-white/80 font-rubik mb-2">Subject *</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary/50 transition-colors duration-300"
          placeholder="What's this about?"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-white/80 font-rubik mb-2">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary/50 transition-colors duration-300 resize-none"
          placeholder="Tell us more about your inquiry..."
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-purple text-white px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-lg hover:shadow-primary/25 font-rubik flex items-center justify-center gap-2"
      >
        <Send className="h-5 w-5" />
        Send Message
      </button>
    </motion.form>
  );
}

// Contact information data
const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@qutlits.com",
    description: "Send us an email anytime",
    link: "mailto:hello@qutlits.com"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "QUT Gardens Point",
    description: "Brisbane, Queensland, Australia",
    link: null
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "Monday - Friday",
    description: "9:00 AM - 5:00 PM AEST",
    link: null
  },
  {
    icon: MessageCircle,
    title: "Social Media",
    value: "@qutlits",
    description: "Follow us for updates",
    link: null
  }
];

const SOCIAL_LINKS = [
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-blue-400" },
  { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-blue-400" },
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-400" },
  { icon: Github, label: "GitHub", href: "#", color: "hover:text-gray-400" }
];

function Contact() {
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
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-rubik text-white/90">Get in Touch</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-tomorrow leading-tight"
          >
            Contact Us
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto leading-relaxed"
          >
            Have questions about QUT LITS? Want to get involved? We'd love to hear from you. Reach out and let's start a conversation.
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
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
              Get in Touch
            </h2>
            <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
              Multiple ways to reach us and get your questions answered
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {CONTACT_INFO.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-purple/20 border border-primary/30 flex items-center justify-center">
                  <info.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-rubik">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-lg text-primary font-semibold font-rubik mb-2 block hover:text-primary/80 transition-colors duration-300"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-lg text-primary font-semibold font-rubik mb-2">{info.value}</p>
                )}
                <p className="text-white/80 font-montserrat">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Additional Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-6 font-rubik">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold font-rubik mb-2">How do I join QUT LITS?</h4>
                    <p className="text-white/70 font-montserrat text-sm">Simply visit our Join page and fill out the membership form. We welcome all QUT students interested in legal technology.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-rubik mb-2">Do I need technical skills to join?</h4>
                    <p className="text-white/70 font-montserrat text-sm">No! We welcome students of all skill levels. We provide learning resources and workshops to help you develop technical skills.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-rubik mb-2">What events do you host?</h4>
                    <p className="text-white/70 font-montserrat text-sm">We host workshops, networking events, hackathons, and industry talks. Check our Events page for upcoming activities.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-6 font-rubik">Connect With Us</h3>
                <p className="text-white/80 font-montserrat mb-6">Follow us on social media for the latest updates, events, and insights.</p>
                
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

export default Contact;
