import { useState, useEffect } from "react";
import { NewHeader } from "./components/common/NewHeader";
import { CookieConsentBanner } from "./components/common/CookieConsentBanner";
import { Footer } from "./components/common/Footer";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { StudentRegistration } from "./components/student/StudentRegistration";
import { FacultyRegistration } from "./components/faculty/FacultyRegistration";
import { FacultyDashboard } from "./components/faculty/FacultyDashboard";
import { FacultyProfile } from "./components/faculty/FacultyProfile";
import { HODProfile } from "./components/hod/HODProfile";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { StudentProfileModern } from "./components/student/StudentProfileModern";
import { HODDashboard } from "./components/hod/HODDashboard";
import { FacultyInfoPage } from "./components/pages/FacultyInfoPage";
import { AboutPage } from "./components/pages/AboutPage";
import { AdmissionsPage } from "./components/pages/AdmissionsPage";
import { ApplyPage } from "./components/pages/ApplyPage";
import { COEPage } from "./components/pages/COEPage";
import CsaPage from "./components/pages/CsaPage";
import { ContactPage } from "./components/pages/ContactPage";
import { CSEDepartmentPage } from "./components/pages/CSEDepartmentPage";
import EducationResearchPage from "./components/pages/EducationResearchPage";
import { LifeAtSSIPMTPage } from "./components/pages/LifeAtSSIPMTPage";
import { NewsEventsPage } from "./components/pages/NewsEventsPage";
import { ProgramsPage } from "./components/pages/ProgramsPage";
import { ResearchPage } from "./components/pages/ResearchPage";
import AttendanceScheduleDemo from "./components/faculty/AttendanceScheduleDemo";
import { PageTransition } from "./components/common/PageTransition";
import { Toaster } from "./components/ui/sonner";
import { UserCookies, PreferenceCookies, CookieUtils } from "./utils/cookies";
import { toast } from "sonner";
import "./styles/student-profile-animations.css";


