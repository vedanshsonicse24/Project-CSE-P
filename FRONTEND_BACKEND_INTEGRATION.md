# React Frontend + PHP Backend Integration Guide

## ✅ Integration Complete

This guide documents the complete integration between React TypeScript frontend components and PHP backend APIs.

---

## 📁 File Structure

### Frontend (React + TypeScript)
```
src/
├── server.tsx                          # Central API configuration
├── components/
│   └── common/
│       ├── StatsCard.tsx              # Individual stat card with API support
│       ├── StatsCardList.tsx          # Auto-fetching stats grid
│       ├── FacultyCard.tsx            # Individual faculty card with API support
│       ├── FacultyCardList.tsx        # Auto-fetching faculty carousel
│       └── Breadcrumb.tsx             # Dynamic breadcrumb navigation
```

### Backend (PHP)
```
cse_project_p_backend/api/
├── common/
│   ├── statscard.php                  # Statistics API
│   └── facultycard.php                # Faculty data API
├── boa/
│   ├── boasubmissionform.php         # BOA submission
│   └── boamanagement.php             # BOA management
└── hod/
    ├── faculty_management.php        # Faculty CRUD
    ├── hod_attendance.php            # HOD attendance
    └── hod_dashboard.php             # HOD dashboard stats
```

---

## 🔗 API Endpoints Configuration

### `src/server.tsx`
```typescript
// Base URL for PHP backend API
const BaseURL = "http://localhost/cse_portal_backend/";

// Module-specific endpoints
export const BOABaseURL = `${BaseURL}api/boa/`;
export const AttendanceBaseURL = `${BaseURL}api/attendance/`;
export const HODBaseURL = `${BaseURL}api/hod/`;
export const CommonBaseURL = `${BaseURL}api/common/`;
export const StudentBaseURL = `${BaseURL}api/students/`;
export const FacultyBaseURL = `${BaseURL}api/faculty/`;
export const SubjectsBaseURL = `${BaseURL}api/subjects/`;
export const TimetableBaseURL = `${BaseURL}api/timetable/`;

// Structured API endpoints
export const API_ENDPOINTS = {
  statsCard: `${CommonBaseURL}statscard.php`,
  facultyCard: `${CommonBaseURL}facultycard.php`,
  boa: {
    submit: `${BOABaseURL}boasubmissionform.php`,
    manage: `${BOABaseURL}boamanagement.php`,
  },
  attendance: {
    mark: `${AttendanceBaseURL}attendance.php`,
    student: `${AttendanceBaseURL}student_attendance.php`,
  },
  hod: {
    facultyManagement: `${HODBaseURL}faculty_management.php`,
    attendance: `${HODBaseURL}hod_attendance.php`,
    dashboard: `${HODBaseURL}hod_dashboard.php`,
  },
};

export default BaseURL;
```

---

## 📊 StatsCard Integration

### Component: `StatsCard.tsx`

**Features:**
- ✅ Supports both static props and API fetching
- ✅ Loading state with spinner
- ✅ Error handling with retry option
- ✅ Automatic data formatting

**Props:**
```typescript
interface StatsCardProps {
  title: string;
  value?: string | number;
  icon: LucideIcon;
  bgColor?: string;
  iconColor?: string;
  fetchFromAPI?: boolean; // Enable/disable API fetching
}
```

**Usage Examples:**

**Static (No API):**
```tsx
import { Users } from "lucide-react";
import { StatsCard } from "./components/common/StatsCard";

<StatsCard
  title="Total Students"
  value={1520}
  icon={Users}
  bgColor="bg-blue-50"
  iconColor="text-blue-600"
/>
```

**Dynamic (With API):**
```tsx
<StatsCard
  title="Total Students"
  icon={Users}
  bgColor="bg-blue-50"
  fetchFromAPI={true}
/>
```

**Auto-Fetching Grid:**
```tsx
import { StatsCardList } from "./components/common/StatsCardList";

<StatsCardList />
```

### Backend: `statscard.php`

**Endpoints:**

1. **Get All Stats:**
   ```
   GET http://localhost/cse_portal_backend/api/common/statscard.php
   ```
   
   **Response:**
   ```json
   {
     "status": "success",
     "data": [
       {
         "title": "Total Students",
         "value": 1520,
         "icon": "user-graduate",
         "bgColor": "blue",
         "iconColor": "#1e3a8a"
       },
       {
         "title": "Active Faculty",
         "value": 124,
         "icon": "chalkboard-teacher",
         "bgColor": "green",
         "iconColor": "#15803d"
       }
     ]
   }
   ```

2. **Get Specific Stat:**
   ```
   GET http://localhost/cse_portal_backend/api/common/statscard.php?title=Total Students
   ```

