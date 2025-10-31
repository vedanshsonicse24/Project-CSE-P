import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Users, Clock, Check, X } from 'lucide-react';
import { students as initialStudents } from './data';
import { Student } from './types';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface AttendancePageProps {
  slotId: string;
  onBack: () => void;
}

export function AttendancePage({ slotId, onBack }: AttendancePageProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});

  const toggleAttendance = (rollNo: string, status: boolean) => {
    setAttendance(prev => ({
      ...prev,
      [rollNo]: status
    }));
  };

  const markAllPresent = () => {
    const newAttendance: { [key: string]: boolean } = {};
    students.forEach(student => {
      newAttendance[student.rollNo] = true;
    });
    setAttendance(newAttendance);
    toast.success('All students marked present');
  };

  const markAllAbsent = () => {
    const newAttendance: { [key: string]: boolean } = {};
    students.forEach(student => {
      newAttendance[student.rollNo] = false;
    });
    setAttendance(newAttendance);
    toast.success('All students marked absent');
  };

  const handleSubmit = () => {
    const presentCount = Object.values(attendance).filter(Boolean).length;
    const totalCount = students.length;
    
    toast.success(`Attendance saved: ${presentCount}/${totalCount} students present`);
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const handleCancel = () => {
    onBack();
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = Object.keys(attendance).length - presentCount;

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      style={{
        background: 'radial-gradient(circle at center, #0a0e1a 0%, #1a2b46 50%, #0f1724 100%)'
      }}
    >
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(8, 145, 178, 0.2) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            backdropFilter: 'blur(12px)'
          }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Left Side - Subject Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-white" />
                <h2 className="text-white font-semibold text-xl">Data Structures & Algorithms</h2>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="h-4 w-4" />
                <span className="text-sm">Mr. Vaibhav Chandrakar</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Monday, Period 5 (12:20 to 1:00)</span>
              </div>
            </div>

            {/* Right Side - Stats */}
            <div className="flex gap-4">
              <div 
                className="px-6 py-3 rounded-lg"
                style={{
                  background: 'rgba(34, 197, 94, 0.2)',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}
              >
                <div className="text-2xl text-green-300 font-bold">{presentCount}</div>
                <div className="text-xs text-green-200">Present</div>
              </div>
              <div 
                className="px-6 py-3 rounded-lg"
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                <div className="text-2xl text-red-300 font-bold">{absentCount}</div>
                <div className="text-xs text-red-200">Absent</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2"
        >
          <Button
            onClick={markAllPresent}
            className="flex-1 h-12 gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white"
          >
            <Check className="h-5 w-5" />
            Mark All Present
          </Button>
          <Button
            onClick={markAllAbsent}
            variant="outline"
            className="flex-1 h-12 gap-2 border-[#dc2626] text-[#ef4444] hover:bg-[#dc2626]/10"
          >
            <X className="h-5 w-5" />
            Mark All Absent
          </Button>
        </motion.div>

        {/* Student Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {students.map((student, index) => {
            const isMarked = attendance[student.rollNo] !== undefined;
            const isPresent = attendance[student.rollNo] === true;
            
            let cardStyle = {
              background: 'rgba(55, 65, 81, 0.3)',
              border: '2px solid rgba(75, 85, 99, 0.5)'
            };
            
            if (isMarked) {
              if (isPresent) {
                cardStyle = {
                  background: 'rgba(34, 197, 94, 0.2)',
                  border: '2px solid rgba(34, 197, 94, 0.5)'
                };
              } else {
                cardStyle = {
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '2px solid rgba(239, 68, 68, 0.5)'
                };
              }
            }

            return (
              <motion.div
                key={student.rollNo}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className="rounded-lg p-4 transition-all duration-300"
                style={cardStyle}
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-normal">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.rollNo}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => toggleAttendance(student.rollNo, true)}
                      className={`h-9 gap-1 ${
                        isPresent
                          ? 'bg-[#16a34a] hover:bg-[#15803d] text-white'
                          : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      <Check className="h-4 w-4" />
                      <span className="text-xs">Present</span>
                    </Button>
                    <Button
                      onClick={() => toggleAttendance(student.rollNo, false)}
                      className={`h-9 gap-1 ${
                        isMarked && !isPresent
                          ? 'bg-[#dc2626] hover:bg-[#b91c1c] text-white'
                          : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      <X className="h-4 w-4" />
                      <span className="text-xs">Absent</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 pt-4"
        >
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 h-12 text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 h-12 text-white"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)'
            }}
          >
            Submit Attendance
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
