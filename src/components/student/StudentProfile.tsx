import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { User, Calendar, Hash, Award, Mail, Phone, Users, Linkedin, Github, BookOpen, GraduationCap, Moon, Sun, HelpCircle, Sparkles, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface StudentProfileData {
  fullName: string;
  dateOfBirth: string;
  rollNumber: string;
  enrollmentNumber: string;
  attendance: string;
  designation: string;
  linkedIn: string;
  github: string;
  fatherName: string;
  motherName: string;
  email: string;
  phone: string;
  achievements: string;
}

export function StudentProfile() {
  const [formData, setFormData] = useState<StudentProfileData>({
    fullName: "Priya Sharma",
    dateOfBirth: "2003-05-15",
    rollNumber: "21CS002",
    enrollmentNumber: "0827CS211002",
    attendance: "92",
    designation: "Student Representative",
    linkedIn: "linkedin.com/in/priyasharma",
    github: "github.com/priyasharma",
    fatherName: "Rajesh Sharma",
    motherName: "Sunita Sharma",
    email: "priya.sharma@student.edu",
    phone: "+91 98765 43210",
    achievements: "First Prize in Hackathon 2024\nBest Project Award - Web Development\nActive Member - Coding Club",
  });

  const handleInputChange = (field: keyof StudentProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Student Profile Data:", formData);
    toast.success("Profile updated successfully!", {
      description: "Your changes have been saved.",
    });
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      dateOfBirth: "",
      rollNumber: "",
      enrollmentNumber: "",
      attendance: "",
      designation: "",
      linkedIn: "",
      github: "",
      fatherName: "",
      motherName: "",
      email: "",
      phone: "",
      achievements: "",
    });
    toast.info("Form reset", {
      description: "All fields have been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your academic and personal information
          </p>
        </div>

        {/* Profile Form Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <User className="h-6 w-6" />
              Student Profile Information
            </CardTitle>
            <CardDescription className="text-blue-100">
              Update your profile details and academic information
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-700" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700 font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@student.edu"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-700" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber" className="text-gray-700 font-medium flex items-center gap-2">
                      <Hash className="h-4 w-4 text-blue-600" />
                      Roll Number *
                    </Label>
                    <Input
                      id="rollNumber"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                      placeholder="e.g., 21CS002"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="enrollmentNumber" className="text-gray-700 font-medium flex items-center gap-2">
                      <Hash className="h-4 w-4 text-blue-600" />
                      Enrollment Number *
                    </Label>
                    <Input
                      id="enrollmentNumber"
                      value={formData.enrollmentNumber}
                      onChange={(e) => handleInputChange("enrollmentNumber", e.target.value)}
                      placeholder="e.g., 0827CS211002"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attendance" className="text-gray-700 font-medium flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      Attendance (%) *
                    </Label>
                    <Input
                      id="attendance"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.attendance}
                      onChange={(e) => handleInputChange("attendance", e.target.value)}
                      placeholder="e.g., 92"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation" className="text-gray-700 font-medium flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-600" />
                      Designation / Role
                    </Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange("designation", e.target.value)}
                      placeholder="e.g., Student Representative"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200 flex items-center gap-2">
                  <Linkedin className="h-5 w-5 text-blue-700" />
                  Social & Professional Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="linkedIn" className="text-gray-700 font-medium flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedIn"
                      value={formData.linkedIn}
                      onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                      placeholder="linkedin.com/in/yourprofile"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-gray-700 font-medium flex items-center gap-2">
                      <Github className="h-4 w-4 text-blue-600" />
                      GitHub Profile
                    </Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => handleInputChange("github", e.target.value)}
                      placeholder="github.com/yourusername"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Parent Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-700" />
                  Parent / Guardian Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fatherName" className="text-gray-700 font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Father's Name *
                    </Label>
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      placeholder="Enter father's full name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motherName" className="text-gray-700 font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Mother's Name *
                    </Label>
                    <Input
                      id="motherName"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange("motherName", e.target.value)}
                      placeholder="Enter mother's full name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Achievements Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-700" />
                  Achievements & Honors
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="achievements" className="text-gray-700 font-medium">
                    List your achievements (one per line)
                  </Label>
                  <Textarea
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => handleInputChange("achievements", e.target.value)}
                    placeholder="Enter your achievements, awards, certifications, etc."
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                    rows={6}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
                <Button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Save Changes
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
