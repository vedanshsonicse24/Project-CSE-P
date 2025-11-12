# Faculty Module - Complete Frontend-Backend Integration Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Backend APIs](#backend-apis)
3. [Frontend Components](#frontend-components)
4. [API Integration Examples](#api-integration-examples)
5. [Testing Guide](#testing-guide)
6. [Deployment](#deployment)

---

## 🎯 Overview

This guide covers the complete integration of faculty-related frontend components with PHP MySQL backend APIs.

### Components Covered:
- ✅ **FacultyDashboard** - Dashboard with stats, classes, mentees
- ✅ **FacultyProfile** - View and edit faculty profile
- ✅ **FacultyDetails** - List all faculty with search/filter
- ✅ **FacultyRegistration** - Register new faculty members
- ✅ **AttendanceScheduleDemo** - Mark student attendance with swipe gestures
- ✅ **Engage Lectures** - Manage proxy/substitute lectures

---

## 🔌 Backend APIs

### 1. Faculty API (`api/faculty/faculty.php`)

**Base URL:** `http://localhost/cse_portal_backend/api/faculty/faculty.php`

#### Endpoints:

##### a) Get Faculty List
```http
GET /api/faculty/faculty.php?endpoint=list&department=CSE&designation=Professor
```

**Response:**
```json
{
  "status": "success",
  "message": "Success",
  "data": [
    {
      "id": "FAC001",
      "full_name": "Dr. Rajesh Kumar",
      "designation": "Professor",
      "department": "Computer Science & Engineering",
      "email": "rajesh.kumar@ssipmt.edu",
      "phone": "+91 9876543210",
      "qualification": "Ph.D. in Computer Science",
      "specialization": "Machine Learning, AI",
      "years_of_experience": 15
    }
  ]
}
```

##### b) Get Faculty Profile
```http
GET /api/faculty/faculty.php?endpoint=profile&id=FAC001
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "FAC001",
    "full_name": "Dr. Rajesh Kumar",
    "designation": "Professor",
    "department": "Computer Science & Engineering",
    "email": "rajesh.kumar@ssipmt.edu",
    "phone": "+91 9876543210",
    "office_location": "Room 301, CSE Block",
    "office_hours": "10:00 AM - 12:00 PM",
    "mentor_for": "Third Year CSE",
    "total_mentees": 45,
    "years_of_experience": 15,
    "research_interest": "Deep Learning, Neural Networks"
  }
}
```

##### c) Update Faculty Profile
```http
PUT /api/faculty/faculty.php?endpoint=profile
Content-Type: application/json

{
  "id": "FAC001",
  "office_location": "Room 305, CSE Block",
  "office_hours": "10:00 AM - 4:00 PM",
  "research_interest": "AI, ML, Deep Learning"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "message": "Profile updated successfully"
  }
}
```

##### d) Register New Faculty
```http
POST /api/faculty/faculty.php?endpoint=register
Content-Type: application/json

{
  "fullName": "Dr. Priya Sharma",
  "facultyId": "FAC002",
  "email": "priya.sharma@ssipmt.edu",
  "phoneNumber": "+91 9876543211",
  "department": "Computer Science & Engineering",
  "designation": "Associate Professor",
  "dateOfBirth": "1985-08-20",
  "gender": "Female",
  "qualification": "Ph.D. in Data Science",
  "specialization": "Machine Learning",
  "joinDate": "2015-06-15",
  "phdStatus": "Completed",
  "yearsOfExperience": 10,
  "researchInterest": "Big Data, Data Mining",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Faculty registered successfully",
  "data": {
    "id": "FAC002",
    "message": "Faculty registered successfully"
  }
}
```

##### e) Get Faculty Stats
```http
GET /api/faculty/faculty.php?endpoint=stats&id=FAC001
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "totalClasses": 3,
    "totalMentees": 25,
    "yearsOfExperience": 15,
    "averageAttendance": 87.5
  }
}
```

##### f) Get Faculty Classes
```http
GET /api/faculty/faculty.php?endpoint=classes&id=FAC001
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "code": "CSE301",
      "name": "Data Structures",
      "semester": 5,
      "type": "theory",
      "credits": 4
    }
  ]
}
```

##### g) Get Faculty Mentees
```http
GET /api/faculty/faculty.php?endpoint=mentees&id=FAC001
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "STU001",
      "name": "Amit Verma",
      "roll": "CS20001",
      "enrollment_number": "EN200001",
      "email": "amit.verma@student.ssipmt.edu",
      "contact_number": "+91 9876543212",
      "average_cgpa": "8.55"
    }
  ]
}
```

---

### 2. Attendance API (`api/attendance/mark_attendance.php`)

**Base URL:** `http://localhost/cse_portal_backend/api/attendance/mark_attendance.php`

#### Endpoints:

##### a) Mark Individual Attendance
```http
POST /api/attendance/mark_attendance.php?action=mark
Content-Type: application/json

{
  "studentId": "STU001",
  "subjectCode": "CSE301",
  "date": "2025-11-10",
  "period": 1,
  "status": "Present",
  "markedBy": "FAC001",
  "timetableId": "TT001"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Attendance marked successfully",
  "data": {
    "id": "1234",
    "message": "Attendance marked successfully"
  }
}
```

##### b) Bulk Mark Attendance
```http
POST /api/attendance/mark_attendance.php?action=bulk_mark
Content-Type: application/json

{
  "subjectCode": "CSE301",
  "date": "2025-11-10",
  "period": 1,
  "markedBy": "FAC001",
  "students": [
    {"studentId": "STU001", "status": "Present"},
    {"studentId": "STU002", "status": "Absent"},
    {"studentId": "STU003", "status": "Present"}
  ]
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "total": 3,
    "success": 3,
    "failed": 0,
    "errors": []
  }
}
```

##### c) Fetch Attendance Records
```http
GET /api/attendance/mark_attendance.php?action=fetch&subjectCode=CSE301&date=2025-11-10&period=1
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "1",
      "student_id": "STU001",
      "student_name": "Amit Verma",
      "roll": "CS20001",
      "subject_code": "CSE301",
      "date": "2025-11-10",
      "period": 1,
      "status": "Present",
      "marked_by": "FAC001",
      "marked_by_name": "Dr. Rajesh Kumar",
      "marked_at": "2025-11-10 10:30:45"
    }
  ]
}
```

##### d) Get Students for Attendance
```http
GET /api/attendance/mark_attendance.php?action=students&semester=3&section=A
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "STU001",
      "name": "Amit Verma",
      "roll": "CS20001",
      "enrollment_number": "EN200001"
    }
  ]
}
```

---

### 3. Engage Lectures API (`api/faculty/engage_lectures.php`)

**Base URL:** `http://localhost/cse_portal_backend/api/faculty/engage_lectures.php`

#### Endpoints:

##### a) Get Engage Lectures List
```http
GET /api/faculty/engage_lectures.php?action=list&facultyId=FAC001&status=pending
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "1",
      "original_faculty_id": "FAC001",
      "proxy_faculty_id": "FAC002",
      "timetable_id": "TT001",
      "engage_date": "2025-11-15",
      "reason": "Conference attendance",
      "status": "pending",
      "original_faculty_name": "Dr. Rajesh Kumar",
      "proxy_faculty_name": "Dr. Priya Sharma",
      "day": "Monday",
      "period": 3,
      "time": "11:00 AM - 12:00 PM",
      "semester": 6,
      "section": "A",
      "subject_code": "CSE301",
      "subject_name": "Data Structures"
    }
  ]
}
```

##### b) Create Engage Lecture Request
```http
POST /api/faculty/engage_lectures.php?action=create
Content-Type: application/json

{
  "originalFacultyId": "FAC001",
  "proxyFacultyId": "FAC002",
  "timetableId": "TT001",
  "engageDate": "2025-11-15",
  "reason": "Conference attendance"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Engage lecture request created successfully",
  "data": {
    "id": "1",
    "message": "Engage lecture request created successfully"
  }
}
```

##### c) Approve/Reject Engage Lecture
```http
PUT /api/faculty/engage_lectures.php?action=approve
Content-Type: application/json

{
  "id": 1,
  "status": "approved",
  "approvedBy": "FAC003"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Engage lecture status updated successfully",
  "data": {
    "message": "Engage lecture status updated successfully"
  }
}
```

##### d) Get Available Faculty for Proxy
```http
GET /api/faculty/engage_lectures.php?action=available_faculty&date=2025-11-15&period=3
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "FAC002",
      "full_name": "Dr. Priya Sharma",
      "designation": "Associate Professor",
      "department": "Computer Science & Engineering"
    }
  ]
}
```

---

## 🎨 Frontend Components

### 1. FacultyDashboard Integration

**File:** `src/components/faculty/FacultyDashboard.tsx`

**Key Features:**
- Fetches faculty stats from API on component mount
- Displays classes, mentees, and statistics
- Real-time data updates

**Usage Example:**
```tsx
import { FacultyDashboard } from './components/faculty/FacultyDashboard';

function App() {
  return <FacultyDashboard initialSection="dashboard" />;
}
```

**API Calls:**
```typescript
// Fetch stats
const response = await fetch(`${API_ENDPOINTS.faculty.stats}&id=${facultyId}`);

// Fetch classes
const response = await fetch(`${API_ENDPOINTS.faculty.classes}&id=${facultyId}`);

// Fetch mentees
const response = await fetch(`${API_ENDPOINTS.faculty.mentees}&id=${facultyId}`);
```

---

### 2. FacultyProfile Integration

**File:** `src/components/faculty/FacultyProfile.tsx`

**Integration Steps:**

1. **Fetch Profile Data:**
```typescript
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.faculty.profile}&id=${facultyId}`
      );
      const result = await response.json();
      if (result.status === "success") {
        setFormData(result.data);
      }
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };
  fetchProfile();
}, [facultyId]);
```

2. **Update Profile:**
```typescript
const handleSave = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.faculty.updateProfile, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: facultyId,
        office_location: formData.officeLocation,
        office_hours: formData.officeHours,
        research_interest: formData.researchInterest
      })
    });
    
    const result = await response.json();
    if (result.status === "success") {
      toast.success("Profile updated successfully!");
    }
  } catch (error) {
    toast.error("Failed to update profile");
  }
};
```

---

### 3. FacultyDetails Integration

**File:** `src/components/faculty/FacultyDetails.tsx`

**Integration Steps:**

1. **Fetch Faculty List:**
```typescript
useEffect(() => {
  const fetchFaculty = async () => {
    try {
      let url = API_ENDPOINTS.faculty.list;
      
      // Add filters
      const params = new URLSearchParams();
      if (filterDesignation !== "all") {
        params.append("designation", filterDesignation);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      
      const response = await fetch(`${url}&${params.toString()}`);
      const result = await response.json();
      
      if (result.status === "success") {
        setFaculties(result.data);
      }
    } catch (error) {
      toast.error("Failed to load faculty list");
    }
  };
  
  fetchFaculty();
}, [filterDesignation, searchQuery]);
```

---

### 4. FacultyRegistration Integration

**File:** `src/components/faculty/FacultyRegistration.tsx`

**Integration Steps:**

1. **Handle Registration:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  try {
    const response = await fetch(API_ENDPOINTS.faculty.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.status === "success") {
      toast.success("Registration successful!");
      onRegister(formData);
    } else {
      toast.error(result.message || "Registration failed");
    }
  } catch (error) {
    toast.error("An error occurred during registration");
  }
};
```

---

### 5. AttendanceScheduleDemo Integration

**File:** `src/components/faculty/AttendanceScheduleDemo.tsx`

**Integration Steps:**

1. **Fetch Students:**
```typescript
useEffect(() => {
  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.attendance.mark}?action=students&semester=3&section=A`
      );
      const result = await response.json();
      
      if (result.status === "success") {
        const studentsWithStatus = result.data.map(student => ({
          ...student,
          attendanceStatus: 'unmarked'
        }));
        setStudents(studentsWithStatus);
      }
    } catch (error) {
      toast.error("Failed to load students");
    }
  };
  
  fetchStudents();
}, []);
```

2. **Mark Attendance:**
```typescript
const handleAttendanceChange = async (
  studentId: string, 
  status: 'present' | 'absent'
) => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.attendance.mark}?action=mark`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          subjectCode: "CSE301",
          date: new Date().toISOString().split('T')[0],
          period: 1,
          status: status === 'present' ? 'Present' : 'Absent',
          markedBy: facultyId
        })
      }
    );
    
    const result = await response.json();
    
    if (result.status === "success") {
      setStudents(prev => 
        prev.map(s => 
          s.id === studentId 
            ? { ...s, attendanceStatus: status }
            : s
        )
      );
      toast.success(`Marked as ${status}`);
    }
  } catch (error) {
    toast.error("Failed to mark attendance");
    throw error;
  }
};
```

