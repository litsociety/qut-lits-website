import React, { useMemo, useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Code, Network, BookOpen, Award, Sparkles, Rocket, CalendarPlus } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { CTASection } from "../components/Footer";
import { Tiltable, TiltableAnchor } from "../components/Tiltable";
import { generateICS, generateICSForAllEvents, downloadICS } from "../utils/calendar";
import CalendarSubscriptionModal from "../components/CalendarSubscriptionModal";

// Event category definitions
const EVENT_CATEGORIES = {
  workshop: {
    label: "Workshop",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/30"
  },
  networking: {
    label: "Networking",
    icon: Network,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-500/30"
  },
  social: {
    label: "Social Event",
    icon: Sparkles,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/20",
    borderColor: "border-yellow-500/30"
  },
  landmark: {
    label: "Landmark Event",
    icon: Award,
    color: "from-primary to-purple",
    bgColor: "bg-primary/20",
    borderColor: "border-primary/30"
  }
};

// Events data from QUTLITS 2026 Prospectus
const EVENTS = [
  // FEBRUARY - SEMESTER 1
  {
    id: 1,
    title: "O Week Day 1",
    category: "social",
    date: "2026-02-17",
    time: "All Day",
    location: "QUT Gardens Point Campus",
    description: "Join us at our O Week stall! Meet the team, learn about QUT LITS, and discover how you can get involved in the intersection of law and technology.",
    image: "/lits-slideshow-9.jpeg",
    icon: Sparkles,
    registrationLink: "#"
  },
  {
    id: 2,
    title: "O Week Day 2",
    category: "social",
    date: "2026-02-18",
    time: "All Day",
    location: "QUT Gardens Point Campus",
    description: "Continue the O Week celebrations! Visit our stall, participate in activities, and connect with fellow students interested in law and technology.",
    image: "/lits-slideshow-9.jpeg",
    icon: Sparkles,
    registrationLink: "#"
  },
  {
    id: 3,
    title: "Welcome Coffee (Semester 1)",
    category: "social",
    date: "2026-02-26",
    time: "11:00 AM",
    location: "Merlo Coffee, Gardens Point",
    description: "Kick off the semester with a casual welcome coffee event at Merlo. Meet new members, reconnect with friends, and learn about upcoming events and opportunities.",
    image: "/lits-slideshow-9.jpeg",
    icon: Sparkles,
    registrationLink: "#"
  },
  
  // MARCH
  {
    id: 4,
    title: "Intro to Tech Law",
    category: "workshop",
    date: "2026-03-02",
    time: "5:00 PM – 6:00 PM",
    location: "QUT Gardens Point Campus D-106",
    description: "An introductory workshop exploring the intersection of technology and law. Learn about key legal frameworks, regulations, and challenges in the tech industry. Perfect for students new to tech law.",
    image: "/lits-slideshow-7.jpg",
    icon: Code,
    registrationLink: "https://campus.hellorubric.com/?eid=53721"
  },
  {
    id: 5,
    title: "Intro to Legal Tech",
    category: "workshop",
    date: "2026-03-09",
    time: "5:00 PM – 6:00 PM",
    location: "QUT Gardens Point Campus D-106",
    description: "Discover how technology is transforming the legal profession. This workshop covers legal technology tools, automation, and innovation in legal practice. No prior experience required.",
    image: "/lits-slideshow-7.jpg",
    icon: Code,
    registrationLink: "https://campus.hellorubric.com/?eid=53722"
  },
  {
    id: 6,
    title: "Technology in Legal Investigations",
    category: "workshop",
    date: "2026-03-23",
    time: "5:00 PM – 6:00 PM",
    location: "QUT Gardens Point Campus D-106",
    description: "Explore how technology is revolutionizing legal investigations. Learn about digital forensics, e-discovery, data analysis, and other tech tools used in modern legal investigations.",
    image: "/lits-slideshow-7.jpg",
    icon: Code,
    registrationLink: "https://campus.hellorubric.com/?eid=53724"
  },
  {
    id: 7,
    title: "Faculty of Science – Welcome & Connect Event",
    category: "workshop",
    date: "2026-03-04",
    time: "11:00 AM – 3:00 PM",
    location: "QUT Gardens Point Campus",
    description: "Join us for the Faculty of Science Welcome and Connect event. Connect with students and faculty across science and law disciplines. This is a faculty-hosted event.",
    image: "/lits-slideshow-7.jpg",
    icon: Users,
    registrationLink: "#"
  },
  {
    id: 8,
    title: "QUTIES Mega Launch",
    category: "workshop",
    date: "2026-03-07",
    time: "TBA",
    location: "QUT Gardens Point Campus",
    description: "Attend the QUTIES Mega Launch event. Connect with innovation and entrepreneurship communities at QUT. This event is hosted by other clubs.",
    image: "/lits-slideshow-7.jpg",
    icon: Rocket,
    registrationLink: "#"
  },
  {
    id: 9,
    title: "Mel Storey – Book Tour Event",
    category: "workshop",
    date: "2026-03-18",
    time: "6:15 PM",
    location: "QUT Gardens Point Campus Gibson Room",
    description: "Join us for Mel Storey's book tour event. An opportunity to engage with thought leadership in law and technology. This event requires co-operation with QUTLS and possibly QLS.",
    image: "/lits-slideshow-7.jpg",
    icon: BookOpen,
    registrationLink: "https://campus.hellorubric.com/?eid=53921"
  },
  {
    id: 10,
    title: "Legal Tech Challenge",
    category: "landmark",
    date: "2026-03-27",
    displayDate: "27, 28 & 29 March 2026",
    time: "Fri 5–8PM · Sat 10AM–5PM · Sun 1–5PM",
    location: "QUT Gardens Point Campus P Block Atrium",
    description: "An interactive event that encourages students to design innovative technology-based solutions to real-world legal problems. Participants pitch their ideas to a panel of industry judges. No coding experience required, only a passion for creativity, problem-solving and innovation. Runs Friday 27 March (5–8PM), Saturday 28 March (10AM–5PM), and Sunday 29 March (1–5PM). Early Bird tickets $15, General Admission from 13 March at $30.",
    image: "/lits-slideshow-8.jpg",
    icon: Code,
    registrationLink: "https://campus.hellorubric.com/?eid=55497"
  },
  
  // APRIL
  {
    id: 11,
    title: "Law & Tech Networking Night",
    category: "landmark",
    date: "2026-04-16",
    time: "6:00 PM - 9:00 PM",
    location: "Clayton Utz",
    description: "Our premier event connecting students with professionals working at the intersection of law and technology. From privacy and cybersecurity to AI governance and digital innovation, this event highlights how technology is reshaping the legal landscape. Features panel discussions and networking sessions. Preferred date: Thursday 16 April (Week 7).",
    image: "/lits-slideshow-6.jpg",
    icon: Network,
    registrationLink: "#"
  },
  
  // MAY
  {
    id: 12,
    title: "End-of-Semester 1 Social Drinks",
    category: "social",
    date: "2026-05-22",
    time: "TBA",
    location: "Bot Bar",
    description: "Celebrate the end of Semester 1 with drinks at Bot Bar. Connect with fellow members, share your experiences, and unwind after a great semester of events.",
    image: "/lits-slideshow-9.jpeg",
    icon: Sparkles,
    registrationLink: "#"
  },
  
  // JULY - SEMESTER 2
  {
    id: 13,
    title: "Semester 2 Orientation Week",
    category: "social",
    date: "2026-07-13",
    time: "All Day",
    location: "QUT Gardens Point Campus",
    description: "Join us at our Semester 2 O Week stall! Meet the team, learn about QUT LITS, and discover upcoming events for the second semester. O Week runs from Monday 13 July to Friday 17 July.",
    image: "/lits-slideshow-9.jpeg",
    icon: Sparkles,
    registrationLink: "#"
  },
  {
    id: 14,
    title: "Welcome Coffee (Semester 2)",
    category: "social",
    date: "2026-07-14",
    time: "TBA",
    location: "Merlo Coffee, Gardens Point",
    description: "Kick off Semester 2 with a casual welcome coffee event at Merlo. Meet new members, reconnect with friends, and learn about upcoming events.",
    image: "/lits-slideshow-9.jpeg",
    icon: Sparkles,
    registrationLink: "#"
  },
  {
    id: 15,
    title: "QUT Open Day",
    category: "workshop",
    date: "2026-07-27",
    time: "All Day",
    location: "QUT Gardens Point Campus",
    description: "Join us at QUT Open Day to showcase QUT LITS to prospective students. Learn about our society and the opportunities we offer. Date is tentative.",
    image: "/lits-slideshow-7.jpg",
    icon: Users,
    registrationLink: "#"
  },
  
  // AUGUST
  {
    id: 16,
    title: "QUT Tech Industry Night",
    category: "landmark",
    date: "2026-08-14",
    time: "6:00 PM - 9:00 PM",
    location: "QUT Garden Theatre",
    description: "The largest networking event for technology-focused students at QUT, hosted in collaboration with other leading tech societies. This flagship event brings together over 200 attendees from diverse disciplines to engage directly with professionals shaping the future of technology and innovation.",
    image: "/lits-slideshow-6.jpg",
    icon: Network,
    registrationLink: "#"
  },
  
  // SEPTEMBER
  {
    id: 17,
    title: "Innovate & Regulate – Law & Technology Panel",
    category: "landmark",
    date: "2026-09-04",
    time: "TBA",
    location: "Queensland Law Society House",
    description: "Our flagship thought-leadership event, bringing together leading professionals, academics and students to explore how innovation challenges traditional legal frameworks and what the future of regulation might look like. Encourages critical discussion on how emerging technologies can be governed responsibly and ethically. This event is a collaboration with QLS and takes place on Friday 4 September (Week 7).",
    image: "/lits-slideshow-7.jpg",
    icon: Users,
    registrationLink: "#"
  },
  
  // OCTOBER
  {
    id: 18,
    title: "End-of-Semester 2 Social Drinks",
    category: "social",
    date: "2026-10-16",
    time: "TBA",
    location: "Bot Bar",
    description: "Celebrate the end of Semester 2 with drinks at Bot Bar. Connect with fellow members, share your experiences, and unwind after a great year of events. This event takes place on Friday 16 October (Week 12).",
    image: "/lits-slideshow-9.jpeg",
    icon: Sparkles,
    registrationLink: "#"
  }
];

