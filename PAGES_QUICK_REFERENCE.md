# Pages Module - Quick Reference Guide

## ✅ Integration Status
**Backend:** ✅ Deployed to XAMPP  
**Frontend:** 🔄 Ready for Integration  
**API Tests:** ✅ All Endpoints Working  
**Database:** ✅ Connected  

---

## 🚀 Quick Start

### 1. Import API Endpoints
```typescript
import { API_ENDPOINTS } from '../../server';
```

### 2. Import Types
```typescript
import type { FacultyListResponse, NewsEventsResponse, ContactInfoResponse } from '../../types/pages';
```

### 3. Fetch Data
```typescript
const response = await fetch(API_ENDPOINTS.pages.faculty);
const result: FacultyListResponse = await response.json();

if (result.status === 'success') {
  setData(result.data);
}
```

---

## 📡 API Endpoints Reference

### Base URL
```
http://localhost/cse_portal_backend/api/pages/pages.php
```

### All Endpoints
| Endpoint | URL | Purpose |
|----------|-----|---------|
| Faculty List | `?endpoint=faculty` | Get all faculty members |
| News & Events | `?endpoint=news` | Get news/events feed |
| Research Info | `?endpoint=research` | Get research areas & researchers |
| Contact Info | `?endpoint=contact` | Get contact details |
| Achievements | `?endpoint=achievements` | Get student achievements |
| Page Content | `?endpoint=content` | Get static page content |
| Dept Stats | `?endpoint=stats` | Get department statistics |
| Programs | `?endpoint=programs` | Get all programs offered |

---

## 🔧 Component Integration Map

| Frontend Component | Backend Endpoint | Status |
|-------------------|------------------|--------|
| **FacultyInfoPage.tsx** | `pages.faculty` | 🔄 Ready |
| **NewsEventsPage.tsx** | `pages.news` | 🔄 Ready |
| **ResearchPage.tsx** | `pages.research` | 🔄 Ready |
| **ContactPage.tsx** | `pages.contact` | 🔄 Ready |
| **AboutPage.tsx** | `pages.content&page=about` + `pages.stats` | 🔄 Ready |
| **CSEDepartmentPage.tsx** | `pages.content&page=cse_department` + `pages.stats` | 🔄 Ready |
| **ProgramsPage.tsx** | `pages.programs` | 🔄 Ready |
| **AdmissionsPage.tsx** | `pages.content&page=admissions` | 🔄 Ready |

---

## 📋 Common Code Patterns

### Pattern 1: Simple Data Fetch
```typescript
const [data, setData] = useState<FacultyMember[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.pages.faculty);
      const result = await response.json();
      
      if (result.status === 'success') {
        setData(result.data);
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchData();
}, []);
```

### Pattern 2: Data Fetch with Query Parameters
```typescript
const fetchNews = async (type: string, limit: number) => {
  const url = `${API_ENDPOINTS.pages.news}&type=${type}&limit=${limit}`;
  const response = await fetch(url);
  const result = await response.json();
  
  if (result.status === 'success') {
    setNews(result.data);
  }
};
```

### Pattern 3: Multiple API Calls
```typescript
useEffect(() => {
  Promise.all([
    fetch(API_ENDPOINTS.pages.content + '&page=about'),
    fetch(API_ENDPOINTS.pages.stats)
  ])
    .then(async ([contentRes, statsRes]) => {
      const content = await contentRes.json();
      const stats = await statsRes.json();
      
      setContent(content.data);
      setStats(stats.data);
    })
    .catch(err => toast.error('Failed to load page data'))
    .finally(() => setIsLoading(false));
}, []);
```

---

## 🧪 Testing Commands

### Test All Endpoints
```powershell
# Faculty List
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=faculty").Content | ConvertFrom-Json

# News (first 5)
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=news&limit=5").Content | ConvertFrom-Json

# Research Info
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=research").Content | ConvertFrom-Json

# Contact (Department)
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=contact&type=department").Content | ConvertFrom-Json

# Department Stats
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=stats").Content | ConvertFrom-Json

# Programs
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=programs").Content | ConvertFrom-Json

# About Page Content
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=content&page=about").Content | ConvertFrom-Json

# CSE Department Content
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=content&page=cse_department").Content | ConvertFrom-Json
```

