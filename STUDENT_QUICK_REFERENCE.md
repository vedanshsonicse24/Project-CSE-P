# 🎓 Student Module - Quick Reference

## 🚀 Quick Start

```bash
# Start XAMPP
# - Apache: Running
# - MySQL: Running

# Run React App
npm run dev
```

---

## 📦 API Endpoints

```typescript
import { API_ENDPOINTS } from '../../server';

// Dashboard
API_ENDPOINTS.student.dashboard
// → GET http://localhost/cse_portal_backend/api/students/studentdashboard.php

// Profile Modern
API_ENDPOINTS.student.profileModern
// → GET/POST http://localhost/cse_portal_backend/api/students/studentprofilemodern.php

// Management
API_ENDPOINTS.student.management
// → http://localhost/cse_portal_backend/api/students/studentmanagement.php

// Registration
API_ENDPOINTS.student.registration
// → http://localhost/cse_portal_backend/api/students/student_registration.php

// List Students
API_ENDPOINTS.student.list
// → http://localhost/cse_portal_backend/api/students/get_students.php

// Attendance
API_ENDPOINTS.student.attendance
// → http://localhost/cse_portal_backend/api/students/student_attendance.php

// CV Upload
API_ENDPOINTS.student.cvUpload
// → http://localhost/cse_portal_backend/api/students/cv_upload.php
```

---

## 🎯 Common Patterns

### Fetch Dashboard Data
```typescript
const fetchDashboardData = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await fetch(API_ENDPOINTS.student.dashboard);
    const result = await response.json();
    
    if (result.status === "success" && result.data) {
      setStudentInfo(result.data);
      if (result.data.notifications) {
        setNotifications(result.data.notifications);
      }
    } else {
      throw new Error(result.message || "Failed to fetch dashboard data");
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Failed to load dashboard";
    setError(errorMessage);
    toast.error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};
```

### Fetch Student Profile
```typescript
const fetchProfileData = async () => {
  setIsLoading(true);
  
  try {
    const response = await fetch(API_ENDPOINTS.student.profileModern);
    const result = await response.json();
    
    if (result.status === "success" && result.data) {
      setFormData(result.data);
      toast.success("Profile loaded successfully");
    } else {
      throw new Error(result.message || "Failed to fetch profile");
    }
  } catch (err) {
    toast.error(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

### Update Student Profile
```typescript
const handleSave = async () => {
  setIsSaving(true);

  try {
    const response = await fetch(API_ENDPOINTS.student.profileModern, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.status === "success") {
      toast.success("Profile updated successfully! 🎉");
    } else {
      throw new Error(result.message);
    }
  } catch (err) {
    toast.error("Failed to save profile");
  } finally {
    setIsSaving(false);
  }
};
```

### Fetch Students List
```typescript
const fetchStudents = async (semester?: number, section?: string) => {
  try {
    let url = API_ENDPOINTS.student.list;
    
    const params = new URLSearchParams();
    if (semester) params.append('semester', semester.toString());
    if (section) params.append('section', section);
    
    if (params.toString()) {
      url += '?' + params.toString();
    }

    const response = await fetch(url);
    const result = await response.json();
    
    if (result.success) {
      setStudents(result.students);
    }
  } catch (err) {
    toast.error("Failed to load students");
  }
};
```

---

## 📊 Response Formats

### Dashboard Response
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "name": "Priya Sharma",
    "roll": "21CS002",
    "semester": "6th Semester",
    "section": "A",
    "email": "priya.sharma@student.edu",
    "phone": "+91 98765 43210",
    "cgpa": "8.9",
    "attendance": "92%",
    "notifications": [
      {
        "id": 1,
        "title": "Assignment Due Tomorrow",
        "message": "CSE301 - Data Structures assignment due tomorrow",
        "time": "2 hours ago"
      }
    ]
  }
}
```

### Profile Response
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "fullName": "Priya Sharma",
    "dateOfBirth": "2002-03-10",
    "rollNumber": "21CS002",
    "enrollmentNumber": "0827CS211002",
    "semester": "6",
    "section": "A",
    "attendance": 92,
    "designation": "Student",
    "linkedIn": "linkedin.com/in/priyasharma",
    "github": "github.com/priyasharma",
    "fatherName": "Rajesh Sharma",
    "fatherPhone": "+91 98765 43200",
    "motherName": "Sunita Sharma",
    "motherPhone": "+91 98765 43201",
    "email": "priya.sharma@student.edu",
    "phone": "+91 98765 43210"
  }
}
```

### Update Response
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "message": "Profile updated successfully",
    "student_id": "STU001"
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Student not found",
  "code": 404
}
```

---

## 🎨 Component Props

### StudentDashboard
```typescript
interface StudentDashboardProps {
  initialSection?: string;     // Default: "dashboard"
  onNavigateToProfile?: () => void;
}

// Usage
<StudentDashboard initialSection="dashboard" />
<StudentDashboard initialSection="attendance" />
```

### StudentProfileModern
```typescript
// No props needed
<StudentProfileModern />
```

---

## 🧪 Testing Commands