**Database Queries:**
- `SELECT COUNT(*) FROM students` - Total Students
- `SELECT COUNT(*) FROM faculty` - Active Faculty
- `SELECT COUNT(DISTINCT code) FROM subjects` - Courses Offered
- `SELECT COUNT(DISTINCT department) FROM faculty` - Departments

**CORS Headers:**
```php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
```

---

## 👨‍🏫 FacultyCard Integration

### Component: `FacultyCard.tsx`

**Features:**
- ✅ Supports both static props and API fetching
- ✅ Animated loading state
- ✅ HOD badge and crown icon
- ✅ Fallback avatar with animations
- ✅ Hover effects and transitions

**Props:**
```typescript
interface FacultyCardProps {
  name?: string;
  title?: string;
  department?: string;
  image?: string;
  isHOD?: boolean;
  index?: number;
  fetchFromAPI?: boolean;
  facultyId?: string;
}
```

**Usage Examples:**

**Static:**
```tsx
<FacultyCard
  name="Dr. John Doe"
  title="Professor"
  department="Computer Science"
  image="/images/faculty/john.jpg"
  isHOD={true}
/>
```

**Dynamic (Fetch by Name):**
```tsx
<FacultyCard
  name="Dr. John Doe"
  fetchFromAPI={true}
/>
```

**Dynamic (Fetch by ID):**
```tsx
<FacultyCard
  facultyId="FAC001"
  fetchFromAPI={true}
/>
```

**Auto-Fetching List:**
```tsx
import { FacultyCardList } from "./components/common/FacultyCardList";

<FacultyCardList />
```

### Backend: `facultycard.php`

**Endpoints:**

1. **Get All Faculty:**
   ```
   GET http://localhost/cse_portal_backend/api/common/facultycard.php
   ```
   
   **Response:**
   ```json
   {
     "status": "success",
     "data": [
       {
         "id": "FAC001",
         "name": "Dr. Rajesh Kumar",
         "title": "Professor",
         "department": "Computer Science",
         "image": "http://localhost/cse_portal_backend/uploads/faculty/FAC001.jpg",
         "isHOD": true
       }
     ]
   }
   ```

2. **Get Faculty by Name:**
   ```
   GET http://localhost/cse_portal_backend/api/common/facultycard.php?name=Dr. Rajesh Kumar
   ```

3. **Get Faculty by ID:**
   ```
   GET http://localhost/cse_portal_backend/api/common/facultycard.php?id=FAC001
   ```

**Database Query:**
```sql
SELECT 
  id,
  full_name as name, 
  designation as title, 
  department,
  CONCAT('http://localhost/cse_portal_backend/uploads/faculty/', id, '.jpg') as image,
  (designation = 'HOD') as isHOD
FROM faculty 
ORDER BY 
  CASE designation 
    WHEN 'HOD' THEN 1
    WHEN 'Professor' THEN 2
    WHEN 'Associate Professor' THEN 3
    WHEN 'Assistant Professor' THEN 4
    ELSE 5
  END,
  full_name
```

---

## 🧭 Breadcrumb Integration

### Component: `Breadcrumb.tsx`

**Features:**
- ✅ Dynamic route-based breadcrumbs
- ✅ Clickable navigation items
- ✅ Home icon on first item
- ✅ Fixed positioning below header
- ✅ Role-aware navigation

**Usage:**

```tsx
import { Breadcrumb, getBreadcrumbItems } from "./components/common/Breadcrumb";

// In your component
const breadcrumbItems = getBreadcrumbItems(
  "dashboard",        // currentPage
  "student",          // userRole
  "profile",          // dashboardSection (optional)
  handleHome,         // onNavigateToHome
  handleDashboard     // onNavigateToDashboard
);

<Breadcrumb items={breadcrumbItems} />
```

**Manual Usage:**
```tsx
<Breadcrumb 
  items={[
    { label: "Home", onClick: () => navigate("/") },
    { label: "Dashboard", onClick: () => navigate("/dashboard") },
    { label: "Profile" }
  ]}
/>
```

**Supported Routes:**
- `home` - Home page
- `login` - Login page
- `dashboard` - Role-based dashboard
- `faculty-info` - Faculty information
- `alumni` - Alumni page
- `student-profile` - Student profile
- `faculty-profile` - Faculty profile

---

## 🔧 Error Handling

### Frontend Pattern

```tsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(API_ENDPOINTS.statsCard);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.status === "success") {
      // Handle success
    } else {
      throw new Error(result.message || "Request failed");
    }
  } catch (err) {
    console.error("❌ Error:", err);
    setError(err instanceof Error ? err.message : "An error occurred");
    toast.error("Operation failed", {
      description: err instanceof Error ? err.message : undefined,
    });
  } finally {
    setLoading(false);
  }
};
```

