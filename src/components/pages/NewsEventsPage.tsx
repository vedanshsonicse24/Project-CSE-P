import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin,
  Users,
  Award,
  BookOpen,
  Trophy,
  Newspaper,
  ChevronRight,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

export function NewsEventsPage() {
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

  const upcomingEvents = [
    {
      id: 1,
      title: "NAVONMESH 25 - A National Level Hackathon",
      date: "November 7th & 8th, 2025",
      time: "24 Hours Competition",
      location: "SSIPMT, Raipur, Chhattisgarh",
      category: "Hackathon",
      description: "National level hackathon on real-time challenges of Raipur Nagar Nigam (CG). Event is live now!",
      prizes: {
        first: "Γé╣1,00,000",
        second: "Γé╣75,000", 
        third: "Γé╣50,000",
        consolation: "5 ├ù Γé╣10,000"
      },
      organizers: "SSIPMT & IEEE",
      associations: "CGTU, BHILAI (CG)",
      collaboration: "Municipal Corporation Raipur, Chhattisgarh",
      registrationDeadline: "Registration Closed",
      eventStatus: "Live Event",
      image: "/api/placeholder/300/200",
      bgColor: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Samvaya'25",
      subtitle: "HR Conclave I",
      date: "November 8th, 2025",
      time: "09:30 AM onwards",
      location: "SSIPMT, Raipur",
      category: "Conclave",
      description: "Join us for a synergy meet bridging industry and academia for tomorrow's leaders",
      theme: "AI & The Career Continuum - A Paradigm in Transition",
      speakers: [
        {
          name: "Mr. Charles Godwin",
          title: "HR Leader, Public Speaker",
          company: "Google"
        },
        {
          name: "Mr. Samarth Arya", 
          title: "University Talent Partner",
          company: "Adobe"
        },
        {
          name: "Mr. Ashish Singh",
          title: "Big 4 Firm, Govt Advisor, Ex-Director",
          company: "Deloitte"
        },
        {
          name: "Ms. Reshmi Nebumpilly",
          title: "Head of Campus & University Relation",
          company: "Providence"
        },
        {
          name: "Mr. Abinash Mohapatra",
          title: "Head - Campus Recruitment & Relations",
          company: "KPIT"
        },
        {
          name: "Ms. Jaya Kohli",
          title: "Associate Director - People & Culture",
          company: "Grant Thornton"
        }
      ],
      eventStatus: "Upcoming Event",
      image: "/api/placeholder/300/200",
      bgColor: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      title: "Vyom 2025",
      subtitle: "HR Conclave II",
      date: "November 10th, 2025",
      time: "09:30 AM onwards",
      location: "SSIPMT, Raipur",
      category: "Conclave",
      description: "Second edition of our prestigious HR conclave focusing on future workplace innovations and career development",
      theme: "Future of Work - Digital Transformation & Human Capital",
      speakers: [
        {
          name: "Industry Leaders",
          title: "HR Executives & Tech Leaders",
          company: "Leading MNCs"
        },
        {
          name: "Academic Experts",
          title: "Professors & Researchers",
          company: "Premier Institutes"
        },
        {
          name: "Startup Founders",
          title: "Entrepreneurs & Innovators",
          company: "Tech Startups"
        }
      ],
      eventStatus: "Upcoming Event",
      image: "/api/placeholder/300/200",
      bgColor: "from-blue-500 to-blue-600"
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: "SSIPMT Hosts Insightful Exposition on Wireless Communication & AI",
      date: "October 2025",
      summary: "Fostering innovation through collaboration! SSIPMT Raipur hosted an insightful exposition on wireless communication, AI, innovation and entrepreneurship.",
      category: "Media Coverage",
      image: "https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=The+Pioneer+Article",
      content: "The Pioneer newspaper covered SSIPMT's major exposition on emerging technologies including wireless communication, AI, innovation and entrepreneurship. The event showcased cutting-edge research and industry collaboration initiatives at SSIPMT Raipur, highlighting the institute's commitment to fostering innovation through academic-industry partnerships.",
      linkedinUrl: "https://www.linkedin.com/posts/shri-shankaracharya-institute-of-professional-management-and-technology-raipur_ssipmtraipur-wirelesscommunication-aiinnovation-activity-7383436460185686016-QCb8?utm_source=share&utm_medium=member_android&rcm=ACoAAFY7cGABpCq1CdWG0xf8vG4fPY-LSsD4hxI"
    },
    {
      id: 2,
      title: "Technical Experts Discuss Future of AI at SSIPMT",
      date: "October 2025",
      summary: "Exploring the future of Artificial Intelligence! Experts from various domains gathered at SSIPMT Raipur to discuss emerging AI trends.",
      category: "Technology",
      image: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=AI+Discussion+Article",
      content: "Leading technical experts conducted comprehensive discussions on the future of Artificial Intelligence and its impact on various industries...",
      linkedinUrl: "https://www.linkedin.com/posts/shri-shankaracharya-institute-of-professional-management-and-technology-raipur_ssipmtraipur-artificialintelligence-aidiscussion-activity-7383436280023568384-uVJk"
    },
    {
      id: 3,
      title: "Empowering Young Minds to Explore New Possibilities",
      date: "14-10-2025",
      summary: "At SSIPMT Raipur, we believe in nurturing young talent and providing them with opportunities to explore new career possibilities.",
      category: "Achievement",
      image: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Dainik+Bhaskar+Article",
      content: "Dainik Bhaskar featured SSIPMT's commitment to empowering young minds and providing them with new opportunities for career growth and development...",
      linkedinUrl: "https://www.linkedin.com/posts/shri-shankaracharya-institute-of-professional-management-and-technology-raipur_ssipmt-raipur-innovation-activity-7384167452613611520-okzm?utm_source=share&utm_medium=member_android&rcm=ACoAAFY7cGABpCq1CdWG0xf8vG4fPY-LSsD4hxI"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'competition':
        return Trophy;
      case 'hackathon':
        return BookOpen;
      case 'conclave':
        return Users;
      case 'cultural':
        return Users;
      case 'sports':
        return Award;
      case 'research':
        return BookOpen;
      case 'media coverage':
        return Newspaper;
      case 'technology':
        return BookOpen;
      case 'alumni':
        return Users;
      case 'achievement':
        return Trophy;
      default:
        return Calendar;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'competition':
        return 'bg-blue-100 text-blue-800';
      case 'hackathon':
        return 'bg-blue-100 text-blue-800';
      case 'conclave':
        return 'bg-blue-100 text-blue-800';
      case 'cultural':
        return 'bg-blue-100 text-blue-800';
      case 'sports':
        return 'bg-blue-100 text-blue-800';
      case 'research':
        return 'bg-blue-100 text-blue-800';
      case 'media coverage':
        return 'bg-blue-100 text-blue-800';
      case 'technology':
        return 'bg-blue-100 text-blue-800';
      case 'alumni':
        return 'bg-blue-100 text-blue-800';
      case 'achievement':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section - College Building Image with Overlay */}
      <motion.section 
        className="relative h-[400px] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/api/placeholder/1200/400')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
          <motion.div 
            className="text-center text-white"
            {...fadeInUp}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Upcoming Events & Latest News
            </motion.h1>
          </motion.div>
        </div>
        
        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </motion.section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Events Section */}
          <motion.div 
            className="lg:col-span-2"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600">Don't miss out on these exciting upcoming events</p>
            </motion.div>

            <div className="space-y-6">
              {upcomingEvents.map((event, index) => {
                const IconComponent = getCategoryIcon(event.category);
                return (
                  <motion.div
                    key={event.id}
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all bg-white border-l-4 border-l-blue-500">
                      <div className="flex">
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <Badge className={getCategoryColor(event.category)}>
                                <IconComponent className="w-3 h-3 mr-1" />
                                {event.category}
                              </Badge>
                              <div className="mt-2 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">
                                  {event.title}
                                </h3>
                                {event.subtitle && (
                                  <h4 className="text-lg font-semibold text-gray-700 mt-1">
                                    {event.subtitle}
                                  </h4>
                                )}
                              </div>
                              <p className="text-gray-600 mb-4">{event.description}</p>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            
                            {/* Show prizes for hackathon events */}
                            {event.category.toLowerCase() === 'hackathon' && event.prizes && (
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-800 mb-2">Prize Money:</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="text-blue-700">1st Prize: <span className="font-bold">{event.prizes.first}</span></div>
                                  <div className="text-blue-700">2nd Prize: <span className="font-bold">{event.prizes.second}</span></div>
                                  <div className="text-blue-700">3rd Prize: <span className="font-bold">{event.prizes.third}</span></div>
                                  <div className="text-blue-700">Consolation: <span className="font-bold">{event.prizes.consolation}</span></div>
                                </div>
                                
                                {/* Show event status */}
                                <div className="mt-3 flex gap-2">
                                  {event.eventStatus && (
                                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                      {event.eventStatus}
                                    </div>
                                  )}
                                  {event.registrationDeadline && (
                                    <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                                      {event.registrationDeadline}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {/* Show speakers and theme for conclave events */}
                            {event.category.toLowerCase() === 'conclave' && (
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                {event.theme && (
                                  <div className="mb-3">
                                    <h4 className="font-semibold text-blue-800 mb-1">Theme:</h4>
                                    <p className="text-blue-700 text-sm font-medium">{event.theme}</p>
                                  </div>
                                )}
                                
                                {event.speakers && event.speakers.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-blue-800 mb-2">Distinguished Speakers:</h4>
                                    <div className="grid grid-cols-1 gap-1 text-xs">
                                      {event.speakers.slice(0, 3).map((speaker, idx) => (
                                        <div key={idx} className="text-blue-700">
                                          <span className="font-semibold">{speaker.name}</span> - {speaker.title}, {speaker.company}
                                        </div>
                                      ))}
                                      {event.speakers.length > 3 && (
                                        <div className="text-blue-600 text-xs italic">
                                          +{event.speakers.length - 3} more speakers...
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {event.eventStatus && (
                                  <div className="mt-3">
                                    <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold inline-block">
                                      {event.eventStatus}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <Button variant="outline" className="group">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                        
                        <div className="w-48 h-full">
                          <div 
                            className={`w-full h-full bg-gradient-to-br ${event.bgColor} relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <IconComponent className="w-16 h-16 text-white/80" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* News & Announcements Section */}
          <motion.div 
            className="lg:col-span-1"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">News & Announcements</h2>
              <p className="text-gray-600">Latest updates and announcements</p>
            </motion.div>

            <div className="space-y-6">
              {newsItems.map((news, index) => {
                const IconComponent = getCategoryIcon(news.category);
                return (
                  <motion.div
                    key={news.id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all">
                      <div 
                        className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-2 left-2">
                          <Badge className={getCategoryColor(news.category)}>
                            <IconComponent className="w-3 h-3 mr-1" />
                            {news.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Calendar className="w-3 h-3" />
                          <span>{news.date}</span>
                        </div>
                        
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                          {news.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {news.summary}
                        </p>
                        
                        {news.linkedinUrl ? (
                          <a 
                            href={news.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                          >
                            Read More
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </a>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                            Read More
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Information Section */}
      <motion.section 
        className="bg-white text-black py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4 text-black">Contact Information</h2>
            <p className="text-black mb-6">
              For general inquiries, please contact us at{" "}
              <a href="mailto:info@ssipmt.edu" className="text-blue-600 hover:text-blue-700 transition-colors">
                info@ssipmt.edu
              </a>{" "}
              or call us at{" "}
              <a href="tel:+917712345678" className="text-blue-600 hover:text-blue-700 transition-colors">
                +91 771 234 5678
              </a>{" "}
              for updates.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button variant="ghost" size="sm" className="text-black hover:text-gray-700 hover:bg-gray-100">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-black hover:text-gray-700 hover:bg-gray-100">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-black hover:text-gray-700 hover:bg-gray-100">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-black hover:text-gray-700 hover:bg-gray-100">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="text-center mt-8 pt-8 border-t border-gray-300">
          <p className="text-black text-sm">
            ┬⌐ 2024 SSIPMT College of Engineering. All rights reserved.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
