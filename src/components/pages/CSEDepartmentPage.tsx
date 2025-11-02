import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import WaveSeparator from "../ui/WaveSeparator";
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
        className="relative py-20 overflow-hidden bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center text-black"
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
              <Badge className="bg-blue-100 text-black border-blue-200 text-lg px-6 py-2">
                Department of Computer Science & Engineering
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-black"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Who We Are
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-black leading-relaxed max-w-4xl mx-auto"
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
          <WaveSeparator theme="white" variant="default" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Pioneering Excellence in Computing
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-8"></div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-500">
              <CardContent className="pt-8">
                <div className="prose prose-lg max-w-none text-black leading-relaxed">
                  <p className="text-xl mb-6 text-center font-medium text-black">
                    The Department of Computer Science & Engineering at SSIPMT is a hub of innovation, 
                    research, and practical learning, dedicated to producing world-class engineers and technologists.
                  </p>
                  
                  <p className="text-lg mb-4">
                    Since our inception, we have been committed to providing a comprehensive education that blends 
                    <strong className="text-black"> theoretical foundations</strong> with 
                    <strong className="text-black"> hands-on experience</strong>. Our curriculum is constantly 
                    updated to reflect the latest industry trends and emerging technologies.
                  </p>
                  
                  <p className="text-lg mb-4">
                    We emphasize <strong className="text-indigo-600">innovation, research, and practical learning</strong> 
                    through state-of-the-art laboratories, industry collaborations, and cutting-edge projects. 
                    Our students are equipped with the skills to excel in diverse fields ranging from software 
                    development to artificial intelligence and cybersecurity.
                  </p>
                  
                  <p className="text-lg">
                    With a team of <strong className="text-black">experienced faculty members</strong>, 
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
      <section className="py-16 bg-gradient-to-r from-gray-100 via-blue-50 to-indigo-50">
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
                  className="text-center text-black"
                >
                  <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4 shadow-lg">
                    <item.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold mb-2 text-black"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {item.value}
                  </motion.div>
                  <div className="text-lg text-black font-medium">{item.label}</div>
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
                    <h3 className="text-3xl font-bold text-black">Our Vision</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {visionPoints.map((point, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 text-black text-lg group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                        <span className="group-hover/item:text-black transition-colors">{point}</span>
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
                    <h3 className="text-3xl font-bold text-black">Our Mission</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {missionPoints.map((point, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 text-black text-lg group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                        <span className="group-hover/item:text-black transition-colors">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
