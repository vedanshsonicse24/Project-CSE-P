import { useState } from "react";
import { ArrowLeft, BarChart3, Calendar, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface AttendancePageNewProps {
  userRole?: "student" | "faculty";
  onBack?: () => void;
}

interface AttendanceRecord {
  date: string;
  status: "present" | "absent" | "leave";
  time?: string;
  subject?: string;
}

interface ClassAttendance {
  classCode: string;
  className: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  lastMarked: string;
}

export function AttendancePageNew({ userRole = "student", onBack }: AttendancePageNewProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Student Data
  const studentAttendance: ClassAttendance[] = [
    {
      classCode: "CSE301",
      className: "Data Structures",
      totalClasses: 45,
      attendedClasses: 42,
      percentage: 93,
      lastMarked: "2025-10-30",
    },
    {
      classCode: "CSE302",
      className: "Database Management",
      totalClasses: 40,
      attendedClasses: 35,
      percentage: 87,
      lastMarked: "2025-10-30",
    },
    {
      classCode: "CSE401",
      className: "Machine Learning",
      totalClasses: 35,
      attendedClasses: 32,
      percentage: 91,
      lastMarked: "2025-10-29",
    },
  ];

  const studentAttendanceRecords: AttendanceRecord[] = [
    { date: "2025-10-30", status: "present", time: "9:00 AM", subject: "CSE301" },
    { date: "2025-10-29", status: "present", time: "11:00 AM", subject: "CSE302" },
    { date: "2025-10-28", status: "absent", subject: "CSE401" },
    { date: "2025-10-27", status: "present", time: "2:00 PM", subject: "CSE301" },
    { date: "2025-10-26", status: "leave", subject: "CSE302" },
    { date: "2025-10-25", status: "present", time: "9:00 AM", subject: "CSE401" },
  ];

  // Faculty Data
  const facultyClasses: ClassAttendance[] = [
    {
      classCode: "CSE301",
      className: "Data Structures",
      totalClasses: 45,
      attendedClasses: 45,
      percentage: 100,
      lastMarked: "2025-10-30",
    },
    {
      classCode: "CSE302",
      className: "Database Management",
      totalClasses: 40,
      attendedClasses: 40,
      percentage: 100,
      lastMarked: "2025-10-30",
    },
    {
      classCode: "CSE401",
      className: "Machine Learning",
      totalClasses: 35,
      attendedClasses: 35,
      percentage: 100,
      lastMarked: "2025-10-29",
    },
  ];

  const facultyStudents = [
    { id: 1, name: "Amit Kumar", roll: "21CS001", attendance: 92, status: "present" },
    { id: 2, name: "Priya Sharma", roll: "21CS002", attendance: 88, status: "present" },
    { id: 3, name: "Rahul Verma", roll: "21CS003", attendance: 85, status: "absent" },
    { id: 4, name: "Sneha Patel", roll: "21CS004", attendance: 95, status: "present" },
    { id: 5, name: "Vikram Singh", roll: "21CS005", attendance: 78, status: "absent" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  // Student View
  const renderStudentView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Attendance</h2>
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        )}
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Overall Attendance</p>
              <p className={`text-3xl font-bold ${getAttendanceColor(90)}`}>90.3%</p>
              <Badge className="mt-3 bg-green-100 text-green-800">Good Standing</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Total Classes</p>
              <p className="text-3xl font-bold">120</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Classes Attended</p>
              <p className="text-3xl font-bold">109</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Subject-wise Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentAttendance.map((subject) => (
              <div key={subject.classCode} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{subject.className}</p>
                    <p className="text-sm text-gray-600">{subject.classCode}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getAttendanceColor(subject.percentage)}`}>
                      {subject.percentage}%
                    </p>
                    <p className="text-xs text-gray-600">
                      {subject.attendedClasses}/{subject.totalClasses} classes
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      subject.percentage >= 85
                        ? "bg-green-500"
                        : subject.percentage >= 75
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${subject.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentAttendanceRecords.map((record, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.subject}</TableCell>
                    <TableCell>{record.time || "-"}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Faculty View
  const renderFacultyView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        )}
      </div>

      {/* Class Selection Tabs */}
      <Tabs defaultValue={facultyClasses[0].classCode} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {facultyClasses.map((cls) => (
            <TabsTrigger key={cls.classCode} value={cls.classCode}>
              {cls.classCode}
            </TabsTrigger>
          ))}
        </TabsList>

        {facultyClasses.map((cls) => (
          <TabsContent key={cls.classCode} value={cls.classCode} className="space-y-4">
            {/* Class Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Total Classes</p>
                    <p className="text-3xl font-bold">{cls.totalClasses}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Average Attendance</p>
                    <p className="text-3xl font-bold text-green-600">{cls.percentage}%</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Last Updated</p>
                    <p className="text-sm font-semibold">{cls.lastMarked}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Student Attendance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Student Attendance for {cls.className}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Attendance %</TableHead>
                        <TableHead>Today Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {facultyStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.roll}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <span className={`font-semibold ${getAttendanceColor(student.attendance)}`}>
                              {student.attendance}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(student.status)}>
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {userRole === "student" ? renderStudentView() : renderFacultyView()}
      </div>
    </div>
  );
}
