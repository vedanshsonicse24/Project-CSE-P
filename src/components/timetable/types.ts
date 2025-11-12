// ========================
// Core Types
// ========================
export interface Subject {
  code: string;
  name: string;
  faculty: string;
  type: 'theory' | 'lab' | 'library' | 'break';
  semester?: number;
  credits?: number;
  faculty_id?: string;
  faculty_name?: string;
  faculty_designation?: string;
}

export interface Faculty {
  initial: string;
  name: string;
  id?: string;
  full_name?: string;
  designation?: string;
  email?: string;
  phone?: string;
}

export interface Lab {
  code: string;
  name: string;
  inCharge: string;
  in_charge?: string;
  in_charge_name?: string;
  in_charge_phone?: string;
}

export interface TimetableCell {
  subject: string;
  teacher: string;
  type: 'theory' | 'lab' | 'library' | 'break';
}

export interface TimeSlot {
  id: string;
  day: string;
  period: number;
  subject: string;
  teacher: string;
  time: string;
  attendanceTaken: boolean;
  subject_code?: string;
  faculty_id?: string;
  semester?: number;
  section?: string;
  room_number?: string;
  start_time?: string;
  end_time?: string;
}

export interface Student {
  rollNo: string;
  name: string;
  attendance: { [key: string]: boolean };
  id?: string;
  roll?: string;
  enrollment_number?: string;
  semester?: number;
  section?: string;
  attendance_status?: 'Present' | 'Absent' | 'BOA' | null;
}

export type TimetableData = {
  [key: string]: TimetableCell[];
};

// ========================
// API Response Types
// ========================
export interface TimetableEntry {
  id: string;
  day: string;
  period: number;
  subject_code: string;
  faculty_id: string;
  time: string;
  semester: number;
  section: string;
  room_number?: string;
  start_time?: string;
  end_time?: string;
  subject_name?: string;
  subject_type?: 'theory' | 'lab' | 'library' | 'break';
  faculty_name?: string;
  faculty_designation?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TimetableResponse {
  status: 'success' | 'error';
  message: string;
  data: TimetableEntry[];
}

export interface SubjectResponse {
  status: 'success' | 'error';
  message: string;
  data: Subject[];
}

export interface LabResponse {
  status: 'success' | 'error';
  message: string;
  data: Lab[];
}

export interface DashboardStats {
  total_classes: number;
  today_classes: number;
  attendance_taken: number;
  total_subjects: number;
  attendance_pending: number;
  next_class: TimetableEntry | null;
  current_day: string;
}

export interface DashboardStatsResponse {
  status: 'success' | 'error';
  message: string;
  data: DashboardStats;
}

export interface AttendanceData {
  slot: TimetableEntry & {
    subject_name: string;
    subject_code: string;
    faculty_name: string;
  };
  students: Student[];
  date: string;
}

export interface AttendanceResponse {
  status: 'success' | 'error';
  message: string;
  data: AttendanceData;
}

export interface AttendanceSaveResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    message: string;
    records_saved: number;
    date: string;
  };
}

// ========================
// Request Types
// ========================
export interface CreateTimetableRequest {
  day: string;
  period: number;
  subject_code: string;
  faculty_id: string;
  time: string;
  semester: number;
  section: string;
  room_number?: string;
  start_time?: string;
  end_time?: string;
}

export interface UpdateTimetableRequest {
  id: string;
  day?: string;
  period?: number;
  subject_code?: string;
  faculty_id?: string;
  time?: string;
  semester?: number;
  section?: string;
  room_number?: string;
  start_time?: string;
  end_time?: string;
}

export interface SaveAttendanceRequest {
  timetable_id: string;
  date?: string;
  marked_by?: string;
  attendance: {
    student_id: string;
    status: 'Present' | 'Absent' | 'BOA';
  }[];
}

export interface CreateSubjectRequest {
  code: string;
  name: string;
  type: 'theory' | 'lab' | 'library' | 'break';
  faculty_id?: string;
  semester?: number;
  credits?: number;
}

export interface CreateLabRequest {
  code: string;
  name: string;
  in_charge?: string;
}

