import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import WaveSeparator from "../ui/WaveSeparator";
import { 
  BookOpen, 
  Microscope, 
  GraduationCap, 
  Award, 
  Rocket,
  Brain,
  FlaskConical,
  Library,
  Users,
  TrendingUp,
  FileText,
  Lightbulb,
  Target,
  Globe
} from "lucide-react";

export function EducationResearchPage() {
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

  const departments = [
    {
      name: "Computer Science & Engineering",
      icon: Brain,
      description: "Leading innovation in software development, AI, and cutting-edge computing technologies",
      programs: ["B.Tech CSE", "M.Tech CSE", "PhD CSE"],
      specializations: ["Artificial Intelligence", "Data Science", "Cyber Security", "Cloud Computing"],
      color: "bg-blue-600"
    },
    {
      name: "Information Technology",
      icon: Globe,
      description: "Pioneering digital transformation through advanced IT solutions and systems",
      programs: ["B.Tech IT", "M.Tech IT"],
      specializations: ["Web Technologies", "Mobile Computing", "Network Security", "IoT"],
      color: "bg-purple-600"
    },
    {
      name: "Electronics & Communication",
      icon: Rocket,
      description: "Advancing communication systems and embedded technologies",
      programs: ["B.Tech ECE", "M.Tech ECE", "PhD ECE"],
      specializations: ["VLSI Design", "Embedded Systems", "Signal Processing", "5G Networks"],
      color: "bg-green-600"
    }
  ];

  const researchAreas = [
    {
      icon: Brain,
      title: "Artificial Intelligence & Machine Learning",
      description: "Advanced research in neural networks, deep learning, and intelligent systems",
      projects: 25,
      publications: 80
    },
    {
      icon: FlaskConical,
      title: "Data Science & Big Data",
      description: "Exploring analytics, visualization, and predictive modeling techniques",
      projects: 18,
      publications: 65
    },
    {
      icon: Rocket,
      title: "Internet of Things",
      description: "Developing smart solutions for connected devices and automation",
      projects: 15,
      publications: 45
    },
    {
      icon: Lightbulb,
      title: "Renewable Energy Systems",
      description: "Sustainable energy solutions and green technology research",
      projects: 12,
      publications: 38
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "150+ Research Publications",
      description: "Published in international journals and conferences"
    },
    {
      icon: FileText,
      title: "50+ Patents Filed",
      description: "Innovations registered and under review"
    },
    {
      icon: Users,
      title: "20+ Industry Collaborations",
      description: "Active partnerships with leading companies"
    },
    {
      icon: TrendingUp,
      title: "₹5 Cr+ Research Funding",
      description: "Grants from government and industry"
    }
  ];

  const facilities = [
    {
      name: "Advanced Computing Lab",
      description: "State-of-the-art computers with latest software and development tools",
      capacity: "120 systems"
    },
    {
      name: "Research & Innovation Center",
      description: "Dedicated space for research scholars and innovative projects",
      capacity: "50 researchers"
    },
    {
      name: "Digital Library",
      description: "Access to 10,000+ e-books, journals, and research databases",
      capacity: "24/7 online access"
    },
    {
      name: "Project Lab",
      description: "Equipped for prototyping and testing student innovations",
      capacity: "30 workstations"
    }
  ];

  const courses = [
    {
      level: "Undergraduate",
      programs: [
        { name: "B.Tech Computer Science & Engineering", duration: "4 Years", seats: 120 }
      ]
    },
    {
      level: "Postgraduate",
      programs: [
        { name: "M.Tech Computer Science", duration: "2 Years", seats: 18 }
      ]
    },
    {
      level: "Doctoral",
      programs: [
        { name: "PhD Computer Science", duration: "3-5 Years", seats: 10 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
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
            <img src="/assets/cse-logo-black.svg" alt="CSE Logo" className="h-20 w-auto mx-auto mb-8" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 drop-shadow-sm">Education & Research</h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              Empowering minds through quality education and breakthrough research
            </p>
          </motion.div>
        </div>
        
        {/* Bottom Wave - Light Theme */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveSeparator theme="white" variant="default" withPadding={true} />
        </div>
      </motion.section>

      {/* Academic Programs Overview */}
      <section className="py-16 container mx-auto px-4 bg-white">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Academic Programs</h2>
            <p className="text-xl text-gray-600">
              Comprehensive programs designed to shape future leaders in technology
            </p>
          </motion.div>

          {courses.map((category, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="mb-12">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">{category.level} Programs</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {category.programs.map((program, pidx) => (
                  <Card key={pidx} className="hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 border-l-4 border-l-blue-600 bg-white">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-gray-900">{program.name}</h4>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">{program.seats} Seats</Badge>
                      </div>
                      <p className="text-gray-600">Duration: {program.duration}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 relative">
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
              Our Departments
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900">
                      <div className="flex items-center gap-3">
                        <dept.icon className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl text-gray-900">{dept.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-700 mb-4">{dept.description}</p>
                      <div className="mb-4">
                        <h4 className="font-bold text-gray-900 mb-2">Programs Offered:</h4>
                        <div className="flex flex-wrap gap-2">
                          {dept.programs.map((prog, i) => (
                            <Badge key={i} variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">{prog}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Specializations:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {dept.specializations.map((spec, i) => (
                            <li key={i}>• {spec}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Wave - Departments to Research Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveSeparator theme="white" variant="inverted" withPadding={true} />
        </div>
      </section>

      {/* Research Excellence */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Research Excellence</h2>
              <p className="text-xl text-gray-600">
                Pioneering innovations and contributing to global knowledge
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600 bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                          <area.icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{area.title}</h3>
                          <p className="text-gray-600 mb-4">{area.description}</p>
                          <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold">{area.projects}</span> Projects
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold">{area.publications}</span> Publications
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Achievements */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-gray-900 relative">
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
              className="text-4xl font-bold text-center mb-12 text-gray-900"
            >
              Research Achievements
            </motion.h2>
            <div className="grid md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white border-2 border-blue-200 rounded-full shadow-lg">
                      <achievement.icon className="w-10 h-10 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{achievement.title}</h3>
                  <p className="text-gray-700 font-medium">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Wave - Achievements to Facilities Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveSeparator theme="dark" variant="smooth" withPadding={true} />
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">World-Class Facilities</h2>
              <p className="text-xl text-gray-600">
                Infrastructure that supports learning and innovation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white border border-gray-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                          <Library className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{facility.name}</h3>
                          <p className="text-gray-600 mb-2">{facility.description}</p>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">{facility.capacity}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center bg-white border-2 border-gray-200 rounded-2xl p-12 text-gray-900 shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-gray-700 font-medium">
              Join us in shaping the future of technology and innovation
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 shadow-lg"
              >
                Explore Programs
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 shadow-lg"
              >
                Research Opportunities
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
