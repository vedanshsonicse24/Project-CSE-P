/**
 * ContactPage with Backend Integration Example
 * This is a complete working example showing how to integrate the ContactPage
 * with the PHP backend API.
 * 
 * You can copy this pattern to integrate other pages.
 */

import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
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
  Award,
  Loader2
} from "lucide-react";
import { API_ENDPOINTS } from "../../server";
import type { ContactInfo, ContactInfoResponse } from "../../types/pages";

interface ContactPageProps {
  onNavigateToAdmissions?: () => void;
  onNavigateToPrograms?: () => void;
}

export function ContactPageIntegrated({ onNavigateToAdmissions, onNavigateToPrograms }: ContactPageProps = {}) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // FETCH DATA FROM BACKEND
  // ============================================
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch department contact info
      const url = `${API_ENDPOINTS.pages.contact}&type=department`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ContactInfoResponse = await response.json();

      if (result.status === 'success') {
        setContactInfo(result.data);
        toast.success('Contact information loaded');
      } else {
        throw new Error(result.message || 'Failed to fetch contact info');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error('Failed to load contact information', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // ANIMATION VARIANTS
  // ============================================
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

  // ============================================
  // LOADING STATE
  // ============================================
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-600 font-semibold mb-2">Error Loading Contact Info</p>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
          <Button onClick={fetchContactInfo} className="gap-2">
            <ArrowRight className="w-4 h-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // ============================================
  // STATIC DATA (unchanged)
  // ============================================
  const quickLinks = [
    { title: "Admissions", description: "Learn about our admission process", icon: Users, action: "admissions" },
    { title: "Academic Programs", description: "Explore our CSE curriculum", icon: GraduationCap, action: "programs" },
    { title: "Campus Tour", description: "Have a virtual tour", icon: Building2, action: "https://tourmkr.com/F1yU45CLVU/44749218p&339.7h&90.08t" }
  ];

  const socialMedia = [
    { icon: Facebook, link: "https://facebook.com/ssipmt", label: "Facebook" },
    { icon: Instagram, link: "https://instagram.com/ssipmt", label: "Instagram" },
    { icon: Linkedin, link: "https://linkedin.com/school/ssipmt", label: "LinkedIn" },
    { icon: Twitter, link: "https://twitter.com/ssipmt", label: "Twitter" },
    { icon: Youtube, link: "https://youtube.com/ssipmt", label: "YouTube" }
  ];

  // ============================================
  // DYNAMIC CONTACT INFO (from API)
  // ============================================
  const contactInfoCards = contactInfo ? [
    {
      icon: MapPin,
      title: "Visit Us",
      content: contactInfo.name,
      details: contactInfo.office || "Computer Science & Engineering Department",
      color: "from-cyan-400 to-sky-500",
      link: undefined
    },
    {
      icon: Phone,
      title: "Call Us",
      content: contactInfo.phone,
      details: "Available Monday to Saturday, 9:00 AM - 6:00 PM",
      color: "from-sky-400 to-cyan-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: contactInfo.email,
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
  ] : [];

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide">GET IN TOUCH</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Contact Us
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We're here to answer your questions and help you begin your journey with us
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* HOD Information (if available from API) */}
        {contactInfo?.head && (
          <motion.div {...fadeInUp} className="mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-600 rounded-full">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-semibold">HEAD OF DEPARTMENT</p>
                  <h3 className="text-2xl font-bold text-gray-900">{contactInfo.head}</h3>
                </div>
              </div>
              {contactInfo.office && (
                <p className="text-gray-600 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {contactInfo.office}
                </p>
              )}
            </Card>
          </motion.div>
        )}

        {/* Contact Info Cards */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 mb-16"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {contactInfoCards.map((info, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="group hover:shadow-2xl transition-all duration-300 h-full bg-white border-2 hover:border-blue-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${info.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-gray-900">{info.title}</CardTitle>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-blue-600 hover:underline break-all"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-gray-800 break-all">{info.content}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{info.details}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div {...fadeInUp} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Quick Links</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-white"
                onClick={() => {
                  if (link.action === "admissions" && onNavigateToAdmissions) {
                    onNavigateToAdmissions();
                  } else if (link.action === "programs" && onNavigateToPrograms) {
                    onNavigateToPrograms();
                  } else if (link.action.startsWith('http')) {
                    window.open(link.action, '_blank');
                  }
                }}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <link.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{link.title}</h3>
                  <p className="text-gray-600 mb-4">{link.description}</p>
                  <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div {...fadeInUp} className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Connect With Us</h2>
          <div className="flex justify-center gap-4">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600 text-gray-700 hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
