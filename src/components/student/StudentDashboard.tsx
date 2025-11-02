import { useState, useEffect } from "react";
import { DashboardSidebar } from "../common/DashboardSidebar";
import { StatsCard } from "../common/StatsCard";
import {
  LayoutDashboard,
  User,
  Upload,
  Award,
  BookOpen,
  FileText,
  Users,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Toaster } from "../ui/sonner";
import { BOASubmissionForm } from "../boa/BOASubmissionForm";
import { AttendancePageNew } from "../attendance/AttendancePageNew";
import { StudentAttendanceRedesigned } from "./StudentAttendanceRedesigned";
import { Timetable } from "../timetable/Timetable";

const sidebarItems: any[] = [];

interface StudentDashboardProps {
  initialSection?: string;
  onNavigateToProfile?: () => void;
}

export function StudentDashboard({ initialSection = "dashboard", onNavigateToProfile }: StudentDashboardProps) {
  const [activeSection, setActiveSection] = useState(initialSection);

  // Update active section when prop changes
  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const studentInfo = {
    name: "Priya Sharma",
    roll: "21CS002",
    semester: "6th Semester",
    section: "A",
    email: "priya.sharma@student.edu",
    phone: "+91 98765 43210",
    cgpa: "8.9",
    attendance: "92%",
  };

  const mentorInfo = {
    name: "Dr. Rajesh Kumar",
    department: "Computer Science & Engineering",
    email: "rajesh.kumar@faculty.edu",
    phone: "+91 98765 12345",
  };



  const achievements = {
    academic: [
      { id: 1, title: "Dean's List 2024", date: "2024-05-15", status: "Approved" },
      { id: 2, title: "Best Project Award", date: "2024-08-20", status: "Approved" },
      { id: 3, title: "Hackathon Winner", date: "2025-09-10", status: "Pending" },
    ],
    extracurricular: [
      { id: 1, title: "Cultural Fest Coordinator", date: "2024-03-10", status: "Approved" },
      { id: 2, title: "Sports Captain", date: "2024-06-01", status: "Approved" },
    ],
  };

  const notifications = [
    { id: 1, title: "Assignment Due Tomorrow", message: "CSE301 - Data Structures assignment submission deadline is tomorrow.", time: "2 hours ago" },

    { id: 3, title: "Mid-Semester Results Published", message: "Your mid-semester exam results are now available.", time: "1 day ago" },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h2 className="mb-6">Student Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="CGPA" value={studentInfo.cgpa} icon={Award} />
          <StatsCard title="Attendance" value={studentInfo.attendance} icon={User} bgColor="bg-green-50" iconColor="text-green-600" />
          <StatsCard title="Semester" value={studentInfo.semester} icon={BookOpen} bgColor="bg-purple-50" iconColor="text-purple-600" />
          <StatsCard title="Achievements" value="5" icon={Award} bgColor="bg-orange-50" iconColor="text-orange-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-100 text-blue-700">PS</AvatarFallback>
                </Avatar>
                <div>
                  <p>{studentInfo.name}</p>
                  <p className="text-sm text-gray-600">{studentInfo.roll}</p>
                  <Badge variant="outline">{studentInfo.section}</Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{studentInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span>{studentInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Semester:</span>
                  <span>{studentInfo.semester}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveSection('attendance')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <User className="h-5 w-5" />
              View Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{studentInfo.attendance}</p>
                <p className="text-sm text-gray-600">Current Attendance</p>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setActiveSection('attendance')}>
                View Detailed Attendance
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm">{notif.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-600" />
            My Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-3 text-blue-700">Academic Achievements</h4>
              <div className="space-y-2">
                {achievements.academic.map((achievement) => (
                  <div key={achievement.id} className="flex items-start justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{new Date(achievement.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={achievement.status === "Approved" ? "bg-green-500" : "bg-yellow-500"}>
                      {achievement.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 text-purple-700">Extracurricular Achievements</h4>
              <div className="space-y-2">
                {achievements.extracurricular.map((achievement) => (
                  <div key={achievement.id} className="flex items-start justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{new Date(achievement.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={achievement.status === "Approved" ? "bg-green-500" : "bg-yellow-500"}>
                      {achievement.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // The student dashboard no longer includes a separate 'profile' page/section here.

  const renderCV = () => (
    <div className="space-y-6">
      <h2>Upload CV</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>CV Upload</CardTitle>
          <p className="text-sm text-gray-600">Upload your latest curriculum vitae</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="mb-2">Drag and drop your CV here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <Button>Browse Files</Button>
            <p className="text-xs text-gray-500 mt-4">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded CVs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm">CV_Priya_Sharma_2025.pdf</p>
                  <p className="text-xs text-gray-500">Uploaded on 2025-10-01 • 2.3 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm">CV_Priya_Sharma_2024.pdf</p>
                  <p className="text-xs text-gray-500">Uploaded on 2024-09-15 • 1.8 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Achievements</h2>
        <Button>Add Achievement</Button>
      </div>

      <Tabs defaultValue="academic">
        <TabsList>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="extracurricular">Extracurricular</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.academic.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Award className="h-8 w-8 text-blue-600" />
                    <Badge 
                      variant="outline" 
                      className={achievement.status === "Approved" ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}
                    >
                      {achievement.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.date}</p>
                  <Button className="w-full mt-4" size="sm" variant="outline">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="extracurricular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.extracurricular.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Award className="h-8 w-8 text-purple-600" />
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {achievement.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.date}</p>
                  <Button className="w-full mt-4" size="sm" variant="outline">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderBOA = () => (
    <div className="space-y-6">
      <BOASubmissionForm />

      <Card>
        <CardHeader>
          <CardTitle>My BOA Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Tech Fest 2025 - Clubs BOA</p>
                    <p className="text-sm text-gray-600">Submitted on 2025-10-10</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-black border-gray-300 text-base px-4 py-1">Pending</Badge>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Sports Day - Outdoor Event BOA</p>
                    <p className="text-sm text-gray-600">Submitted on 2025-10-05</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-black border-gray-300 text-base px-4 py-1">Approved</Badge>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Coding Competition - Event BOA</p>
                    <p className="text-sm text-gray-600">Submitted on 2025-10-12</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-black border-gray-300 text-base px-4 py-1">Rejected</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMentor = () => (
    <div className="space-y-6">
      <h2>Mentor Connection</h2>

      <Card>
        <CardHeader>
          <CardTitle>My Mentor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-purple-100 text-purple-700 text-2xl">RK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="mb-1">{mentorInfo.name}</p>
              <p className="text-sm text-gray-600 mb-4">{mentorInfo.department}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Email:</span>
                  <span>{mentorInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Phone:</span>
                  <span>{mentorInfo.phone}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button>Schedule Meeting</Button>
                <Button variant="outline">Send Message</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meeting History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm">Academic Progress Discussion</p>
                <p className="text-xs text-gray-500">2025-10-10 at 3:00 PM</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm">Career Guidance Session</p>
                <p className="text-xs text-gray-500">2025-09-25 at 2:00 PM</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm">Project Review</p>
                <p className="text-xs text-gray-500">2025-10-16 at 3:00 PM</p>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Upcoming</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2>Notifications</h2>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="mb-1">{notif.title}</p>
                  <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-500">{notif.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      // 'profile' dashboard section removed (standalone profile page retained separately)
      case "timetable":
        return <Timetable userRole="student" />;
      case "cv":
        return renderCV();
      case "achievements":
        return renderAchievements();
      case "boa":
        return renderBOA();
      case "mentor":
        return renderMentor();
      case "notifications":
        return renderNotifications();
      case "attendance":
        return <StudentAttendanceRedesigned onBack={() => setActiveSection("dashboard")} />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex flex-col">
      <DashboardSidebar
        items={sidebarItems}
        activeItem={activeSection}
        onItemClick={setActiveSection}
      />
      <main className="flex-1 p-8 bg-gray-50">
        {renderContent()}
      </main>
      <Toaster />
    </div>
  );
}
