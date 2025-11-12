# BOA Dual Approval Workflow - Visual Guide

## 📊 Database Structure

```
boa_requests TABLE
├── id (BOA12345...)
├── student_id
├── event_name
├── event_date_from
├── event_date_to
├── organizing_dept
├── teacher_in_charge
├── num_theory_lectures
├── num_practical_lectures
├── branch
├── semester
├── section
├── class_in_charge
├── submission_date
├── status (Overall: Pending/Approved/Rejected)
├── hod_approval_status (Pending/Approved/Rejected) ⭐ NEW
├── class_incharge_approval_status (Pending/Approved/Rejected) ⭐ NEW
├── hod_approved_by ⭐ NEW
├── class_incharge_approved_by ⭐ NEW
├── hod_approval_date ⭐ NEW
├── class_incharge_approval_date ⭐ NEW
├── hod_remarks ⭐ NEW
└── class_incharge_remarks ⭐ NEW
```

## 🔄 Complete Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     STUDENT SUBMITS BOA                          │
│                  (BOASubmissionForm.tsx)                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
           POST /api/boa/boasubmissionform.php
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │      DATABASE ENTRY CREATED           │
        │  status: Pending                      │
        │  hod_approval_status: Pending         │
        │  class_incharge_approval_status:      │
        │    Pending                            │
        └───────────────────┬───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────────────┐
        │         REQUEST VISIBLE TO:                   │
        │  ✓ HOD Dashboard (BOAManagement)              │
        │  ✓ Class In-charge Dashboard                  │
        │  ✓ Student Dashboard (StudentBOAStatus)       │
        └───────────────────┬───────────────────────────┘
                            │
          ┌─────────────────┴─────────────────┐
          ▼                                   ▼
┌───────────────────────┐         ┌───────────────────────┐
│   HOD REVIEWS         │         │ CLASS IN-CHARGE       │
│   (Can approve/       │         │ REVIEWS               │
│    reject anytime)    │         │ (Can approve/reject   │
└───────┬───────────────┘         │  anytime)             │
        │                         └───────┬───────────────┘
        ▼                                 ▼
POST /api/boa/approve_boa.php    POST /api/boa/approve_boa.php
{                                 {
  approverRole: "HOD",              approverRole: "ClassIncharge",
  action: "approve"                 action: "approve"
}                                 }
        │                                 │
        ▼                                 ▼
DATABASE UPDATES:                 DATABASE UPDATES:
hod_approval_status:              class_incharge_approval_status:
  "Approved"                        "Approved"
hod_approved_by:                  class_incharge_approved_by:
  "Dr. Sharma"                      "Prof. Patel"
hod_approval_date:                class_incharge_approval_date:
  2025-11-12 14:30:00               2025-11-12 15:45:00
hod_remarks:                      class_incharge_remarks:
  "Educational benefit"             "Good initiative"
        │                                 │
        │                                 │
        └─────────────┬───────────────────┘
                      ▼
            ┌─────────────────────┐
            │  OVERALL STATUS      │
            │  CALCULATION         │
            │                      │
            │  If BOTH approved:   │
            │    status = Approved │
            │                      │
            │  If EITHER rejected: │
            │    status = Rejected │
            │                      │
            │  Otherwise:          │
            │    status = Pending  │
            └──────────┬───────────┘
                       ▼
        ┌──────────────────────────────────────┐
        │   STUDENT SEES UPDATED STATUS        │
        │   (StudentBOAStatus.tsx)             │
        │                                      │
        │   ✅ HOD: Approved by Dr. Sharma     │
        │   ✅ Class In-charge: Approved by    │
        │      Prof. Patel                     │
        │   🎉 Overall Status: APPROVED        │
        └──────────────────────────────────────┘
```

## 📱 Student View States

### State 1: Just Submitted
```
┌────────────────────────────────────────┐
│ My BOA Requests                        │
├────────────────────────────────────────┤
│ Tech Fest 2025                 🟡 Pending
│ 12 Nov - 14 Nov 2025                   │
│                                        │
│ 🟡 HOD Approval: Pending               │
│ 🟡 Class In-charge: Pending            │
│                                        │
│ Submitted: 12 Nov 2025, 10:30 AM       │
│                        [View Details]  │
└────────────────────────────────────────┘
```

### State 2: HOD Approved, Waiting for Class In-charge
```
┌────────────────────────────────────────┐
│ My BOA Requests                        │
├────────────────────────────────────────┤
│ Tech Fest 2025                 🟡 Pending
│ 12 Nov - 14 Nov 2025                   │
│                                        │
│ ✅ HOD Approval: Approved              │
│    By: Dr. Sharma                      │
│    Date: 12 Nov 2025, 2:30 PM          │
│ 🟡 Class In-charge: Pending            │
│                                        │
│ Submitted: 12 Nov 2025, 10:30 AM       │
│                        [View Details]  │
└────────────────────────────────────────┘
```

### State 3: Both Approved (FINAL)
```
┌────────────────────────────────────────┐
│ My BOA Requests                        │
├────────────────────────────────────────┤
│ Tech Fest 2025               ✅ Approved
│ 12 Nov - 14 Nov 2025                   │
│                                        │
│ ✅ HOD Approval: Approved              │
│    By: Dr. Sharma                      │
│    Date: 12 Nov 2025, 2:30 PM          │
│    Remarks: "Educational benefit"      │
│                                        │
│ ✅ Class In-charge: Approved           │
│    By: Prof. Patel                     │
│    Date: 12 Nov 2025, 3:45 PM          │
│    Remarks: "Good initiative"          │
│                                        │
│ Submitted: 12 Nov 2025, 10:30 AM       │
│                        [View Details]  │
└────────────────────────────────────────┘
```

### State 4: Rejected by One
```
┌────────────────────────────────────────┐
│ My BOA Requests                        │
├────────────────────────────────────────┤
│ Tech Fest 2025               ❌ Rejected
│ 12 Nov - 14 Nov 2025                   │
│                                        │
│ ✅ HOD Approval: Approved              │
│    By: Dr. Sharma                      │
│                                        │
│ ❌ Class In-charge: Rejected           │
│    By: Prof. Patel                     │
│    Remarks: "Insufficient lectures"    │
│                                        │
│ Submitted: 12 Nov 2025, 10:30 AM       │
│                        [View Details]  │
└────────────────────────────────────────┘
```

## 🎯 API Usage Examples

### For Students - Check Their BOA Status

```typescript
// In Student Dashboard
import { StudentBOAStatus } from "../boa/StudentBOAStatus";

