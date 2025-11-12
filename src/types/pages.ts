/**
 * Type definitions for Pages Module
 * Used across AboutPage, ContactPage, FacultyInfoPage, NewsEventsPage, 
 * ResearchPage, ProgramsPage, CSEDepartmentPage, etc.
 */

// ========================
// Faculty Info Page Types
// ========================
export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  experience: number;
  photo?: string;
}

export interface FacultyListResponse {
  status: 'success' | 'error';
  message: string;
  data: FacultyMember[];
}

// ========================
// News & Events Page Types
// ========================
export interface NewsEvent {
  id: number;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  recipient_type: 'student' | 'faculty' | 'all';
  is_read: boolean;
}

export interface NewsEventsResponse {
  status: 'success' | 'error';
  message: string;
  data: NewsEvent[];
}

// ========================
// Research Page Types
// ========================
export interface ResearchArea {
  id: number;
  title: string;
  description: string;
  faculty_count: number;
}

export interface Researcher {
  id: string;
  full_name: string;
  designation: string;
  specialization?: string;
  research_interest?: string;
  years_of_experience: number;
}

export interface ResearchInfo {
  research_areas: ResearchArea[];
  researchers: Researcher[];
}

export interface ResearchInfoResponse {
  status: 'success' | 'error';
  message: string;
  data: ResearchInfo;
}

// ========================
// Contact Page Types
// ========================
export interface ContactInfo {
  name: string;
  address?: string;
  phone: string;
  email: string;
  website?: string;
  head?: string;
  office?: string;
}

export interface ContactInfoResponse {
  status: 'success' | 'error';
  message: string;
  data: ContactInfo;
}

// ========================
// Achievements Types
// ========================
export interface Achievement {
  id: number;
  student_id: string;
  title: string;
  description: string;
  achievement_date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  type: 'academic' | 'extracurricular' | 'sports' | 'research';
}

export interface AchievementsResponse {
  status: 'success' | 'error';
  message: string;
  data: Achievement[];
}

// ========================
// Page Content Types
// ========================
export interface AboutPageContent {
  title: string;
  content: string;
  mission: string;
  vision: string;
}

export interface CSEDepartmentContent {
  title: string;
  established: string;
  description: string;
  head: string;
  specializations: string[];
}

export interface AdmissionsContent {
  title: string;
  programs: string[];
  eligibility: string;
  intake: string;
}

export interface ResearchContent {
  title: string;
  focus_areas: string[];
  publications_count: number;
  patents_count: number;
}

export type PageContent = AboutPageContent | CSEDepartmentContent | AdmissionsContent | ResearchContent;

export interface PageContentResponse {
  status: 'success' | 'error';
  message: string;
  data: PageContent;
}

// ========================
// Department Stats Types
// ========================
export interface DepartmentStats {
  faculty_count: number;
  student_count: number;
  research_publications: number;
  patents_filed: number;
  industry_collaborations: number;
  placement_percentage: number;
  average_package: string;
}

export interface DepartmentStatsResponse {
  status: 'success' | 'error';
  message: string;
  data: DepartmentStats;
}

// ========================
// Programs Page Types
// ========================
export interface Program {
  id: number;
  name: string;
  duration: string;
  seats: number;
  eligibility: string;
  specializations: string[];
}

export interface ProgramsResponse {
  status: 'success' | 'error';
  message: string;
  data: Program[];
}

// ========================
// API Request Parameters
// ========================
export interface FacultyListParams {
  department?: string;
  designation?: string;
}

export interface NewsEventsParams {
  type?: 'event' | 'news' | 'all';
  limit?: number;
  offset?: number;
}

export interface ResearchInfoParams {
  department?: string;
}

export interface ContactInfoParams {
  type?: 'general' | 'department' | 'admissions';
}

export interface AchievementsParams {
  student_id?: string;
  type?: 'academic' | 'extracurricular' | 'sports' | 'research';
}

export interface PageContentParams {
  page: 'about' | 'cse_department' | 'admissions' | 'research';
}

export interface DepartmentStatsParams {
  department?: string;
}
