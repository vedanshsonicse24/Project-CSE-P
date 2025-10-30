import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Info,
  Download,
  Phone,
  Mail,
  MapPin,
  ArrowRight
} from "lucide-react";

export function AdmissionsPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const admissionProcess = [
    {
      step: 1,
      title: "Online Application",
      description: "Fill out the online application form with your academic details and personal information",
      icon: FileText,
      duration: "15-20 minutes"
    },
    {
      step: 2,
      title: "Document Submission",
      description: "Upload required documents including mark sheets, certificates, and identity proof",
      icon: Upload,
      duration: "10 minutes"
    },
    {
      step: 3,
      title: "Entrance Exam / Merit",
      description: "Qualify through entrance exam (JEE/CMAT) or merit-based selection",
      icon: BookOpen,
      duration: "Varies"
    },
    {
      step: 4,
      title: "Counseling & Selection",
      description: "Attend counseling session and complete document verification",
      icon: Users,
      duration: "1-2 days"
    },
    {
      step: 5,
      title: "Fee Payment",
      description: "Pay admission fees and complete the enrollment process",
      icon: DollarSign,
      duration: "Same day"
    },
    {
      step: 6,
      title: "Confirmation",
      description: "Receive admission confirmation and welcome package",
      icon: CheckCircle2,
      duration: "Immediate"
    }
  ];

  const eligibilityCriteria = [
    {
      program: "B.Tech Programs",
      criteria: [
        "Pass 10+2 with Physics, Chemistry, and Mathematics",
        "Minimum 50% aggregate marks (45% for SC/ST)",
        "Valid JEE Main score or State Entrance Exam score",
        "Age limit: 17-25 years"
      ],
      color: "border-blue-600"
    },
    {
      program: "M.Tech Programs",
      criteria: [
        "B.Tech/BE in relevant branch with minimum 55% marks",
        "Valid GATE score (preferred) or equivalent",
        "Work experience preferred but not mandatory",
        "No age limit"
      ],
      color: "border-purple-600"
    }
  ];

  const importantDates = [
    { event: "Application Start", date: "15 May 2025", status: "upcoming" },
    { event: "Application Deadline", date: "30 June 2025", status: "upcoming" },
    { event: "Entrance Exam", date: "10 July 2025", status: "upcoming" },
    { event: "Result Declaration", date: "25 July 2025", status: "upcoming" },
    { event: "Counseling Rounds", date: "1-15 August 2025", status: "upcoming" },
    { event: "Classes Begin", date: "1 September 2025", status: "upcoming" }
  ];

  const requiredDocuments = [
    "10th & 12th Mark Sheets and Certificates",
    "Transfer Certificate from previous institution",
    "Migration Certificate (if applicable)",
    "Entrance Exam Score Card (JEE/GATE/CAT/etc.)",
    "Category Certificate (if applicable)",
    "Aadhar Card / Identity Proof",
    "Passport Size Photographs (6 copies)",
    "Income Certificate (for scholarship)",
    "Medical Fitness Certificate",
    "Character Certificate"
  ];

  const feeStructure = [
    {
      program: "B.Tech (All Branches)",
      tuitionFee: "₹85,000",
      otherFees: "₹15,000",
      total: "₹1,00,000",
      duration: "Per Year"
    },
    {
      program: "M.Tech (All Branches)",
      tuitionFee: "₹70,000",
      otherFees: "₹12,000",
      total: "₹82,000",
      duration: "Per Year"
    }
  ];

  const scholarships: { name: string; eligibility: string; benefit: string; }[] = [
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            {...fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">Admissions 2025</h1>
            <p className="text-xl md:text-2xl text-black leading-relaxed mb-8">
              Begin your journey to excellence at SSIPMT
            </p>
            <Button size="lg" variant="secondary" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6">
              Apply Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </motion.section>

      {/* Important Notice */}
      <section className="py-8 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Alert className="border-blue-600 bg-blue-50">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-lg">
              <strong>Applications for 2025-26 are now open!</strong> Submit your application before 30th June 2025.
              Limited seats available. Early applications get priority.
            </AlertDescription>
          </Alert>
        </motion.div>
      </section>

      {/* Admission Process */}
      <section className="py-16 container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Process</h2>
            <p className="text-xl text-gray-600">
              Simple and transparent process to secure your seat
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {admissionProcess.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-xl transition-all relative bg-white border border-gray-200">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-black border-2 border-blue-600 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                  <CardContent className="pt-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-blue-100 rounded-full">
                        <step.icon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                    <p className="text-gray-600 text-center mb-3">{step.description}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{step.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Eligibility Criteria
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {eligibilityCriteria.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <Card className={`h-full border-l-4 ${item.color} hover:shadow-lg transition-shadow bg-white`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        {item.program}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {item.criteria.map((criterion, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Important Dates
            </motion.h2>
            <div className="space-y-4">
              {importantDates.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow bg-white border border-gray-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{item.event}</h3>
                            <p className="text-gray-600">{item.date}</p>
                          </div>
                        </div>
                        <Badge variant={item.status === "upcoming" ? "secondary" : "default"} className="bg-blue-100 text-blue-800">
                          {item.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Required Documents
            </motion.h2>
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow bg-white border border-gray-200">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                      <Download className="w-4 h-4" />
                      Download Document Checklist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Fee Structure
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {feeStructure.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-xl transition-all border-t-4 border-blue-600 bg-white">
                    <CardHeader>
                      <CardTitle>{item.program}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Tuition Fee</span>
                          <span className="font-bold text-lg">{item.tuitionFee}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Other Fees</span>
                          <span className="font-bold text-lg">{item.otherFees}</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between items-center">
                          <span className="font-bold text-gray-900">Total</span>
                          <span className="font-bold text-2xl text-blue-600">{item.total}</span>
                        </div>
                        <div className="text-center text-sm text-gray-500">{item.duration}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact for Admissions */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-blue-600 hover:shadow-2xl transition-shadow bg-white">
              <CardHeader className="bg-white border-b border-gray-200">
                <CardTitle className="text-2xl text-center text-black">Need Help with Admissions?</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Call Us</div>
                      <div className="text-gray-600">+91-771-4015100</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Email Us</div>
                      <div className="text-gray-600">admissions@ssipmt.edu.in</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Visit Us</div>
                      <div className="text-gray-600">Mon-Sat, 9 AM - 5 PM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Import icon that was missing
import { Upload } from "lucide-react";
