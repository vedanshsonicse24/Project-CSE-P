# BOA Dual Approval System - Complete Implementation Guide

## Overview
This system implements a complete BOA (Benefit of Attendance) request and approval workflow with:
- Student submission of BOA requests
- Dual approval requirement (HOD + Class In-charge)
- Real-time status tracking for students
- Database persistence of all requests and approvals

## Database Schema Updates

### Run this SQL script first:
```sql
-- File: cse_project_p_backend/sql/boa_dual_approval_schema.sql

ALTER TABLE boa_requests 
ADD COLUMN IF NOT EXISTS hod_approval_status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
ADD COLUMN IF NOT EXISTS class_incharge_approval_status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
ADD COLUMN IF NOT EXISTS hod_approved_by VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS class_incharge_approved_by VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS hod_approval_date DATETIME DEFAULT NULL,
ADD COLUMN IF NOT EXISTS class_incharge_approval_date DATETIME DEFAULT NULL,
ADD COLUMN IF NOT EXISTS hod_remarks TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS class_incharge_remarks TEXT DEFAULT NULL;
```

### How to run:
1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Select your database: `cse_portal`
3. Go to SQL tab
4. Copy and paste the SQL from `cse_project_p_backend/sql/boa_dual_approval_schema.sql`
5. Click "Go" to execute

## API Endpoints Created

### 1. Submit BOA Request
**File**: `cse_project_p_backend/api/boa/boasubmissionform.php`
**Method**: POST
**Content-Type**: multipart/form-data

**What it does**:
- Accepts BOA form submission from students
- Stores event photos
- Creates database entry with `Pending` status for both approvals
- Returns success with BOA request ID

**Updated to include**: Dual approval status initialization

### 2. Get Student's BOA Requests
**File**: `cse_project_p_backend/api/boa/student_boa_requests.php` ✨ NEW
**Method**: GET
**Parameters**: `?rollNo=21CS001`

**What it does**:
- Fetches all BOA requests submitted by a specific student
- Returns detailed approval status from both HOD and Class In-charge
- Includes remarks and approval dates

**Response**:
```json
{
  "status": "success",
  "data": [
    {
      "id": "BOA123...",
      "eventName": "Tech Fest 2025",
      "status": "Pending",  // Overall status
      "hodApprovalStatus": "Approved",
      "classInchargeApprovalStatus": "Pending",
      "hodApprovedBy": "Dr. Sharma",
      "hodApprovalDate": "2025-11-12 14:30:00",
      "hodRemarks": "Approved for educational benefit",
      "classInchargeRemarks": null,
      ...
    }
  ]
}
```

### 3. Approve/Reject BOA Request
**File**: `cse_project_p_backend/api/boa/approve_boa.php` ✨ NEW
**Method**: POST
**Content-Type**: application/json

**Request Body**:
```json
{
  "boaRequestId": "BOA123...",
  "approverRole": "HOD",  // or "ClassIncharge"
  "action": "approve",    // or "reject"
  "approverName": "Dr. Sharma",
  "remarks": "Approved for educational benefit"
}
```

**What it does**:
- Records approval/rejection from HOD or Class In-charge separately
- Updates overall status based on both approvals:
  - `Approved`: Both HOD and Class In-charge approved
  - `Rejected`: Either one rejected
  - `Pending`: Waiting for approval from one or both
- Stores remarks and timestamps

**Response**:
```json
{
  "status": "success",
  "message": "BOA request approved successfully",
  "data": {
    "id": "BOA123...",
    "overallStatus": "Pending",
    "hodApprovalStatus": "Approved",
    "classInchargeApprovalStatus": "Pending"
  }
}
```

## Frontend Components

### 1. Student BOA Status Component
**File**: `src/components/boa/StudentBOAStatus.tsx` ✨ NEW

**Purpose**: Display all BOA requests submitted by a student

**Features**:
- Shows list of all BOA requests with status badges
- Visual indicators for HOD and Class In-charge approval status
- "View Details" button for full information
- Modal dialog showing:
  - Event details
  - Both approval statuses
  - Approver names and dates
  - Remarks from both approvers
  - Event photos