3. **Submit Bulk Attendance:**
```typescript
const handleSubmitAttendance = async () => {
  try {
    const studentsData = students.map(s => ({
      studentId: s.id,
      status: s.attendanceStatus === 'present' ? 'Present' : 'Absent'
    }));
    
    const response = await fetch(
      `${API_ENDPOINTS.attendance.mark}?action=bulk_mark`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectCode: "CSE301",
          date: new Date().toISOString().split('T')[0],
          period: 1,
          markedBy: facultyId,
          students: studentsData
        })
      }
    );
    
    const result = await response.json();
    
    if (result.status === "success") {
      toast.success("Attendance submitted successfully!");
    }
  } catch (error) {
    toast.error("Failed to submit attendance");
  }
};
```

---

## 🧪 Testing Guide

### 1. Using Postman

**Test Faculty List:**
```
GET http://localhost/cse_portal_backend/api/faculty/faculty.php?endpoint=list
```

**Test Mark Attendance:**
```
POST http://localhost/cse_portal_backend/api/attendance/mark_attendance.php?action=mark
Content-Type: application/json

{
  "studentId": "STU001",
  "subjectCode": "CSE301",
  "date": "2025-11-10",
  "period": 1,
  "status": "Present",
  "markedBy": "FAC001"
}
```

