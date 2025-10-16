import { GraduationCap, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import ssipMtLogo from "../../assets/ssipmt-logo-full.png";
import { useState } from "react";

interface HeaderProps {
  userRole?: "faculty" | "student" | "hod" | "admin";
  userName?: string;
  onLogout?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToProfile?: () => void;
}

export function Header({ userRole, userName, onLogout, onNavigateToLogin, onNavigateToProfile }: HeaderProps) {
  const [selectedClub, setSelectedClub] = useState<"C.O.E" | "C.S.A" | null>(null);

  const getRoleLabel = () => {
    if (userRole === "faculty") return "Faculty";
    if (userRole === "student") return "Student";
    if (userRole === "hod") return "Super Admin";
    if (userRole === "admin") return "Admin (View Only)";
    return "";
  };

  // Check if we're on the home page (no user logged in)
  const isHomePage = !userRole;

  return (
    <header
      className="sticky top-0 z-50 w-full border-b shadow-sm bg-white"
      style={{
        background: '#ffffff',
        borderColor: 'rgba(15, 23, 42, 0.08)'
      }}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo and App Name Section */}
        <div className="flex items-center gap-4">
          <img
            src={ssipMtLogo}
            alt="SSIPMT Logo"
            className="h-14 w-auto object-contain"
          />
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-slate-900 font-bold text-lg leading-tight tracking-wide">
              CSE Department Portal
            </h1>
            <p className="text-xs leading-tight mt-0.5" style={{ color: '#475569' }}>
              Computer Science and Engineering Department
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">

          {/* User-specific actions */}
          {isHomePage ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white border-0 transition-all shadow-sm"
                  >
                    <span className="mr-1">{selectedClub || "Select Club"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem
                    onClick={() => setSelectedClub("C.O.E")}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    C.O.E
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedClub("C.S.A")}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    C.S.A
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" asChild className="border-slate-200 text-slate-700 hover:bg-slate-50">
                <a href="https://www.ssipmt.edu.in/alumni.php" target="_blank" rel="noreferrer">Alumni</a>
              </Button>
              <Button
                onClick={onNavigateToLogin}
                className="text-white relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 123, 0, 0.95) 0%, rgba(249, 115, 22, 0.9) 50%, rgba(255, 123, 0, 0.95) 100%)',
                  boxShadow: '0 4px 20px rgba(255, 123, 0, 0.35)'
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></span>
                <span className="relative">Login</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white border-0 transition-all shadow-sm"
                  >
                    <span className="mr-1">{selectedClub || "Select Club"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem
                    onClick={() => setSelectedClub("C.O.E")}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    C.O.E
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedClub("C.S.A")}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    C.S.A
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 text-slate-700">
                <Bell className="h-5 w-5" />
                <span 
                  className="absolute top-1 right-1 h-2 w-2 rounded-full animate-pulse"
                  style={{ 
                    background: 'radial-gradient(circle, rgba(255, 123, 0, 1) 0%, rgba(249, 115, 22, 0.8) 100%)',
                    boxShadow: '0 0 8px rgba(255, 123, 0, 0.8), 0 0 4px rgba(255, 123, 0, 0.6) inset'
                  }}
                ></span>
              </Button>

              <Button variant="outline" asChild className="border-slate-200 text-slate-700 hover:bg-slate-50">
                <a href="https://www.ssipmt.edu.in/alumni.php" target="_blank" rel="noreferrer">Alumni</a>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-md transition-all text-slate-700 border hover:shadow-md"
                    style={{
                      background: 'rgba(15, 23, 42, 0.03)',
                      borderColor: 'rgba(15, 23, 42, 0.08)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(15, 23, 42, 0.04) inset'
                    }}
                  >
                    <User className="h-5 w-5" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{userName || "User"}</span>
                      <span className="text-xs" style={{ color: '#64748b' }}>{getRoleLabel()}</span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border" style={{ background: 'rgba(255, 255, 255, 0.98)', borderColor: 'rgba(15, 23, 42, 0.08)', boxShadow: '0 8px 24px rgba(2, 6, 23, 0.08)' }}>
                  <div className="px-2 py-1.5">
                    <p className="text-sm relative" style={{ 
                      background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(59, 130, 246, 0.8) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: '600'
                    }}>{userName || "User"}</p>
                    <p className="text-xs" style={{ color: '#64748b' }}>{getRoleLabel()}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onNavigateToProfile}
                    className="cursor-pointer"
                    style={{ transition: 'all 0.2s' }}
                  >
                    <User className="mr-2 h-4 w-4" style={{ 
                      color: 'transparent',
                      background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.9) 0%, rgba(147, 197, 253, 0.8) 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 4px rgba(96, 165, 250, 0.3))'
                    }} />
                    <span style={{ color: '#0f172a' }}>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" style={{ transition: 'all 0.2s' }}>
                    <Bell className="mr-2 h-4 w-4" style={{ 
                      color: 'transparent',
                      background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.9) 0%, rgba(147, 197, 253, 0.8) 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 4px rgba(96, 165, 250, 0.3))'
                    }} />
                    <span style={{ color: '#0f172a' }}>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" style={{ transition: 'all 0.2s' }}>
                    <span style={{ color: '#0f172a' }}>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer relative overflow-hidden" style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 123, 0, 0.1) 0%, rgba(249, 115, 22, 0.08) 100%)',
                    transition: 'all 0.2s'
                  }}>
                    <LogOut className="mr-2 h-4 w-4 relative z-10" style={{ 
                      color: 'transparent',
                      background: 'linear-gradient(135deg, rgba(255, 123, 0, 0.95) 0%, rgba(249, 115, 22, 0.9) 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 4px rgba(255, 123, 0, 0.3))'
                    }} />
                    <span className="relative z-10" style={{ 
                      background: 'linear-gradient(135deg, rgba(255, 123, 0, 0.95) 0%, rgba(249, 115, 22, 0.9) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: '500'
                    }}>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Direct Logout Button - More visible option */}
              <Button
                size="sm"
                onClick={onLogout}
                className="flex items-center gap-2 text-white relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 123, 0, 0.95) 0%, rgba(249, 115, 22, 0.9) 50%, rgba(255, 123, 0, 0.95) 100%)',
                  boxShadow: '0 4px 20px rgba(255, 123, 0, 0.35)'
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></span>
                <LogOut className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
