import { motion } from "motion/react";
import { Linkedin, Youtube, Mail, MapPin, Phone, Instagram, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FooterProps {
  onNavigateToFacultyInfo?: () => void;
  onNavigateToNewsEvents?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToPrograms?: () => void;
  onNavigateToCOE?: () => void;
  onNavigateToCSA?: () => void;
  onNavigateToHome?: () => void;
}

export function Footer({ 
  onNavigateToFacultyInfo, 
  onNavigateToNewsEvents, 
  onNavigateToContact, 
  onNavigateToPrograms,
  onNavigateToCOE,
  onNavigateToCSA,
  onNavigateToHome
}: FooterProps) {
  const [clubsOpen, setClubsOpen] = useState(false);

  return (
    <footer className="text-white py-16" style={{ backgroundColor: '#1e3a8a' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <img
                src="https://ssipmt.edu.in/assets/images/logo/logo.jpg?v2"
                alt="SSIPMT Logo"
                className="h-32 w-40"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Excellence in technical education and research, fostering innovation and leadership for a better tomorrow.
            </p>
            <div className="flex justify-center space-x-4">
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
              <li><button onClick={() => onNavigateToHome?.()} className="text-gray-300 hover:text-white transition-colors text-left">Home</button></li>
              <li><button onClick={() => onNavigateToFacultyInfo?.()} className="text-gray-300 hover:text-white transition-colors text-left">Faculty</button></li>
              <li><button onClick={() => onNavigateToNewsEvents?.()} className="text-gray-300 hover:text-white transition-colors text-left">Announcements</button></li>
              <li><button onClick={() => onNavigateToContact?.()} className="text-gray-300 hover:text-white transition-colors text-left">Contact</button></li>
              <li 
                className="relative"
                onMouseEnter={() => setTimeout(() => setClubsOpen(true), 150)}
                onMouseLeave={() => setTimeout(() => setClubsOpen(false), 150)}
              >
                <button className="text-gray-300 hover:text-white transition-colors text-left flex items-center gap-1">
                  Clubs
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${clubsOpen ? 'rotate-180' : ''}`} />
                </button>
                {clubsOpen && (
                  <ul className="space-y-2 mt-2 pl-4 animate-fade-in">
                    <li>
                      <button 
                        onClick={() => {
                          onNavigateToCOE?.();
                          setClubsOpen(false);
                        }}
                        className="text-gray-300 hover:text-white transition-colors text-left"
                      >
                        COE
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          onNavigateToCSA?.();
                          setClubsOpen(false);
                        }}
                        className="text-gray-300 hover:text-white transition-colors text-left"
                      >
                        CSA
                      </button>
                    </li>
                  </ul>
                )}
              </li>
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
              <li>
                <button 
                  onClick={() => onNavigateToPrograms?.()}
                  className="hover:text-white transition-colors cursor-pointer text-left w-full"
                >
                  B.Tech Programs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPrograms?.()}
                  className="hover:text-white transition-colors cursor-pointer text-left w-full"
                >
                  M.Tech Programs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPrograms?.()}
                  className="hover:text-white transition-colors cursor-pointer text-left w-full"
                >
                  PhD Programs
                </button>
              </li>
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
                <a 
                  href="https://www.google.com/maps/place/Shri+Shankaracharya+Institute+Of+Professional+Management+%26+Technology,+Raipur/@21.1346018,81.6660459,17z/data=!3m1!4b1!4m16!1m9!4m8!1m0!1m6!1m2!1s0x3a28db1573b8526b:0x3f6847db83d1b08e!2sP.O,+Old+Dhamtari+Road,+Sejabahar,+Mujgahan,+Chhattisgarh+493661!2m2!1d81.6686208!2d21.1346018!3m5!1s0x3a28db1573b8526b:0x3f6847db83d1b08e!8m2!3d21.1346018!4d81.6686208!16s%2Fm%2F0_x9qhl?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  SSIPMT Campus, Raipur, Chhattisgarh, India
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+91 771 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>info@ssipmt.edu.in</span>
              </div>
              <div className="flex items-center">
                <Instagram className="h-5 w-5 mr-2 flex-shrink-0" />
                <a
                  href="https://www.instagram.com/ssipmt.raipur.cg?igsh=MTdhMm1lcTM4dmtoYw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Instagram
                </a>
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
