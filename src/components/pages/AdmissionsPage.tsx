import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { toast } from "sonner";
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
  
  const downloadDocumentChecklist = () => {
    // Get the required documents list
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

    // Create document content
    const content = `
SSIPMT COLLEGE OF ENGINEERING
ADMISSION DOCUMENT CHECKLIST
=====================================

Please ensure you have the following documents ready for the admission process:

${requiredDocuments.map((doc, index) => `${index + 1}. ${doc}`).join('\n')}

IMPORTANT NOTES:
- All documents should be original along with self-attested photocopies
- Documents in regional languages should be accompanied by English translation
- Passport size photographs should be recent (taken within last 6 months)
- Scanned copies should be clear and in PDF/JPG format (max 2MB per file)

FOR QUERIES:
Email: admissions@ssipmt.com
Phone: +91 771 234 5678
Website: www.ssipmt.com

Application Deadline: 30th June 2025
Early applications get priority for seat allocation.

© 2025 SSIPMT College of Engineering
All Rights Reserved
    `;

    // Create a blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SSIPMT_Admission_Document_Checklist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Show success toast
    toast.success("Checklist Downloaded!", {
      description: "Document checklist has been downloaded successfully."
    });
  };
  
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
      tuitionFee: "Γé╣85,000",
      otherFees: "Γé╣15,000",
      total: "Γé╣1,00,000",
      duration: "Per Year"
    },
    {
      program: "M.Tech (All Branches)",
      tuitionFee: "Γé╣70,000",
      otherFees: "Γé╣12,000",
      total: "Γé╣82,000",
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
                    <Button 
                      variant="outline" 
                      className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={downloadDocumentChecklist}
                    >
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
    </div>
  );
}

// Import icon that was missing
import { Upload } from "lucide-react";