**Usage**:
```tsx
import { StudentBOAStatus } from "../boa/StudentBOAStatus";

<StudentBOAStatus rollNo="21CS001" />
```

### 2. Updated BOA Submission Form
**File**: `src/components/boa/BOASubmissionForm.tsx`

**Changes**:
- Fixed field mapping to match backend requirements
- Maps frontend fields to backend expected field names:
  - `eventDate` ← `eventDateFrom`
  - `date` ← `eventDateFrom`
  - `numLectures` ← `numTheoryLectures + numPracticalLectures` (sum)

### 3. HOD Dashboard - BOA Management
**File**: `src/components/hod/HODDashboard.tsx`

**Existing**: Already has `<BOAManagement />` component
**Next Step**: Update BOAManagement to use new approval API

## Integration Steps

### Step 1: Update Database
```bash
# Run SQL script in phpMyAdmin
# File: cse_project_p_backend/sql/boa_dual_approval_schema.sql
```

### Step 2: Copy Backend Files
Make sure these files exist:
- ✅ `cse_project_p_backend/api/boa/boasubmissionform.php` (Updated)
- ✅ `cse_project_p_backend/api/boa/student_boa_requests.php` (New)
- ✅ `cse_project_p_backend/api/boa/approve_boa.php` (New)

### Step 3: Update server.tsx
Already updated with new endpoints:
```typescript
boa: {
  submit: `${BOABaseURL}boasubmissionform.php`,
  manage: `${BOABaseURL}boamanagement.php`,
  studentRequests: `${BOABaseURL}student_boa_requests.php`, // ✨ NEW
  approve: `${BOABaseURL}approve_boa.php`, // ✨ NEW
}
```

### Step 4: Add to Student Dashboard
Add the StudentBOAStatus component to StudentDashboard:

```tsx
// In src/components/student/StudentDashboard.tsx
import { StudentBOAStatus } from "../boa/StudentBOAStatus";

// Add a new tab or section:
<StudentBOAStatus rollNo={studentInfo.roll} />
```

### Step 5: Update BOAManagement Component
Update `src/components/boa/BOAManagement.tsx` to use the new approval API:

```typescript
const handleApprove = async (requestId: string) => {
  try {
    const response = await fetch(API_ENDPOINTS.boa.approve, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boaRequestId: requestId,
        approverRole: 'HOD', // or get from user role
        action: 'approve',
        approverName: 'Dr. HOD Name', // from logged-in user
        remarks: remarks
      })
    });
    
    const result = await response.json();
    if (result.status === 'success') {
      toast.success('BOA Request Approved!');
      fetchBOARequests(); // Refresh list
    }
  } catch (error) {
    toast.error('Failed to approve BOA request');
  }
};
```

## Workflow Explanation

### Complete BOA Lifecycle:

1. **Student Submits BOA Request**
   - Fills out BOASubmissionForm
   - Uploads event photos
   - Submits to `boasubmissionform.php`
   - Database record created with:
     - `status = 'Pending'`
     - `hod_approval_status = 'Pending'`
     - `class_incharge_approval_status = 'Pending'`

2. **HOD Reviews Request**
   - Opens BOAManagement in HOD Dashboard
   - Sees pending BOA requests
   - Clicks "Approve" or "Reject"
   - System calls `approve_boa.php` with `approverRole: 'HOD'`
   - Database updates:
     - `hod_approval_status = 'Approved'` (or 'Rejected')
     - `hod_approved_by = 'Dr. Sharma'`
     - `hod_approval_date = NOW()`
     - `hod_remarks = 'Educational benefit'`
   - Overall status remains `Pending` (waiting for Class In-charge)

3. **Class In-charge Reviews Request**
   - Opens BOAManagement (if they have access)
   - Sees same BOA request
   - Clicks "Approve" or "Reject"
   - System calls `approve_boa.php` with `approverRole: 'ClassIncharge'`
   - Database updates:
     - `class_incharge_approval_status = 'Approved'`
     - `class_incharge_approved_by = 'Prof. Patel'`
     - `class_incharge_approval_date = NOW()`
     - `class_incharge_remarks = 'Good initiative'`
   - **Overall status changes to `Approved`** (both approved)

