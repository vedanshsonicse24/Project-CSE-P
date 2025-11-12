# HomePage API - Quick Reference Card

## 🚀 Endpoint
```
GET http://localhost/cse_portal_backend/api/homepage.php
```

## 📊 Response Structure
```typescript
{
  status: "success",
  message: "Homepage data fetched successfully",
  data: {
    stats: [
      { label: string, value: string },
      ...
    ],
    announcements: [
      { id: number, title: string, date: string, content: string },
      ...
    ],
    faculty: [
      { name: string, role: string },
      ...
    ],
    projects: [
      { title: string, description: string, tech: string },
      ...
    ]
  }
}
```

## 💻 Frontend Usage
```typescript
import { API_ENDPOINTS } from '../server';

// Fetch homepage data
const response = await fetch(API_ENDPOINTS.homepage);
const result = await response.json();

if (result.status === 'success') {
  setStats(result.data.stats);
  setAnnouncements(result.data.announcements);
  setFacultyData(result.data.faculty);
  setProjects(result.data.projects);
}
```

## 🧪 Quick Test (PowerShell)
```powershell
curl "http://localhost/cse_portal_backend/api/homepage.php"
```

## ✅ Status
- Backend: ✅ Deployed & Working
- Frontend: ✅ Integrated
- Tests: ✅ Passed
- Docs: ✅ Complete

## 📁 Files
- Backend: `api/homepage.php`
- Frontend: `src/components/HomePage.tsx`
- Config: `src/server.tsx`
