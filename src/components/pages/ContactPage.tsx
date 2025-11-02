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

interface ContactPageProps {
  onNavigateToAdmissions?: () => void;
  onNavigateToPrograms?: () => void;
}

export function ContactPage({ onNavigateToAdmissions, onNavigateToPrograms }: ContactPageProps = {}) {
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
      details: "P.O, Old Dhamtari Road, Sejabahar, Mujgahan, Chhattisgarh 493661",
      color: "from-cyan-400 to-sky-500",
      link: "https://www.google.com/maps/place/Shri+Shankaracharya+Institute+Of+Professional+Management+%26+Technology,+Raipur/@21.1346018,81.6660459,17z/data=!3m1!4b1!4m16!1m9!4m8!1m0!1m6!1m2!1s0x3a28db1573b8526b:0x3f6847db83d1b08e!2sP.O,+Old+Dhamtari+Road,+Sejabahar,+Mujgahan,+Chhattisgarh+493661!2m2!1d81.6686208!2d21.1346018!3m5!1s0x3a28db1573b8526b:0x3f6847db83d1b08e!8m2!3d21.1346018!4d81.6686208!16s%2Fm%2F0_x9qhl?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 771 XXX XXXX",
      details: "Available Monday to Saturday, 9:00 AM - 6:00 PM",
      color: "from-sky-400 to-cyan-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "cse@ssipmt.ac.in",
      details: "We'll respond within 24 hours",
      color: "from-cyan-500 to-sky-400"
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Mon - Sat: 9:00 AM - 6:00 PM",
      details: "Closed on Sundays and Public Holidays",
      color: "from-sky-500 to-cyan-400"
    }
  ];

  const quickLinks = [
    { title: "Admissions", description: "Learn about our admission process", icon: Users, action: "admissions" },
    { title: "Academic Programs", description: "Explore our CSE curriculum", icon: GraduationCap, action: "programs" },
    { title: "Campus Tour", description: "Have a virtual tour", icon: Building2, action: "https://tourmkr.com/F1yU45CLVU/44749218p&339.7h&90.08t" }
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
      {/* Contact Information Cards */}
      <section className="pt-56 pb-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ letterSpacing: '-0.01em' }}>
                Contact Information
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto mb-6"></div>
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
                  <Card 
                    className={`h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${info.link ? 'cursor-pointer' : ''}`}
                    onClick={() => info.link && window.open(info.link, '_blank')}
                  >
                    <div className={`h-2 bg-gradient-to-r ${info.color}`}></div>
                    <CardContent className="pt-8 pb-8 text-center">
                      <div className="inline-flex p-4 bg-cyan-50 rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-8 h-8 text-cyan-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{info.title}</h3>
                      <p className="text-lg font-semibold text-slate-700 mb-3">{info.content}</p>
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
      <section className="pt-32 pb-28 bg-gradient-to-br from-slate-100 to-blue-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ letterSpacing: '-0.01em' }}>
                Quick Access
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto mb-6"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Find what you're looking for quickly
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => {
                      if (link.action === 'admissions') {
                        onNavigateToAdmissions?.();
                      } else if (link.action === 'programs') {
                        onNavigateToPrograms?.();
                      } else if (link.action?.startsWith('http')) {
                        window.open(link.action, '_blank');
                      }
                    }}
                  >
                    <CardContent className="pt-8 pb-8 text-center">
                      <div className="inline-flex p-3 bg-cyan-50 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                        <link.icon className="w-6 h-6 text-cyan-500" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{link.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{link.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