4. **Student Checks Status**
   - Opens StudentBOAStatus component
   - Sees all their BOA requests
   - Views details showing:
     - ✅ HOD: Approved by Dr. Sharma
     - ✅ Class In-charge: Approved by Prof. Patel
     - 🎉 Overall Status: **Approved**

### Status Logic:
- **Approved**: Both HOD AND Class In-charge approved
- **Rejected**: Either HOD OR Class In-charge rejected
- **Pending**: Waiting for one or both approvals

## Testing Checklist

### Backend Testing (via Postman or browser):

1. **Submit BOA Request**
   ```
   POST http://localhost/cse_portal_backend/api/boa/boasubmissionform.php
   Form Data: All event fields + photos
   Expected: Success with BOA ID
   ```

2. **Get Student BOA Requests**
   ```
   GET http://localhost/cse_portal_backend/api/boa/student_boa_requests.php?rollNo=21CS001
   Expected: Array of BOA requests with dual approval status
   ```

3. **HOD Approves**
   ```
   POST http://localhost/cse_portal_backend/api/boa/approve_boa.php
   Body: {
     "boaRequestId": "BOA...",
     "approverRole": "HOD",
     "action": "approve",
     "approverName": "Dr. Sharma",
     "remarks": "Approved"
   }
   Expected: Success, hodApprovalStatus = Approved, overallStatus = Pending
   ```

4. **Class In-charge Approves**
   ```
   POST http://localhost/cse_portal_backend/api/boa/approve_boa.php
   Body: {
     "boaRequestId": "BOA...",
     "approverRole": "ClassIncharge",
     "action": "approve",
     "approverName": "Prof. Patel",
     "remarks": "Approved"
   }
   Expected: Success, overallStatus = Approved
   ```

### Frontend Testing:

1. **Submit BOA Form**
   - Fill all required fields
   - Upload event photos
   - Submit
   - Check toast notification
   - Verify in database

2. **View BOA Status (Student)**
   - Add `<StudentBOAStatus />` to student dashboard
   - Should show submitted BOA with "Pending" status
   - Click "View Details"
   - Should show both approval statuses as "Pending"

3. **HOD Approval**
   - Login as HOD
   - Go to BOA Management
   - Approve a request
   - Student view should update to show HOD approved
   - Overall status still "Pending"

4. **Class In-charge Approval**
   - Approve from Class In-charge view
   - Student view should update to show both approved
   - Overall status changes to "Approved" ✅

## Files Summary

### Backend (PHP):
- ✅ `api/boa/boasubmissionform.php` - Updated for dual approval
- ✅ `api/boa/student_boa_requests.php` - NEW: Get student's BOA requests
- ✅ `api/boa/approve_boa.php` - NEW: Approve/reject BOA requests
- ✅ `sql/boa_dual_approval_schema.sql` - Database schema update

### Frontend (React/TypeScript):
- ✅ `src/components/boa/BOASubmissionForm.tsx` - Fixed field mapping
- ✅ `src/components/boa/StudentBOAStatus.tsx` - NEW: Student view component
- ✅ `src/server.tsx` - Updated with new API endpoints
- ⏳ `src/components/boa/BOAManagement.tsx` - Needs update to use new approval API
- ⏳ `src/components/student/StudentDashboard.tsx` - Add StudentBOAStatus component

## Next Steps

1. **Run SQL script** to update database schema
2. **Test backend APIs** using Postman
3. **Update BOAManagement** component to use new approval endpoint
4. **Add StudentBOAStatus** to Student Dashboard
5. **Test complete workflow** end-to-end

## Support

If you encounter any issues:
1. Check browser console for frontend errors
2. Check PHP error logs: `D:\new_xammp\apache\logs\error.log`
3. Verify database columns exist: `SHOW COLUMNS FROM boa_requests`
4. Test API endpoints individually before testing frontend

---
**Created**: November 12, 2025
**Status**: ✅ Backend Complete | ⏳ Frontend Integration Needed
