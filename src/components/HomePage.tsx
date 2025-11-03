import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Bell, Mail, Linkedin, Youtube, Phone, MapPin, Clock, Users, BookOpen, Award, ChevronUp, ChevronDown, Edit3, Edit2, Save, X, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FacultyCard } from "./common/FacultyCard";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

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
  const [editingProject, setEditingProject] = useState<string | null>(null);
  
  // Base student projects array - modular and editable
  const baseStudentProjects = [
    {
      id: "greenpalna",
      title: "Green Palna",
      description: "Green Palna encourages environmental responsibility and health awareness by distributing saplings and promoting plant-based nutrition for sustainable living.",
      image: "./assets/green-palna-bg.png",
      tag: "Popular Now",
      contributors: "6 Students",
      duration: "3 Months"
    },
    {
      id: "hargharmonga",
      title: "Har Ghar Munga",
      description: "Project Har Ghar Munga promotes sustainability and fights anemia by planting drumstick saplings and encouraging the use of moringa and fenugreek in diets.",
      image: "./assets/har-ghar-munga-bg.png",
      tag: null,
      contributors: "6 Students",
      duration: "4 Months"
    },
    {
      id: "hariharpathsala",
      title: "Harihar Pathsala",
      description: "Harihar Pathsala promotes health, nutrition, and eco-awareness by giving children saplings to plant and spreading TB prevention and nutrition education.",
      image: "./assets/harihar-pathsala-bg.png",
      tag: null,
      contributors: "8 Students",
      duration: "5 Months"
    }
  ];

  // Dynamically extend to 9 cards (3 base × 3)
  const extendedProjects = [...baseStudentProjects, ...baseStudentProjects, ...baseStudentProjects];
  
  const [editedProjects, setEditedProjects] = useState(extendedProjects);

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

  const handleEditProject = (id: string) => {
    setEditingProject(id);
  };

  const handleSaveProject = (id: string) => {
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

  const handleProjectChange = (id: string, field: 'title' | 'description' | 'contributors' | 'duration' | 'tag', value: string) => {
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

      {/* Faculty Section - Meet Our Faculty */}
      <section id="faculty" className="w-full py-20 bg-gradient-to-b from-gray-50 to-white relative">
        {/* Developer Edit Button */}
        {userRole === "developer" && (
          <div className="absolute top-4 right-4 z-20">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => {
                alert("Content editing coming soon! This will open the faculty editor.");
              }}
            >
              <Edit3 className="h-4 w-4" />
              Edit Faculty
            </Button>
          </div>
        )}
        
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

      {/* Student Projects Section - Swiper Carousel */}
      <div className="projects-section emotions-slider">
        <div className="container mx-auto px-6">
          <h2 className="section-title">Student Projects</h2>
          <p className="section-subtitle">Explore innovative projects crafted by our talented students</p>
          
          <div className="swiper-container-wrapper">
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              spaceBetween={20}
              speed={600}
              initialSlide={1}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10
                },
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 15
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30
                }
              }}
              className="projects-swiper"
            >
              {editedProjects.map((project, index) => (
                <SwiperSlide key={`${project.id}-${index}`} className="project-slide">
                  <div 
                    className="project-card-swiper"
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    {project.tag && (
                      <span className="project-tag">{project.tag}</span>
                    )}
                    
                    <div className="project-content">
                      {editingProject === project.id ? (
                        <div className="edit-form">
                          <div className="edit-controls">
                            <button onClick={() => handleSaveProject(project.id)} className="save-btn">
                              <Save size={16} />
                            </button>
                            <button onClick={handleCancelEdit} className="cancel-btn">
                              <X size={16} />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                            className="edit-title"
                            placeholder="Project Title"
                          />
                          <textarea
                            value={project.description}
                            onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                            className="edit-description"
                            rows={3}
                            placeholder="Project Description"
                          />
                          <div className="edit-stats">
                            <input
                              type="text"
                              value={project.contributors}
                              onChange={(e) => handleProjectChange(project.id, 'contributors', e.target.value)}
                              className="edit-stat"
                              placeholder="Contributors"
                            />
                            <input
                              type="text"
                              value={project.duration}
                              onChange={(e) => handleProjectChange(project.id, 'duration', e.target.value)}
                              className="edit-stat"
                              placeholder="Duration"
                            />
                          </div>
                          <input
                            type="text"
                            value={project.tag || ''}
                            onChange={(e) => handleProjectChange(project.id, 'tag', e.target.value)}
                            className="edit-link"
                            placeholder="Tag (e.g., Popular Now)"
                          />
                        </div>
                      ) : (
                        <>
                          {(userRole === 'admin' || userRole === 'hod') && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditProject(project.id);
                              }}
                              className="edit-btn"
                            >
                              <Edit2 size={16} />
                            </button>
                          )}
                          <h3 className="project-title">{project.title}</h3>
                          <p className="project-description">{project.description}</p>
                          <div className="project-stats">
                            <span className="stat">{project.contributors}</span>
                            <span className="stat">{project.duration}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
            <div className="swiper-button-prev slider-nav-btn"></div>
            <div className="swiper-button-next slider-nav-btn"></div>
            
            {/* Pagination */}
            <div className="swiper-pagination"></div>
          </div>

          {/* View More Button */}
          <motion.div
            className="view-more-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={() => onNavigateToCOE?.("projects")}
              className="view-more-btn"
            >
              View More Projects
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* --- Student Projects Section --- */
        .projects-section {
          padding: 60px 20px;
          background-color: #f4f4f4;
          text-align: center;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--grey-text, #333);
          margin-bottom: 20px;
          font-family: 'Gotham', sans-serif;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 40px;
          font-weight: 400;
        }

        /* Swiper Container Wrapper */
        .swiper-container-wrapper {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 60px;
        }

        /* Swiper Slide Styling */
        .project-slide {
          width: 350px !important;
          height: auto;
        }

        .projects-swiper {
          padding-bottom: 60px;
        }

        .project-card-swiper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 450px;
          background-size: cover;
          background-position: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: grab;
        }

        .project-card-swiper:active {
          cursor: grabbing;
        }

        /* Active Slide Effect */
        .swiper-slide-active .project-card-swiper {
          transform: scale(1.05);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
        }

        /* Inactive Slides */
        .swiper-slide:not(.swiper-slide-active) .project-card-swiper {
          opacity: 0.7;
          transform: scale(0.95);
        }

        /* Project Tag */
        .project-tag {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(238, 90, 111, 0.4);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .project-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          min-height: 450px;
          background-size: cover;
          background-position: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
        }

        .project-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1));
          color: white;
          padding: 30px 25px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 100%;
        }

        .edit-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .edit-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          height: 100%;
          justify-content: space-between;
        }

        .edit-controls {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-bottom: 10px;
        }

        .save-btn, .cancel-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .save-btn:hover {
          background: rgba(34, 197, 94, 0.3);
        }

        .cancel-btn:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        .edit-title {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 1.6rem;
          font-weight: 700;
          font-family: 'Gotham', sans-serif;
          backdrop-filter: blur(10px);
        }

        .edit-title::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .edit-description {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 0.95rem;
          line-height: 1.6;
          resize: vertical;
          min-height: 80px;
          backdrop-filter: blur(10px);
          font-family: inherit;
        }

        .edit-description::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .edit-stats {
          display: flex;
          gap: 10px;
        }

        .edit-stat {
          flex: 1;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 8px 12px;
          color: white;
          font-size: 0.85rem;
          backdrop-filter: blur(10px);
        }

        .edit-stat::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .edit-link {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 0.9rem;
          backdrop-filter: blur(10px);
        }

        .edit-link::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .project-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 12px;
          font-family: 'Gotham', sans-serif;
        }

        .project-description {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
          opacity: 0.9;
        }

        .project-stats {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .stat {
          background: rgba(255, 255, 255, 0.2);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        /* View More Button */
        .view-more-container {
          margin-top: 40px;
          display: flex;
          justify-content: center;
        }

        .view-more-btn {
          background: linear-gradient(135deg, #800000, #a00000);
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(128, 0, 0, 0.3);
          font-family: 'Gotham', sans-serif;
        }

        .view-more-btn:hover {
          background: linear-gradient(135deg, #a00000, #c00000);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(128, 0, 0, 0.4);
        }

        .view-more-btn:active {
          transform: translateY(0);
        }

        /* Swiper Navigation Buttons */
        .slider-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #800000, #a00000);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(128, 0, 0, 0.3);
        }

        .slider-nav-btn:hover {
          background: linear-gradient(135deg, #a00000, #c00000);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(128, 0, 0, 0.4);
        }

        .slider-nav-btn.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .swiper-button-prev {
          left: 0;
        }

        .swiper-button-next {
          right: 0;
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 20px;
          color: white;
          font-weight: bold;
        }

        /* Swiper Pagination */
        .swiper-pagination {
          bottom: 20px !important;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #ccc;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: #800000;
          opacity: 1;
          width: 30px;
          border-radius: 6px;
        }

        /* Responsive Swiper Adjustments */
        @media (max-width: 1024px) {
          .swiper-container-wrapper {
            padding: 30px 50px;
          }
          
          .project-slide {
            width: 300px !important;
          }
        }

        @media (max-width: 768px) {
          .swiper-container-wrapper {
            padding: 20px 40px;
          }

          .project-slide {
            width: 280px !important;
          }

          .project-card-swiper {
            min-height: 400px;
          }

          .slider-nav-btn {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 640px) {
          .swiper-container-wrapper {
            padding: 15px 30px;
          }

          .project-slide {
            width: 260px !important;
          }

          .section-title {
            font-size: 2rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }
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
