import { useState, useEffect } from "react";
import { StatsCard } from "../common/StatsCard";
import {
  Users,
  BookOpen,
  FileCheck,
  Upload,
  Calendar,
  Award,
  
} from "lucide-react";
import { Timetable } from "../timetable/Timetable";
import { TeacherTimetable } from "../timetable/TeacherTimetable";
import { AttendancePage } from "../timetable/AttendancePage";
import { BOAManagement } from "../boa/BOAManagement";
import { BOASubmissionForm } from "../boa/BOASubmissionForm";
import { FacultyDetails } from "../faculty/FacultyDetails";
import { StudentManagement } from "../student/StudentManagement";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Toaster } from "../ui/sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "../ui/dialog";
import { toast } from "sonner";
import { cn } from "../ui/utils";
import { API_ENDPOINTS } from "../../server";

interface HODDashboardProps {
  isViewOnly?: boolean;
  initialSection?: string;
}

interface NewFaculty {
  name: string;
  designation: string;
  email: string;
  phone: string;
  qualification: string;
  specialization: string;
  experience: string;
}

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  department: string;
  qualification: string;
  specialization: string;
  experience: number;
  mentees: number;
  classes: number;
  phd_status: string;
  join_date: string;
}

interface DashboardStats {
  totalStudents: number;
  totalFaculty: number;
  sections: number;
  avgAttendance: string;
}

interface SemesterData {
  [key: string]: {
    students: number;
    sections: string[];
    avgCGPA: string;
  };
}

