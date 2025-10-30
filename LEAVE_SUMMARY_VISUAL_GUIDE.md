# Leave Summary - Visual & Code Reference

## Component Structure Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                    ATTENDANCE OVERVIEW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┬──────────────┬──────────────┐                │
│  │   Overall    │    Total     │   Classes    │                │
│  │ Attendance   │   Classes    │   Attended   │                │
│  │    90%       │     188      │     169      │  [STAT CARDS]  │
│  └──────────────┴──────────────┴──────────────┘                │
│                                                                 │
│  ┌──────────────────────────┬──────────────────────────┐        │
│  │  Subject-wise Attendance │ Attendance Distribution  │ [CHARTS]
│  │      (Bar Chart)         │    (Pie Chart)           │        │
│  │                          │                          │        │
│  └──────────────────────────┴──────────────────────────┘        │
│                                                                 │
│  ┌──────────────────────────┬──────────────────────────┐        │
│  │   LEAVE SUMMARY [NEW]    │   QUICK STATS [NEW]      │        │
│  ├──────────────────────────┼──────────────────────────┤ [NEW]  │
│  │ 📅 Leave Summary         │ ⚠️  Quick Stats          │        │
│  │                          │                          │        │
│  │ ┌────────────────────┐   │ ┌────────────────────┐   │        │
│  │ │ Total Leaves: 5    │   │ │ Attendance Target  │   │        │
│  │ │ (Red gradient)     │   │ │ 75%                │   │        │
│  │ └────────────────────┘   │ └────────────────────┘   │        │
│  │                          │                          │        │
│  │ Breakdown:               │ ┌────────────────────┐   │        │
│  │ • Sick:     2 🔴         │ │ Your Status        │   │        │
│  │ • Casual:   2 🟠         │ │ Above Target ✓     │   │        │
│  │ • Academic: 1 🔵         │ └────────────────────┘   │        │
│  │                          │                          │        │
│  │                          │ ┌────────────────────┐   │        │
│  │                          │ │ Classes This Month │   │        │
│  │                          │ │ 32                 │   │        │
│  │                          │ └────────────────────┘   │        │
│  └──────────────────────────┴──────────────────────────┘        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │            SUBJECT-WISE BREAKDOWN TABLE                 │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ Data Structures        42/45 classes         93%        │   │
│  │ Database Systems       35/40 classes         87%        │   │
│  │ Machine Learning       32/35 classes         91%        │   │
│  │ Web Development        28/30 classes         93%        │   │
│  │ Operating Systems      33/38 classes         87%        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │          RECENT ATTENDANCE RECORDS TABLE                │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ Date  │ Subject          │ Time      │ Status           │   │
│  ├───────┼──────────────────┼───────────┼──────────────────┤   │
│  │ 10/30 │ Data Structures  │ 9:00 AM   │ ✓ Present        │   │
│  │ 10/29 │ Database Systems │ 11:00 AM  │ ✓ Present        │   │
│  │ 10/28 │ Machine Learning │ —         │ ✗ Absent         │   │
│  │ 10/27 │ Web Development  │ 2:00 PM   │ ✓ Present        │   │
│  │ 10/26 │ Operating Sys.   │ —         │ 🕐 Leave         │   │
│  │ 10/25 │ Data Structures  │ 9:30 AM   │ ✓ Present        │   │
│  └───────┴──────────────────┴───────────┴──────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Leave Summary Card - Detailed Layout

```
┌────────────────────────────────────────┐
│ Card: bg-white, shadow-lg              │
├────────────────────────────────────────┤
│ Header: flex items-center gap-2        │
│ 📅 (Calendar Icon, Red-700)            │
│ Leave Summary (text-2xl, text-gray-800)│
├────────────────────────────────────────┤
│ Content: space-y-6                     │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ Gradient Box                       │ │
│ │ from-red-50 to-pink-50            │ │
│ │ border-red-100                    │ │
│ │                                  │ │
│ │  Total Leaves Taken               │ │
│ │  5 (text-5xl font-black)         │ │
│ └────────────────────────────────────┘ │
│                                        │
│ Breakdown:                             │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ • 🔴 Sick Leave           2 [Red] │ │
│ └────────────────────────────────────┘ │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ • 🟠 Casual Leave         2 [Red] │ │
│ └────────────────────────────────────┘ │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ • 🔵 Academic Leave       1 [Red] │ │
│ └────────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
```

## Quick Stats Card - Detailed Layout

```
┌────────────────────────────────────────┐
│ Card: bg-white, shadow-lg              │
├────────────────────────────────────────┤
│ Header: flex items-center gap-2        │
│ ⚠️  (AlertCircle Icon, Amber-600)      │
│ Quick Stats (text-2xl, text-gray-800)  │
├────────────────────────────────────────┤
│ Content: space-y-4                     │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ from-yellow-50 to-orange-50       │ │
│ │ border-yellow-100                 │ │
│ │                                  │ │
│ │ Attendance Target                 │ │
│ │ 75% (text-3xl text-orange-600)   │ │
│ │ Minimum required by college       │ │
│ └────────────────────────────────────┘ │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ from-green-50 to-emerald-50      │ │
│ │ border-green-100                  │ │
│ │                                  │ │
│ │ Your Current Status               │ │
│ │ Above Target (text-3xl)          │ │
│ │ ✓ You're maintaining good attend  │ │
│ └────────────────────────────────────┘ │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ from-blue-50 to-cyan-50          │ │
│ │ border-blue-100                   │ │
│ │                                  │ │
│ │ Classes This Month                │ │
│ │ 32 (text-3xl text-blue-600)      │ │
│ │ Attended in October 2025          │ │
│ └────────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (lg breakpoint)
```
Screen Width: 1024px+

