import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, ArrowRight } from "lucide-react";

const STORAGE_KEY = "ltc-banner-dismissed-2026";
const REGISTER_LINK = "https://campus.hellorubric.com/?eid=55497";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden relative z-[60]"
          style={{
            background: "linear-gradient(90deg, #120458 0%, #3b0764 30%, #c521e0 65%, #00c2cb 100%)",
          }}
        >
          {/* Animated shimmer overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
            {/* Left: icon + text */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 bg-white/15 rounded-full p-1.5">
                <Trophy className="h-4 w-4 text-yellow-300" />
              </div>
              <p className="text-white text-sm font-rubik leading-snug truncate sm:whitespace-normal">
                <span className="font-bold">Legal Tech Challenge</span>
                <span className="text-white/80 mx-2 hidden sm:inline">·</span>
                <span className="text-white/80 hidden sm:inline">27–29 March 2026</span>
                <span className="text-white/80 mx-2 hidden md:inline">·</span>
                <span className="text-yellow-300 font-semibold hidden md:inline">Early Bird $15</span>
              </p>
            </div>

            {/* Centre: CTA */}
            <a
              href={REGISTER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 bg-white text-[#120458] text-xs sm:text-sm font-bold font-rubik px-4 py-1.5 rounded-full hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
            >
              Register Now
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            {/* Right: dismiss */}
            <button
              onClick={dismiss}
              className="flex-shrink-0 text-white/60 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
              aria-label="Dismiss announcement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