function StudentDashboard() {
  const studentInfo = JSON.parse(localStorage.getItem('studentInfo') || '{}');
  
  return (
    <div>
      {/* Other dashboard content */}
      
      <StudentBOAStatus rollNo={studentInfo.roll} />
    </div>
  );
}
```

### For HOD - Approve BOA Request

```typescript
// In HOD Dashboard - BOAManagement component
const handleApproveRequest = async (boaRequestId: string, remarks: string) => {
  try {
    const response = await fetch(API_ENDPOINTS.boa.approve, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boaRequestId: boaRequestId,
        approverRole: 'HOD',
        action: 'approve',
        approverName: 'Dr. Sharma', // Get from logged-in user
        remarks: remarks
      })
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      toast.success('BOA Request Approved!', {
        description: `Overall Status: ${result.data.overallStatus}`
      });
      
      // Refresh the list
      fetchBOARequests();
    } else {
      toast.error('Failed to approve BOA request');
    }
  } catch (error) {
    toast.error('Network error');
  }
};
```

### For Class In-charge - Approve BOA Request

```typescript
// Same function, just change approverRole
const handleApproveRequest = async (boaRequestId: string, remarks: string) => {
  try {
    const response = await fetch(API_ENDPOINTS.boa.approve, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boaRequestId: boaRequestId,
        approverRole: 'ClassIncharge', // Changed from HOD
        action: 'approve',
        approverName: 'Prof. Patel', // Get from logged-in user
        remarks: remarks
      })
    });
    
    // ... rest same as above
  } catch (error) {
    toast.error('Network error');
  }
};
```

## 🔍 Testing the Complete Flow

### 1. Test Student Submission
```bash
# URL: http://localhost:3000/dashboard (Student Portal)
# Navigate to: BOA Upload → Submit BOA Request
# Fill form and submit
# Expected: Success toast, request saved to database
```

### 2. Check Database
```sql
-- In phpMyAdmin
SELECT id, event_name, status, hod_approval_status, class_incharge_approval_status 
FROM boa_requests 
ORDER BY created_at DESC 
LIMIT 1;

-- Expected Result:
-- status: Pending
-- hod_approval_status: Pending
-- class_incharge_approval_status: Pending
```

### 3. Test Student View
```bash
# Add to Student Dashboard:
<StudentBOAStatus rollNo="21CS001" />

# Expected: Shows BOA request with two pending statuses
```

### 4. Test HOD Approval
```bash
# URL: http://localhost:3000/dashboard (HOD Portal)
# Navigate to: BOA Management
# Find the pending request
# Click Approve
# Expected: HOD status updates to Approved, Overall still Pending
```

### 5. Verify Database After HOD Approval
```sql
SELECT hod_approval_status, hod_approved_by, hod_approval_date, status 
FROM boa_requests 
WHERE id = 'BOA...';

-- Expected:
-- hod_approval_status: Approved
-- hod_approved_by: Dr. Sharma
-- hod_approval_date: 2025-11-12 14:30:00
-- status: Pending (still waiting for Class In-charge)
```

### 6. Test Class In-charge Approval
```bash
# Same HOD dashboard (or separate Class In-charge view)
# Approve same request as Class In-charge
# Expected: Overall status changes to Approved
```

### 7. Final Database Check
```sql
SELECT status, hod_approval_status, class_incharge_approval_status 
FROM boa_requests 
WHERE id = 'BOA...';

-- Expected:
-- status: Approved ✅
-- hod_approval_status: Approved ✅
-- class_incharge_approval_status: Approved ✅
```

### 8. Final Student View
```bash
# Refresh Student Dashboard
# Expected: BOA request shows green "Approved" badge with both approvals visible
```

## 🚨 Common Issues & Solutions

### Issue 1: Database columns don't exist
**Solution**: Run the SQL script:
```sql
-- File: cse_project_p_backend/sql/boa_dual_approval_schema.sql
```

### Issue 2: API returns "Student not found"
**Solution**: Ensure student's roll number exists in `students` table

### Issue 3: Overall status not updating
**Solution**: Check approval logic in `approve_boa.php`:
- Both approved → Overall: Approved
- Either rejected → Overall: Rejected
- Otherwise → Overall: Pending

### Issue 4: StudentBOAStatus component not showing
**Solution**: 
1. Import component in Student Dashboard
2. Pass correct `rollNo` prop
3. Check browser console for errors

## 📞 Support

If you need help:
1. Check `BOA_DUAL_APPROVAL_COMPLETE_GUIDE.md` for detailed docs
2. Verify all backend files are in correct location
3. Run SQL schema update
4. Test APIs individually before testing frontend
5. Check browser console and PHP error logs

---
**Last Updated**: November 12, 2025
**Status**: ✅ Ready for Testing
