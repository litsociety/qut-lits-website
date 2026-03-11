import React from "react";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { Tiltable, TiltableAnchor } from "../components/Tiltable";

// Badge style map
const BADGE_STYLES = {
  "Workshop":       "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Collaboration":  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Landmark Event": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Social Event":   "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const SEMESTER_1 = [
  {
    id: 1,
    title: "LITS x GRC",
    badge: "Collaboration",
    image: "/lits-slideshow-6.jpg",
    description:
      "A collaborative event between QUT LITS and GRC. Taking place in Semester 1, Week 4. Details to be announced.",
    date: "Week 4, Semester 1",
    time: "TBA",
    location: "TBA",
    link: null,
  },
  {
    id: 2,
    title: "Mel Storey – Book Tour Event",
    badge: "Collaboration",
    image: "/lits-slideshow-7.jpg",
    description:
      "Join us for Mel Storey's book tour event. An opportunity to engage with thought leadership in law and technology. This event requires co-operation with QUTLS and possibly QLS.",
    date: "18 March 2026",
    time: "6:15 PM",
    location: "QUT Gardens Point Campus Gibson Room",
    link: "https://campus.hellorubric.com/?eid=53921",
    linkLabel: "Register Now",
  },
  {
    id: 3,
    title: "Technology in Legal Investigations",
    badge: "Workshop",
    image: "/lits-workshops.jpg",
    description:
      "A practical workshop exploring the intersection of law and technology through a mock legal investigation, demonstrating how technology assists in discovering and understanding facts when they aren't immediately clear.",
    date: "23 March 2026",
    time: "5:00 PM – 6:00 PM",
    location: "QUT Gardens Point Campus D-106",
    link: "https://campus.hellorubric.com/?eid=53722",
    linkLabel: "Register Now",
  },
  {
    id: 4,
    title: "Law & Tech Networking Night",
    badge: "Landmark Event",
    image: "/lits-slideshow-6.jpg",
    description:
      "Our premier event connecting students with professionals working at the intersection of law and technology. From privacy and cybersecurity to AI governance and digital innovation, this event highlights how technology is reshaping the legal landscape. Features panel discussions and networking sessions.",
    date: "16 April 2026",
    time: "6:00 PM – 9:00 PM",
    location: "Clayton Utz",
    link: "https://campus.hellorubric.com/?eid=53724",
    linkLabel: "Book Now",
  },
  {
    id: 5,
    title: "LITS x ESC",
    badge: "Collaboration",
    image: "/lits-slideshow-6.jpg",
    description:
      "A collaborative event between QUT LITS and ESC. Taking place in Semester 1, Week 10. Details to be announced.",
    date: "Week 10, Semester 1",
    time: "TBA",
    location: "TBA",
    link: null,
  },
  {
    id: 6,
    title: "End-of-Semester 1 Social Drinks",
    badge: "Social Event",
    image: "/lits-social.jpg",
    description:
      "Celebrate the end of Semester 1 with drinks at Bot Bar. Connect with fellow members, share your experiences, and unwind after a great semester of events.",
    date: "22 May 2026",
    time: "TBA",
    location: "Bot Bar",
    link: null,
  },
];

