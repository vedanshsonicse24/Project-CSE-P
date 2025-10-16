import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { Timetable } from './Timetable';
import { TeacherTimetable } from './TeacherTimetable';
import { AttendancePage } from './AttendancePage';
import { Toaster } from '../ui/sonner';

type Page = 'timetable' | 'teacher' | 'attendance';

export function TimetableApp() {
  const [currentPage, setCurrentPage] = useState<Page>('timetable');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const handleMarkAttendance = (slotId: string) => {
    setSelectedSlotId(slotId);
    setCurrentPage('attendance');
  };

  const handleBackFromAttendance = () => {
    setCurrentPage('teacher');
    setSelectedSlotId(null);
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader onNavigate={setCurrentPage} currentPage={currentPage} />
      
      {currentPage === 'timetable' && <Timetable userRole="hod" />}
      {currentPage === 'teacher' && <TeacherTimetable onMarkAttendance={handleMarkAttendance} />}
      {currentPage === 'attendance' && selectedSlotId && (
        <AttendancePage slotId={selectedSlotId} onBack={handleBackFromAttendance} />
      )}

      <Toaster />
    </div>
  );
}