---

## 🎯 Priority Integration Order

### Phase 1 (Immediate)
1. **FacultyInfoPage** - Already has faculty data in database
2. **ContactPage** - Uses mock data (works immediately)
3. **AboutPage** - Combines content + stats

### Phase 2 (Next)
4. **ProgramsPage** - Uses mock data
5. **CSEDepartmentPage** - Combines content + stats
6. **NewsEventsPage** - Needs notifications table data

### Phase 3 (Later)
7. **ResearchPage** - Uses faculty research data
8. **AdmissionsPage** - Uses mock content
9. **Other Pages** - Static content pages

---

## ⚠️ Important Notes

### 1. Mock vs Database Data
Some endpoints return **mock data** (hardcoded in PHP):
- ✅ Programs list (mock)
- ✅ Research areas (mock)
- ✅ Contact info (mock)
- ✅ Page content (mock)

These work immediately without database setup!

### 2. Database-Backed Data
Some endpoints fetch from **database**:
- 📊 Faculty list (from `faculty` table)
- 📊 News & events (from `notifications` table)
- 📊 Department stats (from `faculty` + `students` tables)
- 📊 Researchers (from `faculty` table)

### 3. Empty Arrays Are Normal
- News endpoint returns `[]` if no notifications exist
- This is **correct behavior**, not an error
- Frontend should show "No news available" message

---

## 🔍 Debugging Checklist

- [ ] XAMPP Apache is running
- [ ] MySQL is running
- [ ] Database `cse_portal_database` exists
- [ ] `pages.php` deployed to `D:\new_xammp\htdocs\cse_portal_backend\api\pages\`
- [ ] `Database.php` exists at `api/config/Database.php`
- [ ] `Response.php` exists at `api/helpers/Response.php`
- [ ] Frontend `server.tsx` has `PagesBaseURL` defined
- [ ] API_ENDPOINTS.pages.* all defined
- [ ] Types imported from `@/types/pages`
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows 200 OK responses

---

## 📦 Files Modified

### Backend
- ✅ `cse_project_p_backend/api/pages/pages.php` (created & deployed)

### Frontend
- ✅ `src/server.tsx` (added PagesBaseURL + API_ENDPOINTS.pages)
- ✅ `src/types/pages.ts` (created all type definitions)

### Documentation
- ✅ `PAGES_MODULE_INTEGRATION_COMPLETE.md` (comprehensive guide)
- ✅ `PAGES_QUICK_REFERENCE.md` (this file)

---

## 🎓 Example: Integrate FacultyInfoPage

### Step 1: Add Imports
```typescript
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '../../server';
import type { FacultyMember, FacultyListResponse } from '../../types/pages';
```

### Step 2: Add State
```typescript
const [faculty, setFaculty] = useState<FacultyMember[]>([]);
const [isLoading, setIsLoading] = useState(true);
```

### Step 3: Add Fetch Function
```typescript
useEffect(() => {
  const fetchFaculty = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.pages.faculty);
      const result: FacultyListResponse = await response.json();
      
      if (result.status === 'success') {
        setFaculty(result.data);
      }
    } catch (error) {
      toast.error('Failed to load faculty');
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchFaculty();
}, []);
```

### Step 4: Replace Hardcoded Data
```typescript
// OLD (hardcoded)
const facultyData: FacultyMember[] = [
  { name: "Dr. Anand...", ... },
  { name: "Dr. Rakesh...", ... }
];

// NEW (from API)
// Use `faculty` state variable instead
{faculty.map((member) => (
  <div key={member.id}>
    <h3>{member.name}</h3>
    <p>{member.designation}</p>
  </div>
))}
```

---

## 🚀 Next Actions

1. **Choose a page** to integrate (recommend FacultyInfoPage first)
2. **Follow the pattern** from PAGES_MODULE_INTEGRATION_COMPLETE.md
3. **Test in browser** at http://localhost:5173
4. **Check DevTools** Network tab for API calls
5. **Repeat** for other pages

---

**Need Help?** Check PAGES_MODULE_INTEGRATION_COMPLETE.md for detailed examples!