export function HODDashboard({ isViewOnly = false, initialSection = "dashboard" }: HODDashboardProps) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [selectedSemester, setSelectedSemester] = useState("6");
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);
  const [isAddFacultyDialogOpen, setIsAddFacultyDialogOpen] = useState(false);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [isFacultyLoading, setIsFacultyLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalFaculty: 0,
    sections: 0,
    avgAttendance: "0%"
  });
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [semesterData, setSemesterData] = useState<SemesterData>({});
  const [isSemesterDialogOpen, setIsSemesterDialogOpen] = useState(false);
  const [selectedSemesterDetails, setSelectedSemesterDetails] = useState<string | null>(null);
  const [isStudentAchievementsDialogOpen, setIsStudentAchievementsDialogOpen] = useState(false);
  const [isFacultyPublicationsDialogOpen, setIsFacultyPublicationsDialogOpen] = useState(false);
  const [isDepartmentRankingDialogOpen, setIsDepartmentRankingDialogOpen] = useState(false);
  const [isAddResearchDialogOpen, setIsAddResearchDialogOpen] = useState(false);
  
  // Research form state
  const [researchForm, setResearchForm] = useState({
    title: "",
    authors: "",
    type: "Journal",
    venue: "",
    year: new Date().getFullYear().toString(),
    status: "Published"
  });

  const [newFaculty, setNewFaculty] = useState<NewFaculty>({
    name: "",
    designation: "",
    email: "",
    phone: "",
    qualification: "",
    specialization: "",
    experience: ""
  });

  // Update active section when prop changes
  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  // Fetch dashboard stats when component mounts or dashboard is active
  useEffect(() => {
    if (activeSection === "dashboard") {
      fetchDashboardStats();
    }
  }, [activeSection]);

  // Fetch faculty list when component mounts or when faculty section is active
  useEffect(() => {
    if (activeSection === "faculty") {
      fetchFacultyList();
    }
  }, [activeSection]);

  // Function to fetch dashboard statistics from API
  const fetchDashboardStats = async () => {
    try {
      setIsDashboardLoading(true);
      const response = await fetch(API_ENDPOINTS.hod.dashboard);
      const result = await response.json();

      if (result.status === "success" && result.dashboard) {
        setDashboardStats({
          totalStudents: result.dashboard.total_students || 0,
          totalFaculty: result.dashboard.total_faculty || 0,
          sections: result.dashboard.sections || 0,
          avgAttendance: result.dashboard.average_attendance || "0%"
        });
        
        // Process students data to create semester overview
        if (result.students && Array.isArray(result.students)) {
          const semesterMap: SemesterData = {};
          
          result.students.forEach((student: any) => {
            const sem = student.semester.toString();
            
            if (!semesterMap[sem]) {
              semesterMap[sem] = {
                students: 0,
                sections: [],
                avgCGPA: "0.0"
              };
            }
            
            semesterMap[sem].students += 1;
            
            // Add section if not already included
            if (student.section && !semesterMap[sem].sections.includes(student.section)) {
              semesterMap[sem].sections.push(student.section);
            }
          });
          
          // Calculate average CGPA for each semester
          Object.keys(semesterMap).forEach(sem => {
            const semesterStudents = result.students.filter((s: any) => s.semester.toString() === sem);
            const totalCGPA = semesterStudents.reduce((sum: number, s: any) => sum + (parseFloat(s.cgpa) || 0), 0);
            const avgCGPA = semesterStudents.length > 0 ? (totalCGPA / semesterStudents.length).toFixed(1) : "0.0";
            semesterMap[sem].avgCGPA = avgCGPA;
          });
          
          setSemesterData(semesterMap);
          console.log('✅ Semester data calculated:', semesterMap);
        }
        
        console.log('✅ Dashboard stats loaded:', result.dashboard);
      } else {
        console.warn('Dashboard API returned unexpected format:', result);
      }
    } catch (error) {
      console.error('❌ Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics', {
        description: 'Using default values'
      });
    } finally {
      setIsDashboardLoading(false);
    }
  };

  // Function to fetch faculty list from API
  const fetchFacultyList = async () => {
    try {
      setIsFacultyLoading(true);
      const response = await fetch(`${API_ENDPOINTS.hod.facultyManagement}?action=list`);
      const result = await response.json();

      if (result.success && result.data) {
        setFaculty(result.data.faculty);
        console.log('✅ Faculty list loaded:', result.data.faculty);
      } else {
        toast.error('Failed to load faculty list', {
          description: result.message
        });
      }
    } catch (error) {
      console.error('❌ Error fetching faculty:', error);
      toast.error('Failed to load faculty', {
        description: 'Please check your connection and try again'
      });
    } finally {
      setIsFacultyLoading(false);
    }
  };

  const students = [
    { id: 1, name: "Amit Kumar", roll: "21CS001", section: "A", semester: 6, cgpa: 8.9, attendance: 92, backlogs: 0 },
    { id: 2, name: "Priya Sharma", roll: "21CS002", section: "A", semester: 6, cgpa: 8.8, attendance: 88, backlogs: 0 },
    { id: 3, name: "Rahul Verma", roll: "21CS003", section: "A", semester: 6, cgpa: 7.5, attendance: 85, backlogs: 1 },
    { id: 4, name: "Sneha Patel", roll: "21CS004", section: "B", semester: 6, cgpa: 9.1, attendance: 95, backlogs: 0 },
  ];

  // Handler for opening Add Faculty dialog
  const handleAddFacultyClick = () => {
    setIsAddFacultyDialogOpen(true);
  };

  // Handler for form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewFaculty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for submitting new faculty
  const handleSubmitFaculty = async () => {
    // Validation
    if (!newFaculty.name || !newFaculty.designation || !newFaculty.email || !newFaculty.phone) {
      toast.error("Please fill in all required fields", {
        description: "Name, Designation, Email, and Phone are required"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newFaculty.email)) {
      toast.error("Invalid email address", {
        description: "Please enter a valid email"
      });
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(newFaculty.phone.replace(/[-\s]/g, ''))) {
      toast.error("Invalid phone number", {
        description: "Please enter a valid 10-digit phone number"
      });
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINTS.hod.facultyManagement}?action=add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newFaculty.name,
          designation: newFaculty.designation,
          email: newFaculty.email,
          phone: newFaculty.phone,
          qualification: newFaculty.qualification,
          specialization: newFaculty.specialization,
          experience: newFaculty.experience
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to add faculty');
      }

      toast.success("Faculty Added Successfully! 🎉", {
        description: `${newFaculty.name} has been added with ID: ${result.data.faculty_id}`
      });

      // Reset form and close dialog
      setNewFaculty({
        name: "",
        designation: "",
        email: "",
        phone: "",
        qualification: "",
        specialization: "",
        experience: ""
      });
      setIsAddFacultyDialogOpen(false);

      // Refresh faculty list
      fetchFacultyList();
      
    } catch (error) {
      toast.error("Failed to add faculty", {
        description: error instanceof Error ? error.message : "Please try again later"
      });
      console.error("Error adding faculty:", error);
    }
  };

  const pendingApprovals = [
    { id: 1, type: "BOA", student: "Amit Kumar", roll: "21CS001", date: "2025-10-12", status: "Pending", facultyApproval: "N/A", class: "3A" },
    { id: 2, type: "BOA", student: "Priya Sharma", roll: "21CS002", date: "2025-10-13", status: "Approved", facultyApproval: "N/A", class: "3B" },
    { id: 3, type: "BOA", student: "Sneha Patel", roll: "21CS004", date: "2025-10-14", status: "Pending", facultyApproval: "Approved", class: "6A" },
    { id: 4, type: "BOA", student: "Rahul Verma", roll: "21CS003", date: "2025-10-13", status: "Rejected", facultyApproval: "Approved", class: "6B" },
  ];

  // Handler for opening semester details dialog
  const handleViewSemester = (semester: string) => {
    setSelectedSemesterDetails(semester);
    setIsSemesterDialogOpen(true);
  };

  // Handler for exporting semester report
  const handleExportReport = () => {
    if (!selectedSemesterDetails) return;

    const semData = semesterData[selectedSemesterDetails as keyof typeof semesterData];
    
    // Create CSV content
    const csvContent = [
      // Header
      ['Semester Report', `Semester ${selectedSemesterDetails}`],
      ['Generated On', new Date().toLocaleString()],
      [''],
      // Summary Statistics
      ['SUMMARY STATISTICS'],
      ['Total Students', semData.students],
      ['Number of Sections', semData.sections.length],
      ['Average CGPA', semData.avgCGPA],
      ['Average Attendance', '89%'],
      [''],
      // Section-wise Performance
      ['SECTION-WISE PERFORMANCE'],
      ['Section', 'Students', 'Avg CGPA', 'Attendance', 'Below 75%', 'Backlogs'],
      ['A', '30', '8.4', '91%', '3', '2'],
      ['B', '30', '8.2', '87%', '5', '4'],
      [''],
      // Top Performers
      ['TOP PERFORMERS'],
      ['Rank', 'Roll No', 'Name', 'Section', 'CGPA', 'Attendance'],
      ['1', '21CS004', 'Sneha Patel', 'B', '9.1', '95%'],
      ['2', '21CS001', 'Amit Kumar', 'A', '8.9', '92%'],
      ['3', '21CS002', 'Priya Sharma', 'A', '8.8', '88%'],
      [''],
      // Students Requiring Attention
      ['STUDENTS REQUIRING ATTENTION'],
      ['Roll No', 'Name', 'Section', 'CGPA', 'Attendance', 'Issues'],
      ['21CS003', 'Rahul Verma', 'A', '7.5', '85%', '1 Backlog, Below 90% Attendance'],
      ['21CS010', 'Karan Singh', 'B', '7.8', '73%', 'Below 75% Attendance'],
    ].map(row => row.join(',')).join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `Semester_${selectedSemesterDetails}_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Report Exported Successfully! 📊', {
      description: `Semester ${selectedSemesterDetails} report has been downloaded`
    });
  };

  const boaSubmissions = {
    clubs: [
      { id: 1, student: "Sneha Patel", roll: "21CS004", event: "Tech Fest 2025", date: "2025-10-10", facultyStatus: "Approved", hodStatus: "Pending" },
      { id: 2, student: "Amit Kumar", roll: "21CS001", event: "Coding Club Annual Meet", date: "2025-10-08", facultyStatus: "Approved", hodStatus: "Approved" },
    ],
    events: [
      { id: 1, student: "Rahul Verma", roll: "21CS003", event: "Coding Competition 2025", date: "2025-10-12", facultyStatus: "Approved", hodStatus: "Pending" },
      { id: 2, student: "Priya Sharma", roll: "21CS002", event: "Hackathon Event", date: "2025-10-05", facultyStatus: "Approved", hodStatus: "Approved" },
    ],
    outdoor: [
      { id: 1, student: "Kiran Reddy", roll: "21CS015", event: "Sports Day 2025", date: "2025-10-05", facultyStatus: "Approved", hodStatus: "Approved" },
      { id: 2, student: "Ananya Singh", roll: "21CS010", event: "Marathon Event", date: "2025-10-09", facultyStatus: "Pending", hodStatus: "Pending" },
    ],
  };

  const lectureSwaps = [
    { id: 1, date: "2025-10-16", class: "CSE301", semester: "6", section: "A", originalFaculty: "Dr. Sharma", proxyFaculty: "Dr. Kumar", reason: "Conference", status: "Approved" },
    { id: 2, date: "2025-10-17", class: "CSE302", semester: "6", section: "B", originalFaculty: "Prof. Gupta", proxyFaculty: "Dr. Verma", reason: "Personal", status: "Pending" },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-6" style={{ color: "#800000" }}>HOD Dashboard</h2>
        {isDashboardLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Total Students" value={dashboardStats.totalStudents} icon={Users} />
            <StatsCard title="Total Faculty" value={dashboardStats.totalFaculty} icon={Users} bgColor="bg-green-50" iconColor="text-green-600" />
            <StatsCard title="Sections" value={dashboardStats.sections} icon={BookOpen} bgColor="bg-purple-50" iconColor="text-purple-600" />
            <StatsCard title="Avg Attendance" value={dashboardStats.avgAttendance} icon={FileCheck} bgColor="bg-orange-50" iconColor="text-orange-600" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Semester Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {isDashboardLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : Object.keys(semesterData).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(semesterData)
                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                  .map(([sem, data]) => (
                    <div key={sem} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium">Semester {sem}</p>
                        <p className="text-sm text-gray-600">
                          {data.students} students • Sections: {data.sections.sort().join(", ")} • Avg CGPA: {data.avgCGPA}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleViewSemester(sem)}>
                        View
                      </Button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No semester data available</p>
                <p className="text-sm mt-2">Add students to see semester overview</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell>
                      <Badge variant="outline">{approval.type}</Badge>
                    </TableCell>
                    <TableCell>{approval.student}</TableCell>
                    <TableCell>{approval.roll}</TableCell>
                    <TableCell>{approval.class}</TableCell>
                    <TableCell>{approval.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          approval.status === "Approved"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : approval.status === "Rejected"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {approval.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions removed as requested: Upload BOA, Manage Lectures, Review Approvals, Export Reports */}
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Student Management</h2>
        <div className="flex items-center gap-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(semesterData).map((sem) => (
                <SelectItem key={sem} value={sem}>Semester {sem}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>Export Data</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Semester {selectedSemester} Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Backlogs</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.filter(s => s.semester.toString() === selectedSemester).map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.roll}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.section}</Badge>
                  </TableCell>
                  <TableCell>{student.cgpa}</TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell>
                    <Badge variant={student.backlogs > 0 ? "destructive" : "outline"}>
                      {student.backlogs}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Section A</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Students:</span>
                <span>30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg CGPA:</span>
                <span>8.4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Attendance:</span>
                <span>90%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Section Incharge:</span>
                <span className="text-xs">Dr. Sharma</span>
              </div>
            </div>
            <Button className="w-full mt-4" size="sm">View Details</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Section B</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Students:</span>
                <span>30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg CGPA:</span>
                <span>8.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Attendance:</span>
                <span>88%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Section Incharge:</span>
                <span className="text-xs">Prof. Gupta</span>
              </div>
            </div>
            <Button className="w-full mt-4" size="sm">View Details</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span>60</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">With Backlogs:</span>
                <span className="text-red-600">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Below 75% Att:</span>
                <span className="text-orange-600">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CGPA &gt; 8.5:</span>
                <span className="text-green-600">35</span>
              </div>
            </div>
            <Button className="w-full mt-4" size="sm" variant="outline">Generate Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderFaculty = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Faculty Management</h2>
        <div className="flex gap-2">
          <Button onClick={fetchFacultyList} variant="outline" disabled={isFacultyLoading}>
            {isFacultyLoading ? "Refreshing..." : "Refresh"}
          </Button>
          <Button onClick={handleAddFacultyClick}>Add Faculty</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faculty Members</CardTitle>
        </CardHeader>
        <CardContent>
          {isFacultyLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                <p className="text-sm text-gray-600">Loading faculty members...</p>
              </div>
            </div>
          ) : faculty.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">No faculty members found</p>
              <p className="text-sm text-gray-500">Click "Add Faculty" to add your first faculty member</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Mentees</TableHead>
                  <TableHead>Experience</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faculty.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <span className="text-sm font-mono text-gray-700">{member.id}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        {member.specialization && (
                          <p className="text-xs text-gray-500">{member.specialization}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{member.designation}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{member.email}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{member.phone}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold">{member.classes}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold">{member.mentees}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{member.experience} yrs</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Leave Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm">Dr. Priya Kumar</p>
                <p className="text-xs text-gray-600">On Leave: Oct 15 - Oct 17</p>
                <p className="text-xs text-gray-500">Engage: Dr. Sharma</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm">Prof. Amit Gupta</p>
                <p className="text-xs text-gray-600">Upcoming Leave: Oct 20 - Oct 21</p>
                <p className="text-xs text-gray-500">Engage: Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workload Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isFacultyLoading ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Loading workload data...</p>
              </div>
            ) : faculty.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No workload data available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {faculty.map((member) => {
                  const totalWorkload = member.classes + member.mentees;
                  const maxWorkload = 20; // Maximum expected workload for scale
                  const workloadPercentage = Math.min((totalWorkload / maxWorkload) * 100, 100);
                  
                  return (
                    <div key={member.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{member.name}</span>
                        <span className="text-gray-600">
                          {member.classes} classes + {member.mentees} mentees = {totalWorkload} total
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={cn(
                            "h-2.5 rounded-full transition-all duration-300",
                            workloadPercentage > 75 ? "bg-red-500" : 
                            workloadPercentage > 50 ? "bg-yellow-500" : 
                            "bg-blue-600"
                          )}
                          style={{ width: `${workloadPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLectures = () => (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle>Engaged Lectures</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Original Faculty</TableHead>
                <TableHead>Engaged Faculty</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lectureSwaps.map((swap) => (
                <TableRow key={swap.id}>
                  <TableCell>{swap.date}</TableCell>
                  <TableCell>{swap.semester}</TableCell>
                  <TableCell>{swap.section}</TableCell>
                  <TableCell>{swap.originalFaculty}</TableCell>
                  <TableCell>{swap.proxyFaculty}</TableCell>
                  <TableCell>{swap.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assign Engage Lecture removed from HOD lectures page per request */}
    </div>
  );

  const renderApprovals = () => (
    <div className="space-y-6">
      <h2>BOA Approvals</h2>
      <BOAManagement />
    </div>
  );

  const renderBOA = () => (
    <div className="space-y-6">
      <h2>Upload Department BOA</h2>
      <p className="text-sm text-gray-600 mb-4">Submit BOA documents for department-level events and activities</p>
      <BOASubmissionForm />
    </div>
  );

  const renderOriginalApprovals = () => (
    <div className="space-y-6">
      <h2>Pending Approvals (Legacy)</h2>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="cv">CVs</TabsTrigger>
          <TabsTrigger value="achievement">Achievements</TabsTrigger>
          <TabsTrigger value="research">Research Papers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Submitted On</TableHead>
                    <TableHead>Faculty Approval</TableHead>
                    <TableHead>HOD Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell>
                        <Badge variant="outline">{approval.type}</Badge>
                      </TableCell>
                      <TableCell>{approval.student}</TableCell>
                      <TableCell>{approval.roll}</TableCell>
                      <TableCell>{approval.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            approval.facultyApproval === "Approved" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : approval.facultyApproval === "N/A"
                              ? "bg-gray-100 text-gray-600 border-gray-300"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        >
                          {approval.facultyApproval}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{approval.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline" className="text-green-600">Approve</Button>
                          <Button size="sm" variant="outline" className="text-red-600">Reject</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cv" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">No pending CV approvals</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievement" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">No pending achievement approvals</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">No pending research paper approvals</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );



  const renderAchievements = () => (
    <div className="space-y-6">
      <h2>Department Achievements</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl mb-2">45</p>
              <p className="text-sm text-gray-600">Total Achievements</p>
            </div>
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={() => setIsStudentAchievementsDialogOpen(true)}
            >
              View All
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Faculty Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl mb-2">28</p>
              <p className="text-sm text-gray-600">Research Papers</p>
            </div>
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={() => setIsFacultyPublicationsDialogOpen(true)}
            >
              View All
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl mb-2">#3</p>
              <p className="text-sm text-gray-600">In University</p>
            </div>
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={() => setIsDepartmentRankingDialogOpen(true)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Award className="h-6 w-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm">Best Department Award 2025</p>
                <p className="text-xs text-gray-600">Awarded by State Government</p>
                <p className="text-xs text-gray-500">2025-09-01</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verified</Badge>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Award className="h-6 w-6 text-purple-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm">Research Excellence Award</p>
                <p className="text-xs text-gray-600">3 faculty members recognized</p>
                <p className="text-xs text-gray-500">2025-08-15</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verified</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderResearch = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Research Repository</h2>
        <Button onClick={() => setIsAddResearchDialogOpen(true)}>Add Research</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl mb-2">128</p>
              <p className="text-sm text-gray-600">Since 2020</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Faculty Research</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl mb-2">85</p>
              <p className="text-sm text-gray-600">Research Papers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Research</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl mb-2">43</p>
              <p className="text-sm text-gray-600">Research Papers</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Publications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p>Deep Learning for Medical Image Analysis</p>
                  <p className="text-sm text-gray-600 mt-1">Dr. Rajesh Sharma, Priya Kumar</p>
                  <p className="text-xs text-gray-500 mt-1">IEEE Journal • 2025-09-15</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Published</Badge>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p>Blockchain in Supply Chain Management</p>
                  <p className="text-sm text-gray-600 mt-1">Prof. Amit Gupta, Students</p>
                  <p className="text-xs text-gray-500 mt-1">ACM Conference • 2025-08-20</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Published</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Reports page removed — HOD reports functionality consolidated into other sections

  const handleMarkAttendance = (slotId: string) => {
    setSelectedSlotId(slotId);
    setIsMarkingAttendance(true);
  };

  const handleBackFromAttendance = () => {
    setIsMarkingAttendance(false);
    setSelectedSlotId(null);
    
    // Refresh attendance status in TeacherTimetable if available
    if (typeof (window as any).refreshAttendanceStatus === 'function') {
      (window as any).refreshAttendanceStatus();
    }
  };

  const handleAttendanceMarked = () => {
    // This is called when attendance is successfully submitted
    console.log('Attendance marked successfully');
    
    // Refresh attendance status in TeacherTimetable
    if (typeof (window as any).refreshAttendanceStatus === 'function') {
      (window as any).refreshAttendanceStatus();
    }
  };

  const renderContent = () => {
    // If marking attendance, show attendance page
    if (isMarkingAttendance && selectedSlotId) {
      return (
        <AttendancePage 
          slotId={selectedSlotId} 
          onBack={handleBackFromAttendance}
          onAttendanceMarked={handleAttendanceMarked}
        />
      );
    }

    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "students":
        return <StudentManagement />;
      case "faculty":
        return renderFaculty();
      case "facultydetails":
        return <FacultyDetails onBack={() => setActiveSection("dashboard")} />;
      case "lectures":
        return renderLectures();
      case "timetable":
        return <Timetable userRole="hod" />;
      case "schedule":
        return <TeacherTimetable onMarkAttendance={handleMarkAttendance} />;
      case "approvals":
        return renderApprovals();
      case "boa":
        return renderBOA();
      case "achievements":
        return renderAchievements();
      case "research":
        return renderResearch();
      // 'reports' section removed
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 p-8 bg-gray-50">
        {renderContent()}
      </main>

      {/* Add Faculty Dialog */}
      <Dialog open={isAddFacultyDialogOpen} onOpenChange={setIsAddFacultyDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add New Faculty</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new faculty member to the department.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Full Name */}
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Dr. Rajesh Kumar"
                value={newFaculty.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Designation */}
            <div className="grid gap-2">
              <label htmlFor="designation" className="text-sm font-medium">
                Designation <span className="text-red-500">*</span>
              </label>
              <Select 
                name="designation" 
                value={newFaculty.designation}
                onValueChange={(value: string) => setNewFaculty(prev => ({ ...prev, designation: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                  <SelectItem value="Lab Assistant">Lab Assistant</SelectItem>
                  <SelectItem value="Visiting Faculty">Visiting Faculty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="e.g., rajesh.kumar@ssipmt.edu"
                value={newFaculty.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g., 9876543210"
                value={newFaculty.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Qualification */}
            <div className="grid gap-2">
              <label htmlFor="qualification" className="text-sm font-medium">
                Highest Qualification
              </label>
              <Input
                id="qualification"
                name="qualification"
                placeholder="e.g., Ph.D. in Computer Science"
                value={newFaculty.qualification}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Specialization */}
            <div className="grid gap-2">
              <label htmlFor="specialization" className="text-sm font-medium">
                Specialization
              </label>
              <Input
                id="specialization"
                name="specialization"
                placeholder="e.g., Machine Learning, Data Science"
                value={newFaculty.specialization}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Experience */}
            <div className="grid gap-2">
              <label htmlFor="experience" className="text-sm font-medium">
                Years of Experience
              </label>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="e.g., 10"
                value={newFaculty.experience}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddFacultyDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitFaculty}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Faculty
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Semester Details Dialog */}
      <Dialog open={isSemesterDialogOpen} onOpenChange={setIsSemesterDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Semester {selectedSemesterDetails} Details
            </DialogTitle>
            <DialogDescription>
              Complete overview of semester {selectedSemesterDetails} students and performance metrics
            </DialogDescription>
          </DialogHeader>

          {selectedSemesterDetails && (
            <div className="space-y-6 py-4">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-900">
                        {semesterData[selectedSemesterDetails as keyof typeof semesterData].students}
                      </p>
                      <p className="text-sm text-blue-700">Total Students</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-900">
                        {semesterData[selectedSemesterDetails as keyof typeof semesterData].sections.length}
                      </p>
                      <p className="text-sm text-green-700">Sections</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-900">
                        {semesterData[selectedSemesterDetails as keyof typeof semesterData].avgCGPA}
                      </p>
                      <p className="text-sm text-purple-700">Average CGPA</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-900">89%</p>
                      <p className="text-sm text-orange-700">Avg Attendance</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Section-wise Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Section-wise Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {semesterData[selectedSemesterDetails as keyof typeof semesterData].sections.map((section) => (
                      <div key={section} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg">Section {section}</h3>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Active
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Students:</span>
                            <span className="font-medium">30</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Average CGPA:</span>
                            <span className="font-medium text-green-600">{section === 'A' ? '8.4' : '8.2'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Attendance:</span>
                            <span className="font-medium text-blue-600">{section === 'A' ? '91%' : '87%'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Students Below 75%:</span>
                            <span className="font-medium text-orange-600">{section === 'A' ? '3' : '5'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">With Backlogs:</span>
                            <span className="font-medium text-red-600">{section === 'A' ? '2' : '4'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Roll No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead>CGPA</TableHead>
                        <TableHead>Attendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Badge className="bg-yellow-500 hover:bg-yellow-600">🥇 1</Badge>
                        </TableCell>
                        <TableCell className="font-mono">21CS004</TableCell>
                        <TableCell className="font-medium">Sneha Patel</TableCell>
                        <TableCell>
                          <Badge variant="outline">B</Badge>
                        </TableCell>
                        <TableCell className="text-green-600 font-semibold">9.1</TableCell>
                        <TableCell>
                          <Badge className="bg-green-50 text-green-700 border-green-200">95%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Badge className="bg-gray-300 hover:bg-gray-400">🥈 2</Badge>
                        </TableCell>
                        <TableCell className="font-mono">21CS001</TableCell>
                        <TableCell className="font-medium">Amit Kumar</TableCell>
                        <TableCell>
                          <Badge variant="outline">A</Badge>
                        </TableCell>
                        <TableCell className="text-green-600 font-semibold">8.9</TableCell>
                        <TableCell>
                          <Badge className="bg-green-50 text-green-700 border-green-200">92%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Badge className="bg-orange-300 hover:bg-orange-400">🥉 3</Badge>
                        </TableCell>
                        <TableCell className="font-mono">21CS002</TableCell>
                        <TableCell className="font-medium">Priya Sharma</TableCell>
                        <TableCell>
                          <Badge variant="outline">A</Badge>
                        </TableCell>
                        <TableCell className="text-green-600 font-semibold">8.8</TableCell>
                        <TableCell>
                          <Badge className="bg-green-50 text-green-700 border-green-200">88%</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Attention Required */}
              <Card className="border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-orange-900">Students Requiring Attention</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-red-900">Rahul Verma (21CS003)</p>
                        <p className="text-sm text-red-700">Section A • CGPA: 7.5 • Attendance: 85%</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="destructive" className="text-xs">1 Backlog</Badge>
                          <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                            Below 90% Attendance
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-yellow-900">Karan Singh (21CS010)</p>
                        <p className="text-sm text-yellow-700">Section B • CGPA: 7.8 • Attendance: 73%</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                            Below 75% Attendance
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSemesterDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleExportReport}>
              <Upload className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Student Achievements Dialog */}
      <Dialog open={isStudentAchievementsDialogOpen} onOpenChange={setIsStudentAchievementsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Student Achievements</DialogTitle>
            <DialogDescription>
              Complete list of student achievements and awards
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6 text-center">
                  <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-900">45</p>
                  <p className="text-sm text-blue-700">Total Achievements</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-900">32</p>
                  <p className="text-sm text-green-700">Students Awarded</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-900">2024-25</p>
                  <p className="text-sm text-purple-700">Academic Year</p>
                </CardContent>
              </Card>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Achievement</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2025-10-15</TableCell>
                  <TableCell className="font-medium">Sneha Patel</TableCell>
                  <TableCell className="font-mono">21CS004</TableCell>
                  <TableCell>First Prize - State Level Hackathon</TableCell>
                  <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700">Technical</Badge></TableCell>
                  <TableCell><Badge className="bg-green-50 text-green-700 border-green-200">Verified</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2025-09-28</TableCell>
                  <TableCell className="font-medium">Amit Kumar</TableCell>
                  <TableCell className="font-mono">21CS001</TableCell>
                  <TableCell>Best Research Paper - IEEE Conference</TableCell>
                  <TableCell><Badge variant="outline" className="bg-purple-50 text-purple-700">Research</Badge></TableCell>
                  <TableCell><Badge className="bg-green-50 text-green-700 border-green-200">Verified</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2025-09-10</TableCell>
                  <TableCell className="font-medium">Priya Sharma</TableCell>
                  <TableCell className="font-mono">21CS002</TableCell>
                  <TableCell>Gold Medal - Inter-College Sports</TableCell>
                  <TableCell><Badge variant="outline" className="bg-orange-50 text-orange-700">Sports</Badge></TableCell>
                  <TableCell><Badge className="bg-green-50 text-green-700 border-green-200">Verified</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2025-08-22</TableCell>
                  <TableCell className="font-medium">Rahul Verma</TableCell>
                  <TableCell className="font-mono">21CS003</TableCell>
                  <TableCell>Runner-up - Coding Competition</TableCell>
                  <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700">Technical</Badge></TableCell>
                  <TableCell><Badge className="bg-green-50 text-green-700 border-green-200">Verified</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2025-08-15</TableCell>
                  <TableCell className="font-medium">Karan Singh</TableCell>
                  <TableCell className="font-mono">21CS010</TableCell>
                  <TableCell>Best Innovation Award - Tech Fest</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">Innovation</Badge></TableCell>
                  <TableCell><Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStudentAchievementsDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Faculty Publications Dialog */}
      <Dialog open={isFacultyPublicationsDialogOpen} onOpenChange={setIsFacultyPublicationsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Faculty Publications</DialogTitle>
            <DialogDescription>
              Research papers and publications by department faculty
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6 text-center">
                  <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-900">28</p>
                  <p className="text-sm text-purple-700">Total Papers</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-900">12</p>
                  <p className="text-sm text-green-700">Contributing Faculty</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="pt-6 text-center">
                  <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-900">8</p>
                  <p className="text-sm text-orange-700">In SCI Journals</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Deep Learning for Medical Image Analysis</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Authors:</span> Dr. Rajesh Kumar, Dr. Priya Sharma, Amit Kumar (Student)
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Journal:</span> IEEE Transactions on Medical Imaging
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge className="bg-green-50 text-green-700 border-green-200">Published</Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">SCI Indexed</Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">Impact Factor: 8.9</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ml-4">Sept 2025</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Blockchain in Supply Chain Management</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Authors:</span> Prof. Amit Gupta, Dr. S.S. Wadhwa
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Conference:</span> ACM International Conference on Blockchain
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge className="bg-green-50 text-green-700 border-green-200">Published</Badge>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700">Conference Paper</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ml-4">Aug 2025</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">AI-based Traffic Management System</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Authors:</span> Dr. Priya Sharma, Dr. Rajesh Kumar
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Journal:</span> Springer Journal of Intelligent Systems
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Under Review</Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">Scopus Indexed</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ml-4">Oct 2025</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Machine Learning for Cyber Security</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Authors:</span> Dr. S.S. Wadhwa, Priya Singh
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Journal:</span> IEEE Security & Privacy
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge className="bg-green-50 text-green-700 border-green-200">Published</Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">SCI Indexed</Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">Impact Factor: 7.2</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ml-4">July 2025</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFacultyPublicationsDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Department Ranking Dialog */}
      <Dialog open={isDepartmentRankingDialogOpen} onOpenChange={setIsDepartmentRankingDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Department Ranking Details</DialogTitle>
            <DialogDescription>
              University-wide ranking and performance metrics
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Award className="h-16 w-16 text-orange-600 mx-auto mb-3" />
                  <p className="text-5xl font-bold text-orange-900 mb-2">#3</p>
                  <p className="text-lg text-orange-700">Computer Science Department</p>
                  <p className="text-sm text-orange-600">Out of 45 departments in the university</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-medium">Academic Excellence</p>
                        <p className="text-sm text-gray-600">Average CGPA & Pass Percentage</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">92%</p>
                      <Badge className="bg-green-50 text-green-700 border-green-200">Rank #2</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                      <div>
                        <p className="font-medium">Research Output</p>
                        <p className="text-sm text-gray-600">Publications & Citations</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">85%</p>
                      <Badge className="bg-green-50 text-green-700 border-green-200">Rank #3</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-medium">Placement Record</p>
                        <p className="text-sm text-gray-600">Students Placed & Packages</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">88%</p>
                      <Badge className="bg-green-50 text-green-700 border-green-200">Rank #4</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-orange-600" />
                      <div>
                        <p className="font-medium">Student Achievements</p>
                        <p className="text-sm text-gray-600">Awards & Recognitions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">90%</p>
                      <Badge className="bg-green-50 text-green-700 border-green-200">Rank #3</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 5 Departments Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Overall Score</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell><Badge className="bg-yellow-500 hover:bg-yellow-600">🥇 1</Badge></TableCell>
                      <TableCell className="font-medium">Electrical Engineering</TableCell>
                      <TableCell><span className="text-green-600 font-semibold">94%</span></TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">↑ +2</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Badge className="bg-gray-300 hover:bg-gray-400">🥈 2</Badge></TableCell>
                      <TableCell className="font-medium">Mechanical Engineering</TableCell>
                      <TableCell><span className="text-green-600 font-semibold">91%</span></TableCell>
                      <TableCell><Badge variant="outline" className="bg-gray-100 text-gray-700">→ 0</Badge></TableCell>
                    </TableRow>
                    <TableRow className="bg-blue-50">
                      <TableCell><Badge className="bg-orange-300 hover:bg-orange-400">🥉 3</Badge></TableCell>
                      <TableCell className="font-medium">Computer Science</TableCell>
                      <TableCell><span className="text-green-600 font-semibold">89%</span></TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">↑ +1</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Badge variant="outline">4</Badge></TableCell>
                      <TableCell className="font-medium">Information Technology</TableCell>
                      <TableCell><span className="text-blue-600 font-semibold">87%</span></TableCell>
                      <TableCell><Badge variant="outline" className="bg-red-50 text-red-700">↓ -1</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Badge variant="outline">5</Badge></TableCell>
                      <TableCell className="font-medium">Civil Engineering</TableCell>
                      <TableCell><span className="text-blue-600 font-semibold">85%</span></TableCell>
                      <TableCell><Badge variant="outline" className="bg-gray-100 text-gray-700">→ 0</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepartmentRankingDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Research Dialog */}
      <Dialog open={isAddResearchDialogOpen} onOpenChange={setIsAddResearchDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add Research Publication</DialogTitle>
            <DialogDescription>
              Add a new research paper or publication to the repository
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Enter research paper title"
                value={researchForm.title}
                onChange={(e) => setResearchForm({ ...researchForm, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Authors</label>
              <Input
                placeholder="e.g., Dr. John Doe, Jane Smith"
                value={researchForm.authors}
                onChange={(e) => setResearchForm({ ...researchForm, authors: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={researchForm.type} onValueChange={(value: string) => setResearchForm({ ...researchForm, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Journal">Journal</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Book Chapter">Book Chapter</SelectItem>
                    <SelectItem value="Patent">Patent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={researchForm.status} onValueChange={(value: string) => setResearchForm({ ...researchForm, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Venue</label>
              <Input
                placeholder="Journal/Conference name"
                value={researchForm.venue}
                onChange={(e) => setResearchForm({ ...researchForm, venue: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Input
                type="number"
                min="1900"
                max="2100"
                placeholder="2025"
                value={researchForm.year}
                onChange={(e) => setResearchForm({ ...researchForm, year: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddResearchDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                toast.success("Research Added!", {
                  description: `"${researchForm.title}" has been added to the repository.`
                });
                setIsAddResearchDialogOpen(false);
                // Reset form
                setResearchForm({
                  title: "",
                  authors: "",
                  type: "Journal",
                  venue: "",
                  year: new Date().getFullYear().toString(),
                  status: "Published"
                });
              }}
            >
              Add Research
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}
