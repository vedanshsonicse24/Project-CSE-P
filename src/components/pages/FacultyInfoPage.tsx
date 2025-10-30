import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ChevronDown, Plus, Minus } from "lucide-react";

interface FacultyMember {
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  experience: string;
  photo: string;
}

export function FacultyInfoPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [economicsCollapsed, setEconomicsCollapsed] = useState(false);
  const [economicSciencesCollapsed, setEconomicSciencesCollapsed] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(12);

  const facultyData: FacultyMember[] = [
    {
      name: "Dr. Anand Tamrakar",
      designation: "HOD, Computer Science Engineering Department",
      qualification: "Ph.D",
      specialization: "Database, Data Mining",
      experience: "19 Yrs",
      photo: "placeholder-url-1"
    },
    {
      name: "Dr. Rakesh Kumar Khare",
      designation: "Associate Professor, Computer Science Engineering Department",
      qualification: "Ph.D",
      specialization: "Artificial Intelligence",
      experience: "24 Yrs",
      photo: "placeholder-url-2"
    },
    {
      name: "Dr. Yogesh Kumar Rathore",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D",
      specialization: "ML/DL",
      experience: "19.1 Yrs",
      photo: "placeholder-url-3"
    },
    {
      name: "Dr. Suman Kumar Swarnkar",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D",
      specialization: "AI",
      experience: "12 Yrs",
      photo: "placeholder-url-4"
    },
    {
      name: "Dr. Apurv Verma",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D",
      specialization: "ML",
      experience: "08 Yrs",
      photo: "placeholder-url-5"
    },
    {
      name: "Mr. Devbrat Sahu",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "AI",
      experience: "10.6 Yrs",
      photo: "placeholder-url-6"
    },
    {
      name: "Mr. Saurabh Mishra",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "AI",
      experience: "02 Yrs",
      photo: "placeholder-url-7"
    },
    {
      name: "Mr. Deepak Rao Khadatkar",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "AI/ML/DL",
      experience: "17 Yrs",
      photo: "placeholder-url-8"
    },
    {
      name: "Mr. Vivek Kumar Soni",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "Image Processing",
      experience: "9.5 Yrs",
      photo: "placeholder-url-9"
    },
    {
      name: "Mr. Vaibhav Chandrakar",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "ML",
      experience: "12 Yrs",
      photo: "placeholder-url-10"
    },
    {
      name: "Mr. Sunil Kumar Dewangan",
      designation: "Assistant Professor & Head, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "ML/Soft Computing",
      experience: "16.5 Yrs",
      photo: "placeholder-url-11"
    },
    {
      name: "Ms. Priyata Mishra",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "Image Processing",
      experience: "10 Yrs",
      photo: "placeholder-url-12"
    },
    {
      name: "Ms. Prapti Pandey",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "Image Processing",
      experience: "01 Yrs",
      photo: "placeholder-url-13"
    },
    {
      name: "Ms. Preeti Tuli",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "DBMS/ML/NLP",
      experience: "24.9 Yrs",
      photo: "placeholder-url-14"
    },
    {
      name: "Ms. Shraddha Taunk",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "ML",
      experience: "9.5 Yrs",
      photo: "placeholder-url-15"
    },
    {
      name: "Ms. Poonam Gupta",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "ML",
      experience: "9 Yrs",
      photo: "placeholder-url-16"
    },
    {
      name: "Mr. Manoj Kumar Singh",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "Computer Network",
      experience: "15 Yrs",
      photo: "placeholder-url-17"
    },
    {
      name: "Mr. Narendra Kumar Dewangan",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "DL",
      experience: "17 Yrs",
      photo: "placeholder-url-18"
    },
    {
      name: "Mrs. Keshika Jangde",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "Ph.D Pursuing",
      specialization: "Computer Science",
      experience: "8.5 Yrs",
      photo: "placeholder-url-19"
    },
    {
      name: "Ms. Jyoti Gautam",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "PG",
      specialization: "Computer Science",
      experience: "07 Yrs",
      photo: "placeholder-url-20"
    },
    {
      name: "Mr. Tegendra Kumar",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "PG",
      specialization: "Computer Science",
      experience: "13 Yrs",
      photo: "placeholder-url-21"
    },
    {
      name: "Ms. Toshaniwali Bhargav",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "PG",
      specialization: "IoT/DL",
      experience: "08 Yrs",
      photo: "placeholder-url-22"
    },
    {
      name: "Ms. Upasana Khadatkar",
      designation: "Assistant Professor, Computer Science Engineering Department",
      qualification: "PG",
      specialization: "Image Processing",
      experience: "04 Yrs",
      photo: "placeholder-url-23"
    }
  ];

  const tabs = ['All', 'Assistant Professor', 'Associate Professor', 'Professor'];

  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || 
      (activeTab === 'Assistant Professor' && faculty.designation.includes('Assistant Professor')) ||
      (activeTab === 'Associate Professor' && faculty.designation.includes('Associate Professor')) ||
      (activeTab === 'Professor' && faculty.designation.includes('Professor') && !faculty.designation.includes('Assistant') && !faculty.designation.includes('Associate'));
    return matchesSearch && matchesTab;
  }).slice(0, displayedCount);

  const getPlaceholderColor = (index: number): string => {
    const colors = ['#e8f4f8', '#f5f5dc', '#d3d3d3', '#ffffed'];
    return colors[index % 4];
  };

  const handleLoadMore = () => {
    setDisplayedCount(prev => Math.min(prev + 12, facultyData.length));
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .faculty-directory-iitk {
          font-family: 'Arial', sans-serif;
        }
        
        .header-section {
          background: linear-gradient(135deg, #1e3a5f 0%, #2c4666 100%);
          color: white;
          padding: 60px 0;
        }
        
        .hod-info-box {
          background: rgba(173, 216, 230, 0.1);
          border-left: 4px solid #87ceeb;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        
        .hod-name {
          font-size: 18px;
          color: #87ceeb;
          font-weight: bold;
          margin-bottom: 8px;
        }
        
        .hod-designation {
          font-size: 14px;
          color: #cbd5e1;
        }
        
        .department-description {
          font-size: 14px;
          color: #cbd5e1;
          max-width: 900px;
          line-height: 1.6;
          margin-top: 20px;
        }
        
        .tabs-container {
          background: white;
          border-bottom: 1px solid #e5e5e5;
          padding: 0 20px;
        }
        
        .tabs-nav {
          display: flex;
          gap: 0;
          overflow-x: auto;
        }
        
        .tab-button {
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        
        .tab-button.active {
          color: #8B0000;
          border-bottom-color: #8B0000;
        }
        
        .tab-button:hover {
          color: #8B0000;
        }
        
        .content-section {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .section-title {
          font-size: 24px;
          font-weight: bold;
          color: black;
        }
        
        .subsection-title {
          font-size: 16px;
          font-weight: 600;
          color: #8B0000;
          margin: 20px 0 15px 0;
        }
        
        .collapse-button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #666;
        }
        
        .faculty-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        
        @media (max-width: 1200px) {
          .faculty-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 900px) {
          .faculty-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 600px) {
          .faculty-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .faculty-card {
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          background: white;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .faculty-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        
        .faculty-photo {
          aspect-ratio: 3/4;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: bold;
          color: #666;
        }
        
        .faculty-info {
          padding: 15px;
          position: relative;
        }
        
        .faculty-name {
          font-size: 14px;
          font-weight: bold;
          color: black;
          margin-bottom: 5px;
          line-height: 1.3;
        }
        
        .faculty-designation {
          font-size: 12px;
          color: #666;
          line-height: 1.3;
        }
        
        .plus-button {
          position: absolute;
          bottom: 15px;
          right: 15px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #8B0000;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .plus-button:hover {
          background: #6d0000;
          transform: scale(1.1);
        }
        
        .load-more-button {
          display: block;
          margin: 40px auto;
          background: #8B0000;
          color: white;
          padding: 12px 40px;
          border: none;
          border-radius: 25px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(139, 0, 0, 0.3);
        }
        
        .load-more-button:hover {
          background: #6d0000;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(139, 0, 0, 0.4);
        }
        
        .floating-filter {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          border-radius: 8px;
          padding: 15px 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          z-index: 1000;
          min-width: 600px;
        }
        
        @media (max-width: 768px) {
          .floating-filter {
            position: relative;
            bottom: auto;
            left: auto;
            transform: none;
            margin: 20px;
            min-width: auto;
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }
        }
        
        .filter-label {
          font-size: 14px;
          font-weight: bold;
          color: black;
          white-space: nowrap;
        }
        
        .filter-select {
          min-width: 200px;
        }
        
        .filter-input {
          min-width: 200px;
        }
        
        .apply-button {
          background: #8B0000;
          color: white;
          padding: 8px 24px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .apply-button:hover {
          background: #6d0000;
        }
        
        .bottom-nav {
          background: #8B0000;
          color: white;
          padding: 20px 0;
          margin-top: 60px;
        }
        
        .bottom-nav-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-links {
          display: flex;
          gap: 30px;
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: bold;
          text-transform: uppercase;
          transition: opacity 0.3s ease;
        }
        
        .nav-link:hover {
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          .bottom-nav-content {
            flex-direction: column;
            gap: 20px;
          }
          
          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
          }
        }
        
        .contact-footer {
          background: #1e3a5f;
          color: #cbd5e1;
          padding: 40px 0;
        }
        
        .contact-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        
        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
        
        .contact-section h4 {
          color: white;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        
        .contact-section p {
          font-size: 13px;
          line-height: 1.5;
          margin: 5px 0;
        }
      `}</style>

      <div className="faculty-directory-iitk">
        {/* Header Section */}
        <div className="header-section">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
              Computer Science & Engineering
            </h1>
            
            <div className="hod-info-box">
              <div className="hod-name">Dr. Anand Tamrakar</div>
              <div className="hod-designation">Head of Department, Computer Science Engineering Department</div>
            </div>
            
            <div className="department-description">
              The Computer Science & Engineering Department at SSIPMT is committed to excellence in education, research, and innovation. 
              Our faculty members are engaged in cutting-edge research in areas including Artificial Intelligence, Machine Learning, 
              Deep Learning, Database Systems, Computer Networks, and Image Processing. We strive to nurture the next generation 
              of computer scientists and engineers who will drive technological advancement and innovation.
            </div>
          </div>
        </div>

        {/* Department Tabs */}
        <div className="tabs-container">
          <div className="tabs-nav">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="content-section">
          {/* Economics Section Header */}
          <div className="section-header">
            <h2 className="section-title">Computer Science & Engineering</h2>
            <button 
              className="collapse-button"
              onClick={() => setEconomicsCollapsed(!economicsCollapsed)}
            >
              {economicsCollapsed ? <Plus size={20} /> : <Minus size={20} />}
            </button>
          </div>

          {!economicsCollapsed && (
            <>
              {/* Economic Sciences Subsection */}
              <div className="section-header">
                <h3 className="subsection-title">Faculty Directory</h3>
                <button 
                  className="collapse-button"
                  onClick={() => setEconomicSciencesCollapsed(!economicSciencesCollapsed)}
                >
                  {economicSciencesCollapsed ? <Plus size={16} /> : <Minus size={16} />}
                </button>
              </div>

              {!economicSciencesCollapsed && (
                <>
                  {/* Faculty Grid */}
                  <div className="faculty-grid">
                    {filteredFaculty.map((faculty, index) => (
                      <div key={index} className="faculty-card">
                        <div 
                          className="faculty-photo"
                          style={{ backgroundColor: getPlaceholderColor(index) }}
                        >
                          {faculty.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="faculty-info">
                          <div className="faculty-name">{faculty.name}</div>
                          <div className="faculty-designation">{faculty.designation}</div>
                          <button className="plus-button">
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More Button */}
                  {displayedCount < facultyData.length && (
                    <button className="load-more-button" onClick={handleLoadMore}>
                      Load More Faculty
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Floating Filter Bar */}
        <div className="floating-filter">
          <span className="filter-label">Browse Faculty by:</span>
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cse">Computer Science & Engineering</SelectItem>
              <SelectItem value="ece">Electronics & Communication</SelectItem>
              <SelectItem value="me">Mechanical Engineering</SelectItem>
            </SelectContent>
          </Select>
          <Input
            className="filter-input"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="apply-button">Apply</button>
        </div>

        {/* Contact Footer */}
        <div className="contact-footer">
          <div className="contact-content">
            <div className="contact-section">
              <h4>Address</h4>
              <p>
                Shri Shankaracharya Institute of Professional Management & Technology<br />
                Old Dhamtari Road, P.O. Sejbahar<br />
                Mujgahan, Raipur, Chhattisgarh<br />
                Pin Code - 492015
              </p>
            </div>
            <div className="contact-section">
              <h4>Phone Numbers</h4>
              <p>Reception: 0771-3501600 / 0771-3501601</p>
              <p>Registrar: 0771-3501602</p>
            </div>
            <div className="contact-section">
              <h4>Email</h4>
              <p>info@ssipmt.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}