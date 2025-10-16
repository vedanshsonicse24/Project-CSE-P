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
  HelpCircle, Sparkles, Check, AlertCircle, Rocket 
} from "lucide-react";
import { toast } from "sonner";
import image_31f866a600b286454181d60b7ea702115451599f from 'figma:asset/31f866a600b286454181d60b7ea702115451599f.png';
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface StudentProfileData {
  fullName: string;
  dateOfBirth: string;
  rollNumber: string;
  enrollmentNumber: string;
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
  
  const [formData, setFormData] = useState<StudentProfileData>({
    fullName: "Priya Sharma",
    dateOfBirth: "2003-05-15",
    rollNumber: "21CS002",
    enrollmentNumber: "0827CS211002",
    attendance: 92,
    designation: "student",
    linkedIn: "linkedin.com/in/priyasharma",
    github: "github.com/priyasharma",
    fatherName: "Rajesh Sharma",
    fatherPhone: "+91 98765 12345",
    motherName: "Sunita Sharma",
    motherPhone: "+91 98765 67890",
    email: "priya.sharma@student.edu",
    phone: "+91 98765 43210",
    achievements: "First Prize in Hackathon 2024\nBest Project Award - Web Development\nActive Member - Coding Club",
  });

  // Calculate form completion progress
  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => 
      value !== "" && value !== 0
    ).length;
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

  const handleSave = () => {
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

    console.log("Student Profile Data:", formData);
    
    // Success feedback
    triggerConfetti();
    toast.success("Profile updated successfully! 🎉", {
      description: "Your information has been saved.",
      icon: <Sparkles className="h-5 w-5" />,
    });
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      dateOfBirth: "",
      rollNumber: "",
      enrollmentNumber: "",
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

  return (
    <div className={`${bgClass} p-4 md:p-6 relative overflow-hidden transition-all duration-500`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Header with Logo */}
        <div className="mb-8 text-center relative">
          <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
            <div className="group">
              <ImageWithFallback
                src={image_31f866a600b286454181d60b7ea702115451599f}
                alt="College Logo"
                className="h-20 w-auto object-contain transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
            <GraduationCap className={`h-16 w-16 ${darkMode ? 'text-blue-400' : 'text-blue-600'} animate-bounce`} />
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-3 animate-slide-down ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
          } bg-clip-text text-transparent`}>
            Student Profile Portal
          </h1>
          
          <p className={`text-lg ${subTextClass} max-w-2xl mx-auto animate-fade-in-delay`}>
            Submit your academic and personal details to complete your student profile
          </p>

          {/* Floating Mascot */}
          <div className="absolute -top-4 -right-4 hidden lg:block">
            <Rocket className={`h-12 w-12 ${darkMode ? 'text-yellow-400' : 'text-orange-500'} animate-float`} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 animate-fade-in-delay-2">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${textClass}`}>Profile Completion</span>
            <span className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {formProgress}%
            </span>
          </div>
          <div className={`w-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className={`${cardClass} transform transition-all duration-300 hover:shadow-3xl animate-fade-in-up`}>
          <CardHeader className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white rounded-t-xl`}>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                  <User className="h-7 w-7 animate-pulse" />
                  Student Information
                </CardTitle>
                <CardDescription className={`${darkMode ? 'text-blue-100' : 'text-blue-50'} mt-2`}>
                  Fill in your details below • All fields marked with * are required
                </CardDescription>
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
            <form className="space-y-10">
              {/* Personal Information */}
              <div className="space-y-6 animate-slide-in-left">
                <h3 className={`text-2xl font-bold ${textClass} pb-3 border-b-2 ${darkMode ? 'border-blue-500' : 'border-blue-300'} flex items-center gap-3`}>
                  <User className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative">
                      <Label htmlFor="fullName" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
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
                      <Label htmlFor="dateOfBirth" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
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
                <h3 className={`text-2xl font-bold ${textClass} pb-3 border-b-2 ${darkMode ? 'border-purple-500' : 'border-purple-300'} flex items-center gap-3`}>
                  <BookOpen className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
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

                  {/* Attendance Slider */}
                  <div className="md:col-span-2 group">
                    <Label className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-4`}>
                      <BookOpen className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      Attendance Percentage: 
                      <span className={`text-2xl font-bold ml-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        {formData.attendance}%
                      </span>
                    </Label>
                    <div className="relative">
                      <Slider
                        value={[formData.attendance]}
                        onValueChange={(value) => handleInputChange("attendance", value[0])}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Designation Dropdown */}
                  <div className="md:col-span-2 group">
                    <Label htmlFor="designation" className={`text-sm font-medium ${textClass} flex items-center gap-2 mb-2`}>
                      <Award className={`h-4 w-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                      Designation / Role
                    </Label>
                    <Select value={formData.designation} onValueChange={(value) => handleInputChange("designation", value)}>
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
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6 animate-slide-in-left">
                <h3 className={`text-2xl font-bold ${textClass} pb-3 border-b-2 ${darkMode ? 'border-pink-500' : 'border-pink-300'} flex items-center gap-3`}>
                  <Sparkles className={`h-6 w-6 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
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
                <h3 className={`text-2xl font-bold ${textClass} pb-3 border-b-2 ${darkMode ? 'border-indigo-500' : 'border-indigo-300'} flex items-center gap-3`}>
                  <Users className={`h-6 w-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
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
                <h3 className={`text-2xl font-bold ${textClass} pb-3 border-b-2 ${darkMode ? 'border-yellow-500' : 'border-yellow-300'} flex items-center gap-3`}>
                  <Award className={`h-6 w-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
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
                  className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
                >
                  <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                  Save Profile
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className={`
                    flex-1 border-2 font-semibold py-6 text-lg transition-all duration-300 transform hover:scale-105
                    ${darkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'}
                  `}
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
              <li>• Adjust attendance with the slider</li>
              <li>• Click Save to submit your profile</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
