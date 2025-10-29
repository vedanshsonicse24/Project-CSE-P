import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";
import { useState } from "react";
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Info
} from "lucide-react";
import { toast } from "sonner";

export function ApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    category: "",
    
    // Address
    address: "",
    city: "",
    state: "",
    pincode: "",
    
    // Academic Information
    program: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    entranceExam: "",
    entranceScore: "",
    
    // Guardian Information
    guardianName: "",
    guardianPhone: "",
    guardianRelation: "",
    
    // Documents
    photo: null as File | null,
    tenthMarksheet: null as File | null,
    twelfthMarksheet: null as File | null,
    entranceCard: null as File | null,
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    handleInputChange(field, value);
  };

  const handleNext = () => {
    // Basic validation
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.dateOfBirth) {
        toast.error("Please fill all required fields");
        return;
      }
    }
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.program) {
      toast.error("Please select a program");
      return;
    }
    
    // Simulate form submission
    toast.success("Application submitted successfully! We'll contact you soon.");
    console.log("Form Data:", formData);
  };

  const programs = [
    "B.Tech Computer Science & Engineering",
    "B.Tech Artificial Intelligence & Data Science",
    "B.Tech Information Technology",
    "B.Tech Electronics & Communication",
    "M.Tech Computer Science",
    "M.Tech VLSI Design",
    "MCA",
    "MBA"
  ];

  const states = [
    "Chhattisgarh", "Madhya Pradesh", "Maharashtra", "Delhi", "Karnataka", 
    "Tamil Nadu", "Uttar Pradesh", "Bihar", "West Bengal", "Gujarat"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-r from-maroon-600 to-maroon-800 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            {...fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Apply Now</h1>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              Start your journey to excellence - Complete your application in 4 easy steps
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.section>

      {/* Application Notice */}
      <section className="py-8 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Alert className="border-blue-600 bg-blue-50">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-lg">
              <strong>Important:</strong> Ensure all information is accurate. You'll receive a confirmation email after submission.
              Application fee: ₹1,000 (Non-refundable)
            </AlertDescription>
          </Alert>
        </motion.div>
      </section>

      {/* Application Form */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold border-2 transition-all ${
                    step >= stepNumber 
                      ? 'bg-maroon-600 text-white border-maroon-600' 
                      : 'bg-white text-gray-400 border-gray-300'
                  }`}>
                    {step > stepNumber ? <CheckCircle2 className="w-6 h-6" /> : stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${
                      step > stepNumber ? 'bg-maroon-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className={step >= 1 ? 'text-maroon-600 font-semibold' : ''}>Personal Info</span>
              <span className={step >= 2 ? 'text-maroon-600 font-semibold' : ''}>Address</span>
              <span className={step >= 3 ? 'text-maroon-600 font-semibold' : ''}>Academic</span>
              <span className={step >= 4 ? 'text-maroon-600 font-semibold' : ''}>Documents</span>
            </div>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="bg-maroon-50">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-6 h-6 text-maroon-600" />
                  {step === 1 && "Personal Information"}
                  {step === 2 && "Address Details"}
                  {step === 3 && "Academic Information"}
                  {step === 4 && "Document Upload"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input 
                        id="fullName"
                        placeholder="Enter your full name as per 10th certificate"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Mobile Number *</Label>
                        <Input 
                          id="phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="dob">Date of Birth *</Label>
                        <Input 
                          id="dob"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <Select value={formData.gender} onValueChange={handleSelectChange('gender')}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={handleSelectChange('category')}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="obc">OBC</SelectItem>
                          <SelectItem value="sc">SC</SelectItem>
                          <SelectItem value="st">ST</SelectItem>
                          <SelectItem value="ews">EWS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 2: Address */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="address">Residential Address *</Label>
                      <Textarea 
                        id="address"
                        placeholder="House No., Street, Locality"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input 
                          id="city"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select value={formData.state} onValueChange={handleSelectChange('state')}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map(state => (
                              <SelectItem key={state} value={state.toLowerCase()}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input 
                        id="pincode"
                        placeholder="6-digit PIN code"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="mt-2"
                        maxLength={6}
                      />
                    </div>

                    <div className="border-t pt-6 mt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Guardian Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="guardianName">Guardian Name *</Label>
                          <Input 
                            id="guardianName"
                            placeholder="Father/Mother/Guardian name"
                            value={formData.guardianName}
                            onChange={(e) => handleInputChange('guardianName', e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                            <Input 
                              id="guardianPhone"
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              value={formData.guardianPhone}
                              onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="guardianRelation">Relation *</Label>
                            <Select value={formData.guardianRelation} onValueChange={handleSelectChange('guardianRelation')}>
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select relation" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="father">Father</SelectItem>
                                <SelectItem value="mother">Mother</SelectItem>
                                <SelectItem value="guardian">Legal Guardian</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Academic Information */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="program">Program Applying For *</Label>
                      <Select value={formData.program} onValueChange={handleSelectChange('program')}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map(program => (
                            <SelectItem key={program} value={program}>{program}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="tenth">10th Percentage/CGPA *</Label>
                        <Input 
                          id="tenth"
                          placeholder="e.g., 85.5%"
                          value={formData.tenthPercentage}
                          onChange={(e) => handleInputChange('tenthPercentage', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="twelfth">12th Percentage/CGPA *</Label>
                        <Input 
                          id="twelfth"
                          placeholder="e.g., 75.5%"
                          value={formData.twelfthPercentage}
                          onChange={(e) => handleInputChange('twelfthPercentage', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="entranceExam">Entrance Exam *</Label>
                        <Select value={formData.entranceExam} onValueChange={handleSelectChange('entranceExam')}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select entrance exam" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jee-main">JEE Main</SelectItem>
                            <SelectItem value="jee-advanced">JEE Advanced</SelectItem>
                            <SelectItem value="gate">GATE</SelectItem>
                            <SelectItem value="cat">CAT</SelectItem>
                            <SelectItem value="cmat">CMAT</SelectItem>
                            <SelectItem value="state">State Entrance Exam</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="entranceScore">Entrance Score/Rank *</Label>
                        <Input 
                          id="entranceScore"
                          placeholder="Enter your score/rank"
                          value={formData.entranceScore}
                          onChange={(e) => handleInputChange('entranceScore', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Documents */}
                {step === 4 && (
                  <div className="space-y-6">
                    <Alert className="border-yellow-600 bg-yellow-50">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <AlertDescription>
                        All documents should be in PDF/JPG/PNG format and less than 2MB in size.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-maroon-600 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <Label htmlFor="photo" className="cursor-pointer">
                          <span className="text-maroon-600 font-semibold">Passport Size Photo *</span>
                          <p className="text-sm text-gray-600 mt-1">Click to upload (Max 2MB)</p>
                        </Label>
                        <Input 
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('photo', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        {formData.photo && (
                          <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            {formData.photo.name}
                          </p>
                        )}
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-maroon-600 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <Label htmlFor="tenth-marksheet" className="cursor-pointer">
                          <span className="text-maroon-600 font-semibold">10th Marksheet *</span>
                          <p className="text-sm text-gray-600 mt-1">Click to upload (PDF/JPG)</p>
                        </Label>
                        <Input 
                          id="tenth-marksheet"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange('tenthMarksheet', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        {formData.tenthMarksheet && (
                          <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            {formData.tenthMarksheet.name}
                          </p>
                        )}
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-maroon-600 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <Label htmlFor="twelfth-marksheet" className="cursor-pointer">
                          <span className="text-maroon-600 font-semibold">12th Marksheet *</span>
                          <p className="text-sm text-gray-600 mt-1">Click to upload (PDF/JPG)</p>
                        </Label>
                        <Input 
                          id="twelfth-marksheet"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange('twelfthMarksheet', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        {formData.twelfthMarksheet && (
                          <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            {formData.twelfthMarksheet.name}
                          </p>
                        )}
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-maroon-600 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <Label htmlFor="entrance-card" className="cursor-pointer">
                          <span className="text-maroon-600 font-semibold">Entrance Exam Scorecard *</span>
                          <p className="text-sm text-gray-600 mt-1">Click to upload (PDF/JPG)</p>
                        </Label>
                        <Input 
                          id="entrance-card"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange('entranceCard', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        {formData.entranceCard && (
                          <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            {formData.entranceCard.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  {step > 1 && (
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      className="gap-2"
                    >
                      Previous
                    </Button>
                  )}
                  <div className="ml-auto">
                    {step < 4 ? (
                      <Button 
                        onClick={handleNext}
                        className="bg-maroon-600 hover:bg-maroon-700 gap-2"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-700 gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Submit Application
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-8">
              Our admissions team is here to assist you with any questions
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Phone className="w-8 h-8 text-maroon-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">+91-771-4015100</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Mail className="w-8 h-8 text-maroon-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">admissions@ssipmt.edu.in</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Info className="w-8 h-8 text-maroon-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Help Center</h3>
                  <Button variant="link" className="text-maroon-600">View FAQs</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
