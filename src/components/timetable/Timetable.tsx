import { useState } from 'react';
import { Edit, Eye, Save, Download, Printer, Filter, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { EditableCell } from './EditableCell';
import { subjects as initialSubjects, faculty as initialFaculty, labs as initialLabs, initialTimetableData } from './data';
import { Subject, Faculty, Lab, TimetableData } from './types';
import { toast } from 'sonner@2.0.3';
import html2canvas from 'html2canvas';
import { Input } from '../ui/input';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const periods = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const times = ['9:00-9:50', '9:50-10:40', '10:40-11:30', '11:30-12:20', '12:20-1:10', '1:10-2:00', '2:00-2:50', '2:50-3:40'];

interface TimetableProps {
  userRole?: 'faculty' | 'student' | 'hod';
}

export function Timetable({ userRole = 'faculty' }: TimetableProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [semester, setSemester] = useState('3');
  const [section, setSection] = useState('D');
  const [timetableData, setTimetableData] = useState<TimetableData>(initialTimetableData);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [labs, setLabs] = useState<Lab[]>(initialLabs);
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [editingFaculty, setEditingFaculty] = useState<string | null>(null);
  const [editingLab, setEditingLab] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState('10:30 AM');

  const handleCellUpdate = (day: string, periodIndex: number, subject: string, teacher: string, type: 'theory' | 'lab' | 'library' | 'break') => {
    setTimetableData(prev => ({
      ...prev,
      [day]: prev[day].map((cell, idx) => 
        idx === periodIndex ? { subject, teacher, type } : cell
      )
    }));
    toast.success('Cell updated successfully');
  };

  const handleSave = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    setLastSaved(timeStr);
    toast.success('Timetable saved successfully');
  };

  const handleExportPNG = async () => {
    const element = document.getElementById('timetable-grid');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = `timetable-sem${semester}-section${section}.png`;
      link.href = canvas.toDataURL();
      link.click();
      toast.success('Timetable exported as PNG');
    }
  };

  const handlePrint = () => {
    window.print();
    toast.success('Print dialog opened');
  };

  const handleAddSubject = () => {
    const newSubject: Subject = {
      code: 'NEW',
      name: 'New Subject',
      faculty: 'TBA',
      type: 'theory'
    };
    setSubjects([...subjects, newSubject]);
    setEditingSubject(newSubject.code);
  };

  const handleAddFaculty = () => {
    const newFaculty: Faculty = {
      initial: 'XX',
      name: 'New Faculty'
    };
    setFaculty([...faculty, newFaculty]);
    setEditingFaculty(newFaculty.initial);
  };

  const handleAddLab = () => {
    const newLab: Lab = {
      code: 'LAB-X',
      name: 'New Lab',
      inCharge: 'TBA'
    };
    setLabs([...labs, newLab]);
    setEditingLab(newLab.code);
  };

  const handleDeleteSubject = (code: string) => {
    setSubjects(subjects.filter(s => s.code !== code));
    toast.success('Subject deleted');
  };

  const handleDeleteFaculty = (initial: string) => {
    setFaculty(faculty.filter(f => f.initial !== initial));
    toast.success('Faculty deleted');
  };

  const handleDeleteLab = (code: string) => {
    setLabs(labs.filter(l => l.code !== code));
    toast.success('Lab deleted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] to-[#eef2ff] p-4 md:p-8">
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* Control Panel Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Row 1: Edit Mode Toggle and Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              {userRole === 'hod' && (
                <div className="flex items-center gap-3">
                  {isEditMode ? (
                    <Edit className="h-4 w-4" style={{ color: '#1c2e4a' }} />
                  ) : (
                    <Eye className="h-4 w-4" style={{ color: '#1c2e4a' }} />
                  )}
                  <span className="text-sm" style={{ color: '#1c2e4a' }}>
                    {isEditMode ? 'Edit Mode' : 'View Mode'}
                  </span>
                  <Switch
                    checked={isEditMode}
                    onCheckedChange={setIsEditMode}
                  />
                </div>
              )}
              <span className="text-xs" style={{ color: '#6b7280' }}>
                Last saved: {lastSaved}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleSave}
                className="gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
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
                  {days.map((day) => {
                    const fullDay = day === 'MON' ? 'Monday' : 
                                   day === 'TUE' ? 'Tuesday' : 
                                   day === 'WED' ? 'Wednesday' : 
                                   day === 'THU' ? 'Thursday' : 
                                   day === 'FRI' ? 'Friday' : 'Saturday';
                    
                    return (
                      <div key={day} className="contents">
                        <div className="p-3 flex items-center justify-center text-center border border-[#d1d5db]" style={{ backgroundColor: '#eff6ff', color: '#1c2e4a' }}>
                          <span className="text-sm">{day}</span>
                        </div>
                        {timetableData[fullDay].map((cell, periodIndex) => (
                          <div key={`${day}-${periodIndex}`} className="border border-[#d1d5db]">
                            <EditableCell
                              cell={cell}
                              isEditMode={isEditMode}
                              onUpdate={(subject, teacher, type) => handleCellUpdate(fullDay, periodIndex, subject, teacher, type)}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend Footer */}
            <div className="mt-6 p-6 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border border-[#d1d5db] rounded" style={{ backgroundColor: '#fafaf9' }} />
                  <span className="text-sm" style={{ color: '#374151' }}>Regular Subject</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border border-[#d1d5db] rounded" style={{ backgroundColor: '#fefce8' }} />
                  <span className="text-sm" style={{ color: '#374151' }}>Lab Session</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border border-[#d1d5db] rounded" style={{ backgroundColor: '#eff6ff' }} />
                  <span className="text-sm" style={{ color: '#374151' }}>Library/Break</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables Container */}
        <div 
          className="rounded-xl shadow-lg p-4"
          style={{ 
            background: 'linear-gradient(147deg, #2e3a59 0%, #1a2b46 100%)'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Subjects Table */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-3 text-white text-center" style={{ backgroundColor: '#1c2e4a' }}>
                <h3 className="text-sm">Subjects</h3>
              </div>
              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-3 gap-2 text-xs pb-2 border-b border-gray-200" style={{ color: '#6b7280' }}>
                  <span>Code</span>
                  <span>Name</span>
                  <span>Faculty</span>
                </div>
                {subjects.map((subject) => (
                  <div 
                    key={subject.code} 
                    className="grid grid-cols-3 gap-2 p-2 rounded transition-colors hover:bg-[#eff6ff]"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    {editingSubject === subject.code ? (
                      <>
                        <Input
                          defaultValue={subject.code}
                          className="text-xs h-7"
                          onBlur={(e) => {
                            setSubjects(subjects.map(s => 
                              s.code === subject.code ? { ...s, code: e.target.value } : s
                            ));
                            setEditingSubject(null);
                          }}
                        />
                        <Input
                          defaultValue={subject.name}
                          className="text-xs h-7"
                          onBlur={(e) => {
                            setSubjects(subjects.map(s => 
                              s.code === subject.code ? { ...s, name: e.target.value } : s
                            ));
                          }}
                        />
                        <Input
                          defaultValue={subject.faculty}
                          className="text-xs h-7"
                          onBlur={(e) => {
                            setSubjects(subjects.map(s => 
                              s.code === subject.code ? { ...s, faculty: e.target.value } : s
                            ));
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <span 
                          className="text-xs cursor-pointer" 
                          style={{ color: '#1c2e4a' }}
                          onClick={() => setEditingSubject(subject.code)}
                        >
                          {subject.code}
                        </span>
                        <span className="text-xs" style={{ color: '#374151' }}>
                          {subject.name}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: '#6b7280' }}>
                            {subject.faculty}
                          </span>
                          {isEditMode && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-[#dc2626] hover:text-[#b91c1c]"
                              onClick={() => handleDeleteSubject(subject.code)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {isEditMode && (
                  <Button
                    onClick={handleAddSubject}
                    className="w-full h-8 text-xs bg-[#16a34a] hover:bg-[#15803d] text-white"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Subject
                  </Button>
                )}
              </div>
            </div>

            {/* Faculty Table */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-3 text-white text-center" style={{ backgroundColor: '#1c2e4a' }}>
                <h3 className="text-sm">Faculty</h3>
              </div>
              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2 text-xs pb-2 border-b border-gray-200" style={{ color: '#6b7280' }}>
                  <span>Initial</span>
                  <span>Name</span>
                </div>
                {faculty.map((fac) => (
                  <div 
                    key={fac.initial} 
                    className="grid grid-cols-2 gap-2 p-2 rounded transition-colors hover:bg-[#eff6ff]"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    {editingFaculty === fac.initial ? (
                      <>
                        <Input
                          defaultValue={fac.initial}
                          className="text-xs h-7"
                          onBlur={(e) => {
                            setFaculty(faculty.map(f => 
                              f.initial === fac.initial ? { ...f, initial: e.target.value } : f
                            ));
                            setEditingFaculty(null);
                          }}
                        />
                        <Input
                          defaultValue={fac.name}
                          className="text-xs h-7"
                          onBlur={(e) => {
                            setFaculty(faculty.map(f => 
                              f.initial === fac.initial ? { ...f, name: e.target.value } : f
                            ));
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <span 
                          className="text-xs cursor-pointer" 
                          style={{ color: '#1c2e4a' }}
                          onClick={() => setEditingFaculty(fac.initial)}
                        >
                          {fac.initial}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: '#374151' }}>
                            {fac.name}
                          </span>
                          {isEditMode && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-[#dc2626] hover:text-[#b91c1c]"
                              onClick={() => handleDeleteFaculty(fac.initial)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {isEditMode && (
                  <Button
                    onClick={handleAddFaculty}
                    className="w-full h-8 text-xs bg-[#16a34a] hover:bg-[#15803d] text-white"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Faculty
                  </Button>
                )}
              </div>
            </div>

            {/* Labs Table */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-3 text-white text-center" style={{ backgroundColor: '#1c2e4a' }}>
                <h3 className="text-sm">Labs</h3>
              </div>
              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-3 gap-2 text-xs pb-2 border-b border-gray-200" style={{ color: '#6b7280' }}>
                  <span>Code</span>
                  <span>Name</span>
                  <span>In-Charge</span>
                </div>
                {labs.map((lab) => (
                  <div 
                    key={lab.code} 
                    className="grid grid-cols-3 gap-2 p-2 rounded transition-colors hover:bg-[#eff6ff]"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    {editingLab === lab.code ? (
                      <>
                        <Input
                          defaultValue={lab.code}
                          className="text-xs h-7"
                          onBlur={(e) => {
                            setLabs(labs.map(l => 
                              l.code === lab.code ? { ...l, code: e.target.value } : l
                            ));
                            setEditingLab(null);
                          }}
                        />
                        <Input
                          defaultValue={lab.name}
                          className="text-xs h-7"
                          onBlur={(e) => {
                            setLabs(labs.map(l => 
                              l.code === lab.code ? { ...l, name: e.target.value } : l
                            ));
                          }}
                        />
                        <Input
                          defaultValue={lab.inCharge}
                          className="text-xs h-7"
                          onBlur={(e) => {
                            setLabs(labs.map(l => 
                              l.code === lab.code ? { ...l, inCharge: e.target.value } : l
                            ));
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <span 
                          className="text-xs cursor-pointer" 
                          style={{ color: '#1c2e4a' }}
                          onClick={() => setEditingLab(lab.code)}
                        >
                          {lab.code}
                        </span>
                        <span className="text-xs" style={{ color: '#374151' }}>
                          {lab.name}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: '#6b7280' }}>
                            {lab.inCharge}
                          </span>
                          {isEditMode && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-[#dc2626] hover:text-[#b91c1c]"
                              onClick={() => handleDeleteLab(lab.code)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {isEditMode && (
                  <Button
                    onClick={handleAddLab}
                    className="w-full h-8 text-xs bg-[#16a34a] hover:bg-[#15803d] text-white"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Lab
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