const HeroSection = memo(function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscribeToAll = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDownloadAll = useCallback(() => {
    const icsContent = generateICSForAllEvents(EVENTS);
    downloadICS(icsContent, 'qut-lits-events-2026.ics');
  }, []);

  return (
    <section className="relative pt-32 pb-16 overflow-hidden" aria-label="Events section">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-rubik text-white/90">Upcoming Events</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tomorrow leading-tight">
          Our Events
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 font-montserrat max-w-4xl mx-auto leading-relaxed mb-8">
          Join us for workshops, networking events, speaker series, and more. 
          Explore the intersection of law and technology with industry leaders and fellow students.
        </p>

        {/* Subscribe to All Events Button */}
        <Tiltable
          tiltOptions={{ maxTilt: 3, scale: 1.02 }}
          className="inline-block"
        >
          <button
            onClick={handleSubscribeToAll}
            className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-primary/50 rounded-full px-6 py-3 transition-all duration-300 font-rubik text-white"
            aria-label="Subscribe to all events"
          >
            <CalendarPlus className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-semibold">Subscribe to All Events</span>
          </button>
        </Tiltable>

        {/* Calendar Subscription Modal */}
        <CalendarSubscriptionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onDownload={handleDownloadAll}
          eventTitle={null}
        />
      </div>
    </section>
  );
});

