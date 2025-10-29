import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import SwipeableAttendanceRow from './SwipeableAttendanceRow';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  PieChart, 
  Calendar, 
  Clock,
  Download,
  Info,
  Smartphone,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  attendanceStatus: 'present' | 'absent' | 'unmarked';
}

const sampleStudents: Student[] = [
  { id: '1', name: 'Aarav Kumar', rollNumber: 'CSE2023001', attendanceStatus: 'unmarked' },
  { id: '2', name: 'Priya Sharma', rollNumber: 'CSE2023002', attendanceStatus: 'unmarked' },
  { id: '3', name: 'Rohan Patel', rollNumber: 'CSE2023003', attendanceStatus: 'unmarked' },
  { id: '4', name: 'Ananya Singh', rollNumber: 'CSE2023004', attendanceStatus: 'unmarked' },
  { id: '5', name: 'Arjun Reddy', rollNumber: 'CSE2023005', attendanceStatus: 'unmarked' },
  { id: '6', name: 'Sneha Gupta', rollNumber: 'CSE2023006', attendanceStatus: 'unmarked' },
  { id: '7', name: 'Vikram Joshi', rollNumber: 'CSE2023007', attendanceStatus: 'unmarked' },
  { id: '8', name: 'Ishita Verma', rollNumber: 'CSE2023008', attendanceStatus: 'unmarked' },
];

const AttendanceScheduleDemo = () => {
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = students.length;
    const present = students.filter(s => s.attendanceStatus === 'present').length;
    const absent = students.filter(s => s.attendanceStatus === 'absent').length;
    const unmarked = students.filter(s => s.attendanceStatus === 'unmarked').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, unmarked, percentage };
  }, [students]);

  // Handle attendance change
  const handleAttendanceChange = async (studentId: string, status: 'present' | 'absent') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock API endpoint
      // await fetch('/api/attendance/mark', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     studentId, 
      //     status, 
      //     date: new Date().toISOString() 
      //   })
      // });

      // Update local state
      setStudents(prev => 
        prev.map(student => 
          student.id === studentId 
            ? { ...student, attendanceStatus: status }
            : student
        )
      );

      const student = students.find(s => s.id === studentId);
      toast.success(
        `${student?.name} marked as ${status === 'present' ? 'Present ✓' : 'Absent ✗'}`,
        {
          description: `Roll: ${student?.rollNumber}`,
          duration: 2000,
        }
      );
    } catch (error) {
      toast.error('Failed to update attendance', {
        description: 'Please try again',
      });
      throw error;
    }
  };

  // Mark all students with a specific status
  const handleMarkAll = async (status: 'present' | 'absent') => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      setStudents(prev => 
        prev.map(student => ({ ...student, attendanceStatus: status }))
      );

      toast.success(
        `All students marked as ${status === 'present' ? 'Present' : 'Absent'}`,
        {
          description: `${students.length} students updated`,
        }
      );
    } catch (error) {
      toast.error('Failed to mark all students');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit attendance
  const handleSubmitAttendance = async () => {
    if (statistics.unmarked > 0) {
      toast.warning('Please mark all students before submitting', {
        description: `${statistics.unmarked} student(s) remaining`,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Attendance submitted successfully! 🎉', {
        description: `${statistics.present} present, ${statistics.absent} absent`,
        duration: 3000,
      });
    } catch (error) {
      toast.error('Failed to submit attendance');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Export attendance data
  const handleExportData = () => {
    const csvData = [
      ['Roll Number', 'Name', 'Status'],
      ...students.map(s => [s.rollNumber, s.name, s.attendanceStatus])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast.success('Attendance data exported');
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#eef2ff] dark:from-[#0a0e1a] dark:via-[#1a2b46] dark:to-[#0f1724] p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Data Structures & Algorithms
                </CardTitle>
                <CardDescription className="text-base mt-2 text-gray-700 dark:text-gray-300">
                  Section: CSE-A | Semester: 3rd
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{currentDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{currentTime}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white stat-animation">
                    {statistics.total}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 stat-animation">
                    {statistics.present}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Absent</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400 stat-animation">
                    {statistics.absent}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <PieChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 stat-animation">
                    {statistics.percentage}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Instruction Card */}
        <Card className="md:hidden border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-orange-900 dark:text-orange-200 flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  How to use swipe gestures:
                </p>
                <div className="space-y-1 text-xs text-orange-800 dark:text-orange-300">
                  <p className="flex items-center gap-2">
                    <ArrowLeft className="h-3 w-3" />
                    <span>Swipe <strong>LEFT</strong> to mark <strong className="text-green-600 dark:text-green-400">PRESENT</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    <span>Swipe <strong>RIGHT</strong> to mark <strong className="text-red-600 dark:text-red-400">ABSENT</strong></span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => handleMarkAll('present')}
            disabled={isSubmitting}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-base"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark All Present
          </Button>
          <Button
            onClick={() => handleMarkAll('absent')}
            disabled={isSubmitting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-base"
          >
            <XCircle className="h-5 w-5 mr-2" />
            Mark All Absent
          </Button>
          <Button
            onClick={handleExportData}
            disabled={isSubmitting}
            variant="outline"
            className="sm:w-auto border-2 font-semibold py-6 text-base"
          >
            <Download className="h-5 w-5 mr-2" />
            Export
          </Button>
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Student Attendance List</CardTitle>
            <CardDescription>
              {statistics.unmarked > 0 
                ? `${statistics.unmarked} student(s) pending` 
                : 'All students marked ✓'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-0">
              {students.map((student) => (
                <SwipeableAttendanceRow
                  key={student.id}
                  studentId={student.id}
                  studentName={student.name}
                  rollNumber={student.rollNumber}
                  initialStatus={student.attendanceStatus}
                  onStatusChange={handleAttendanceChange}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmitAttendance}
          disabled={statistics.unmarked > 0 || isSubmitting}
          className="w-full bg-gradient-to-r from-maroon-600 to-orange-600 hover:from-maroon-700 hover:to-orange-700 text-white font-bold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="attendance-spinner inline-block mr-2">⏳</span>
              Submitting...
            </>
          ) : (
            <>
              Submit Attendance
              {statistics.unmarked > 0 && ` (${statistics.unmarked} pending)`}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AttendanceScheduleDemo;
