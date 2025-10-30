import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { User, Calendar, Hash, Award, Mail, Phone, Users, Linkedin, Github, BookOpen, GraduationCap, MapPin, Briefcase, TrendingUp, FileText, Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Backlog {
  subject: string;
  semester: string;
}

interface AttendanceRecord {
  subject: string;
  classesAttended: string;
  totalClasses: string;
}

interface SemesterResult {
  subject: string;
  marks: string;
  grade: string;
}

interface StudentProfileData {
  // Personal Information
  fullName: string;
  rollNumber: string;
  enrollmentNumber: string;
  linkedIn: string;
  github: string;
  dateOfBirth: string;
  gender: string;
  profilePicture: string;
  attendance: string;
  designation: string;
  
  // Contact Information
  email: string;
  additionalEmail: string;
  phone: string;
  address: string;
  
  // Academic Info (Left Panel)
  semester: string;
  section: string;
  mentorName: string;
  backlogs: Backlog[];
  attendanceRecords: AttendanceRecord[];
  
  // Parent Information
  fatherName: string;
  fatherPhone: string;
  fatherOccupation: string;
  motherName: string;
  motherPhone: string;
  motherOccupation: string;
  
  // Academic Details
  currentSemesterResults: SemesterResult[];
  averageCGPA: string;
  researchPapersCount: string;
  projectsCount: string;
  
  // Achievements
  achievements: string;
  
  // Clubs
  activeInClubs: string;
}


export function StudentProfile() {
  const [formData, setFormData] = useState<StudentProfileData>({
    // Personal Information
    fullName: "Priya Sharma",
    rollNumber: "21CS002",
    enrollmentNumber: "0827CS211002",
    linkedIn: "linkedin.com/in/priyasharma",
    github: "github.com/priyasharma",
    dateOfBirth: "2003-05-15",
    gender: "Female",
    profilePicture: "",
    attendance: "92",
    designation: "Student Representative",
    
    // Contact Information
    email: "priya.sharma@student.edu",
    additionalEmail: "",
    phone: "+91 98765 43210",
    address: "123, Model Town, Raipur, Chhattisgarh - 492001",
    
    // Academic Info
    semester: "5",
    section: "A",
    mentorName: "Dr. Rajesh Kumar",
    backlogs: [
      { subject: "Data Structures", semester: "3" }
    ],
    attendanceRecords: [
      { subject: "Machine Learning", classesAttended: "42", totalClasses: "45" },
      { subject: "Database Systems", classesAttended: "40", totalClasses: "42" },
      { subject: "Web Development", classesAttended: "38", totalClasses: "40" }
    ],
    
    // Parent Information
    fatherName: "Rajesh Sharma",
    fatherPhone: "+91 98765 12345",
    fatherOccupation: "Government Employee",
    motherName: "Sunita Sharma",
    motherPhone: "+91 98765 67890",
    motherOccupation: "Teacher",
    
    // Academic Details
    currentSemesterResults: [
      { subject: "Machine Learning", marks: "85", grade: "A" },
      { subject: "Database Systems", marks: "88", grade: "A" },
      { subject: "Software Engineering", marks: "82", grade: "A" }
    ],
    averageCGPA: "8.5",
    researchPapersCount: "2",
    projectsCount: "5",
    
    // Achievements
    achievements: "First Prize in Hackathon 2024\nBest Project Award - Web Development\nActive Member - Coding Club\nPublished Research Paper on AI",
    
    // Clubs
    activeInClubs: "Coding Club\nRobotics Club",
  });

  // Password change states
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: keyof StudentProfileData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addBacklog = () => {
    setFormData(prev => ({
      ...prev,
      backlogs: [...prev.backlogs, { subject: "", semester: "" }]
    }));
  };

  const updateBacklog = (index: number, field: 'subject' | 'semester', value: string) => {
    const newBacklogs = [...formData.backlogs];
    newBacklogs[index][field] = value;
    handleInputChange('backlogs', newBacklogs);
  };

  const removeBacklog = (index: number) => {
    const newBacklogs = formData.backlogs.filter((_, i) => i !== index);
    handleInputChange('backlogs', newBacklogs);
  };

  const addAttendanceRecord = () => {
    setFormData(prev => ({
      ...prev,
      attendanceRecords: [...prev.attendanceRecords, { subject: "", classesAttended: "", totalClasses: "" }]
    }));
  };

  const updateAttendanceRecord = (index: number, field: 'subject' | 'classesAttended' | 'totalClasses', value: string) => {
    const newRecords = [...formData.attendanceRecords];
    newRecords[index][field] = value;
    handleInputChange('attendanceRecords', newRecords);
  };

  const removeAttendanceRecord = (index: number) => {
    const newRecords = formData.attendanceRecords.filter((_, i) => i !== index);
    handleInputChange('attendanceRecords', newRecords);
  };

  const addSemesterResult = () => {
    setFormData(prev => ({
      ...prev,
      currentSemesterResults: [...prev.currentSemesterResults, { subject: "", marks: "", grade: "" }]
    }));
  };

  const updateSemesterResult = (index: number, field: 'subject' | 'marks' | 'grade', value: string) => {
    const newResults = [...formData.currentSemesterResults];
    newResults[index][field] = value;
    handleInputChange('currentSemesterResults', newResults);
  };

  const removeSemesterResult = (index: number) => {
    const newResults = formData.currentSemesterResults.filter((_, i) => i !== index);
    handleInputChange('currentSemesterResults', newResults);
  };

  const handlePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("All password fields are required!");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    // Here you would typically make an API call to change the password
    console.log("Password change request:", {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });

    toast.success("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setShowPasswordSection(false);
  };

  const handleSave = () => {
    console.log("Student Profile Data:", formData);
    toast.success("Profile updated successfully!", {
      description: "Your changes have been saved.",
    });
  };

  const handleReset = () => {
    toast.info("Form reset", {
      description: "All fields have been cleared.",
    });
  };

  // Animated Avatar Component
  function AnimatedAvatar({ size = 120 }: { size?: number }) {
    const radius = size / 2;
    const stroke = Math.max(4, size * 0.06);
    return (
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded-full shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Pulsing ring */}
        <motion.circle
          cx={radius}
          cy={radius}
          r={radius - stroke / 2}
          fill="#E5E7EB"
          stroke="#3B82F6"
          strokeWidth={stroke}
          initial={{ strokeOpacity: 0.35 }}
          animate={{ strokeOpacity: [0.35, 0.15, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        {/* Head */}
        <circle cx={radius} cy={radius * 0.55} r={size * 0.18} fill="#9CA3AF" />
        {/* Shoulders */}
        <path
          d={`M ${radius - size * 0.3} ${radius + size * 0.2}
              C ${radius - size * 0.15} ${radius}, ${radius + size * 0.15} ${radius}, ${radius + size * 0.3} ${radius + size * 0.2}
              L ${radius + size * 0.3} ${size}
              L ${radius - size * 0.3} ${size} Z`}
          fill="#A3A3A3"
        />
      </motion.svg>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-black">
            My Profile
          </h1>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT PANEL - 1/3 width */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            
            {/* Student Photo */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Student Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex justify-center">
                <div className="p-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                  <div className="rounded-full bg-white p-2">
                    <AnimatedAvatar size={140} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="semester" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                    Current Semester
                  </Label>
                  <Select
                    value={formData.semester}
                    onValueChange={(value: string) => handleInputChange("semester", value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Semester 1</SelectItem>
                      <SelectItem value="2">Semester 2</SelectItem>
                      <SelectItem value="3">Semester 3</SelectItem>
                      <SelectItem value="4">Semester 4</SelectItem>
                      <SelectItem value="5">Semester 5</SelectItem>
                      <SelectItem value="6">Semester 6</SelectItem>
                      <SelectItem value="7">Semester 7</SelectItem>
                      <SelectItem value="8">Semester 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="section" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-purple-600" />
                    Section
                  </Label>
                  <Select
                    value={formData.section}
                    onValueChange={(value: string) => handleInputChange("section", value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                      <SelectItem value="D">Section D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mentorName" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    Mentor Name
                  </Label>
                  <Input
                    id="mentorName"
                    value={formData.mentorName}
                    onChange={(e) => handleInputChange("mentorName", e.target.value)}
                    placeholder="e.g., Dr. Rajesh Kumar"
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Backlogs */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Backlogs Tracking
                  </CardTitle>
                  <div className="bg-white text-orange-700 px-3 py-1 rounded-full font-bold text-lg">
                    {formData.backlogs.length}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {formData.backlogs.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-green-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">No backlogs! Great job! 🎉</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-bold text-orange-700">Total Backlogs: {formData.backlogs.length}</span>
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Track and manage your pending subjects</p>
                    </div>
                    {formData.backlogs.map((backlog, index) => (
                      <div key={index} className="space-y-3 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200 hover:border-orange-400 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">Backlog #{index + 1}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm text-gray-700 font-medium">Subject Name</Label>
                            <Input
                              value={backlog.subject}
                              onChange={(e) => updateBacklog(index, 'subject', e.target.value)}
                              placeholder="e.g., Data Structures, Web Development"
                              className="mt-1 border-orange-200 focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-700 font-medium">Semester</Label>
                            <Input
                              value={backlog.semester}
                              onChange={(e) => updateBacklog(index, 'semester', e.target.value)}
                              placeholder="e.g., 3, 4, 5"
                              className="mt-1 border-orange-200 focus:border-orange-500"
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeBacklog(index)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          Remove Backlog
                        </Button>
                      </div>
                    ))}
                  </>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addBacklog}
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 font-medium"
                >
                  + Add New Backlog
                </Button>
              </CardContent>
            </Card>

            {/* Attendance Tracking */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Attendance Tracking
                  </CardTitle>
                  <div className="bg-white text-blue-700 px-3 py-1 rounded-full font-bold text-lg">
                    {formData.attendanceRecords.length}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {formData.attendanceRecords.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">No attendance records yet. Add one to get started! 📊</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-bold text-blue-700">Total Subjects Tracked: {formData.attendanceRecords.length}</span>
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Monitor and track your subject-wise attendance</p>
                    </div>
                    {formData.attendanceRecords.map((record, index) => {
                      const percentage = record.totalClasses && record.classesAttended 
                        ? Math.round((parseInt(record.classesAttended) / parseInt(record.totalClasses)) * 100)
                        : 0;
                      return (
                        <div key={index} className="space-y-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 hover:border-blue-400 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <span className="text-sm font-semibold text-gray-700">Subject #{index + 1}</span>
                            </div>
                            <div className={`text-lg font-bold ${percentage >= 75 ? 'text-green-600' : percentage >= 65 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {percentage}%
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <Label className="text-sm text-gray-700 font-medium">Subject Name</Label>
                              <Input
                                value={record.subject}
                                onChange={(e) => updateAttendanceRecord(index, 'subject', e.target.value)}
                                placeholder="e.g., Machine Learning"
                                className="mt-1 border-blue-200 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-700 font-medium">Classes Attended</Label>
                              <Input
                                type="number"
                                value={record.classesAttended}
                                onChange={(e) => updateAttendanceRecord(index, 'classesAttended', e.target.value)}
                                placeholder="e.g., 42"
                                className="mt-1 border-blue-200 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-700 font-medium">Total Classes</Label>
                              <Input
                                type="number"
                                value={record.totalClasses}
                                onChange={(e) => updateAttendanceRecord(index, 'totalClasses', e.target.value)}
                                placeholder="e.g., 45"
                                className="mt-1 border-blue-200 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full transition-all ${percentage >= 75 ? 'bg-green-500' : percentage >= 65 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeAttendanceRecord(index)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                          >
                            Remove Record
                          </Button>
                        </div>
                      );
                    })}
                  </>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAttendanceRecord}
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 font-medium"
                >
                  + Add New Attendance Record
                </Button>
              </CardContent>
            </Card>

          </motion.div>

          {/* RIGHT PANEL - 2/3 width */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >

            {/* Personal Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Profile Picture Upload - First Field */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="p-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                      <div className="rounded-full bg-white p-2">
                        <AnimatedAvatar size={120} />
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <Label htmlFor="profilePicture" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-blue-600" />
                        Profile Picture
                      </Label>
                      <Input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              handleInputChange("profilePicture", reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">Upload a professional photo (JPG, PNG)</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-blue-600" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rollNumber" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Hash className="h-4 w-4 text-blue-600" />
                      Roll Number
                    </Label>
                    <Input
                      id="rollNumber"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="enrollmentNumber" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Hash className="h-4 w-4 text-blue-600" />
                      Enrollment Number
                    </Label>
                    <Input
                      id="enrollmentNumber"
                      value={formData.enrollmentNumber}
                      onChange={(e) => handleInputChange("enrollmentNumber", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedIn" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      LinkedIn URL
                    </Label>
                    <Input
                      id="linkedIn"
                      value={formData.linkedIn}
                      onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="github" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Github className="h-4 w-4 text-blue-600" />
                      GitHub URL
                    </Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => handleInputChange("github", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-blue-600" />
                      Gender
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value: string) => handleInputChange("gender", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="attendance" className="text-gray-700 font-medium flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        Attendance Percentage
                      </div>
                      <span className={`text-xl font-bold ${
                        parseInt(formData.attendance) >= 75 
                          ? 'text-emerald-600'
                          : parseInt(formData.attendance) >= 65
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {formData.attendance}%
                      </span>
                    </Label>
                    {/* Progress Bar */}
                    <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden mb-2">
                      <div 
                        className={`h-full transition-all duration-500 ease-out ${
                          parseInt(formData.attendance) >= 75 
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                            : parseInt(formData.attendance) >= 65
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                            : 'bg-gradient-to-r from-red-500 to-red-600'
                        }`}
                        style={{ width: `${formData.attendance}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span className={parseInt(formData.attendance) >= 75 ? 'font-semibold text-emerald-600' : 'font-semibold text-red-600'}>
                        Required: 75%
                      </span>
                      <span>100%</span>
                    </div>
                    <p className="text-xs mt-2 text-gray-600 italic">
                      * Attendance is calculated automatically based on your class records
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="designation" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-blue-600" />
                      Designation
                    </Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange("designation", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact/Account Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact & Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalEmail" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      Additional Email
                    </Label>
                    <Input
                      id="additionalEmail"
                      type="email"
                      value={formData.additionalEmail}
                      onChange={(e) => handleInputChange("additionalEmail", e.target.value)}
                      placeholder="Optional additional email"
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      Complete Address
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Password Change Section */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {!showPasswordSection ? (
                  <Button
                    onClick={() => setShowPasswordSection(true)}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Change Password
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                        <Lock className="h-4 w-4 text-red-600" />
                        Current Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          placeholder="Enter current password"
                          className="border-gray-300 focus:border-red-500 focus:ring-red-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                        <Lock className="h-4 w-4 text-red-600" />
                        New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          placeholder="Enter new password"
                          className="border-gray-300 focus:border-red-500 focus:ring-red-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                        <Lock className="h-4 w-4 text-red-600" />
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          placeholder="Confirm new password"
                          className="border-gray-300 focus:border-red-500 focus:ring-red-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handlePasswordChange}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        Update Password
                      </Button>
                      <Button
                        onClick={() => {
                          setShowPasswordSection(false);
                          setPasswordData({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: ""
                          });
                        }}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Parent Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Parent Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-gray-700 mb-4 border-b pb-2">Father's Details</h4>
                  </div>
                  
                  <div>
                    <Label htmlFor="fatherName" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-indigo-600" />
                      Father's Name
                    </Label>
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fatherPhone" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-indigo-600" />
                      Father's Contact Number
                    </Label>
                    <Input
                      id="fatherPhone"
                      type="tel"
                      value={formData.fatherPhone}
                      onChange={(e) => handleInputChange("fatherPhone", e.target.value)}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="fatherOccupation" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-indigo-600" />
                      Father's Occupation
                    </Label>
                    <Input
                      id="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={(e) => handleInputChange("fatherOccupation", e.target.value)}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-gray-700 mb-4 border-b pb-2 mt-4">Mother's Details</h4>
                  </div>

                  <div>
                    <Label htmlFor="motherName" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-indigo-600" />
                      Mother's Name
                    </Label>
                    <Input
                      id="motherName"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange("motherName", e.target.value)}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="motherPhone" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-indigo-600" />
                      Mother's Contact Number
                    </Label>
                    <Input
                      id="motherPhone"
                      type="tel"
                      value={formData.motherPhone}
                      onChange={(e) => handleInputChange("motherPhone", e.target.value)}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="motherOccupation" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-indigo-600" />
                      Mother's Occupation
                    </Label>
                    <Input
                      id="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={(e) => handleInputChange("motherOccupation", e.target.value)}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Details */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* Current Semester Results */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    Current Semester Results
                  </h4>
                  <div className="space-y-4">
                    {formData.currentSemesterResults.map((result, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div>
                          <Label className="text-sm text-gray-700">Subject</Label>
                          <Input
                            value={result.subject}
                            onChange={(e) => updateSemesterResult(index, 'subject', e.target.value)}
                            placeholder="Subject"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-700">Marks</Label>
                          <Input
                            value={result.marks}
                            onChange={(e) => updateSemesterResult(index, 'marks', e.target.value)}
                            placeholder="Marks"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-700">Grade</Label>
                          <Input
                            value={result.grade}
                            onChange={(e) => updateSemesterResult(index, 'grade', e.target.value)}
                            placeholder="Grade"
                            className="mt-1"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeSemesterResult(index)}
                            className="w-full"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addSemesterResult}
                      className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      + Add Subject Result
                    </Button>
                  </div>
                </div>

                {/* Academic Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="averageCGPA" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      Average CGPA
                    </Label>
                    <Input
                      id="averageCGPA"
                      value={formData.averageCGPA}
                      onChange={(e) => handleInputChange("averageCGPA", e.target.value)}
                      placeholder="e.g., 8.5"
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="researchPapersCount" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-purple-600" />
                      Research Papers Count
                    </Label>
                    <Input
                      id="researchPapersCount"
                      value={formData.researchPapersCount}
                      onChange={(e) => handleInputChange("researchPapersCount", e.target.value)}
                      placeholder="e.g., 2"
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectsCount" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-purple-600" />
                      Projects Made Count
                    </Label>
                    <Input
                      id="projectsCount"
                      value={formData.projectsCount}
                      onChange={(e) => handleInputChange("projectsCount", e.target.value)}
                      placeholder="e.g., 5"
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active in (Clubs) */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active in (Clubs)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Label htmlFor="activeInClubs" className="text-gray-700 font-medium mb-2 block">
                  List of Clubs You're Active In
                </Label>
                <Textarea
                  id="activeInClubs"
                  value={formData.activeInClubs}
                  onChange={(e) => handleInputChange("activeInClubs", e.target.value)}
                  placeholder="Enter clubs (one per line)"
                  className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 min-h-[120px]"
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Label htmlFor="achievements" className="text-gray-700 font-medium mb-2 block">
                  List of Achievements / Awards / Publications
                </Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements}
                  onChange={(e) => handleInputChange("achievements", e.target.value)}
                  placeholder="Enter your achievements (one per line)"
                  className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 min-h-[150px]"
                  rows={6}
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                onClick={handleSave}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-600 font-semibold py-6 text-lg transition-all"
              >
                Save Profile
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex-1 border-2 border-gray-300 hover:bg-gray-100 text-gray-600 font-semibold py-6 text-lg transition-all"
              >
                Reset Form
              </Button>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
