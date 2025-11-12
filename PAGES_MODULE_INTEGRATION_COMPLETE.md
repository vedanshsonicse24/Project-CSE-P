# Pages Module Integration Guide

## Overview
This guide documents the complete integration between React TypeScript frontend **Pages** components and the PHP backend API (`pages.php`). The Pages module handles all informational/public-facing pages like About, Contact, Faculty Info, News & Events, Research, Programs, etc.

**Last Updated:** November 11, 2025  
**Status:** ✅ Ready for Integration

---

## Table of Contents
1. [Architecture](#architecture)
2. [Backend API Reference](#backend-api-reference)
3. [Frontend Integration](#frontend-integration)
4. [Type Definitions](#type-definitions)
5. [Usage Examples](#usage-examples)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Architecture

### Backend Structure
```
cse_project_p_backend/
└── api/
    ├── config/
    │   └── Database.php          # PDO database wrapper
    ├── helpers/
    │   └── Response.php          # Standardized JSON responses
    └── pages/
        └── pages.php             # Main pages API handler
```

### Frontend Structure
```
src/
├── components/
│   └── pages/
│       ├── AboutPage.tsx
│       ├── AdmissionsPage.tsx
│       ├── ApplyPage.tsx
│       ├── COEPage.tsx
│       ├── ContactPage.tsx
│       ├── CsaPage.tsx
│       ├── CSEDepartmentPage.tsx
│       ├── EducationResearchPage.tsx
│       ├── FacultyInfoPage.tsx
│       ├── LifeAtSSIPMTPage.tsx
│       ├── NewsEventsPage.tsx
│       ├── ProgramsPage.tsx
│       └── ResearchPage.tsx
├── types/
│   └── pages.ts                  # TypeScript type definitions
└── server.tsx                    # API endpoints configuration
```

---

## Backend API Reference

### Base URL
```
http://localhost/cse_portal_backend/api/pages/pages.php
```

### Available Endpoints

#### 1. Faculty List (for FacultyInfoPage)
**Endpoint:** `GET /api/pages/pages.php?endpoint=faculty`

**Query Parameters:**
- `department` (optional): Filter by department (e.g., "CSE")
- `designation` (optional): Filter by designation (e.g., "Professor")

**Response:**
```json
{
  "status": "success",
  "message": "Success",
  "data": [
    {
      "id": "FAC001",
      "name": "Dr. Rajesh Kumar",
      "designation": "Professor",
      "qualification": "Ph.D. in Computer Science",
      "specialization": "Artificial Intelligence",
      "experience": 15,
      "photo": "http://localhost/uploads/faculty/FAC001.jpg"
    }
  ]
}
```

#### 2. News & Events (for NewsEventsPage)
**Endpoint:** `GET /api/pages/pages.php?endpoint=news`

**Query Parameters:**
- `type` (optional): Filter by type ("event", "news", "all")
- `limit` (optional): Number of records (default: 10)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "status": "success",
  "message": "Success",
  "data": [
    {
      "id": 1,
      "title": "NAVONMESH 25 - National Level Hackathon",
      "description": "National level hackathon on real-time challenges...",
      "type": "info",
      "date": "2025-11-07 10:00:00",
      "recipient_type": "all",
      "is_read": false
    }
  ]
}
```

#### 3. Research Information (for ResearchPage)
**Endpoint:** `GET /api/pages/pages.php?endpoint=research`

**Query Parameters:**
- `department` (optional): Department name (default: "CSE")

**Response:**
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "research_areas": [
      {
        "id": 1,
        "title": "Artificial Intelligence",
        "description": "Machine Learning, Deep Learning, and Neural Networks",
        "faculty_count": 5
      }
    ],
    "researchers": [
      {
        "id": "FAC001",
        "full_name": "Dr. Rajesh Kumar",
        "designation": "Professor",
        "specialization": "Artificial Intelligence",
        "research_interest": "Deep Learning, NLP",
        "years_of_experience": 15
      }
    ]
  }
}
```

#### 4. Contact Information (for ContactPage)
**Endpoint:** `GET /api/pages/pages.php?endpoint=contact`

**Query Parameters:**
- `type` (optional): "general", "department", "admissions"

**Response:**
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "name": "SSIPMT - Computer Science Engineering",
    "address": "SSIPMT, Raipur, Chhattisgarh, India",
    "phone": "+91-771-4242424",
    "email": "cse@ssipmt.edu",
    "website": "https://www.ssipmt.edu"
  }
}
```

#### 5. Student Achievements
**Endpoint:** `GET /api/pages/pages.php?endpoint=achievements`

**Query Parameters:**
- `student_id` (optional): Specific student ID
- `type` (optional): "academic", "extracurricular", "sports", "research"

**Response:**
```json
{
  "status": "success",
  "message": "Success",
  "data": [
    {
      "id": 1,
      "student_id": "STU001",
      "title": "First Prize in Hackathon",
      "description": "Won first prize in NAVONMESH 24",
      "achievement_date": "2024-11-08",
      "status": "Approved",
      "type": "academic"
    }
  ]
}
```

#### 6. Page Content (for AboutPage, CSEDepartmentPage, etc.)
**Endpoint:** `GET /api/pages/pages.php?endpoint=content`

**Query Parameters:**
- `page` (required): "about", "cse_department", "admissions", "research"

**Response for About Page:**
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "title": "About SSIPMT",
    "content": "Founded in 2003, SSIPMT is a premier technical institution...",
    "mission": "To provide quality engineering education...",
    "vision": "To be a leading technical institution..."
  }
}
```

#### 7. Department Statistics
**Endpoint:** `GET /api/pages/pages.php?endpoint=stats`

**Query Parameters:**
- `department` (optional): Department name (default: "CSE")

**Response:**
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "faculty_count": 15,
    "student_count": 240,
    "research_publications": 150,
    "patents_filed": 12,
    "industry_collaborations": 25,
    "placement_percentage": 95,
    "average_package": "8.5 LPA"
  }
}
```

#### 8. Programs List (for ProgramsPage)
**Endpoint:** `GET /api/pages/pages.php?endpoint=programs`

**Response:**
```json
{
  "status": "success",
  "message": "Success",
  "data": [
    {
      "id": 1,
      "name": "B.Tech Computer Science & Engineering",
      "duration": "4 Years",
      "seats": 180,
      "eligibility": "JEE Main/Advanced",
      "specializations": ["Core CSE", "AI & ML", "Data Science"]
    }
  ]
}
```

---

## Frontend Integration

### Step 1: Import Required Dependencies

```tsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '../../server';
import type { 
  FacultyMember, 
  FacultyListResponse 
} from '../../types/pages';
```

### Step 2: Create State Variables

```tsx
const [data, setData] = useState<FacultyMember[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

### Step 3: Fetch Data with useEffect

```tsx
useEffect(() => {
  fetchPageData();
}, []);

const fetchPageData = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await fetch(API_ENDPOINTS.pages.faculty);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: FacultyListResponse = await response.json();
    
    if (result.status === 'success') {
      setData(result.data);
    } else {
      throw new Error(result.message || 'Failed to fetch data');
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An error occurred';
    setError(errorMessage);
    toast.error('Failed to load data', {
      description: errorMessage
    });
  } finally {
    setIsLoading(false);
  }
};
```

### Step 4: Handle Loading & Error States

```tsx
// Loading State
if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600">Loading page data...</p>
      </div>
    </div>
  );
}

// Error State
if (error) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button 
          onClick={fetchPageData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
```

---

## Usage Examples

### Example 1: FacultyInfoPage Integration

```tsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '../../server';
import type { FacultyMember, FacultyListResponse } from '../../types/pages';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export function FacultyInfoPage() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    fetchFaculty();
  }, [activeFilter]);

  const fetchFaculty = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Build query string with filters
      let url = API_ENDPOINTS.pages.faculty;
      const params = new URLSearchParams();
      
      if (activeFilter !== 'All') {
        params.append('designation', activeFilter);
      }
      
      if (params.toString()) {
        url += `&${params.toString()}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: FacultyListResponse = await response.json();

      if (result.status === 'success') {
        setFaculty(result.data);
        toast.success(`Loaded ${result.data.length} faculty members`);
      } else {
        throw new Error(result.message || 'Failed to fetch faculty');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error('Failed to load faculty', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchFaculty}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Faculty Information</h1>
      
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {['All', 'Professor', 'Associate Professor', 'Assistant Professor'].map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'default' : 'outline'}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((member) => (
          <Card key={member.id} className="p-6">
            <img 
              src={member.photo || '/placeholder-faculty.jpg'} 
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
            <p className="text-gray-600 text-center mb-1">{member.designation}</p>
            <p className="text-gray-500 text-sm text-center mb-1">{member.qualification}</p>
            <p className="text-blue-600 text-sm text-center mb-1">{member.specialization}</p>
            <p className="text-gray-500 text-xs text-center">{member.experience} years experience</p>
          </Card>
        ))}
      </div>

      {faculty.length === 0 && (
        <p className="text-center text-gray-500 py-12">No faculty found</p>
      )}
    </div>
  );
}
```

### Example 2: NewsEventsPage Integration

```tsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2, Calendar, Clock } from 'lucide-react';
import { API_ENDPOINTS } from '../../server';
import type { NewsEvent, NewsEventsResponse } from '../../types/pages';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function NewsEventsPage() {
  const [news, setNews] = useState<NewsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    setIsLoading(true);

    try {
      const limit = 10;
      const offset = page * limit;
      const url = `${API_ENDPOINTS.pages.news}&type=all&limit=${limit}&offset=${offset}`;

      const response = await fetch(url);
      const result: NewsEventsResponse = await response.json();

      if (result.status === 'success') {
        setNews((prev) => [...prev, ...result.data]);
        setHasMore(result.data.length === limit);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      toast.error('Failed to load news', { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">News & Events</h1>

      <div className="space-y-6">
        {news.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold flex-1">{item.title}</h3>
              <Badge variant={item.type === 'info' ? 'default' : 'secondary'}>
                {item.type}
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-4">{item.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(item.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(item.date).toLocaleTimeString()}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      )}

      {!isLoading && hasMore && (
        <div className="text-center mt-8">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}

      {!isLoading && news.length === 0 && (
        <p className="text-center text-gray-500 py-12">No news available</p>
      )}
    </div>
  );
}
```

### Example 3: ContactPage Integration

```tsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { API_ENDPOINTS } from '../../server';
import type { ContactInfo, ContactInfoResponse } from '../../types/pages';
import { Card } from '../ui/card';

export function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    setIsLoading(true);

    try {
      const url = `${API_ENDPOINTS.pages.contact}&type=department`;
      const response = await fetch(url);
      const result: ContactInfoResponse = await response.json();

      if (result.status === 'success') {
        setContactInfo(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      toast.error('Failed to load contact info', { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!contactInfo) {
    return <p className="text-center py-12">No contact information available</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6">{contactInfo.name}</h2>
        
        <div className="space-y-4">
          {contactInfo.address && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <p className="text-gray-700">{contactInfo.address}</p>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-blue-600" />
            <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">
              {contactInfo.phone}
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
              {contactInfo.email}
            </a>
          </div>
          
          {contactInfo.website && (
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <a 
                href={contactInfo.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {contactInfo.website}
              </a>
            </div>
          )}

          {contactInfo.head && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-gray-600">Head of Department</p>
              <p className="font-semibold text-lg">{contactInfo.head}</p>
            </div>
          )}

          {contactInfo.office && (
            <div className="mt-2">
              <p className="text-gray-600">Office Location</p>
              <p className="font-semibold">{contactInfo.office}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
```

### Example 4: AboutPage with Dynamic Content

```tsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '../../server';
import type { AboutPageContent, PageContentResponse } from '../../types/pages';
import { Card } from '../ui/card';

export function AboutPage() {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchPageContent(), fetchDepartmentStats()]);
  }, []);

  const fetchPageContent = async () => {
    try {
      const url = `${API_ENDPOINTS.pages.content}&page=about`;
      const response = await fetch(url);
      const result: PageContentResponse = await response.json();

      if (result.status === 'success') {
        setContent(result.data as AboutPageContent);
      }
    } catch (err) {
      toast.error('Failed to load page content');
    }
  };

  const fetchDepartmentStats = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.pages.stats);
      const result = await response.json();

      if (result.status === 'success') {
        setStats(result.data);
      }
    } catch (err) {
      toast.error('Failed to load statistics');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {content && (
        <>
          <h1 className="text-5xl font-bold mb-6">{content.title}</h1>
          <p className="text-lg text-gray-700 mb-8">{content.content}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700">{content.mission}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700">{content.vision}</p>
            </Card>
          </div>
        </>
      )}

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-6 text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.faculty_count}</p>
            <p className="text-gray-600 mt-2">Faculty Members</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.student_count}</p>
            <p className="text-gray-600 mt-2">Students</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.research_publications}</p>
            <p className="text-gray-600 mt-2">Publications</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.placement_percentage}%</p>
            <p className="text-gray-600 mt-2">Placements</p>
          </Card>
        </div>
      )}
    </div>
  );
}
```

---

## Testing

### 1. Deploy Backend to XAMPP

```powershell
# Copy pages.php to XAMPP
Copy-Item "d:\Project-CSE-P\cse_project_p_backend\api\pages\pages.php" `
          "D:\new_xammp\htdocs\cse_portal_backend\api\pages\" -Force

# Verify Database.php and Response.php exist
Test-Path "D:\new_xammp\htdocs\cse_portal_backend\api\config\Database.php"
Test-Path "D:\new_xammp\htdocs\cse_portal_backend\api\helpers\Response.php"
```

### 2. Test API Endpoints with curl

```powershell
# Test Faculty List
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=faculty").Content | ConvertFrom-Json

# Test News & Events
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=news&limit=5").Content | ConvertFrom-Json

# Test Contact Info
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=contact&type=department").Content | ConvertFrom-Json

# Test Department Stats
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=stats").Content | ConvertFrom-Json

# Test Programs
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=programs").Content | ConvertFrom-Json

# Test Research Info
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=research").Content | ConvertFrom-Json

# Test Page Content (About)
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=content&page=about").Content | ConvertFrom-Json

# Test Page Content (CSE Department)
(curl "http://localhost/cse_portal_backend/api/pages/pages.php?endpoint=content&page=cse_department").Content | ConvertFrom-Json
```

### 3. Frontend Testing

1. Start Vite dev server:
```bash
npm run dev
```

2. Navigate to each page and verify:
   - ✅ Loading spinner appears while fetching
   - ✅ Data loads correctly from API
   - ✅ Error handling works (disconnect XAMPP to test)
   - ✅ Retry functionality works
   - ✅ Toast notifications appear
   - ✅ No console errors

### 4. Browser DevTools Testing

Open DevTools > Network tab and verify:
- Status code: `200 OK`
- Response type: `application/json`
- CORS headers present
- Response structure matches types

---

## Troubleshooting

### Issue 1: CORS Error
**Symptom:** "Access to fetch has been blocked by CORS policy"

**Solution:**
```php
// Verify in pages.php (already included)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

### Issue 2: Database Connection Error
**Symptom:** "Failed to open stream: No such file or directory"

**Solution:**
```powershell
# Ensure Database.php exists
Test-Path "D:\new_xammp\htdocs\cse_portal_backend\api\config\Database.php"

# If missing, copy from source
Copy-Item "d:\Project-CSE-P\cse_project_p_backend\api\config\Database.php" `
          "D:\new_xammp\htdocs\cse_portal_backend\api\config\" -Force
```

### Issue 3: Empty Data Array
**Symptom:** API returns `{"status":"success","data":[]}`

**Solution:**
- Check if database tables have data
- Verify SQL queries in pages.php
- Check filters (department, designation, etc.)

```sql
-- Verify faculty table has data
SELECT COUNT(*) FROM faculty;

-- Verify students table has data
SELECT COUNT(*) FROM students;

-- Verify notifications table has data
SELECT COUNT(*) FROM notifications;
```

### Issue 4: TypeScript Type Errors
**Symptom:** "Property X does not exist on type Y"

**Solution:**
- Update type definitions in `src/types/pages.ts`
- Match backend response structure exactly
- Use optional chaining (`?.`) for nullable fields

### Issue 5: 404 Not Found
**Symptom:** "GET http://localhost/cse_portal_backend/api/pages/pages.php 404"

**Solution:**
```powershell
# Check if file exists
Test-Path "D:\new_xammp\htdocs\cse_portal_backend\api\pages\pages.php"

# Check Apache is running
# Open XAMPP Control Panel and start Apache

# Check file permissions
Get-Acl "D:\new_xammp\htdocs\cse_portal_backend\api\pages\pages.php"
```

---

## Quick Reference

### All API Endpoints
```typescript
API_ENDPOINTS.pages.faculty       // Faculty list
API_ENDPOINTS.pages.news          // News & events
API_ENDPOINTS.pages.research      // Research info
API_ENDPOINTS.pages.contact       // Contact info
API_ENDPOINTS.pages.achievements  // Student achievements
API_ENDPOINTS.pages.content       // Page content
API_ENDPOINTS.pages.stats         // Department stats
API_ENDPOINTS.pages.programs      // Programs list
```

### Common Fetch Pattern
```typescript
const response = await fetch(`${API_ENDPOINTS.pages.ENDPOINT}`);
const result = await response.json();

if (result.status === 'success') {
  setData(result.data);
} else {
  throw new Error(result.message);
}
```

### Deployment Checklist
- [ ] pages.php deployed to XAMPP
- [ ] Database.php exists in api/config/
- [ ] Response.php exists in api/helpers/
- [ ] Apache & MySQL running
- [ ] CORS headers enabled
- [ ] Database tables have sample data
- [ ] Frontend types match backend response
- [ ] API_ENDPOINTS configured in server.tsx

---

## Next Steps

1. **Deploy pages.php** to XAMPP
2. **Test all 8 endpoints** with curl
3. **Update each page component** with API integration
4. **Add sample data** to database tables
5. **Test in browser** with DevTools open
6. **Handle edge cases** (empty data, errors)
7. **Add loading skeletons** for better UX
8. **Implement caching** (optional)

**Happy Coding! 🚀**
