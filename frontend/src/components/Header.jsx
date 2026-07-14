// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { FaHome, FaBoxOpen, FaHeadset, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/safaricom.jpg";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsMobile(window.innerWidth <= 480);
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Close menu when clicking a link
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header style={{
        ...styles.header,
        ...(scrolled && styles.headerScrolled)
      }}>
        {/* LEFT SIDE - LOGO */}
        <div style={styles.left}>
          <Link to="/home" style={styles.logoLink}>
            <div style={styles.logoContainer}>
              <img 
                src={logo} 
                alt="Fuliza Boost Logo" 
                style={styles.logoImage}
              />
              <div style={styles.logoText}>
                <h1 style={styles.logo}>Fuliza Boost</h1>
                <p style={styles.tagline}>Increase your limit instantly</p>
              </div>
            </div>
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        {!isMobile && (
          <nav style={styles.nav}>
            <Link to="/home" style={styles.navLink}>
              <FaHome />
              <span>Home</span>
            </Link>
            <Link to="/packages" style={styles.navLink}>
              <FaBoxOpen />
              <span>Packages</span>
            </Link>
            <Link to="/support" style={styles.navLink}>
              <FaHeadset />
              <span>Support</span>
            </Link>
          </nav>
        )}

        {/* RIGHT SIDE - ACTIONS */}
        <div style={styles.right}>
          <button style={styles.notificationBtn} aria-label="Notifications">
            <FaBell />
            <span style={styles.notificationBadge}>3</span>
          </button>

          <button style={styles.ctaBtn} onClick={() => navigate("/packages")}>
            Get Started
          </button>

          {/* MOBILE MENU BUTTON */}
          {isMobile && (
            <button 
              style={styles.menuBtn} 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>
      </header>

      {/* MOBILE SIDEBAR MENU */}
      {isMobile && (
        <div style={{
          ...styles.mobileMenuOverlay,
          ...(isMenuOpen && styles.mobileMenuOverlayOpen)
        }} onClick={toggleMenu}>
          <div style={{
            ...styles.mobileMenu,
            ...(isMenuOpen && styles.mobileMenuOpen)
          }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.mobileMenuHeader}>
              <img src={logo} alt="Logo" style={styles.mobileMenuLogo} />
              <button style={styles.mobileMenuClose} onClick={toggleMenu}>
                <FaTimes />
              </button>
            </div>
            
            <div style={styles.mobileMenuItems}>
              <Link to="/home" style={styles.mobileNavLink} onClick={handleNavClick}>
                <FaHome /> <span>Home</span>
              </Link>
              <Link to="/packages" style={styles.mobileNavLink} onClick={handleNavClick}>
                <FaBoxOpen /> <span>Packages</span>
              </Link>
              <Link to="/support" style={styles.mobileNavLink} onClick={handleNavClick}>
                <FaHeadset /> <span>Support</span>
              </Link>
            </div>
            
            <button style={styles.mobileCta} onClick={() => {
              navigate("/packages");
              handleNavClick();
            }}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "linear-gradient(135deg, #00a651, #00c853)",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  
  headerScrolled: {
    padding: "8px 20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },

  left: {
    display: "flex",
    alignItems: "center",
  },

  logoLink: {
    textDecoration: "none",
    color: "white",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoImage: {
    width: "clamp(35px, 6vw, 45px)",
    height: "clamp(35px, 6vw, 45px)",
    borderRadius: "10px",
    objectFit: "contain",
  },

  logoText: {
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    margin: 0,
    fontSize: "clamp(16px, 4vw, 24px)",
    fontWeight: "bold",
    lineHeight: 1.2,
  },

  tagline: {
    margin: 0,
    fontSize: "clamp(8px, 3vw, 12px)",
    opacity: 0.9,
    display: "block",
  },

  nav: {
    display: "flex",
    gap: "clamp(10px, 3vw, 25px)",
  },

  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
    fontSize: "clamp(13px, 2.5vw, 16px)",
    padding: "8px 12px",
    borderRadius: "8px",
    whiteSpace: "nowrap",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 2vw, 15px)",
  },

  notificationBtn: {
    position: "relative",
    border: "none",
    background: "rgba(255,255,255,0.2)",
    color: "white",
    width: "clamp(35px, 6vw, 40px)",
    height: "clamp(35px, 6vw, 40px)",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "clamp(14px, 3vw, 16px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },

  notificationBadge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#ff4444",
    color: "white",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  ctaBtn: {
    border: "none",
    background: "white",
    color: "#00a651",
    padding: "8px 16px",
    borderRadius: "30px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "clamp(12px, 2.5vw, 14px)",
    whiteSpace: "nowrap",
  },

  menuBtn: {
    border: "none",
    background: "rgba(255,255,255,0.2)",
    color: "white",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },

  // Mobile Menu Styles
  mobileMenuOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0)",
    zIndex: 999,
    pointerEvents: "none",
    transition: "background 0.3s ease",
  },

  mobileMenuOverlayOpen: {
    background: "rgba(0,0,0,0.5)",
    pointerEvents: "auto",
  },

  mobileMenu: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "min(280px, 85%)",
    height: "100vh",
    background: "white",
    boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
    zIndex: 1000,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    overflowY: "auto",
  },

  mobileMenuOpen: {
    transform: "translateX(0)",
  },

  mobileMenuHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "15px",
    borderBottom: "1px solid #eee",
  },

  mobileMenuLogo: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    objectFit: "contain",
  },

  mobileMenuClose: {
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
    padding: "5px",
  },

  mobileMenuItems: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flex: 1,
  },

  mobileNavLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    color: "#333",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "500",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    backgroundColor: "#f8f9fa",
  },

  mobileCta: {
    marginTop: "20px",
    padding: "14px",
    background: "linear-gradient(135deg, #00a651, #00c853)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// Add hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @media (max-width: 480px) {
    .header-tagline {
      display: none;
    }
  }
  
  @media (max-width: 380px) {
    .header-logo {
      font-size: 14px !important;
    }
    .cta-btn {
      padding: 6px 12px !important;
      font-size: 11px !important;
    }
  }
  
  /* Hover effects for desktop */
  @media (min-width: 769px) {
    .nav-link:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }
    
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    
    .notification-btn:hover {
      background: rgba(255,255,255,0.3);
      transform: scale(1.05);
    }
    
    .mobile-nav-link:hover {
      background: #e8f5e9;
      transform: translateX(5px);
    }
  }
  
  /* Touch-friendly for mobile */
  @media (max-width: 768px) {
    .mobile-nav-link:active {
      background: #e8f5e9;
      transform: scale(0.98);
    }
    
    button:active {
      transform: scale(0.95);
    }
  }
`;
document.head.appendChild(styleSheet);