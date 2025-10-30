import { useState, useEffect } from "react";
import { NewHeader } from "./components/common/NewHeader";
import { CookieConsentBanner } from "./components/common/CookieConsentBanner";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { FacultyDashboard } from "./components/faculty/FacultyDashboard";
import { FacultyProfile } from "./components/faculty/FacultyProfile";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { StudentProfileModern } from "./components/student/StudentProfileModern";
import { HODDashboard } from "./components/hod/HODDashboard";
import { FacultyInfoPage } from "./components/pages/FacultyInfoPage";
import CentreOfExcellence from "./components/pages/CentreOfExcellence";
import { PageTransition } from "./components/common/PageTransition";
import { Toaster } from "./components/ui/sonner";
import { UserCookies, PreferenceCookies, CookieUtils } from "./utils/cookies";
import { toast } from "sonner";
import "./styles/student-profile-animations.css";

type Page = "home" | "login" | "dashboard" | "student-profile" | "faculty-profile" | "faculty-info" | "alumni" | "coe";
type UserRole = "faculty" | "student" | "hod" | "admin" | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string>("");
  const [dashboardSection, setDashboardSection] = useState<string>("dashboard");
  const [cookiesEnabled, setCookiesEnabled] = useState<boolean>(false);

  // Check for existing user session and restore from cookies
  useEffect(() => {
    // Check if cookies are enabled
    const areEnabled = CookieUtils.areCookiesEnabled();
    setCookiesEnabled(areEnabled);

    if (areEnabled) {
      // Try to restore user session from cookies
      const session = UserCookies.getUserSession();
      if (session.userRole && session.userName) {
        setUserRole(session.userRole);
        setUserName(session.userName);
        setCurrentPage("dashboard");
        
        // Restore dashboard section preference
        const savedSection = PreferenceCookies.getDashboardSection();
        setDashboardSection(savedSection);
        
        toast.success(`Welcome back, ${session.userName}!`);
      }
    } else {
      toast.warning("Cookies are disabled. Some features may not work properly.");
    }
  }, []);

  const handleLogin = (role: "faculty" | "student" | "hod" | "admin", username: string, rememberMe = false) => {
    setUserRole(role);
    setUserName(username);
    setCurrentPage("dashboard");
    setDashboardSection("dashboard");
    
    // Save to cookies if enabled
    if (cookiesEnabled) {
      UserCookies.setUserSession(role, username, undefined, rememberMe);
      PreferenceCookies.setDashboardSection("dashboard");
      
      if (rememberMe) {
        toast.success("Login saved! You'll stay logged in for 30 days.");
      }
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName("");
    setCurrentPage("home");
    setDashboardSection("dashboard");
    
    // Clear cookies if enabled
    if (cookiesEnabled) {
      UserCookies.clearUserSession();
      toast.success("Logged out successfully!");
    }
  };

  const handleNavigateToSection = (section: string) => {
    setDashboardSection(section);
    
    // Save section preference to cookies
    if (cookiesEnabled) {
      PreferenceCookies.setDashboardSection(section);
    }
    
    if (currentPage !== "dashboard") {
      setCurrentPage("dashboard");
    }
  };

  const handleCookieConsentChange = (consent: 'accepted' | 'declined' | 'partial') => {
    if (consent === 'accepted' || consent === 'partial') {
      setCookiesEnabled(true);
      toast.success("Cookie preferences saved!");
    } else {
      setCookiesEnabled(false);
      // Clear any existing cookies if user declines
      UserCookies.clearUserSession();
      toast.info("Cookies disabled. You'll need to log in again each session.");
    }
  };

  const renderPage = () => {
    if (currentPage === "coe") {
      return (
        <PageTransition>
          <CentreOfExcellence />
        </PageTransition>
      );
    }

    if (currentPage === "home") {
      return (
        <PageTransition>
          <HomePage onNavigateToLogin={() => setCurrentPage("login")} userRole={userRole} />
        </PageTransition>
      );
    }

    if (currentPage === "login") {
      return (
        <PageTransition>
          <LoginPage onLogin={handleLogin} onNavigateToHome={() => setCurrentPage("home")} />
        </PageTransition>
      );
    }

    if (currentPage === "dashboard" && userRole) {
      return (
        <PageTransition>
          {userRole === "faculty" && <FacultyDashboard initialSection={dashboardSection} />}
          {userRole === "student" && <StudentDashboard initialSection={dashboardSection} />}
          {userRole === "hod" && <HODDashboard initialSection={dashboardSection} />}
          {userRole === "admin" && <HODDashboard isViewOnly={true} initialSection={dashboardSection} />}
        </PageTransition>
      );
    }

    if (currentPage === "student-profile" && userRole === "student") {
      return (
        <PageTransition>
          <StudentProfileModern />
        </PageTransition>
      );
    }

    if (currentPage === "faculty-profile" && userRole === "faculty") {
      return (
        <PageTransition>
          <FacultyProfile />
        </PageTransition>
      );
    }

    if (currentPage === "faculty-info") {
      return (
        <PageTransition>
          <FacultyInfoPage />
        </PageTransition>
      );
    }

    if (currentPage === "alumni") {
      return (
        <PageTransition>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Page</h1>
              <p className="text-gray-600">Coming Soon...</p>
            </div>
          </div>
        </PageTransition>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cookie Consent Banner */}
      <CookieConsentBanner onConsentChange={handleCookieConsentChange} />
      
      {/* New Two-Tier Header */}
      <NewHeader 
        userRole={userRole || undefined} 
        userName={userName || undefined} 
        onLogout={userRole ? handleLogout : undefined}
        onNavigateToLogin={!userRole ? () => setCurrentPage("login") : undefined}
        onNavigateToProfile={
          userRole === "student" 
            ? () => setCurrentPage("student-profile") 
            : userRole === "faculty" 
            ? () => setCurrentPage("faculty-profile")
            : undefined
        }
        onNavigateToSection={userRole ? handleNavigateToSection : undefined}
        onNavigateToHome={() => setCurrentPage("home")}
        onNavigateToFacultyInfo={() => setCurrentPage("faculty-info")}
        onNavigateToAlumni={() => setCurrentPage("alumni")}
        onNavigateToCoE={() => setCurrentPage("coe")}
        showHeroVideo={currentPage === "home"}
      />
      {renderPage()}
      
      {/* Enhanced Toast Notifications */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      {/* Cookie Status Indicator (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-40">
          <div className={`px-3 py-2 rounded-full text-xs font-medium ${
            cookiesEnabled 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            Cookies: {cookiesEnabled ? 'Enabled' : 'Disabled'}
          </div>
        </div>
      )}
    </div>
  );
}
