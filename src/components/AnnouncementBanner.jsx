import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

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
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden z-[60] relative"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut", delay: 0.08 }}
            style={{
              background: "#07011a",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
            {/* Left: live dot + text */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Pulsing live dot */}
              <span className="relative flex-shrink-0 h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c2cb] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c2cb]" />
              </span>

              <p className="text-sm font-rubik leading-snug text-white/80 truncate sm:whitespace-normal">
                <span className="font-semibold text-white tracking-tight">
                  Legal Tech Challenge
                </span>
                <span className="text-white/30 mx-2">·</span>
                <span>27–29 March 2026</span>
                <span className="text-white/30 mx-2 hidden sm:inline">·</span>
                <span className="hidden sm:inline">
                  P Block Atrium, QUT Gardens Point
                </span>
              </p>
            </div>

            {/* Right: badge + CTA + dismiss */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Early Bird badge */}
              <span
                className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold font-rubik tracking-wide"
                style={{
                  border: "1px solid rgba(0,194,203,0.35)",
                  color: "#00c2cb",
                  background: "rgba(0,194,203,0.08)",
                }}
              >
                Early Bird $15
              </span>

              {/* Register CTA */}
              <a
                href={REGISTER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold font-rubik px-3.5 py-1.5 rounded transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.9)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00c2cb";
                  e.currentTarget.style.color = "#00c2cb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                }}
              >
                Register
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              {/* Dismiss */}
              <button
                onClick={dismiss}
                className="text-white/25 hover:text-white/60 transition-colors duration-200 p-1 rounded"
                aria-label="Dismiss announcement"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
