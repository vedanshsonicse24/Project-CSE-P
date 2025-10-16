import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { User, Calendar, Hash, Award, Mail, Phone, Users, Linkedin, Github, BookOpen, GraduationCap, MapPin, Briefcase, TrendingUp, FileText } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

interface Backlog {
  subject: string;
  semester: string;
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
  attendance: string;
  designation: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: string;
  
  // Academic Info (Left Panel)
  semester: string;
  section: string;
  mentorName: string;
  mentorDesignation: string;
  backlogs: Backlog[];
  
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
    attendance: "92",
    designation: "Student Representative",
    
    // Contact Information
    email: "priya.sharma@student.edu",
    phone: "+91 98765 43210",
    address: "123, Model Town, Raipur, Chhattisgarh - 492001",
    
    // Academic Info
    semester: "5",
    section: "A",
    mentorName: "Dr. Rajesh Kumar",
    mentorDesignation: "Associate Professor",
    backlogs: [
      { subject: "Data Structures", semester: "3" }
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
  });

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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-2">
            Student Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Complete your academic and personal information
          </p>
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

            {/* Academic Info */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Academic Info
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="semester" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-purple-600" />
                    Semester
                  </Label>
                  <Input
                    id="semester"
                    value={formData.semester}
                    onChange={(e) => handleInputChange("semester", e.target.value)}
                    placeholder="e.g., 5"
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <Label htmlFor="section" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-purple-600" />
                    Section
                  </Label>
                  <Input
                    id="section"
                    value={formData.section}
                    onChange={(e) => handleInputChange("section", e.target.value)}
                    placeholder="e.g., A"
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
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

                <div>
                  <Label htmlFor="mentorDesignation" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-purple-600" />
                    Mentor Designation
                  </Label>
                  <Input
                    id="mentorDesignation"
                    value={formData.mentorDesignation}
                    onChange={(e) => handleInputChange("mentorDesignation", e.target.value)}
                    placeholder="e.g., Associate Professor"
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Backlogs */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Backlogs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {formData.backlogs.map((backlog, index) => (
                  <div key={index} className="space-y-2 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <Label className="text-sm text-gray-700">Subject</Label>
                      <Input
                        value={backlog.subject}
                        onChange={(e) => updateBacklog(index, 'subject', e.target.value)}
                        placeholder="Subject name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Semester</Label>
                      <Input
                        value={backlog.semester}
                        onChange={(e) => updateBacklog(index, 'semester', e.target.value)}
                        placeholder="Semester"
                        className="mt-1"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeBacklog(index)}
                      className="w-full"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addBacklog}
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  + Add Backlog
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
                    <Label htmlFor="attendance" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      Attendance Percentage
                    </Label>
                    <Input
                      id="attendance"
                      value={formData.attendance}
                      onChange={(e) => handleInputChange("attendance", e.target.value)}
                      placeholder="e.g., 92%"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
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

            {/* Contact Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
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
                className="flex-1 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Save Profile
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex-1 border-2 border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-6 text-lg transition-all"
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
