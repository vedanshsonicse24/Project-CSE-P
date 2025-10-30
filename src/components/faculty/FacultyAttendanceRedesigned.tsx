import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, TrendingUp, CheckCircle, XCircle, CalendarDays, Award, BarChart3, PieChart as PieChartIcon, Users, BookOpen, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import gsap from 'gsap';
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface SubjectAttendance {
  subject: string;
  subjectCode: string;
  totalClasses: number;
  classesConducted: number;
  averageAttendance: number;
  section: string;
  totalStudents: number;
}

interface AttendanceStats {
  totalClassesConducted: number;
  totalClassesScheduled: number;
  averageStudentAttendance: number;
  totalStudents: number;
  subjectsTeaching: number;
}

interface FacultyAttendanceRedesignedProps {
  onBack?: () => void;
}

// Sample data - Mock faculty attendance data
const subjectData: SubjectAttendance[] = [
  { subject: 'Data Structures', subjectCode: 'CSE301', totalClasses: 45, classesConducted: 43, averageAttendance: 92, section: 'A', totalStudents: 48 },
  { subject: 'Database Systems', subjectCode: 'CSE302', totalClasses: 40, classesConducted: 38, averageAttendance: 88, section: 'B', totalStudents: 45 },
  { subject: 'Machine Learning', subjectCode: 'CSE401', totalClasses: 35, classesConducted: 34, averageAttendance: 94, section: 'A', totalStudents: 42 },
  { subject: 'Web Development', subjectCode: 'CSE303', totalClasses: 30, classesConducted: 30, averageAttendance: 90, section: 'C', totalStudents: 50 },
  { subject: 'Operating Systems', subjectCode: 'CSE402', totalClasses: 38, classesConducted: 36, averageAttendance: 86, section: 'B', totalStudents: 46 },
];

const statsData: AttendanceStats = {
  totalClassesConducted: 181,
  totalClassesScheduled: 188,
  averageStudentAttendance: 90,
  totalStudents: 231,
  subjectsTeaching: 5,
};

