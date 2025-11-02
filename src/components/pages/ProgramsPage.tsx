import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  GraduationCap, 
  Clock, 
  Users, 
  BookOpen, 
  Award,
  CheckCircle2,
  ArrowRight,
  Code,
  Database,
  Briefcase,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { useEffect, useState } from "react";

interface ProgramsPageProps {
  defaultTab?: string;
}

export function ProgramsPage({ defaultTab = "btech" }: ProgramsPageProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Update active tab when defaultTab prop changes
  useEffect(() => {
    setActiveTab(defaultTab);
    // Scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [defaultTab]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const btechPrograms = [
    {
      name: "Computer Science & Engineering",
      code: "CSE",
      duration: "4 Years",
      seats: 120,
      icon: Code,
      description: "Master software development, algorithms, and modern computing technologies",
      highlights: [
        "AI & Machine Learning specialization",
        "Full-stack development training",
        "Industry-standard curriculum",
        "100+ coding challenges"
      ],
      careers: ["Software Engineer", "Data Scientist", "Cloud Architect", "AI Specialist"],
      avgPackage: "Rs 6.5 LPA",
      color: "bg-blue-600"
    }
  ];

  const mtechPrograms = [
    {
      name: "M.Tech Computer Science",
      code: "M.Tech CSE",
      duration: "2 Years",
      seats: 18,
      icon: GraduationCap,
      description: "Advanced research and specialization in cutting-edge computing domains",
      highlights: [
        "Artificial Intelligence specialization",
        "Data Science specialization",
        "Cyber Security specialization",
        "Research-oriented curriculum"
      ],
      specializations: ["Artificial Intelligence", "Data Science", "Cyber Security"],
      eligibility: "B.Tech/BE in CSE/IT with GATE score",
      color: "bg-blue-600"
    }
  ];

  const otherPrograms = [
    {
      name: "PhD Programs",
      code: "PhD",
      duration: "3-5 Years",
      seats: 20,
      icon: Award,
      description: "Pursue advanced research and contribute to academic knowledge",
      highlights: [
        "Advanced research opportunities",
        "Expert faculty mentorship",
        "State-of-the-art research facilities",
        "Contribution to academic knowledge"
      ],
      areas: ["Computer Science"],
      eligibility: "M.Tech/ME with minimum 60%",
      color: "bg-blue-600"
    }
  ];

  const programFeatures = [
    {
      icon: BookOpen,
      title: "Industry-Relevant Curriculum",
      description: "Courses designed with input from leading tech companies"
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "Learn from experienced professors and industry professionals"
    },
    {
      icon: Briefcase,
      title: "Internship Opportunities",
      description: "Mandatory internships with top companies"
    },
    {
      icon: Award,
      title: "Certification Programs",
      description: "Additional certifications in trending technologies"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">SSIPMT Programs</h1>
            <p className="text-xl md:text-2xl text-black font-medium leading-relaxed">
              Choose from our diverse range of programs designed for future leaders
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </motion.section>

      {/* Program Features */}
      <section className="py-16 container mx-auto px-4 bg-white">
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
            Why Choose Our Programs?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all bg-white border border-gray-200">
                  <CardContent className="pt-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-blue-100 rounded-full">
                        <feature.icon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Programs Tabs */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 h-auto">
                <TabsTrigger value="btech" className="text-lg py-4">B.Tech Programs</TabsTrigger>
                <TabsTrigger value="mtech" className="text-lg py-4">M.Tech Programs</TabsTrigger>
                <TabsTrigger value="other" className="text-lg py-4">PhD Programs</TabsTrigger>
              </TabsList>

              {/* B.Tech Programs */}
              <TabsContent value="btech">
                <motion.div 
                  className="space-y-8"
                  variants={stagger}
                  initial="initial"
                  animate="animate"
                >
                  {btechPrograms.map((program, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden hover:shadow-2xl transition-all bg-white border border-gray-200">
                        <div className={`${program.color} p-6 text-white`}>
                          <div className="flex items-start justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                              <div className="p-4 bg-white/20 rounded-lg">
                                <program.icon className="w-10 h-10" />
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold mb-1">{program.name}</h3>
                                <div className="flex gap-4 text-sm">
                                  <Badge variant="secondary" className="bg-white/20 text-white border-white/40">
                                    {program.code}
                                  </Badge>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {program.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {program.seats} Seats
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-white">Avg. Package</div>
                              <div className="text-2xl font-bold">{program.avgPackage}</div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="pt-6">
                          <p className="text-lg text-gray-700 mb-6">{program.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                Program Highlights
                              </h4>
                              <ul className="space-y-2">
                                {program.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-600" />
                                Career Opportunities
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {program.careers.map((career, idx) => (
                                  <Badge key={idx} variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">{career}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="mtech">
                <motion.div 
                  className="space-y-8"
                  variants={stagger}
                  initial="initial"
                  animate="animate"
                >
                  {mtechPrograms.map((program, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden hover:shadow-2xl transition-all bg-white border border-gray-200">
                        <div className={`${program.color} p-6 text-white`}>
                          <div className="flex items-start justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                              <div className="p-4 bg-white/20 rounded-lg">
                                <program.icon className="w-10 h-10" />
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold mb-1">{program.name}</h3>
                                <div className="flex gap-4 text-sm">
                                  <Badge variant="secondary" className="bg-white/20 text-white border-white/40">
                                    {program.code}
                                  </Badge>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {program.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {program.seats} Seats
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="pt-6">
                          <p className="text-lg text-gray-700 mb-6">{program.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                Program Highlights
                              </h4>
                              <ul className="space-y-2">
                                {program.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                                Specializations
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {program.specializations.map((spec, idx) => (
                                  <Badge key={idx} variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">{spec}</Badge>
                                ))}
                              </div>
                              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-600">Eligibility</div>
                                <div className="font-semibold text-gray-900">{program.eligibility}</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              {/* PhD Programs */}
              <TabsContent value="other">
                <motion.div 
                  className="space-y-8"
                  variants={stagger}
                  initial="initial"
                  animate="animate"
                >
                  {otherPrograms.map((program, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden hover:shadow-2xl transition-all bg-white border border-gray-200">
                        <div className={`${program.color} p-6 text-white`}>
                          <div className="flex items-start justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                              <div className="p-4 bg-white/20 rounded-lg">
                                <program.icon className="w-10 h-10" />
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold mb-1">{program.name}</h3>
                                <div className="flex gap-4 text-sm">
                                  <Badge variant="secondary" className="bg-white/20 text-white border-white/40">
                                    {program.code}
                                  </Badge>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {program.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {program.seats} Seats
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="pt-6">
                          <p className="text-lg text-gray-700 mb-6">{program.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                Program Highlights
                              </h4>
                              <ul className="space-y-2">
                                {program.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Database className="w-5 h-5 text-blue-600" />
                                Research Areas
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {program.areas.map((area, idx) => (
                                  <Badge key={idx} variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">{area}</Badge>
                                ))}
                              </div>
                              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-600">Eligibility</div>
                                <div className="font-semibold text-gray-900">{program.eligibility}</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