const SEMESTER_2 = [
  {
    id: 7,
    title: "Semester 2 Orientation Week",
    badge: "Social Event",
    image: "/lits-oweek.jpg",
    description:
      "Join us at our Semester 2 O Week stall! Meet the team, learn about QUT LITS, and discover upcoming events for the second semester. O Week runs from Monday 13 July to Friday 17 July.",
    date: "13 July 2026",
    time: "All Day",
    location: "QUT Gardens Point Campus",
    link: null,
  },
  {
    id: 8,
    title: "Welcome Coffee (Semester 2)",
    badge: "Social Event",
    image: "/welcome-coffee.jpg",
    description:
      "Kick off Semester 2 with a casual welcome coffee event at Merlo. Meet new members, reconnect with friends, and learn about upcoming events.",
    date: "14 July 2026",
    time: "TBA",
    location: "Merlo Coffee, Gardens Point",
    link: null,
  },
  {
    id: 9,
    title: "QUT Open Day",
    badge: "Workshop",
    image: "/lits-oweek.jpg",
    description:
      "Join us at QUT Open Day to showcase QUT LITS to prospective students. Learn about our society and the opportunities we offer.",
    date: "27 July 2026",
    time: "All Day",
    location: "QUT Gardens Point Campus",
    link: null,
  },
  {
    id: 10,
    title: "QUT Tech Industry Night",
    badge: "Collaboration",
    image: "/lits-slideshow-6.jpg",
    description:
      "The largest networking event for technology-focused students at QUT, hosted in collaboration with other leading tech societies. This flagship event brings together over 200 attendees from diverse disciplines to engage directly with professionals shaping the future of technology and innovation.",
    date: "14 August 2026",
    time: "6:00 PM – 9:00 PM",
    location: "QUT Garden Theatre",
    link: null,
  },
  {
    id: 11,
    title: "Innovate & Regulate – Law & Technology Panel",
    badge: "Collaboration",
    image: "/lits-slideshow-7.jpg",
    description:
      "Our flagship thought-leadership event, bringing together leading professionals, academics and students to explore how innovation challenges traditional legal frameworks and what the future of regulation might look like. A collaboration with QLS taking place on Friday 4 September (Week 7).",
    date: "4 September 2026",
    time: "TBA",
    location: "Queensland Law Society House",
    link: null,
  },
  {
    id: 12,
    title: "Legal Tech Challenge",
    badge: "Landmark Event",
    image: "/lits-slideshow-8.jpg",
    description:
      "An interactive event that encourages students to design innovative technology-based solutions to real-world legal problems. Participants pitch their ideas to a panel of industry judges. No coding experience required — only a passion for creativity, problem-solving and innovation.",
    date: "2–4 October 2026",
    time: "Fri 5–8PM · Sat 10AM–5PM · Sun 1–5PM",
    location: "QUT Gardens Point Campus P Block Atrium",
    link: null,
  },
  {
    id: 13,
    title: "End-of-Semester 2 Social Drinks",
    badge: "Social Event",
    image: "/lits-social.jpg",
    description:
      "Celebrate the end of Semester 2 with drinks at Bot Bar. Connect with fellow members, share your experiences, and unwind after a great year of events.",
    date: "16 October 2026",
    time: "TBA",
    location: "Bot Bar",
    link: null,
  },
];

const PREVIOUS_EVENTS = [
  {
    id: 14,
    title: "Intro to Legal Tech",
    badge: "Workshop",
    image: "/lits-workshops.jpg",
    description:
      "Learn how lawyers use technology in practice, and how legal knowledge can be used to build and innovate new legal technologies.",
    date: "9 March 2026",
    time: "5:00 PM – 6:00 PM",
    location: "QUT Gardens Point Campus D-106",
    link: null,
    past: true,
  },
];

function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden" aria-label="Events hero">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tomorrow">
          Our Events
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto font-montserrat leading-relaxed">
          Join us for workshops, networking events, speaker series, and more.
          Explore the intersection of law and technology with industry leaders and fellow students.
        </p>
      </div>
    </section>
  );
}

function EventCard({ event }) {
  const badgeStyle = BADGE_STYLES[event.badge] || "bg-white/10 text-white/80 border-white/20";

  return (
    <Tiltable tiltOptions={{ maxTilt: 6, scale: 1.02 }}>
      <div className={`group bg-white/5 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-white/25 transition-all duration-300 hover:bg-white/8 flex flex-col h-full ${event.past ? "opacity-60" : ""}`}>
        {/* Event Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Badge */}
          <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full border font-rubik ${badgeStyle}`}>
            {event.badge}
          </span>
          {event.past && (
            <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border font-rubik bg-white/10 text-white/60 border-white/20">
              Past
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-white mb-3 font-tomorrow leading-tight">
            {event.title}
          </h3>
          <p className="text-white/70 font-montserrat text-sm leading-relaxed mb-4 flex-1">
            {event.description}
          </p>

          {/* Meta */}
          <div className="space-y-1.5 text-white/60 text-sm font-montserrat mb-4">
            <span className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0" /> {event.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0" /> {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0" /> {event.location}
            </span>
          </div>

          {/* CTA */}
          {event.link ? (
            <TiltableAnchor
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-white/20 to-white/10 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-white/30 hover:to-white/20 border border-white/30 transition-all duration-300 font-rubik text-sm"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              {event.linkLabel || "Register"} <ArrowRight className="h-4 w-4" />
            </TiltableAnchor>
          ) : !event.past ? (
            <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-rubik text-sm text-white/40 border border-white/10 cursor-not-allowed">
              Registration Coming Soon
            </div>
          ) : null}
        </div>
      </div>
    </Tiltable>
  );
}

function EventsSection({ title, events }) {
  return (
    <section className="py-12 relative" aria-label={`${title} events`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-xs font-bold tracking-widest text-primary uppercase font-rubik mb-8">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
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
        <div className="pb-24">
          <EventsSection title="Semester 1" events={SEMESTER_1} />
          <EventsSection title="Semester 2" events={SEMESTER_2} />
          <EventsSection title="Previous Events" events={PREVIOUS_EVENTS} />
        </div>
      </main>
    </div>
  );
}

export default Events;
