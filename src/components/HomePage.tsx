import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Bell, Mail, Linkedin, Youtube, Phone, MapPin, Clock, Users, BookOpen, Award, ChevronUp, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FacultyCard } from "./common/FacultyCard";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface HomePageProps {
  onNavigateToLogin: () => void;
}

export function HomePage({ onNavigateToLogin }: HomePageProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [clubsDropdownOpen, setClubsDropdownOpen] = useState(false);

  // Show scroll to top button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
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
      <section id="stats" className="py-16 bg-white">
        <div className="container mx-auto px-6">
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
                  <div className="p-4 rounded-full bg-blue-50">
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

      {/* Faculty Section - Meet Our Faculty */}
      <section id="faculty" className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#800000' }}>
            Meet Our Faculty
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto px-6">
            Our distinguished faculty members bring years of academic excellence and industry experience to guide students towards success.
          </p>
        </motion.div>

        {/* Horizontal Stack Container for Faculty Cards */}
        <div className="relative">
          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Horizontal Scrolling Faculty Cards Container */}
          <motion.div 
            className="flex gap-8 overflow-x-auto scrollbar-hide px-8 pb-6"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Render Faculty Cards using the new component */}
            {facultyData.map((faculty, index) => (
              <FacultyCard
                key={index}
                name={faculty.name}
                title={faculty.role}
                department="Computer Science Engineering"
                image={faculty.img}
                isHOD={faculty.role === "HOD"}
                index={index}
              />
            ))}
          </motion.div>
          
          {/* Scroll Navigation Hint */}
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-2 text-gray-500 text-sm bg-white px-6 py-3 rounded-full shadow-md border border-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="font-medium">Scroll to explore our faculty</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Custom CSS for styling */}
  <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            scroll-snap-type: x mandatory;
          }
          .scrollbar-hide > * {
            scroll-snap-align: start;
          }
        `}</style>
      </section>

      {/* --- Student Projects Section --- */}
      <div className="projects-section">
        <div className="container">
          <h2 className="section-title">Student Projects</h2>
          
          <div className="projects-grid">
            
            {/* Card 1 */}
            <div 
              className="project-card"
              style={{ backgroundImage: "url('https://placehold.co/600x400/34495e/white?text=Project+Image')" }}
            >
              <div className="project-card-content">
                <h3>E-Commerce Platform</h3>
                <p>A full-stack web application for online shopping, featuring user authentication, product management, and a payment gateway.</p>
                <div className="project-tags">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">MongoDB</span>
                </div>
                <a href="#" className="project-btn">View Project</a>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              className="project-card"
              style={{ backgroundImage: "url('https://placehold.co/600x400/8e44ad/white?text=Project+Image')" }}
            >
              <div className="project-card-content">
                <h3>AI Health Scanner</h3>
                <p>A machine learning model trained to detect anomalies and classify medical images (like X-rays) to assist in early diagnosis.</p>
                <div className="project-tags">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">TensorFlow</span>
                  <span className="tech-tag">Keras</span>
                </div>
                <a href="#" className="project-btn">View Project</a>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              className="project-card"
              style={{ backgroundImage: "url('https://placehold.co/600x400/2c3e50/white?text=Project+Image')" }}
            >
              <div className="project-card-content">
                <h3>Campus Connect App</h3>
                <p>A cross-platform mobile app for college event tracking, class schedules, and real-time notifications for students and faculty.</p>
                <div className="project-tags">
                  <span className="tech-tag">Flutter</span>
                  <span className="tech-tag">Firebase</span>
                  <span className="tech-tag">Dart</span>
                </div>
                <a href="#" className="project-btn">View Project</a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        /* --- Student Projects Section --- */
        .projects-section {
          padding: 60px 20px;
          background-color: #f4f4f4; /* Updated background to match body */
          text-align: center;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--grey-text, #333);
          margin-bottom: 40px;
          font-family: 'Gotham', sans-serif;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .project-card {
          position: relative; /* Needed for the gradient overlay */
          border-radius: 16px; /* More rounded corners */
          overflow: hidden; /* Clips the image to the border-radius */
          min-height: 450px; /* Gives the card a uniform height */
          
          /* Background image (set via inline style in JSX) */
          background-size: cover;
          background-position: center;
          
          /* Flex to push content to the bottom */
          display: flex;
          flex-direction: column;
          justify-content: flex-end; /* Aligns content to the bottom */

          color: #ffffff; /* All text inside is white */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        /* This is the dark gradient overlay at the bottom */
        .project-card::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
          z-index: 1; /* Sits below content, above image */
        }

        /* Wrapper for all text content */
        .project-card-content {
          position: relative;
          z-index: 2; /* Sits on top of the gradient */
          padding: 24px;
        }

        .project-card h3 {
          font-size: 1.7rem; /* Larger title */
          font-weight: 700;
          color: #ffffff;
          margin-top: 0;
          margin-bottom: 8px;
          font-family: 'Gotham', sans-serif;
        }

        .project-card p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #e0e0e0; /* Slightly off-white for description */
          margin-bottom: 16px;
        }

        /* New Tags section */
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .tech-tag {
          background: rgba(255, 255, 255, 0.15); /* Semi-transparent white */
          backdrop-filter: blur(5px); /* Frosted glass effect */
          color: #ffffff;
          padding: 5px 12px;
          border-radius: 99px; /* Pill shape */
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* New Button */
        .project-btn {
          display: block;
          background: #ffffff;
          color: #000000;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 99px; /* Pill shape */
          text-align: center;
          font-weight: 600;
          transition: transform 0.2s ease, background-color 0.2s ease;
          font-family: 'Gotham', sans-serif;
        }

        .project-btn:hover {
          transform: scale(1.03);
          background-color: #f0f0f0;
        }
      `}</style>

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
              className="text-5xl mb-4"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to CSE Department Portal
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A comprehensive platform for faculty, students, and administrators
              to streamline academic operations and enhance learning experiences.
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
                Login to Continue
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="text-white py-16" style={{ backgroundColor: '#1e3a8a' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://ssipmt.edu.in/assets/images/logo/logo.jpg?v2"
                  alt="SSIPMT Logo"
                  className="h-12 w-12 rounded-full mr-3"
                />
                <h3 className="text-xl font-bold">SSIPMT</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Excellence in technical education and research, fostering innovation and leadership for a better tomorrow.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Youtube className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={scrollToTop} className="text-gray-300 hover:text-white transition-colors text-left">Home</button></li>
                <li 
                  className="relative"
                  onMouseEnter={() => setClubsDropdownOpen(true)}
                  onMouseLeave={() => setClubsDropdownOpen(false)}
                >
                  <button 
                    className="text-gray-300 hover:text-white transition-colors text-left flex items-center gap-1 w-full"
                  >
                    Clubs
                    <ChevronDown className={`h-4 w-4 transition-transform ${clubsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {clubsDropdownOpen && (
                    <ul className="ml-4 mt-2 space-y-1">
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">COE</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">CSA</a></li>
                    </ul>
                  )}
                </li>
                <li><button onClick={() => scrollToSection('faculty')} className="text-gray-300 hover:text-white transition-colors text-left">Faculty</button></li>
                <li><button onClick={() => scrollToSection('announcements')} className="text-gray-300 hover:text-white transition-colors text-left">Announcements</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors text-left">Contact</button></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-4">Programs</h3>
              <ul className="space-y-2 text-gray-300">
                <li>B.Tech</li>
                <li>M.Tech</li>
                <li>PhD</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <a 
                    href="https://www.google.com/maps/place/Shri+Shankaracharya+Institute+Of+Professional+Management+%26+Technology,+Raipur/@21.1346018,81.6660459,17z/data=!3m1!4b1!4m16!1m9!4m8!1m0!1m6!1m2!1s0x3a28db1573b8526b:0x3f6847db83d1b08e!2sP.O,+Old+Dhamtari+Road,+Sejabahar,+Mujgahan,+Chhattisgarh+493661!2m2!1d81.6686208!2d21.1346018!3m5!1s0x3a28db1573b8526b:0x3f6847db83d1b08e!8m2!3d21.1346018!4d81.6686208!16s%2Fm%2F0_x9qhl?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors cursor-pointer"
                  >
                    SSIPMT Campus, Raipur, Chhattisgarh, India
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>+91 771 123 4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>info@ssipmt.edu.in</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-gray-600 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm mb-4 md:mb-0">
                © 2025 SSIPMT Raipur. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-gray-300">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