```bash
# Test Dashboard API
curl http://localhost/cse_portal_backend/api/students/studentdashboard.php

# Test Profile GET
curl http://localhost/cse_portal_backend/api/students/studentprofilemodern.php

# Test Profile POST
curl -X POST http://localhost/cse_portal_backend/api/students/studentprofilemodern.php \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test Student","dateOfBirth":"2002-01-01","rollNumber":"TEST001","enrollmentNumber":"EN001","email":"test@student.edu","phone":"+91 9999999999","fatherName":"Father","motherName":"Mother"}'

# Test Students List
curl "http://localhost/cse_portal_backend/api/students/get_students.php?semester=3&section=A"
```

---

## 🚨 Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| CORS Error | XAMPP not running | Start Apache in XAMPP |
| 404 Not Found | Wrong URL or file not deployed | Check API_ENDPOINTS and deploy files |
| Empty student data | No data in database | Add sample student data |
| Connection refused | MySQL not running | Start MySQL in XAMPP |
| Loading stuck | Network error or API error | Check console, verify API endpoint |

---

## 📁 File Locations

**Frontend**:
- `src/components/student/StudentDashboard.tsx` ✅
- `src/components/student/StudentProfileModern.tsx` ✅
- `src/components/student/StudentManagement.tsx`
- `src/components/student/StudentRegistration.tsx`
- `src/server.tsx` ✅

**Backend**:
- `cse_project_p_backend/api/students/studentdashboard.php` ✅
- `cse_project_p_backend/api/students/studentprofilemodern.php` ✅
- `cse_project_p_backend/api/students/studentmanagement.php`
- `cse_project_p_backend/api/students/student_registration.php`

**Deployed**:
- `D:\new_xammp\htdocs\cse_portal_backend\api\students\*.php` ✅

---

## 🎯 Loading States

**Dashboard Loading**:
```typescript
{isLoading ? (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
      <p className="text-gray-600">Loading dashboard...</p>
    </div>
  </div>
) : (
  <DashboardContent />
)}
```

**Profile Loading**:
```typescript
{isLoading ? (
  <div className={`${bgClass} min-h-screen flex items-center justify-center`}>
    <div className="text-center">
      <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto mb-4" />
      <p className={textClass}>Loading profile...</p>
    </div>
  </div>
) : (
  <ProfileForm />
)}
```

**Save Button Loading**:
```typescript
<Button disabled={isSaving}>
  {isSaving ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Saving...
    </>
  ) : (
    <>
      <Sparkles className="mr-2 h-5 w-5" />
      Save Profile
    </>
  )}
</Button>
```

---

## ✅ Quick Checklist

**Before Testing**:
- [ ] XAMPP Apache running
- [ ] XAMPP MySQL running
- [ ] Database `cse_portal_database` exists
- [ ] Students table has sample data
- [ ] Backend files deployed to XAMPP
- [ ] React dev server running

**Testing Steps**:
1. Open browser: `http://localhost/cse_portal_backend/api/students/studentdashboard.php`
2. Verify JSON response
3. Start React: `npm run dev`
4. Navigate to Student Dashboard
5. Check data loads
6. Test Student Profile Modern
7. Update profile
8. Verify database updated

---

## 🔐 Sample Student Data

```sql
-- Insert sample student
INSERT INTO students (
  id, name, roll, enrollment_number, semester, section, 
  percent, date_of_birth, email, contact_number, 
  average_cgpa, designation, linkedin, github,
  father_name, father_contact, mother_name, mother_contact
) VALUES (
  'STU001', 'Priya Sharma', '21CS002', '0827CS211002', 
  6, 'A', 92.00, '2002-03-10', 
  'priya.sharma@student.edu', '+91 98765 43210',
  8.9, 'Student', 
  'linkedin.com/in/priyasharma', 'github.com/priyasharma',
  'Rajesh Sharma', '+91 98765 43200',
  'Sunita Sharma', '+91 98765 43201'
);
```

---

## 📊 Database Queries Used

```sql
-- Get student dashboard
SELECT name, roll, semester, section, email, 
       contact_number AS phone, average_cgpa AS cgpa, 
       percent AS attendance
FROM students
WHERE id = ?

-- Get notifications
SELECT id, title, message, created_at
FROM notifications
WHERE (recipient_id = ? OR recipient_type = 'all' OR recipient_type = 'student')
  AND is_read = 0
ORDER BY created_at DESC
LIMIT 5

-- Get student profile
SELECT name AS fullName, date_of_birth AS dateOfBirth, 
       roll AS rollNumber, enrollment_number AS enrollmentNumber,
       semester, section, percent AS attendance, designation,
       linkedin AS linkedIn, github, father_name AS fatherName,
       father_contact AS fatherPhone, mother_name AS motherName,
       mother_contact AS motherPhone, email, contact_number AS phone
FROM students
WHERE id = ?

-- Update student profile
UPDATE students SET
  name = ?, date_of_birth = ?, roll = ?, enrollment_number = ?,
  semester = ?, section = ?, designation = ?, linkedin = ?, github = ?,
  father_name = ?, father_contact = ?, mother_name = ?, mother_contact = ?,
  email = ?, contact_number = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?
```

---

**Status**: 🟢 Ready for Testing  
**Components**: ✅ 2/7 Integrated  
**Documentation**: ✅ Complete  

**Next**: Test with XAMPP, then integrate remaining components (StudentManagement, StudentRegistration, etc.)
