import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Bell, Calendar, Award, BookOpen, GraduationCap, Mail, Linkedin, Youtube } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import img1 from "figma:asset/b690ce40310c4d3f8c38a3ba50fae9abb9c07804.png";
import img2 from "figma:asset/9996e2ba093b89781c6b1f1d9254ca6b6af72380.png";
import img3 from "figma:asset/fd6057f056141d9a4a23bf3af9c98f3c990e1fdf.png";

interface HomePageProps {
  onNavigateToLogin: () => void;
}

export function HomePage({ onNavigateToLogin }: HomePageProps) {
  const announcements = [
    { id: 1, title: "Mid-Semester Examinations", date: "2025-10-20", content: "Mid-term exams will commence from October 20th, 2025." },
    { id: 2, title: "Faculty Development Program", date: "2025-10-18", content: "FDP on AI in Education scheduled for next week." },
    { id: 3, title: "Research Paper Submission Deadline", date: "2025-10-25", content: "Submit your research papers by October 25th." },
  ];

  const facultyMembers = [
    // Row 1
    {
      id: 1,
      name: "Mrs. Keshika Jangde",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "N/A",
      experience: "8.5 Yrs",
      dateOfJoining: "24-08-2023",
      image: img1,
      imageIndex: 0
    },
    {
      id: 2,
      name: "Ms. Jyoti Gautam",
      designation: "Assistant Professor",
      qualification: "PG",
      specialization: "N/A",
      experience: "07 Yrs",
      dateOfJoining: "05-05-2025",
      image: img1,
      imageIndex: 1
    },
    {
      id: 3,
      name: "Mr. Tegendra Kumar",
      designation: "Assistant Professor",
      qualification: "PG",
      specialization: "N/A",
      experience: "13 Yrs",
      dateOfJoining: "04-11-2019",
      image: img1,
      imageIndex: 2
    },
    {
      id: 4,
      name: "Ms. Toshaniwali Bhargav",
      designation: "Assistant Professor",
      qualification: "PG",
      specialization: "IoT, Deep Learning",
      experience: "08 Yrs",
      dateOfJoining: "N/A",
      image: img1,
      imageIndex: 3
    },
    {
      id: 5,
      name: "Ms. Upasana Khadatkar",
      designation: "Assistant Professor",
      qualification: "PG",
      specialization: "Image Processing",
      experience: "04 Yrs",
      dateOfJoining: "N/A",
      image: img1,
      imageIndex: 4
    },
    // Row 2
    {
      id: 6,
      name: "Ms. Prapti pandey",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "Image Processing",
      experience: "01 Yrs",
      dateOfJoining: "05-08-2024",
      image: img2,
      imageIndex: 0
    },
    {
      id: 7,
      name: "Ms. Preeti Tuli",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "DBMS, ML, NLP",
      experience: "24.9 Yrs",
      dateOfJoining: "05-07-2016",
      image: img2,
      imageIndex: 1
    },
    {
      id: 8,
      name: "Ms. Shraddha Taunk",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "Machine Learning",
      experience: "9.5 Yrs",
      dateOfJoining: "01-04-2021",
      image: img2,
      imageIndex: 2
    },
    {
      id: 9,
      name: "Ms. Poonam Gupta",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "Machine Learning",
      experience: "9 Yrs",
      dateOfJoining: "18-03-2024",
      image: img2,
      imageIndex: 3
    },
    {
      id: 10,
      name: "Mr. Manoj Kumar Singh",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "Computer Network",
      experience: "15 Yrs",
      dateOfJoining: "11-02-2022",
      image: img2,
      imageIndex: 4
    },
    {
      id: 11,
      name: "Mr. Narendra Kumar Dewangan",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "Deep Learning",
      experience: "17 Yrs",
      dateOfJoining: "02-01-2023",
      image: img2,
      imageIndex: 5
    },
    // Row 3
    {
      id: 12,
      name: "Mr. Saurabh Mishra",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "Artificial Intelligence",
      experience: "02 Yrs",
      dateOfJoining: "14-08-2024",
      image: img3,
      imageIndex: 0
    },
    {
      id: 13,
      name: "Mr. Deepak Rao Khadatkar",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "AI, ML, DL",
      experience: "17 Yrs",
      dateOfJoining: "19-07-2019",
      image: img3,
      imageIndex: 1
    },
    {
      id: 14,
      name: "Mr. Vivek Kumar Soni",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "Image Processing",
      experience: "9.5 Yrs",
      dateOfJoining: "23-08-2023",
      image: img3,
      imageIndex: 2
    },
    {
      id: 15,
      name: "Mr. Vaibhav Chandrakar",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "Machine Learning",
      experience: "12 Yrs",
      dateOfJoining: "01-06-2023",
      image: img3,
      imageIndex: 3
    },
    {
      id: 16,
      name: "Mr. Sunil Kumar Dewangan",
      designation: "Assistant Professor & Head",
      qualification: "Ph.D (Pursuing)",
      specialization: "Machine Learning, Soft Computing",
      experience: "16.5 Yrs",
      dateOfJoining: "N/A",
      image: img3,
      imageIndex: 4
    },
    {
      id: 17,
      name: "Ms. Priyata Mishra",
      designation: "Assistant Professor",
      qualification: "Ph.D (Pursuing)",
      specialization: "Image Processing",
      experience: "10 Yrs",
      dateOfJoining: "23-08-2023",
      image: img3,
      imageIndex: 5
    },
  ];

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

      {/* Faculty Section */}
      <div id="faculty" className="py-16 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-center mb-12"
            style={{ color: '#1e3a8a' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Faculty
          </motion.h2>
        </div>
        
        {/* Horizontal Scrolling Container */}
        <motion.div 
          className="flex gap-6 px-6"
          animate={{ x: [0, -3400] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear"
            }
          }}
          style={{ width: 'max-content' }}
        >
          {[...facultyMembers, ...facultyMembers].map((faculty, index) => (
            <motion.div
              key={`${faculty.id}-${index}`}
              className="w-80 flex-shrink-0"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Card className="shadow-sm hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  {/* Profile Image */}
                  <div className="flex justify-center mb-4">
                    <div 
                      className="w-32 h-32 rounded-full overflow-hidden border-4"
                      style={{ borderColor: '#60a5fa' }}
                    >
                      <img 
                        src={faculty.image} 
                        alt={faculty.name}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: `${(faculty.imageIndex % 3) * -230}px ${Math.floor(faculty.imageIndex / 3) * -320}px`,
                          width: '690px',
                          height: '640px'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Faculty Information */}
                  <div className="text-center space-y-2">
                    <h3 style={{ color: '#1e3a8a' }}>{faculty.name}</h3>
                    <p className="text-sm" style={{ color: '#374151' }}>{faculty.designation}</p>
                    <div className="text-xs space-y-1" style={{ color: '#6b7280' }}>
                      <p>Qualification - {faculty.qualification}</p>
                      <p>Specialization - {faculty.specialization}</p>
                      <p>Year of Experience - {faculty.experience}</p>
                      <p>Date of Joining - {faculty.dateOfJoining}</p>
                    </div>
                    
                    {/* Social Icons */}
                    <div className="flex justify-center gap-3 pt-3">
                      <motion.button 
                        className="p-2 rounded"
                        style={{ backgroundColor: '#f97316' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="h-4 w-4 text-white" />
                      </motion.button>
                      <motion.button 
                        className="p-2 rounded"
                        style={{ backgroundColor: '#f97316' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="h-4 w-4 text-white" />
                      </motion.button>
                      <motion.button 
                        className="p-2 rounded"
                        style={{ backgroundColor: '#f97316' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Youtube className="h-4 w-4 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

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
