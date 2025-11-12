# 🚀 HOD Module - Quick Reference

## 📦 API Endpoints Quick Access

```typescript
import { API_ENDPOINTS } from '../../server';

// Dashboard Stats
API_ENDPOINTS.hod.dashboard
// → GET http://localhost/cse_portal_backend/api/hod/hod_dashboard.php

// Faculty Management  
API_ENDPOINTS.hod.facultyManagement + '?action=list'
API_ENDPOINTS.hod.facultyManagement + '?action=add'
// → http://localhost/cse_portal_backend/api/hod/faculty_management.php

// Attendance
API_ENDPOINTS.hod.attendance
API_ENDPOINTS.hod.attendance + '?action=bulk'
// → http://localhost/cse_portal_backend/api/hod/hod_attendance.php

// Profile
API_ENDPOINTS.hod.profile
// → http://localhost/cse_portal_backend/api/hod/hod_profile.php
```

---

## 🎯 Common Patterns

### Fetch Dashboard Stats
```typescript
const fetchDashboardStats = async () => {
  const response = await fetch(API_ENDPOINTS.hod.dashboard);
  const result = await response.json();
  
  if (result.status === "success") {
    setDashboardStats({
      totalStudents: result.data.dashboard.total_students,
      totalFaculty: result.data.dashboard.total_faculty,
      sections: result.data.dashboard.sections,
      avgAttendance: result.data.dashboard.average_attendance
    });
  }
};
```

### Add New Faculty
```typescript
const addFaculty = async (facultyData) => {
  const response = await fetch(
    `${API_ENDPOINTS.hod.facultyManagement}?action=add`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: facultyData.name,
        designation: facultyData.designation,
        email: facultyData.email,
        phone: facultyData.phone,
        qualification: facultyData.qualification,
        specialization: facultyData.specialization,
        experience: facultyData.experience
      })
    }
  );
  
  const result = await response.json();
  if (result.success) {
    toast.success(`Faculty added: ${result.data.faculty_id}`);
    return result.data;
  }
};
```

### Fetch Faculty List
```typescript
const fetchFaculty = async () => {
  const response = await fetch(
    `${API_ENDPOINTS.hod.facultyManagement}?action=list`
  );
  const result = await response.json();
  
  if (result.success) {
    setFaculty(result.data.faculty);
  }
};
```

### Fetch Students for Attendance
```typescript
const fetchStudents = async (semester?, section?) => {
  let url = API_ENDPOINTS.hod.attendance;
  
  const params = new URLSearchParams();
  if (semester) params.append('semester', semester);
  if (section) params.append('section', section);
  
  if (params.toString()) {
    url += '?' + params.toString();
  }
  
  const response = await fetch(url);
  const result = await response.json();
  
  if (result.status === "success") {
    setStudents(result.data.attendance);
  }
};
```

### Submit Bulk Attendance
```typescript
const submitAttendance = async (students) => {
  const attendanceData = students.map(s => ({
    roll: s.rollNumber,
    status: s.attendanceStatus,
    date: new Date().toISOString().split('T')[0]
  }));

  const response = await fetch(
    `${API_ENDPOINTS.hod.attendance}?action=bulk`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attendance: attendanceData,
        subject: "Data Structures",
        semester: 3,
        section: "A",
        date: new Date().toISOString().split('T')[0]
      })
    }
  );

  const result = await response.json();
  if (result.status === 'success') {
    toast.success('Attendance submitted!');
  }
};
```

---

## 📊 Response Formats

### Dashboard Response
```json
{
  "status": "success",
  "data": {
    "dashboard": {
      "total_students": 480,
      "total_faculty": 24,
      "sections": 8,
      "average_attendance": "89.5%"
    }
  }
}
```

### Faculty List Response
```json
{
  "success": true,
  "message": "Faculty list retrieved successfully",
  "data": {
    "faculty": [
      {
        "id": "FAC001",
        "name": "Dr. Rajesh Kumar",
        "designation": "Professor",
        "email": "rajesh.kumar@ssipmt.edu",
        "phone": "9876543210",
        "classes": 5,
        "mentees": 30,
        "experience": 15
      }
    ],
    "total_count": 24
  }
}
```

### Add Faculty Response
```json
{
  "success": true,
  "message": "Faculty added successfully",
  "data": {
    "faculty_id": "FAC002",
    "user_id": "faculty2",
    "name": "Dr. Priya Sharma",
    "default_password": "password123"
  }
}
```