┌─────────────────────────────────────────────────┐
│  Leave Summary Card  │   Quick Stats Card       │
│                     │                          │
│ 50% width          │ 50% width                 │
└─────────────────────────────────────────────────┘
```

### Mobile & Tablet
```
Screen Width: < 1024px

┌──────────────────────────────┐
│    Leave Summary Card        │
│     100% width              │
└──────────────────────────────┘
┌──────────────────────────────┐
│    Quick Stats Card         │
│     100% width              │
└──────────────────────────────┘
```

## Animation Sequence

```
Timeline: 0.0s ────────────────────────── 1.5s

Header               [████] 0.6s
      └─ Fade & Slide-down

Stats Cards              [████] 0.5s (staggered)
      └─ Multiple cards with 0.15s delay

Charts                   [████] 0.6s (staggered)
      └─ Scale-in with back.out easing

Leave Summary [NEW]          [████] 0.5s (staggered)
      └─ Slide-up with fade-in
      Quick Stats [NEW]      [████] 0.5s (staggered)
      └─ Same animation

Overlap visualization:
0s    0.3s   0.6s   0.9s   1.2s   1.5s
|-----|-----|-----|-----|-----|
| H   |Cards|Chrt1|Chrt2|Summ|
        |Stat|Stat|Summ|
              |Chrt|Chrt|
                  |Summ|
```

## Inline Ref Structure

```typescript
// Refs for GSAP animations
const headerRef = useRef(null);
const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  // [0] Overall Attendance
  // [1] Total Classes
  // [2] Classes Attended

const chartRefs = useRef<(HTMLDivElement | null)[]>([]);
  // [0] Bar Chart
  // [1] Pie Chart
  // [2] Subject Breakdown Table
  // [3] Recent Records Table

const summaryRefs = useRef<(HTMLDivElement | null)[]>([]);  // NEW
  // [0] Leave Summary Card
  // [1] Quick Stats Card
```

## Color Reference

| Element | Color | Hex | Tailwind |
|---------|-------|-----|----------|
| Leave Numbers | Red | #DC2626 | text-red-700 |
| Sick Indicator | Red | #EF4444 | bg-red-500 |
| Casual Indicator | Amber | #F59E0B | bg-amber-500 |
| Academic Indicator | Blue | #3B82F6 | bg-blue-500 |
| Card Background | White | #FFFFFF | bg-white |
| Title Text | Dark Gray | #1F2937 | text-gray-800 |
| Label Text | Gray | #4B5563 | text-gray-700 |
| Quick Stats Icon | Amber | #B45309 | text-amber-600 |

## Key CSS Classes

```css
/* Card Containers */
.card-container = border-0 shadow-lg h-full bg-white

/* Headers */
.card-header = flex items-center gap-2 text-2xl text-gray-800

/* Gradients */
.gradient-red = bg-gradient-to-br from-red-50 to-pink-50 border-red-100
.gradient-yellow = bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100
.gradient-green = bg-gradient-to-br from-green-50 to-emerald-50 border-green-100
.gradient-blue = bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100

/* Breakdown Items */
.breakdown-item = flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200

/* Indicators */
.indicator = w-3 h-3 rounded-full
```

## Integration Example

```typescript
// In StudentDashboard.tsx, the attendance case already handles this:
case 'attendance':
  return <StudentAttendanceRedesigned onBack={() => setCurrentSection('home')} />;
```

## Data Flow

```
StudentAttendanceRedesigned Component
│
├─ Props: { onBack?: () => void }
│
├─ State:
│  ├─ overallPercentage: 90
│  ├─ totalClasses: 188
│  └─ attendedClasses: 169
│
├─ Constants (Sample Data):
│  ├─ subjectData: SubjectAttendance[]
│  ├─ attendanceRecords: AttendanceRecord[]
│  └─ leaveData: LeaveData  ← NEW
│
├─ Refs (for GSAP):
│  ├─ headerRef
│  ├─ cardsRef
│  ├─ chartRefs
│  └─ summaryRefs  ← NEW
│
└─ Render:
   ├─ Header section
   ├─ Stats cards
   ├─ Charts
   ├─ Leave Summary [NEW]  ← Animated with summaryRefs
   ├─ Subject breakdown
   └─ Recent records
```

## Browser DevTools Inspection

When inspecting the Leave Summary section:

```
<div class="leave-summary">
  <div class="border-0 shadow-lg h-full bg-white">
    <!-- Card content -->
    <div class="flex items-center gap-2 text-2xl text-gray-800">
      <Calendar class="h-6 w-6 text-red-700" />
      Leave Summary
    </div>
    <!-- Breakdown items -->
  </div>
</div>

<div class="additional-summary">
  <div class="border-0 shadow-lg h-full bg-white">
    <!-- Quick stats content -->
  </div>
</div>
```

## Summary

The Leave Summary section is:
- ✅ Fully responsive
- ✅ Animated with GSAP
- ✅ Styled with Tailwind
- ✅ Modular & extensible
- ✅ TypeScript typed
- ✅ Production-ready
