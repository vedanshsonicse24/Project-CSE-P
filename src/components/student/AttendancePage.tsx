import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  BookOpen,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AttendanceRecord {
  id: number;
  date: string;
  subject: string;
  status: "present" | "absent" | "leave";
  time: string;
}

interface SubjectAttendance {
  subject: string;
  total: number;
  present: number;
  absent: number;
  leave: number;
  percentage: number;
}

export function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "present" | "absent" | "leave">("all");

  // Sample attendance data
  const subjectAttendance: SubjectAttendance[] = [
    { subject: "Data Structures", total: 45, present: 42, absent: 2, leave: 1, percentage: 93 },
    { subject: "Web Development", total: 40, present: 38, absent: 1, leave: 1, percentage: 95 },
    { subject: "Database Management", total: 42, present: 39, absent: 2, leave: 1, percentage: 93 },
    { subject: "Algorithms", total: 38, present: 35, absent: 2, leave: 1, percentage: 92 },
    { subject: "AI & ML", total: 35, present: 32, absent: 2, leave: 1, percentage: 91 },
  ];

  const attendanceRecords: AttendanceRecord[] = [
    { id: 1, date: "2025-10-30", subject: "Data Structures", status: "present", time: "09:00 AM" },
    { id: 2, date: "2025-10-30", subject: "Web Development", status: "present", time: "10:30 AM" },
    { id: 3, date: "2025-10-29", subject: "Database Management", status: "absent", time: "02:00 PM" },
    { id: 4, date: "2025-10-29", subject: "Algorithms", status: "present", time: "01:00 PM" },
    { id: 5, date: "2025-10-28", subject: "AI & ML", status: "leave", time: "09:00 AM" },
    { id: 6, date: "2025-10-28", subject: "Data Structures", status: "present", time: "10:30 AM" },
    { id: 7, date: "2025-10-27", subject: "Web Development", status: "present", time: "09:00 AM" },
    { id: 8, date: "2025-10-26", subject: "Database Management", status: "present", time: "02:00 PM" },
  ];

  // Calculate overall stats
  const totalClasses = attendanceRecords.length;
  const totalPresent = attendanceRecords.filter((r) => r.status === "present").length;
  const totalAbsent = attendanceRecords.filter((r) => r.status === "absent").length;
  const totalLeave = attendanceRecords.filter((r) => r.status === "leave").length;
  const overallPercentage = Math.round((totalPresent / totalClasses) * 100);

  // Pie chart data
  const pieData = [
    { name: "Present", value: totalPresent, color: "#10b981" },
    { name: "Absent", value: totalAbsent, color: "#ef4444" },
    { name: "Leave", value: totalLeave, color: "#f59e0b" },
  ];

  // Bar chart data
  const barData = subjectAttendance.map((s) => ({
    subject: s.subject.split(" ")[0], // Shortened name
    percentage: s.percentage,
  }));

  // Filter records
  const filteredRecords =
    filterStatus === "all"
      ? attendanceRecords
      : attendanceRecords.filter((r) => r.status === filterStatus);

  const searchedRecords = filteredRecords.filter(
    (r) =>
      r.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.date.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-300";
      case "absent":
        return "bg-red-100 text-red-800 border-red-300";
      case "leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "absent":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "leave":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-4xl font-bold text-blue-900">Attendance Tracking</h1>
          <p className="text-gray-600">Monitor your class attendance and statistics</p>
        </div>
      </div>

      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-white/90 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium mb-2">Overall Attendance</p>
              <p className="text-4xl font-bold text-blue-600">{overallPercentage}%</p>
              <p className="text-xs text-gray-500 mt-2">{totalPresent}/{totalClasses} Classes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-2 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-gray-600 text-sm font-medium">Present</p>
              </div>
              <p className="text-3xl font-bold text-green-600">{totalPresent}</p>
              <p className="text-xs text-gray-500 mt-1">Classes Attended</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-2 border-red-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-gray-600 text-sm font-medium">Absent</p>
              </div>
              <p className="text-3xl font-bold text-red-600">{totalAbsent}</p>
              <p className="text-xs text-gray-500 mt-1">Classes Missed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-2 border-yellow-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-gray-600 text-sm font-medium">Leave</p>
              </div>
              <p className="text-3xl font-bold text-yellow-600">{totalLeave}</p>
              <p className="text-xs text-gray-500 mt-1">Leaves Taken</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-2 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-purple-600 mr-2" />
                <p className="text-gray-600 text-sm font-medium">Total</p>
              </div>
              <p className="text-3xl font-bold text-purple-600">{totalClasses}</p>
              <p className="text-xs text-gray-500 mt-1">All Classes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="bg-white/90 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Attendance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="bg-white/90 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Subject-wise Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Detailed View */}
      <Card className="bg-white/90 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle>Subject-wise Attendance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50 border-b-2 border-blue-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Subject</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Total</th>
                  <th className="text-center p-4 font-semibold text-green-700">Present</th>
                  <th className="text-center p-4 font-semibold text-red-700">Absent</th>
                  <th className="text-center p-4 font-semibold text-yellow-700">Leave</th>
                  <th className="text-center p-4 font-semibold text-blue-700">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {subjectAttendance.map((attendance, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-800">{attendance.subject}</td>
                    <td className="text-center p-4 text-gray-600">{attendance.total}</td>
                    <td className="text-center p-4">
                      <Badge className="bg-green-100 text-green-800 border border-green-300">
                        {attendance.present}
                      </Badge>
                    </td>
                    <td className="text-center p-4">
                      <Badge className="bg-red-100 text-red-800 border border-red-300">
                        {attendance.absent}
                      </Badge>
                    </td>
                    <td className="text-center p-4">
                      <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                        {attendance.leave}
                      </Badge>
                    </td>
                    <td className="text-center p-4 font-semibold">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          attendance.percentage >= 85
                            ? "text-green-700"
                            : attendance.percentage >= 75
                            ? "text-yellow-700"
                            : "text-red-700"
                        }`}
                      >
                        {attendance.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records with Filters */}
      <Card className="bg-white/90 border-blue-200 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Attendance Records</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                className="text-sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "present" ? "default" : "outline"}
                onClick={() => setFilterStatus("present")}
                className="text-sm bg-green-100 text-green-800 hover:bg-green-200"
              >
                Present
              </Button>
              <Button
                variant={filterStatus === "absent" ? "default" : "outline"}
                onClick={() => setFilterStatus("absent")}
                className="text-sm bg-red-100 text-red-800 hover:bg-red-200"
              >
                Absent
              </Button>
              <Button
                variant={filterStatus === "leave" ? "default" : "outline"}
                onClick={() => setFilterStatus("leave")}
                className="text-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              >
                Leave
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Box */}
          <div className="mb-4">
            <Label htmlFor="search" className="mb-2 block">
              Search by Subject or Date
            </Label>
            <Input
              id="search"
              placeholder="e.g., 'Data Structures' or '2025-10-30'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-blue-200 focus:border-blue-400"
            />
          </div>

          {/* Records List */}
          <div className="space-y-3">
            {searchedRecords.length > 0 ? (
              searchedRecords.map((record) => (
                <div
                  key={record.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${getStatusColor(
                    record.status
                  )}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-semibold">{record.subject}</p>
                      <p className="text-xs opacity-75">
                        {record.date} • {record.time}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`capitalize font-semibold ${getStatusColor(record.status)}`}
                  >
                    {record.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No records found matching your search criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Guidelines */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-900">Attendance Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Minimum Attendance:</strong> 75% attendance is mandatory to appear in semester
              exams.
            </p>
          </div>
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Approved Leave:</strong> Medical or emergency leaves will be counted separately
              and won't affect your attendance percentage.
            </p>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Late Arrival:</strong> Arriving more than 15 minutes late may result in absence
              marking.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
