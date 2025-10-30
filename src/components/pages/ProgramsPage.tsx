import React, { useState } from "react";

// Color palette from HomePage
const PRIMARY = "#1e3a8a"; // Deep blue
const ACCENT = "#f97316"; // Orange
const BG_LIGHT = "#f4f4f4";
const BG_DARK = "#16213e";

interface ProgramsPageProps {}

  // No dropdown needed
  return (
    <div style={{ background: BG_LIGHT, color: PRIMARY, fontFamily: 'Poppins, Inter, sans-serif' }}>
      {/* Top Navigation Bar */}
      <header style={{ background: PRIMARY, borderBottom: '1px solid #e0e7ef' }} className="sticky top-0 z-50 w-full shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div style={{ color: ACCENT }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 48 48">
                <path d="M12.08 24L4 19.25 9.96 8.75l8.08 4.74.01-9.5h11.91l.01 9.5 8.08-4.74L44 19.25 35.92 24 44 28.75l-5.96 10.5-8.08-4.74-.01 9.5H18.04l-.01-9.5-8.08 4.74L4 28.75 12.08 24Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold">SSIPMT Programs</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-white/80 hover:text-orange-500 text-sm font-medium transition-colors">About</a>
            <a href="#domains" className="text-white/80 hover:text-orange-500 text-sm font-medium transition-colors">Domains</a>
            <a href="#projects" className="text-white/80 hover:text-orange-500 text-sm font-medium transition-colors">Projects</a>
            <a href="#contact" className="text-white/80 hover:text-orange-500 text-sm font-medium transition-colors">Contact</a>
          </nav>
          <a href="#contact" className="rounded-lg h-10 px-5 bg-orange-500 text-white text-sm font-bold tracking-wide flex items-center justify-center hover:opacity-90 transition-transform">Join Us</a>
        </div>
      </header>

      <main className="flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="relative w-full min-h-[400px] flex items-center justify-center text-center" style={{ background: PRIMARY }}>
            <div className="absolute inset-0 opacity-20 z-0">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="https://cdn.pixabay.com/video/2021/09/20/888
              <div className="flex flex-col gap-4 rounded-lg p-6 border bg-white shadow hover:shadow-lg transition-all">
                <h3 className="text-orange-500 text-xl font-bold">Our Objectives</h3>
                <p className="text-gray-800 text-base">To execute industry-relevant projects, facilitate skill development, and foster a culture of continuous learning.</p>
              </div>
            </div>
          </section>

          {/* Domains Section */}
          <section className="py-16" id="domains">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h2 className="text-3xl font-bold" style={{ color: PRIMARY }}>Domains</h2>
              <p className="text-gray-700 text-base max-w-3xl">We focus on six core domains, providing hands-on experience and mentorship to build future-proof skills.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "💻", title: "Web Development", desc: "Building modern, responsive, and scalable web applications with cutting-edge technologies." },
                { icon: "📱", title: "App Development", desc: "Creating intuitive and powerful mobile applications for both Android and iOS platforms." },
                { icon: "🏛️", title: "Government Projects", desc: "Collaborating on impactful projects that serve our community and nation." },
                { icon: "🤖", title: "AI & Data Science", desc: "Leveraging machine learning and data analytics to solve complex problems." },
                { icon: "🔌", title: "IoT & Automation", desc: "Designing and building smart devices and automated systems for the future." },
                { icon: "🚀", title: "Startup Incubation", desc: "Nurturing innovative ideas and helping students launch their own tech ventures." },
              ].map((d, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-white border shadow hover:shadow-lg transition-all cursor-pointer">
                  <span style={{ fontSize: 48, color: ACCENT }}>{d.icon}</span>
                  <h3 className="text-xl font-bold" style={{ color: PRIMARY }}>{d.title}</h3>
                  <p className="text-gray-700 text-sm">{d.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Project Showcase Section */}
          <section className="py-16" id="projects">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h2 className="text-3xl font-bold" style={{ color: PRIMARY }}>Project Showcase</h2>
              <p className="text-gray-700 text-base max-w-3xl">Explore a selection of our innovative projects, showcasing the talent and dedication of our members.</p>
            </div>
            <div className="flex justify-center flex-wrap gap-2 mb-8">
              <button className="px-4 py-2 text-sm font-semibold rounded-full bg-orange-500 text-white">All</button>
              <button className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-200 text-gray-700 hover:bg-orange-100 transition-colors">AI</button>
              <button className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-200 text-gray-700 hover:bg-orange-100 transition-colors">Web Dev</button>
              <button className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-200 text-gray-700 hover:bg-orange-100 transition-colors">IoT</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Example project cards */}
              <div className="group rounded-xl overflow-hidden bg-white border flex flex-col">
                <div className="overflow-hidden">
                  <img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" alt="A computer screen showing lines of code" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcN_r-nL0rM9oPvtJtl7CId6lJoF4pahsc4VudyJXTnjJ-8_zm4vU4Bmk5bfkAA9w8rYWIWv8UzxHAaDTMhzUtg3-P4_C5xB01VxY5a6-afMGiWX6UPejMZI5-AmSca2-0-yTatRTFx8jwN5BMt8PEi6izlJ1wt31BLgYx3dujC_BoAbFaeQBQnA0Qcpa9ootSn9ngl8hmsNXBkApDWGs7Pm-CwHtVn6u6hlpYjZzrE3IJ5FShCpHrH73J86BARydvVKqUHgAuCpA" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold" style={{ color: PRIMARY }}>Project Alpha</h3>
                  <p className="text-gray-700 text-sm mt-2 mb-4 flex-grow">A machine learning model for predictive analysis in e-commerce.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-medium bg-orange-100 text-orange-500 px-2 py-1 rounded-full">Python</span>
                    <span className="text-xs font-medium bg-orange-100 text-orange-500 px-2 py-1 rounded-full">TensorFlow</span>
                  </div>
                  <a className="text-orange-500 font-semibold text-sm self-start hover:underline" href="#">View Details →</a>
                </div>
              </div>
              <div className="group rounded-xl overflow-hidden bg-white border flex flex-col">
                <div className="overflow-hidden">
                  <img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" alt="Close-up of HTML code on a monitor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-jdLeJ0QdcIKxPLKk0y3T5-BrAB-dhwkMgVCquaPuoKV8CGe1--IVRjZ4jfKi4FnO17k39zzAprvJ3MHDpVnJ4o-LuVW_3muCUkGmitiDWRRArghxlnQ-fCRjIQWebplI0MRkC5qY1_ENKzbFqBGHwwRsRLeja1Zyc9RrgDfbyd5ew_zWnGWATaPn0rHEHUN-f-voekuCzzq_Tc2kAhlSv5wcSTlb_cHr8IJBvWg_ZPlmYZcm_A0JJ94I5H7lkRX_Cd0OOZdWjDk" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold" style={{ color: PRIMARY }}>Project Beta</h3>
                  <p className="text-gray-700 text-sm mt-2 mb-4 flex-grow">A full-stack web application for community event management.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-medium bg-orange-100 text-orange-500 px-2 py-1 rounded-full">React</span>
                    <span className="text-xs font-medium bg-orange-100 text-orange-500 px-2 py-1 rounded-full">Node.js</span>
                    <span className="text-xs font-medium bg-orange-100 text-orange-500 px-2 py-1 rounded-full">MongoDB</span>
                  </div>
                  <a className="text-orange-500 font-semibold text-sm self-start hover:underline" href="#">View Details →</a>
                </div>
              </div>
              <div className="group rounded-xl overflow-hidden bg-white border flex flex-col">
                <div className="overflow-hidden">
                  <img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" alt="Green binary code on a black background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsIKY5VvmytyZiH9XJNvB2KYsRevKjsy9pF0fI3lSjTp9AQ1UvzwMnl6OGtBlVcVWuCIqdsCOrVjBe8Qn7IKeKTp80C3NPT5pXAcwM-FQy7wLl9npkPgqrs8V0KDOAEljBfnzIlwRBkl75ZY15UZU7rxHXaAC5hktsWj-07-3kF_oKTTcK4JelarFZbuHjGBOTMVTwgcVDROnvakWe_ME0yLVcYgk6K2gtoTyxYRsFiD6nfyjtPmq2AI7dOGw-aKwkIK8pAKVwGLw" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold" style={{ color: PRIMARY }}>Project Gamma</h3>
                  <p className="text-gray-700 text-sm mt-2 mb-4 flex-grow">An IoT-based smart irrigation system for sustainable agriculture.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-medium bg-orange-100 text-orange-500 px-2 py-1 rounded-full">Arduino</span>
                    <span className="text-xs font-medium bg-orange-100 text-orange-500 px-2 py-1 rounded-full">C++</span>
                    <span className="text-xs font-medium bg-orange-100 text-orange-500 px-2 py-1 rounded-full">Firebase</span>
                  </div>
                  <a className="text-orange-500 font-semibold text-sm self-start hover:underline" href="#">View Details →</a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16" id="contact">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h2 className="text-3xl font-bold" style={{ color: PRIMARY }}>Get In Touch</h2>
              <p className="text-gray-700 text-base max-w-3xl">Have a question, an idea, or want to collaborate? We'd love to hear from you. Drop us a message!</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500" placeholder="Your Name" type="text" />
                  <input className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500" placeholder="Your Email" type="email" />
                </div>
                <input className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500" placeholder="Subject" type="text" />
                <textarea className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500" placeholder="Your Message" rows={5}></textarea>
                <button className="rounded-lg h-12 px-6 bg-orange-500 text-white text-base font-bold tracking-wide hover:opacity-90 transition-transform self-start" type="submit">
                  <span className="truncate">Send Message</span>
                </button>
              </form>
              <div className="flex flex-col gap-6">
                <div className="rounded-lg overflow-hidden h-64 lg:h-full">
                  <iframe title="SSIPMT Raipur Map" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.525547076356!2d81.59711387588386!3d21.2508182804558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd4e8776379d%3A0xcd504369464b886!2sShri%20Shankaracharya%20Institute%20of%20Professional%20Management%20%26%20Technology%2C%20Raipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" style={{ border: 0, width: '100%', height: '100%' }}></iframe>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: PRIMARY }} className="w-full border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div style={{ color: ACCENT }}>
              <svg width="24" height="24" fill="none" viewBox="0 0 48 48">
                <path d="M12.08 24L4 19.25 9.96 8.75l8.08 4.74.01-9.5h11.91l.01 9.5 8.08-4.74L44 19.25 35.92 24 44 28.75l-5.96 10.5-8.08-4.74-.01 9.5H18.04l-.01-9.5-8.08 4.74L4 28.75 12.08 24Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-white text-md font-bold">SSIPMT Programs</h2>
          </div>
          <div className="flex items-center gap-4">
            <a className="text-white/60 hover:text-orange-500 transition-colors" href="#"><svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg></a>
            <a className="text-white/60 hover:text-orange-500 transition-colors" href="#"><svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a>
            <a className="text-white/60 hover:text-orange-500 transition-colors" href="#"><svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg></a>
          </div>
          <p className="text-sm text-white/70">© 2025 SSIPMT Programs. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
