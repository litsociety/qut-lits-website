import React, { useState } from "react";
import { ArrowRight, Calendar, Clock, MapPin, CalendarPlus } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { Tiltable, TiltableAnchor } from "../components/Tiltable";
import CalendarModal from "../components/CalendarModal";
import { generateICS, downloadICS } from "../utils/generateICS";

// Badge style map
const BADGE_STYLES = {
  "Workshop":       "bg-white/10 text-white/70 border-white/20",
  "Collaboration":  "bg-white/10 text-white/70 border-white/20",
  "Landmark Event": "bg-white/15 text-white/80 border-white/25",
  "Social Event":   "bg-white/10 text-white/70 border-white/20",
};

// All events with optional ICS date data (dtstart/dtend as YYYYMMDDTHHMMSS or YYYYMMDD)
const SEMESTER_1 = [
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
    dtstart: "20260522",
    allDay: true,
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
    dtstart: "20260713",
    allDay: true,
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
    dtstart: "20260714",
    allDay: true,
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
    dtstart: "20260727",
    allDay: true,
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
    dtstart: "20260814T180000",
    dtend:   "20260814T210000",
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
    dtstart: "20260904",
    allDay: true,
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
    dtstart: "20261002T170000",
    dtend:   "20261004T170000",
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
    dtstart: "20261016",
    allDay: true,
  },
];

const PREVIOUS_EVENTS = [
  {
    id: 4,
    title: "Law & Tech Networking Night",
    badge: "Landmark Event",
    image: "/law-tech-networking-night.jpg",
    description:
      "Our premier event connecting students with professionals working at the intersection of law and technology. From privacy and cybersecurity to AI governance and digital innovation, this event highlighted how technology is reshaping the legal landscape, featuring panel discussions and networking sessions.",
    date: "16 April 2026",
    time: "6:00 PM – 9:00 PM",
    location: "Clayton Utz",
    link: null,
    past: true,
  },
  {
    id: 2,
    title: "Technology in Legal Investigations",
    badge: "Workshop",
    image: "/lits-workshops.jpg",
    description:
      "A practical workshop exploring the intersection of law and technology through a mock legal investigation, demonstrating how technology assists in discovering and understanding facts when they aren't immediately clear.",
    date: "23 March 2026",
    time: "5:00 PM – 6:00 PM",
    location: "QUT Gardens Point Campus D-106",
    link: null,
    past: true,
  },
  {
    id: 1,
    title: "Mel Storey – Book Tour Event",
    badge: "Collaboration",
    image: "/mel-storey-career-big-sis.jpg",
    description:
      "Join us for Mel Storey's book tour event. An opportunity to engage with thought leadership in law and technology. This event requires co-operation with QUTLS and possibly QLS.",
    date: "18 March 2026",
    time: "6:15 PM",
    location: "QUT Gardens Point Campus Gibson Room",
    link: null,
    past: true,
  },
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
  {
    id: 15,
    title: "QUTIES Mega Launch",
    badge: "Collaboration",
    image: "/lits-slideshow-7.jpg",
    description:
      "Attend the QUTIES Mega Launch event. Connect with innovation and entrepreneurship communities at QUT. This event is hosted by other clubs.",
    date: "7 March 2026",
    time: "TBA",
    location: "QUT Gardens Point Campus",
    link: null,
    past: true,
  },
  {
    id: 16,
    title: "Faculty of Science – Welcome & Connect Event",
    badge: "Workshop",
    image: "/lits-faculty-science.jpg",
    description:
      "Join us for the Faculty of Science Welcome and Connect event. Connect with students and faculty across science and law disciplines. This is a faculty-hosted event.",
    date: "4 March 2026",
    time: "11:00 AM – 3:00 PM",
    location: "QUT Gardens Point Campus",
    link: null,
    past: true,
  },
  {
    id: 17,
    title: "Intro to Tech Law",
    badge: "Workshop",
    image: "/lits-workshops.jpg",
    description:
      "An introduction to the major areas of tech law and how they connect back to traditional legal principles. This session is a great starting point for students interested in the Law & Tech Innovation minor.",
    date: "2 March 2026",
    time: "5:00 PM – 6:00 PM",
    location: "QUT Gardens Point Campus D-106",
    link: null,
    past: true,
  },
  {
    id: 18,
    title: "Welcome Coffee (Semester 1)",
    badge: "Social Event",
    image: "/welcome-coffee.jpg",
    description:
      "Kick off the semester with a casual welcome coffee event at Merlo. Meet new members, reconnect with friends, and learn about upcoming events and opportunities.",
    date: "26 February 2026",
    time: "11:00 AM",
    location: "Merlo Coffee, Gardens Point",
    link: null,
    past: true,
  },
  {
    id: 19,
    title: "O Week Day 2",
    badge: "Social Event",
    image: "/lits-oweek.jpg",
    description:
      "Continue the O Week celebrations! Visit our stall, participate in activities, and connect with fellow students interested in law and technology.",
    date: "18 February 2026",
    time: "All Day",
    location: "QUT Gardens Point Campus",
    link: null,
    past: true,
  },
  {
    id: 20,
    title: "O Week Day 1",
    badge: "Social Event",
    image: "/lits-oweek.jpg",
    description:
      "Join us at our O Week stall! Meet the team, learn about QUT LITS, and discover how you can get involved in the intersection of law and technology.",
    date: "17 February 2026",
    time: "All Day",
    location: "QUT Gardens Point Campus",
    link: null,
    past: true,
  },
];

