import { useState, useEffect } from "react";
import {
  Search,
  Download,
  X,
  Upload,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toast } from "sonner";
import "../../styles/student-management-animations.css";

interface Backlog {
  subject: string;
  semester: number;
}

interface Student {
  id: number;
  name: string;
  roll: string;
  enrollmentNumber: string;
  semester: number;
  section: string;
  percent: number;
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  address: string;
  linkedIn: string;
  github: string;
  designation: string;
  averageCGPA: number;
  researchPapers: number;
  projectsMade: number;
  fatherName: string;
  fatherContact: string;
  fatherOccupation: string;
  motherName: string;
  motherContact: string;
  motherOccupation: string;
  mentorName: string;
  achievements: string[];
  backs: Backlog[];
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "Amit Kumar",
    roll: "301",
    enrollmentNumber: "21CS301",
    semester: 3,
    section: "A",
    percent: 92,
    dateOfBirth: "2003-05-15",
    email: "amit.kumar@student.ssipmt.edu",
    contactNumber: "+91 98765 43210",
    address: "123 Main Street, Raipur, Chhattisgarh - 492001",
    linkedIn: "https://linkedin.com/in/amitkumar",
    github: "https://github.com/amitkumar",
    designation: "Toast Master",
    averageCGPA: 8.9,
    researchPapers: 2,
    projectsMade: 5,
    fatherName: "Rajesh Kumar",
    fatherContact: "+91 98765 43200",
    fatherOccupation: "Business Owner",
    motherName: "Sunita Kumar",
    motherContact: "+91 98765 43201",
    motherOccupation: "Teacher",
    mentorName: "Dr. Sharma",
    achievements: [
      "Won first prize in National Hackathon 2024",
      "Published research paper in IEEE conference",
      "Led team project that won Best Project Award",
    ],
    backs: [],
  },
  {
    id: 2,
    name: "Priya Sharma",
    roll: "302",
    enrollmentNumber: "21CS302",
    semester: 3,
    section: "A",
    percent: 88,
    dateOfBirth: "2003-08-22",
    email: "priya.sharma@student.ssipmt.edu",
    contactNumber: "+91 98765 43211",
    address: "456 Park Avenue, Raipur, Chhattisgarh - 492002",
    linkedIn: "https://linkedin.com/in/priyasharma",
    github: "https://github.com/priyasharma",
    designation: "COE",
    averageCGPA: 8.8,
    researchPapers: 1,
    projectsMade: 4,
    fatherName: "Suresh Sharma",
    fatherContact: "+91 98765 43202",
    fatherOccupation: "Engineer",
    motherName: "Meera Sharma",
    motherContact: "+91 98765 43203",
    motherOccupation: "Doctor",
    mentorName: "Dr. Kumar",
    achievements: [
      "Best Student Award 2023",
      "Won coding competition at state level",
    ],
    backs: [],
  },
  {
    id: 3,
    name: "Rahul Verma",
    roll: "401",
    enrollmentNumber: "21CS401",
    semester: 4,
    section: "B",
    percent: 78,
    dateOfBirth: "2003-03-10",
    email: "rahul.verma@student.ssipmt.edu",
    contactNumber: "+91 98765 43212",
    address: "789 Green Valley, Raipur, Chhattisgarh - 492003",
    linkedIn: "https://linkedin.com/in/rahulverma",
    github: "https://github.com/rahulverma",
    designation: "Toast Master",
    averageCGPA: 7.5,
    researchPapers: 0,
    projectsMade: 3,
    fatherName: "Dinesh Verma",
    fatherContact: "+91 98765 43204",
    fatherOccupation: "Govt. Officer",
    motherName: "Kavita Verma",
    motherContact: "+91 98765 43205",
    motherOccupation: "Homemaker",
    mentorName: "Dr. Sharma",
    achievements: ["Won inter-college cricket tournament"],
    backs: [
      { subject: "Data Structures", semester: 3 },
    ],
  },
  {
    id: 4,
    name: "Sneha Patel",
    roll: "501",
    enrollmentNumber: "21CS501",
    semester: 5,
    section: "A",
    percent: 95,
    dateOfBirth: "2002-12-05",
    email: "sneha.patel@student.ssipmt.edu",
    contactNumber: "+91 98765 43213",
    address: "321 Hill View, Raipur, Chhattisgarh - 492004",
    linkedIn: "https://linkedin.com/in/snehapatel",
    github: "https://github.com/snehapatel",
    designation: "COE",
    averageCGPA: 9.1,
    researchPapers: 3,
    projectsMade: 7,
    fatherName: "Ramesh Patel",
    fatherContact: "+91 98765 43206",
    fatherOccupation: "Architect",
    motherName: "Anjali Patel",
    motherContact: "+91 98765 43207",
    motherOccupation: "Lawyer",
    mentorName: "Dr. Gupta",
    achievements: [
      "Gold medalist in semester 4",
      "Internship at Google",
      "Published 3 research papers",
      "Created award-winning mobile app",
    ],
    backs: [],
  },
  {
    id: 5,
    name: "Karan Singh",
    roll: "601",
    enrollmentNumber: "21CS601",
    semester: 6,
    section: "B",
    percent: 72,
    dateOfBirth: "2002-07-18",
    email: "karan.singh@student.ssipmt.edu",
    contactNumber: "+91 98765 43214",
    address: "654 Lake Road, Raipur, Chhattisgarh - 492005",
    linkedIn: "https://linkedin.com/in/karansingh",
    github: "https://github.com/karansingh",
    designation: "Toast Master",
    averageCGPA: 7.2,
    researchPapers: 0,
    projectsMade: 2,
    fatherName: "Vikram Singh",
    fatherContact: "+91 98765 43208",
    fatherOccupation: "Army Officer",
    motherName: "Priyanka Singh",
    motherContact: "+91 98765 43209",
    motherOccupation: "Teacher",
    mentorName: "Dr. Verma",
    achievements: ["NCC A Certificate"],
    backs: [
      { subject: "Database Management", semester: 5 },
      { subject: "Operating Systems", semester: 5 },
    ],
  },
];

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [attendanceFilter, setAttendanceFilter] = useState<string[]>([]);
  const [showBacklogs, setShowBacklogs] = useState(false);
  
  // Monthly attendance dropdown states
  const [showMonthlyDropdown, setShowMonthlyDropdown] = useState(false);
  const [monthlyFilters, setMonthlyFilters] = useState({
    month: "October",
    year: "2025",
  });

  // Apply filters
  useEffect(() => {
    let result = students;

    // Semester filter
    if (semesterFilter !== "all") {
      result = result.filter((s) => s.semester === parseInt(semesterFilter));
    }

    // Section filter
    if (sectionFilter !== "all") {
      result = result.filter((s) => s.section === sectionFilter);
    }

    // Attendance filters
    if (attendanceFilter.length > 0) {
      result = result.filter((s) => {
        if (attendanceFilter.includes("high") && s.percent >= 85) return true;
        if (attendanceFilter.includes("medium") && s.percent >= 75 && s.percent < 85) return true;
        if (attendanceFilter.includes("low") && s.percent < 75) return true;
        return false;
      });
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStudents(result);
  }, [searchQuery, semesterFilter, sectionFilter, attendanceFilter, students]);

  const toggleAttendanceFilter = (filter: string) => {
    setAttendanceFilter((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setEditedStudent({ ...student });
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setEditedStudent(null);
    setIsEditMode(false);
  };

  const handleSave = () => {
    if (editedStudent && selectedStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === selectedStudent.id ? editedStudent : s))
      );
      setSelectedStudent(editedStudent);
      setIsEditMode(false);
      toast.success("Student details updated successfully!");
    }
  };

  const handleCancel = () => {
    setEditedStudent(selectedStudent);
    setIsEditMode(false);
  };

  const updateField = (field: keyof Student, value: any) => {
    if (editedStudent) {
      setEditedStudent({ ...editedStudent, [field]: value });
    }
  };

  const addAchievement = () => {
    if (editedStudent) {
      setEditedStudent({
        ...editedStudent,
        achievements: [...editedStudent.achievements, ""],
      });
    }
  };

  const updateAchievement = (index: number, value: string) => {
    if (editedStudent) {
      const newAchievements = [...editedStudent.achievements];
      newAchievements[index] = value;
      setEditedStudent({ ...editedStudent, achievements: newAchievements });
    }
  };

  const removeAchievement = (index: number) => {
    if (editedStudent) {
      setEditedStudent({
        ...editedStudent,
        achievements: editedStudent.achievements.filter((_, i) => i !== index),
      });
    }
  };

  const handleExport = () => {
    // Define comprehensive headers including all fields from View Details page
    const headers = [
      "Roll No",
      "Name",
      "Enrollment Number",
      "Semester",
      "Section",
      "Attendance %",
      "CGPA",
      "Date of Birth",
      "Email",
      "Contact Number",
      "Address",
      "LinkedIn",
      "GitHub",
      "Designation",
      "Research Papers",
      "Projects Made",
      "Father Name",
      "Father Contact",
      "Father Occupation",
      "Mother Name",
      "Mother Contact",
      "Mother Occupation",
      "Mentor Name",
      "Achievements",
      "Backlogs"
    ];

    // Map all student data including View Details fields
    const rows = filteredStudents.map((s) => [
      s.roll,
      s.name,
      s.enrollmentNumber,
      s.semester,
      s.section,
      s.percent,
      s.averageCGPA,
      s.dateOfBirth,
      s.email,
      s.contactNumber,
      `"${s.address}"`, // Wrap in quotes to handle commas
      s.linkedIn,
      s.github,
      s.designation,
      s.researchPapers,
      s.projectsMade,
      s.fatherName,
      s.fatherContact,
      s.fatherOccupation,
      s.motherName,
      s.motherContact,
      s.motherOccupation,
      s.mentorName,
      `"${s.achievements.join('; ')}"`, // Join achievements with semicolon and wrap in quotes
      `"${s.backs.map(b => `${b.subject} (Sem ${b.semester})`).join('; ')}"` // Format backlogs and wrap in quotes
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    
    // Create dynamic filename based on filters
    const semesterPart = semesterFilter !== "all" ? semesterFilter : "all";
    const sectionPart = sectionFilter !== "all" ? sectionFilter : "all";
    const filename = `student_details_${semesterPart}_${sectionPart}.csv`;
    
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Student data exported successfully!");
  };

  const handleExportStudent = (student: Student) => {
    const data = Object.entries(student)
      .filter(([key]) => key !== "achievements" && key !== "backs")
      .map(([key, value]) => `${key},${value}`)
      .join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + data;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${student.name}_sem${student.semester}_${student.roll}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${student.name}'s data exported successfully!`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className="min-h-screen animate-fade-in"
      style={{
        backgroundColor: "#F9FAFB",
        fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
      }}
    >
      {/* Header with Modern Gradient Design */}
      <div
        className="w-full mb-6 relative overflow-hidden animate-slide-in-top"
        style={{
          background: 'linear-gradient(135deg, #800000 0%, #a00000 50%, #600000 100%)',
          padding: "24px 32px",
          boxShadow: '0 10px 40px rgba(128, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold" style={{ color: "#fff", textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', letterSpacing: '-0.025em' }}>
              Student Management System
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 animate-slide-in-right">
              {/* Search */}
              <div className="relative">
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 pl-10 backdrop-blur-md input-focus border-none shadow-lg"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "12px",
                  }}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                  style={{ color: "#800000" }}
                />
              </div>

              {/* Semester Filter */}
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger className="w-32 backdrop-blur-md border-none shadow-lg smooth-transition" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px' }}>
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                </SelectContent>
              </Select>

              {/* Section Filter */}
              <Select value={sectionFilter} onValueChange={setSectionFilter}>
                <SelectTrigger className="w-32 backdrop-blur-md border-none shadow-lg smooth-transition" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px' }}>
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Attendance Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 animate-slide-in-left animate-delay-100">
            <Button
              variant={attendanceFilter.includes("high") ? "default" : "outline"}
              size="sm"
              onClick={() => toggleAttendanceFilter("high")}
              className={
                attendanceFilter.includes("high")
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white button-hover-scale shadow-lg border-none"
                  : "bg-white text-slate-700 hover:bg-slate-100 button-hover-scale shadow-md border-slate-200"
              }
              style={{ borderRadius: '10px', fontWeight: '500' }}
            >
              85%+ Attendance
            </Button>
            <Button
              variant={attendanceFilter.includes("medium") ? "default" : "outline"}
              size="sm"
              onClick={() => toggleAttendanceFilter("medium")}
              className={
                attendanceFilter.includes("medium")
                  ? "text-white button-hover-scale shadow-lg border-none"
                  : "bg-white text-slate-700 hover:bg-slate-100 button-hover-scale shadow-md border-slate-200"
              }
              style={
                attendanceFilter.includes("medium")
                  ? { backgroundColor: "#800000", borderRadius: '10px', fontWeight: '500' }
                  : { borderRadius: '10px', fontWeight: '500' }
              }
            >
              75-85% Attendance
            </Button>
            <Button
              variant={attendanceFilter.includes("low") ? "default" : "outline"}
              size="sm"
              onClick={() => toggleAttendanceFilter("low")}
              className={
                attendanceFilter.includes("low")
                  ? "bg-red-600 hover:bg-red-700 text-white button-hover-scale shadow-lg border-none"
                  : "bg-white text-slate-700 hover:bg-slate-100 button-hover-scale shadow-md border-slate-200"
              }
              style={{ borderRadius: '10px', fontWeight: '500' }}
            >
              &lt;75% Attendance
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-6 animate-scale-in animate-delay-200">
        {/* Table Controls */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={handleExport}
            className="text-white button-hover-lift shadow-lg border-none"
            style={{ backgroundColor: "#10B981", borderRadius: '12px', fontWeight: '500', padding: '12px 24px' }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>

          {/* Monthly Attendance Dropdown */}
          <div className="relative">
            <Button
              onClick={() => setShowMonthlyDropdown(!showMonthlyDropdown)}
              className="button-hover-scale shadow-lg border-none"
              style={{ backgroundColor: "#800000", color: "#fff", borderRadius: '12px', fontWeight: '500', padding: '12px 24px' }}
            >
              Monthly Attendance
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>

            {showMonthlyDropdown && (
              <div
                className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl z-50 dropdown-slide-in"
                style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB" }}
              >
                <div className="p-4 space-y-3">
                  <div>
                    <Label className="text-sm" style={{ color: "#333" }}>
                      Month
                    </Label>
                    <Select
                      value={monthlyFilters.month}
                      onValueChange={(value: string) =>
                        setMonthlyFilters({ ...monthlyFilters, month: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm" style={{ color: "#333" }}>
                      Year
                    </Label>
                    <Select
                      value={monthlyFilters.year}
                      onValueChange={(value: string) =>
                        setMonthlyFilters({ ...monthlyFilters, year: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["2023", "2024", "2025", "2026", "2027"].map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    className="w-full text-white"
                    style={{ backgroundColor: "#800000" }}
                    onClick={() => {
                      setShowMonthlyDropdown(false);
                      toast.success("Viewing monthly attendance...");
                    }}
                  >
                    View
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Student Table */}
        <div
          className="rounded-lg shadow-sm overflow-hidden"
          style={{ backgroundColor: "#fff" }}
        >
          <Table>
            <TableHeader style={{ backgroundColor: "#f5e6e6" }}>
              <TableRow>
                <TableHead style={{ color: "#333", fontWeight: "bold" }}>
                  Roll No
                </TableHead>
                <TableHead style={{ color: "#333", fontWeight: "bold" }}>
                  Name
                </TableHead>
                <TableHead style={{ color: "#333", fontWeight: "bold" }}>
                  Semester
                </TableHead>
                <TableHead style={{ color: "#333", fontWeight: "bold" }}>
                  Section
                </TableHead>
                <TableHead style={{ color: "#333", fontWeight: "bold" }}>
                  Attendance (%)
                </TableHead>
                <TableHead style={{ color: "#333", fontWeight: "bold" }}>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="hover:bg-red-50 transition-colors"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <TableCell style={{ color: "#333" }}>{student.roll}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-full"
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "#d1d5db",
                          color: "#666",
                          fontSize: "12px",
                        }}
                      >
                        {getInitials(student.name)}
                      </div>
                      <span style={{ color: "#333" }}>{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell style={{ color: "#333" }}>{student.semester}</TableCell>
                  <TableCell style={{ color: "#333" }}>{student.section}</TableCell>
                  <TableCell style={{ color: "#333", fontWeight: "bold" }}>
                    {student.percent}%
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => handleViewDetails(student)}
                      className="text-white"
                      style={{ backgroundColor: "#800000" }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12" style={{ color: "#666" }}>
              No students found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Student Detail Modal */}
      {isModalOpen && selectedStudent && editedStudent && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", paddingTop: "100px", paddingBottom: "20px" }}
          onClick={handleCloseModal}
        >
          <div
            className="rounded-xl shadow-2xl max-w-5xl w-full max-h-[calc(100vh-120px)] overflow-hidden animate-in fade-in zoom-in duration-200 mx-4"
            style={{ backgroundColor: "#fff" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ backgroundColor: "#800000" }}
            >
              <h2 className="text-xl" style={{ color: "#fff", fontWeight: "bold" }}>
                Student Details
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="edit-toggle" className="text-white text-sm">
                    Edit
                  </Label>
                  <Switch
                    id="edit-toggle"
                    checked={isEditMode}
                    onCheckedChange={setIsEditMode}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportStudent(selectedStudent)}
                  className="text-white hover:bg-white/20"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseModal}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
                {/* Left Panel (40%) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Photo Section */}
                  <div className="flex flex-col items-center">
                    <div
                      className="flex items-center justify-center rounded-xl mb-4"
                      style={{
                        width: "200px",
                        height: "200px",
                        backgroundColor: "#d1d5db",
                        color: "#666",
                        fontSize: "48px",
                        border: "3px solid #800000",
                      }}
                    >
                      {getInitials(editedStudent.name)}
                    </div>
                    {isEditMode && (
                      <Button
                        variant="outline"
                        size="sm"
                        style={{ borderColor: "#800000", color: "#800000" }}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                    )}
                  </div>

                  {/* Academic Info Card */}
                  <div
                    className="rounded-lg p-4 text-center"
                    style={{ backgroundColor: "#800000", color: "#fff" }}
                  >
                    <p className="text-lg">
                      Semester {editedStudent.semester} - Section {editedStudent.section}
                    </p>
                  </div>

                  {/* Mentor Card */}
                  <div
                    className="rounded-lg p-4 text-center"
                    style={{ backgroundColor: "#800000", color: "#fff" }}
                  >
                    <p className="text-sm mb-1">Mentor</p>
                    <p className="text-lg">{editedStudent.mentorName}</p>
                  </div>

                  {/* Backlogs Section */}
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{ border: "1px solid #ddd" }}
                  >
                    <button
                      className="w-full px-4 py-3 flex items-center justify-between"
                      style={{ backgroundColor: "#800000", color: "#fff" }}
                      onClick={() => setShowBacklogs(!showBacklogs)}
                    >
                      <span>
                        Backlogs ({editedStudent.backs.length})
                      </span>
                      {showBacklogs ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {showBacklogs && (
                      <div className="p-4 bg-white">
                        {editedStudent.backs.length > 0 ? (
                          <ul className="space-y-2">
                            {editedStudent.backs.map((back, index) => (
                              <li key={index} style={{ color: "#333" }}>
                                • {back.subject} (Sem {back.semester})
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p style={{ color: "#666" }}>No backlogs</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Download CV Button */}
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{ border: "1px solid #ddd" }}
                  >
                    <button
                      className="w-full px-4 py-3 flex items-center justify-center gap-2"
                      style={{ backgroundColor: "#800000", color: "#fff" }}
                      onClick={() => {
                        console.log("Downloading CV for:", editedStudent.name);
                      }}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download CV</span>
                    </button>
                  </div>
                </div>

                {/* Right Panel (60%) */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Personal Information */}
                  <div
                    className="rounded-lg p-4"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <h3 className="mb-4" style={{ color: "#800000", fontWeight: "600" }}>
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Name
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedStudent.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Date of Birth
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="date"
                            value={editedStudent.dateOfBirth}
                            onChange={(e) =>
                              updateField("dateOfBirth", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {new Date(editedStudent.dateOfBirth).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Roll Number
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedStudent.roll}
                            onChange={(e) => updateField("roll", e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.roll}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Attendance Percentage
                        </Label>
                        <p style={{ color: "#333", marginTop: "4px", fontWeight: "bold" }}>
                          {editedStudent.percent}%
                        </p>
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Enrollment Number
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedStudent.enrollmentNumber}
                            onChange={(e) =>
                              updateField("enrollmentNumber", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.enrollmentNumber}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Active in (Clubs)
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedStudent.designation}
                            onChange={(e) =>
                              updateField("designation", e.target.value)
                            }
                            className="mt-1"
                            placeholder="e.g., Coding Club, Sports Club"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.designation}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          LinkedIn
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedStudent.linkedIn}
                            onChange={(e) => updateField("linkedIn", e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <a
                            href={editedStudent.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#800000", marginTop: "4px", display: "block" }}
                          >
                            View Profile
                          </a>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          GitHub
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedStudent.github}
                            onChange={(e) => updateField("github", e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <a
                            href={editedStudent.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#800000", marginTop: "4px", display: "block" }}
                          >
                            View Profile
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div
                    className="rounded-lg p-4"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <h3 className="mb-4" style={{ color: "#800000", fontWeight: "600" }}>
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Email
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="email"
                            value={editedStudent.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Phone Number
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="tel"
                            value={editedStudent.contactNumber}
                            onChange={(e) =>
                              updateField("contactNumber", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.contactNumber}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Address
                        </Label>
                        {isEditMode ? (
                          <Textarea
                            value={editedStudent.address}
                            onChange={(e) => updateField("address", e.target.value)}
                            className="mt-1"
                            rows={2}
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Parent Information */}
                  <div
                    className="rounded-lg p-4"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <h3 className="mb-4" style={{ color: "#800000", fontWeight: "600" }}>
                      Parent Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Father's Name
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedStudent.fatherName}
                            onChange={(e) =>
                              updateField("fatherName", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.fatherName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Mother's Name
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedStudent.motherName}
                            onChange={(e) =>
                              updateField("motherName", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.motherName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Father's Contact
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="tel"
                            value={editedStudent.fatherContact}
                            onChange={(e) =>
                              updateField("fatherContact", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.fatherContact}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Mother's Contact
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="tel"
                            value={editedStudent.motherContact}
                            onChange={(e) =>
                              updateField("motherContact", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.motherContact}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Father's Occupation
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedStudent.fatherOccupation}
                            onChange={(e) =>
                              updateField("fatherOccupation", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.fatherOccupation}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Mother's Occupation
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedStudent.motherOccupation}
                            onChange={(e) =>
                              updateField("motherOccupation", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.motherOccupation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Academic Details */}
                  <div
                    className="rounded-lg p-4"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <h3 className="mb-4" style={{ color: "#800000", fontWeight: "600" }}>
                      Academic Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Average CGPA
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            value={editedStudent.averageCGPA}
                            onChange={(e) =>
                              updateField("averageCGPA", parseFloat(e.target.value))
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px", fontWeight: "bold" }}>
                            {editedStudent.averageCGPA.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Research Papers Written
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="number"
                            min="0"
                            value={editedStudent.researchPapers}
                            onChange={(e) =>
                              updateField("researchPapers", parseInt(e.target.value))
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.researchPapers}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Projects Made
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="number"
                            min="0"
                            value={editedStudent.projectsMade}
                            onChange={(e) =>
                              updateField("projectsMade", parseInt(e.target.value))
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedStudent.projectsMade}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div
                    className="rounded-lg p-4"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <h3 className="mb-4" style={{ color: "#800000", fontWeight: "600" }}>
                      Achievements
                    </h3>
                    {isEditMode ? (
                      <div className="space-y-3">
                        {editedStudent.achievements.map((achievement, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={achievement}
                              onChange={(e) =>
                                updateAchievement(index, e.target.value)
                              }
                              placeholder="Enter achievement"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeAchievement(index)}
                              style={{ borderColor: "#ef4444", color: "#ef4444" }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={addAchievement}
                          className="w-full"
                          style={{ borderColor: "#800000", color: "#800000" }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Achievement
                        </Button>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {editedStudent.achievements.map((achievement, index) => (
                          <li key={index} style={{ color: "#333" }}>
                            • {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3">
                    {isEditMode ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          style={{ color: "#666", borderColor: "#d1d5db" }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSave}
                          className="text-white"
                          style={{ backgroundColor: "#800000" }}
                        >
                          Save Changes
                        </Button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
