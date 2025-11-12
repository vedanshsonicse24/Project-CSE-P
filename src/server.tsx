// Base URL for PHP backend API
const BaseURL = "http://localhost/cse_portal_backend/";

// Specific endpoints for different modules
export const BOABaseURL = `${BaseURL}api/boa/`;
export const AttendanceBaseURL = `${BaseURL}api/attendance/`;
export const HODBaseURL = `${BaseURL}api/hod/`;
export const CommonBaseURL = `${BaseURL}api/common/`;
export const StudentBaseURL = `${BaseURL}api/students/`;
export const FacultyBaseURL = `${BaseURL}api/faculty/`;
export const SubjectsBaseURL = `${BaseURL}api/subjects/`;
export const TimetableBaseURL = `${BaseURL}api/timetable/`;
export const PagesBaseURL = `${BaseURL}api/pages/`;
export const LoginBaseURL = `${BaseURL}api/login/`;

// API endpoints for all components
export const API_ENDPOINTS = {
  // Authentication
  login: `${BaseURL}api/loginpage.php`,
  
  // Login Module Components
  loginModule: {
    panel: `${LoginBaseURL}loginpanel.php`,
    roles: `${LoginBaseURL}rolecarousel.php`,
    card: `${LoginBaseURL}card.php`,
  },
  
  // Homepage
  homepage: `${BaseURL}api/homepage.php`,
  
  // Timetable Module
  timetable: {
    // Main timetable CRUD
    get: `${TimetableBaseURL}timetable.php`, // GET all timetable entries
    create: `${TimetableBaseURL}timetable.php`, // POST new timetable entry
    update: `${TimetableBaseURL}timetable.php`, // PUT update timetable entry
    delete: `${TimetableBaseURL}timetable.php`, // DELETE timetable entry
    
    // Teacher timetable
    teacherSchedule: `${TimetableBaseURL}teachertimetable.php`, // GET by day
    
    // Attendance
    attendance: `${TimetableBaseURL}attendancepage.php`, // GET/POST attendance
    
    // Dashboard header
    dashboard: `${TimetableBaseURL}dashboardheader.php`, // GET dashboard stats
    
    // Subjects management
    subjects: `${TimetableBaseURL}subjects.php`, // GET/POST subjects
    
    // Faculty management
    facultyList: `${TimetableBaseURL}faculty.php`, // GET faculty list
    
    // Labs management
    labs: `${TimetableBaseURL}labs.php`, // GET/POST labs
  },
  
  // Common components
  statsCard: `${CommonBaseURL}statscard.php`,
  facultyCard: `${CommonBaseURL}facultycard.php`,
  
  // BOA Module
  boa: {
    submit: `${BOABaseURL}boasubmissionform.php`,
    manage: `${BOABaseURL}boamanagement.php`,
    studentRequests: `${BOABaseURL}student_boa_requests.php`, // GET student's BOA requests
    approve: `${BOABaseURL}approve_boa.php`, // POST approval/rejection by HOD or Class In-charge
  },
  
  // Attendance Module
  attendance: {
    mark: `${AttendanceBaseURL}mark_attendance.php`,
    student: `${AttendanceBaseURL}student_attendance.php`,
    fetch: `${AttendanceBaseURL}fetch_attendance.php`,
  },
  
  // HOD Module
  hod: {
    dashboard: `${HODBaseURL}hod_dashboard.php`,
    facultyManagement: `${HODBaseURL}faculty_management.php`,
    attendance: `${HODBaseURL}hod_attendance.php`,
    profile: `${HODBaseURL}hod_profile.php`,
  },
  
  // Faculty Module
  faculty: {
    list: `${FacultyBaseURL}faculty.php?endpoint=list`,
    profile: `${FacultyBaseURL}faculty.php?endpoint=profile`,
    updateProfile: `${FacultyBaseURL}faculty.php?endpoint=profile`,
    register: `${FacultyBaseURL}faculty.php?endpoint=register`,
    stats: `${FacultyBaseURL}faculty.php?endpoint=stats`,
    classes: `${FacultyBaseURL}faculty.php?endpoint=classes`,
    mentees: `${FacultyBaseURL}faculty.php?endpoint=mentees`,
    delete: `${FacultyBaseURL}faculty.php?endpoint=delete`,
    // Engage Lectures (Proxy)
    engage: {
      list: `${FacultyBaseURL}engage_lectures.php?action=list`,
      create: `${FacultyBaseURL}engage_lectures.php?action=create`,
      approve: `${FacultyBaseURL}engage_lectures.php?action=approve`,
    },
  },
  
  // Image With Fallback
  image: {
    faculty: (id: string) => `${BaseURL}api/figma/imagewithfallback.php?type=faculty&id=${id}`,
    student: (id: string) => `${BaseURL}api/figma/imagewithfallback.php?type=student&id=${id}`,
    validate: (url: string) => `${BaseURL}api/figma/imagewithfallback.php?action=validate&url=${encodeURIComponent(url)}`,
  },
  
  // Student Module
  student: {
    dashboard: `${StudentBaseURL}studentdashboard.php`,
    profile: `${StudentBaseURL}studentprofile.php`,
    profileModern: `${StudentBaseURL}studentprofilemodern.php`,
    management: `${StudentBaseURL}studentmanagement.php`,
    registration: `${StudentBaseURL}student_registration.php`,
    list: `${StudentBaseURL}get_students.php`,
    attendance: `${StudentBaseURL}student_attendance.php`,
    cvUpload: `${StudentBaseURL}upload_cv.php`,
    getCVs: `${StudentBaseURL}get_cvs.php`,
  },
  
  // Pages Module (informational/public pages)
  pages: {
    // Faculty Info Page - Get faculty list
    faculty: `${PagesBaseURL}pages.php?endpoint=faculty`,
    // News & Events Page - Get news/events
    news: `${PagesBaseURL}pages.php?endpoint=news`,
    // Research Page - Get research info
    research: `${PagesBaseURL}pages.php?endpoint=research`,
    // Contact Page - Get contact info
    contact: `${PagesBaseURL}pages.php?endpoint=contact`,
    // Achievements - Get student achievements
    achievements: `${PagesBaseURL}pages.php?endpoint=achievements`,
    // Page Content - Get static page content (About, CSE Dept, etc.)
    content: `${PagesBaseURL}pages.php?endpoint=content`,
    // Department Stats - Get department statistics
    stats: `${PagesBaseURL}pages.php?endpoint=stats`,
    // Programs Page - Get all programs
    programs: `${PagesBaseURL}pages.php?endpoint=programs`,
  },
};

export default BaseURL;