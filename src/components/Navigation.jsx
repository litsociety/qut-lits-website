import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { URLS } from "../constants";

const Navigation = memo(function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleJoinClick = () => {
    window.open(URLS.membership, '_blank');
  };

  const handleNavigationClick = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  const navigationItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/events", label: "Events" },
    { to: "/sponsors", label: "Sponsors" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <motion.nav
      className={"sticky top-0 z-50 transition-all duration-300 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg h-20"}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full h-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={handleNavigationClick}
            aria-label="QUT LITS Home"
          >
            <div className="relative">
              <img
                src="/apple-touch-logo.png"
                alt="QUT LITS Logo"
                className="h-10 w-10 rounded-xl transition-transform duration-300"
                loading="eager"
                width="40"
                height="40"
                role="img"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={(e) => {
                  handleNavigationClick();
                  setTimeout(() => e.currentTarget.blur(), 100);
                }}
                className="relative text-white/90 hover:text-white transition-colors duration-300 font-rubik font-medium px-4 py-2 rounded-xl hover:bg-white/10 group focus:outline-none"
                aria-label={`Navigate to ${item.label} page`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleJoinClick}
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 hover:border-white/50 transition-all duration-300 font-rubik focus:outline-none"
              aria-label="Join QUT LITS - Opens in new tab"
            >
              Join Now
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors duration-300 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 z-50 bg-gradient-to-br from-dark-blue via-dark-purple to-dark-blue rounded-xl border border-primary/30 mt-2 mx-4 overflow-hidden shadow-2xl"
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleNavigationClick();
                  setTimeout(() => e.currentTarget.blur(), 100);
                }}
                className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200 font-rubik focus:outline-none"
                role="menuitem"
                aria-label={`Navigate to ${item.label} page`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
