import React, { useState } from "react";
import { X, ArrowRight, MapPin, Clock } from "lucide-react";

const ANNOUNCEMENT = {
  title: "Technology in Legal Investigations",
  date: "9 March 2026",
  time: "5:00–6:00 PM",
  location: "D-106, QUT Gardens Point",
  badge: "Free",
  link: "https://campus.hellorubric.com/?eid=53724",
};

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem("announcementDismissed") === "true"
  );

  if (dismissed) return null;

  const handleDismiss = () => {
    sessionStorage.setItem("announcementDismissed", "true");
    setDismissed(true);
  };

  return (
    <div className="relative z-50 w-full overflow-hidden bg-[#111111]">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {/* Subtle bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left: pulsing dot + title */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Pulsing dot */}
          <div className="relative flex items-center justify-center w-3.5 h-3.5">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-white/40 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </div>
          <span className="font-bold font-rubik text-white text-sm tracking-wide hidden sm:block">
            {ANNOUNCEMENT.title}
          </span>
        </div>

        {/* Centre: meta info */}
        <div className="flex-1 flex items-center justify-center gap-3 flex-wrap text-xs font-montserrat text-white/60 min-w-0">
          <span className="font-bold font-rubik text-white text-sm tracking-wide sm:hidden">
            {ANNOUNCEMENT.title}
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Clock className="h-3 w-3 shrink-0" />
            {ANNOUNCEMENT.date} &middot; {ANNOUNCEMENT.time}
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap hidden md:flex">
            <MapPin className="h-3 w-3 shrink-0" />
            {ANNOUNCEMENT.location}
          </span>
        </div>

        {/* Right: badge + register + dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full font-rubik bg-white/10 text-white/80 border border-white/20 hidden sm:inline">
            {ANNOUNCEMENT.badge}
          </span>
          <a
            href={ANNOUNCEMENT.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white text-black font-semibold px-3 py-1 rounded-full text-xs font-rubik hover:bg-white/90 transition-colors duration-200 whitespace-nowrap"
          >
            Register <ArrowRight className="h-3 w-3" />
          </a>
          <button
            onClick={handleDismiss}
            className="p-1 rounded hover:bg-white/10 transition-colors duration-200"
            aria-label="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5 text-white/50" />
          </button>
        </div>
      </div>
    </div>
  );
}
