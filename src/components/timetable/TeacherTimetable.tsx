import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { timeSlots as initialTimeSlots } from './data';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '../../server';

interface TimeSlot {
  id: string;
  day: string;
  period: number;
  subject: string;
  teacher: string;
  time: string;
  attendanceTaken: boolean;
}

interface TeacherTimetableProps {
  onMarkAttendance: (slotId: string) => void;
}

export function TeacherTimetable({ onMarkAttendance }: TeacherTimetableProps) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);
  const [isLoading, setIsLoading] = useState(false);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Fetch attendance status on component mount and when day changes
  useEffect(() => {
    fetchAttendanceStatus();
  }, [selectedDay]);

  const fetchAttendanceStatus = async () => {
    try {
      setIsLoading(true);
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Fetch attendance records for today
      const response = await fetch(`${API_ENDPOINTS.attendance.fetch}?date=${today}`);
      const result = await response.json();

      if (result.status === 'success' && result.data && Array.isArray(result.data)) {
        // Group attendance by period to check if attendance was marked
        const markedPeriods = new Set(
          result.data.map((record: any) => parseInt(record.period))
        );

        // Update timeSlots based on which periods have attendance records
        const updatedSlots = initialTimeSlots.map(slot => {
          if (slot.day === selectedDay) {
            return {
              ...slot,
              attendanceTaken: markedPeriods.has(slot.period)
            };
          }
          return slot;
        });
        setTimeSlots(updatedSlots);
      } else {
        // If API fails, use initial data
        setTimeSlots(initialTimeSlots);
      }
    } catch (error) {
      console.error('Error fetching attendance status:', error);
      // Use initial data on error
      setTimeSlots(initialTimeSlots);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh attendance status after marking
  const refreshAttendance = () => {
    fetchAttendanceStatus();
  };

  // Expose refresh function to parent via ref or callback
  useEffect(() => {
    // Store refresh function in window for parent access
    (window as any).refreshAttendanceStatus = refreshAttendance;
    
    return () => {
      delete (window as any).refreshAttendanceStatus;
    };
  }, [selectedDay]);

  const todaySlots = timeSlots.filter(slot => slot.day === selectedDay);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#1a2b46] to-[#0f1724] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-white mb-2">Mark Attendance</h2>
          <p className="text-blue-200">View and manage your classes</p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {days.map((day) => (
            <Button
              key={day}
              onClick={() => setSelectedDay(day)}
              variant={selectedDay === day ? "default" : "outline"}
              className={`transition-all duration-300 ${
                selectedDay === day
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {day}
            </Button>
          ))}
        </div>

        {/* Class Cards */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
              <p className="text-blue-200">Loading attendance status...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todaySlots.map((slot, index) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white mb-1">{slot.subject}</h3>
                      <p className="text-sm text-blue-200">Period {slot.period}</p>
                    </div>
                    {slot.attendanceTaken ? (
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Done
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-600 text-white">Pending</Badge>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-blue-100">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{slot.day}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onMarkAttendance(slot.id)}
                    disabled={slot.attendanceTaken}
                    className={`w-full ${
                      slot.attendanceTaken
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                  >
                    {slot.attendanceTaken ? 'Attendance Marked' : 'Mark Attendance'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {todaySlots.length === 0 && !isLoading && (
            <div className="col-span-full text-center py-12">
              <p className="text-blue-200 text-lg">No classes scheduled for {selectedDay}</p>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