**Test Engage Lectures:**
```
GET http://localhost/cse_portal_backend/api/faculty/engage_lectures.php?action=list&facultyId=FAC001
```

### 2. Browser Console Testing

```javascript
// Test faculty stats
fetch('http://localhost/cse_portal_backend/api/faculty/faculty.php?endpoint=stats&id=FAC001')
  .then(r => r.json())
  .then(console.log);

// Test mark attendance
fetch('http://localhost/cse_portal_backend/api/attendance/mark_attendance.php?action=mark', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    studentId: "STU001",
    subjectCode: "CSE301",
    date: "2025-11-10",
    period: 1,
    status: "Present",
    markedBy: "FAC001"
  })
}).then(r => r.json()).then(console.log);
```

### 3. React Component Testing

1. Start XAMPP (Apache + MySQL)
2. Run React dev server: `npm run dev`
3. Navigate to Faculty Dashboard
4. Check browser console for API responses
5. Verify data displays correctly

---

## 🚀 Deployment

### Step 1: Copy Backend Files to XAMPP

```powershell
# Copy database config
Copy-Item "d:\Project-CSE-P\cse_project_p_backend\api\config\*" -Destination "D:\new_xammp\htdocs\cse_portal_backend\api\config\" -Recurse -Force

# Copy helpers
Copy-Item "d:\Project-CSE-P\cse_project_p_backend\api\helpers\*" -Destination "D:\new_xammp\htdocs\cse_portal_backend\api\helpers\" -Recurse -Force

# Copy faculty API
Copy-Item "d:\Project-CSE-P\cse_project_p_backend\api\faculty\*" -Destination "D:\new_xammp\htdocs\cse_portal_backend\api\faculty\" -Recurse -Force

# Copy attendance API
Copy-Item "d:\Project-CSE-P\cse_project_p_backend\api\attendance\*" -Destination "D:\new_xammp\htdocs\cse_portal_backend\api\attendance\" -Recurse -Force
```

