import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "./AppHeader.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Recipes", path: "/recipes" },
  { name: "Favorites", path: "/favorites" },
  { name: "Videos", path: "/videos" },
];

function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`app-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        {/* LOGO */}
        <Link to="/" className="brand-logo">
          <span className="brand-icon">🍃</span>
          <span className="brand-text">CleanMeal</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-item ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* MOBILE TOGGLE */}
        <div className="auth-section">
          <button 
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-nav shadow-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="mobile-nav-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default AppHeader;
