import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, TrendingUp, CheckCircle, XCircle, CalendarDays, Award, BarChart3, PieChart as PieChartIcon, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import gsap from 'gsap';
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface SubjectAttendance {
  subject: string;
  total: number;
  attended: number;
  percentage: number;
  benefitOfAttendance: number;
}

interface AttendanceStats {
  totalClasses: number;
  attended: number;
  percentage: number;
  totalBenefitOfAttendance: number;
}

interface StudentAttendanceRedesignedProps {
  onBack?: () => void;
}

// Sample data - Mock attendance data
const subjectData: SubjectAttendance[] = [
  { subject: 'Data Structures', total: 45, attended: 42, percentage: 93, benefitOfAttendance: 1 },
  { subject: 'Database Systems', total: 40, attended: 35, percentage: 87, benefitOfAttendance: 0 },
  { subject: 'Machine Learning', total: 35, attended: 32, percentage: 91, benefitOfAttendance: 1 },
  { subject: 'Web Development', total: 30, attended: 28, percentage: 93, benefitOfAttendance: 0 },
  { subject: 'Operating Systems', total: 38, attended: 33, percentage: 87, benefitOfAttendance: 1 },
];

const statsData: AttendanceStats = {
  totalClasses: 188,
  attended: 170,
  percentage: 90,
  totalBenefitOfAttendance: 3,
};

export function StudentAttendanceRedesigned({ onBack }: StudentAttendanceRedesignedProps) {
  const headerRef = useRef(null);
  const summaryCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const boaCardRef = useRef(null);
  const subjectCardsRef = useRef(null);

  // Chart data
  const barChartData = subjectData.map(s => ({
    subject: s.subject.split(' ')[0], // Short name for X-axis
    percentage: s.percentage,
    fill: s.percentage >= 85 ? '#10b981' : s.percentage >= 75 ? '#f59e0b' : '#ef4444',
  }));

  const pieChartData = [
    { name: 'Present', value: statsData.attended, color: '#10b981' },
    { name: 'Absent', value: statsData.totalClasses - statsData.attended - 7, color: '#ef4444' },
    { name: 'Medical Leave', value: 7, color: '#3b82f6' },
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

    // Removed chart entrance animations for bar and pie charts to make them load statically

    // BOA card animation
    if (boaCardRef.current) {
      tl.from(
        boaCardRef.current,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Animated Header */}
        <div ref={headerRef} className="attendance-header flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Your Attendance Dashboard
            </h1>
            <p className="text-gray-600 mt-3 text-lg">Visual breakdown of your academic presence</p>
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

        {/* Summary Strip - 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Attendance Percentage */}
          <div
            ref={(el) => {
              if (el) summaryCardsRef.current[0] = el;
            }}
          >
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Attendance</p>
                    <p className="text-4xl font-black text-indigo-600 mt-2">{statsData.percentage}%</p>
                    <p className="text-xs text-gray-500 mt-1">Overall performance</p>
                  </div>
                  <div className="bg-indigo-100 p-4 rounded-full">
                    <TrendingUp className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Total Classes */}
          <div
            ref={(el) => {
              if (el) summaryCardsRef.current[1] = el;
            }}
          >
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Classes</p>
                    <p className="text-4xl font-black text-purple-600 mt-2">{statsData.totalClasses}</p>
                    <p className="text-xs text-gray-500 mt-1">Conducted so far</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-full">
                    <CalendarDays className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Classes Attended */}
          <div
            ref={(el) => {
              if (el) summaryCardsRef.current[2] = el;
            }}
          >
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Attended</p>
                    <p className="text-4xl font-black text-green-600 mt-2">{statsData.attended}</p>
                    <p className="text-xs text-gray-500 mt-1">Classes present</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* BOA Added */}
          <div
            ref={(el) => {
              if (el) summaryCardsRef.current[3] = el;
            }}
          >
            <Card className="bg-gradient-to-br from-red-500 to-pink-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">BOA</p>
                    <p className="text-4xl font-black text-gray-900 mt-2">{statsData.totalBenefitOfAttendance}</p>
                    <p className="text-xs text-gray-900 font-semibold mt-1">Total entries added</p>
                  </div>
                  <div className="bg-white/30 p-4 rounded-full backdrop-blur-sm">
                    <FileText className="h-8 w-8 text-gray-900" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart - Subject-wise Attendance */}
          <div ref={barChartRef} className="bar-chart">
            <Card className="bg-white border-0 shadow-xl h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-indigo-600" />
                  </div>
                  Subject-wise Performance
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">Color-coded by attendance threshold</p>
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
                    <Bar dataKey="percentage" radius={[12, 12, 0, 0]} isAnimationActive={false} />
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

          {/* Pie Chart - Attendance Distribution */}
          <div ref={pieChartRef} className="pie-chart">
            <Card className="bg-white border-0 shadow-xl h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <PieChartIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  Attendance Distribution
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">Breakdown of your presence status</p>
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
                      isAnimationActive={false}
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
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {pieChartData[0].value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{pieChartData[0].name}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {pieChartData[1].value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{pieChartData[1].name}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {pieChartData[2].value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{pieChartData[2].name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BOA Section */}
        <div ref={boaCardRef}>
          <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-red-700">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Award className="h-7 w-7 text-red-600" />
                </div>
                BOA
              </CardTitle>
              <p className="text-sm text-gray-700 mt-2">
                BOA entries are added to improve your attendance record when circumstances prevent your presence
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-md">
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Total BOA Added</p>
                  <p className="text-5xl font-black text-red-600 mt-2">{statsData.totalBenefitOfAttendance}</p>
                  <p className="text-sm text-gray-500 mt-2">Across all subjects</p>
                </div>
                <div className="space-y-2">
                  {subjectData.filter(s => s.benefitOfAttendance > 0).map((subject, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                      <span className="text-sm font-medium text-gray-700">{subject.subject}</span>
                      <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {subject.benefitOfAttendance} Benefit
                      </span>
                    </div>
                  ))}
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
              <p className="text-sm text-gray-600 mt-2">In-depth breakdown of attendance per subject</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {subjectData.map((subject, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-6 rounded-xl border-2 shadow-md ${getPercentageBg(subject.percentage)} transition-all hover:shadow-lg`}
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-800 mb-2">{subject.subject}</h4>
                      <p className="text-sm text-gray-600">
                        {subject.attended} / {subject.total} classes attended
                      </p>
                      {subject.benefitOfAttendance > 0 && (
                        <p className="text-xs text-red-600 font-semibold mt-1.5">
                          + {subject.benefitOfAttendance} BOA added
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end justify-center gap-2">
                      <p className={`text-5xl font-black leading-none ${getPercentageColor(subject.percentage)}`}>
                        {subject.percentage}%
                      </p>
                      {subject.percentage >= 85 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs font-semibold text-green-700">Excellent</span>
                        </div>
                      )}
                      {subject.percentage < 75 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 rounded-full">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-xs font-semibold text-red-700">Needs Improvement</span>
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
