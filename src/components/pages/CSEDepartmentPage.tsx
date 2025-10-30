import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Cpu, 
  Lightbulb,
  Target,
  Eye,
  Award,
  Users,
  BookOpen,
  Rocket,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export function CSEDepartmentPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 }
  };

  const visionPoints = [
    "To be recognized as a center of excellence in computer science education and research",
    "To develop globally competent professionals who can solve real-world challenges",
    "To foster innovation and entrepreneurship in emerging technologies",
    "To establish strong industry-academia partnerships for cutting-edge research",
    "To contribute to society through technology-driven solutions and ethical practices"
  ];

  const missionPoints = [
    "Provide quality education with emphasis on practical learning and hands-on experience",
    "Cultivate critical thinking, problem-solving, and analytical skills among students",
    "Promote research and development in frontier areas of computer science",
    "Encourage innovation, creativity, and entrepreneurial mindset",
    "Build strong collaborations with industry leaders and research institutions",
    "Develop professionals with ethical values and social responsibility",
    "Continuously update curriculum to align with industry standards and global trends"
  ];

  const highlights = [
    { icon: Users, value: "500+", label: "Students Enrolled" },
    { icon: BookOpen, value: "40+", label: "Expert Faculty" },
    { icon: Award, value: "100+", label: "Research Papers" },
    { icon: TrendingUp, value: "95%", label: "Placement Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center text-white"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="bg-white/20 text-white border-white/40 text-lg px-6 py-2">
                Department of Computer Science & Engineering
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Who We Are
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Shaping Future Innovators at SSIPMT, Raipur
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#0096FF" 
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </motion.section>

      {/* Introduction Section */}
      <section className="py-16 container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pioneering Excellence in Computing
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-8"></div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-500">
              <CardContent className="pt-8">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="text-xl mb-6 text-center font-medium text-gray-800">
                    The Department of Computer Science & Engineering at SSIPMT is a hub of innovation, 
                    research, and practical learning, dedicated to producing world-class engineers and technologists.
                  </p>
                  
                  <p className="text-lg mb-4">
                    Since our inception, we have been committed to providing a comprehensive education that blends 
                    <strong className="text-blue-600"> theoretical foundations</strong> with 
                    <strong className="text-blue-600"> hands-on experience</strong>. Our curriculum is constantly 
                    updated to reflect the latest industry trends and emerging technologies.
                  </p>
                  
                  <p className="text-lg mb-4">
                    We emphasize <strong className="text-indigo-600">innovation, research, and practical learning</strong> 
                    through state-of-the-art laboratories, industry collaborations, and cutting-edge projects. 
                    Our students are equipped with the skills to excel in diverse fields ranging from software 
                    development to artificial intelligence and cybersecurity.
                  </p>
                  
                  <p className="text-lg">
                    With a team of <strong className="text-blue-600">experienced faculty members</strong>, 
                    modern infrastructure, and a vibrant academic environment, we nurture the next generation 
                    of technology leaders who are ready to make a global impact.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center text-white"
                >
                  <div className="inline-flex p-4 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {item.value}
                  </motion.div>
                  <div className="text-lg text-white font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid md:grid-cols-2 gap-10">
            {/* Vision Card */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-10 rounded-bl-full group-hover:scale-150 transition-transform duration-500"></div>
                
                <CardContent className="pt-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Eye className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {visionPoints.map((point, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 text-gray-700 text-lg group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                        <span className="group-hover/item:text-blue-600 transition-colors">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission Card */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-600 opacity-10 rounded-bl-full group-hover:scale-150 transition-transform duration-500"></div>
                
                <CardContent className="pt-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {missionPoints.map((point, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 text-gray-700 text-lg group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                        <span className="group-hover/item:text-indigo-600 transition-colors">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Lightbulb className="w-20 h-20 mx-auto mb-8 animate-bounce" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Shape Your Future?
            </h2>
            <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed">
              Join the Department of Computer Science & Engineering at SSIPMT and embark on a journey 
              of innovation, excellence, and endless possibilities.
            </p>
            <motion.button
              className="px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Programs
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
