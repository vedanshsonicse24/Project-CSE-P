import { Search, ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";

interface NewHeaderProps {
  userRole?: "faculty" | "student" | "hod" | "admin";
  userName?: string;
  onLogout?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSection?: (section: string) => void;
  onNavigateToHome?: () => void;
  onNavigateToFacultyInfo?: () => void;
  onNavigateToAlumni?: () => void;
  showHeroVideo?: boolean;
}

export function NewHeader({ userRole, userName, onLogout, onNavigateToLogin, onNavigateToProfile, onNavigateToSection, onNavigateToHome, onNavigateToFacultyInfo, onNavigateToAlumni, showHeroVideo }: NewHeaderProps) {
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [showInfoDropdown, setShowInfoDropdown] = useState(false);
  const [facultyDropdownOpen, setFacultyDropdownOpen] = useState(false);
  const [reportsDropdownOpen, setReportsDropdownOpen] = useState(false);
  
  const handleNavClick = (section: string) => {
    setActiveNavItem(section);
    onNavigateToSection?.(section);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Only enable scroll animation on homepage (when showHeroVideo is true)
    if (!showHeroVideo) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showHeroVideo]);
  
  return (
    <>
      <style>{`
        :root {
          --maroon-color: #800000;
          --grey-text: rgb(77, 77, 77);
          --logo-height: 70px;
          --logo-bubble-padding: 15px;
        }

        body {
          font-family: "GothamBook", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          margin: 0;
          background-color: #f4f4f4;
          padding-top: 84px;
        }

        .container {
          width: 90%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          font-family: "GothamBook", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        }

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

        .user-welcome {
          color: white;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .top-bar a,
        .top-bar button {
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          transition: opacity 0.2s ease;
          font-weight: 500;
          letter-spacing: 0.5px;
          padding: 8px 0;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
        }

        .top-bar a:hover,
        .top-bar button:hover {
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

        .info-dropdown {
          position: relative;
          display: inline-block;
        }

        .info-dropdown-content {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: white;
          min-width: 160px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          z-index: 1001;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .info-dropdown-content.show {
          opacity: 1;
          visibility: visible;
        }

        .info-dropdown-content a {
          color: var(--grey-text);
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          transition: background-color 0.2s ease;
        }

        .info-dropdown-content a:hover {
          background-color: #f8f9fa;
          color: var(--maroon-color);
        }

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
          top: ${userRole ? '52px' : '42px'};
          left: 50%;
          z-index: 10;
          background: white;
          border-radius: 100px;
          padding: var(--logo-bubble-padding);
          display: block;
          transition: ${showHeroVideo ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'};
          transform: translate(-50%, -50%) scale(${showHeroVideo ? '1.2' : '1'});
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          /* Ensure perfect centering */
          margin: 0;
        }

        ${showHeroVideo ? `
        .site-header.scrolled .logo-link {
          transform: translate(-50%, -50%) scale(1);
        }
        ` : ''}

        .logo-image {
          height: var(--logo-height);
          width: auto;
          display: block;
        }

        .main-nav {
          display: flex;
          align-items: center;
          height: 42px;
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
          gap: 24px;
          flex-basis: 50%;
          box-sizing: border-box;
        }

        .main-nav-left {
          justify-content: flex-end;
          padding-right: 220px;
          padding-left: 20px;
        }

        .main-nav-right {
          justify-content: flex-start;
          padding-left: 220px;
          padding-right: 20px;
        }

        /* Responsive adjustments for better spacing on different screen sizes */
        @media (max-width: 1200px) {
          .main-nav-left {
            padding-right: 150px;
          }
          .main-nav-right {
            padding-left: 150px;
          }
        }

        @media (max-width: 992px) {
          .main-nav-left {
            padding-right: 120px;
          }
          .main-nav-right {
            padding-left: 120px;
          }
        }

        @media (max-width: 768px) {
          .main-nav-left {
            padding-right: 35px;
          }
          .main-nav-right {
            padding-left: 35px;
          }
        }

        /* Enhanced spacing and styling for logged-in users */
        ${userRole ? `
          .main-nav-left,
          .main-nav-right {
            gap: 25px;
          }
          
          .main-nav a {
            font-size: 12px;
            font-weight: 700;
            padding: 0 8px;
          }
          
          .main-header-container {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            border-bottom: 2px solid #e9ecef;
          }
        ` : ''}

        .main-nav a {
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 13px;
          padding: 0 4px;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          white-space: nowrap;
          color: var(--grey-text);
          font-family: "GothamBook", -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 42px;
          letter-spacing: 0.03em;
          position: relative;
          display: flex;
          align-items: center;
          height: 42px;
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
          overflow: hidden;
          display: flex;
          align-items: center;
          height: auto;
          line-height: 1;
          z-index: 1;
        }

        .btn-cta::before {
          content: '';
          position: absolute;
          left: var(--x, 50%);
          top: var(--y, 50%);
          transform: translate(-50%, -50%);
          background: var(--maroon-color);
          width: 0px;
          height: 0px;
          border-radius: 50%;
          transition: width 0.4s ease, height 0.4s ease;
          z-index: -1;
        }

        .btn-cta:hover {
          color: white;
          border-color: var(--maroon-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(128, 0, 0, 0.3);
        }

        .btn-cta:hover::before {
          width: 400px;
          height: 400px;
        }

        .hero-section {
          position: relative;
          width: 100%;
          height: calc(100vh - 91px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000;
        }

        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          color: white;
          text-align: center;
          padding: 20px;
          max-width: 800px;
        }
      `}</style>

      <header className={showHeroVideo && isScrolled ? "site-header scrolled" : "site-header"}>
        <div className="top-bar">
          <nav className="container">
            <div className="top-nav-left">
              <a href="#">NEWS & EVENTS</a>
              <a href="#">CAREERS</a>
              <div 
                className="info-dropdown"
                onMouseEnter={() => setShowInfoDropdown(true)}
                onMouseLeave={() => setShowInfoDropdown(false)}
              >
                <a href="#" style={{ cursor: 'pointer' }}>INFO FOR</a>
                <div className={`info-dropdown-content ${showInfoDropdown ? 'show' : ''}`}>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToFacultyInfo?.();
                      setShowInfoDropdown(false);
                    }}
                  >
                    FACULTY INFO
                  </a>
                  <a 
                    href="https://ssipmt.edu.in/alumni.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setShowInfoDropdown(false);
                    }}
                  >
                    ALUMNI
                  </a>
                </div>
              </div>
            </div>
            <div className="top-nav-right">
              {userRole ? (
                <>
                  <span className="user-welcome">Welcome, {userName || 'User'}</span>
                  {onNavigateToProfile && (
                    <button 
                      onClick={onNavigateToProfile}
                      className="text-white hover:opacity-85 transition-opacity text-sm uppercase"
                    >
                      PROFILE
                    </button>
                  )}
                  {onLogout && (
                    <button 
                      onClick={onLogout}
                      className="text-white hover:opacity-85 transition-opacity text-sm uppercase"
                    >
                      LOGOUT
                    </button>
                  )}
                </>
              ) : (
                <>
                  <a href="#">VIRTUAL TOUR</a>
                  <a 
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    CONTACT US
                  </a>
                  <a href="#">DIRECTORY</a>
                  {onNavigateToLogin && (
                    <button 
                      onClick={onNavigateToLogin}
                      className="text-white hover:opacity-85 transition-opacity text-sm uppercase"
                    >
                      LOGIN
                    </button>
                  )}
                </>
              )}
              <div className="search-icon" aria-label="Search">
                <Search size={16} />
              </div>
            </div>
          </nav>
        </div>

        <div className="main-header-container">
          <div className="main-header-bar">
            <nav className="main-nav">
              {userRole ? (
                // Logged in navigation with portal-specific buttons
                <>
                  <div className="main-nav-left">
                    <a 
                      href="#" 
                      className={activeNavItem === "dashboard" ? "active" : ""} 
                      onClick={(e) => { e.preventDefault(); handleNavClick('dashboard'); }}
                    >
                      DASHBOARD
                    </a>
                    {userRole === 'faculty' && (
                      <>
                        <a 
                          href="#" 
                          className={activeNavItem === "attendance" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('attendance'); }}
                        >
                          ATTENDANCE
                        </a>
                        <a 
                          href="#" 
                          className={activeNavItem === "timetable" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('timetable'); }}
                        >
                          TIMETABLE
                        </a>
                        <a 
                          href="#" 
                          className={activeNavItem === "grading" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('grading'); }}
                        >
                          GRADING
                        </a>
                      </>
                    )}
                    {userRole === 'student' && (
                      <>
                        {/* Navigation profile link removed for student portal per request. Top-right header PROFILE button remains. */}
                        <a 
                          href="#" 
                          className={activeNavItem === "cv" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('cv'); }}
                        >
                          UPLOAD CV
                        </a>
                        <a 
                          href="#" 
                          className={activeNavItem === "achievements" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('achievements'); }}
                        >
                          ACHIEVEMENTS
                        </a>
                      </>
                    )}
                    {userRole === 'hod' && (
                      <>
                        <a 
                          href="#" 
                          className={activeNavItem === "students" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('students'); }}
                        >
                          STUDENTS
                        </a>
                        <div 
                          className="relative"
                          onMouseEnter={() => setFacultyDropdownOpen(true)}
                          onMouseLeave={() => setFacultyDropdownOpen(false)}
                        >
                          <a 
                            href="#" 
                            className={`${activeNavItem === "faculty" || activeNavItem === "facultydetails" || activeNavItem === "schedule" ? "active" : ""} flex items-center gap-1`} 
                            onClick={(e) => { e.preventDefault(); }}
                          >
                            FACULTY
                            <ChevronDown className={`h-3 w-3 transition-transform ${facultyDropdownOpen ? 'rotate-180' : ''}`} />
                          </a>
                          {facultyDropdownOpen && (
                            <div className="absolute left-0 top-full mt-1 bg-white rounded shadow-lg py-2 px-3 space-y-1 z-50 min-w-[180px]">
                              <a 
                                href="#" 
                                className="text-blue-900 hover:text-blue-600 transition-colors text-xs block py-1 font-semibold whitespace-nowrap"
                                onClick={(e) => { e.preventDefault(); handleNavClick('faculty'); setFacultyDropdownOpen(false); }}
                              >
                                Faculty Management
                              </a>
                              <a 
                                href="#" 
                                className="text-blue-900 hover:text-blue-600 transition-colors text-xs block py-1 font-semibold whitespace-nowrap"
                                onClick={(e) => { e.preventDefault(); handleNavClick('facultydetails'); setFacultyDropdownOpen(false); }}
                              >
                                Faculty Details
                              </a>
                              <a 
                                href="#" 
                                className="text-blue-900 hover:text-blue-600 transition-colors text-xs block py-1 font-semibold whitespace-nowrap"
                                onClick={(e) => { e.preventDefault(); handleNavClick('schedule'); setFacultyDropdownOpen(false); }}
                              >
                                My Schedule
                              </a>
                            </div>
                          )}
                        </div>
                        <a 
                          href="#" 
                          className={activeNavItem === "lectures" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('lectures'); }}
                        >
                          LECTURE MGMT
                        </a>
                      </>
                    )}
                  </div>
                  
                  <div className="main-nav-right">
                    {userRole === 'faculty' && (
                      <>
                        <a 
                          href="#" 
                          className={activeNavItem === "student-management" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('student-management'); }}
                        >
                          STUDENT MGMT
                        </a>
                        <a 
                          href="#" 
                          className={activeNavItem === "boa" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('boa'); }}
                        >
                          BOA APPROVALS
                        </a>
                        <a 
                          href="#" 
                          className={activeNavItem === "proxy" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('proxy'); }}
                        >
                          ENGAGE LECTURES
                        </a>
                      </>
                    )}
                    {userRole === 'student' && (
                      <>
                        <a 
                          href="#" 
                          className={activeNavItem === "boa" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('boa'); }}
                        >
                          UPLOAD BOA
                        </a>
                        <a 
                          href="#" 
                          className={activeNavItem === "notifications" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('notifications'); }}
                        >
                          NOTIFICATIONS
                        </a>
                      </>
                    )}
                    {userRole === 'hod' && (
                      <>
                        <a 
                          href="#" 
                          className={activeNavItem === "timetable" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('timetable'); }}
                        >
                          TIMETABLE
                        </a>
                        <a 
                          href="#" 
                          className={activeNavItem === "approvals" ? "active" : ""} 
                          onClick={(e) => { e.preventDefault(); handleNavClick('approvals'); }}
                        >
                          BOA MGMT
                        </a>
                        <div 
                          className="relative"
                          onMouseEnter={() => setReportsDropdownOpen(true)}
                          onMouseLeave={() => setReportsDropdownOpen(false)}
                        >
                          <a 
                            href="#" 
                            className={`${activeNavItem === "reports" || activeNavItem === "achievements" ? "active" : ""} flex items-center gap-1`} 
                            onClick={(e) => { e.preventDefault(); }}
                          >
                            REPORTS
                            <ChevronDown className={`h-3 w-3 transition-transform ${reportsDropdownOpen ? 'rotate-180' : ''}`} />
                          </a>
                          {reportsDropdownOpen && (
                            <div className="absolute left-0 top-full mt-1 bg-white rounded shadow-lg py-2 px-3 space-y-1 z-50 min-w-[150px]">
                              <a 
                                href="#" 
                                className="text-blue-900 hover:text-blue-600 transition-colors text-xs block py-1 font-semibold whitespace-nowrap"
                                onClick={(e) => { e.preventDefault(); handleNavClick('reports'); setReportsDropdownOpen(false); }}
                              >
                                Reports
                              </a>
                              <a 
                                href="#" 
                                className="text-blue-900 hover:text-blue-600 transition-colors text-xs block py-1 font-semibold whitespace-nowrap"
                                onClick={(e) => { e.preventDefault(); handleNavClick('achievements'); setReportsDropdownOpen(false); }}
                              >
                                Achievements
                              </a>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                // Public navigation
                <>
                  <div className="main-nav-left">
                    <a href="#" className="active">WHO WE ARE</a>
                    <a href="#">EDUCATION & RESEARCH</a>
                    <a href="#">ADMISSIONS</a>
                  </div>
                  
                  <div className="main-nav-right">
                    <a href="#">LIFE AT SSIPMT</a>
                    <a href="#">SSIPMT PROGRAMS</a>
                    <a 
                      href="#"
                    >
                      APPLY
                    </a>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
        
        <a 
          href={userRole ? "#" : "/"} 
          className="logo-link"
          onClick={(e) => {
            if (userRole && onNavigateToHome) {
              e.preventDefault();
              onNavigateToHome();
            }
          }}
        >
          <img 
            src="https://ssipmt.edu.in/assets/images/logo/logo.jpg?v2" 
            alt="SSIPMT Logo" 
            className="logo-image"
          />
        </a>
      </header>

      {showHeroVideo && (
        <div className="hero-section">
          <video autoPlay loop muted playsInline className="hero-video" poster="/assets/campus-fallback.jpg">
            <source src="/assets/SSYouTube.online_Virtual Tour of SSIPMT Campus Raipur_1080p.mp4" type="video/mp4" />
          </video>
          <div className="hero-content container">
          </div>
        </div>
      )}
    </>
  );
}
