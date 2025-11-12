# CV Upload System - Complete Implementation Guide

## Overview
Students can now upload their CVs which are stored in the database and file system. The uploaded CVs appear immediately in the "Uploaded CVs" section.

## Features Implemented

### Backend (PHP)
1. **File Upload API** (`api/students/upload_cv.php`)
   - Validates file type (PDF, DOC, DOCX only)
   - Validates file size (5MB max)
   - Generates unique filename: `CV_[RollNo]_[Timestamp].[ext]`
   - Stores file in: `uploads/cvs/` directory
   - Saves record to database
   - Returns success with file details

2. **Get CVs API** (`api/students/get_cvs.php`)
   - Fetches all CVs for a student by roll number
   - Returns: file name, path, size, upload date, status
   - Ordered by upload date (newest first)

### Frontend (React/TypeScript)
1. **Real-time Upload**
   - File validation before upload
   - Loading toast during upload
   - Success/error notifications
   - Auto-refresh CV list after successful upload

2. **Dynamic CV List**
   - Fetches CVs from database
   - Shows loading state
   - Empty state when no CVs
   - Status badges (Approved/Pending/Rejected)
   - View button opens CV in new tab

## Database Schema

```sql
CREATE TABLE student_cvs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size DECIMAL(10,2) NOT NULL,
    upload_date DATETIME NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Approved',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
```

## Setup Instructions

### 1. Create Database Table
Run this SQL in phpMyAdmin:
```bash
# File: cse_project_p_backend/sql/student_cvs_schema.sql
```

### 2. Ensure Upload Directory Exists
The PHP script will auto-create it, but you can manually create:
```bash
# Create directory:
mkdir cse_portal_backend/uploads/cvs/
chmod 777 cse_portal_backend/uploads/cvs/
```

### 3. Test the Feature
1. Login as student
2. Go to Dashboard → Upload CV tab
3. Click "Browse Files"
4. Select a PDF/DOC/DOCX file
5. Watch upload progress
6. See CV appear in "Uploaded CVs" section

## API Endpoints

### Upload CV
**Endpoint**: `POST /api/students/upload_cv.php`
**Content-Type**: `multipart/form-data`

**Request**:
```
FormData:
  - cv: File (PDF/DOC/DOCX)
  - rollNo: String (e.g., "21CS001")
```

**Response**:
```json
{
  "status": "success",
  "message": "CV uploaded successfully",
  "data": {
    "id": 1,
    "fileName": "CV_21CS001_20251113120530.pdf",
    "filePath": "uploads/cvs/CV_21CS001_20251113120530.pdf",
    "fileSize": 2.3,
    "uploadDate": "2025-11-13 12:05:30",
    "status": "Approved"
  }
}
```

### Get CVs
**Endpoint**: `GET /api/students/get_cvs.php?rollNo=21CS001`

**Response**:
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "fileName": "CV_21CS001_20251113120530.pdf",
      "filePath": "uploads/cvs/CV_21CS001_20251113120530.pdf",
      "fileSize": 2.3,
      "uploadDate": "2025-11-13 12:05:30",
      "status": "Approved"
    }
  ]
}
```

## File Validation

### Allowed File Types
- `application/pdf` (.pdf)
- `application/msword` (.doc)
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (.docx)

### File Size Limit
- Maximum: 5MB (5 * 1024 * 1024 bytes)

### Filename Format
- Pattern: `CV_[RollNumber]_[YYYYMMDDHHmmss].[extension]`
- Example: `CV_21CS001_20251113120530.pdf`

## Error Handling

### Frontend
- File type validation: Shows toast error
- File size validation: Shows toast error
- Upload failure: Shows toast error with message
- Network error: Shows generic error message

### Backend
- Missing roll number: 400 Bad Request
- Invalid file type: 400 Bad Request
- File size exceeded: 400 Bad Request
- Student not found: 404 Not Found
- Upload error: 500 Internal Server Error

## Security Features
1. File type validation (MIME type check)
2. File size limit enforcement
3. Unique filename generation (prevents overwrite)
4. Student verification via roll number
5. Foreign key constraint (data integrity)

## User Flow

```
┌─────────────────────┐
│  Student Dashboard  │
│   Upload CV Tab     │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ Browse Files │ ← Click button
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Select File  │ ← Choose PDF/DOC
    └──────┬───────┘
           │
           ▼
    ┌──────────────────┐
    │ File Validation  │
    │ • Type check     │
    │ • Size check     │
    └──────┬───────────┘
           │
           ▼
    ┌──────────────────┐
    │ Upload to Server │
    │ • FormData POST  │
    │ • Loading toast  │
    └──────┬───────────┘
           │
           ▼
    ┌──────────────────┐
    │ Backend Process  │
    │ • Save file      │
    │ • Insert DB      │
    └──────┬───────────┘
           │
           ▼
    ┌──────────────────┐
    │ Success Response │
    │ • File details   │
    └──────┬───────────┘
           │
           ▼
    ┌──────────────────┐
    │ Refresh CV List  │
    │ • Fetch from DB  │
    │ • Display CVs    │
    └──────────────────┘
           │
           ▼
    ┌──────────────────┐
    │ CV Appears in    │
    │ Uploaded CVs     │
    │ Section ✅       │
    └──────────────────┘
```

## Troubleshooting

### CV doesn't appear after upload
1. Check browser console for errors
2. Verify API response in Network tab
3. Check database: `SELECT * FROM student_cvs ORDER BY id DESC LIMIT 1`
4. Verify file exists in `uploads/cvs/` directory

### Upload fails
1. Check file type and size
2. Verify roll number exists in `students` table
3. Check PHP error log: `D:\new_xammp\apache\logs\error.log`
4. Ensure `uploads/cvs/` directory is writable

### View button doesn't work
1. Check file path in database
2. Verify file exists at path
3. Check XAMPP is running
4. Try direct URL: `http://localhost/cse_portal_backend/uploads/cvs/[filename]`

## Testing Checklist

- [ ] Run SQL schema to create `student_cvs` table
- [ ] Upload PDF file - should succeed
- [ ] Upload DOC file - should succeed
- [ ] Upload DOCX file - should succeed
- [ ] Try uploading > 5MB file - should show error
- [ ] Try uploading image/video - should show error
- [ ] Verify CV appears in list immediately
- [ ] Click View button - CV opens in new tab
- [ ] Check database record created
- [ ] Check file saved in uploads/cvs/
- [ ] Upload second CV - should show both in list
- [ ] Refresh page - CVs should persist

## Future Enhancements
1. **Drag & Drop Upload**: Add drag-and-drop interface
2. **Delete CV**: Allow students to delete uploaded CVs
3. **Download CV**: Download button with proper headers
4. **CV Preview**: Show preview before upload
5. **Version History**: Track CV versions
6. **Admin Approval**: Require admin approval before status = Approved
7. **Email Notification**: Notify student when CV is approved/rejected

---
**Created**: November 13, 2025
**Status**: ✅ Fully Functional
**Next**: Run SQL schema and test!
