import React, { useState } from "react";
import { motion } from "motion/react";
import { Code2, Smartphone, Brain, Server, Lightbulb, Rocket, Users, Award, Calendar, Mail, Phone, MapPin, Github, Linkedin, Instagram, ChevronRight, ExternalLink, X, Target, Eye, CheckCircle } from "lucide-react";

const PRIMARY = "#0a1930"; // Deep blue
const ACCENT = "#00bcd4"; // Cyan
const BG_LIGHT = "#ffffff";
const BG_DARK = "#0f172a";

interface Project {
  title: string;
  description: string;
  category: string;
  techStack: string[];
}

interface TeamMember {
  name: string;
  role: string;
  skills: string[];
  email?: string;
  github?: string;
  linkedin?: string;
  projects?: string[];
}

interface FacultyMember {
  name: string;
  designation: string;
  expertise: string;
  bio: string;
  research?: string[];
  publications?: string[];
  email?: string;
}

export default function CentreOfExcellence() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>("All");

  const projects: Project[] = [
    {
      title: "Green Palna",
      description: "Green Palna links childbirth with environmental care by gifting new mothers five fruit saplings to nurture, tracked through an app promoting sustainability and nutrition.",
      category: "Govt",
      techStack: ["Shreyansh Golchha", "Garv Choure", "Yashwant Nayak", "Karsh Verma", "Tanmay Sahua", "Piyush Verma", "Tanay Pandey", "Churamani Kaushik", "Shivam Dhamejani"],
    },
    {
      title: "Har Ghar Munga",
      description: "Project Har Ghar Munga promotes sustainability and fights anemia by planting drumstick saplings and encouraging the use of moringa and fenugreek in diets.",
      category: "Web",
      techStack: ["Garv Choure", "Shreyansh Golchha", "Vedansh Chandrakar", "G Anjani", "Tanmay Sahu", "Shivam Dhamejani"],
    },
    {
      title: "Harihar Pathsala",
      description: "Harihar Pathsala promotes health, nutrition, and eco-awareness by giving children saplings to plant and spreading TB prevention and nutrition education.",
      category: "App",
      techStack: ["Piyush Verma", "Tanmay Sahu", "G Anjani", "Vedansh Chandrakar", "Shreyansh Golchha", "Garv Choure", "Shivam Dhamejani", "Yashwant Nayak"],
    },
    {
      title: "Smriti Pustakalaya Yojana",
      description: "Smriti Pustakalaya Yojana promotes digital book donations for education. Chhanv offers health check-ups and welfare access for government staff and families.",
      category: "AI",
      techStack: ["Vedansh Chandrakar", "Shreyansh Golchha", "Karsh Verma", "Ayush Mishra", "Shriyansh Upadhyay", "Roshan ShreeKumar", "Garv Choure", "Tanmay Sahu"],
    },
    {
      title: "Chhanv",
      description: "Chhanv provides government officials and their families with health check-ups and welfare scheme access, promoting health, awareness, and overall well-being.",
      category: "Startup",
      techStack: ["Shreyansh Golchha", "Yashwant Nayak", "Pulkita Verma", "Anshuman Verma", "Akash Verma", "Vedansh Chandrakar"],
    },
    {
      title: "Medi Guru",
      description: "Medi Guru is a web platform for virtual medical training of government doctors to improve healthcare services.",
      category: "Web",
      techStack: ["Yashwant Nayak", "Shreyansh Golchha", "Pulkita Verma", "Akash Verma", "Vedansh Chandrakar"],
    },
  ];

  // Comprehensive team member database
  const allTeamMembers: TeamMember[] = [
    { name: "Shreyansh Golchha", role: "Full Stack Developer", skills: ["React", "Node.js", "MongoDB"], email: "shreyansh@example.com", projects: ["Green Palna", "Har Ghar Munga", "Smriti Pustakalaya Yojana", "Chhanv", "Medi Guru"] },
    { name: "Garv Choure", role: "Frontend Developer", skills: ["React", "TypeScript", "Tailwind"], email: "garv@example.com", projects: ["Green Palna", "Har Ghar Munga", "Harihar Pathsala", "Smriti Pustakalaya Yojana"] },
    { name: "Yashwant Nayak", role: "Backend Developer", skills: ["Node.js", "Express", "PostgreSQL"], email: "yashwant@example.com", projects: ["Green Palna", "Harihar Pathsala", "Chhanv", "Medi Guru"] },
    { name: "Karsh Verma", role: "Full Stack Developer", skills: ["MERN Stack", "AWS", "Docker"], email: "karsh@example.com", projects: ["Green Palna", "Smriti Pustakalaya Yojana"] },
    { name: "Tanmay Sahu", role: "Mobile App Developer", skills: ["Flutter", "Firebase", "Dart"], email: "tanmay@example.com", projects: ["Green Palna", "Har Ghar Munga", "Harihar Pathsala", "Smriti Pustakalaya Yojana"] },
    { name: "Piyush Verma", role: "UI/UX Developer", skills: ["Figma", "React", "CSS"], email: "piyush@example.com", projects: ["Green Palna", "Harihar Pathsala"] },
    { name: "Tanay Pandey", role: "Backend Developer", skills: ["Python", "Django", "REST API"], email: "tanay@example.com", projects: ["Green Palna"] },
    { name: "Churamani Kaushik", role: "DevOps Engineer", skills: ["Docker", "Kubernetes", "CI/CD"], email: "churamani@example.com", projects: ["Green Palna"] },
    { name: "Shivam Dhamejani", role: "Full Stack Developer", skills: ["Next.js", "TypeScript", "PostgreSQL"], email: "shivam@example.com", projects: ["Green Palna", "Har Ghar Munga", "Harihar Pathsala"] },
    { name: "Vedansh Chandrakar", role: "Frontend Developer", skills: ["React", "Redux", "Material-UI"], email: "vedansh@example.com", projects: ["Har Ghar Munga", "Harihar Pathsala", "Smriti Pustakalaya Yojana", "Chhanv", "Medi Guru"] },
    { name: "G Anjani", role: "Backend Developer", skills: ["Java", "Spring Boot", "MySQL"], email: "anjani@example.com", projects: ["Har Ghar Munga", "Harihar Pathsala"] },
    { name: "Ayush Mishra", role: "AI/ML Engineer", skills: ["Python", "TensorFlow", "OpenCV"], email: "ayush@example.com", projects: ["Smriti Pustakalaya Yojana"] },
    { name: "Shriyansh Upadhyay", role: "Data Scientist", skills: ["Python", "Pandas", "Scikit-learn"], email: "shriyansh@example.com", projects: ["Smriti Pustakalaya Yojana"] },
    { name: "Roshan ShreeKumar", role: "Cloud Engineer", skills: ["AWS", "Azure", "Docker"], email: "roshan@example.com", projects: ["Smriti Pustakalaya Yojana"] },
    { name: "Pulkita Verma", role: "Mobile Developer", skills: ["React Native", "Flutter", "Firebase"], email: "pulkita@example.com", projects: ["Chhanv", "Medi Guru"] },
    { name: "Anshuman Verma", role: "QA Engineer", skills: ["Jest", "Selenium", "Cypress"], email: "anshuman@example.com", projects: ["Chhanv"] },
    { name: "Akash Verma", role: "Full Stack Developer", skills: ["Vue.js", "Node.js", "MongoDB"], email: "akash@example.com", projects: ["Chhanv", "Medi Guru"] },
  ];

  const teamMembers: TeamMember[] = [
    { name: "Rahul Sharma", role: "Frontend Developer", skills: ["React", "TypeScript", "Tailwind"] },
    { name: "Priya Gupta", role: "App Developer", skills: ["Flutter", "Firebase", "Dart"] },
    { name: "Arjun Patel", role: "AI/ML Engineer", skills: ["Python", "TensorFlow", "PyTorch"] },
    { name: "Sneha Verma", role: "Full Stack Developer", skills: ["MERN", "PostgreSQL", "AWS"] },
  ];

  const facultyMembers: FacultyMember[] = [
    {
      name: "Mr. Saurabh Vashisth",
      designation: "Coordinator",
      expertise: "Assistant Professor",
      bio: "Prof. Sinha brings extensive experience in mobile development and Internet of Things. She leads the IoT lab and has successfully delivered multiple government IoT projects.",
      research: ["IoT Systems", "Mobile Computing", "Embedded Systems"],
      publications: ["15+ research publications", "3 patents in IoT domain"],
      email: "ananya.sinha@ssipmt.edu",
    },
  ];

  const filteredProjects = projectFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  return (
    <div style={{ background: BG_LIGHT, minHeight: '100vh', fontFamily: 'Poppins, Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ background: PRIMARY }} className="sticky top-0 z-50 w-full shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div style={{ color: ACCENT }}>
              <Rocket size={32} />
            </div>
            <h1 className="text-white text-xl font-bold">Centre of Excellence – CSE</h1>
          </div>
          <button 
            className="rounded-full h-11 px-6 py-2 text-white text-sm font-bold tracking-wide transition-all hover:scale-105 hover:shadow-lg flex items-center gap-2"
            style={{ background: ACCENT }}
          >
            Join the Club
          </button>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${BG_DARK} 100%)`, minHeight: '90vh' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full" style={{ background: ACCENT, filter: 'blur(100px)' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full" style={{ background: ACCENT, filter: 'blur(120px)' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[90vh] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8"
              style={{ letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Centre of Excellence
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-4xl font-semibold mb-6"
              style={{ color: ACCENT }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Computer Science & Engineering
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Where Innovation Meets Real-World Impact
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              A collaborative space where students design, develop, and deliver real-world projects — 
              from government solutions to cutting-edge apps and websites.
            </motion.p>

            {/* Primary Action Buttons - Centered with equal spacing */}
            <motion.div
              className="py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
                <button 
                  className="w-full sm:w-auto rounded-full h-14 px-10 py-3 text-base font-bold tracking-wide transition-all hover:scale-105 hover:shadow-xl border-2 flex items-center justify-center gap-3"
                  style={{ background: 'transparent', color: 'white', borderColor: ACCENT, minWidth: '220px' }}
                >
                  Explore Our Projects <ExternalLink size={18} />
                </button>
              </div>
            </motion.div>

            {/* Category Tags - Responsive Grid Layout */}
            <motion.div 
              className="py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center items-center">
                {["Web Development", "Innovation", "Govt Projects", "Teamwork", "IoT"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-8 py-3 rounded-full text-sm font-medium transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
                    style={{ 
                      background: 'rgba(0, 188, 212, 0.15)', 
                      color: ACCENT, 
                      border: `1px solid ${ACCENT}`,
                      minWidth: '160px',
                      textAlign: 'center'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, height: '2px', width: '100%' }}></div>

      {/* 2. ABOUT THE CENTRE */}
      <section className="py-24 px-6 bg-white" style={{ borderTop: `1px solid rgba(0, 188, 212, 0.1)` }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 mt-12" style={{ color: PRIMARY }}>
              About the Centre
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              The Centre of Excellence in CSE is more than just a club — it's a <strong>launchpad for innovation</strong>. 
              Here, students transform classroom knowledge into tangible products, working on both academic and government-funded projects. 
              Every student gains hands-on experience in software design, full-stack development, data analytics, and real-time implementation.
            </p>
          </motion.div>

          {/* Mission, Vision, Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-cyan-100 flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: PRIMARY }}>
                <Target size={32} color="white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: PRIMARY }}>Mission</h3>
              <p className="text-gray-700 leading-relaxed text-left">
                To nurture technical excellence through real project-based learning and bridge the gap between academia and industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-cyan-100 flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: ACCENT }}>
                <Eye size={32} color="white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: PRIMARY }}>Vision</h3>
              <p className="text-gray-700 leading-relaxed text-left">
                To become a nationally recognized innovation hub empowering students to create meaningful technological impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-cyan-100 flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: PRIMARY }}>
                <CheckCircle size={32} color="white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: PRIMARY }}>Objectives</h3>
              <ul className="space-y-3 text-gray-700 text-sm text-left">
                <li className="flex items-start gap-2">
                  <span style={{ color: ACCENT }} className="mt-1">•</span>
                  <span>Build real software and web applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: ACCENT }} className="mt-1">•</span>
                  <span>Collaborate with government & industry projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: ACCENT }} className="mt-1">•</span>
                  <span>Upskill students in AI, ML, Cloud, IoT</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: ACCENT }} className="mt-1">•</span>
                  <span>Foster teamwork and entrepreneurship</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, height: '2px', width: '100%' }}></div>

      {/* What We Do */}
      <section className="py-24 px-6" style={{ background: BG_LIGHT, borderTop: `1px solid rgba(0, 188, 212, 0.1)` }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 mt-12"
            style={{ color: PRIMARY }}
          >
            What We Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 mb-16 text-lg"
          >
            Core areas of innovation and technical focus
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Code2, title: "Web Development", desc: "Front-end, back-end, and full-stack projects with modern frameworks", color: ACCENT },
              { icon: Smartphone, title: "App Development", desc: "Android, iOS, and cross-platform mobile applications", color: "#10b981" },
              { icon: Server, title: "Government Projects", desc: "Paid live projects under government schemes and initiatives", color: "#f59e0b" },
              { icon: Brain, title: "AI & Data Science", desc: "Predictive models, data dashboards, and AI tools", color: "#8b5cf6" },
              { icon: Lightbulb, title: "IoT & Automation", desc: "Smart device prototypes and automation systems", color: "#ef4444" },
              { icon: Rocket, title: "Startup Incubation", desc: "Student teams developing their own ventures", color: "#ec4899" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ background: `${item.color}20` }}>
                  <item.icon size={32} color={item.color} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: PRIMARY }}>{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, height: '2px', width: '100%' }}></div>

      {/* 4. PROJECT SHOWCASE */}
      <section className="py-24 px-6 bg-white" style={{ borderTop: `1px solid rgba(0, 188, 212, 0.1)` }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 mt-12" 
            style={{ color: PRIMARY }}
          >
            Project Showcase
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 mb-12 text-lg"
          >
            Explore our active and completed projects
          </motion.p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {["All", "Web", "App", "AI", "Govt", "Startup"].map((filter) => (
              <button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 flex items-center justify-center"
                style={{
                  background: projectFilter === filter ? ACCENT : 'transparent',
                  color: projectFilter === filter ? 'white' : PRIMARY,
                  border: `2px solid ${projectFilter === filter ? ACCENT : '#e5e7eb'}`,
                  minWidth: '100px'
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
                onClick={() => setSelectedProject(project)}
              >
                <div className="h-48 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})` }}>
                  <Code2 size={64} color="white" opacity={0.3} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${ACCENT}20`, color: ACCENT }}>
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: PRIMARY }}>{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.title === "Green Palna" || project.title === "Har Ghar Munga" || project.title === "Harihar Pathsala" || project.title === "Smriti Pustakalaya Yojana" || project.title === "Chhanv" || project.title === "Medi Guru") ? (
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                        Team Member
                      </span>
                    ) : (
                      project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                          {tech}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, height: '2px', width: '100%' }}></div>

      {/* 5. STUDENT OPPORTUNITIES */}
      <section className="py-24 px-6" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${BG_DARK} 100%)`, borderTop: `1px solid rgba(0, 188, 212, 0.2)` }}>
        <div className="max-w-6xl mx-auto text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-8 mt-12"
          >
            Student Opportunities & Benefits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 mb-16 max-w-3xl mx-auto"
          >
            Every member learns by building. You'll not only enhance your technical skills but also gain exposure to industry-style development practices.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Award, text: "Work on live, paid projects" },
              { icon: Users, text: "Learn from real mentors and faculty" },
              { icon: CheckCircle, text: "Earn experience certificates & stipends" },
              { icon: Rocket, text: "Get featured on official SSIPMT website" },
              { icon: Lightbulb, text: "Build your professional portfolio" },
              { icon: Calendar, text: "Attend national-level tech competitions" },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 p-8 rounded-xl"
                style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}
              >
                <benefit.icon size={40} color={ACCENT} />
                <p className="text-white font-medium">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, height: '2px', width: '100%' }}></div>

      {/* 6. OUR TEAM */}
      <section className="py-24 px-6 bg-white" style={{ borderTop: `1px solid rgba(0, 188, 212, 0.1)` }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 mt-12" 
            style={{ color: PRIMARY }}
          >
            Our Team
          </motion.h2>

          {/* Student Members */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-10" style={{ color: ACCENT }}>Student Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white" style={{ background: ACCENT }}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-lg font-bold text-center mb-1" style={{ color: PRIMARY }}>{member.name}</h4>
                  <p className="text-sm text-center mb-3" style={{ color: ACCENT }}>{member.role}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill) => (
                      <span key={skill} className="text-xs px-2 py-1 rounded bg-white text-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Faculty Mentors */}
          <div>
            <h3 className="text-2xl font-bold mb-10" style={{ color: ACCENT }}>Faculty Mentors</h3>
            <div className="flex justify-center">
              {facultyMembers.map((faculty, i) => (
                <motion.div
                  key={faculty.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-100 max-w-sm"
                  onClick={() => setSelectedFaculty(faculty)}
                >
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white" style={{ background: PRIMARY }}>
                    {faculty.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-xl font-bold text-center mb-1" style={{ color: PRIMARY }}>{faculty.name}</h4>
                  <p className="text-sm text-center mb-2 font-semibold" style={{ color: ACCENT }}>{faculty.designation}</p>
                  <p className="text-sm text-center text-gray-600 mb-4">{faculty.expertise}</p>
                  <button className="w-full py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center" style={{ background: `${ACCENT}20`, color: ACCENT }}>
                    View Bio
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, height: '2px', width: '100%' }}></div>

      {/* 10. CONTACT */}
      <section className="py-24 px-6" style={{ background: '#f8fafc', borderTop: `1px solid rgba(0, 188, 212, 0.1)` }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 mt-12" 
            style={{ color: PRIMARY }}
          >
            Connect With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 mb-16 text-lg"
          >
            Interested in joining or collaborating with the Centre of Excellence?
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-8" style={{ color: PRIMARY }}>Send us a message</h3>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-cyan-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="w-full rounded-full h-12 py-3 text-white font-bold tracking-wide transition-all hover:scale-105 flex items-center justify-center"
                  style={{ background: ACCENT }}
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}20` }}>
                  <MapPin size={24} color={ACCENT} />
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: PRIMARY }}>Address</h4>
                  <p className="text-gray-600">SSIPMT, Old Dhamtari Road, Sejbahar, Raipur – 492015</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}20` }}>
                  <Mail size={24} color={ACCENT} />
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: PRIMARY }}>Email</h4>
                  <p className="text-gray-600">coe@ssipmt.edu</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}20` }}>
                  <Phone size={24} color={ACCENT} />
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: PRIMARY }}>Phone</h4>
                  <p className="text-gray-600">+91-771-3501600</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold mb-4" style={{ color: PRIMARY }}>Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: PRIMARY }}>
                    <Linkedin size={24} color="white" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: PRIMARY }}>
                    <Instagram size={24} color="white" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: PRIMARY }}>
                    <Github size={24} color="white" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 text-white" style={{ background: PRIMARY }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <Rocket size={32} color={ACCENT} />
              <div>
                <p className="font-bold text-lg">Centre of Excellence</p>
                <p className="text-sm text-gray-400">SSIPMT Raipur</p>
              </div>
            </div>
            
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-cyan-400 transition-colors">Home</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Faculty</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>Copyright © 2025 SSIPMT Raipur | All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block" style={{ background: `${ACCENT}20`, color: ACCENT }}>
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl font-bold" style={{ color: PRIMARY }}>{selectedProject.title}</h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">{selectedProject.description}</p>
            <div className="mb-6">
              <h4 className="font-bold mb-3" style={{ color: PRIMARY }}>
                {(selectedProject.title === "Green Palna" || selectedProject.title === "Har Ghar Munga" || selectedProject.title === "Harihar Pathsala" || selectedProject.title === "Smriti Pustakalaya Yojana" || selectedProject.title === "Chhanv" || selectedProject.title === "Medi Guru") ? "Team Members (Click to view profile)" : "Tech Stack"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => {
                  const isTeamMember = (selectedProject.title === "Green Palna" || selectedProject.title === "Har Ghar Munga" || selectedProject.title === "Harihar Pathsala" || selectedProject.title === "Smriti Pustakalaya Yojana" || selectedProject.title === "Chhanv" || selectedProject.title === "Medi Guru");
                  const member = isTeamMember ? allTeamMembers.find(m => m.name === tech) : null;
                  
                  return (
                    <span 
                      key={tech} 
                      className={`px-4 py-2 rounded-lg font-medium ${isTeamMember && member ? 'cursor-pointer hover:scale-110 hover:shadow-lg transition-all' : ''}`}
                      style={{ 
                        background: `${ACCENT}20`, 
                        color: ACCENT,
                        border: isTeamMember && member ? `2px solid ${ACCENT}` : 'none'
                      }}
                      onClick={() => {
                        if (member) {
                          setSelectedTeamMember(member);
                          setSelectedProject(null);
                        }
                      }}
                      title={isTeamMember && member ? `Click to view ${tech}'s profile` : ''}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 rounded-full h-12 py-3 font-bold transition-all hover:scale-105 flex items-center justify-center" style={{ background: ACCENT, color: 'white' }}>
                View Demo
              </button>
              <button className="flex-1 rounded-full h-12 py-3 font-bold transition-all hover:scale-105 border-2 flex items-center justify-center" style={{ borderColor: PRIMARY, color: PRIMARY }}>
                GitHub
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Faculty Modal */}
      {selectedFaculty && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedFaculty(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white" style={{ background: PRIMARY }}>
                  {selectedFaculty.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: PRIMARY }}>{selectedFaculty.name}</h3>
                  <p className="font-semibold" style={{ color: ACCENT }}>{selectedFaculty.designation}</p>
                </div>
              </div>
              <button onClick={() => setSelectedFaculty(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-2" style={{ color: PRIMARY }}>Expertise</h4>
                <p className="text-gray-700">{selectedFaculty.expertise}</p>
              </div>
              <div>
                <h4 className="font-bold mb-2" style={{ color: PRIMARY }}>Bio</h4>
                <p className="text-gray-700 leading-relaxed">{selectedFaculty.bio}</p>
              </div>
              {selectedFaculty.research && (
                <div>
                  <h4 className="font-bold mb-2" style={{ color: PRIMARY }}>Research Interests</h4>
                  <ul className="space-y-1">
                    {selectedFaculty.research.map((item) => (
                      <li key={item} className="text-gray-700 flex items-center gap-2">
                        <span style={{ color: ACCENT }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedFaculty.publications && (
                <div>
                  <h4 className="font-bold mb-2" style={{ color: PRIMARY }}>Publications</h4>
                  <ul className="space-y-1">
                    {selectedFaculty.publications.map((item) => (
                      <li key={item} className="text-gray-700 flex items-center gap-2">
                        <span style={{ color: ACCENT }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedFaculty.email && (
                <div>
                  <h4 className="font-bold mb-2" style={{ color: PRIMARY }}>Contact</h4>
                  <p className="text-gray-700">{selectedFaculty.email}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Team Member Modal */}
      {selectedTeamMember && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTeamMember(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button */}
            <div className="flex justify-end mb-6">
              <button onClick={() => setSelectedTeamMember(null)} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={32} />
              </button>
            </div>

            {/* Avatar and Name Section */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-xl" style={{ background: ACCENT }}>
                {selectedTeamMember.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: PRIMARY }}>
                {selectedTeamMember.name}
              </h3>
              <p className="text-xl font-semibold" style={{ color: ACCENT }}>
                {selectedTeamMember.role}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-3" style={{ color: PRIMARY }}>Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTeamMember.skills.map((skill) => (
                    <span key={skill} className="px-4 py-2 rounded-lg font-medium" style={{ background: `${ACCENT}20`, color: ACCENT }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {selectedTeamMember.projects && (
                <div>
                  <h4 className="font-bold mb-3" style={{ color: PRIMARY }}>Projects Involved</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedTeamMember.projects.map((project) => (
                      <div key={project} className="p-3 rounded-lg" style={{ background: `${PRIMARY}10` }}>
                        <p className="font-medium" style={{ color: PRIMARY }}>{project}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTeamMember.email && (
                <div>
                  <h4 className="font-bold mb-2" style={{ color: PRIMARY }}>Contact</h4>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={18} style={{ color: ACCENT }} />
                    <p>{selectedTeamMember.email}</p>
                  </div>
                </div>
              )}

              {(selectedTeamMember.github || selectedTeamMember.linkedin) && (
                <div>
                  <h4 className="font-bold mb-3" style={{ color: PRIMARY }}>Social Links</h4>
                  <div className="flex gap-4">
                    {selectedTeamMember.github && (
                      <a href={selectedTeamMember.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: `${PRIMARY}20`, color: PRIMARY }}>
                        <Github size={20} />
                        <span>GitHub</span>
                      </a>
                    )}
                    {selectedTeamMember.linkedin && (
                      <a href={selectedTeamMember.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: `${ACCENT}20`, color: ACCENT }}>
                        <Linkedin size={20} />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
