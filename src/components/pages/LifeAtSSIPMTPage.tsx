import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Users, 
  Trophy, 
  Music, 
  Palette, 
  Dumbbell,
  Coffee,
  BookOpen,
  Laptop,
  Heart,
  Sparkles,
  Camera,
  Gamepad2,
  Pizza,
  Bus,
  Home,
  Utensils,
  Wifi,
  Shield,
  Star,
  Calendar
} from "lucide-react";

export function LifeAtSSIPMTPage() {
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

  const campusLife = [
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Connect with students from diverse backgrounds and create lasting friendships",
      color: "bg-blue-600"
    },
    {
      icon: Trophy,
      title: "Sports & Athletics",
      description: "State-of-the-art sports facilities and inter-college tournaments",
      color: "bg-green-600"
    },
    {
      icon: Palette,
      title: "Cultural Events",
      description: "Annual fests, cultural programs, and artistic celebrations",
      color: "bg-purple-600"
    },
    {
      icon: Laptop,
      title: "Tech Communities",
      description: "Coding clubs, hackathons, and innovation workshops",
      color: "bg-maroon-600"
    }
  ];

  const studentClubs = [
    {
      name: "Coding Club",
      icon: Laptop,
      members: "150+",
      description: "Competitive programming, hackathons, and tech workshops",
      achievements: ["Winner of 5+ hackathons", "20+ projects launched"]
    },
    {
      name: "Cultural Society",
      icon: Music,
      members: "200+",
      description: "Dance, music, drama, and cultural performances",
      achievements: ["Annual Fest: 5000+ attendees", "State-level winner"]
    },
    {
      name: "Sports Club",
      icon: Trophy,
      members: "180+",
      description: "Cricket, football, basketball, athletics and more",
      achievements: ["Inter-college champions", "10+ state players"]
    },
    {
      name: "Photography Club",
      icon: Camera,
      members: "80+",
      description: "Photography workshops, exhibitions, and campus coverage",
      achievements: ["Annual exhibition", "Published works"]
    },
    {
      name: "Literary Society",
      icon: BookOpen,
      members: "100+",
      description: "Debates, quizzes, creative writing, and book clubs",
      achievements: ["National debate winners", "Published magazine"]
    },
    {
      name: "Gaming Club",
      icon: Gamepad2,
      members: "120+",
      description: "E-sports tournaments, gaming nights, and competitions",
      achievements: ["Regional champions", "Monthly tournaments"]
    }
  ];

  const facilities = [
    {
      icon: Home,
      title: "Hostel Accommodation",
      description: "Separate hostels for boys and girls with 24/7 security",
      features: ["Wi-Fi enabled", "24/7 water & electricity", "Common rooms", "Laundry service"]
    },
    {
      icon: Utensils,
      title: "Cafeteria & Mess",
      description: "Hygienic food with varied menu options",
      features: ["Multi-cuisine", "Affordable pricing", "Special diet options", "Late-night snacks"]
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      description: "Campus-wide Wi-Fi connectivity",
      features: ["100 Mbps speed", "24/7 availability", "Lab & hostel coverage", "Unlimited access"]
    },
    {
      icon: Bus,
      title: "Transport Facility",
      description: "Bus service covering major city routes",
      features: ["Multiple routes", "Safe & comfortable", "Affordable fees", "Regular schedules"]
    },
    {
      icon: Shield,
      title: "Security & Safety",
      description: "Round-the-clock security and medical support",
      features: ["CCTV surveillance", "24/7 guards", "Medical room", "Emergency response"]
    },
    {
      icon: Dumbbell,
      title: "Gym & Fitness Center",
      description: "Modern equipment for fitness enthusiasts",
      features: ["Latest equipment", "Trainer available", "Yoga classes", "Indoor games"]
    }
  ];

  const events = [
    {
      name: "TechFest",
      type: "Technical",
      month: "March",
      description: "Annual technical fest with competitions, workshops, and exhibitions",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "CulturalFiesta",
      type: "Cultural",
      month: "February",
      description: "Grand cultural celebration with dance, music, drama, and fashion show",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "SportsWeek",
      type: "Sports",
      month: "October",
      description: "Inter-department sports competitions and athletic events",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Freshers' Welcome",
      type: "Social",
      month: "September",
      description: "Grand welcome for new students with performances and interactions",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      year: "B.Tech CSE, 2024",
      text: "The campus life at SSIPMT has been incredible. From tech events to cultural fests, there's always something exciting happening!",
      avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=800000&color=fff"
    },
    {
      name: "Rahul Verma",
      year: "M.Tech AI, 2023",
      text: "Being part of the Coding Club changed my life. The collaborative environment and mentorship helped me land my dream job.",
      avatar: "https://ui-avatars.com/api/?name=Rahul+Verma&background=800000&color=fff"
    },
    {
      name: "Anjali Patel",
      year: "MCA, 2025",
      text: "The hostel facilities and campus infrastructure are top-notch. I feel safe and comfortable here, which helps me focus on studies.",
      avatar: "https://ui-avatars.com/api/?name=Anjali+Patel&background=800000&color=fff"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-r from-purple-600 via-maroon-600 to-pink-600 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            {...fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Life at SSIPMT</h1>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              Where learning meets living - Experience campus life beyond the classroom
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.section>

      {/* Campus Life Highlights */}
      <section className="py-16 container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Students Love SSIPMT</h2>
            <p className="text-xl text-gray-600">
              A holistic experience that shapes you for success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {campusLife.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all text-center">
                  <CardContent className="pt-8">
                    <div className={`inline-flex p-4 ${item.color} rounded-full mb-4`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Student Clubs */}
      <section className="py-16 bg-gray-50">
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
              Student Clubs & Societies
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studentClubs.map((club, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all border-t-4 border-maroon-600">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-maroon-100 rounded-lg">
                          <club.icon className="w-8 h-8 text-maroon-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{club.name}</h3>
                          <Badge variant="secondary">{club.members} Members</Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{club.description}</p>
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-gray-900">Achievements:</div>
                        {club.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Campus Facilities */}
      <section className="py-16">
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
              World-Class Campus Facilities
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-blue-100 rounded-full">
                          <facility.icon className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{facility.title}</h3>
                      <p className="text-gray-600 text-center mb-4">{facility.description}</p>
                      <ul className="space-y-2">
                        {facility.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Annual Events */}
      <section className="py-16 bg-gray-50">
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
              Annual Events & Celebrations
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all h-full">
                    <div className="relative h-48">
                      <img 
                        src={event.image} 
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-maroon-600">{event.type}</Badge>
                      </div>
                    </div>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">{event.name}</h3>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{event.month}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{event.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-gradient-to-r from-maroon-600 to-maroon-800 text-white">
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
              className="text-4xl font-bold text-center mb-12"
            >
              What Our Students Say
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full bg-white/10 border-white/20 hover:bg-white/20 transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-2 border-white"
                        />
                        <div>
                          <div className="font-bold text-lg">{testimonial.name}</div>
                          <div className="text-sm text-white">{testimonial.year}</div>
                        </div>
                      </div>
                      <p className="text-white font-medium italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Experience Campus Life Yourself
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book a campus tour and see what makes SSIPMT special
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-maroon-600 hover:bg-maroon-700 text-white text-lg px-8 py-6">
                Schedule Campus Tour
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
