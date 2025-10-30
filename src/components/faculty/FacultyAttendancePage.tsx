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
  LineChart,
  Line,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BookOpen,
  Users,
  Award,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface TeachingSession {
  id: number;
  date: string;
  subject: string;
  class: string;
  startTime: string;
  endTime: string;
  hoursDelivered: number;
  studentsPresent: number;
  totalStudents: number;
  status: "completed" | "scheduled" | "cancelled";
}

interface ClassAttendance {
  subject: string;
  code: string;
  totalClasses: number;
  classesDelivered: number;
  classesCancelled: number;
  totalHours: number;
  hoursDelivered: number;
  percentage: number;
}

export function FacultyAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "scheduled" | "cancelled">("all");

  // Sample faculty teaching data
  const classAttendance: ClassAttendance[] = [
    { subject: "Data Structures", code: "CSE301", totalClasses: 30, classesDelivered: 28, classesCancelled: 0, totalHours: 60, hoursDelivered: 56, percentage: 93 },
    { subject: "Web Development", code: "CSE302", totalClasses: 28, classesDelivered: 27, classesCancelled: 0, totalHours: 56, hoursDelivered: 54, percentage: 96 },
    { subject: "Database Management", code: "CSE303", totalClasses: 26, classesDelivered: 24, classesCancelled: 1, totalHours: 52, hoursDelivered: 48, percentage: 92 },
    { subject: "Algorithms", code: "CSE304", totalClasses: 32, classesDelivered: 30, classesCancelled: 0, totalHours: 64, hoursDelivered: 60, percentage: 94 },
  ];

  const teachingSessions: TeachingSession[] = [
    { id: 1, date: "2025-10-30", subject: "Data Structures", class: "Section A", startTime: "09:00 AM", endTime: "10:30 AM", hoursDelivered: 1.5, studentsPresent: 42, totalStudents: 45, status: "completed" },
    { id: 2, date: "2025-10-30", subject: "Algorithms", class: "Section B", startTime: "11:00 AM", endTime: "12:30 PM", hoursDelivered: 1.5, studentsPresent: 38, totalStudents: 40, status: "completed" },
    { id: 3, date: "2025-10-29", subject: "Web Development", class: "Section A", startTime: "02:00 PM", endTime: "03:30 PM", hoursDelivered: 1.5, studentsPresent: 40, totalStudents: 42, status: "completed" },
    { id: 4, date: "2025-10-29", subject: "Database Management", class: "Section C", startTime: "01:00 PM", endTime: "02:00 PM", hoursDelivered: 0, totalStudents: 38, studentsPresent: 0, status: "cancelled" },
    { id: 5, date: "2025-10-31", subject: "Data Structures", class: "Section B", startTime: "10:30 AM", endTime: "12:00 PM", hoursDelivered: 0, studentsPresent: 0, totalStudents: 40, status: "scheduled" },
    { id: 6, date: "2025-10-28", subject: "Algorithms", class: "Section A", startTime: "09:00 AM", endTime: "10:30 AM", hoursDelivered: 1.5, studentsPresent: 39, totalStudents: 41, status: "completed" },
  ];

  // Calculate overall stats
  const totalScheduledClasses = teachingSessions.length;
  const totalCompletedClasses = teachingSessions.filter((s) => s.status === "completed").length;
  const totalCancelledClasses = teachingSessions.filter((s) => s.status === "cancelled").length;
  const totalScheduledClasses_ = teachingSessions.filter((s) => s.status === "scheduled").length;
  const totalHoursDelivered = teachingSessions
    .filter((s) => s.status === "completed")
    .reduce((sum, s) => sum + s.hoursDelivered, 0);
  const overallPercentage = Math.round((totalCompletedClasses / (totalCompletedClasses + totalCancelledClasses)) * 100);

  // Pie chart data
  const pieData = [
    { name: "Completed", value: totalCompletedClasses, color: "#10b981" },
    { name: "Cancelled", value: totalCancelledClasses, color: "#ef4444" },
    { name: "Scheduled", value: totalScheduledClasses_, color: "#f59e0b" },
  ];

  // Bar chart data
  const barData = classAttendance.map((c) => ({
    subject: c.code,
    percentage: c.percentage,
  }));

  // Line chart data (weekly hours delivered)
  const weeklyData = [
    { week: "Week 1", hours: 12 },
    { week: "Week 2", hours: 13.5 },
    { week: "Week 3", hours: 12 },
    { week: "Week 4", hours: 11.5 },
    { week: "Week 5", hours: 13 },
  ];

  // Filter records
  const filteredSessions =
    filterStatus === "all"
      ? teachingSessions
      : teachingSessions.filter((s) => s.status === filterStatus);

  const searchedSessions = filteredSessions.filter(
    (s) =>
      s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.date.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "scheduled":
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
          <h1 className="text-4xl font-bold text-blue-900">Faculty Attendance & Teaching Hours</h1>
          <p className="text-gray-600">Track your class sessions and teaching hours delivery</p>
        </div>
      </div>

      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-white/90 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium mb-2">Completion Rate</p>
              <p className="text-4xl font-bold text-blue-600">{overallPercentage}%</p>
              <p className="text-xs text-gray-500 mt-2">{totalCompletedClasses}/{totalCompletedClasses + totalCancelledClasses} Classes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-2 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-gray-600 text-sm font-medium">Completed</p>
              </div>
              <p className="text-3xl font-bold text-green-600">{totalCompletedClasses}</p>
              <p className="text-xs text-gray-500 mt-1">Classes Delivered</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-2 border-red-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-gray-600 text-sm font-medium">Cancelled</p>
              </div>
              <p className="text-3xl font-bold text-red-600">{totalCancelledClasses}</p>
              <p className="text-xs text-gray-500 mt-1">Classes Cancelled</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-2 border-yellow-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-gray-600 text-sm font-medium">Scheduled</p>
              </div>
              <p className="text-3xl font-bold text-yellow-600">{totalScheduledClasses_}</p>
              <p className="text-xs text-gray-500 mt-1">Upcoming Classes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-2 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-purple-600 mr-2" />
                <p className="text-gray-600 text-sm font-medium">Hours</p>
              </div>
              <p className="text-3xl font-bold text-purple-600">{totalHoursDelivered}</p>
              <p className="text-xs text-gray-500 mt-1">Total Delivered</p>
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
              Class Delivery Summary
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
              Class-wise Delivery Rate
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

      {/* Weekly Hours Chart */}
      <Card className="bg-white/90 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Weekly Teaching Hours Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Class-wise Detailed View */}
      <Card className="bg-white/90 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle>Class-wise Teaching Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50 border-b-2 border-blue-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Subject Code</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Total</th>
                  <th className="text-center p-4 font-semibold text-green-700">Delivered</th>
                  <th className="text-center p-4 font-semibold text-red-700">Cancelled</th>
                  <th className="text-center p-4 font-semibold text-yellow-700">Hours</th>
                  <th className="text-center p-4 font-semibold text-blue-700">Delivery %</th>
                </tr>
              </thead>
              <tbody>
                {classAttendance.map((attendance, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-800">{attendance.code}</td>
                    <td className="text-center p-4 text-gray-600">{attendance.totalClasses}</td>
                    <td className="text-center p-4">
                      <Badge className="bg-green-100 text-green-800 border border-green-300">
                        {attendance.classesDelivered}
                      </Badge>
                    </td>
                    <td className="text-center p-4">
                      <Badge className="bg-red-100 text-red-800 border border-red-300">
                        {attendance.classesCancelled}
                      </Badge>
                    </td>
                    <td className="text-center p-4">
                      <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                        {attendance.hoursDelivered}/{attendance.totalHours}
                      </Badge>
                    </td>
                    <td className="text-center p-4 font-semibold">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          attendance.percentage >= 90
                            ? "text-green-700"
                            : attendance.percentage >= 80
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

      {/* Teaching Sessions with Filters */}
      <Card className="bg-white/90 border-blue-200 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Teaching Sessions</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                className="text-sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                onClick={() => setFilterStatus("completed")}
                className="text-sm bg-green-100 text-green-800 hover:bg-green-200"
              >
                Completed
              </Button>
              <Button
                variant={filterStatus === "cancelled" ? "default" : "outline"}
                onClick={() => setFilterStatus("cancelled")}
                className="text-sm bg-red-100 text-red-800 hover:bg-red-200"
              >
                Cancelled
              </Button>
              <Button
                variant={filterStatus === "scheduled" ? "default" : "outline"}
                onClick={() => setFilterStatus("scheduled")}
                className="text-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              >
                Scheduled
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Box */}
          <div className="mb-4">
            <Label htmlFor="search" className="mb-2 block">
              Search by Subject, Class or Date
            </Label>
            <Input
              id="search"
              placeholder="e.g., 'Data Structures' or 'Section A' or '2025-10-30'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-blue-200 focus:border-blue-400"
            />
          </div>

          {/* Sessions List */}
          <div className="space-y-3">
            {searchedSessions.length > 0 ? (
              searchedSessions.map((session) => (
                <div
                  key={session.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${getStatusColor(
                    session.status
                  )}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getStatusIcon(session.status)}
                    <div>
                      <p className="font-semibold">{session.subject} - {session.class}</p>
                      <p className="text-xs opacity-75">
                        {session.date} • {session.startTime} - {session.endTime}
                      </p>
                      {session.status === "completed" && (
                        <p className="text-xs opacity-75 mt-1">
                          Students: {session.studentsPresent}/{session.totalStudents} | Hours: {session.hoursDelivered}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`capitalize font-semibold ${getStatusColor(session.status)}`}
                    >
                      {session.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No sessions found matching your search criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Teaching Guidelines */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-900">Faculty Teaching Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Minimum Classes:</strong> Ensure to deliver at least 90% of assigned classes per semester.
            </p>
          </div>
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Class Cancellation:</strong> Any class cancellation should be prior informed to administration and reschedule within 2 weeks.
            </p>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Teaching Hours:</strong> Each class is {classAttendance[0]?.totalHours / classAttendance[0]?.totalClasses || "1.5"} hours. Maintain punctuality.
            </p>
          </div>
          <div className="flex gap-3">
            <Users className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Student Engagement:</strong> Maintain detailed records of student attendance and participation in each session.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
