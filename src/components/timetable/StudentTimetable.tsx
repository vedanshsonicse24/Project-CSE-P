import { useState } from 'react';
import { Download, Printer, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

// Sample student timetable data
const studentTimetableData: Record<string, { subject: string; teacher: string; type: 'theory' | 'lab' | 'library' | 'break' }[]> = {
  Monday: [
    { subject: 'Data Structures', teacher: 'Dr. Smith', type: 'theory' },
    { subject: 'Data Structures', teacher: 'Dr. Smith', type: 'theory' },
    { subject: 'Database Systems', teacher: 'Dr. Johnson', type: 'theory' },
    { subject: 'Break', teacher: '-', type: 'break' },
    { subject: 'Web Development', teacher: 'Ms. Davis', type: 'theory' },
    { subject: 'Lab - Web Dev', teacher: 'Ms. Davis', type: 'lab' },
    { subject: 'Library', teacher: '-', type: 'library' },
    { subject: 'Library', teacher: '-', type: 'library' },
  ],
  Tuesday: [
    { subject: 'Database Systems', teacher: 'Dr. Johnson', type: 'theory' },
    { subject: 'Operating Systems', teacher: 'Prof. Brown', type: 'theory' },
    { subject: 'Data Structures Lab', teacher: 'Mr. Wilson', type: 'lab' },
    { subject: 'Break', teacher: '-', type: 'break' },
    { subject: 'Web Development', teacher: 'Ms. Davis', type: 'theory' },
    { subject: 'Operating Systems', teacher: 'Prof. Brown', type: 'theory' },
    { subject: 'Library', teacher: '-', type: 'library' },
    { subject: 'Library', teacher: '-', type: 'library' },
  ],
  Wednesday: [
    { subject: 'Web Development', teacher: 'Ms. Davis', type: 'theory' },
    { subject: 'Data Structures', teacher: 'Dr. Smith', type: 'theory' },
    { subject: 'Operating Systems', teacher: 'Prof. Brown', type: 'theory' },
    { subject: 'Break', teacher: '-', type: 'break' },
    { subject: 'Database Systems', teacher: 'Dr. Johnson', type: 'theory' },
    { subject: 'Lab - Database', teacher: 'Dr. Johnson', type: 'lab' },
    { subject: 'Library', teacher: '-', type: 'library' },
    { subject: 'Library', teacher: '-', type: 'library' },
  ],
  Thursday: [
    { subject: 'Operating Systems', teacher: 'Prof. Brown', type: 'theory' },
    { subject: 'Web Development', teacher: 'Ms. Davis', type: 'theory' },
    { subject: 'Data Structures', teacher: 'Dr. Smith', type: 'theory' },
    { subject: 'Break', teacher: '-', type: 'break' },
    { subject: 'Database Systems Lab', teacher: 'Dr. Johnson', type: 'lab' },
    { subject: 'Database Systems', teacher: 'Dr. Johnson', type: 'theory' },
    { subject: 'Library', teacher: '-', type: 'library' },
    { subject: 'Library', teacher: '-', type: 'library' },
  ],
  Friday: [
    { subject: 'Data Structures', teacher: 'Dr. Smith', type: 'theory' },
    { subject: 'Database Systems', teacher: 'Dr. Johnson', type: 'theory' },
    { subject: 'Web Development Lab', teacher: 'Ms. Davis', type: 'lab' },
    { subject: 'Break', teacher: '-', type: 'break' },
    { subject: 'Operating Systems', teacher: 'Prof. Brown', type: 'theory' },
    { subject: 'Seminar', teacher: 'Dr. Smith', type: 'theory' },
    { subject: 'Library', teacher: '-', type: 'library' },
    { subject: 'Library', teacher: '-', type: 'library' },
  ],
  Saturday: [
    { subject: 'Library', teacher: '-', type: 'library' },
    { subject: 'Library', teacher: '-', type: 'library' },
    { subject: 'Lab - Web Dev', teacher: 'Ms. Davis', type: 'lab' },
    { subject: 'Break', teacher: '-', type: 'break' },
    { subject: 'Revision', teacher: '-', type: 'theory' },
    { subject: 'Library', teacher: '-', type: 'library' },
    { subject: 'Library', teacher: '-', type: 'library' },
    { subject: 'Library', teacher: '-', type: 'library' },
  ],
};

const periods = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const times = ['9:00-9:50', '9:50-10:40', '10:40-11:30', '11:30-12:20', '12:20-1:10', '1:10-2:00', '2:00-2:50', '2:50-3:40'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayShorts = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function StudentTimetable() {
  const [semester, setSemester] = useState('6');
  const [section, setSection] = useState('A');

  const getCellColor = (type: string) => {
    switch (type) {
      case 'theory':
        return 'bg-[#fafaf9] border border-[#d1d5db]';
      case 'lab':
        return 'bg-[#fefce8] border border-[#d1d5db]';
      case 'library':
        return 'bg-[#eff6ff] border border-[#d1d5db]';
      case 'break':
        return 'bg-[#fefce8] border border-[#d1d5db]';
      default:
        return 'bg-[#fafaf9] border border-[#d1d5db]';
    }
  };

  const handleExportPNG = async () => {
    const element = document.getElementById('timetable-grid');
    if (element) {
      try {
        const canvas = await html2canvas(element);
        const link = document.createElement('a');
        link.download = `my-timetable-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL();
        link.click();
        toast.success('Timetable exported as PNG');
      } catch (error) {
        toast.error('Failed to export timetable');
      }
    }
  };

  const handlePrint = () => {
    window.print();
    toast.success('Print dialog opened');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#eef2ff] p-4 md:p-8">
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* Control Panel Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-200">
            <span className="text-xs" style={{ color: '#6b7280' }}>
              My Timetable - Semester {semester}, Section {section}
            </span>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleExportPNG}
                variant="outline"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="gap-2"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>

          {/* Row 2: Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" style={{ color: '#6b7280' }} />
                <span className="text-sm" style={{ color: '#6b7280' }}>Filters:</span>
              </div>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Semester</SelectItem>
                  <SelectItem value="2">2nd Semester</SelectItem>
                  <SelectItem value="3">3rd Semester</SelectItem>
                  <SelectItem value="4">4th Semester</SelectItem>
                  <SelectItem value="5">5th Semester</SelectItem>
                  <SelectItem value="6">6th Semester</SelectItem>
                  <SelectItem value="7">7th Semester</SelectItem>
                  <SelectItem value="8">8th Semester</SelectItem>
                </SelectContent>
              </Select>

              <Select value={section} onValueChange={setSection}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                  <SelectItem value="D">Section D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <span className="text-sm" style={{ color: '#374151' }}>
              Showing: Semester {semester} - Section {section}
            </span>
          </div>
        </div>

        {/* Timetable Grid Card */}
        <div id="timetable-grid" className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="mb-6 text-center" style={{ color: '#1c2e4a' }}>
              Weekly Timetable - Semester {semester}, Section {section}
            </h2>
            
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="grid grid-cols-9 gap-0 border border-[#d1d5db]">
                  {/* Header Row */}
                  <div className="p-3 text-center border border-[#d1d5db]" style={{ backgroundColor: '#dbeafe', color: '#1c2e4a' }}>
                    <span className="text-sm">DAY/PERIOD</span>
                  </div>
                  {periods.map((period, idx) => (
                    <div key={period} className="p-3 text-center border border-[#d1d5db]" style={{ backgroundColor: '#dbeafe' }}>
                      <div className="text-sm" style={{ color: '#1c2e4a' }}>{period}</div>
                      <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{times[idx]}</div>
                    </div>
                  ))}

                  {/* Timetable Rows */}
                  {days.map((day, dayIndex) => (
                    <div key={day} className="contents">
                      <div className="p-3 flex items-center justify-center text-center border border-[#d1d5db]" style={{ backgroundColor: '#eff6ff', color: '#1c2e4a' }}>
                        <span className="text-sm">{dayShorts[dayIndex]}</span>
                      </div>
                      {studentTimetableData[day].map((cell, periodIndex) => (
                        <div key={`${day}-${periodIndex}`} className={`border border-[#d1d5db] p-3 min-h-[100px] flex flex-col justify-center items-center text-center ${getCellColor(cell.type)}`}>
                          <div className="text-xs font-semibold" style={{ color: '#1c2e4a' }}>
                            {cell.subject}
                          </div>
                          <div className="text-xs mt-1" style={{ color: '#6b7280' }}>
                            {cell.teacher}
                          </div>
                          <div className="text-xs mt-2 px-2 py-1 rounded" style={{ 
                            backgroundColor: cell.type === 'theory' ? '#f3f4f6' : 
                                           cell.type === 'lab' ? '#fef3c7' : 
                                           cell.type === 'library' ? '#dbeafe' : '#fef3c7',
                            color: '#1c2e4a'
                          }}>
                            {cell.type === 'theory' ? 'Theory' :
                             cell.type === 'lab' ? 'Lab' :
                             cell.type === 'library' ? 'Library' : 'Break'}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend Footer */}
            <div className="mt-6 p-6 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border border-[#d1d5db] rounded" style={{ backgroundColor: '#fafaf9' }} />
                  <span className="text-sm" style={{ color: '#374151' }}>Theory Class</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border border-[#d1d5db] rounded" style={{ backgroundColor: '#fefce8' }} />
                  <span className="text-sm" style={{ color: '#374151' }}>Lab/Break</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border border-[#d1d5db] rounded" style={{ backgroundColor: '#eff6ff' }} />
                  <span className="text-sm" style={{ color: '#374151' }}>Library</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background-color: white;
          }
          #timetable-grid {
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}