export function FacultyAttendanceRedesigned({ onBack }: FacultyAttendanceRedesignedProps) {
  const headerRef = useRef(null);
  const summaryCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const performanceCardRef = useRef(null);
  const subjectCardsRef = useRef(null);

  // Chart data
  const barChartData = subjectData.map(s => ({
    subject: s.subjectCode,
    attendance: s.averageAttendance,
    fill: s.averageAttendance >= 85 ? '#10b981' : s.averageAttendance >= 75 ? '#f59e0b' : '#ef4444',
  }));

  const pieChartData = [
    { name: 'Classes Conducted', value: statsData.totalClassesConducted, color: '#10b981' },
    { name: 'Pending Classes', value: statsData.totalClassesScheduled - statsData.totalClassesConducted, color: '#f59e0b' },
  ];

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    if (headerRef.current) {
      tl.from(headerRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    // Summary cards stagger
    if (summaryCardsRef.current.length > 0) {
      tl.from(
        summaryCardsRef.current.filter(card => card !== null),
        {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }

    // Bar chart animation
    if (barChartRef.current) {
      tl.from(
        barChartRef.current,
        {
          scaleY: 0,
          transformOrigin: 'bottom',
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)',
        },
        '-=0.2'
      );
    }

    // Pie chart animation
    if (pieChartRef.current) {
      tl.from(
        pieChartRef.current,
        {
          scale: 0.5,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      );
    }

    // Performance card animation
    if (performanceCardRef.current) {
      tl.from(
        performanceCardRef.current,
        {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }

    // Subject cards animation
    if (subjectCardsRef.current) {
      tl.from(
        subjectCardsRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }
  }, []);

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPercentageBg = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-50 border-green-200';
    if (percentage >= 75) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getConductedPercentage = () => {
    return Math.round((statsData.totalClassesConducted / statsData.totalClassesScheduled) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Animated Header */}
        <div ref={headerRef} className="attendance-header flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Faculty Attendance Dashboard
            </h1>
            <p className="text-gray-600 mt-3 text-lg">Comprehensive overview of classes and student attendance</p>
          </div>
          {onBack && (
            <Button
              onClick={onBack}
              variant="outline"
              className="gap-2 hover:bg-indigo-50 border-indigo-300 text-gray-800 hover:text-indigo-700 hover:border-indigo-500 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        {/* Summary Strip - 5 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Classes Conducted */}
          <div
            ref={(el) => {
              if (el) summaryCardsRef.current[0] = el;
            }}
          >
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Conducted</p>
                    <p className="text-4xl font-black text-indigo-600 mt-2">{statsData.totalClassesConducted}</p>
                    <p className="text-xs text-gray-500 mt-1">Classes taken</p>
                  </div>
                  <div className="bg-indigo-100 p-4 rounded-full">
                    <CheckCircle className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Total Scheduled */}
          <div
            ref={(el) => {
              if (el) summaryCardsRef.current[1] = el;
            }}
          >
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Scheduled</p>
                    <p className="text-4xl font-black text-purple-600 mt-2">{statsData.totalClassesScheduled}</p>
                    <p className="text-xs text-gray-500 mt-1">Total classes</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-full">
                    <CalendarDays className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subjects Teaching */}
          <div
            ref={(el) => {
              if (el) summaryCardsRef.current[2] = el;
            }}
          >
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Subjects</p>
                    <p className="text-4xl font-black text-green-600 mt-2">{statsData.subjectsTeaching}</p>
                    <p className="text-xs text-gray-500 mt-1">Currently teaching</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-full">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Total Students */}
          <div
            ref={(el) => {
              if (el) summaryCardsRef.current[3] = el;
            }}
          >
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Students</p>
                    <p className="text-4xl font-black text-blue-600 mt-2">{statsData.totalStudents}</p>
                    <p className="text-xs text-gray-500 mt-1">Total enrolled</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Average Attendance */}
          <div
            ref={(el) => {
              if (el) summaryCardsRef.current[4] = el;
            }}
          >
            <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wide">Avg Attendance</p>
                    <p className="text-4xl font-black text-white mt-2">{statsData.averageStudentAttendance}%</p>
                    <p className="text-xs text-white/90 font-semibold mt-1">Student presence</p>
                  </div>
                  <div className="bg-white/30 p-4 rounded-full backdrop-blur-sm">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart - Subject-wise Student Attendance */}
          <div ref={barChartRef} className="bar-chart">
            <Card className="bg-white border-0 shadow-xl h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-indigo-600" />
                  </div>
                  Subject-wise Student Attendance
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">Average student attendance across subjects</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="subject" 
                      tick={{ fontSize: 13, fill: '#6b7280' }}
                      axisLine={{ stroke: '#d1d5db' }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fontSize: 13, fill: '#6b7280' }}
                      axisLine={{ stroke: '#d1d5db' }}
                      label={{ value: 'Attendance %', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
                    />
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      }}
                      cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                    />
                    <Bar dataKey="attendance" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-600">&gt;85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm text-gray-600">75-85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-600">&lt;75%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pie Chart - Classes Distribution */}
          <div ref={pieChartRef} className="pie-chart">
            <Card className="bg-white border-0 shadow-xl h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <PieChartIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  Classes Distribution
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">Your class completion status</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={110}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${value} classes`}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {pieChartData[0].value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{pieChartData[0].name}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {pieChartData[1].value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{pieChartData[1].name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Overview Section */}
        <div ref={performanceCardRef}>
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-700">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Award className="h-7 w-7 text-blue-600" />
                </div>
                Teaching Performance Overview
              </CardTitle>
              <p className="text-sm text-gray-700 mt-2">
                Your overall teaching effectiveness and class completion rate
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Class Completion</p>
                  </div>
                  <p className="text-5xl font-black text-green-600 mt-2">{getConductedPercentage()}%</p>
                  <p className="text-sm text-gray-500 mt-2">{statsData.totalClassesConducted} of {statsData.totalClassesScheduled} classes</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Pending Classes</p>
                  </div>
                  <p className="text-5xl font-black text-purple-600 mt-2">{statsData.totalClassesScheduled - statsData.totalClassesConducted}</p>
                  <p className="text-sm text-gray-500 mt-2">Yet to be conducted</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Avg Class Size</p>
                  </div>
                  <p className="text-5xl font-black text-orange-600 mt-2">{Math.round(statsData.totalStudents / statsData.subjectsTeaching)}</p>
                  <p className="text-sm text-gray-500 mt-2">Students per subject</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Detailed Breakdown */}
        <div ref={subjectCardsRef}>
          <Card className="bg-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Detailed Subject Analysis</CardTitle>
              <p className="text-sm text-gray-600 mt-2">In-depth breakdown of each subject you teach</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {subjectData.map((subject, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-6 rounded-xl border-2 shadow-md ${getPercentageBg(subject.averageAttendance)} transition-all hover:shadow-lg`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg text-gray-800">{subject.subject}</h4>
                        <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-semibold text-gray-700">
                          {subject.subjectCode}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 rounded-full text-xs font-semibold text-blue-700">
                          Section {subject.section}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Classes Conducted</p>
                          <p className="text-sm font-semibold text-gray-700">
                            {subject.classesConducted} / {subject.totalClasses}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Students</p>
                          <p className="text-sm font-semibold text-gray-700">
                            {subject.totalStudents} students
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center gap-2">
                      <p className={`text-5xl font-black leading-none ${getPercentageColor(subject.averageAttendance)}`}>
                        {subject.averageAttendance}%
                      </p>
                      <p className="text-xs text-gray-500 font-medium">Avg Student Attendance</p>
                      {subject.averageAttendance >= 85 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs font-semibold text-green-700">Excellent</span>
                        </div>
                      )}
                      {subject.averageAttendance >= 75 && subject.averageAttendance < 85 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 rounded-full">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span className="text-xs font-semibold text-yellow-700">Good</span>
                        </div>
                      )}
                      {subject.averageAttendance < 75 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 rounded-full">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-xs font-semibold text-red-700">Needs Attention</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
