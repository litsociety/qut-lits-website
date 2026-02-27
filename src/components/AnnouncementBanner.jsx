import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";

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
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden z-[60] relative bg-white/10 backdrop-blur-xl border-b border-white/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
            {/* Left: icon + text */}
            <div className="flex items-center gap-3 min-w-0">
              <Sparkles className="flex-shrink-0 h-4 w-4 text-primary" />
              <p className="text-sm font-rubik text-white/90 truncate sm:whitespace-normal">
                <span className="font-semibold text-white">Legal Tech Challenge</span>
                <span className="text-white/30 mx-2">·</span>
                <span className="text-white/80">27–29 March 2026</span>
                <span className="text-white/30 mx-2 hidden sm:inline">·</span>
                <span className="hidden sm:inline text-white/60">P Block Atrium, QUT</span>
              </p>
            </div>

            {/* Right: Early Bird text + Register + dismiss */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <span className="hidden md:block text-xs font-rubik text-white/50">
                Early Bird $15
              </span>
              <a
                href={REGISTER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-purple text-white text-xs sm:text-sm font-semibold font-rubik px-4 py-1.5 rounded-xl hover:opacity-90 transition-opacity duration-200 shadow-lg"
              >
                Register Now
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={dismiss}
                className="text-white/40 hover:text-white/80 transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
                aria-label="Dismiss announcement"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
