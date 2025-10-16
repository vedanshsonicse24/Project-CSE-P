import { useState } from "react";
import { DashboardSidebar } from "../common/DashboardSidebar";
import { StatsCard } from "../common/StatsCard";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Upload,
  FileText,
  UserCheck,
  Calendar,
  CalendarDays,
  GraduationCap,
} from "lucide-react";
import { Timetable } from "../timetable/Timetable";
import { TeacherTimetable } from "../timetable/TeacherTimetable";
import { AttendancePage } from "../timetable/AttendancePage";
import { BOAManagement } from "../boa/BOAManagement";
import { StudentManagement } from "../student/StudentManagement";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Toaster } from "../ui/sonner";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: UserCheck, label: "Attendance", id: "attendance" },
  { icon: CalendarDays, label: "Timetable", id: "timetable" },
  { icon: GraduationCap, label: "Student Management", id: "student-management" },
  { icon: FileText, label: "Grade Behaviour", id: "grading" },
  { icon: FileText, label: "BOA Approvals", id: "boa" },
  { icon: Calendar, label: "Proxy Lectures", id: "proxy" },
];

export function FacultyDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);

  const classes = [
    { id: 1, code: "CSE301", name: "Data Structures", section: "A", students: 45, time: "9:00 AM - 10:30 AM" },
    { id: 2, code: "CSE302", name: "Database Management", section: "B", students: 42, time: "11:00 AM - 12:30 PM" },
    { id: 3, code: "CSE401", name: "Machine Learning", section: "A", students: 38, time: "2:00 PM - 3:30 PM" },
  ];

  const students = [
    { id: 1, name: "Amit Kumar", roll: "21CS001", attendance: 92, grade: "A", present: true },
    { id: 2, name: "Priya Sharma", roll: "21CS002", attendance: 88, grade: "A", present: true },
    { id: 3, name: "Rahul Verma", roll: "21CS003", attendance: 85, grade: "B+", present: false },
    { id: 4, name: "Sneha Patel", roll: "21CS004", attendance: 95, grade: "A+", present: true },
  ];

  const mentees = [
    { id: 1, name: "Ananya Singh", roll: "21CS010", performance: "Excellent", contact: "ananya@student.edu" },
    { id: 2, name: "Kiran Reddy", roll: "21CS015", performance: "Good", contact: "kiran@student.edu" },
    { id: 3, name: "Pooja Gupta", roll: "21CS020", performance: "Average", contact: "pooja@student.edu" },
  ];

  const proxyLectures = [
    { id: 1, date: "2025-10-10", class: "CSE301", takenBy: "Dr. Sharma", reason: "Conference" },
    { id: 2, date: "2025-10-12", class: "CSE302", takenBy: "Prof. Gupta", reason: "Personal Leave" },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h2 className="mb-6">Faculty Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Classes" value="3" icon={BookOpen} />
          <StatsCard title="Total Students" value="125" icon={Users} bgColor="bg-green-50" iconColor="text-green-600" />
          <StatsCard title="Mentees" value="3" icon={UserCheck} bgColor="bg-purple-50" iconColor="text-purple-600" />
          <StatsCard title="Proxy Lectures" value="2" icon={Calendar} bgColor="bg-orange-50" iconColor="text-orange-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classes.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p>{cls.code} - {cls.name}</p>
                    <p className="text-sm text-gray-600">Section {cls.section} • {cls.students} students</p>
                    <p className="text-xs text-gray-500 mt-1">{cls.time}</p>
                  </div>
                  <Button size="sm">Start Class</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <p>Attendance marked for CSE301</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                <div>
                  <p>Assignment uploaded for CSE302</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 mt-2 rounded-full bg-purple-500"></div>
                <div>
                  <p>Mentee meeting scheduled</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <h2>Upload Documents</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload CV</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Drag and drop your CV here or click to browse</p>
              <Input type="file" className="mt-4" />
            </div>
            <Button className="w-full">Upload CV</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Research Papers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Upload your research papers and publications</p>
              <Input type="file" className="mt-4" multiple />
            </div>
            <Button className="w-full">Upload Papers</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm">CV_John_Doe.pdf</p>
                  <p className="text-xs text-gray-500">Uploaded on 2025-10-01</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm">Research_Paper_AI.pdf</p>
                  <p className="text-xs text-gray-500">Uploaded on 2025-10-05</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMentees = () => (
    <div className="space-y-6">
      <h2>Mentor-Mentee Tracking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentees.map((mentee) => (
          <Card key={mentee.id}>
            <CardHeader>
              <CardTitle>{mentee.name}</CardTitle>
              <p className="text-sm text-gray-600">{mentee.roll}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Performance:</span>
                  <Badge variant={mentee.performance === "Excellent" ? "default" : "secondary"}>
                    {mentee.performance}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <span className="text-xs">{mentee.contact}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full" size="sm">Schedule Meeting</Button>
                <Button className="w-full" size="sm" variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProxy = () => (
    <div className="space-y-6">
      <h2>Proxy Lecture History</h2>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Taken By</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proxyLectures.map((lecture) => (
                <TableRow key={lecture.id}>
                  <TableCell>{lecture.date}</TableCell>
                  <TableCell>{lecture.class}</TableCell>
                  <TableCell>{lecture.takenBy}</TableCell>
                  <TableCell>{lecture.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderGrading = () => (
    <div className="space-y-6">
      <h2>Grade Student Behaviour</h2>
      <Card>
        <CardHeader>
          <CardTitle>CSE301 - Data Structures</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Current Grade</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.roll}</TableCell>
                  <TableCell>
                    <Badge>{student.grade}</Badge>
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Add feedback" className="w-full" />
                  </TableCell>
                  <TableCell>
                    <Button size="sm">Update</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderBOA = () => (
    <div className="space-y-6">
      <h2>BOA Approvals</h2>
      <BOAManagement />
    </div>
  );

  const handleMarkAttendance = (slotId: string) => {
    setSelectedSlotId(slotId);
    setIsMarkingAttendance(true);
  };

  const handleBackFromAttendance = () => {
    setIsMarkingAttendance(false);
    setSelectedSlotId(null);
  };

  const renderContent = () => {
    // If marking attendance, show attendance page
    if (isMarkingAttendance && selectedSlotId) {
      return <AttendancePage slotId={selectedSlotId} onBack={handleBackFromAttendance} />;
    }

    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "attendance":
        return <TeacherTimetable onMarkAttendance={handleMarkAttendance} />;
      case "timetable":
        return <Timetable userRole="faculty" />;
      case "student-management":
        return <StudentManagement />;
      case "upload":
        return renderUpload();
      case "grading":
        return renderGrading();
      case "boa":
        return renderBOA();
      case "proxy":
        return renderProxy();
      case "mentee":
        return renderMentees();
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
