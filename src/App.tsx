import { useState } from "react";
import { Header } from "./components/common/Header";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { FacultyDashboard } from "./components/faculty/FacultyDashboard";
import { FacultyProfile } from "./components/faculty/FacultyProfile";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { StudentProfileModern } from "./components/student/StudentProfileModern";
import { HODDashboard } from "./components/hod/HODDashboard";
import { PageTransition } from "./components/common/PageTransition";
import { Toaster } from "./components/ui/sonner";
import "./styles/student-profile-animations.css";

type Page = "home" | "login" | "dashboard" | "student-profile" | "faculty-profile";
type UserRole = "faculty" | "student" | "hod" | "admin" | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string>("");

  const handleLogin = (role: "faculty" | "student" | "hod" | "admin", username: string) => {
    setUserRole(role);
    setUserName(username);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName("");
    setCurrentPage("home");
  };

  const renderPage = () => {
    if (currentPage === "home") {
      return (
        <PageTransition>
          <HomePage onNavigateToLogin={() => setCurrentPage("login")} />
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
          {userRole === "faculty" && <FacultyDashboard />}
          {userRole === "student" && <StudentDashboard />}
          {userRole === "hod" && <HODDashboard />}
          {userRole === "admin" && <HODDashboard isViewOnly={true} />}
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

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Permanent Header across all pages */}
      <Header 
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
      />
      {renderPage()}
      <Toaster position="top-right" />
    </div>
  );
}
