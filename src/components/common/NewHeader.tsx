import { Search } from "lucide-react";
import React, { useState, useEffect } from "react"; // Import React hooks

interface NewHeaderProps {
  userRole?: "faculty" | "student" | "hod" | "admin";
  userName?: string;
  onLogout?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToProfile?: () => void;
}

export function NewHeader({ userRole, userName, onLogout, onNavigateToLogin, onNavigateToProfile }: NewHeaderProps) {
  
  // This is the new function for the mouse tracking effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  // Add state to track if the page is scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  // Add an effect to listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Set state to true if scrolled more than 10px, else false
      setIsScrolled(window.scrollY > 10);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty array ensures this effect runs only once
  
  return (
    <>
      {/* Custom CSS Variables and Styles */}
      <style>{`
        :root {
          --maroon-color: #800000;
          --grey-text: rgb(77, 77, 77);
          --logo-height: 70px;
          --logo-bubble-padding: 15px;
          --logo-top-position: 25px; 
        }

        body {
          font-family: "GothamBook", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          margin: 0;
          background-color: #f4f4f4;
          padding-top: 91px; /* This pushes all page content down to prevent it from hiding under the fixed header (42px + 49px = 91px) */
        }

        .container {
          width: 90%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .site-header {
          position: fixed; /* Makes header permanent */
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000; /* High z-index to stay on top */
          font-family: "GothamBook", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        }

        /* Top Bar - Academic Utility Navigation */
        .top-bar {
          background-color: var(--maroon-color);
          color: white;
          font-family: "GothamBook", -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 400;
          font-size: 13px;
          height: 42px;
          line-height: 16px;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.02em;
        }

        .top-bar .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .top-nav-left,
        .top-nav-right {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .top-nav-left {
          justify-content: flex-start;
        }

        .top-nav-right {
          justify-content: flex-end;
        }

        .top-bar a {
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          transition: opacity 0.2s ease;
          font-weight: 500;
          letter-spacing: 0.5px;
          padding: 8px 0;
        }

        .top-bar a:hover {
          opacity: 0.85;
          text-decoration: underline;
        }

        .search-icon {
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        .search-icon:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .search-icon svg {
          display: block;
        }

        /* Main Header - Primary Navigation */
        .main-header-container {
          position: relative;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .main-header-bar {
          background: white;
          border-bottom-color: rgb(233, 233, 233);
          border-bottom-style: solid;
          border-bottom-width: 1px;
          box-sizing: border-box;
          margin: 0;
        }

        .logo-link {
          position: absolute;
          top: 42px;
          left: 50%;
          z-index: 10;
          background: white;
          border-radius: 100px;
          padding: var(--logo-bubble-padding);
          display: block;
          /* Add smooth transition for the transform property */
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          /* Set the default (large) state */
          transform: translate(-50%, -50%) scale(1.2);
        }

        /* Define the scrolled (normal) state */
        .site-header.scrolled .logo-link {
          transform: translate(-50%, -50%) scale(1);
        }

        .logo-link:hover {
          /* No shadow on hover */
        }

        .logo-image {
          height: var(--logo-height);
          width: auto;
          display: block;
        }

        /* Main Navigation - UChicago Style */
        .main-nav {
          display: flex;
          align-items: center;
          height: 49px;
          position: relative;
          z-index: 5;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          width: 100%;
          box-sizing: border-box;
        }

        .main-nav-left,
        .main-nav-right {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-basis: 50%;
          box-sizing: border-box;
        }

        .main-nav-left {
          justify-content: flex-end; 
          padding-right: 220px; /* Increased padding */
          padding-left: 20px;
        }

        .main-nav-right {
          justify-content: flex-start;
          padding-left: 220px; /* Increased padding */
          padding-right: 20px;
        }

        .logo-space {
          display: none;
        }

        .main-nav a {
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 13px;
          padding: 0;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          white-space: nowrap;
          color: var(--grey-text);
          font-family: "GothamBook", -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 49px;
          letter-spacing: 0.03em;
          position: relative;
          display: flex;
          align-items: center;
          height: 49px;
        }

        .main-nav a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background-color: var(--maroon-color);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .main-nav a.active {
          color: var(--maroon-color);
        }

        .main-nav a.active::after {
          width: 100%;
        }

        .main-nav a:not(.btn-cta):hover {
          color: var(--maroon-color);
        }

        .main-nav a:not(.btn-cta):hover::after {
          width: 100%;
        }

        /* --- CTA Button - NEW MOUSE-TRACKING STYLES --- */
        .btn-cta {
          border: 2px solid var(--maroon-color);
          color: var(--maroon-color);
          padding: 8px 16px;
          border-radius: 0;
          margin-left: 16px;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden; /* This is crucial */
          display: flex;
          align-items: center;
          height: auto;
          line-height: 1;
          z-index: 1; /* Ensure text is above the ::before element */
        }
        
        /* This is the new tracking element */
        .btn-cta::before {
          content: '';
          position: absolute;
          
          /* Position defaults to center, updates from JS */
          left: var(--x, 50%); 
          top: var(--y, 50%);
          
          transform: translate(-50%, -50%); /* Center it on the cursor */
          
          background: var(--maroon-color);
          width: 0px; /* Start as a dot */
          height: 0px;
          border-radius: 50%;
          
          /* Animate its size on hover */
          transition: width 0.4s ease, height 0.4s ease;
          z-index: -1; /* Place it behind the text */
        }

        .btn-cta:hover {
          color: white; /* Text turns white on hover */
          border-color: var(--maroon-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(128, 0, 0, 0.3);
        }

        .btn-cta:hover::before {
          /* Expand the circle to be larger than the button */
          width: 400px;
          height: 400px;
        }
        /* --- END of new CTA styles --- */

        /* --- NEW HERO SECTION STYLES --- */
        .hero-section {
          position: relative;
          width: 100%;
          /* This makes the section fill the screen below your 91px header */
          height: calc(100vh - 91px); 
          overflow: hidden; /* Hide video overflow */
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000; /* This black shows if video fails to load */
        }

        .hero-video {
          position: absolute;
          inset: 0; /* top:0; right:0; bottom:0; left:0 */
          width: 100%;
          height: 100%;
          z-index: 1; /* Place behind content */
          object-fit: cover; /* Ensure video covers the container */
          object-position: center center; /* Center the video content */
          display: block;
        }

        .hero-content {
          position: relative; /* Position content above video */
          z-index: 2;
          color: white;
          text-align: center;
          padding: 20px;
          max-width: 800px; /* Limit content width */
        }

        .hero-content h1 {
          font-family: "GothamBook", sans-serif; /* Use your preferred font */
          font-size: 3.5em; /* Adjust font size */
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .hero-content p {
          font-family: "GothamBook", sans-serif; /* Use your preferred font */
          font-size: 1.2em; /* Adjust font size */
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .hero-btn {
          display: inline-block;
          background-color: transparent;
          color: white;
          border: 2px solid var(--maroon-color); /* Maroon border */
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 0; /* Square corners */
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: "GothamBook", sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hero-btn:hover {
          background-color: var(--maroon-color); /* Maroon fill on hover */
          color: white;
        }

        /* Responsive adjustments for hero section */
        @media (max-width: 768px) {
          .hero-section {
            height: calc(100vh - 91px); /* Keep full height on mobile too */
          }
          .hero-content h1 {
            font-size: 2.5em;
          }
          .hero-content p {
            font-size: 1em;
          }
        }
        /* --- END HERO SECTION STYLES --- */


        /* Responsive Design */
        @media (max-width: 1200px) {
          .main-nav {
            max-width: 100%;
            padding: 0 16px;
          }
          
          .main-nav-left,
          .main-nav-right {
            gap: 20px;
          }
          
          .main-nav-left {
            padding-right: 150px;
            padding-left: 16px;
          }
          
          .main-nav-right {
            padding-left: 150px;
            padding-right: 16px;
          }
          
          .main-nav a {
            font-size: 12px;
            letter-spacing: 0.02em;
          }
        }

        @media (max-width: 1024px) {
          .main-nav {
            height: 45px;
          }
          
          .main-nav-left,
          .main-nav-right {
            gap: 16px;
          }
          
          .main-nav-left {
            padding-right: 120px;
            padding-left: 12px;
          }
          
          .main-nav-right {
            padding-left: 120px;
            padding-right: 12px;
          }
          
          .main-nav a {
            font-size: 11px;
            line-height: 45px;
            height: 45px;
          }
        }
        
        @media (max-width: 768px) {
          .top-bar .container {
            width: 100%;
            padding: 0 12px;
          }
          
          .top-nav-left,
          .top-nav-right {
            gap: 12px;
          }
          
          .top-nav-left {
            justify-content: flex-start;
          }

          .top-nav-right {
            justify-content: flex-end;
          }
          
          .main-nav {
            padding: 0 12px;
            flex-direction: column;
            height: auto;
            padding-bottom: 16px;
          }
          
          .main-nav-left,
          .main-nav-right {
            gap: 12px;
            margin: 0;
            justify-content: center;
            flex-wrap: wrap;
            padding: 0; 
            flex-basis: 100%;
          }
          
          .main-nav-left {
            order: 2; 
            margin-top: 50px; 
          }
          
          .main-nav-right {
            order: 3;
            margin-top: 12px;
          }
          
          .main-nav a {
            font-size: 11px;
            line-height: 1;
            height: auto;
            padding: 12px 8px;
          }

          .logo-link {
            transform: translate(-50%, -50%);
          }
        }
      `}</style>

      <header className={isScrolled ? "site-header scrolled" : "site-header"}>
        {/* Top Bar - Tier 1 */}
        <div className="top-bar">
          <nav className="container">
            <div className="top-nav-left">
              <a href="#">NEWS</a>
              <a href="#">EVENTS</a>
              <a href="#">CAREERS</a>
              <a href="#">INFO FOR ▾</a>
            </div>
            <div className="top-nav-right">
              <a href="#">VISIT</a>
              <a href="#">CONTACT US</a>
              <a href="#">DIRECTORY</a>
              <div className="search-icon" aria-label="Search">
                <Search size={16} />
              </div>
            </div>
          </nav>
        </div>

        {/* Main Header Container - Tier 2 */}
        <div className="main-header-container">
          <div className="main-header-bar">
            <nav className="main-nav">
              <div className="main-nav-left">
                <a href="#" className="active">WHO WE ARE</a>
                <a href="#">EDUCATION & RESEARCH</a>
                <a href="#">ADMISSIONS</a>
              </div>
              
              <div className="main-nav-right">
                <a href="#">LIFE AT SSIPMT</a>
                <a href="#">SSIPMT PROGRAMS</a>
                
                {/* --- ADDED onMouseMove HANDLER HERE --- */}
                <a 
                  href="#" 
                  className="btn-cta"
                  onMouseMove={handleMouseMove} 
                >
                  APPLY
                </a>
              </div>
            </nav>
          </div>
        </div>
        
        <a href="/" className="logo-link">
          <img 
            src="https://ssipmt.edu.in/assets/images/logo/logo.jpg?v2" 
            alt="SSIPMT Logo" 
            className="logo-image"
          />
        </a>
      </header>

      {/* --- NEW HERO SECTION WITH BACKGROUND VIDEO --- */}
      <div className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video" poster="/assets/campus-fallback.jpg">
          <source src="/assets/SSYouTube.online_Virtual Tour of SSIPMT Campus Raipur_1080p.mp4" type="video/mp4" />
          {/* WebM version (optional): place it into public/assets and add a <source> entry for best cross-browser support */}
          {/* Note: poster attribute provides a fallback image while the video loads */}
        </video>
        <div className="hero-content container">
          {/* Hero content removed per user request */}
        </div>
      </div>
      {/* --- END NEW HERO SECTION --- */}
    </>
  );
}