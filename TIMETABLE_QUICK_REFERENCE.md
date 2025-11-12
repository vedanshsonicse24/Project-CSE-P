# Timetable Module - Quick Reference

## 🚀 Quick Start (3 Minutes)

### Backend URLs (All Working ✅)
```
http://localhost/cse_portal_backend/api/timetable/timetable.php
http://localhost/cse_portal_backend/api/timetable/teachertimetable.php
http://localhost/cse_portal_backend/api/timetable/attendancepage.php
http://localhost/cse_portal_backend/api/timetable/dashboardheader.php
http://localhost/cse_portal_backend/api/timetable/subjects.php
http://localhost/cse_portal_backend/api/timetable/labs.php
```

### Quick Test
```bash
# Test timetable API
curl "http://localhost/cse_portal_backend/api/timetable/timetable.php"

# Test dashboard stats
curl "http://localhost/cse_portal_backend/api/timetable/dashboardheader.php"

# Test subjects
curl "http://localhost/cse_portal_backend/api/timetable/subjects.php"
```

---

## Common Patterns

### 1. Fetch Timetable
```typescript
const fetchTimetable = async () => {
  const response = await fetch(`${API_ENDPOINTS.timetable.get}?semester=5&section=A`);
  const result = await response.json();
  setTimetable(result.data);
};
```

### 2. Create Timetable Entry
```typescript
const createEntry = async (entry: CreateTimetableRequest) => {
  const response = await fetch(API_ENDPOINTS.timetable.create, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
  const result = await response.json();
  toast.success(result.message);
};
```

### 3. Mark Attendance
```typescript
const saveAttendance = async (records: any[]) => {
  const response = await fetch(API_ENDPOINTS.timetable.attendance, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timetable_id: 'TT_123',
      marked_by: 'FAC001',
      attendance: records
    })
  });
  const result = await response.json();
  toast.success(`Saved ${result.data.records_saved} records`);
};
```

### 4. Get Dashboard Stats
```typescript
const fetchStats = async () => {
  const response = await fetch(`${API_ENDPOINTS.timetable.dashboard}?faculty_id=FAC001`);
  const result = await response.json();
  setStats(result.data);
};
```

---

## Type Imports
```typescript
import type {
  TimetableEntry,
  TimetableResponse,
  DashboardStats,
  DashboardStatsResponse,
  AttendanceData,
  AttendanceResponse,
  SubjectResponse,
  CreateTimetableRequest,
  UpdateTimetableRequest,
  SaveAttendanceRequest
} from './types';
```

---

## API Response Format

**All APIs return:**
```json
{
  "status": "success" | "error",
  "message": "Success message",
  "data": { /* Response data */ }
}
```

---

## Common Query Parameters

| Endpoint | Parameters | Example |
|----------|-----------|---------|
| `timetable.php` | semester, section, day, faculty_id | `?semester=5&section=A&day=Monday` |
| `teachertimetable.php` | faculty_id, day | `?faculty_id=FAC001&day=Monday` |
| `attendancepage.php` | timetable_id, date | `?timetable_id=TT_123&date=2025-11-12` |
| `dashboardheader.php` | faculty_id | `?faculty_id=FAC001` |
| `subjects.php` | semester, type | `?semester=5&type=theory` |
| `labs.php` | - | - |

---

## Error Handling Pattern
```typescript
try {
  const response = await fetch(url);
  const result = await response.json();
  
  if (result.status === 'success') {
    // Success logic
    setData(result.data);
    toast.success(result.message);
  } else {
    throw new Error(result.message);
  }
} catch (error) {
  toast.error('Operation failed');
  console.error(error);
}
```

---

## Complete Integration Example
```typescript
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '../../server';
import type { TimetableEntry, TimetableResponse } from './types';

export function TimetableIntegrated() {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    setIsLoading(true);
    try {
      const url = `${API_ENDPOINTS.timetable.get}?semester=5&section=A`;
      const response = await fetch(url);
      const result: TimetableResponse = await response.json();
      
      if (result.status === 'success') {
        setTimetable(result.data);
        toast.success('Timetable loaded');
      }
    } catch (error) {
      toast.error('Failed to load timetable');
    } finally {
      setIsLoading(false);
    }
  };

  const createEntry = async (data: any) => {
    try {
      const response = await fetch(API_ENDPOINTS.timetable.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      
      if (result.status === 'success') {
        toast.success('Entry created');
        fetchTimetable(); // Refresh
      }
    } catch (error) {
      toast.error('Failed to create entry');
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Render timetable */}
          {timetable.map(entry => (
            <div key={entry.id}>
              {entry.subject_name} - {entry.faculty_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Status: ✅ READY TO USE
- Backend: ✅ Deployed & Tested
- Types: ✅ Defined
- Endpoints: ✅ Configured in server.tsx
- Examples: ✅ Available above

**Next:** Copy-paste examples into your components!
