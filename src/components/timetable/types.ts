export interface Subject {
  code: string;
  name: string;
  faculty: string;
  type: 'theory' | 'lab' | 'library' | 'break';
}

export interface Faculty {
  initial: string;
  name: string;
}

export interface Lab {
  code: string;
  name: string;
  inCharge: string;
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
}

export interface Student {
  rollNo: string;
  name: string;
  attendance: { [key: string]: boolean };
}

export type TimetableData = {
  [key: string]: TimetableCell[];
};
