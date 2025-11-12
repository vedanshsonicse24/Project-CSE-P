# 🎯 Quick Reference Card

## Import Statements

```typescript
// Auto-fetching components (easiest)
import { StatsCardList } from "./components/common/StatsCardList";
import { FacultyCardList } from "./components/common/FacultyCardList";

// Individual components
import { StatsCard } from "./components/common/StatsCard";
import { FacultyCard } from "./components/common/FacultyCard";
import { Breadcrumb, getBreadcrumbItems } from "./components/common/Breadcrumb";

// API configuration
import { API_ENDPOINTS } from "./server";
import BaseURL from "./server";

// Icons
import { Users, GraduationCap, BookOpen, Building2 } from "lucide-react";
```

## Usage Examples

### Stats (Auto-Fetch)
```tsx
<StatsCardList />
```

### Stats (Manual)
```tsx
<div className="grid grid-cols-4 gap-6">
  <StatsCard title="Total Students" icon={Users} fetchFromAPI={true} />
  <StatsCard title="Active Faculty" icon={GraduationCap} fetchFromAPI={true} />
  <StatsCard title="Courses Offered" icon={BookOpen} fetchFromAPI={true} />
  <StatsCard title="Departments" icon={Building2} fetchFromAPI={true} />
</div>
```

### Faculty (Auto-Fetch)
```tsx
<FacultyCardList />
```

### Faculty (Manual by ID)
```tsx
<FacultyCard facultyId="FAC001" fetchFromAPI={true} />
```

### Breadcrumb
```tsx
const items = getBreadcrumbItems("dashboard", "student", "profile");
<Breadcrumb items={items} />
```

## API Calls (Fetch)

```typescript
// Stats
const response = await fetch(API_ENDPOINTS.statsCard);
const data = await response.json();

// Faculty
const response = await fetch(API_ENDPOINTS.facultyCard);
const data = await response.json();

// Specific faculty
const response = await fetch(`${API_ENDPOINTS.facultyCard}?id=FAC001`);
const data = await response.json();
```

## Common Props

### StatsCard
```typescript
title: string          // Required
value?: number         // Optional if fetchFromAPI
icon: LucideIcon       // Required
bgColor?: string       // e.g., "bg-blue-50"
fetchFromAPI?: boolean // Enable API fetching
```

### FacultyCard
```typescript
name?: string
title?: string
department?: string
image?: string
isHOD?: boolean
index?: number
fetchFromAPI?: boolean
facultyId?: string
```

## Test URLs

```
http://localhost/cse_portal_backend/api/common/statscard.php
http://localhost/cse_portal_backend/api/common/facultycard.php
http://localhost/cse_portal_backend/api/boa/boamanagement.php
http://localhost/cse_portal_backend/api/hod/faculty_management.php
```

## Cheat Sheet

| Task | Component | Usage |
|------|-----------|-------|
| Show all stats | `<StatsCardList />` | Auto-fetches from DB |
| Show all faculty | `<FacultyCardList />` | Auto-fetches from DB |
| Show single stat | `<StatsCard fetchFromAPI={true} />` | Fetches specific stat |
| Show single faculty | `<FacultyCard facultyId="..." fetchFromAPI={true} />` | Fetches specific faculty |
| Navigation | `<Breadcrumb items={...} />` | Dynamic breadcrumb |
| API call | `fetch(API_ENDPOINTS.statsCard)` | Direct API access |

---

**Quick Start:** `<StatsCardList />` + `<FacultyCardList />` = Done! ✅
