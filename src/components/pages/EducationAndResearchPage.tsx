import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Brain, 
  Code, 
  Database, 
  Cpu,
  Globe,
  Shield,
  Search,
  GraduationCap,
  Library,
  Microscope,
  Target,
  Lightbulb,
  Building,
  FlaskConical,
  Monitor
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

/* ========================================
   EDUCATION & RESEARCH PAGE COMPONENT
   ========================================
   Computer Science & Engineering Department
   Comprehensive education programs and research activities
======================================== */

export function EducationAndResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ========================================
          HERO SECTION
          ======================================== */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Education & Research</h1>
            <p className="text-xl opacity-90 text-white">
              Shaping Future Technology Leaders Through Quality Education and Cutting-Edge Research
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          EDUCATION SECTION
          ======================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-black mb-4">Academic Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive computer science education from undergraduate to doctoral levels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "B.Tech in Computer Science",
                duration: "4 Years",
                description: "Comprehensive undergraduate program covering fundamentals of computer science and engineering",
                highlights: ["Programming Languages", "Data Structures", "Software Engineering", "Database Systems"],
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: Library,
                title: "M.Tech in Computer Science",
                duration: "2 Years",
                description: "Advanced graduate program with specialization in cutting-edge technologies",
                highlights: ["Machine Learning", "Cybersecurity", "Cloud Computing", "Research Methodology"],
                color: "bg-green-100 text-green-600"
              },
              {
                icon: Microscope,
                title: "Ph.D in Computer Science",
                duration: "3-5 Years",
                description: "Doctoral program for advanced research in computer science and engineering",
                highlights: ["Independent Research", "Publications", "Teaching Assistantship", "Industry Collaboration"],
                color: "bg-purple-100 text-purple-600"
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${program.color} flex items-center justify-center mb-4`}>
                      <program.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-black">{program.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      <Badge variant="outline" className="mb-2">{program.duration}</Badge>
                      <br />
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-black mb-2">Key Highlights:</h4>
                    <ul className="space-y-1">
                      {program.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="text-gray-600 text-sm">• {highlight}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          CURRICULUM HIGHLIGHTS SECTION
          ======================================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-black mb-4">Curriculum Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-aligned curriculum designed to meet evolving technology demands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-black flex items-center">
                    <Target className="w-6 h-6 mr-2 text-blue-600" />
                    Core Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Programming Fundamentals",
                      "Data Structures & Algorithms",
                      "Computer Networks",
                      "Operating Systems",
                      "Database Management",
                      "Software Engineering",
                      "Computer Architecture",
                      "Theory of Computation"
                    ].map((subject, index) => (
                      <div key={index} className="text-gray-600 text-sm">• {subject}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-black flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-orange-600" />
                    Emerging Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Artificial Intelligence",
                      "Machine Learning",
                      "Blockchain Technology",
                      "Cloud Computing",
                      "Internet of Things",
                      "Cybersecurity",
                      "Data Science",
                      "Mobile App Development"
                    ].map((tech, index) => (
                      <div key={index} className="text-gray-600 text-sm">• {tech}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          RESEARCH AREAS SECTION
          ======================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-black mb-4">Research Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our faculty and students are engaged in cutting-edge research across multiple domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Artificial Intelligence & Machine Learning",
                description: "Deep learning, neural networks, and intelligent systems",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: Shield,
                title: "Cybersecurity",
                description: "Network security, cryptography, and information protection",
                color: "bg-red-100 text-red-600"
              },
              {
                icon: Database,
                title: "Data Science & Analytics",
                description: "Big data processing, analytics, and visualization",
                color: "bg-green-100 text-green-600"
              },
              {
                icon: Globe,
                title: "Internet of Things (IoT)",
                description: "Connected devices, smart systems, and sensor networks",
                color: "bg-purple-100 text-purple-600"
              },
              {
                icon: Code,
                title: "Software Engineering",
                description: "Software architecture, testing, and development methodologies",
                color: "bg-orange-100 text-orange-600"
              },
              {
                icon: Cpu,
                title: "Computer Systems",
                description: "Operating systems, distributed computing, and performance optimization",
                color: "bg-indigo-100 text-indigo-600"
              }
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${area.color} flex items-center justify-center mb-4`}>
                      <area.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-black">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{area.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          RESEARCH LABS SECTION
          ======================================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-black mb-4">Research Labs & Facilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art facilities supporting both education and advanced research
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                name: "AI & ML Research Lab",
                description: "Equipped with high-performance computing systems and GPU clusters for deep learning research",
                facilities: ["NVIDIA GPU Clusters", "High-Performance Workstations", "Cloud Computing Access"],
                focus: "Machine Learning, Computer Vision, Natural Language Processing"
              },
              {
                name: "Cybersecurity Lab",
                description: "Advanced security testing environment with isolated networks and penetration testing tools",
                facilities: ["Isolated Network Environment", "Security Testing Tools", "Forensics Equipment"],
                focus: "Network Security, Ethical Hacking, Digital Forensics"
              },
              {
                name: "IoT & Embedded Systems Lab",
                description: "Complete setup for IoT development and testing with various sensors and microcontrollers",
                facilities: ["Arduino & Raspberry Pi", "Sensor Networks", "Communication Modules"],
                focus: "Smart Systems, Sensor Networks, Edge Computing"
              },
              {
                name: "Software Engineering Lab",
                description: "Collaborative development environment with modern tools and methodologies",
                facilities: ["Development Workstations", "Version Control Systems", "Testing Frameworks"],
                focus: "Agile Development, Testing Methodologies, DevOps"
              }
            ].map((lab, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-black flex items-center">
                      <FlaskConical className="w-5 h-5 mr-2 text-blue-600" />
                      {lab.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">{lab.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-black mb-2">Key Facilities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {lab.facilities.map((facility, facilityIndex) => (
                          <Badge key={facilityIndex} variant="secondary" className="bg-blue-100 text-blue-800">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-2">Research Focus:</h4>
                      <p className="text-gray-600">{lab.focus}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          ACADEMIC STATISTICS SECTION
          ======================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-black mb-4">Academic Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our achievements in education and research speak for themselves
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "500+", label: "Students Enrolled", color: "bg-blue-100 text-blue-600" },
              { icon: GraduationCap, number: "95%", label: "Placement Rate", color: "bg-green-100 text-green-600" },
              { icon: BookOpen, number: "150+", label: "Research Papers", color: "bg-purple-100 text-purple-600" },
              { icon: Award, number: "25+", label: "Patents Filed", color: "bg-orange-100 text-orange-600" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          FACULTY & INDUSTRY PARTNERSHIPS
          ======================================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-black mb-4">Industry Partnerships</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborations that bridge academic excellence with industry needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                type: "Academic",
                icon: Building,
                partners: ["IIT Delhi", "IISc Bangalore", "IIIT Hyderabad"],
                focus: "Joint research programs and student exchange",
                color: "bg-blue-100 text-blue-600"
              },
              {
                type: "Industry",
                icon: Monitor,
                partners: ["Google", "Microsoft", "IBM", "TCS", "Infosys"],
                focus: "Internships, placements, and technology transfer",
                color: "bg-green-100 text-green-600"
              },
              {
                type: "Government",
                icon: Award,
                partners: ["DST", "DRDO", "ISRO"],
                focus: "National mission projects and defense research",
                color: "bg-purple-100 text-purple-600"
              }
            ].map((collab, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${collab.color} flex items-center justify-center mb-4`}>
                      <collab.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-black">{collab.type} Partnerships</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-black mb-2">Key Partners:</h4>
                      <ul className="space-y-1">
                        {collab.partners.map((partner, partnerIndex) => (
                          <li key={partnerIndex} className="text-gray-600">• {partner}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-2">Focus Area:</h4>
                      <p className="text-gray-600">{collab.focus}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          CTA SECTION
          ======================================== */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Join Our Academic Community</h2>
            <p className="text-xl text-blue-100 mb-8">
              Explore our programs, research opportunities, and be part of the next generation of technology leaders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <GraduationCap className="w-5 h-5 mr-2" />
                Apply for Admission
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Search className="w-5 h-5 mr-2" />
                Explore Research
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}