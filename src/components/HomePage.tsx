import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Bell, Mail, Linkedin, Youtube } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface HomePageProps {
  onNavigateToLogin: () => void;
}

export function HomePage({ onNavigateToLogin }: HomePageProps) {
  const announcements = [
    { id: 1, title: "Mid-Semester Examinations", date: "2025-10-20", content: "Mid-term exams will commence from October 20th, 2025." },
    { id: 2, title: "Faculty Development Program", date: "2025-10-18", content: "FDP on AI in Education scheduled for next week." },
    { id: 3, title: "Research Paper Submission Deadline", date: "2025-10-25", content: "Submit your research papers by October 25th." },
  ];

  const facultyData = [
    { name: "Dr. Anand Tamrakar", role: "HOD", img: "/images/hod.jpg" },
    { name: "Mrs. Keshika Jangde", role: "Assistant Professor", img: "/images/fac1.jpg" },
    { name: "Ms. Jyoti Gautam", role: "Assistant Professor", img: "/images/fac2.jpg" },
    { name: "Mr. Tegendra Kumar", role: "Assistant Professor", img: "/images/fac3.jpg" },
    { name: "Ms. Toshaniwali Bhargav", role: "Assistant Professor", img: "/images/fac4.jpg" },
    { name: "Ms. Upasana Khadatkar", role: "Assistant Professor", img: "/images/fac5.jpg" },
    { name: "Ms. Prapti Pandey", role: "Assistant Professor", img: "/images/fac6.jpg" },
    { name: "Ms. Preeti Tuli", role: "Assistant Professor", img: "/images/fac7.jpg" },
    { name: "Ms. Shraddha Taunk", role: "Associate Professor", img: "/images/fac8.jpg" },
    { name: "Ms. Poonam Gupta", role: "Assistant Professor", img: "/images/fac9.jpg" },
    { name: "Mr. Manoj Kumar Singh", role: "Assistant Professor", img: "/images/fac10.jpg" },
    { name: "Mr. Narendra Kumar Dewangan", role: "Senior Faculty", img: "/images/fac11.jpg" },
    { name: "Mr. Saurabh Mishra", role: "Assistant Professor", img: "/images/fac12.jpg" },
    { name: "Mr. Deepak Rao Khadatkar", role: "Associate Professor", img: "/images/fac13.jpg" },
    { name: "Mr. Vivek Kumar Soni", role: "Assistant Professor", img: "/images/fac14.jpg" },
    { name: "Mr. Vaibhav Chandrakar", role: "Assistant Professor", img: "/images/fac15.jpg" },
    { name: "Mr. Sunil Kumar Dewangan", role: "Senior Faculty", img: "/images/fac16.jpg" },
    { name: "Ms. Priyata Mishra", role: "Assistant Professor", img: "/images/fac17.jpg" },
  ];

  const hod = facultyData.find((f) => f.role === "HOD");
  const others = facultyData.filter((f) => f.role !== "HOD");

  // Animated default avatar using inline SVG + motion (no external images)
  function AnimatedAvatar({ size = 96 }: { size?: number }) {
    const radius = size / 2;
    const stroke = Math.max(4, size * 0.06);
    return (
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded-full shadow-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Pulsing ring */}
        <motion.circle
          cx={radius}
          cy={radius}
          r={radius - stroke / 2}
          fill="#E5E7EB"
          stroke="#3B82F6"
          strokeWidth={stroke}
          initial={{ strokeOpacity: 0.35 }}
          animate={{ strokeOpacity: [0.35, 0.15, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        {/* Head */}
        <circle cx={radius} cy={radius * 0.55} r={size * 0.18} fill="#9CA3AF" />
        {/* Shoulders */}
        <path
          d={`M ${radius - size * 0.3} ${radius + size * 0.2}
              C ${radius - size * 0.15} ${radius}, ${radius + size * 0.15} ${radius}, ${radius + size * 0.3} ${radius + size * 0.2}
              L ${radius + size * 0.3} ${size}
              L ${radius - size * 0.3} ${size} Z`}
          fill="#A3A3A3"
        />
      </motion.svg>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>

      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760131556605-7f2e63d00385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDF8fHx8MTc2MDQxOTI4NXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(96, 165, 250, 0.7) 100%)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <motion.h1 
              className="text-5xl mb-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to CSE Department Portal
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A comprehensive platform for faculty, students, and administrators
              to streamline academic operations and enhance learning experiences.
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onNavigateToLogin} 
                size="lg" 
                className="text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#f97316' }}
              >
                Login to Continue
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Faculty Section - Meet Our Faculty */}
      <section className="w-full py-16 bg-gray-50">
        <motion.h2 
          className="text-3xl font-semibold text-center mb-12"
          style={{ color: '#1e3a8a' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Faculty
        </motion.h2>

        {/* HOD Card */}
        <div className="flex justify-center mb-10">
          <motion.div 
            className="bg-white shadow-lg rounded-2xl p-6 w-[260px] md:w-[320px] text-center transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-28 h-28 mx-auto rounded-full mb-4 overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <AnimatedAvatar size={100} />
              </div>
            </div>
            <h3 className="text-xl font-semibold">{hod?.name}</h3>
            <p className="text-gray-600">{hod?.role}</p>
          </motion.div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-16 max-w-7xl mx-auto">
          {others.map((fac, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-24 h-24 mx-auto rounded-full mb-4 overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <AnimatedAvatar size={80} />
                </div>
              </div>
              <h3 className="text-lg font-semibold">{fac.name}</h3>
              <p className="text-gray-600">{fac.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Announcements Section */}
      <div className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-center mb-12"
            style={{ color: '#1e3a8a' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Latest Announcements
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className="p-3 rounded-lg" 
                        style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Bell className="h-6 w-6" style={{ color: '#f97316' }} />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="mb-1">{announcement.title}</h3>
                          <span className="text-sm text-gray-500">{announcement.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{announcement.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white py-12" style={{ backgroundColor: '#1e3a8a' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="mb-4">About Us</h3>
              <p className="text-sm text-gray-400">
                Leading institution committed to academic excellence and innovation in education.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Contact</h3>
              <p className="text-sm text-gray-400">Email: info@college.edu</p>
              <p className="text-sm text-gray-400">Phone: +1 234 567 8900</p>
            </div>
            <div>
              <h3 className="mb-4">Quick Links</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Help</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 CSE Department Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
