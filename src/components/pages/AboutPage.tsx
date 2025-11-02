import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  Users, 
  BookOpen, 
  GraduationCap,
  Lightbulb,
  Compass,
  ArrowRight,
  Star,
  Calendar,
  Trophy,
  MapPin
} from "lucide-react";

export function AboutPage() {
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

  const milestones = [
    { year: "2000", title: "Foundation", description: "SSIPMT established with a vision to provide quality technical education" },
    { year: "2005", title: "AICTE Approval", description: "Received AICTE approval and expanded programs" },
    { year: "2010", title: "Research Excellence", description: "Launched dedicated research centers and PhD programs" },
    { year: "2015", title: "International Collaborations", description: "Established partnerships with leading global institutions" },
    { year: "2020", title: "Digital Transformation", description: "Pioneered online learning and smart campus initiatives" },
    { year: "2025", title: "25 Years of Excellence", description: "Celebrating a quarter-century of academic achievements" }
  ];

  const achievements = [
    { icon: Users, value: "2,500+", label: "Students" },
    { icon: BookOpen, value: "200+", label: "Faculty Members" },
    { icon: GraduationCap, value: "10,000+", label: "Alumni" },
    { icon: Award, value: "150+", label: "Awards & Recognitions" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Professional Hero Section */}
      <motion.section 
        className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Professional Department Badge */}
            <motion.div
              className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GraduationCap className="w-6 h-6" />
              <motion.span 
                className="text-base font-semibold tracking-wide"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)'
                }}
                animate={{ rotateX: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                CSE DEPARTMENT
              </motion.span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
            >
              Who We Are
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white mb-10 max-w-4xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ letterSpacing: '0.5px' }}
            >
              25 Years of Excellence in Technical Education at SSIPMT Raipur
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-blue-50 rounded-xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Discover Our Legacy
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 rounded-xl px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              >
                Join Our Community
                <Users className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section - Professional Design */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ letterSpacing: '-0.01em' }}>
                  Leading the Way in Technical Education
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-6"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-700 leading-relaxed" style={{ lineHeight: '1.8' }}>
                  <strong>SSIPMT</strong> is a premier institution dedicated to nurturing future leaders in technology and management. 
                  Established in 2000, we have consistently delivered quality education that combines theoretical 
                  knowledge with practical application.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed" style={{ lineHeight: '1.8' }}>
                  Our state-of-the-art facilities, distinguished faculty, and industry partnerships create an 
                  environment where students can explore, innovate, and excel. We are committed to shaping 
                  professionals who are not only technically proficient but also socially responsible.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-slate-700 font-medium">AICTE Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-700 font-medium">Excellence in Education</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700 font-medium">Industry Recognition</span>
                  </div>
                </div>
              </div>

              <Button 
                className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Learn More About Our Programs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 shadow-2xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="text-center">
                        <div className="inline-flex p-3 bg-white rounded-lg shadow-md mb-3">
                          <achievement.icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{achievement.value}</div>
                        <div className="text-slate-600 font-medium">{achievement.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div 
            className="max-w-7xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Section Header with Decorative Icon */}
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <div className="flex justify-center mb-6">
                <motion.div 
                  className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Lightbulb className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </motion.div>
              </div>
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4"
                style={{ letterSpacing: '-0.01em', fontFamily: 'Poppins, sans-serif' }}
              >
                Vision & Mission
              </h2>
              <p 
                className="text-lg md:text-xl lg:text-2xl text-slate-700 max-w-3xl mx-auto px-4"
                style={{ letterSpacing: '0.01em', lineHeight: '1.6', fontFamily: 'Roboto, sans-serif' }}
              >
                Guiding principles that drive excellence in education and innovation
              </p>
            </motion.div>

            {/* Vision and Mission Cards - Side by Side on Desktop, Stacked on Mobile */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Vision Card */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-gradient-to-br from-blue-50 to-white border-t-4 border-blue-600 shadow-lg hover:shadow-2xl transition-all">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 md:gap-4 mb-4">
                      <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                        <Eye className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                      </div>
                      <CardTitle 
                        className="text-3xl md:text-4xl font-bold text-blue-900"
                        style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}
                      >
                        Vision
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6">
                    {/* Institute Vision */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                      <h4 
                        className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 flex items-center gap-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <Building2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
                        Institute Vision
                      </h4>
                      <p 
                        className="text-base md:text-lg text-slate-800 leading-relaxed"
                        style={{ letterSpacing: '0.01em', lineHeight: '1.8', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}
                      >
                        To be recognized as a leading institution of excellence in technical education and 
                        research, fostering innovation, entrepreneurship, and sustainable development while 
                        preparing students to meet global challenges.
                      </p>
                    </div>

                    {/* Department Vision */}
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 md:p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                      <h4 
                        className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 flex items-center gap-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-blue-700 flex-shrink-0" />
                        CSE Department Vision
                      </h4>
                      <p 
                        className="text-base md:text-lg text-slate-800 leading-relaxed"
                        style={{ letterSpacing: '0.01em', lineHeight: '1.8', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}
                      >
                        To be a leading department in Computer Science and Engineering that produces innovative, 
                        industry-ready professionals equipped with cutting-edge technical skills, research 
                        capabilities, and ethical values to contribute to society and drive technological 
                        advancement globally.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-gradient-to-br from-white to-blue-50 border-t-4 border-blue-600 shadow-lg hover:shadow-2xl transition-all">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 md:gap-4 mb-4">
                      <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                        <Target className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                      </div>
                      <CardTitle 
                        className="text-3xl md:text-4xl font-bold text-blue-900"
                        style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}
                      >
                        Mission
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6">
                    {/* Institute Mission */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                      <h4 
                        className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 flex items-center gap-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <Building2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
                        Institute Mission
                      </h4>
                      <p 
                        className="text-base md:text-lg text-slate-800 leading-relaxed"
                        style={{ letterSpacing: '0.01em', lineHeight: '1.8', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}
                      >
                        To provide world-class technical education that empowers students with knowledge, 
                        skills, and values necessary to become innovative professionals and responsible 
                        citizens who contribute meaningfully to society and industry.
                      </p>
                    </div>

                    {/* Department Mission bullets */}
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 md:p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                      <h4 
                        className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 flex items-center gap-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-blue-700 flex-shrink-0" />
                        CSE Department Mission
                      </h4>
                      <ul className="space-y-3">
                        {/* Mission Bullet 1 */}
                        <li className="flex items-start gap-2 md:gap-3">
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <p 
                            className="text-base md:text-lg text-slate-800 leading-relaxed"
                            style={{ letterSpacing: '0.01em', lineHeight: '1.8', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}
                          >
                            To provide quality education in Computer Science and Engineering with strong emphasis 
                            on fundamental concepts, practical skills, and emerging technologies.
                          </p>
                        </li>
                        {/* Mission Bullet 2 */}
                        <li className="flex items-start gap-2 md:gap-3">
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <p 
                            className="text-base md:text-lg text-slate-800 leading-relaxed"
                            style={{ letterSpacing: '0.01em', lineHeight: '1.8', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}
                          >
                            To foster research, innovation, and entrepreneurship through industry partnerships, 
                            live projects, and state-of-the-art laboratory facilities.
                          </p>
                        </li>
                        {/* Mission Bullet 3 */}
                        <li className="flex items-start gap-2 md:gap-3">
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <p 
                            className="text-base md:text-lg text-slate-800 leading-relaxed"
                            style={{ letterSpacing: '0.01em', lineHeight: '1.8', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}
                          >
                            To develop students' problem-solving abilities, critical thinking, and communication 
                            skills to make them industry-ready and globally competitive.
                          </p>
                        </li>
                        {/* Mission Bullet 4 */}
                        <li className="flex items-start gap-2 md:gap-3">
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <p 
                            className="text-base md:text-lg text-slate-800 leading-relaxed"
                            style={{ letterSpacing: '0.01em', lineHeight: '1.8', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}
                          >
                            To instill ethical values, social responsibility, and lifelong learning mindset in 
                            students to contribute positively to society and the profession.
                          </p>
                        </li>
                        {/* Mission Bullet 5 */}
                        <li className="flex items-start gap-2 md:gap-3">
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <p 
                            className="text-base md:text-lg text-slate-800 leading-relaxed"
                            style={{ letterSpacing: '0.01em', lineHeight: '1.8', fontFamily: 'Roboto, sans-serif', textAlign: 'justify' }}
                          >
                            To continuously update curriculum and teaching methodologies aligned with industry 
                            needs and technological advancements.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-gradient-to-br from-maroon-600 via-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16"
              style={{ letterSpacing: '-0.01em' }}
            >
              Our Achievements
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className="p-3 md:p-4 bg-white/20 rounded-full">
                      <achievement.icon className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">{achievement.value}</div>
                  <div className="text-lg md:text-xl lg:text-2xl text-white font-semibold" style={{ letterSpacing: '0.01em' }}>{achievement.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-12 md:mb-16"
              style={{ letterSpacing: '-0.01em' }}
            >
              Our Journey
            </motion.h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-maroon-200 hidden md:block"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`relative mb-8 md:mb-12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                >
                  <div className={`flex items-center gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'}`}>
                      <Card className="hover:shadow-xl transition-shadow">
                        <CardContent className="pt-4 md:pt-6">
                          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-maroon-600 mb-3 md:mb-4" style={{ letterSpacing: '-0.01em' }}>{milestone.year}</div>
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-3" style={{ letterSpacing: '-0.01em' }}>{milestone.title}</h3>
                          <p className="text-base md:text-lg text-gray-600 leading-relaxed" style={{ letterSpacing: '0.01em', lineHeight: '1.7', textAlign: 'justify' }}>{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden md:flex w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-maroon-600 items-center justify-center flex-shrink-0 border-4 border-white shadow-lg z-10">
                      <Award className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div 
            className="max-w-6xl mx-auto text-center"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8"
              style={{ letterSpacing: '-0.01em' }}
            >
              Our Leadership
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto px-4"
              style={{ letterSpacing: '0.01em', lineHeight: '1.6' }}
            >
              Guided by visionary leaders committed to academic excellence
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button 
                size="lg" 
                className="bg-maroon-600 hover:bg-maroon-700 text-white text-base md:text-lg font-bold px-8 md:px-10 py-6 md:py-7 rounded-full shadow-2xl transform hover:scale-105 transition-all"
              >
                Meet Our Leadership Team
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
