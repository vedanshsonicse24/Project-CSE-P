import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import WaveSeparator from "../ui/WaveSeparator";
import { 
  ExternalLink, 
  BookOpen, 
  GraduationCap, 
  Cpu, 
  Brain, 
  Shield, 
  Network, 
  Camera, 
  Database,
  Lightbulb,
  Award,
  FileText,
  Users,
  Building2,
  Phone,
  Mail,
  CheckCircle2,
  TrendingUp,
  FlaskConical,
  BookMarked
} from "lucide-react";
import { useState } from "react";

export function ResearchPage() {
  const [activeTab, setActiveTab] = useState<'research' | 'education'>('research');

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 }
  };

  const handleRedirect = () => {
    window.open("https://csvtu.ac.in/ew/computer-science-engineering/", "_blank");
  };

  const scrollToSection = (section: 'research' | 'education') => {
    setActiveTab(section);
    const element = document.getElementById(section === 'research' ? 'research-section' : 'education-section');
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Research Areas Data
  const researchAreas = [
    {
      icon: Brain,
      title: "Artificial Intelligence & Machine Learning",
      description: "Deep learning, neural networks, computer vision, natural language processing, and intelligent systems for real-world applications.",
      color: "from-blue-600 to-indigo-600",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: Database,
      title: "Data Science & Big Data Analytics",
      description: "Advanced analytics, data mining, predictive modeling, and big data processing using modern tools and frameworks.",
      color: "from-purple-600 to-pink-600",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: Shield,
      title: "Cybersecurity & Network Security",
      description: "Information security, cryptography, ethical hacking, network defense, and secure system design.",
      color: "from-red-600 to-orange-600",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: Network,
      title: "Internet of Things (IoT)",
      description: "Smart devices, sensor networks, embedded systems, and IoT applications for smart cities and automation.",
      color: "from-green-600 to-teal-600",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: Camera,
      title: "Image Processing & Computer Vision",
      description: "Digital image processing, pattern recognition, object detection, and visual analytics using AI techniques.",
      color: "from-indigo-600 to-purple-600",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: Cpu,
      title: "Cloud Computing & Distributed Systems",
      description: "Cloud architecture, virtualization, distributed computing, and scalable system design.",
      color: "from-cyan-600 to-blue-600",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Innovation Projects Data
  const projects = [
    {
      title: "Blind Boot - Assistive Technology",
      description: "An innovative device designed to assist visually-impaired individuals in navigation using ultrasonic sensors, GPS, and audio feedback systems.",
      technologies: ["Arduino", "Ultrasonic Sensors", "GPS Module", "Text-to-Speech"],
      status: "Completed",
      category: "IoT & Embedded Systems",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Anti-Theft Vehicle Alarm System",
      description: "Smart vehicle security system using IoT sensors, GPS tracking, and mobile alerts to prevent theft and unauthorized access.",
      technologies: ["IoT", "GPS", "GSM Module", "Mobile App"],
      status: "Completed",
      category: "IoT & Security",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Smart Home Automation",
      description: "Comprehensive home automation solution integrating voice control, mobile app, and intelligent scheduling for appliances and security.",
      technologies: ["IoT", "ESP8266", "Alexa Integration", "Firebase"],
      status: "Ongoing",
      category: "IoT & Automation",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "AI-Powered Disease Prediction",
      description: "Machine learning model for early disease prediction using patient data, medical history, and diagnostic patterns.",
      technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
      status: "Completed",
      category: "AI & Healthcare",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Real-Time Traffic Monitoring System",
      description: "Computer vision based traffic analysis system for vehicle detection, counting, and congestion monitoring.",
      technologies: ["OpenCV", "YOLO", "Python", "Deep Learning"],
      status: "Ongoing",
      category: "Computer Vision",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Blockchain-Based Secure Voting",
      description: "Decentralized voting system ensuring transparency, security, and tamper-proof electoral processes using blockchain technology.",
      technologies: ["Blockchain", "Ethereum", "Smart Contracts", "Web3"],
      status: "Research Phase",
      category: "Blockchain & Security",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Publications Data
  const publications = [
    {
      title: "Deep Learning Approaches for Medical Image Classification",
      authors: "Dr. S.K. Swarnkar, Prof. A. Kumar, Student Team",
      journal: "International Journal of Computer Applications",
      year: "2024"
    },
    {
      title: "IoT-Based Smart Agriculture Monitoring System",
      authors: "Prof. R. Sharma, Student Researchers",
      conference: "IEEE International Conference on IoT",
      year: "2024"
    },
    {
      title: "Security Analysis of Cloud Computing Infrastructure",
      authors: "Dr. P. Verma, Research Scholars",
      journal: "Journal of Cybersecurity Research",
      year: "2023"
    },
    {
      title: "Machine Learning for Predictive Maintenance in Industry 4.0",
      authors: "Faculty Team & Industry Partners",
      conference: "International Conference on AI & Industry",
      year: "2023"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 w-full overflow-x-hidden">
      {/* Hero Section - Enhanced */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-8 px-8 py-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            >
              <GraduationCap className="w-7 h-7" />
              <motion.span 
                className="text-lg font-black tracking-wider"
                style={{
                  textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)'
                }}
                animate={{
                  rotateX: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                CSE DEPARTMENT
              </motion.span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ letterSpacing: '-0.02em' }}
            >
              Research & Education
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-semibold leading-relaxed mb-12 max-w-4xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{ letterSpacing: '0.02em', lineHeight: '1.6' }}
            >
              Advancing Innovation in Computer Science & Engineering
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="px-8 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                <div className="text-4xl font-black text-yellow-300">64+</div>
                <div className="text-sm text-blue-100">Patents</div>
              </div>
              <div className="px-8 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                <div className="text-4xl font-black text-green-300">6+</div>
                <div className="text-sm text-blue-100">Start-ups</div>
              </div>
              <div className="px-8 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                <div className="text-4xl font-black text-pink-300">100+</div>
                <div className="text-sm text-blue-100">Publications</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white text-lg px-10 py-7 rounded-full font-bold shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('research')}
              >
                Explore Our Research
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Quick Navigation Tabs - Sticky */}
      <motion.div 
        className="sticky top-32 z-40 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200 w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-center gap-4 py-6">
            <motion.button
              onClick={() => scrollToSection('research')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'research'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FlaskConical className="w-6 h-6" />
              <span>Research & Innovation</span>
            </motion.button>

            <div className="h-12 w-px bg-gray-300"></div>

            <motion.button
              onClick={() => scrollToSection('education')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/30 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookMarked className="w-6 h-6" />
              <span>Academic Curriculum</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Research Section Wrapper */}
      <div id="research-section">

      {/* Research Centre & Infrastructure Section - Modern Design */}
      <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden w-full">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl shadow-2xl">
                <Building2 className="w-16 h-16 text-white" />
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Research Hub
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4" style={{ letterSpacing: '0.01em' }}>
              Where Innovation Meets Excellence
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16 max-w-7xl mx-auto">
            {/* Research Centre Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-0 shadow-2xl bg-white/80 backdrop-blur-xl overflow-hidden group hover:shadow-blue-500/20 transition-all duration-500">
                <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white py-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                  <CardTitle className="text-3xl font-bold relative z-10">Research Centre</CardTitle>
                  <p className="text-blue-100 mt-2 relative z-10">Established 2021-22</p>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed text-justify px-2" style={{ letterSpacing: '0.01em', lineHeight: '1.8' }}>
                      Our state-of-the-art Research Centre drives innovation in Computer Science & Engineering with cutting-edge projects and collaborations.
                    </p>
                    
                    <div className="p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl border-l-4 border-blue-500 shadow-lg">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Research Coordinator</p>
                          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Dr. Suman Kumar Swarnkar
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-3 leading-relaxed text-justify px-2" style={{ letterSpacing: '0.01em' }}>Leading groundbreaking research initiatives</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Infrastructure Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-0 shadow-2xl bg-white/80 backdrop-blur-xl overflow-hidden group hover:shadow-purple-500/20 transition-all duration-500">
                <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white py-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                  <CardTitle className="text-3xl font-bold relative z-10">⚡ Infrastructure</CardTitle>
                  <p className="text-purple-100 mt-2 relative z-10">Cutting-Edge Technology</p>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="space-y-5">
                    {[
                      { icon: Cpu, title: "High-Performance Systems", desc: "Intel i7, 16GB+ RAM, SSD Storage" },
                      { icon: Brain, title: "Advanced Software", desc: "MATLAB, TensorFlow, PyTorch, AWS, Azure" },
                      { icon: Network, title: "Specialized Labs", desc: "AI/ML, IoT, Security, Cloud Computing" },
                      { icon: Database, title: "Research Tools", desc: "GPU Servers, Dev Boards, IoT Kits" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Wave - Research Hub to Research Areas Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveSeparator theme="white" variant="default" />
        </div>
      </section>

      {/* Research Areas Section - Modern Grid */}
      <section id="research-areas" className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden w-full">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
              Research Domains
            </h2>
            <p className="text-2xl text-blue-200 max-w-3xl mx-auto">
              Pushing boundaries in cutting-edge technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {researchAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <Card className="h-full border-0 bg-white/10 backdrop-blur-xl overflow-hidden group hover:bg-white/15 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30">
                  <CardHeader className={`bg-gradient-to-br ${area.color} text-white py-10 relative overflow-hidden`}>
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      style={{
                        backgroundImage: `url(${area.image})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="flex items-center justify-center mb-6 relative z-10">
                      <motion.div 
                        className="p-5 bg-white/20 backdrop-blur-sm rounded-2xl shadow-2xl"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <area.icon className="w-12 h-12" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-2xl text-center font-bold relative z-10">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 pb-8 px-6">
                    <p className="text-blue-100 text-center leading-relaxed text-lg">
                      {area.description}
                    </p>
                    <div className="mt-6 flex justify-center">
                      <Button 
                        variant="outline" 
                        className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full"
                      >
                        Learn More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom Wave - Research Areas to Innovation Projects Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveSeparator theme="light-gray" variant="smooth" />
        </div>
      </section>

      {/* Innovation Projects Section - Card Stack Style */}
      <section className="py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative w-full">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div className="text-7xl text-blue-600">⚡</div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6">
              Innovation Projects
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Real-world solutions built by our students & faculty
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -15 }}
              >
                <Card className="h-full border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group bg-white overflow-hidden">
                  <CardHeader className="relative pb-8 pt-8">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    <div className="flex items-start justify-between mb-6">
                      <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-semibold">
                        {project.category}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={`px-4 py-2 font-bold text-sm
                          ${project.status === 'Completed' ? 'bg-green-500 text-white border-green-500' : ''}
                          ${project.status === 'Ongoing' ? 'bg-blue-500 text-white border-blue-500' : ''}
                          ${project.status === 'Research Phase' ? 'bg-purple-500 text-white border-purple-500' : ''}
                        `}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  
                  {/* Project Image */}
                  <div className="px-6 mb-4">
                    <div className="relative overflow-hidden rounded-lg aspect-video">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <CardContent className="pb-8">
                    <p className="text-gray-600 mb-6 leading-relaxed text-base">
                      {project.description}
                    </p>
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> Technologies:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-semibold text-xs border border-blue-200">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-blue-900 font-semibold rounded-xl border-2 border-blue-600">
                        View Details →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications & Achievements Section */}
      <section className="py-20 w-full">
        <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Publications, Patents & Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contributing to global knowledge through research and innovation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Publications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="text-2xl flex items-center gap-3 text-black">
                  <FileText className="w-8 h-8" />
                  Recent Publications
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {publications.map((pub, index) => (
                    <div key={index} className="pb-6 border-b last:border-0">
                      <h4 className="font-bold text-gray-900 mb-2">{pub.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{pub.authors}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-blue-600 font-medium">
                          {pub.journal || pub.conference}
                        </p>
                        <Badge variant="outline">{pub.year}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Full Publication List (PDF)
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Conference Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="text-2xl flex items-center gap-3 text-black">
                  <Award className="w-8 h-8" />
                  Conference & Events
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="flex items-start gap-4">
                      <Award className="w-10 h-10 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          3rd International Conference on Sustainable Research
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          ICSSRESM 2022 - Engineering Science and Management
                        </p>
                        <Badge className="bg-blue-600 text-white">Hosted by SSIPMT</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <div className="flex items-start gap-4">
                      <TrendingUp className="w-10 h-10 text-purple-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          Research & Innovation Week
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Annual showcase of student projects and faculty research
                        </p>
                        <Badge className="bg-purple-600 text-white">Annual Event</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg">
                    <div className="flex items-start gap-4">
                      <Lightbulb className="w-10 h-10 text-green-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          Hackathons & Competitions
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Regular coding challenges and innovation competitions
                        </p>
                        <Badge className="bg-green-600 text-white">Multiple Times/Year</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        </div>
      </section>

      {/* Collaborations & Centres of Excellence Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 w-full">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Collaborations & Centres of Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry partnerships and specialized research centers
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full">
                      <Building2 className="w-16 h-16" />
                    </div>
                  </div>
                  <CardTitle className="text-4xl text-center font-bold text-black">
                    Centre of Excellence (CoE)
                  </CardTitle>
                  <p className="text-center text-white font-medium text-lg mt-4 text-black">
                    Research & Development in Computer Science & Engineering
                  </p>
                </CardHeader>
                
                <CardContent className="p-12">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Focus Areas</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">Industry-Oriented Research</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">Data Science & Analytics Platform</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">AI & Machine Learning Projects</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">Innovation & Entrepreneurship</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Industry Partnerships</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">MoUs with Leading Tech Companies</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">Industry Expert Training Programs</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">Collaborative Research Projects</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">Internship & Placement Support</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                      Training & Certification Facilities
                    </h4>
                    <p className="text-gray-700 text-center leading-relaxed">
                      Access to industry-standard certifications, workshops, and hands-on training programs in collaboration with 
                      leading technology partners including AWS, Microsoft, Google, and more.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* End Research Section Wrapper */}
      </div>

      {/* Education Section Wrapper */}
      <div id="education-section">

      {/* Education - CSVTU Syllabus Section - Modern Design */}
      <section className="py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden w-full">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-8"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div className="p-8 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-full border-4 border-white/30 shadow-2xl">
                <BookOpen className="w-20 h-20 text-white" />
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-black mb-6">
              Academic Curriculum
            </h2>
            <p className="text-2xl text-purple-200 max-w-3xl mx-auto">
              Complete CSVTU syllabus at your fingertips
            </p>
          </motion.div>

          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-2xl overflow-hidden">
              <CardContent className="p-12 md:p-16">
                <div className="space-y-12">
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-black mb-6">
                      B.Tech CSE Syllabus
                    </h3>
                    <p className="text-xl text-purple-200 mb-4">
                      Chhattisgarh Swami Vivekananda Technical University
                    </p>
                    <p className="text-lg text-purple-300">
                      Complete course curriculum for all years ⚡
                    </p>
                  </div>

                  {/* Year Cards Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { year: "First Year", desc: "Foundation & Basic Engineering", color: "from-blue-500 to-cyan-500" },
                      { year: "Second Year", desc: "Core CS Fundamentals", color: "from-purple-500 to-pink-500" },
                      { year: "Third Year", desc: "Advanced Topics & Specializations", color: "from-pink-500 to-rose-500" },
                      { year: "Fourth Year", desc: "Electives & Project Work", color: "from-orange-500 to-red-500" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className={`p-8 bg-gradient-to-br ${item.color} rounded-2xl shadow-2xl border-2 border-white/20 relative overflow-hidden group cursor-pointer`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className="relative z-10">
                          <h4 className="text-2xl font-black text-black mb-3">{item.year}</h4>
                          <p className="text-white/90 font-medium text-lg">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div 
                    className="flex justify-center pt-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleRedirect}
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-purple-50 px-16 py-8 text-2xl font-black rounded-full shadow-2xl hover:shadow-white/30 transform transition-all duration-300 group"
                    >
                      <BookOpen className="w-8 h-8 mr-4 group-hover:rotate-12 transition-transform" />
                      View Complete Syllabus
                      <ExternalLink className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </motion.div>

                  <motion.p 
                    className="text-center text-purple-200 text-lg mt-8 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <span>Redirects to official CSVTU website</span>
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Bottom Wave - Education Section End */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveSeparator theme="white" variant="inverted" />
        </div>
      </section>

      {/* End Education Section Wrapper */}
      </div>
    </div>
  );
}
