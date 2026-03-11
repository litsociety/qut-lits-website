import React, { useState } from "react";
import { X, ArrowRight } from "lucide-react";

const ANNOUNCEMENT = {
  title: "Technology in Legal Investigations",
  date: "9 March 2026",
  time: "5:00–6:00 PM",
  location: "D-106, QUT Gardens Point",
  badge: "Free",
  link: "https://campus.hellorubric.com/?eid=53722",
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
    <div className="relative z-50 w-full bg-black/80 backdrop-blur-sm border-b border-white/10 text-white text-sm px-4 py-2 flex items-center justify-between gap-4">
      {/* Pulsing dot */}
      <div className="shrink-0 relative flex items-center justify-center w-4 h-4">
        <span className="absolute inline-flex h-3 w-3 rounded-full bg-primary opacity-75 animate-ping"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-2 flex-wrap">
        <span className="font-bold font-rubik">{ANNOUNCEMENT.title}</span>
        <span className="text-white/40">·</span>
        <span className="text-white/80">{ANNOUNCEMENT.date} · {ANNOUNCEMENT.time}</span>
        <span className="text-white/40">·</span>
        <span className="text-white/80">{ANNOUNCEMENT.location}</span>
        <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-semibold px-2 py-0.5 rounded-full font-rubik">
          {ANNOUNCEMENT.badge}
        </span>
        <a
          href={ANNOUNCEMENT.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-white hover:text-primary transition-colors duration-200 font-rubik"
        >
          Register <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-1 rounded hover:bg-white/10 transition-colors duration-200"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4 text-white/60" />
      </button>
    </div>
  );
}
