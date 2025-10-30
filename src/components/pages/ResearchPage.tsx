import React, { useState } from 'react';
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
  Monitor,
  Eye,
  Network,
  Cloud,
  Mail,
  Clock,
  Download,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

/* ========================================
   EDUCATION & RESEARCH PAGE COMPONENT
   ========================================
   Computer Science & Engineering Department
   Comprehensive education programs and research activities
======================================== */

export function ResearchPage() {
  const [activeSection, setActiveSection] = useState("research");

  return (
    <div className="min-h-screen bg-white">
      {/* ========================================
          HERO SECTION WITH TABS
          ======================================== */}
      <section 
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1738003946582-aabeabf5e009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcmVzZWFyY2glMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTg0OTcxMXww&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      >
        <div className="text-center text-white max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Education & Research</h1>
            <p className="text-xl opacity-90 mb-8 text-white">
              Empowering students and exploring future technologies in Computer Science
            </p>

            {/* Internal Navigation Tabs */}
            <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/10 backdrop-blur-sm">
                <TabsTrigger 
                  value="research" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  <Microscope className="w-4 h-4 mr-2" />
                  Research
                </TabsTrigger>
                <TabsTrigger 
                  value="academics" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Academics
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          TAB CONTENT
          ======================================== */}
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        {/* ========================================
            RESEARCH TAB CONTENT
            ======================================== */}
        <TabsContent value="research" className="mt-0">
          
          {/* AREAS OF RESEARCH SECTION */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-black mb-4">Areas of Research</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our department focuses on cutting-edge research in various domains of computer science
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-blue-500 h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        {area.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black mb-2">{area.title}</h3>
                        <p className="text-sm text-gray-600">{area.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* RESEARCH LABS SECTION */}
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-black mb-4">Research Labs</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  State-of-the-art facilities for cutting-edge research
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {labs.map((lab, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={lab.image} 
                          alt={lab.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-black mb-2 flex items-center">
                          <FlaskConical className="w-5 h-5 mr-2 text-blue-600" />
                          {lab.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{lab.focus}</p>
                        
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Coordinator:</p>
                          <p className="text-sm text-gray-600">{lab.coordinator}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-2">Equipment:</p>
                          <div className="flex flex-wrap gap-1">
                            {lab.equipment.map((item, i) => (
                              <Badge key={i} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PUBLICATIONS SECTION */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-black mb-4">Recent Publications</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Peer-reviewed research papers and conference proceedings
                </p>
              </motion.div>

              <div className="space-y-4">
                {publications.map((pub, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-black mb-2">{pub.title}</h4>
                          <p className="text-gray-600 mb-2">{pub.authors}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">{pub.venue} ({pub.year})</span>
                            <Badge variant="outline" className="text-xs">
                              {pub.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mt-8"
              >
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  View All Publications
                </Button>
              </motion.div>
            </div>
          </section>

          {/* RESEARCH CALL TO ACTION */}
          <section className="bg-blue-600 py-16">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-6">Interested in collaborating or joining our research initiatives?</h2>
                <p className="text-lg mb-8 opacity-90">
                  We welcome collaborations with industry partners, research institutions, and aspiring researchers
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Research Office
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-blue-700"
                  >
                    Join Our Team
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

        </TabsContent>

        {/* ========================================
            ACADEMICS TAB CONTENT
            ======================================== */}
        <TabsContent value="academics" className="mt-0">

          {/* PROGRAMS OFFERED SECTION */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-black mb-4">Programs Offered</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive academic programs designed to prepare students for the future of technology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-500 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-1">{program.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{program.duration}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      {program.overview}
                    </p>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-black mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-2">
                        {program.specializations.map((spec, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Curriculum
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SYLLABUS SECTION */}
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-black mb-4">Course Syllabus</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download detailed syllabus and curriculum for each program and semester
                </p>
              </motion.div>

              {/* B.Tech Syllabus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">B.Tech in CSE</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {syllabusData.btech.map((sem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Card className="p-5 bg-white hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-start gap-3 mb-4">
                          <FileText className="w-5 h-5 text-blue-600 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-black mb-1">{sem.semester}</h4>
                            <p className="text-xs text-gray-500 mb-3">{sem.subjects} subjects</p>
                            <Badge variant="outline" className="text-xs mb-3">
                              {sem.credits} Credits
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* M.Tech Syllabus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Library className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">M.Tech in CSE</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {syllabusData.mtech.map((sem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Card className="p-5 bg-white hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-start gap-3 mb-4">
                          <FileText className="w-5 h-5 text-purple-600 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-black mb-1">{sem.semester}</h4>
                            <p className="text-xs text-gray-500 mb-3">{sem.subjects} subjects</p>
                            <Badge variant="outline" className="text-xs mb-3">
                              {sem.credits} Credits
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full bg-purple-600 hover:bg-purple-700 group-hover:bg-purple-700"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* PhD Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Microscope className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">PhD in CSE</h3>
                </div>

                <Card className="p-6 bg-white">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <FileText className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-black mb-2">Doctoral Research Program Guidelines</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Complete curriculum framework, research methodology, and coursework requirements for PhD candidates
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">Research Methodology</Badge>
                          <Badge variant="outline" className="text-xs">Coursework</Badge>
                          <Badge variant="outline" className="text-xs">Thesis Guidelines</Badge>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                      <Download className="w-4 h-4 mr-2" />
                      Download Guide
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* ACADEMIC STATISTICS */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-black mb-4">Academic Excellence</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our achievements in education speak for themselves
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Users, number: "500+", label: "Students Enrolled", color: "bg-blue-100 text-blue-600" },
                  { icon: GraduationCap, number: "95%", label: "Placement Rate", color: "bg-green-100 text-green-600" },
                  { icon: Building, number: "50+", label: "Industry Partners", color: "bg-purple-100 text-purple-600" },
                  { icon: Award, number: "25+", label: "Awards Won", color: "bg-orange-100 text-orange-600" }
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

        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ========================================
   DATA: RESEARCH AREAS
   ======================================== */
const researchAreas = [
  {
    title: "Artificial Intelligence",
    description: "Machine learning, deep learning, neural networks, and cognitive computing",
    icon: <Brain className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Machine Learning",
    description: "Supervised and unsupervised learning, reinforcement learning, and ML algorithms",
    icon: <Cpu className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Data Science",
    description: "Big data analytics, data mining, predictive modeling, and visualization",
    icon: <Database className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Cybersecurity",
    description: "Network security, cryptography, threat detection, and ethical hacking",
    icon: <Shield className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Cloud Computing",
    description: "Distributed systems, virtualization, containerization, and cloud architecture",
    icon: <Cloud className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Internet of Things",
    description: "IoT protocols, sensor networks, edge computing, and smart systems",
    icon: <Network className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Computer Vision",
    description: "Image processing, object detection, facial recognition, and video analytics",
    icon: <Eye className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Software Engineering",
    description: "Agile methodologies, DevOps, software architecture, and quality assurance",
    icon: <Code className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Human-Computer Interaction",
    description: "UI/UX design, accessibility, interaction design, and user research",
    icon: <Users className="w-6 h-6 text-blue-600" />
  }
];

/* ========================================
   DATA: RESEARCH LABS
   ======================================== */
const labs = [
  {
    name: "AI & Robotics Lab",
    coordinator: "Dr. Rajesh Kumar",
    focus: "Advanced research in artificial intelligence, machine learning, and autonomous robotics systems",
    image: "https://images.unsplash.com/photo-1691828715713-4f3eaf16f857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGxhYiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYxODQ5NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    equipment: ["GPU Workstations", "Robotic Arms", "Drones", "AI Accelerators"]
  },
  {
    name: "Data Analytics Lab",
    coordinator: "Dr. Priya Sharma",
    focus: "Big data processing, predictive analytics, and business intelligence using modern data science tools",
    image: "https://images.unsplash.com/photo-1666718621307-1e864744cfef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljcyUyMGxhYnxlbnwxfHx8fDE3NjE4NDk3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    equipment: ["Hadoop Cluster", "Spark", "Tableau", "Python/R"]
  },
  {
    name: "Cybersecurity Lab",
    coordinator: "Prof. Vikram Reddy",
    focus: "Network security, ethical hacking, cryptography, and penetration testing in controlled environments",
    image: "https://images.unsplash.com/photo-1483817101829-339b08e8d83f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHNlY3VyaXR5fGVufDF8fHx8MTc2MTc4NDU1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    equipment: ["Kali Linux", "Wireshark", "Metasploit", "Firewalls"]
  }
];

/* ========================================
   DATA: PUBLICATIONS
   ======================================== */
const publications = [
  {
    title: "Deep Learning Approaches for Early Detection of Alzheimer's Disease Using MRI Scans",
    authors: "Kumar, R., Sharma, P., & Singh, A.",
    venue: "IEEE Transactions on Medical Imaging",
    year: "2024",
    type: "Journal"
  },
  {
    title: "Blockchain-Based Secure Data Sharing Framework for Healthcare Systems",
    authors: "Singh, A., Patel, S., & Gupta, M.",
    venue: "International Conference on Blockchain Technology (ICBT)",
    year: "2024",
    type: "Conference"
  },
  {
    title: "Sentiment Analysis of Code-Mixed Indian Social Media Text Using Transformer Models",
    authors: "Patel, S., Kumar, R., & Reddy, V.",
    venue: "ACM Transactions on Asian Language Processing",
    year: "2024",
    type: "Journal"
  },
  {
    title: "Real-Time Intrusion Detection in IoT Networks Using Federated Learning",
    authors: "Reddy, V., Sharma, P., & Kumar, R.",
    venue: "IEEE Internet of Things Journal",
    year: "2023",
    type: "Journal"
  },
  {
    title: "Edge Computing Architecture for Smart Agriculture: A Case Study",
    authors: "Gupta, M., Singh, A., & Patel, S.",
    venue: "International Conference on Edge Computing (ICEC)",
    year: "2023",
    type: "Conference"
  }
];

/* ========================================
   DATA: PROGRAMS OFFERED
   ======================================== */
const programs = [
  {
    name: "B.Tech in CSE",
    duration: "4 Years",
    overview: "Comprehensive undergraduate program covering fundamentals of computer science, programming, algorithms, and software development.",
    specializations: ["AI & ML", "Data Science", "Cybersecurity", "Cloud Computing"]
  },
  {
    name: "M.Tech in CSE",
    duration: "2 Years",
    overview: "Advanced postgraduate program focusing on specialized areas of computer science with research opportunities.",
    specializations: ["Machine Learning", "Big Data", "IoT", "Software Engineering"]
  },
  {
    name: "PhD in CSE",
    duration: "3-5 Years",
    overview: "Doctoral research program for candidates interested in advanced research in computer science and engineering.",
    specializations: ["Research Track", "Full-Time", "Part-Time"]
  }
];

/* ========================================
   DATA: SYLLABUS
   ======================================== */
const syllabusData = {
  btech: [
    { semester: "Semester I", subjects: 8, credits: 24 },
    { semester: "Semester II", subjects: 8, credits: 24 },
    { semester: "Semester III", subjects: 7, credits: 22 },
    { semester: "Semester IV", subjects: 7, credits: 22 },
    { semester: "Semester V", subjects: 6, credits: 20 },
    { semester: "Semester VI", subjects: 6, credits: 20 },
    { semester: "Semester VII", subjects: 5, credits: 18 },
    { semester: "Semester VIII", subjects: 3, credits: 16 }
  ],
  mtech: [
    { semester: "Semester I", subjects: 6, credits: 20 },
    { semester: "Semester II", subjects: 5, credits: 18 },
    { semester: "Semester III", subjects: 4, credits: 16 },
    { semester: "Semester IV", subjects: 2, credits: 14 }
  ]
};