const ALL_EVENTS = [...SEMESTER_1, ...SEMESTER_2, ...PREVIOUS_EVENTS];

// ─── Components ──────────────────────────────────────────────────────────────

function HeroSection({ onSubscribe }) {
  return (
    <section className="relative pt-32 pb-10 overflow-hidden" aria-label="Events hero">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tomorrow">
          Our Events
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto font-montserrat leading-relaxed mb-8">
          Join us for workshops, networking events, speaker series, and more.
          Explore the intersection of law and technology with industry leaders and fellow students.
        </p>
        <button
          onClick={onSubscribe}
          className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/30 rounded-full px-6 py-3 transition-all duration-300 font-rubik text-white text-sm"
          aria-label="Subscribe to all events"
        >
          <CalendarPlus className="h-4 w-4" />
          Subscribe to All Events
        </button>
      </div>
    </section>
  );
}

function EventCard({ event, onAddToCalendar }) {
  const badgeStyle = BADGE_STYLES[event.badge] || "bg-white/10 text-white/70 border-white/20";

  return (
    <Tiltable tiltOptions={{ maxTilt: 6, scale: 1.02 }}>
      <div className={`group bg-white/5 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-white/25 transition-all duration-300 hover:bg-white/8 flex flex-col h-full ${event.past ? "opacity-55" : ""}`}>
        {/* Image */}
        <div className="relative h-44 overflow-hidden shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full border font-rubik ${badgeStyle}`}>
            {event.badge}
          </span>
          {/* Per-event calendar button */}
          {!event.past && event.dtstart && (
            <button
              onClick={() => onAddToCalendar(event)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 transition-colors"
              title="Add to calendar"
              aria-label={`Add ${event.title} to calendar`}
            >
              <CalendarPlus className="h-3.5 w-3.5 text-white/70" />
            </button>
          )}
          {event.past && (
            <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border font-rubik bg-white/10 text-white/50 border-white/15">
              Past
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-white mb-3 font-tomorrow leading-tight">
            {event.title}
          </h3>
          <p className="text-white/65 font-montserrat text-sm leading-relaxed mb-4 flex-1">
            {event.description}
          </p>

          <div className="space-y-1.5 text-white/50 text-sm font-montserrat mb-4">
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

          {event.link ? (
            <TiltableAnchor
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 font-rubik text-sm hover:bg-white/90"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              {event.linkLabel || "Register"} <ArrowRight className="h-4 w-4" />
            </TiltableAnchor>
          ) : !event.past ? (
            <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-rubik text-sm text-white/35 border border-white/10 cursor-not-allowed select-none">
              Registration Coming Soon
            </div>
          ) : null}
        </div>
      </div>
    </Tiltable>
  );
}

function EventsSection({ title, events, onAddToCalendar }) {
  return (
    <section className="pt-0 pb-16 relative" aria-label={`${title} events`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-xs font-bold tracking-widest text-white/40 uppercase font-rubik mb-8">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onAddToCalendar={onAddToCalendar} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function Events() {
  const [showModal, setShowModal]         = useState(false);
  const [singleEvent, setSingleEvent]     = useState(null);

  const handleSubscribeAll = () => {
    setSingleEvent(null);
    setShowModal(true);
  };

  const handleAddSingle = (event) => {
    setSingleEvent(event);
    setShowModal(true);
  };

  // For a single-event download, pass only that event to the modal
  const modalEvents = singleEvent ? [singleEvent] : ALL_EVENTS;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <HeroSection onSubscribe={handleSubscribeAll} />
        <div className="pb-24">
          <EventsSection title="Semester 1" events={SEMESTER_1} onAddToCalendar={handleAddSingle} />
          <EventsSection title="Semester 2" events={SEMESTER_2} onAddToCalendar={handleAddSingle} />
          <EventsSection title="Previous Events" events={PREVIOUS_EVENTS} onAddToCalendar={handleAddSingle} />
        </div>
      </main>

      {showModal && (
        <CalendarModal
          events={modalEvents}
          onClose={() => { setShowModal(false); setSingleEvent(null); }}
        />
      )}
    </div>
  );
}

export default Events;
