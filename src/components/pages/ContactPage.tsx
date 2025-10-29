import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock,
  Building2,
  Users,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  GraduationCap,
  ArrowRight,
  Star,
  Award
} from "lucide-react";

export function ContactPage() {
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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Shri Shankaracharya Institute of Professional Management & Technology",
      details: "Junwani, Bhilai Road, Raipur, Chhattisgarh - 492015",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 771 XXX XXXX",
      details: "Available Monday to Saturday, 9:00 AM - 6:00 PM",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "cse@ssipmt.ac.in",
      details: "We'll respond within 24 hours",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Mon - Sat: 9:00 AM - 6:00 PM",
      details: "Closed on Sundays and Public Holidays",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const quickLinks = [
    { title: "Admissions", description: "Learn about our admission process", icon: Users },
    { title: "Academic Programs", description: "Explore our CSE curriculum", icon: GraduationCap },
    { title: "Research", description: "Discover our research initiatives", icon: Award },
    { title: "Campus Tour", description: "Schedule a campus visit", icon: Building2 }
  ];

  const socialMedia = [
    { icon: Facebook, name: "Facebook", link: "#", color: "hover:text-blue-600" },
    { icon: Instagram, name: "Instagram", link: "#", color: "hover:text-pink-600" },
    { icon: Linkedin, name: "LinkedIn", link: "#", color: "hover:text-blue-700" },
    { icon: Twitter, name: "Twitter", link: "#", color: "hover:text-blue-400" },
    { icon: Youtube, name: "YouTube", link: "#", color: "hover:text-red-600" },
    { icon: Globe, name: "Website", link: "#", color: "hover:text-green-600" }
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
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
            >
              Get in Touch
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-10 max-w-4xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ letterSpacing: '0.5px' }}
            >
              Connect with the Computer Science & Engineering Department at SSIPMT Raipur. 
              We're here to help you explore opportunities and answer your questions.
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
                Contact Information
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              >
                Visit Campus
                <MapPin className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Information Cards */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ letterSpacing: '-0.01em' }}>
                Contact Information
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Multiple ways to reach us. Choose what works best for you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className={`h-2 bg-gradient-to-r ${info.color}`}></div>
                    <CardContent className="pt-8 text-center">
                      <div className={`inline-flex p-4 bg-gradient-to-r ${info.color} rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{info.title}</h3>
                      <p className="text-lg font-semibold text-slate-700 mb-2">{info.content}</p>
                      <p className="text-slate-600 leading-relaxed">{info.details}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-br from-slate-100 to-blue-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ letterSpacing: '-0.01em' }}>
                Quick Access
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Find what you're looking for quickly
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="pt-8 text-center">
                      <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                        <link.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{link.title}</h3>
                      <p className="text-slate-600">{link.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location & Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ letterSpacing: '-0.01em' }}>
                Find Us
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Located in the heart of Raipur, easily accessible by all modes of transport
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Campus Address</h3>
                        <p className="text-slate-600">How to reach us</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Full Address</h4>
                        <p className="text-slate-700 leading-relaxed">
                          Shri Shankaracharya Institute of Professional Management & Technology<br />
                          Junwani, Bhilai Road<br />
                          Raipur, Chhattisgarh - 492015<br />
                          India
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Landmarks</h4>
                        <p className="text-slate-700">Near Junwani Square, Bhilai Road</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Transport</h4>
                        <p className="text-slate-700">Bus stops and auto-rickshaw stands nearby</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="bg-gradient-to-br from-slate-200 to-blue-100 rounded-2xl p-8 h-96 flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Interactive Map</h3>
                    <p className="text-slate-600 mb-6">
                      Get directions to our campus
                    </p>
                    <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold">
                      Open in Maps
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media & Footer */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect With Us</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Follow us on social media for updates, events, and achievements
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  className={`flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-6 h-6" />
                  <span className="font-medium">{social.name}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="text-lg font-semibold">Rated 4.8/5 by Students & Parents</span>
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}