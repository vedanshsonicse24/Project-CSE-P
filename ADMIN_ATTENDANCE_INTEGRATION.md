# Admin Attendance Integration Guide

## Overview
This document describes the integration between the React AdminAttendancePage component and the PHP backend API for attendance management.

## Architecture

### Frontend (React + TypeScript)
- **Location**: `src/components/admin/AdminAttendancePage.tsx`
- **Technology**: React 18, TypeScript, Axios
- **UI Library**: Shadcn/ui components

### Backend (PHP)
- **Location**: `cse_project_p_backend/api/admin/attendance.php`
- **Database**: MySQL (cse_portal_database)
- **Table**: attendance_records

## API Endpoint

### Get All Attendance Records
```
GET http://localhost/cse_portal_backend/api/admin/attendance.php
```

**Response Format:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "student_id": "STU001",
      "student_name": "Amit Verma",
      "subject_code": "CS501",
      "timetable_id": "TT001",
      "date": "2025-11-07",
      "period": 1,
      "status": "Present",
      "marked_by": "FAC001",
      "marked_at": "2025-11-07 10:30:00"
    }
  ]
}
```

## Features Implemented

### 1. **Data Fetching**
- Automatic data loading on component mount
- Manual refresh functionality
- Axios for HTTP requests
- Type-safe response handling

### 2. **Loading States**
- ✅ Loading spinner while fetching data
- ✅ Error display with retry button
- ✅ Empty state message when no records

### 3. **Attendance Records Table**
- Displays all attendance records from database
- Columns: ID, Student ID, Student Name, Subject Code, Date, Period, Status, Marked At
- Color-coded status badges (Present=Green, Absent=Red, BOA=Blue)
- Responsive table design
- Toggle show/hide functionality

### 4. **Statistics Dashboard**
- Total students count
- Present count (green)
- Absent count (red)
- Attendance percentage (purple)
- Real-time calculation based on data

### 5. **Interactive Features**
- Swipeable attendance rows for mobile
- Mark all present/absent buttons
- Export to CSV functionality
- Refresh button to reload data
- Submit attendance functionality

### 6. **Error Handling**
- Network error handling
- API error messages
- User-friendly error display
- Retry mechanism

## TypeScript Interfaces

```typescript
interface AttendanceRecord {
  id: number;
  student_id: string;
  student_name: string;
  subject_code: string;
  timetable_id: string | null;
  date: string;
  period: number;
  status: 'Present' | 'Absent' | 'BOA';
  marked_by: string | null;
  marked_at: string;
}

interface AttendanceResponse {
  success: boolean;
  count: number;
  data: AttendanceRecord[];
}
```

## Usage

### 1. Start XAMPP
```bash
# Start Apache and MySQL services
```

### 2. Ensure Database is Set Up
```sql
USE cse_portal_database;
-- Verify attendance_records table exists
```

### 3. Run React Development Server
```bash
npm run dev
```

### 4. Access the Page
Navigate to the admin attendance page in your application.

## Testing the Integration

### 1. Check API Endpoint
```bash
# Open in browser or use curl
curl http://localhost/cse_portal_backend/api/admin/attendance.php
```

### 2. Verify Data Display
- ✅ Loading spinner appears initially
- ✅ Data loads and displays in statistics
- ✅ Click "Show Attendance Records" to view table
- ✅ Table shows all records from database

### 3. Test Error Handling
- Stop XAMPP MySQL service
- Click refresh button
- Verify error message displays
- Start MySQL and click retry

## API Configuration

### Base URL
```typescript
const API_BASE_URL = 'http://localhost/cse_portal_backend/api/admin';
```

To change the backend URL, update this constant in `AdminAttendancePage.tsx`.

## Database Schema

The component expects data from `attendance_records` table with this structure:

```sql
CREATE TABLE attendance_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id VARCHAR(50) NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    timetable_id VARCHAR(50),
    date DATE NOT NULL,
    period INT NOT NULL,
    status ENUM('Present', 'Absent', 'BOA') NOT NULL,
    marked_by VARCHAR(50),
    marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (subject_code) REFERENCES subjects(code)
);
```

## Dependencies

### Frontend
```json
{
  "axios": "^1.6.0",
  "react": "^18.2.0",
  "sonner": "^1.0.0",
  "lucide-react": "^0.292.0"
}
```

### Backend
- PHP 7.4+
- MySQL 5.7+
- mysqli extension

## Troubleshooting

### Issue: "Cannot connect to database"
**Solution**: 
- Verify XAMPP MySQL is running
- Check database credentials in `db_connect.php`
- Ensure database `cse_portal_database` exists

### Issue: "CORS error"
**Solution**: 
Backend already includes CORS headers:
```php
header("Access-Control-Allow-Origin: *");
```

### Issue: "No records found"
**Solution**:
- Insert sample data into `attendance_records` table
- Check if students and subjects tables have data

### Issue: "Module 'axios' not found"
**Solution**:
```bash
npm install axios
```

## Next Steps

1. **Implement POST endpoints** for marking attendance
2. **Add filtering** by date, subject, or student
3. **Implement pagination** for large datasets
4. **Add real-time updates** using WebSocket
5. **Create admin dashboard** with analytics

## Security Considerations

⚠️ **Important**: This is a development setup. For production:

1. Implement authentication tokens
2. Add request validation
3. Use prepared statements (already implemented in PHP)
4. Enable HTTPS
5. Add rate limiting
6. Implement proper session management

## Contact

For issues or questions, refer to the main project documentation or contact the development team.
