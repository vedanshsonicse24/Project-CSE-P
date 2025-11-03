import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Bell, Mail, Linkedin, Youtube, Phone, MapPin, Clock, Users, BookOpen, Award, ChevronUp, ChevronDown, Edit3, Edit2, Save, X, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FacultyCard } from "./common/FacultyCard";
import { FacultyCarousel3D } from "./common/FacultyCarousel3D";
import { StudentProjectsCarousel } from "./common/StudentProjectsCarousel";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface HomePageProps {
  onNavigateToLogin: () => void;
  onNavigateToPrograms?: (programType?: string) => void;
  onNavigateToCSEDepartment?: () => void;
  onNavigateToFacultyInfo?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToNewsEvents?: () => void;
  onNavigateToCOE?: (section?: string) => void;
  userRole?: "faculty" | "student" | "hod" | "admin" | "developer" | null;
}

export function HomePage({ onNavigateToLogin, onNavigateToPrograms, onNavigateToCSEDepartment, onNavigateToFacultyInfo, onNavigateToContact, onNavigateToNewsEvents, onNavigateToCOE, userRole }: HomePageProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [editingProject, setEditingProject] = useState<number | null>(null);
  
  // Real Student Projects Data from PDF
  const [editedProjects, setEditedProjects] = useState([
    {
      id: 1,
      title: "Green Palna",
      description: "An eco-health initiative linking childbirth with tree plantation and maternal nutrition, promoting environmental responsibility and sustainable living.",
      contributors: "6 Students",
      duration: "3 Months",
      backgroundImage: "./assets/green-palna-bg.png",
      projectLink: "#",
      tag: "Popular Now"
    },
    {
      id: 2,
      title: "Har Ghar Munga",
      description: "Promotes nutrition and sustainability by distributing drumstick saplings to Anganwadi children, fighting anemia through moringa and fenugreek.",
      contributors: "6 Students",
      duration: "4 Months",
      backgroundImage: "./assets/har-ghar-munga-bg.png",
      projectLink: "#",
      tag: "Featured"
    },
    {
      id: 3,
      title: "Harihar Pathshala",
      description: "Combines TB awareness, nutrition education, and tree plantation in schools and Anganwadi centers for holistic child development.",
      contributors: "8 Students",
      duration: "5 Months",
      backgroundImage: "./assets/harihar-pathsala-bg.png",
      projectLink: "#",
      tag: "New"
    },
    {
      id: 4,
      title: "Smriti Pustakalaya",
      description: "A digital donation platform connecting book donors with rural libraries and schools, bridging the literacy gap in underserved communities.",
      contributors: "5 Students",
      duration: "4 Months",
      backgroundImage: "./assets/smriti-pustakalaya-bg.png",
      projectLink: "#",
      tag: "$270"
    },
    {
      id: 5,
      title: "Chhanv Health Camp",
      description: "A comprehensive welfare portal offering health checkups and government scheme access for state employees and their families.",
      contributors: "7 Students",
      duration: "6 Months",
      backgroundImage: "./assets/chhanv-bg.png",
      projectLink: "#",
      tag: "Popular Now"
    },
    {
      id: 6,
      title: "Medi Guru",
      description: "A virtual training platform for government medical officers in Chhattisgarh, enhancing healthcare delivery through digital education.",
      contributors: "6 Students",
      duration: "5 Months",
      backgroundImage: "./assets/medi-guru-bg.png",
      projectLink: "#",
      tag: "Featured"
    },
    {
      id: 7,
      title: "Dhadkan",
      description: "A school health monitoring system for early detection of student health issues, ensuring timely medical intervention and wellness tracking.",
      contributors: "5 Students",
      duration: "4 Months",
      backgroundImage: "./assets/dhadkan-bg.png",
      projectLink: "#",
      tag: "New"
    },
    {
      id: 8,
      title: "Samadhan",
      description: "A centralized public grievance redressal system for tracking and resolving citizen complaints efficiently and transparently.",
      contributors: "6 Students",
      duration: "5 Months",
      backgroundImage: "./assets/samadhan-bg.png",
      projectLink: "#",
      tag: "Popular Now"
    }
  ]);

  // Show scroll to top button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved projects from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('studentProjects');
    if (saved) {
      setEditedProjects(JSON.parse(saved));
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEditProject = (id: number) => {
    setEditingProject(id);
  };

  const handleSaveProject = (id: number) => {
    localStorage.setItem('studentProjects', JSON.stringify(editedProjects));
    setEditingProject(null);
    toast.success('Project updated successfully!');
  };

  const handleCancelEdit = () => {
    // Reload from localStorage or reset to original
    const saved = localStorage.getItem('studentProjects');
    if (saved) {
      setEditedProjects(JSON.parse(saved));
    }
    setEditingProject(null);
  };

  const handleProjectChange = (id: number, field: 'title' | 'description' | 'contributors' | 'duration' | 'projectLink', value: string) => {
    const updated = editedProjects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    setEditedProjects(updated);
  };

  const announcements = [
    { id: 1, title: "Mid-Semester Examinations", date: "2025-10-20", content: "Mid-term exams will commence from October 20th, 2025." },
    { id: 2, title: "Faculty Development Program", date: "2025-10-18", content: "FDP on AI in Education scheduled for next week." },
    { id: 3, title: "Research Paper Submission Deadline", date: "2025-10-25", content: "Submit your research papers by October 25th." },
  ];

  const stats = [
    { icon: Users, label: "Students Enrolled", value: "2,500+" },
    { icon: BookOpen, label: "Courses Offered", value: "150+" },
    { icon: Award, label: "Faculty Members", value: "200+" },
    { icon: Clock, label: "Years of Excellence", value: "25+" },
  ];

  const departments = [
    {
      name: "Computer Science Engineering",
      description: "Cutting-edge technology and programming excellence",
      courses: ["B.Tech CSE", "M.Tech CSE", "PhD CSE"],
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Information Technology",
      description: "Innovation in information systems and digital solutions",
      courses: ["B.Tech IT", "M.Tech IT", "MCA"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Data Science & AI",
      description: "Leading research in artificial intelligence and machine learning",
      courses: ["B.Tech AI&DS", "M.Tech AI", "Research Programs"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const facultyData = [
    { name: "Dr. Anand Tamrakar", role: "HOD", img: "/images/hod.jpg" },
    { name: "Mrs. Keshika Jangde", role: "Assistant Professor", img: "/images/fac1.jpg" },
    { name: "Ms. Jyoti Gautam", role: "Assistant Professor", img: "/images/fac2.jpg" },
    { name: "Mr. Tegendra Kumar", role: "Assistant Professor", img: "/images/fac3.jpg" },
    { name: "Ms. Toshaniwali Bhargav", role: "Assistant Professor", img: "/images/fac4.jpg" },
    { name: "Ms. Upasana Khadatkar", role: "Assistant Professor", img: "/images/fac5.jpg" },
    { name: "Ms. Prapti Pandey", role: "Assistant Professor", img: "/images/fac6.jpg" },
    { name: "Ms. Preeti Tuli", role: "Assistant Professor", img: "/images/fac7.jpg" },
    { name: "Ms. Shraddha Taunk", role: "Associate Professor", img: "/images/fac8.jpg" },
    { name: "Ms. Poonam Gupta", role: "Assistant Professor", img: "/images/fac9.jpg" },
    { name: "Mr. Manoj Kumar Singh", role: "Assistant Professor", img: "/images/fac10.jpg" },
    { name: "Mr. Narendra Kumar Dewangan", role: "Senior Faculty", img: "/images/fac11.jpg" },
    { name: "Mr. Saurabh Mishra", role: "Assistant Professor", img: "/images/fac12.jpg" },
    { name: "Mr. Deepak Rao Khadatkar", role: "Associate Professor", img: "/images/fac13.jpg" },
    { name: "Mr. Vivek Kumar Soni", role: "Assistant Professor", img: "/images/fac14.jpg" },
    { name: "Mr. Vaibhav Chandrakar", role: "Assistant Professor", img: "/images/fac15.jpg" },
    { name: "Mr. Sunil Kumar Dewangan", role: "Senior Faculty", img: "/images/fac16.jpg" },
    { name: "Ms. Priyata Mishra", role: "Assistant Professor", img: "/images/fac17.jpg" },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack web application for online shopping, featuring user authentication, product management, and a payment gateway.",
      tech: "React, Node.js, Express, MongoDB"
    },
    {
      title: "AI Health Scanner",
      description: "A machine learning model trained to detect anomalies and classify medical images (like X-rays) to assist in early diagnosis.",
      tech: "Python, TensorFlow, Keras, OpenCV"
    },
    {
      title: "Campus Connect App",
      description: "A cross-platform mobile app for college event tracking, class schedules, and real-time notifications for students and faculty.",
      tech: "Flutter, Firebase, Dart"
    }
  ];

  const hod = facultyData.find((f) => f.role === "HOD");
  const others = facultyData.filter((f) => f.role !== "HOD");

  // Animated default avatar using inline SVG + motion (no external images)
  function AnimatedAvatar({ size = 96 }: { size?: number }) {
    const radius = size / 2;
    const stroke = Math.max(4, size * 0.06);
    return (
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded-full shadow-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
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
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-white relative">
        <div className="container mx-auto px-6">
          {/* Developer Edit Button */}
          {userRole === "developer" && (
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  alert("Content editing coming soon! This will open the stats editor.");
                }}
              >
                <Edit3 className="h-4 w-4" />
                Edit Stats
              </Button>
            </div>
          )}
          
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: '#800000' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Achievements
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-red-100">
                    <stat.icon className="h-8 w-8" style={{ color: '#800000' }} />
                  </div>
                </div>
                <motion.h3 
                  className="text-3xl font-bold mb-2"
                  style={{ color: '#800000' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Projects moved below Faculty (per request) */}

      {/* Faculty Section - Meet Our Faculty with 3D Carousel */}
      <section id="faculty" className="w-full py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-20 max-w-5xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative Elements */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <div className="w-1 h-1 rounded-full bg-indigo-500" />
            <div className="w-1 h-1 rounded-full bg-blue-500" />
          </motion.div>

          <motion.h2
            className="font-extrabold mb-12 tracking-tighter leading-none"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e40af 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}
          >
            Meet Our Faculty
          </motion.h2>

          {/* Description with Stunning Styling */}
          <motion.div
            className="relative max-w-4xl mx-auto px-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {/* Background Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl blur-2xl opacity-40"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            
            <p className="relative text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
              Our distinguished faculty members bring years of academic excellence and industry experience to guide students towards success.
            </p>
            
            <motion.div
              className="flex items-center justify-center gap-2 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <div className="w-1 h-1 rounded-full bg-indigo-500" />
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <motion.div
                className="h-0.5 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 3D Carousel */}
        <FacultyCarousel3D facultyData={facultyData} />
      </section>

      {/* Student Projects Section - Animated Carousel */}
      <StudentProjectsCarousel projects={editedProjects} />

      {/* Announcements Section */}
      <section id="announcements" className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: '#800000' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Latest Announcements
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className="p-3 rounded-lg" 
                        style={{ backgroundColor: 'rgba(128, 0, 0, 0.1)' }}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Bell className="h-6 w-6" style={{ color: '#800000' }} />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="mb-1">{announcement.title}</h3>
                          <span className="text-sm text-gray-500">{announcement.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{announcement.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: '#1e3a8a' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-blue-100">
                  <Phone className="h-6 w-6" style={{ color: '#1e3a8a' }} />
                </div>
              </div>
              <h3 className="font-bold mb-2" style={{ color: '#1e3a8a' }}>Phone</h3>
              <p className="text-gray-600">+91 771 123 4567</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-blue-100">
                  <Mail className="h-6 w-6" style={{ color: '#1e3a8a' }} />
                </div>
              </div>
              <h3 className="font-bold mb-2" style={{ color: '#1e3a8a' }}>Email</h3>
              <p className="text-gray-600">info@ssipmt.edu.in</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-blue-100">
                  <MapPin className="h-6 w-6" style={{ color: '#1e3a8a' }} />
                </div>
              </div>
              <h3 className="font-bold mb-2" style={{ color: '#1e3a8a' }}>Address</h3>
              <p className="text-gray-600">
                <a 
                  href="https://www.google.com/maps/place/Shri+Shankaracharya+Institute+Of+Professional+Management+%26+Technology,+Raipur/@21.1346018,81.6660459,17z/data=!3m1!4b1!4m16!1m9!4m8!1m0!1m6!1m2!1s0x3a28db1573b8526b:0x3f6847db83d1b08e!2sP.O,+Old+Dhamtari+Road,+Sejabahar,+Mujgahan,+Chhattisgarh+493661!2m2!1d81.6686208!2d21.1346018!3m5!1s0x3a28db1573b8526b:0x3f6847db83d1b08e!8m2!3d21.1346018!4d81.6686208!16s%2Fm%2F0_x9qhl?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 hover:underline transition-colors cursor-pointer"
                >
                  SSIPMT Campus, Raipur, Chhattisgarh
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Section - Welcome Section moved before footer */}
      <section id="home" className="relative h-[500px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760131556605-7f2e63d00385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDF8fHx8MTc2MDQxOTI4NXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(96, 165, 250, 0.7) 100%)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <motion.h1 
              className="text-5xl mb-4 font-bold"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Thank you for visiting the CSE Department Portal
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A comprehensive platform for faculty, students, and administrators
              to streamline academic operations and enhance learning experiences
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onNavigateToLogin} 
                size="lg" 
                className="text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#f97316' }}
              >
                Login to continue your journey
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full text-white shadow-lg z-50"
          style={{ backgroundColor: '#1e3a8a' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
}
