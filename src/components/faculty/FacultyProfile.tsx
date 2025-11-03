import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { User, Calendar, Hash, Award, Mail, Phone, Users, BookOpen, GraduationCap, MapPin, Clock, Briefcase, Building, FileText } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

interface FacultyProfileData {
  // Academic Position (Left Panel)
  department: string;
  designation: string;
  
  // Mentoring Details (Left Panel)
  mentorFor: string;
  totalMentees: string;
  
  // Additional Information (Left Panel)
  yearsOfExperience: string;
  researchInterest: string;
  
  // Personal Information (Right Panel)
  fullName: string;
  facultyID: string;
  dateOfBirth: string;
  gender: string;
  
  // Academic Details (Right Panel)
  qualification: string;
  specialization: string;
  joinDate: string;
  phdStatus: string;
  
  // Contact Information (Right Panel)
  emailID: string;
  phoneNumber: string;
  officeLocation: string;
  officeHours: string;
}

export function FacultyProfile() {
  const [formData, setFormData] = useState<FacultyProfileData>({
    // Academic Position
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    
    // Mentoring Details
    mentorFor: "Final Year Students - Section A",
    totalMentees: "25",
    
    // Additional Information
    yearsOfExperience: "12",
    researchInterest: "Machine Learning, Artificial Intelligence, Data Mining",
    
    // Personal Information
    fullName: "Dr. Rajesh Kumar",
    facultyID: "CSE001",
    dateOfBirth: "1980-03-15",
    gender: "Male",
    
    // Academic Details
    qualification: "Ph.D, M.Tech, B.Tech",
    specialization: "Computer Science & Engineering",
    joinDate: "2015-07-01",
    phdStatus: "Completed",
    
    // Contact Information
    emailID: "rajesh.kumar@sspmt.ac.in",
    phoneNumber: "+91 98765 43210",
    officeLocation: "Room 305, CSE Block",
    officeHours: "Monday-Friday: 10:00 AM - 4:00 PM",
  });

  const handleInputChange = (field: keyof FacultyProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Faculty Profile Data:", formData);
    toast.success("Profile updated successfully!", {
      description: "Your faculty information has been saved.",
    });
  };

  const handleReset = () => {
    toast.info("Form reset", {
      description: "All fields have been cleared.",
    });
  };

  // Animated Avatar Component (same as student profile)
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
            Faculty Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your academic and professional information
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
            
            {/* Faculty Photo */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700">
                <CardTitle className="text-xl flex items-center gap-2 text-black font-bold">
                  <User className="h-5 w-5" />
                  Faculty Photo
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

            {/* Academic Position */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700">
                <CardTitle className="text-xl flex items-center gap-2 text-black font-bold">
                  <GraduationCap className="h-5 w-5" />
                  Academic Position
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="department" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-purple-600" />
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <Label htmlFor="designation" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-purple-600" />
                    Designation
                  </Label>
                  <Select value={formData.designation} onValueChange={(value: string) => handleInputChange("designation", value)}>
                    <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professor">Professor</SelectItem>
                      <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                      <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                      <SelectItem value="Lecturer">Lecturer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Mentoring Details */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700">
                <CardTitle className="text-xl flex items-center gap-2 text-black font-bold">
                  <Users className="h-5 w-5" />
                  Mentoring Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="mentorFor" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-green-600" />
                    Mentor For
                  </Label>
                  <Input
                    id="mentorFor"
                    value={formData.mentorFor}
                    onChange={(e) => handleInputChange("mentorFor", e.target.value)}
                    placeholder="e.g., Final Year Students - Section A"
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <Label htmlFor="totalMentees" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-green-600" />
                    Total Mentees
                  </Label>
                  <Input
                    id="totalMentees"
                    value={formData.totalMentees}
                    onChange={(e) => handleInputChange("totalMentees", e.target.value)}
                    placeholder="e.g., 25"
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700">
                <CardTitle className="text-xl flex items-center gap-2 text-black font-bold">
                  <BookOpen className="h-5 w-5" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="yearsOfExperience" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-orange-600" />
                    Years of Experience
                  </Label>
                  <Input
                    id="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
                    placeholder="e.g., 12"
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <Label htmlFor="researchInterest" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-orange-600" />
                    Research Interest
                  </Label>
                  <Textarea
                    id="researchInterest"
                    value={formData.researchInterest}
                    onChange={(e) => handleInputChange("researchInterest", e.target.value)}
                    placeholder="e.g., Machine Learning, AI, Data Mining"
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    rows={4}
                  />
                </div>
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
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700">
                <CardTitle className="text-xl flex items-center gap-2 text-black font-bold">
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
                    <Label htmlFor="facultyID" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Hash className="h-4 w-4 text-blue-600" />
                      Faculty ID
                    </Label>
                    <Input
                      id="facultyID"
                      value={formData.facultyID}
                      onChange={(e) => handleInputChange("facultyID", e.target.value)}
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
                    <Select value={formData.gender} onValueChange={(value: string) => handleInputChange("gender", value)}>
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
                </div>
              </CardContent>
            </Card>

            {/* Academic Details */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700">
                <CardTitle className="text-xl flex items-center gap-2 text-black font-bold">
                  <GraduationCap className="h-5 w-5" />
                  Academic Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="qualification" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-purple-600" />
                      Qualification
                    </Label>
                    <Input
                      id="qualification"
                      value={formData.qualification}
                      onChange={(e) => handleInputChange("qualification", e.target.value)}
                      placeholder="e.g., Ph.D, M.Tech, B.Tech"
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialization" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                      Specialization
                    </Label>
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange("specialization", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="joinDate" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      Join Date
                    </Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={formData.joinDate}
                      onChange={(e) => handleInputChange("joinDate", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phdStatus" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <GraduationCap className="h-4 w-4 text-purple-600" />
                      PhD Status
                    </Label>
                    <Select value={formData.phdStatus} onValueChange={(value: string) => handleInputChange("phdStatus", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select PhD status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Pursuing">Pursuing</SelectItem>
                        <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
          {/* Upload CV Section */}
          <div className="md:col-span-2 mb-6">
            <Label htmlFor="cvUpload" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-purple-600" />
              Upload CV
            </Label>
            <Input
              id="cvUpload"
              type="file"
              accept=".pdf,.doc,.docx"
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
          </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700">
                <CardTitle className="text-xl flex items-center gap-2 text-black font-bold">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="emailID" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-indigo-600" />
                      Email ID
                    </Label>
                    <Input
                      id="emailID"
                      type="email"
                      value={formData.emailID}
                      onChange={(e) => handleInputChange("emailID", e.target.value)}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-indigo-600" />
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="officeLocation" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-indigo-600" />
                      Office Location
                    </Label>
                    <Input
                      id="officeLocation"
                      value={formData.officeLocation}
                      onChange={(e) => handleInputChange("officeLocation", e.target.value)}
                      placeholder="e.g., Room 305, CSE Block"
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="officeHours" className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      Office Hours
                    </Label>
                    <Input
                      id="officeHours"
                      value={formData.officeHours}
                      onChange={(e) => handleInputChange("officeHours", e.target.value)}
                      placeholder="e.g., Monday-Friday: 10:00 AM - 4:00 PM"
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                onClick={handleSave}
                className="flex-1 bg-gray-400 text-gray-700 font-semibold py-6 text-lg shadow-none cursor-pointer"
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