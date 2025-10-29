import React from 'react';
import { Users, Award, BookOpen, Building, GraduationCap, Target, Star, Calendar, Code, Smartphone, Brain, Cpu, Rocket, Building2 } from 'lucide-react';

export function COEPage() {
  const domains = [
    {
      name: "Web Development",
      description: "Building modern, responsive, and scalable web applications with cutting-edge technologies.",
      icon: <Code className="w-12 h-12 text-cyan-500" />
    },
    {
      name: "App Development", 
      description: "Creating intuitive and powerful mobile applications for both Android and iOS platforms.",
      icon: <Smartphone className="w-12 h-12 text-cyan-500" />
    },
    {
      name: "Government Projects",
      description: "Collaborating on impactful projects that serve our community and nation.",
      icon: <Building2 className="w-12 h-12 text-cyan-500" />
    },
    {
      name: "AI & Data Science",
      description: "Leveraging machine learning and data analytics to solve complex problems.",
      icon: <Brain className="w-12 h-12 text-cyan-500" />
    },
    {
      name: "IoT & Automation",
      description: "Designing and building smart devices and automated systems for the future.",
      icon: <Cpu className="w-12 h-12 text-cyan-500" />
    },
    {
      name: "Startup Incubation",
      description: "Nurturing innovative ideas and helping students launch their own tech ventures.",
      icon: <Rocket className="w-12 h-12 text-cyan-500" />
    }
  ];

  const projects = [
    {
      title: "Project Alpha",
      description: "A machine learning model for predictive analysis in e-commerce.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop",
      tags: ["Python", "TensorFlow"],
      category: "AI"
    },
    {
      title: "Project Beta", 
      description: "A full-stack web application for community event management.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=300&fit=crop",
      tags: ["React", "Node.js", "MongoDB"],
      category: "Web Dev"
    },
    {
      title: "Project Gamma",
      description: "An IoT-based smart irrigation system for sustainable agriculture.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop",
      tags: ["Arduino", "C++", "Firebase"],
      category: "IoT"
    }
  ];

  const facultyMembers = [
    {
      name: "Dr. Anjali Verma",
      position: "Assistant Professor",
      expertise: "Web Development",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop"
    },
    {
      name: "Prof. Rahul Gupta", 
      position: "Associate Professor",
      expertise: "AI & Data Science",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
    },
    {
      name: "Dr. Sameer Khan",
      position: "Assistant Professor", 
      expertise: "App Development",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    },
    {
      name: "Prof. Sneha Reddy",
      position: "Associate Professor",
      expertise: "IoT & Automation", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
    },
    {
      name: "Dr. Vikram Singh",
      position: "Professor",
      expertise: "Cybersecurity",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
    },
    {
      name: "Prof. Meera Desai",
      position: "Assistant Professor",
      expertise: "Startup Incubation",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop"
    }
  ];

  return (
    <div className="coe-page min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-white z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-10">
            <source src="https://cdn.pixabay.com/video/2021/09/20/88835-621899175_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6 p-4 max-w-6xl">
          <h1 className="text-gray-900 text-4xl md:text-6xl font-black leading-tight tracking-tighter">
            Centre of Excellence – Computer Science & Engineering
          </h1>
          <h2 className="text-gray-600 text-lg md:text-xl font-normal leading-normal max-w-3xl">
            Where Innovation Meets Real-World Impact
          </h2>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold tracking-wide transition-transform hover:scale-105">
              Join the Club
            </button>
            <button className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-6 py-3 rounded-lg font-bold tracking-wide transition-all">
              Explore Our Projects
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <section className="py-16 sm:py-24" id="about">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-gray-900 text-3xl sm:text-4xl font-bold">About The Centre</h2>
            <p className="text-gray-600 text-base font-normal leading-relaxed max-w-3xl">
              The Centre of Excellence is dedicated to fostering innovation and practical skills in computer science. 
              We bridge the gap between academic theory and real-world application, empowering students to become the next generation of tech leaders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
            <div className="flex flex-col gap-4 rounded-lg p-6 border border-gray-200 bg-white shadow-sm transition-all hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-cyan-500 text-xl font-bold leading-normal">Our Mission</h3>
              <p className="text-gray-900 text-base leading-relaxed">
                To provide a platform for students to innovate, collaborate, and solve real-world problems through technology.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-lg p-6 border border-gray-200 bg-white shadow-sm transition-all hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-cyan-500 text-xl font-bold leading-normal">Our Vision</h3>
              <p className="text-gray-900 text-base leading-relaxed">
                To be a leading hub for research, development, and entrepreneurship in computer science and engineering.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-lg p-6 border border-gray-200 bg-white shadow-sm transition-all hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-cyan-500 text-xl font-bold leading-normal">Our Objectives</h3>
              <p className="text-gray-900 text-base leading-relaxed">
                To execute industry-relevant projects, facilitate skill development, and foster a culture of continuous learning.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 sm:py-24 bg-gray-50/70 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8" id="what-we-do">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h2 className="text-gray-900 text-3xl sm:text-4xl font-bold">What We Do</h2>
              <p className="text-gray-600 text-base font-normal leading-relaxed max-w-3xl">
                We focus on six core domains, providing hands-on experience and mentorship to build future-proof skills.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {domains.map((domain, index) => (
                <div key={index} className="group flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-white border border-gray-200 shadow-sm transition-all hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                  {domain.icon}
                  <h3 className="text-gray-900 text-xl font-bold">{domain.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{domain.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Showcase */}
        <section className="py-16 sm:py-24" id="projects">
          <div className="flex flex-col items-center gap-4 text-center mb-12">
            <h2 className="text-gray-900 text-3xl sm:text-4xl font-bold">Project Showcase</h2>
            <p className="text-gray-600 text-base font-normal leading-relaxed max-w-3xl">
              Explore a selection of our innovative projects, showcasing the talent and dedication of our members.
            </p>
          </div>
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-cyan-500 text-white">All</button>
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-colors">AI</button>
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-colors">Web Dev</button>
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-colors">IoT</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group rounded-xl overflow-hidden bg-white border border-gray-200 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="overflow-hidden">
                  <img 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    src={project.image} 
                    alt={project.title}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-gray-900 text-xl font-bold">{project.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs font-medium bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <a className="text-cyan-500 font-semibold text-sm self-start hover:underline" href="#">View Details →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-24 bg-gray-50/70 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8" id="team">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h2 className="text-gray-900 text-3xl sm:text-4xl font-bold">Our Team</h2>
              <p className="text-gray-600 text-base font-normal leading-relaxed max-w-3xl">
                Meet the brilliant minds behind the Centre of Excellence. A dedicated group of students and faculty pushing the boundaries of technology.
              </p>
            </div>
            
            {/* Club President */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start mb-16">
              <div className="lg:col-span-2 group flex flex-col items-center text-center p-6 rounded-xl bg-white border border-cyan-500/50 shadow-lg shadow-cyan-500/10 transition-all hover:shadow-cyan-500/20 hover:shadow-lg hover:-translate-y-2">
                <img 
                  alt="Club President Photo" 
                  className="w-40 h-40 rounded-full object-cover border-4 border-cyan-500 mb-5" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                />
                <h3 className="text-gray-900 text-2xl font-bold">Aarav Sharma</h3>
                <p className="text-cyan-500 text-base font-semibold mb-3">Club President</p>
                <blockquote className="text-gray-600 text-sm italic leading-relaxed border-l-2 border-cyan-500/50 pl-4 my-4">
                  "Leading this club is about empowering every member to turn their passion into impactful projects. Together, we're not just coding; we're building the future."
                </blockquote>
              </div>
              
              {/* Faculty Spotlight */}
              <div className="lg:col-span-3 p-8 rounded-xl bg-white border border-gray-200 shadow-sm transition-all hover:border-gray-300">
                <h3 className="text-cyan-500 text-2xl font-bold mb-4">Faculty Spotlight</h3>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img 
                    alt="Faculty Member Photo" 
                    className="w-28 h-28 rounded-lg object-cover" 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-gray-900 text-xl font-bold">Dr. Priya Singh</h4>
                    <p className="text-gray-600 text-sm mb-3">Professor, Head of CoE</p>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      With over 15 years of experience in AI and Machine Learning, Dr. Singh is the guiding force behind our centre. 
                      Her dedication to student mentorship and research excellence inspires us to push the boundaries of what's possible.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-gray-900 font-semibold mb-2">Message from the Faculty:</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "Our goal at the Centre of Excellence is not just to teach technology, but to cultivate a mindset of innovation and problem-solving. 
                    We are committed to providing our students with the resources and guidance they need to excel and become leaders in the tech industry."
                  </p>
                </div>
              </div>
            </div>

            {/* Faculty Mentors */}
            <div className="flex flex-col items-center gap-4 text-center my-12">
              <h3 className="text-gray-900 text-3xl sm:text-4xl font-bold">Faculty Mentors</h3>
              <p className="text-gray-600 text-base font-normal leading-relaxed max-w-3xl">
                Our team of experienced faculty members provides invaluable guidance and support to our student innovators.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {facultyMembers.map((faculty, index) => (
                <div key={index} className="group flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-200 shadow-sm transition-all hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg">
                  <img 
                    alt="Faculty Mentor" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500/50 mb-4 transition-all group-hover:border-cyan-500 group-hover:scale-105" 
                    src={faculty.image}
                  />
                  <h4 className="text-gray-900 text-lg font-bold">{faculty.name}</h4>
                  <p className="text-gray-600 text-sm">{faculty.position}</p>
                  <p className="text-cyan-500 text-xs font-semibold mt-2">Expertise: {faculty.expertise}</p>
                  <button className="mt-4 px-4 py-2 text-xs font-bold text-white bg-cyan-500/80 rounded-full transition-all group-hover:bg-cyan-500 hover:scale-105">
                    View Bio
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-24" id="contact">
          <div className="flex flex-col items-center gap-4 text-center mb-12">
            <h2 className="text-gray-900 text-3xl sm:text-4xl font-bold">Get In Touch</h2>
            <p className="text-gray-600 text-base font-normal leading-relaxed max-w-3xl">
              Have a question, an idea, or want to collaborate? We'd love to hear from you. Drop us a message!
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500" 
                  placeholder="Your Name" 
                  type="text"
                />
                <input 
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500" 
                  placeholder="Your Email" 
                  type="email"
                />
              </div>
              <input 
                className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500" 
                placeholder="Subject" 
                type="text"
              />
              <textarea 
                className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500" 
                placeholder="Your Message" 
                rows={5}
              ></textarea>
              <button 
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold tracking-wide transition-transform hover:scale-105 self-start" 
                type="submit"
              >
                Send Message
              </button>
            </form>
            <div className="flex flex-col gap-6">
              <div className="rounded-lg overflow-hidden h-64 lg:h-full shadow-lg">
                <iframe 
                  allowFullScreen
                  height="100%" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.525547076356!2d81.59711387588386!3d21.2508182804558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd4e8776379d%3A0xcd504369464b886!2sShri%20Shankaracharya%20Institute%20of%20Professional%20Management%20%26%20Technology%2C%20Raipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  style={{ border: 0 }} 
                  width="100%"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}