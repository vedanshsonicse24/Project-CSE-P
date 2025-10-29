import { motion } from "motion/react";
import { Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="text-white py-16" style={{ backgroundColor: '#1e3a8a' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <img
                src="https://ssipmt.edu.in/assets/images/logo/logo.jpg?v2"
                alt="SSIPMT Logo"
                className="h-12 w-12 rounded-full mr-3"
              />
              <h3 className="text-xl font-bold">SSIPMT</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Excellence in technical education and research, fostering innovation and leadership for a better tomorrow.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors text-left">Home</button></li>
              <li><button onClick={() => scrollToSection('departments')} className="text-gray-300 hover:text-white transition-colors text-left">Departments</button></li>
              <li><button onClick={() => scrollToSection('faculty')} className="text-gray-300 hover:text-white transition-colors text-left">Faculty</button></li>
              <li><button onClick={() => scrollToSection('announcements')} className="text-gray-300 hover:text-white transition-colors text-left">Announcements</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors text-left">Contact</button></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4">Programs</h3>
            <ul className="space-y-2 text-gray-300">
              <li>B.Tech Computer Science</li>
              <li>B.Tech Information Technology</li>
              <li>M.Tech CSE</li>
              <li>MCA</li>
              <li>Research Programs</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>SSIPMT Campus, Raipur, Chhattisgarh, India</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+91 771 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>info@ssipmt.edu.in</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 SSIPMT Raipur. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