### Students Response
```json
{
  "status": "success",
  "data": {
    "attendance": [
      {
        "id": "STU001",
        "name": "Amit Verma",
        "roll": "CSE2023001",
        "semester": 3,
        "section": "A",
        "attendance_percentage": "92.50"
      }
    ],
    "total_count": 60
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Missing required fields",
  "code": 400
}
```

---

## 🔧 Validation Rules

### Add Faculty
```typescript
// Required fields
✅ name (string, not empty)
✅ designation (string, not empty)
✅ email (valid email format)
✅ phone (10 digits)

// Optional fields
qualification (string)
specialization (string)
experience (number)
```

### Submit Attendance
```typescript
// Required
✅ attendance array (not empty)
✅ Each record: { roll, status }

// Status values
'present' | 'absent'
```

---

## 🎨 Component Props

### HODDashboard
```typescript
interface HODDashboardProps {
  isViewOnly?: boolean;        // Default: false
  initialSection?: string;     // Default: "dashboard"
}

// Usage
<HODDashboard initialSection="faculty" />
<HODDashboard initialSection="dashboard" />
<HODDashboard isViewOnly={true} />
```

### HODAttendancePage
```typescript
// No props needed
<HODAttendancePage />
```

---

## 🚨 Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| CORS Error | XAMPP not running | Start Apache in XAMPP |
| 404 Not Found | Wrong URL | Check file deployed to XAMPP |
| Empty faculty list | No data in database | Add sample faculty data |
| Connection refused | MySQL not running | Start MySQL in XAMPP |
| Invalid email | Bad email format | Use valid email pattern |

---

## 🧪 Testing Commands

```bash
# Test Dashboard
curl http://localhost/cse_portal_backend/api/hod/hod_dashboard.php

# Test Faculty List
curl http://localhost/cse_portal_backend/api/hod/faculty_management.php?action=list

# Test Students
curl http://localhost/cse_portal_backend/api/hod/hod_attendance.php

# Test with filters
curl "http://localhost/cse_portal_backend/api/hod/hod_attendance.php?semester=3&section=A"
```

---

## 📁 File Locations

**Frontend**:
- `src/components/hod/HODDashboard.tsx`
- `src/components/hod/HODAttendancePage.tsx`
- `src/components/hod/HODProfile.tsx`
- `src/server.tsx`

**Backend**:
- `cse_project_p_backend/api/hod/hod_dashboard.php`
- `cse_project_p_backend/api/hod/faculty_management.php`
- `cse_project_p_backend/api/hod/hod_attendance.php`
- `cse_project_p_backend/api/hod/hod_profile.php`

**Deployed**:
- `D:\new_xammp\htdocs\cse_portal_backend\api\hod\*.php`

---

## 🎯 Status Indicators

**Dashboard Loading**:
```typescript
{isDashboardLoading ? (
  <div className="animate-pulse">Loading...</div>
) : (
  <StatsCard title="Total Students" value={stats.totalStudents} />
)}
```

**Faculty Loading**:
```typescript
{isFacultyLoading ? (
  <div className="text-center py-12">
    <div className="animate-spin...">⏳</div>
    <p>Loading faculty members...</p>
  </div>
) : (
  <Table>...</Table>
)}
```

**Empty States**:
```typescript
{faculty.length === 0 ? (
  <div className="text-center py-12">
    <Users className="h-12 w-12 text-gray-400" />
    <p>No faculty members found</p>
    <Button onClick={fetchFaculty}>Retry</Button>
  </div>
) : (
  <FacultyList />
)}
```

---

## ✅ Quick Checklist

**Before Testing**:
- [ ] XAMPP Apache running
- [ ] XAMPP MySQL running
- [ ] Database `cse_portal_database` exists
- [ ] Tables created from `final database query.txt`
- [ ] Sample data added (students, faculty)
- [ ] Backend files deployed to XAMPP

**Testing Steps**:
1. Open browser: `http://localhost/cse_portal_backend/api/hod/hod_dashboard.php`
2. Verify JSON response
3. Start React dev server: `npm run dev`
4. Navigate to HOD Dashboard
5. Check console for API calls
6. Test faculty management (add/list)
7. Test attendance page

---

**Status**: 🟢 Ready for Testing  
**Documentation**: ✅ Complete  
**Backend**: ✅ Deployed
