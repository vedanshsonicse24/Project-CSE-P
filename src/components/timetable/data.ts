import { Subject, Faculty, Lab, TimetableData, TimeSlot, Student } from './types';

export const subjects: Subject[] = [
  { code: 'M-III', name: 'Mathematics-III', faculty: 'AS', type: 'theory' },
  { code: 'PPL', name: 'Principles of Programming Languages', faculty: 'SM', type: 'theory' },
  { code: 'DSA', name: 'Data Structures & Algorithms', faculty: 'VC', type: 'theory' },
  { code: 'DELD', name: 'Digital Electronics', faculty: 'AJ', type: 'theory' },
  { code: 'OS', name: 'Operating System', faculty: 'ST', type: 'theory' },
  { code: 'CS-LAB', name: 'CS Lab', faculty: 'VC', type: 'lab' },
  { code: 'DSA-LAB', name: 'DSA Lab', faculty: 'VC', type: 'lab' },
  { code: 'DELD-LAB', name: 'DELD Lab', faculty: 'AJ', type: 'lab' },
  { code: 'LIB', name: 'Library', faculty: '-', type: 'library' },
  { code: 'LUNCH', name: 'Lunch Break', faculty: '-', type: 'break' },
];

export const faculty: Faculty[] = [
  { initial: 'AS', name: 'Prof. A. Sharma' },
  { initial: 'SM', name: 'Dr. S. Mishra' },
  { initial: 'VC', name: 'Mr. V. Chandrakar' },
  { initial: 'AJ', name: 'Dr. A. Jain' },
  { initial: 'ST', name: 'Prof. S. Tiwari' },
];

export const labs: Lab[] = [
  { code: 'CS-LAB', name: 'Computer Science Lab', inCharge: 'VC' },
  { code: 'DSA-LAB', name: 'Data Structures Lab', inCharge: 'VC' },
  { code: 'DELD-LAB', name: 'Digital Electronics Lab', inCharge: 'AJ' },
];

export const initialTimetableData: TimetableData = {
  Monday: [
    { subject: 'M-III', teacher: 'AS', type: 'theory' },
    { subject: 'PPL', teacher: 'SM', type: 'theory' },
    { subject: 'LUNCH', teacher: '-', type: 'break' },
    { subject: 'DSA', teacher: 'VC', type: 'theory' },
    { subject: 'DELD', teacher: 'AJ', type: 'theory' },
    { subject: 'OS', teacher: 'ST', type: 'theory' },
    { subject: 'CS-LAB', teacher: 'VC', type: 'lab' },
    { subject: 'CS-LAB', teacher: 'VC', type: 'lab' },
  ],
  Tuesday: [
    { subject: 'DSA', teacher: 'VC', type: 'theory' },
    { subject: 'OS', teacher: 'ST', type: 'theory' },
    { subject: 'LUNCH', teacher: '-', type: 'break' },
    { subject: 'M-III', teacher: 'AS', type: 'theory' },
    { subject: 'PPL', teacher: 'SM', type: 'theory' },
    { subject: 'DELD', teacher: 'AJ', type: 'theory' },
    { subject: 'DSA-LAB', teacher: 'VC', type: 'lab' },
    { subject: 'DSA-LAB', teacher: 'VC', type: 'lab' },
  ],
  Wednesday: [
    { subject: 'DELD', teacher: 'AJ', type: 'theory' },
    { subject: 'M-III', teacher: 'AS', type: 'theory' },
    { subject: 'LUNCH', teacher: '-', type: 'break' },
    { subject: 'OS', teacher: 'ST', type: 'theory' },
    { subject: 'DSA', teacher: 'VC', type: 'theory' },
    { subject: 'PPL', teacher: 'SM', type: 'theory' },
    { subject: 'LIB', teacher: '-', type: 'library' },
    { subject: 'LIB', teacher: '-', type: 'library' },
  ],
  Thursday: [
    { subject: 'PPL', teacher: 'SM', type: 'theory' },
    { subject: 'DSA', teacher: 'VC', type: 'theory' },
    { subject: 'LUNCH', teacher: '-', type: 'break' },
    { subject: 'DELD', teacher: 'AJ', type: 'theory' },
    { subject: 'M-III', teacher: 'AS', type: 'theory' },
    { subject: 'OS', teacher: 'ST', type: 'theory' },
    { subject: 'DELD-LAB', teacher: 'AJ', type: 'lab' },
    { subject: 'DELD-LAB', teacher: 'AJ', type: 'lab' },
  ],
  Friday: [
    { subject: 'OS', teacher: 'ST', type: 'theory' },
    { subject: 'DELD', teacher: 'AJ', type: 'theory' },
    { subject: 'LUNCH', teacher: '-', type: 'break' },
    { subject: 'PPL', teacher: 'SM', type: 'theory' },
    { subject: 'M-III', teacher: 'AS', type: 'theory' },
    { subject: 'DSA', teacher: 'VC', type: 'theory' },
    { subject: 'CS-LAB', teacher: 'VC', type: 'lab' },
    { subject: 'CS-LAB', teacher: 'VC', type: 'lab' },
  ],
  Saturday: [
    { subject: 'M-III', teacher: 'AS', type: 'theory' },
    { subject: 'PPL', teacher: 'SM', type: 'theory' },
    { subject: 'LUNCH', teacher: '-', type: 'break' },
    { subject: 'DSA', teacher: 'VC', type: 'theory' },
    { subject: 'OS', teacher: 'ST', type: 'theory' },
    { subject: 'DELD', teacher: 'AJ', type: 'theory' },
    { subject: 'LIB', teacher: '-', type: 'library' },
    { subject: 'LIB', teacher: '-', type: 'library' },
  ],
};

