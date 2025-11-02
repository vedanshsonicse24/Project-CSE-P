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

interface HODDashboardProps {
  isViewOnly?: boolean;
  initialSection?: string;
}

export function HODDashboard({ isViewOnly = false, initialSection = "dashboard" }: HODDashboardProps) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [selectedSemester, setSelectedSemester] = useState("6");
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);

  // Update active section when prop changes
  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const departmentStats = {
    totalStudents: 480,
    totalFaculty: 24,
    sections: 8,
    avgAttendance: "89%",
  };

  const semesterData = {
    1: { students: 60, sections: ["A", "B"], avgCGPA: "7.8" },
    2: { students: 60, sections: ["A", "B"], avgCGPA: "7.9" },
    3: { students: 60, sections: ["A", "B"], avgCGPA: "8.1" },
    4: { students: 60, sections: ["A", "B"], avgCGPA: "8.0" },
    5: { students: 60, sections: ["A", "B"], avgCGPA: "8.2" },
    6: { students: 60, sections: ["A", "B"], avgCGPA: "8.3" },
    7: { students: 60, sections: ["A", "B"], avgCGPA: "8.4" },
    8: { students: 60, sections: ["A", "B"], avgCGPA: "8.5" },
  };

  const students = [
    { id: 1, name: "Amit Kumar", roll: "21CS001", section: "A", semester: 6, cgpa: 8.9, attendance: 92, backlogs: 0 },
    { id: 2, name: "Priya Sharma", roll: "21CS002", section: "A", semester: 6, cgpa: 8.8, attendance: 88, backlogs: 0 },
    { id: 3, name: "Rahul Verma", roll: "21CS003", section: "A", semester: 6, cgpa: 7.5, attendance: 85, backlogs: 1 },
    { id: 4, name: "Sneha Patel", roll: "21CS004", section: "B", semester: 6, cgpa: 9.1, attendance: 95, backlogs: 0 },
  ];

  const faculty = [
    { id: 1, name: "Dr. Rajesh Sharma", designation: "Professor", classes: 3, mentees: 15, leave: "Available" },
    { id: 2, name: "Dr. Priya Kumar", designation: "Associate Professor", classes: 4, mentees: 12, leave: "On Leave" },
    { id: 3, name: "Prof. Amit Gupta", designation: "Assistant Professor", classes: 3, mentees: 10, leave: "Available" },
    { id: 4, name: "Dr. Neha Verma", designation: "Professor", classes: 2, mentees: 8, leave: "Available" },
  ];

  const pendingApprovals = [
    { id: 1, type: "BOA", student: "Amit Kumar", roll: "21CS001", date: "2025-10-12", status: "Pending", facultyApproval: "N/A", class: "3A" },
    { id: 2, type: "BOA", student: "Priya Sharma", roll: "21CS002", date: "2025-10-13", status: "Approved", facultyApproval: "N/A", class: "3B" },
    { id: 3, type: "BOA", student: "Sneha Patel", roll: "21CS004", date: "2025-10-14", status: "Pending", facultyApproval: "Approved", class: "6A" },
    { id: 4, type: "BOA", student: "Rahul Verma", roll: "21CS003", date: "2025-10-13", status: "Rejected", facultyApproval: "Approved", class: "6B" },
  ];

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
        <h2 className="mb-6">Developer Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Students" value={departmentStats.totalStudents} icon={Users} />
          <StatsCard title="Total Faculty" value={departmentStats.totalFaculty} icon={Users} bgColor="bg-green-50" iconColor="text-green-600" />
          <StatsCard title="Sections" value={departmentStats.sections} icon={BookOpen} bgColor="bg-purple-50" iconColor="text-purple-600" />
          <StatsCard title="Avg Attendance" value={departmentStats.avgAttendance} icon={FileCheck} bgColor="bg-orange-50" iconColor="text-orange-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Semester Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(semesterData).map(([sem, data]) => (
                <div key={sem} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p>Semester {sem}</p>
                    <p className="text-sm text-gray-600">{data.students} students • Avg CGPA: {data.avgCGPA}</p>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              ))}
            </div>
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
        <Button>Add Faculty</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faculty Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Mentees</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faculty.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <span className="text-sm font-mono text-gray-700">{member.id}</span>
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.designation}</TableCell>
                  <TableCell>{member.classes}</TableCell>
                  <TableCell>{member.mentees}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
            <div className="space-y-3">
              {faculty.map((member) => (
                <div key={member.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{member.name}</span>
                    <span>{member.classes} classes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(member.classes / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
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
            <Button className="w-full mt-4" variant="outline">View All</Button>
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
            <Button className="w-full mt-4" variant="outline">View All</Button>
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
            <Button className="w-full mt-4" variant="outline">View Details</Button>
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
        <Button>Add Research</Button>
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
  };

  const renderContent = () => {
    // If marking attendance, show attendance page
    if (isMarkingAttendance && selectedSlotId) {
      return <AttendancePage slotId={selectedSlotId} onBack={handleBackFromAttendance} />;
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
      <Toaster />
    </div>
  );
}
