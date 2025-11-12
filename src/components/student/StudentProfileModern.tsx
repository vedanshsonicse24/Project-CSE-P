import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { 
  User, Calendar, Hash, Award, Mail, Phone, Users, 
  Linkedin, Github, BookOpen, GraduationCap, Moon, Sun, 
  HelpCircle, Sparkles, Check, AlertCircle, Rocket, Pencil, Loader2
} from "lucide-react";
import { toast } from "sonner";
import { API_ENDPOINTS } from "../../server";

interface StudentProfileData {
  fullName: string;
  dateOfBirth: string;
  rollNumber: string;
  enrollmentNumber: string;
  semester: string;
  section: string;
  attendance: number;
  designation: string;
  linkedIn: string;
  github: string;
  fatherName: string;
  fatherPhone: string;
  motherName: string;
  motherPhone: string;
  email: string;
  phone: string;
  achievements: string;
  numberOfBacklogs: string;
  backlogSubject: string;
  activeInClubs: string;
}

interface FieldValidation {
  [key: string]: boolean;
}

export function StudentProfileModern() {
  const [darkMode, setDarkMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [validatedFields, setValidatedFields] = useState<FieldValidation>({});
  const [shakingFields, setShakingFields] = useState<FieldValidation>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<StudentProfileData>({
    fullName: "",
    dateOfBirth: "",
    rollNumber: "",
    enrollmentNumber: "",
    semester: "",
    section: "",
    attendance: 0,
    designation: "",
    linkedIn: "",
    github: "",
    fatherName: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
    email: "",
    phone: "",
    achievements: "",
    numberOfBacklogs: "",
    backlogSubject: "",
    activeInClubs: "",
  });

  // Fetch profile data on mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setIsLoading(true);
    
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
      
      // Fetch profile data with student_id
      const response = await fetch(`${API_ENDPOINTS.student.profileModern}?student_id=${studentId}`, {
        headers: {
          'Authorization': `Bearer ${studentId}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      
      if (result.status === "success" && result.data) {
        const data = result.data;
        setFormData({
          fullName: data.fullName || "",
          dateOfBirth: data.dateOfBirth || "",
          rollNumber: data.rollNumber || "",
          enrollmentNumber: data.enrollmentNumber || "",
          semester: data.semester || "",
          section: data.section || "",
          attendance: data.attendance || 0,
          designation: data.designation || "",
          linkedIn: data.linkedIn || "",
          github: data.github || "",
          fatherName: data.fatherName || "",
          fatherPhone: data.fatherPhone || "",
          motherName: data.motherName || "",
          motherPhone: data.motherPhone || "",
          email: data.email || "",
          phone: data.phone || "",
          achievements: data.achievements || "",
          numberOfBacklogs: data.numberOfBacklogs || "",
          backlogSubject: data.backlogSubject || "",
          activeInClubs: data.activeInClubs || "",
        });
        toast.success("Profile loaded successfully");
      } else {
        throw new Error(result.message || "Failed to fetch profile");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load profile";
      toast.error(errorMessage);
      console.error("Profile fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate form completion progress
  useEffect(() => {
    // Exclude attendance, numberOfBacklogs, backlogSubject, and activeInClubs from progress calculation
    const fieldsToCount = Object.keys(formData).filter(key => 
      key !== 'attendance' && 
      key !== 'numberOfBacklogs' && 
      key !== 'backlogSubject' && 
      key !== 'activeInClubs'
    );
    const totalFields = fieldsToCount.length;
    const filledFields = fieldsToCount.filter(key => {
      const value = formData[key as keyof StudentProfileData];
      return value !== "" && value !== null && value !== undefined;
    }).length;
    setFormProgress(Math.round((filledFields / totalFields) * 100));
  }, [formData]);

  const handleInputChange = (field: keyof StudentProfileData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Validate field
    if (value !== "" && value !== 0) {
      setValidatedFields(prev => ({ ...prev, [field]: true }));
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateURL = (url: string) => {
    return url === "" || url.includes(".");
  };

  const triggerConfetti = () => {
    // Simple confetti effect without canvas-confetti library
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Create confetti particles
      const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = randomInRange(0, 100) + '%';
        particle.style.top = '-10px';
        particle.style.zIndex = '9999';
        particle.style.pointerEvents = 'none';
        particle.style.borderRadius = '50%';
        document.body.appendChild(particle);

        const animation = particle.animate([
          { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
          { transform: `translateY(${window.innerHeight}px) rotate(${randomInRange(0, 360)}deg)`, opacity: 0 }
        ], {
          duration: randomInRange(2000, 4000),
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        animation.onfinish = () => {
          document.body.removeChild(particle);
        };
      }
    }, 250);
  };

  const handleSave = async () => {
    // Validate required fields
    const requiredFields: (keyof StudentProfileData)[] = [
      'fullName', 'dateOfBirth', 'rollNumber', 'enrollmentNumber', 
      'email', 'phone', 'fatherName', 'motherName'
    ];
    
    const emptyFields: FieldValidation = {};
    let hasErrors = false;

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field] === "") {
        emptyFields[field] = true;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setShakingFields(emptyFields);
      toast.error("Please fill in all required fields!", {
        description: "Required fields are marked with *",
        icon: <AlertCircle className="h-5 w-5" />,
      });
      
      setTimeout(() => setShakingFields({}), 600);
      return;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email address!");
      return;
    }

    setIsSaving(true);

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
      
      const response = await fetch(`${API_ENDPOINTS.student.profileModern}?student_id=${studentId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${studentId}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "success") {
        console.log("Student Profile Data:", formData);
        
        // Success feedback
        triggerConfetti();
        toast.success("Profile updated successfully! 🎉", {
          description: "Your information has been saved.",
          icon: <Sparkles className="h-5 w-5" />,
        });
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save profile";
      toast.error(errorMessage);
      console.error("Profile save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      dateOfBirth: "",
      rollNumber: "",
      enrollmentNumber: "",
      semester: "",
      section: "",
      attendance: 0,
      designation: "",
      linkedIn: "",
      github: "",
      fatherName: "",
      fatherPhone: "",
      motherName: "",
      motherPhone: "",
      email: "",
      phone: "",
      achievements: "",
      numberOfBacklogs: "",
      backlogSubject: "",
      activeInClubs: "",
    });
    setValidatedFields({});
    toast.info("Form reset", {
      description: "All fields have been cleared.",
    });
  };

  const bgClass = darkMode 
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950" 
    : "min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50";

  const cardClass = darkMode
    ? "shadow-2xl border-0 bg-gray-800/90 backdrop-blur-lg"
    : "shadow-2xl border-0 bg-white/90 backdrop-blur-lg";

  const textClass = darkMode ? "text-white" : "text-gray-900";
  const subTextClass = darkMode ? "text-gray-300" : "text-gray-600";

  if (isLoading) {
    return (
      <div className={`${bgClass} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto mb-4" />
          <p className={textClass}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bgClass} p-4 md:p-6 relative overflow-hidden transition-all duration-500`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Profile Completion
            </span>
            <span className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {formProgress}%
            </span>
          </div>
          <div className={`w-full h-5 ${darkMode ? 'bg-gray-600' : 'bg-gray-400'} rounded-full relative border-2 ${darkMode ? 'border-gray-500' : 'border-gray-500'}`}>
            <div 
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${formProgress}%` }}
            >
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className={`${cardClass} transform transition-all duration-300 hover:shadow-3xl animate-fade-in-up`}>
          <CardHeader className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'} rounded-t-xl`}>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl md:text-3xl flex items-center gap-3 text-black">
                  <User className="h-7 w-7 text-black" />
                  Student Profile
                </CardTitle>
              </div>
              
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <form className="space-y-6">
              {/* Profile Picture Section */}
              <div className="pb-6 border-b-2 border-gray-200 dark:border-gray-700">
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'section-heading'}`}>
                  <User className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  Profile Picture
                </h3>
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Left: Profile Image Display */}
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                        <Pencil className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Upload Controls */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'label-text'}`}>
                        Upload Profile Picture
                      </Label>
                      <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        JPG, PNG or GIF. Max size 2MB. Recommended: 400x400px
                      </p>
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className={`${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300'}`}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    
                    {/* Tip Box */}
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                      <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        💡 Tip: Use a clear, professional photo with good lighting for best results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-6 animate-slide-in-left">
                <h3 className={`text-xl font-bold mb-4 pb-3 border-b-2 ${darkMode ? 'border-blue-500 text-white' : 'border-blue-300 section-heading'} flex items-center gap-3`}>
                  <User className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative">
                      <Label htmlFor="fullName" className={`text-sm font-medium mb-2 flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'label-text'}`}>
                        <User className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        Full Name *
                        {validatedFields.fullName && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                        className={`
                          ${shakingFields.fullName ? 'animate-shake border-red-500' : ''}
                          ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                          transition-all duration-300 focus:scale-105 focus:shadow-lg
                          ${validatedFields.fullName ? 'border-green-500' : ''}
                        `}
                        required
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative">
                      <Label htmlFor="dateOfBirth" className={`text-sm font-medium mb-2 flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'label-text'}`}>
                        <Calendar className={`h-4 w-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                        Date of Birth *
                        {validatedFields.dateOfBirth && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className={`
                          ${shakingFields.dateOfBirth ? 'animate-shake border-red-500' : ''}
                          ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}
                          transition-all duration-300 focus:scale-105 focus:shadow-lg
                          ${validatedFields.dateOfBirth ? 'border-green-500' : ''}
                        `}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative">
                      <Label htmlFor="email" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                        <Mail className={`h-4 w-4 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                        Email Address *
                        {validatedFields.email && validateEmail(formData.email) && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@student.edu"
                        className={`
                          ${shakingFields.email ? 'animate-shake border-red-500' : ''}
                          ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                          transition-all duration-300 focus:scale-105 focus:shadow-lg
                          ${validatedFields.email && validateEmail(formData.email) ? 'border-green-500' : ''}
                        `}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative">
                      <Label htmlFor="phone" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                        <Phone className={`h-4 w-4 ${darkMode ? 'text-rose-400' : 'text-rose-600'}`} />
                        Phone Number *
                        {validatedFields.phone && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className={`
                          ${shakingFields.phone ? 'animate-shake border-red-500' : ''}
                          ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                          transition-all duration-300 focus:scale-105 focus:shadow-lg
                          ${validatedFields.phone ? 'border-green-500' : ''}
                        `}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-6 animate-slide-in-right">
                <h3 className={`text-xl font-bold mb-4 pb-3 border-b-2 ${darkMode ? 'border-purple-500 text-white' : 'border-purple-300 section-heading'} flex items-center gap-3`}>
                  <BookOpen className={`h-5 w-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  Academic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Roll Number */}
                  <div className="group relative">
                    <Label htmlFor="rollNumber" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Hash className={`h-4 w-4 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                      Roll Number *
                      {validatedFields.rollNumber && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                    </Label>
                    <Input
                      id="rollNumber"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                      placeholder="e.g., 21CS002"
                      className={`
                        ${shakingFields.rollNumber ? 'animate-shake border-red-500' : ''}
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                        ${validatedFields.rollNumber ? 'border-green-500' : ''}
                      `}
                      required
                    />
                  </div>

                  {/* Enrollment Number */}
                  <div className="group relative">
                    <Label htmlFor="enrollmentNumber" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Hash className={`h-4 w-4 ${darkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                      Enrollment Number *
                      {validatedFields.enrollmentNumber && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                    </Label>
                    <Input
                      id="enrollmentNumber"
                      value={formData.enrollmentNumber}
                      onChange={(e) => handleInputChange("enrollmentNumber", e.target.value)}
                      placeholder="e.g., 0827CS211002"
                      className={`
                        ${shakingFields.enrollmentNumber ? 'animate-shake border-red-500' : ''}
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                        ${validatedFields.enrollmentNumber ? 'border-green-500' : ''}
                      `}
                      required
                    />
                  </div>

                  {/* Semester */}
                  <div className="group relative">
                    <Label htmlFor="semester" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <GraduationCap className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      Current Semester *
                      {validatedFields.semester && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                    </Label>
                    <Select 
                      value={formData.semester} 
                      onValueChange={(value: string) => handleInputChange("semester", value)}
                    >
                      <SelectTrigger className={`
                        ${shakingFields.semester ? 'animate-shake border-red-500' : ''}
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}
                        transition-all duration-300 hover:scale-105
                        ${validatedFields.semester ? 'border-green-500' : ''}
                      `}>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
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

                  {/* Section */}
                  <div className="group relative">
                    <Label htmlFor="section" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Hash className={`h-4 w-4 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      Section *
                      {validatedFields.section && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                    </Label>
                    <Select 
                      value={formData.section} 
                      onValueChange={(value: string) => handleInputChange("section", value)}
                    >
                      <SelectTrigger className={`
                        ${shakingFields.section ? 'animate-shake border-red-500' : ''}
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}
                        transition-all duration-300 hover:scale-105
                        ${validatedFields.section ? 'border-green-500' : ''}
                      `}>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                        <SelectItem value="D">Section D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Attendance Progress Bar (Read-Only) */}
                  <div className="md:col-span-2 group">
                    <Label className={`text-sm font-medium ${textClass} flex items-center justify-between gap-2 mb-4`}>
                      <div className="flex items-center gap-2">
                        <BookOpen className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        Attendance Percentage
                      </div>
                      <span className={`text-2xl font-bold ${
                        formData.attendance >= 75 
                          ? darkMode ? 'text-emerald-400' : 'text-emerald-600'
                          : formData.attendance >= 65
                          ? darkMode ? 'text-yellow-400' : 'text-yellow-600'
                          : darkMode ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {formData.attendance}%
                      </span>
                    </Label>
                    <div className="relative">
                      {/* Progress Bar */}
                      <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                        <div 
                          className={`h-full transition-all duration-500 ease-out ${
                            formData.attendance >= 75 
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                              : formData.attendance >= 65
                              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                              : 'bg-gradient-to-r from-red-500 to-red-600'
                          }`}
                          style={{ width: `${formData.attendance}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>0%</span>
                        <span className={formData.attendance >= 65 ? 'font-semibold text-emerald-600' : 'font-semibold text-red-600'}>
                          Required: 75%
                        </span>
                        <span>100%</span>
                      </div>
                      <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} italic`}>
                        * Attendance is calculated automatically based on your class records
                      </p>
                    </div>
                  </div>

                  {/* Designation Dropdown */}
                  <div className="md:col-span-2 group">
                    <Label htmlFor="designation" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Award className={`h-4 w-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                      Designation / Role
                    </Label>
                    <Select value={formData.designation} onValueChange={(value: string) => handleInputChange("designation", value)}>
                      <SelectTrigger className={`
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}
                        transition-all duration-300 hover:scale-105
                      `}>
                        <SelectValue placeholder="Select your designation" />
                      </SelectTrigger>
                      <SelectContent className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="class-rep">Class Representative</SelectItem>
                        <SelectItem value="club-member">Club Member</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Number of Backlogs */}
                  <div className="group relative">
                    <Label htmlFor="numberOfBacklogs" className={`text-sm font-medium mb-2 flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'label-text'}`}>
                      <Hash className={`h-4 w-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                      Number of Backlogs
                    </Label>
                    <Input
                      id="numberOfBacklogs"
                      value={formData.numberOfBacklogs}
                      onChange={(e) => handleInputChange("numberOfBacklogs", e.target.value)}
                      placeholder="Enter number or 'null'"
                      className={`
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                      `}
                    />
                  </div>

                  {/* Backlog Subject */}
                  <div className="group relative">
                    <Label htmlFor="backlogSubject" className={`text-sm font-medium mb-2 flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'label-text'}`}>
                      <BookOpen className={`h-4 w-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                      Backlog Subject
                    </Label>
                    <Input
                      id="backlogSubject"
                      value={formData.backlogSubject}
                      onChange={(e) => handleInputChange("backlogSubject", e.target.value)}
                      placeholder="Enter subject or 'null'"
                      className={`
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                      `}
                    />
                  </div>

                  {/* Active in (Clubs) */}
                  <div className="md:col-span-2 group relative">
                    <Label htmlFor="activeInClubs" className={`text-sm font-medium mb-2 flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'label-text'}`}>
                      <Users className={`h-4 w-4 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
                      Active in (Clubs)
                    </Label>
                    <Input
                      id="activeInClubs"
                      value={formData.activeInClubs}
                      onChange={(e) => handleInputChange("activeInClubs", e.target.value)}
                      placeholder="e.g., Toast Master, COE"
                      className={`
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                      `}
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6 animate-slide-in-left">
                <h3 className={`text-xl font-bold mb-4 pb-3 border-b-2 ${darkMode ? 'border-pink-500 text-white' : 'border-pink-300 section-heading'} flex items-center gap-3`}>
                  <Sparkles className={`h-5 w-5 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                  Social & Professional Links
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LinkedIn */}
                  <div className="group relative">
                    <Label htmlFor="linkedIn" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Linkedin className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      LinkedIn Profile
                      {validatedFields.linkedIn && validateURL(formData.linkedIn) && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                    </Label>
                    <Input
                      id="linkedIn"
                      value={formData.linkedIn}
                      onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                      placeholder="linkedin.com/in/yourprofile"
                      className={`
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                        ${validatedFields.linkedIn && validateURL(formData.linkedIn) ? 'border-green-500' : ''}
                      `}
                    />
                  </div>

                  {/* GitHub */}
                  <div className="group relative">
                    <Label htmlFor="github" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Github className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`} />
                      GitHub Profile
                      {validatedFields.github && validateURL(formData.github) && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                    </Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => handleInputChange("github", e.target.value)}
                      placeholder="github.com/yourusername"
                      className={`
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                        ${validatedFields.github && validateURL(formData.github) ? 'border-green-500' : ''}
                      `}
                    />
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="space-y-6 animate-slide-in-right">
                <h3 className={`text-xl font-bold mb-4 pb-3 border-b-2 ${darkMode ? 'border-indigo-500 text-white' : 'border-indigo-300 section-heading'} flex items-center gap-3`}>
                  <Users className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  Parent / Guardian Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Father's Name */}
                  <div className="group relative">
                    <Label htmlFor="fatherName" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Users className={`h-4 w-4 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                      Father's Name *
                      {validatedFields.fatherName && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                    </Label>
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      placeholder="Enter father's full name"
                      className={`
                        ${shakingFields.fatherName ? 'animate-shake border-red-500' : ''}
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                        ${validatedFields.fatherName ? 'border-green-500' : ''}
                      `}
                      required
                    />
                  </div>

                  {/* Father's Phone */}
                  <div className="group relative">
                    <Label htmlFor="fatherPhone" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Phone className={`h-4 w-4 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                      Father's Phone Number *
                      {validatedFields.fatherPhone && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                    </Label>
                    <Input
                      id="fatherPhone"
                      type="tel"
                      value={formData.fatherPhone}
                      onChange={(e) => handleInputChange("fatherPhone", e.target.value)}
                      placeholder="+91 98765 12345"
                      className={`
                        ${shakingFields.fatherPhone ? 'animate-shake border-red-500' : ''}
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                        ${validatedFields.fatherPhone ? 'border-green-500' : ''}
                      `}
                      required
                    />
                  </div>

                  {/* Mother's Name */}
                  <div className="group relative">
                    <Label htmlFor="motherName" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Users className={`h-4 w-4 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      Mother's Name *
                      {validatedFields.motherName && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                    </Label>
                    <Input
                      id="motherName"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange("motherName", e.target.value)}
                      placeholder="Enter mother's full name"
                      className={`
                        ${shakingFields.motherName ? 'animate-shake border-red-500' : ''}
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                        ${validatedFields.motherName ? 'border-green-500' : ''}
                      `}
                      required
                    />
                  </div>

                  {/* Mother's Phone */}
                  <div className="group relative">
                    <Label htmlFor="motherPhone" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Phone className={`h-4 w-4 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      Mother's Phone Number *
                      {validatedFields.motherPhone && <Check className="h-4 w-4 text-green-500 animate-scale-in" />}
                    </Label>
                    <Input
                      id="motherPhone"
                      type="tel"
                      value={formData.motherPhone}
                      onChange={(e) => handleInputChange("motherPhone", e.target.value)}
                      placeholder="+91 98765 67890"
                      className={`
                        ${shakingFields.motherPhone ? 'animate-shake border-red-500' : ''}
                        ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                        transition-all duration-300 focus:scale-105 focus:shadow-lg
                        ${validatedFields.motherPhone ? 'border-green-500' : ''}
                      `}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-6 animate-slide-in-left">
                <h3 className={`text-xl font-bold mb-4 pb-3 border-b-2 ${darkMode ? 'border-yellow-500 text-white' : 'border-yellow-300 section-heading'} flex items-center gap-3`}>
                  <Award className={`h-5 w-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  Achievements & Honors
                </h3>
                
                <div className="group relative">
                  <Label htmlFor="achievements" className={`text-sm font-medium ${textClass} mb-2 block`}>
                    List your achievements (one per line)
                  </Label>
                  <Textarea
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => handleInputChange("achievements", e.target.value)}
                    placeholder="Enter your achievements, awards, certifications, etc."
                    className={`
                      ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300'}
                      min-h-[150px] transition-all duration-300 focus:scale-105 focus:shadow-lg resize-none
                    `}
                    rows={6}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200 dark:border-gray-700 animate-fade-in-up">
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                      Save Profile
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isSaving}
                  className="flex-1 border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-6 text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className={`mt-12 text-center pb-6 ${subTextClass} animate-fade-in`}>
          <p className="text-sm hover:scale-105 transition-transform duration-300 cursor-default">
            © Shri Shankaracharya Institute of Professional Management & Technology 2025 | All Rights Reserved
          </p>
        </footer>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-8 right-8 z-50 animate-bounce-slow">
        <Button
          size="icon"
          className={`h-14 w-14 rounded-full shadow-2xl ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          } hover:scale-110 transition-all duration-300`}
          onClick={() => setShowHelp(!showHelp)}
        >
          <HelpCircle className="h-6 w-6 text-white" />
        </Button>
        
        {showHelp && (
          <div className={`
            absolute bottom-16 right-0 w-72 p-4 rounded-lg shadow-2xl animate-scale-in
            ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
          `}>
            <h4 className="font-bold mb-2">Need Help? 📚</h4>
            <ul className="text-sm space-y-1">
              <li>• Fill all required fields marked with *</li>
              <li>• Use valid email and URLs</li>
              <li>• Attendance is calculated automatically</li>
              <li>• Click Save to submit your profile</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