### Step 2: Verify Database

```sql
-- Check tables exist
SHOW TABLES FROM cse_portal_database;

-- Verify sample data
SELECT * FROM faculty LIMIT 5;
SELECT * FROM students LIMIT 5;
SELECT * FROM attendance_records LIMIT 5;
```

### Step 3: Test APIs

1. Start XAMPP Control Panel
2. Start Apache and MySQL
3. Open browser: `http://localhost/cse_portal_backend/api/faculty/faculty.php?endpoint=list`
4. Verify JSON response

### Step 4: Update Frontend BaseURL (if needed)

```typescript
// src/server.tsx
const BaseURL = "http://localhost/cse_portal_backend/";
// For production:
// const BaseURL = "https://yourdomain.com/api/";
```

---

## 🔧 Troubleshooting

### Issue 1: CORS Errors
**Solution:** All PHP files already have CORS headers. If still facing issues:
```php
header('Access-Control-Allow-Origin: http://localhost:5173');
```

### Issue 2: Database Connection Failed
**Solution:** Check `Database.php` credentials:
```php
private $host = 'localhost';
private $db_name = 'cse_portal_database';
private $username = 'root';
private $password = '';
```

### Issue 3: API Returns 404
**Solution:** Verify file paths in XAMPP htdocs and check Apache is running.

