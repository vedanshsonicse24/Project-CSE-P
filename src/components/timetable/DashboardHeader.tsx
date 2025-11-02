import { GraduationCap, ChevronDown, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface DashboardHeaderProps {
  onNavigate: (page: 'timetable' | 'teacher' | 'attendance') => void;
  currentPage: string;
}

export function DashboardHeader({ onNavigate, currentPage }: DashboardHeaderProps) {
  return (
    <div>
      {/* Top Navigation Bar */}
      <header className="w-full border-b bg-white" style={{ borderColor: '#e5e7eb' }}>
        <div className="flex h-20 items-center justify-between px-6">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-3">
            <GraduationCap className="h-16 w-16" style={{ color: '#1c2e4a' }} />
            <div>
              <h1 className="text-xl" style={{ color: '#1c2e4a' }}>SSIPMT</h1>
              <p className="text-xs" style={{ color: '#6b7280' }}>Shri Shankaracharya Institute</p>
            </div>
          </div>

          {/* Center Section - Dropdown Menus */}
          <div className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 hover:underline" style={{ color: '#374151' }}>
                  <span className="text-sm">Details</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onNavigate('timetable')}>
                  View Timetable
                </DropdownMenuItem>
                <DropdownMenuItem>Student Information</DropdownMenuItem>
                <DropdownMenuItem>Course Details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 hover:underline" style={{ color: '#374151' }}>
                  <span className="text-sm">Achievement</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Academic Awards</DropdownMenuItem>
                <DropdownMenuItem>Certifications</DropdownMenuItem>
                <DropdownMenuItem>Projects</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 hover:underline" style={{ color: '#374151' }}>
                  <span className="text-sm">Attendance</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onNavigate('teacher')}>
                  Faculty Schedule
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('attendance')}>
                  Mark Attendance
                </DropdownMenuItem>
                {/* View Reports removed per HOD portal cleanup */}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 hover:underline" style={{ color: '#374151' }}>
                  <span className="text-sm">Management</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Faculty Management</DropdownMenuItem>
                <DropdownMenuItem>Subject Management</DropdownMenuItem>
                <DropdownMenuItem>Lab Management</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 hover:underline" style={{ color: '#374151' }}>
                  <span className="text-sm">Resources</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Library</DropdownMenuItem>
                <DropdownMenuItem>Study Materials</DropdownMenuItem>
                <DropdownMenuItem>Guidelines</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Section - Profile */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10"
              style={{ backgroundColor: '#f3f4f6' }}
            >
              <User className="h-5 w-5" style={{ color: '#374151' }} />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1559842135-8d5e4214ae77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbGFwdG9wJTIwY29kaW5nfGVufDF8fHx8MTc2MDU1NDIxNXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="College Campus"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="mb-4">College Timetable Management System</h1>
            <p className="text-lg opacity-90">Efficient scheduling and attendance tracking for SSIPMT</p>
          </div>
        </div>

        {/* Optional "Activate Windows" style element */}
        <div className="absolute bottom-4 right-4 text-white/40 text-xs">
          <p>SSIPMT Timetable System v2.0</p>
          <p className="text-[10px]">Academic Year 2024-25</p>
        </div>
      </div>
    </div>
  );
}