export const timeSlots: TimeSlot[] = [
  { id: '1', day: 'Monday', period: 1, subject: 'M-III', teacher: 'AS', time: '9:00-9:50', attendanceTaken: true },
  { id: '2', day: 'Monday', period: 2, subject: 'PPL', teacher: 'SM', time: '9:50-10:40', attendanceTaken: false },
  { id: '3', day: 'Monday', period: 4, subject: 'DSA', teacher: 'VC', time: '11:30-12:20', attendanceTaken: false },
  { id: '4', day: 'Tuesday', period: 1, subject: 'DSA', teacher: 'VC', time: '9:00-9:50', attendanceTaken: false },
  { id: '5', day: 'Tuesday', period: 2, subject: 'OS', teacher: 'ST', time: '9:50-10:40', attendanceTaken: true },
  { id: '6', day: 'Wednesday', period: 1, subject: 'DELD', teacher: 'AJ', time: '9:00-9:50', attendanceTaken: false },
  { id: '7', day: 'Thursday', period: 1, subject: 'PPL', teacher: 'SM', time: '9:00-9:50', attendanceTaken: false },
  { id: '8', day: 'Friday', period: 1, subject: 'OS', teacher: 'ST', time: '9:00-9:50', attendanceTaken: false },
];

export const students: Student[] = [
  { rollNo: 'CSE2023001', name: 'Aarav Sharma', attendance: {} },
  { rollNo: 'CSE2023002', name: 'Priya Patel', attendance: {} },
  { rollNo: 'CSE2023003', name: 'Rohan Kumar', attendance: {} },
  { rollNo: 'CSE2023004', name: 'Ananya Singh', attendance: {} },
  { rollNo: 'CSE2023005', name: 'Arjun Reddy', attendance: {} },
  { rollNo: 'CSE2023006', name: 'Diya Gupta', attendance: {} },
  { rollNo: 'CSE2023007', name: 'Vivaan Verma', attendance: {} },
  { rollNo: 'CSE2023008', name: 'Aisha Khan', attendance: {} },
  { rollNo: 'CSE2023009', name: 'Kabir Joshi', attendance: {} },
  { rollNo: 'CSE2023010', name: 'Saanvi Desai', attendance: {} },
  { rollNo: 'CSE2023011', name: 'Vihaan Nair', attendance: {} },
  { rollNo: 'CSE2023012', name: 'Myra Rao', attendance: {} },
  { rollNo: 'CSE2023013', name: 'Aditya Mehta', attendance: {} },
  { rollNo: 'CSE2023014', name: 'Aadhya Iyer', attendance: {} },
  { rollNo: 'CSE2023015', name: 'Reyansh Chopra', attendance: {} },
];
