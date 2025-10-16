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

  type Faculty = {
    id: number;
    name: string;
    designation: string;
    qualification: string;
    specialization: string;
    experience: string;
    dateOfJoining: string;
  };

  const hod: Faculty & { title: string } = {
    id: 0,
    name: "Dr. Anand Tamrakar",
    title: "Head of Department, CSE",
    designation: "Professor & Head",
    qualification: "Ph.D",
    specialization: "Computer Science & Engineering",
    experience: "20+ Years",
    dateOfJoining: "01-07-2010",
  };

  let facultyMembers: Faculty[] = [
    { id: 1, name: "Mrs. Keshika Jangde", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Computer Science", experience: "8.5 Yrs", dateOfJoining: "24-08-2023" },
    { id: 2, name: "Ms. Jyoti Gautam", designation: "Assistant Professor", qualification: "PG", specialization: "Computer Science", experience: "07 Yrs", dateOfJoining: "05-05-2025" },
    { id: 3, name: "Mr. Tegendra Kumar", designation: "Assistant Professor", qualification: "PG", specialization: "Computer Science", experience: "13 Yrs", dateOfJoining: "04-11-2019" },
    { id: 4, name: "Ms. Toshaniwali Bhargav", designation: "Assistant Professor", qualification: "PG", specialization: "IoT, Deep Learning", experience: "08 Yrs", dateOfJoining: "--" },
    { id: 5, name: "Ms. Upasana Khadatkar", designation: "Assistant Professor", qualification: "PG", specialization: "Image Processing", experience: "04 Yrs", dateOfJoining: "--" },
    { id: 6, name: "Ms. Prapti Pandey", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Image Processing", experience: "01 Yrs", dateOfJoining: "05-08-2024" },
    { id: 7, name: "Ms. Preeti Tuli", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "DBMS, ML, NLP", experience: "24.9 Yrs", dateOfJoining: "05-07-2016" },
    { id: 8, name: "Ms. Shraddha Taunk", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Machine Learning", experience: "9.5 Yrs", dateOfJoining: "01-04-2021" },
    { id: 9, name: "Ms. Poonam Gupta", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Machine Learning", experience: "9 Yrs", dateOfJoining: "18-03-2024" },
    { id: 10, name: "Mr. Manoj Kumar Singh", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Computer Networks", experience: "15 Yrs", dateOfJoining: "11-02-2022" },
    { id: 11, name: "Mr. Narendra Kumar Dewangan", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Deep Learning", experience: "17 Yrs", dateOfJoining: "02-01-2023" },
    { id: 12, name: "Mr. Saurabh Mishra", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Artificial Intelligence", experience: "02 Yrs", dateOfJoining: "14-08-2024" },
    { id: 13, name: "Mr. Deepak Rao Khadatkar", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "AI, ML, DL", experience: "17 Yrs", dateOfJoining: "19-07-2019" },
    { id: 14, name: "Mr. Vivek Kumar Soni", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Image Processing", experience: "9.5 Yrs", dateOfJoining: "23-08-2023" },
    { id: 15, name: "Mr. Vaibhav Chandrakar", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Machine Learning", experience: "12 Yrs", dateOfJoining: "01-06-2023" },
    { id: 16, name: "Mr. Sunil Kumar Dewangan", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Machine Learning, Soft Computing", experience: "16.5 Yrs", dateOfJoining: "--" },
    { id: 17, name: "Ms. Priyata Mishra", designation: "Assistant Professor", qualification: "Ph.D (Pursuing)", specialization: "Image Processing", experience: "10 Yrs", dateOfJoining: "23-08-2023" },
  ];
  // Sort alphabetically by name for backend-friendly static ordering
  facultyMembers = [...facultyMembers].sort((a, b) => a.name.localeCompare(b.name));

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

      {/* Faculty Section (Dynamic) */}
      <section id="faculty" className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-center mb-12 font-semibold"
            style={{ color: '#1e3a8a' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Faculty
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* HOD Highlight - 60% width on desktop */}
            <motion.div
              className="w-full lg:w-3/5"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px #3B82F6' }}
            >
              <Card className="shadow-lg rounded-xl h-full transition-transform duration-200">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="shrink-0">
                      <div className="p-1 rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                        <div className="rounded-full bg-white p-1">
                          <AnimatedAvatar size={140} />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-2xl font-semibold" style={{ color: '#1F2937' }}>{hod.name}</h3>
                        <p className="text-sm" style={{ color: '#3B82F6' }}>{hod.title}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm" style={{ color: '#4B5563' }}>
                        <p><span className="font-medium text-slate-800">Designation:</span> {hod.designation}</p>
                        <p><span className="font-medium text-slate-800">Qualification:</span> {hod.qualification}</p>
                        <p><span className="font-medium text-slate-800">Specialization:</span> {hod.specialization}</p>
                        <p><span className="font-medium text-slate-800">Experience:</span> {hod.experience}</p>
                        <p><span className="font-medium text-slate-800">Joining Date:</span> {hod.dateOfJoining}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Faculty Table (sorted, 40% width) */}
            <div className="w-full lg:w-2/5">
              <Card className="shadow-lg rounded-xl h-full">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-slate-50 text-slate-700">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium">Avatar</th>
                          <th className="px-4 py-3 text-left font-medium">Name</th>
                          <th className="px-4 py-3 text-left font-medium">Title</th>
                          <th className="px-4 py-3 text-left font-medium">Qualification</th>
                          <th className="px-4 py-3 text-left font-medium">Specialization</th>
                          <th className="px-4 py-3 text-left font-medium">Experience</th>
                          <th className="px-4 py-3 text-left font-medium">Joining</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {facultyMembers.map((f, i) => (
                          <motion.tr
                            key={f.id}
                            className={
                              `hover:bg-blue-50/60 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`
                            }
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                          >
                            <td className="px-4 py-3"><AnimatedAvatar size={48} /></td>
                            <td className="px-4 py-3 text-slate-900 font-medium">{f.name}</td>
                            <td className="px-4 py-3">{f.designation}</td>
                            <td className="px-4 py-3">{f.qualification}</td>
                            <td className="px-4 py-3">{f.specialization}</td>
                            <td className="px-4 py-3">{f.experience}</td>
                            <td className="px-4 py-3">{f.dateOfJoining}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
