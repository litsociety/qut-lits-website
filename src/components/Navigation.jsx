import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // No-op: keep effect in case future scroll behaviors are needed
  }, []);

  const handleJoinClick = () => {
    navigate('/');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  const handleNavigationClick = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  const navigationItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/events", label: "Events" },
    { to: "/learn", label: "Learn" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={"sticky top-0 z-50 transition-all duration-300 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg"}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-12 pt-4">
          <Link to="/" className="flex items-center gap-3 group" onClick={handleNavigationClick}>
            <div className="relative">
              <img src="./favicon.ico" alt="QUT LITS" className="h-10 w-10 rounded-xl transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-xl font-bold text-white font-tomorrow">QUT LITS</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={handleNavigationClick}
                className="relative text-white/90 hover:text-white transition-colors duration-300 font-rubik font-medium px-4 py-2 rounded-xl hover:bg-white/10 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleJoinClick}
              className="bg-gradient-to-r from-primary to-purple text-white px-6 py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 font-rubik shadow-lg hover:shadow-xl hover:scale-105"
            >
              Join Now
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, height: isMobileMenuOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white/10 backdrop-blur-md rounded-xl border border-white/20 mt-4 mx-2 overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavigationClick();
                }}
                className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navigation;
