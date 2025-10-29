import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { User, Calendar, Hash, Mail, Phone, Briefcase, Building, GraduationCap, ArrowLeft, Eye, EyeOff, Camera } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

export interface FacultyRegistrationData {
  // Personal Information
  fullName: string;
  facultyId: string;
  dateOfBirth: string;
  gender: string;
  profilePicture: string;

  // Academic Position
  department: string;
  designation: string;
  qualification: string;
  specialization: string;
  joinDate: string;
  phdStatus: string;

  // Contact Information
  email: string;
  additionalEmail: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;

  // Experience & Research
  yearsOfExperience: string;
  researchInterest: string;

  // Mentoring Information
  mentorFor: string;
  totalMentees: string;
}

interface FacultyRegistrationProps {
  onBack: () => void;
  onRegister: (data: FacultyRegistrationData) => void;
}

export function FacultyRegistration({ onBack, onRegister }: FacultyRegistrationProps) {
  const [formData, setFormData] = useState<FacultyRegistrationData>({
    fullName: "",
    facultyId: "",
    dateOfBirth: "",
    gender: "",
    profilePicture: "",
    department: "",
    designation: "",
    qualification: "",
    specialization: "",
    joinDate: "",
    phdStatus: "",
    email: "",
    additionalEmail: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    yearsOfExperience: "",
    researchInterest: "",
    mentorFor: "",
    totalMentees: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const departments = [
    "Computer Science Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering"
  ];

  const designations = [
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
    "Lab Assistant",
    "Head of Department"
  ];

  const phdStatuses = [
    "Completed",
    "Pursuing",
    "Not Applicable"
  ];

  const handleInputChange = (field: keyof FacultyRegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload JPG, PNG, or PDF only.");
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("File size exceeds 5MB. Please upload a smaller file.");
      return;
    }

    // Convert to base64 and set preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData(prev => ({ ...prev, profilePicture: base64String }));
      setProfilePreview(base64String);
      toast.success("Profile picture uploaded successfully!");
    };
    reader.onerror = () => {
      toast.error("Failed to read file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const removeProfilePicture = () => {
    setFormData(prev => ({ ...prev, profilePicture: "" }));
    setProfilePreview(null);
    toast.info("Profile picture removed");
  };

  const validateForm = (): boolean => {
    // Check required fields
    const requiredFields: (keyof FacultyRegistrationData)[] = [
      'fullName', 'facultyId', 'dateOfBirth', 'gender', 'department',
      'designation', 'qualification', 'specialization', 'joinDate', 'phdStatus',
      'email', 'password', 'confirmPassword', 'phoneNumber', 'yearsOfExperience',
      'researchInterest'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`);
        return false;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Validate additional email if provided
    if (formData.additionalEmail && !emailRegex.test(formData.additionalEmail)) {
      toast.error("Please enter a valid additional email address");
      return false;
    }

    // Validate password
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    // Validate phone number
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      toast.error("Phone number must be at least 10 digits");
      return false;
    }

    // Validate years of experience
    const experience = parseInt(formData.yearsOfExperience);
    if (isNaN(experience) || experience < 0) {
      toast.error("Please enter a valid number for years of experience");
      return false;
    }

    // Validate total mentees if provided
    if (formData.totalMentees) {
      const mentees = parseInt(formData.totalMentees);
      if (isNaN(mentees) || mentees < 0) {
        toast.error("Please enter a valid number for total mentees");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    toast.success("Registration successful! Redirecting to dashboard...");
    onRegister(formData);
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      facultyId: "",
      dateOfBirth: "",
      gender: "",
      profilePicture: "",
      department: "",
      designation: "",
      qualification: "",
      specialization: "",
      joinDate: "",
      phdStatus: "",
      email: "",
      additionalEmail: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      yearsOfExperience: "",
      researchInterest: "",
      mentorFor: "",
      totalMentees: "",
    });
    setProfilePreview(null);
    toast.info("Form cleared");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-orange-600 hover:text-orange-800 hover:bg-orange-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Faculty Registration</h1>
          <p className="text-gray-600">Create your faculty account to access the portal</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Personal Information Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-white text-black border-b border-gray-200 rounded-t-xl">
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {/* Profile Picture Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="profilePicture" className="text-sm font-medium">
                      Profile Picture
                    </Label>
                    <div className="flex flex-col items-center space-y-4">
                      {profilePreview ? (
                        <div className="relative">
                          <img
                            src={profilePreview}
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-orange-200"
                          />
                          <button
                            type="button"
                            onClick={removeProfilePicture}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="profilePicture"
                          className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition"
                        >
                          <Camera className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-xs text-gray-500 text-center">Click to upload</span>
                        </label>
                      )}
                      <input
                        id="profilePicture"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,application/pdf"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500 text-center">
                        JPG, PNG, or PDF (max 5MB)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facultyId">Faculty ID <span className="text-red-500">*</span></Label>
                    <Input
                      id="facultyId"
                      placeholder="e.g., FAC001"
                      value={formData.facultyId}
                      onChange={(e) => handleInputChange('facultyId', e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        required
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                      <Select value={formData.gender} onValueChange={(value: string) => handleInputChange('gender', value)}>
                        <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
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

              {/* Academic Position Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-white text-black border-b border-gray-200 rounded-t-xl">
                  <CardTitle className="flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    Academic Position
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
                    <Select value={formData.department} onValueChange={(value: string) => handleInputChange('department', value)}>
                      <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation <span className="text-red-500">*</span></Label>
                    <Select value={formData.designation} onValueChange={(value: string) => handleInputChange('designation', value)}>
                      <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        {designations.map(des => (
                          <SelectItem key={des} value={des}>{des}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification <span className="text-red-500">*</span></Label>
                    <Input
                      id="qualification"
                      placeholder="e.g., M.Tech, PhD"
                      value={formData.qualification}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization <span className="text-red-500">*</span></Label>
                    <Input
                      id="specialization"
                      placeholder="e.g., Machine Learning, Data Science"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="joinDate">Join Date <span className="text-red-500">*</span></Label>
                      <Input
                        id="joinDate"
                        type="date"
                        value={formData.joinDate}
                        onChange={(e) => handleInputChange('joinDate', e.target.value)}
                        required
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phdStatus">PhD Status <span className="text-red-500">*</span></Label>
                      <Select value={formData.phdStatus} onValueChange={(value: string) => handleInputChange('phdStatus', value)}>
                        <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {phdStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mentoring Information Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-white text-black border-b border-gray-200 rounded-t-xl">
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Mentoring Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mentorFor">Mentor For</Label>
                    <Input
                      id="mentorFor"
                      placeholder="e.g., B.Tech CSE 3rd Year, Section A"
                      value={formData.mentorFor}
                      onChange={(e) => handleInputChange('mentorFor', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalMentees">Total Mentees</Label>
                    <Input
                      id="totalMentees"
                      type="number"
                      min="0"
                      placeholder="Number of students"
                      value={formData.totalMentees}
                      onChange={(e) => handleInputChange('totalMentees', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact Information Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-white text-black border-b border-gray-200 rounded-t-xl">
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@ssipmt.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalEmail">Additional Email</Label>
                    <Input
                      id="additionalEmail"
                      type="email"
                      placeholder="alternate.email@example.com"
                      value={formData.additionalEmail}
                      onChange={(e) => handleInputChange('additionalEmail', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        required
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10"
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

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="10-digit phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Experience & Research Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-white text-black border-b border-gray-200 rounded-t-xl">
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Experience & Research
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Experience <span className="text-red-500">*</span></Label>
                    <Input
                      id="yearsOfExperience"
                      type="number"
                      min="0"
                      placeholder="Enter years of experience"
                      value={formData.yearsOfExperience}
                      onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="researchInterest">Research Interest <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="researchInterest"
                      placeholder="Describe your research interests and areas of expertise..."
                      value={formData.researchInterest}
                      onChange={(e) => handleInputChange('researchInterest', e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 min-h-[150px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-gray-300 py-6 text-lg font-semibold rounded-xl shadow-lg"
            >
              Register
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClearForm}
              className="flex-1 sm:flex-none sm:w-40 border-2 border-gray-400 text-gray-600 hover:border-gray-500 hover:bg-gray-100 py-6 text-lg rounded-xl"
            >
              Clear Form
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