### Backend Pattern

```php
try {
    $conn = getDBConnection();
    
    // Database operations
    
    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
}
```

---

## 🧪 Testing Guide

### 1. Test with Postman

**Test Stats API:**
```
GET http://localhost/cse_portal_backend/api/common/statscard.php
```
Expected: 200 OK with stats array

**Test Faculty API:**
```
GET http://localhost/cse_portal_backend/api/common/facultycard.php
```
Expected: 200 OK with faculty array

### 2. Test with Browser Console

```javascript
// Test Stats API
fetch('http://localhost/cse_portal_backend/api/common/statscard.php')
  .then(res => res.json())
  .then(data => console.log(data));

// Test Faculty API
fetch('http://localhost/cse_portal_backend/api/common/facultycard.php')
  .then(res => res.json())
  .then(data => console.log(data));
```

### 3. Test in React App

Open browser DevTools → Network tab:
- Look for XHR requests to PHP backend
- Check request headers (CORS)
- Verify response status (200 OK)
- Inspect response JSON

---

## 🚀 Deployment Checklist

### XAMPP Setup

✅ **1. Copy Backend Files:**
```powershell
Copy-Item "d:\Project-CSE-P\cse_project_p_backend\api\common\*.php" `
  -Destination "D:\new_xammp\htdocs\cse_portal_backend\api\common\" -Force
```

✅ **2. Verify Database Connection:**
File: `cse_project_p_backend/config/database.php`
```php
function getDBConnection() {
    $host = "localhost";
    $dbname = "cse_portal_database";
    $username = "root";
    $password = "";
    
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conn;
}
```

✅ **3. Create Uploads Directory:**
```powershell
mkdir "D:\new_xammp\htdocs\cse_portal_backend\uploads\faculty" -Force
```

✅ **4. Start Services:**
- Apache: Running ✅
- MySQL: Running ✅

### Frontend Setup

✅ **1. Install Dependencies:**
```bash
npm install
```

✅ **2. Verify server.tsx:**
Check that BaseURL points to your XAMPP installation

✅ **3. Run Development Server:**
```bash
npm run dev
```

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error
**Error:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution:**
Add CORS headers to ALL PHP files:
```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}
```

### Issue 2: Database Connection Failed
**Error:** `PDOException: SQLSTATE[HY000] [1045] Access denied`

**Solution:**
- Verify MySQL credentials in `config/database.php`
- Check if MySQL service is running in XAMPP
- Ensure database `cse_portal_database` exists

### Issue 3: 404 Not Found
**Error:** `GET http://localhost/cse_portal_backend/api/common/statscard.php 404`

**Solution:**
- Verify PHP file exists in XAMPP htdocs
- Check file path spelling
- Ensure Apache is running

### Issue 4: No Data Returned
**Error:** Component shows "N/A" or empty

**Solution:**
- Check database has sample data
- Verify SQL queries in PHP
- Check browser console for errors
- Test API endpoint in Postman

---

## 📚 Additional Resources

### Sample Data Insert
```sql
-- Insert sample faculty
INSERT INTO faculty (id, user_id, full_name, designation, department, email, phone, date_of_birth, gender, qualification, join_date, phd_status, years_of_experience) VALUES
('FAC001', 'faculty1', 'Dr. Rajesh Kumar', 'HOD', 'Computer Science', 'rajesh@ssipmt.edu', '+91-9876543210', '1980-05-15', 'Male', 'Ph.D.', '2010-08-01', 'Completed', 15);

-- Insert sample students
INSERT INTO students (id, user_id, name, roll, enrollment_number, semester, section, email, contact_number, date_of_birth) VALUES
('STU001', 'student1', 'Amit Verma', 'CS20001', 'EN200001', 5, 'A', 'amit@student.ssipmt.edu', '+91-9876543212', '2002-03-10');
```

---

## ✨ Next Steps

1. **Add Authentication:**
   - Implement JWT tokens
   - Add user session management
   - Protect routes based on roles

2. **Optimize Performance:**
   - Add caching for frequently accessed data
   - Implement pagination for large datasets
   - Use React Query for better data management

3. **Enhance UI:**
   - Add skeleton loaders
   - Implement infinite scroll
   - Add search and filter functionality

4. **Testing:**
   - Write unit tests for components
   - Add integration tests for API calls
   - Implement E2E testing

---

**Status:** ✅ **Integration Complete**  
**Last Updated:** November 10, 2025  
**Version:** 1.0.0