const EventCard = memo(function EventCard({ event, isPrevious }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = useMemo(() => {
    if (event.displayDate) return event.displayDate;
    const eventDate = new Date(event.date);
    const isValidDate = !isNaN(eventDate.getTime()) && event.date !== "2026-12-31";
    return isValidDate
      ? eventDate.toLocaleDateString('en-AU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : "Date TBA";
  }, [event.date, event.displayDate]);

  const category = useMemo(() => EVENT_CATEGORIES[event.category] || EVENT_CATEGORIES.workshop, [event.category]);
  const CategoryIcon = category.icon;

  const handleAddToCalendar = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDownload = useCallback(() => {
    const icsContent = generateICS(event);
    const filename = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    downloadICS(icsContent, filename);
  }, [event]);

  return (
    <Tiltable tiltOptions={{ maxTilt: 5, scale: 1.02 }} className="h-full">
      <div className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-200 hover:bg-white/10 h-full flex flex-col">
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 will-change-transform"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = "/lits-slideshow-5.jpg"; // Fallback image
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <div className={`flex items-center gap-2 ${category.bgColor} backdrop-blur-md rounded-full px-3 py-1.5 border ${category.borderColor}`}>
              <CategoryIcon className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-semibold text-white font-rubik">
                {category.label}
              </span>
            </div>
          </div>

          {/* Add to Calendar Icon */}
          <div className="absolute top-4 right-4">
            <Tiltable
              tiltOptions={{ maxTilt: 3, scale: 1.1 }}
              className="inline-block"
            >
              <button
                onClick={handleAddToCalendar}
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-primary/50 rounded-full p-2.5 transition-all duration-200 inline-block"
                aria-label={`Add ${event.title} to calendar`}
                title="Add to calendar"
              >
                <CalendarPlus className="h-4 w-4 text-white group-hover:text-primary transition-colors duration-300" />
              </button>
            </Tiltable>
          </div>

        </div>

        {/* Event Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-white mb-4 font-tomorrow group-hover:text-primary transition-colors duration-200">
            {event.title}
          </h3>
          
          <p className="text-white/80 font-montserrat mb-6 leading-relaxed flex-1">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-white/70">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-montserrat text-sm">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-montserrat text-sm">{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-montserrat text-sm">{event.location}</span>
            </div>
          </div>

          {/* CTA Button */}
          {!isPrevious && (
            event.registrationLink && event.registrationLink !== "#" ? (
              <TiltableAnchor
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-purple text-white px-6 py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-lg hover:shadow-primary/25 font-rubik"
                tiltOptions={{ maxTilt: 4, scale: 1.02 }}
              >
                Register Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </TiltableAnchor>
            ) : (
              <div className="inline-flex items-center justify-center gap-2 bg-white/10 text-white/60 px-6 py-3 rounded-xl font-semibold font-rubik cursor-not-allowed">
                Registration Coming Soon
              </div>
            )
          )}
        </div>

        {/* Calendar Subscription Modal */}
        <CalendarSubscriptionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onDownload={handleDownload}
          eventTitle={event.title}
        />
      </div>
    </Tiltable>
  );
});

function EventLegend() {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="text-center">
        <p className="text-sm text-white/60 font-montserrat mb-4">Event Categories</p>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.entries(EVENT_CATEGORIES).map(([key, category]) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={key}
                className={`flex items-center gap-2 ${category.bgColor} backdrop-blur-md rounded-full px-3 py-1.5 border ${category.borderColor}`}
              >
                <CategoryIcon className="h-3.5 w-3.5 text-white" />
                <span className="text-xs font-semibold text-white font-rubik">{category.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EventsSection() {
  const today = useMemo(() => new Date(), []);

  const { previousEvents, sem1Events, sem2Events } = useMemo(() => {
    const byDate = (a, b) => new Date(a.date) - new Date(b.date);
    const sorted = [...EVENTS].sort(byDate);

    const previous = [];
    const sem1 = [];
    const sem2 = [];

    sorted.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate < today) {
        previous.unshift(event); // most recent first
      } else {
        const month = eventDate.getMonth() + 1; // 1–12
        if (month <= 6) {
          sem1.push(event);
        } else {
          sem2.push(event);
        }
      }
    });

    return { previousEvents: previous, sem1Events: sem1, sem2Events: sem2 };
  }, [today]);

  const renderGrid = (events, baseDelay = 0, isPrevious = false) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: Math.min((baseDelay + index) * 0.03, 0.4),
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <EventCard event={event} isPrevious={isPrevious} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="py-16 relative" aria-label="Events listing section">
      <div className="max-w-7xl mx-auto px-6 space-y-20">

        {/* ── Upcoming Events ── */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-10 font-tomorrow">
            Upcoming Events
          </h2>

          {sem1Events.length === 0 && sem2Events.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-white/30 mx-auto mb-4" />
              <p className="text-xl text-white/60 font-montserrat">
                No upcoming events scheduled. Check back soon!
              </p>
            </div>
          )}

          {sem1Events.length > 0 && (
            <div className="mb-14">
              <h3 className="text-xl font-semibold text-primary mb-6 font-rubik uppercase tracking-widest">
                Semester 1
              </h3>
              {renderGrid(sem1Events, 0)}
            </div>
          )}

          {sem2Events.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-primary mb-6 font-rubik uppercase tracking-widest">
                Semester 2
              </h3>
              {renderGrid(sem2Events, sem1Events.length)}
            </div>
          )}
        </div>

        {/* ── Previous Events ── */}
        {previousEvents.length > 0 && (
          <div>
            <h2 className="text-4xl font-bold text-white mb-10 font-tomorrow">
              Previous Events
            </h2>
            {renderGrid(previousEvents, sem1Events.length + sem2Events.length, true)}
          </div>
        )}

        <EventLegend />
      </div>
    </section>
  );
}

// CTASection imported from shared Footer component - uses custom title/description
function EventsCTASection() {
  return (
    <CTASection 
      title="Stay Updated"
      description="Follow us on social media to stay up to date with all our upcoming events, workshops, and networking opportunities."
      secondaryCTA={{ text: "Contact Us", to: "/contact" }}
    />
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
        <EventsSection />
        <EventsCTASection />
      </main>
    </div>
  );
}

export default Events;