type Page = "home" | "login" | "dashboard" | "student-profile" | "faculty-profile" | "hod-profile" | "faculty-info" | "alumni" | "student-register" | "faculty-register" | "attendance-demo" | "about" | "admissions" | "apply" | "coe" | "csa" | "contact" | "cse-department" | "education-research" | "life-at-ssipmt" | "news-events" | "programs" | "research";
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

  // Helper function to navigate and scroll to top
  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const renderPage = () => {
    if (currentPage === "home") {
      return (
        <PageTransition>
          <HomePage 
            onNavigateToLogin={() => navigateToPage("login")} 
            onNavigateToPrograms={() => navigateToPage("programs")}
            onNavigateToCSEDepartment={() => navigateToPage("cse-department")}
            onNavigateToFacultyInfo={() => navigateToPage("faculty-info")}
            onNavigateToContact={() => navigateToPage("contact")}
            onNavigateToNewsEvents={() => navigateToPage("news-events")}
            userRole={userRole}
          />
        </PageTransition>
      );
    }

    if (currentPage === "login") {
      return (
        <PageTransition>
          <LoginPage 
            onLogin={handleLogin} 
            onNavigateToHome={() => setCurrentPage("home")}
            onNavigateToRegister={(role) => setCurrentPage(role === "student" ? "student-register" : "faculty-register")}
          />
        </PageTransition>
      );
    }

    if (currentPage === "student-register") {
      return (
        <PageTransition>
          <StudentRegistration
            onBack={() => setCurrentPage("login")}
            onRegister={(data) => {
              console.log("Student registration data:", data);
              // Auto-login after successful registration
              setUserRole("student");
              setUserName(data.fullName);
              setCurrentPage("dashboard");
              setDashboardSection("dashboard");
              
              // Save to cookies if enabled
              if (cookiesEnabled) {
                UserCookies.setUserSession("student", data.fullName, undefined, false);
                PreferenceCookies.setDashboardSection("dashboard");
              }
              
              toast.success(`Welcome ${data.fullName}! Your account has been created successfully.`);
            }}
          />
        </PageTransition>
      );
    }

    if (currentPage === "faculty-register") {
      return (
        <PageTransition>
          <FacultyRegistration
            onBack={() => setCurrentPage("login")}
            onRegister={(data) => {
              console.log("Faculty registration data:", data);
              // Auto-login after successful registration
              setUserRole("faculty");
              setUserName(data.fullName);
              setCurrentPage("dashboard");
              setDashboardSection("dashboard");
              
              // Save to cookies if enabled
              if (cookiesEnabled) {
                UserCookies.setUserSession("faculty", data.fullName, undefined, false);
                PreferenceCookies.setDashboardSection("dashboard");
              }
              
              toast.success(`Welcome ${data.fullName}! Your account has been created successfully.`);
            }}
          />
        </PageTransition>
      );
    }

    if (currentPage === "dashboard" && userRole) {
      return (
        <PageTransition>
          {userRole === "faculty" && <FacultyDashboard initialSection={dashboardSection} />}
          {userRole === "student" && <StudentDashboard initialSection={dashboardSection} onNavigateToProfile={() => setCurrentPage("student-profile")} />}
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

    if (currentPage === "hod-profile" && userRole === "hod") {
      return (
        <PageTransition>
          <HODProfile />
        </PageTransition>
      );
    }

    if (currentPage === "attendance-demo") {
      return (
        <PageTransition>
          <AttendanceScheduleDemo />
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

    if (currentPage === "about") {
      return (
        <PageTransition>
          <AboutPage />
        </PageTransition>
      );
    }

    if (currentPage === "admissions") {
      return (
        <PageTransition>
          <AdmissionsPage />
        </PageTransition>
      );
    }

    if (currentPage === "apply") {
      return (
        <PageTransition>
          <ApplyPage />
        </PageTransition>
      );
    }

    if (currentPage === "coe") {
      return (
        <PageTransition>
          <COEPage />
        </PageTransition>
      );
    }

    if (currentPage === "csa") {
      return (
        <PageTransition>
          <CsaPage />
        </PageTransition>
      );
    }

    if (currentPage === "contact") {
      return (
        <PageTransition>
          <ContactPage 
            onNavigateToAdmissions={() => navigateToPage("admissions")}
            onNavigateToPrograms={() => navigateToPage("programs")}
          />
        </PageTransition>
      );
    }

    if (currentPage === "cse-department") {
      return (
        <PageTransition>
          <CSEDepartmentPage />
        </PageTransition>
      );
    }

    if (currentPage === "education-research") {
      return (
        <PageTransition>
          <EducationResearchPage />
        </PageTransition>
      );
    }

    if (currentPage === "life-at-ssipmt") {
      return (
        <PageTransition>
          <LifeAtSSIPMTPage />
        </PageTransition>
      );
    }

    if (currentPage === "news-events") {
      return (
        <PageTransition>
          <NewsEventsPage />
        </PageTransition>
      );
    }

    if (currentPage === "programs") {
      return (
        <PageTransition>
          <ProgramsPage />
        </PageTransition>
      );
    }

    if (currentPage === "research") {
      return (
        <PageTransition>
          <ResearchPage />
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
        onNavigateToLogin={!userRole ? () => navigateToPage("login") : undefined}
        onNavigateToProfile={
          userRole === "student" 
            ? () => navigateToPage("student-profile") 
            : userRole === "faculty" 
            ? () => navigateToPage("faculty-profile")
            : userRole === "hod"
            ? () => navigateToPage("hod-profile")
            : undefined
        }
        onNavigateToSection={userRole ? handleNavigateToSection : undefined}
        onNavigateToHome={() => navigateToPage("home")}
        onNavigateToFacultyInfo={() => navigateToPage("faculty-info")}
        onNavigateToAlumni={() => navigateToPage("alumni")}
        onNavigateToAbout={() => navigateToPage("about")}
        onNavigateToAdmissions={() => navigateToPage("admissions")}
        onNavigateToLifeAtSSIPMT={() => navigateToPage("life-at-ssipmt")}
        onNavigateToPrograms={() => navigateToPage("programs")}
        onNavigateToApply={() => navigateToPage("apply")}
        onNavigateToCSEDepartment={() => navigateToPage("cse-department")}
        onNavigateToResearch={() => navigateToPage("research")}
        onNavigateToContact={() => navigateToPage("contact")}
        onNavigateToNewsEvents={() => navigateToPage("news-events")}
        onNavigateToCOE={() => navigateToPage("coe")}
        onNavigateToCSA={() => navigateToPage("csa")}
        showHeroVideo={currentPage === "home"}
      />

      {renderPage()}
      
      {/* Universal Footer */}
      <Footer 
        onNavigateToHome={() => navigateToPage("home")}
        onNavigateToFacultyInfo={() => navigateToPage("faculty-info")}
        onNavigateToNewsEvents={() => navigateToPage("news-events")}
        onNavigateToContact={() => navigateToPage("contact")}
        onNavigateToPrograms={() => navigateToPage("programs")}
        onNavigateToCOE={() => navigateToPage("coe")}
        onNavigateToCSA={() => navigateToPage("csa")}
      />
      
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
