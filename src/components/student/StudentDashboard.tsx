import { useState, useEffect } from "react";
import { DashboardSidebar } from "../common/DashboardSidebar";
import { StatsCard } from "../common/StatsCard";
import {
  LayoutDashboard,
  User,
  Upload,
  Award,
  BookOpen,
  FileText,
  Users,
  Bell,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { BOASubmissionForm } from "../boa/BOASubmissionForm";
import { StudentAttendanceRedesigned } from "./StudentAttendanceRedesigned";
import { Timetable } from "../timetable/Timetable";
import { API_ENDPOINTS } from "../../server";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

const sidebarItems: any[] = [];

interface StudentDashboardProps {
  initialSection?: string;
  onNavigateToProfile?: () => void;
}

interface StudentInfo {
  name: string;
  roll: string;
  semester: string;
  section: string;
  email: string;
  phone: string;
  cgpa: string;
  attendance: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
}

export function StudentDashboard({ initialSection = "dashboard", onNavigateToProfile }: StudentDashboardProps) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: "",
    roll: "",
    semester: "",
    section: "",
    email: "",
    phone: "",
    cgpa: "",
    attendance: "",
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [uploadedCVs, setUploadedCVs] = useState<any[]>([]);
  const [isLoadingCVs, setIsLoadingCVs] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddAchievementOpen, setIsAddAchievementOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    category: "academic",
    date: "",
    description: "",
  });

  // Update active section when prop changes
  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  // Fetch student dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch uploaded CVs when component mounts or section changes
  useEffect(() => {
    if (activeSection === "upload-cv" && studentInfo.roll) {
      fetchUploadedCVs();
    }
  }, [activeSection, studentInfo.roll]);

  const fetchUploadedCVs = async () => {
    if (!studentInfo.roll) return;
    
    setIsLoadingCVs(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.student.getCVs}?rollNo=${studentInfo.roll}`);
      const result = await response.json();
      
      if (result.status === 'success') {
        setUploadedCVs(result.data);
      } else {
        toast.error("Failed to fetch CVs");
      }
    } catch (error) {
      console.error('Error fetching CVs:', error);
    } finally {
      setIsLoadingCVs(false);
    }
  };

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get student data from localStorage
      const userData = localStorage.getItem("userData");
      if (!userData) {
        throw new Error("No user data found. Please login again.");
      }
      
      const user = JSON.parse(userData);
      const studentId = user.user_id || user.student_id || user.id;
      
      if (!studentId) {
        throw new Error("Student ID not found. Please login again.");
      }
      
      // Fetch dashboard data with student_id
      const response = await fetch(`${API_ENDPOINTS.student.dashboard}?student_id=${studentId}`, {
        headers: {
          'Authorization': `Bearer ${studentId}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      
      if (result.status === "success" && result.data) {
        setStudentInfo(result.data);
        if (result.data.notifications) {
          setNotifications(result.data.notifications);
        }
      } else {
        throw new Error(result.message || "Failed to fetch dashboard data");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load dashboard";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Dashboard fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const mentorInfo = {
    name: "Dr. Rajesh Kumar",
    department: "Computer Science & Engineering",
    email: "rajesh.kumar@faculty.edu",
    phone: "+91 98765 12345",
  };

  const achievements = {
    academic: [
      { id: 1, title: "Dean's List 2024", date: "2024-05-15", status: "Approved" },
      { id: 2, title: "Best Project Award", date: "2024-08-20", status: "Approved" },
      { id: 3, title: "Hackathon Winner", date: "2025-09-10", status: "Pending" },
    ],
    extracurricular: [
      { id: 1, title: "Cultural Fest Coordinator", date: "2024-03-10", status: "Approved" },
      { id: 2, title: "Sports Captain", date: "2024-06-01", status: "Approved" },
    ],
  };

  const renderDashboard = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>Retry</Button>
          </div>
        </div>
      );
    }

    return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-6">Student Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="CGPA" value={studentInfo.cgpa || "N/A"} icon={Award} />
          <StatsCard title="Attendance" value={studentInfo.attendance || "N/A"} icon={User} bgColor="bg-green-50" iconColor="text-green-600" />
          <StatsCard title="Semester" value={studentInfo.semester || "N/A"} icon={BookOpen} bgColor="bg-purple-50" iconColor="text-purple-600" />
          <StatsCard title="Achievements" value="5" icon={Award} bgColor="bg-orange-50" iconColor="text-orange-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-100 text-blue-700">PS</AvatarFallback>
                </Avatar>
                <div>
                  <p>{studentInfo.name}</p>
                  <p className="text-sm text-gray-600">{studentInfo.roll}</p>
                  <Badge variant="outline">{studentInfo.section}</Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{studentInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span>{studentInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Semester:</span>
                  <span>{studentInfo.semester}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveSection('attendance')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <User className="h-5 w-5" />
              View Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{studentInfo.attendance}</p>
                <p className="text-sm text-gray-600">Current Attendance</p>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setActiveSection('attendance')}>
                View Detailed Attendance
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm">{notif.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-600" />
            My Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-3 text-blue-700">Academic Achievements</h4>
              <div className="space-y-2">
                {achievements.academic.map((achievement) => (
                  <div key={achievement.id} className="flex items-start justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{new Date(achievement.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={achievement.status === "Approved" ? "bg-green-500" : "bg-yellow-500"}>
                      {achievement.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 text-purple-700">Extracurricular Achievements</h4>
              <div className="space-y-2">
                {achievements.extracurricular.map((achievement) => (
                  <div key={achievement.id} className="flex items-start justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{new Date(achievement.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={achievement.status === "Approved" ? "bg-green-500" : "bg-yellow-500"}>
                      {achievement.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    );
  };

  // The student dashboard no longer includes a separate 'profile' page/section here.

  const handleViewCV = (cvFilename: string) => {
    // In production, this would fetch the actual CV URL from the backend
    // For now, we'll show a toast and simulate opening a CV
    toast.info("Opening CV", {
      description: `Opening ${cvFilename}...`,
    });

    // Simulate opening CV in new tab
    // In production, this would be the actual file URL from backend
    setTimeout(() => {
      toast.success("CV Opened", {
        description: "The CV has been opened in a new tab.",
      });
      // window.open(`${API_ENDPOINTS.student.cvUpload}/download?file=${cvFilename}`, '_blank');
    }, 500);
  };

  const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid File Type", {
        description: "Please upload a PDF, DOC, or DOCX file.",
      });
      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File Too Large", {
        description: "File size must be less than 5MB.",
      });
      return;
    }

    // Show uploading toast
    const uploadToastId = toast.loading("Uploading CV...", {
      description: `Uploading ${file.name}`,
    });

    try {
      // Create FormData and send to backend
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('rollNo', studentInfo.roll);
      
      const response = await fetch(API_ENDPOINTS.student.cvUpload, { 
        method: 'POST', 
        body: formData 
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        toast.dismiss(uploadToastId);
        toast.success("CV Uploaded Successfully!", {
          description: `${file.name} has been uploaded and approved.`,
        });
        
        // Reset file input
        const fileInput = document.getElementById('cv-upload-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        // Refresh CV list
        await fetchUploadedCVs();
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      toast.dismiss(uploadToastId);
      toast.error("Upload Failed", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
      console.error('CV upload error:', error);
    }
  };

  const handleViewAchievementDetails = (achievement: any) => {
    setSelectedAchievement(achievement);
    setIsViewDetailsOpen(true);
  };

  const handleAddAchievement = () => {
    setIsAddAchievementOpen(true);
  };

  const handleSubmitAchievement = () => {
    // Validate form
    if (!newAchievement.title || !newAchievement.date || !newAchievement.description) {
      toast.error("All fields are required", {
        description: "Please fill in all fields before submitting.",
      });
      return;
    }

    // Show loading toast
    toast.loading("Submitting achievement...");

    // Simulate submission
    setTimeout(() => {
      toast.dismiss();
      toast.success("Achievement Submitted!", {
        description: "Your achievement has been submitted for approval.",
      });

      // Reset form and close dialog
      setNewAchievement({
        title: "",
        category: "academic",
        date: "",
        description: "",
      });
      setIsAddAchievementOpen(false);

      // In production, send to backend:
      // const formData = {
      //   ...newAchievement,
      //   student_id: studentData.student_id,
      // };
      // fetch(API_ENDPOINTS.student.achievements, { 
      //   method: 'POST', 
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    }, 1500);
  };

  const handleDownloadCertificate = (achievement: any) => {
    toast.loading("Generating Certificate...", {
      description: "Please wait while we prepare your certificate.",
    });

    // Simulate certificate generation and download
    setTimeout(() => {
      toast.dismiss();

      // Create certificate content
      const certificateContent = `
CERTIFICATE OF ACHIEVEMENT

This is to certify that

${studentInfo.name}
Roll No: ${studentInfo.roll}

has been awarded

${achievement.title}

Date: ${achievement.date}

This certificate is issued by
Shri Shankaracharya Institute of Professional Management & Technology
Raipur, Chhattisgarh

Status: ${achievement.status}

---
This is a digitally generated certificate.
© ${new Date().getFullYear()} SSIPMT College of Engineering
      `;

      // Create blob and download
      const blob = new Blob([certificateContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Certificate_${achievement.title.replace(/\s+/g, '_')}_${studentInfo.roll}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("Certificate Downloaded!", {
        description: `${achievement.title} certificate has been downloaded successfully.`,
      });

      // In production, fetch actual certificate from backend:
      // const response = await fetch(
      //   `${API_ENDPOINTS.student.certificates}?achievement_id=${achievement.id}`
      // );
      // const blob = await response.blob();
      // saveAs(blob, `Certificate_${achievement.title}.pdf`);
    }, 2000);
  };

  const renderCV = () => (
    <div className="space-y-6">
      <h2>Upload CV</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>CV Upload</CardTitle>
          <p className="text-sm text-gray-600">Upload your latest curriculum vitae</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="mb-2">Drag and drop your CV here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <input
              type="file"
              id="cv-upload-input"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleCVUpload}
              className="hidden"
            />
            <Button onClick={() => document.getElementById('cv-upload-input')?.click()}>
              Browse Files
            </Button>
            <p className="text-xs text-gray-500 mt-4">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded CVs</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingCVs ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : uploadedCVs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No CVs uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {uploadedCVs.map((cv) => (
                <div key={cv.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">{cv.fileName}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded on {new Date(cv.uploadDate).toLocaleDateString()} • {cv.fileSize} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={
                        cv.status === 'Approved' 
                          ? "bg-green-50 text-green-700 border-green-200"
                          : cv.status === 'Rejected'
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                    >
                      {cv.status}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`http://localhost/cse_portal_backend/${cv.filePath}`, '_blank')}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Achievements</h2>
        <Button onClick={handleAddAchievement}>Add Achievement</Button>
      </div>

      <Tabs defaultValue="academic">
        <TabsList>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="extracurricular">Extracurricular</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.academic.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Award className="h-8 w-8 text-blue-600" />
                    <Badge 
                      variant="outline" 
                      className={achievement.status === "Approved" ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}
                    >
                      {achievement.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.date}</p>
                  <Button 
                    className="w-full mt-4" 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewAchievementDetails(achievement)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="extracurricular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.extracurricular.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Award className="h-8 w-8 text-purple-600" />
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {achievement.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.date}</p>
                  <Button 
                    className="w-full mt-4" 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewAchievementDetails(achievement)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderBOA = () => (
    <div className="space-y-6">
      <BOASubmissionForm />

      <Card>
        <CardHeader>
          <CardTitle>My BOA Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Tech Fest 2025 - Clubs BOA</p>
                    <p className="text-sm text-gray-600">Submitted on 2025-10-10</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-black border-gray-300 text-base px-4 py-1">Pending</Badge>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Sports Day - Outdoor Event BOA</p>
                    <p className="text-sm text-gray-600">Submitted on 2025-10-05</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-black border-gray-300 text-base px-4 py-1">Approved</Badge>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Coding Competition - Event BOA</p>
                    <p className="text-sm text-gray-600">Submitted on 2025-10-12</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-black border-gray-300 text-base px-4 py-1">Rejected</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMentor = () => (
    <div className="space-y-6">
      <h2>Mentor Connection</h2>

      <Card>
        <CardHeader>
          <CardTitle>My Mentor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-purple-100 text-purple-700 text-2xl">RK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="mb-1">{mentorInfo.name}</p>
              <p className="text-sm text-gray-600 mb-4">{mentorInfo.department}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Email:</span>
                  <span>{mentorInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Phone:</span>
                  <span>{mentorInfo.phone}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button>Schedule Meeting</Button>
                <Button variant="outline">Send Message</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meeting History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm">Academic Progress Discussion</p>
                <p className="text-xs text-gray-500">2025-10-10 at 3:00 PM</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm">Career Guidance Session</p>
                <p className="text-xs text-gray-500">2025-09-25 at 2:00 PM</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm">Project Review</p>
                <p className="text-xs text-gray-500">2025-10-16 at 3:00 PM</p>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Upcoming</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2>Notifications</h2>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="mb-1">{notif.title}</p>
                  <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-500">{notif.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      // 'profile' dashboard section removed (standalone profile page retained separately)
      case "timetable":
        return <Timetable userRole="student" />;
      case "cv":
        return renderCV();
      case "achievements":
        return renderAchievements();
      case "boa":
        return renderBOA();
      case "mentor":
        return renderMentor();
      case "notifications":
        return renderNotifications();
      case "attendance":
        return <StudentAttendanceRedesigned onBack={() => setActiveSection("dashboard")} />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex flex-col">
      <DashboardSidebar
        items={sidebarItems}
        activeItem={activeSection}
        onItemClick={setActiveSection}
      />
      <main className="flex-1 p-8 bg-gray-50">
        {renderContent()}
      </main>
      <Toaster />

      {/* View Achievement Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Achievement Details</DialogTitle>
            <DialogDescription>
              Complete information about this achievement
            </DialogDescription>
          </DialogHeader>
          
          {selectedAchievement && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Award className="h-12 w-12 text-blue-600" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedAchievement.title}</h3>
                  <p className="text-sm text-gray-500">{selectedAchievement.date}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={selectedAchievement.status === "Approved" 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"}
                >
                  {selectedAchievement.status}
                </Badge>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600">
                  {selectedAchievement.description || "This is a prestigious achievement that demonstrates excellence and dedication in the field. Further details about the achievement can be added here."}
                </p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Category</h4>
                <Badge variant="outline">
                  {selectedAchievement.id <= 3 ? "Academic" : "Extracurricular"}
                </Badge>
              </div>

              {selectedAchievement.status === "Approved" && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Certificate</h4>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => handleDownloadCertificate(selectedAchievement)}
                  >
                    <FileText className="h-4 w-4" />
                    Download Certificate
                  </Button>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Achievement Dialog */}
      <Dialog open={isAddAchievementOpen} onOpenChange={setIsAddAchievementOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add New Achievement</DialogTitle>
            <DialogDescription>
              Submit a new achievement for approval
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="achievement-title">Achievement Title *</Label>
              <Input
                id="achievement-title"
                placeholder="e.g., Dean's List 2024"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievement-category">Category *</Label>
              <select
                id="achievement-category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newAchievement.category}
                onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value })}
              >
                <option value="academic">Academic</option>
                <option value="extracurricular">Extracurricular</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievement-date">Date *</Label>
              <Input
                id="achievement-date"
                type="date"
                value={newAchievement.date}
                onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievement-description">Description *</Label>
              <Textarea
                id="achievement-description"
                placeholder="Describe your achievement..."
                rows={4}
                value={newAchievement.description}
                onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your achievement will be reviewed by the faculty before approval. 
                Please ensure all information is accurate.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddAchievementOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitAchievement}>
              Submit Achievement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