### Issue 4: Empty Data Response
**Solution:** Check if database has sample data:
```sql
INSERT INTO faculty (id, user_id, full_name, designation, department, email, phone, 
                     date_of_birth, gender, qualification, specialization, join_date, 
                     phd_status, years_of_experience)
VALUES ('FAC001', 'faculty1', 'Dr. Rajesh Kumar', 'Professor', 'Computer Science', 
        'rajesh.kumar@ssipmt.edu', '+91-9876543210', '1980-05-15', 'Male', 
        'Ph.D. in Computer Science', 'Artificial Intelligence', '2010-08-01', 
        'Completed', 15);
```

---

## 📝 Summary

### Files Modified:
1. ✅ `src/server.tsx` - Added faculty & attendance endpoints
2. ✅ `src/components/faculty/FacultyDashboard.tsx` - Integrated with stats API
3. ✅ Created `api/config/Database.php` - Database connection handler
4. ✅ Created `api/helpers/Response.php` - Standardized responses
5. ✅ Created `api/attendance/mark_attendance.php` - Attendance marking
6. ✅ Created `api/faculty/engage_lectures.php` - Proxy lectures management

### Files Ready for Integration:
- `FacultyProfile.tsx` - Add fetch & update logic
- `FacultyDetails.tsx` - Add fetch & filter logic
- `FacultyRegistration.tsx` - Add POST registration
- `AttendanceScheduleDemo.tsx` - Add bulk marking

### Database Tables Used:
- `faculty` - Faculty information
- `students` - Student information
- `attendance_records` - Attendance tracking
- `engage_lectures` - Proxy lecture requests
- `subjects` - Subject details
- `timetable` - Class schedule

---

## 🎯 Next Steps

1. **Complete remaining integrations** for FacultyProfile, FacultyDetails, FacultyRegistration
2. **Add photo/CV upload** functionality with file handling
3. **Implement authentication** using JWT or sessions
4. **Add real-time updates** using WebSockets
5. **Create admin panel** for system-wide management

**Integration Complete! 🎉**
