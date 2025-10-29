# 🤖 GitHub Copilot Prompt - Complete My Schedule Page

## 📋 Copy this entire prompt and paste it to GitHub Copilot in VS Code

---

## 🎯 Main Prompt for My Schedule Page

```
Create a complete "My Schedule" page for Faculty Dashboard with swipe-based attendance marking functionality.

PROJECT CONTEXT:
I'm building an Academic Management System for CSE department. Faculty need a modern, mobile-optimized interface to view their daily schedule and mark student attendance efficiently.

REQUIREMENTS:

═══════════════════════════════════════════════════════
PART 1: CREATE MAIN SCHEDULE PAGE COMPONENT
═══════════════════════════════════════════════════════

FILE: src/components/faculty/MySchedulePage.tsx

PAGE STRUCTURE:
├── Page Header
│   ├── Title: "My Schedule"
│   ├── Current Date Display (Full format: "Thursday, October 30, 2025")
│   ├── Faculty Name & Department
│   └── Quick Actions (Export, Refresh)
│
├── Today's Classes Section
│   ├── Time-based Class Cards (Morning/Afternoon/Evening)
│   │   ├── Subject Name & Code
│   │   ├── Section & Room Number
│   │   ├── Time Slot (HH:MM AM/PM format)
│   │   ├── Student Count
│   │   └── "Mark Attendance" Button
│   │
│   └── Empty State if no classes
│
└── Upcoming Classes (Next 7 days)
    └── Grouped by date with class cards

FEATURES REQUIRED:
1. Responsive grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
2. Current time indicator (highlight current/ongoing class)
3. Class status badges: Upcoming (blue), Ongoing (green), Completed (gray)
4. Click on "Mark Attendance" opens attendance modal/drawer
5. Real-time clock showing current time
6. Filter options: All, Today, This Week
7. Search functionality to find specific class/subject
8. Dark mode support
9. Loading skeleton states
10. Empty states with helpful messages

DESIGN SPECIFICATIONS:
- Use shadcn/ui components: Card, Badge, Button, Dialog, Drawer
- Color scheme: Blue (#3b82f6) for primary, Green (#10b981) for success
- Typography: Inter font family
- Spacing: consistent padding (p-4, p-6), gaps (gap-4, gap-6)
- Borders: rounded-lg, border-gray-200 (light) / border-gray-700 (dark)
- Shadows: shadow-sm for cards, shadow-lg for modals

CLASS CARD STRUCTURE:
┌─────────────────────────────────────┐
│ [Status Badge]          [•••Menu]  │
│                                     │
│ Data Structures & Algorithms       │
│ CS301 • Section B                  │
│                                     │
│ 🕐 10:00 AM - 11:00 AM            │
│ 📍 Room 204, Block A               │
│ 👥 45 Students                      │
│                                     │
│ [Mark Attendance →]                │
└─────────────────────────────────────┘

═══════════════════════════════════════════════════════
PART 2: CREATE ATTENDANCE MARKING DRAWER
═══════════════════════════════════════════════════════

FILE: src/components/faculty/AttendanceDrawer.tsx

DRAWER LAYOUT:
├── Header
│   ├── Subject & Section
│   ├── Date & Time
│   ├── Close Button (X)
│   └── Progress Indicator (X/Y marked)
│
├── Statistics Bar
│   ├── Total Students: 45
│   ├── Present: 42 (93.3%)
│   ├── Absent: 3 (6.7%)
│   └── Unmarked: 0
│
├── Quick Actions
│   ├── Mark All Present Button
│   ├── Mark All Absent Button
│   └── Import from Previous Class
│
├── Mobile Swipe Instructions Card
│   └── "Swipe Left ← Present | Swipe Right → Absent"
│
├── Student List (Scrollable)
│   └── SwipeableAttendanceRow for each student
│
└── Footer Actions
    ├── Cancel Button
    ├── Save Draft Button
    └── Submit Attendance Button (Primary)

BEHAVIOR:
- Opens from bottom on mobile (full screen)
- Opens from right on desktop (600px width)
- Auto-save draft every 30 seconds
- Confirm before closing if unsaved changes
- Show success toast on submit
- Disable submit until all students marked (optional)

═══════════════════════════════════════════════════════
PART 3: CREATE SWIPEABLE ATTENDANCE ROW COMPONENT
═══════════════════════════════════════════════════════

FILE: src/components/faculty/SwipeableAttendanceRow.tsx

COMPONENT SPECS:

Interface:
```typescript
interface SwipeableAttendanceRowProps {
  studentId: string;
  studentName: string;
  rollNumber: string;
  initialStatus: 'present' | 'absent' | 'unmarked';
  onStatusChange: (studentId: string, status: 'present' | 'absent') => Promise<void>;
  disabled?: boolean;
}
```

SWIPE GESTURE IMPLEMENTATION:
1. Touch Event Handlers:
   - touchstart: Record initial X/Y coordinates
   - touchmove: Calculate deltaX, prevent vertical scroll if horizontal swipe
   - touchend: Determine action based on distance

2. Swipe Thresholds:
   - Minimum swipe distance: 80px (to trigger action)
   - Maximum visual distance: 150px (for animation)
   - Velocity threshold: Consider swipe speed (optional)

3. Visual Feedback:
   - During swipe: Show background color gradient
     * Swipe left: Green gradient (rgba(34, 197, 94, 0.1) to 0.3)
     * Swipe right: Red gradient (rgba(239, 68, 68, 0.1) to 0.3)
   - Background icons appear at edges (Check icon left, X icon right)
   - Center icon appears when threshold crossed
   - Row translates with finger: transform: translateX(offset)

4. Action Feedback:
   - On complete: Flash background color (600ms)
     * Present: Green (#10b981) with pulse
     * Absent: Red (#ef4444) with pulse
   - Haptic vibration: navigator.vibrate(50) on mobile
   - Icon updates: ✔️ (green) or ❌ (red)
   - Loading spinner during API call

5. Desktop Fallback:
   - Two buttons: ✔️ Present (green hover) and ❌ Absent (red hover)
   - Keyboard accessible: Tab to focus, Enter to activate
   - Click behavior same as swipe complete

6. States:
   - Unmarked: Gray icons, white/dark background
   - Present: Green checkmark highlighted, light green background
   - Absent: Red X highlighted, light red background
   - Loading: Spinner overlay, disabled interaction
   - Error: Shake animation, return to previous state

ROW LAYOUT:
┌─────────────────────────────────────────────────┐
│ [✓ bg]              SWIPEABLE AREA      [✗ bg] │
│                                                 │
│  Aarav Kumar                    [✔️] [❌]      │
│  CSE2023001                                    │
│                                                 │
└─────────────────────────────────────────────────┘
    ↑                                          ↑
  Check icon                                X icon
  (appears left)                         (appears right)

ACCESSIBILITY:
- ARIA labels: "Mark present" / "Mark absent"
- Focus visible: 2px blue outline with 2px offset
- Screen reader announces status changes
- Keyboard navigation: Tab (move), Enter (activate)
- Color blind safe: Icons + colors + text
- High contrast mode support

═══════════════════════════════════════════════════════
PART 4: CREATE ANIMATIONS & STYLES
═══════════════════════════════════════════════════════

FILE: src/styles/my-schedule-animations.css

REQUIRED ANIMATIONS:

1. Swipe Feedback Animations:
```css
@keyframes swipe-feedback-present {
  0% { background: transparent; transform: scale(1); }
  50% { background: rgba(34, 197, 94, 0.2); transform: scale(1.02); }
  100% { background: transparent; transform: scale(1); }
}

@keyframes swipe-feedback-absent {
  0% { background: transparent; transform: scale(1); }
  50% { background: rgba(239, 68, 68, 0.2); transform: scale(1.02); }
  100% { background: transparent; transform: scale(1); }
}
```

2. Class Card Animations:
```css
@keyframes slide-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-ongoing {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

3. Loading States:
```css
@keyframes skeleton-loading {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

@keyframes spinner-rotate {
  100% { transform: rotate(360deg); }
}
```

4. Success/Error Feedback:
```css
@keyframes checkmark-pop {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes error-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
```

5. Drawer Animations:
```css
@keyframes drawer-slide-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes drawer-slide-in-bottom {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
```

UTILITY CLASSES:
- .swipeable-row: disable text selection, remove tap highlight
- .class-card: hover lift effect (translateY(-2px))
- .status-badge: animated pulse for ongoing classes
- .stat-number: count-up animation on load
- .progress-bar: animated fill with easing

RESPONSIVE STYLES:
- Mobile (<640px): Full-width cards, bottom drawer, larger touch targets
- Tablet (640-1024px): 2-column grid, side drawer
- Desktop (>1024px): 3-column grid, fixed sidebar possible

DARK MODE:
- All animations work in dark mode
- Adjust opacity for dark backgrounds
- Border colors: gray-700 instead of gray-200
- Text colors: white/gray-100 instead of gray-900

PERFORMANCE:
- Use transform and opacity for animations (GPU accelerated)
- Avoid animating width, height, top, left
- Use will-change sparingly
- Support prefers-reduced-motion

═══════════════════════════════════════════════════════
PART 5: DATA STRUCTURE & STATE MANAGEMENT
═══════════════════════════════════════════════════════

TYPE DEFINITIONS:
```typescript
interface ClassSchedule {
  id: string;
  subjectName: string;
  subjectCode: string;
  section: string;
  roomNumber: string;
  building: string;
  startTime: string; // "10:00"
  endTime: string; // "11:00"
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  date: Date;
  studentCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  attendanceMarked: boolean;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  phone?: string;
  attendanceStatus: 'present' | 'absent' | 'unmarked';
}

interface AttendanceRecord {
  id: string;
  classId: string;
  studentId: string;
  status: 'present' | 'absent';
  markedAt: Date;
  markedBy: string; // Faculty ID
}

interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  unmarked: number;
  percentage: number;
}
```

STATE MANAGEMENT:
```typescript
// In MySchedulePage
const [selectedDate, setSelectedDate] = useState(new Date());
const [classes, setClasses] = useState<ClassSchedule[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
const [isDrawerOpen, setIsDrawerOpen] = useState(false);

// In AttendanceDrawer
const [students, setStudents] = useState<Student[]>([]);
const [stats, setStats] = useState<AttendanceStats>(initialStats);
const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

// Auto-save draft
useEffect(() => {
  if (hasUnsavedChanges) {
    const timer = setTimeout(() => saveDraft(), 30000);
    return () => clearTimeout(timer);
  }
}, [hasUnsavedChanges]);
```

API INTEGRATION:
```typescript
// Fetch today's classes
const fetchTodayClasses = async () => {
  try {
    const response = await fetch('/api/faculty/schedule/today', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setClasses(data.classes);
  } catch (error) {
    toast.error('Failed to load schedule');
  }
};

// Mark attendance
const markAttendance = async (studentId: string, status: 'present' | 'absent') => {
  try {
    await fetch('/api/attendance/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        classId: selectedClass.id,
        studentId,
        status,
        timestamp: new Date().toISOString()
      })
    });
    
    // Update local state
    setStudents(prev => prev.map(s => 
      s.id === studentId ? { ...s, attendanceStatus: status } : s
    ));
    
    // Update stats
    updateStats();
    
    toast.success(`Marked as ${status}`);
  } catch (error) {
    toast.error('Failed to mark attendance');
    throw error;
  }
};

// Submit attendance (bulk)
const submitAttendance = async () => {
  try {
    const records = students
      .filter(s => s.attendanceStatus !== 'unmarked')
      .map(s => ({
        studentId: s.id,
        status: s.attendanceStatus,
        classId: selectedClass.id
      }));
    
    await fetch('/api/attendance/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ records })
    });
    
    toast.success('Attendance submitted successfully!');
    setIsDrawerOpen(false);
  } catch (error) {
    toast.error('Failed to submit attendance');
  }
};
```

═══════════════════════════════════════════════════════
PART 6: SAMPLE DATA FOR DEVELOPMENT
═══════════════════════════════════════════════════════

```typescript
const sampleClasses: ClassSchedule[] = [
  {
    id: 'cls001',
    subjectName: 'Data Structures & Algorithms',
    subjectCode: 'CS301',
    section: 'B',
    roomNumber: '204',
    building: 'Block A',
    startTime: '10:00',
    endTime: '11:00',
    dayOfWeek: 4, // Thursday
    date: new Date('2025-10-30T10:00:00'),
    studentCount: 45,
    status: 'ongoing',
    attendanceMarked: false
  },
  {
    id: 'cls002',
    subjectName: 'Operating Systems',
    subjectCode: 'CS302',
    section: 'A',
    roomNumber: '305',
    building: 'Block B',
    startTime: '11:30',
    endTime: '12:30',
    dayOfWeek: 4,
    date: new Date('2025-10-30T11:30:00'),
    studentCount: 42,
    status: 'upcoming',
    attendanceMarked: false
  },
  {
    id: 'cls003',
    subjectName: 'Database Management Systems',
    subjectCode: 'CS303',
    section: 'C',
    roomNumber: '101',
    building: 'Block A',
    startTime: '14:00',
    endTime: '15:00',
    dayOfWeek: 4,
    date: new Date('2025-10-30T14:00:00'),
    studentCount: 48,
    status: 'upcoming',
    attendanceMarked: false
  }
];

const sampleStudents: Student[] = [
  { id: 's001', name: 'Aarav Kumar', rollNumber: 'CSE2023001', email: 'aarav@university.edu', attendanceStatus: 'unmarked' },
  { id: 's002', name: 'Priya Sharma', rollNumber: 'CSE2023002', email: 'priya@university.edu', attendanceStatus: 'unmarked' },
  { id: 's003', name: 'Rohan Patel', rollNumber: 'CSE2023003', email: 'rohan@university.edu', attendanceStatus: 'unmarked' },
  { id: 's004', name: 'Ananya Singh', rollNumber: 'CSE2023004', email: 'ananya@university.edu', attendanceStatus: 'unmarked' },
  { id: 's005', name: 'Arjun Reddy', rollNumber: 'CSE2023005', email: 'arjun@university.edu', attendanceStatus: 'unmarked' },
  { id: 's006', name: 'Sneha Gupta', rollNumber: 'CSE2023006', email: 'sneha@university.edu', attendanceStatus: 'unmarked' },
  { id: 's007', name: 'Vikram Joshi', rollNumber: 'CSE2023007', email: 'vikram@university.edu', attendanceStatus: 'unmarked' },
  { id: 's008', name: 'Ishita Verma', rollNumber: 'CSE2023008', email: 'ishita@university.edu', attendanceStatus: 'unmarked' },
];
```

═══════════════════════════════════════════════════════
PART 7: ADDITIONAL FEATURES (OPTIONAL ENHANCEMENTS)
═══════════════════════════════════════════════════════

1. UNDO FUNCTIONALITY:
   - Show undo toast for 5 seconds after marking
   - Queue attendance changes
   - Allow reverting recent actions

2. OFFLINE SUPPORT:
   - Cache attendance data in localStorage
   - Queue changes when offline
   - Sync when connection restored
   - Show offline indicator

3. BULK OPERATIONS:
   - Select multiple students (checkbox)
   - Mark selected as present/absent
   - Import attendance from previous class
   - Copy attendance pattern

4. FILTERS & SEARCH:
   - Search students by name/roll number
   - Filter: All/Present/Absent/Unmarked
   - Sort: Name/Roll Number/Status
   - Quick filters with pills

5. ATTENDANCE HISTORY:
   - View past attendance for this class
   - Student attendance patterns
   - Analytics: attendance trends
   - Export reports (CSV/PDF)

6. NOTIFICATIONS:
   - Reminder 5 min before class
   - Alert if attendance not submitted
   - Low attendance warning (<75%)
   - Push notifications (PWA)

7. SMART FEATURES:
   - Predictive marking (based on patterns)
   - Auto-mark based on location (geofencing)
   - Face recognition integration
   - QR code attendance option

8. ACCESSIBILITY ENHANCEMENTS:
   - Voice commands ("Mark all present")
   - Screen reader optimizations
   - High contrast mode
   - Keyboard shortcuts (Ctrl+P for present)

═══════════════════════════════════════════════════════
PART 8: INTEGRATION & ROUTING
═══════════════════════════════════════════════════════

Add to App.tsx or Router:
```typescript
import MySchedulePage from './components/faculty/MySchedulePage';

// Inside routes
<Route path="/faculty/schedule" element={<MySchedulePage />} />
<Route path="/faculty/my-schedule" element={<MySchedulePage />} />
```

Add to Faculty Dashboard Sidebar:
```typescript
{
  name: 'My Schedule',
  path: '/faculty/my-schedule',
  icon: Calendar,
  badge: todayClassCount > 0 ? todayClassCount : null
}
```

Add CSS import to main.tsx:
```typescript
import './styles/my-schedule-animations.css';
```

Add Toaster to App.tsx:
```typescript
import { Toaster } from 'sonner';

<Toaster 
  position="top-right" 
  richColors 
  closeButton
  duration={4000}
/>
```

═══════════════════════════════════════════════════════
PART 9: TESTING REQUIREMENTS
═══════════════════════════════════════════════════════

MANUAL TESTING CHECKLIST:
- [ ] Page loads with today's classes
- [ ] Classes sorted by time
- [ ] Current class highlighted
- [ ] Status badges correct (upcoming/ongoing/completed)
- [ ] Click "Mark Attendance" opens drawer
- [ ] Drawer shows correct class info
- [ ] Student list loads correctly
- [ ] Swipe left marks present (green flash)
- [ ] Swipe right marks absent (red flash)
- [ ] Statistics update in real-time
- [ ] Click buttons works (desktop)
- [ ] Mark all present/absent works
- [ ] Submit attendance successful
- [ ] Toast notifications appear
- [ ] Unsaved changes warning works
- [ ] Dark mode toggle works
- [ ] Mobile responsive layout
- [ ] Tablet responsive layout
- [ ] Desktop responsive layout
- [ ] Loading states show
- [ ] Error handling works
- [ ] Empty states display correctly

DEVICE TESTING:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari

ACCESSIBILITY TESTING:
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Color contrast WCAG AA
- [ ] Touch targets 44x44px minimum

═══════════════════════════════════════════════════════
PART 10: DEPENDENCIES & SETUP
═══════════════════════════════════════════════════════

REQUIRED NPM PACKAGES:
```bash
npm install lucide-react sonner date-fns
```

SHADCN/UI COMPONENTS:
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add drawer
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
```

IMPORTS NEEDED:
```typescript
// Icons
import { Calendar, Clock, Users, MapPin, Search, Filter, Download, X, Check, MoreVertical } from 'lucide-react';

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Utilities
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

// React
import { useState, useEffect, useCallback } from 'react';
```

═══════════════════════════════════════════════════════
FINAL NOTES
═══════════════════════════════════════════════════════

IMPORTANT:
- Use TypeScript for all components (strict mode)
- Follow React best practices (hooks, memoization)
- Implement proper error boundaries
- Add loading states for all async operations
- Handle edge cases (empty states, errors, offline)
- Make it production-ready with proper validation
- Optimize performance (React.memo, useMemo, useCallback)
- Support both mobile and desktop seamlessly
- Ensure accessibility (WCAG 2.1 Level AA)
- Test on real devices, not just emulator

DESIGN PRINCIPLES:
- Mobile-first approach
- Progressive enhancement
- Graceful degradation
- Intuitive user experience
- Fast and responsive
- Delightful animations
- Clear visual feedback
- Consistent with existing design system

Please create all required files with complete, production-ready code following these specifications exactly. Include proper TypeScript types, error handling, loading states, and accessibility features.
```

---

## 🎯 How to Use This Prompt

### Step 1: Copy the Entire Prompt
Copy everything between the triple backticks above (starting from "Create a complete...")

### Step 2: Open GitHub Copilot in VS Code
- Press **Ctrl + I** (Windows/Linux) or **Cmd + I** (Mac)
- Or click the Copilot Chat icon in the sidebar

### Step 3: Paste and Send
Paste the entire prompt and press Enter

### Step 4: Copilot Will Generate
Copilot will create all the files:
1. `MySchedulePage.tsx` - Main schedule page
2. `AttendanceDrawer.tsx` - Attendance marking drawer
3. `SwipeableAttendanceRow.tsx` - Swipeable row component
4. `my-schedule-animations.css` - All animations

---

## 🔄 Follow-up Prompts (If Needed)

### If You Need More Details on a Specific Part:

**For Schedule Page:**
```
Create the MySchedulePage component with:
- Grid layout for class cards (responsive: 1/2/3 columns)
- Current time tracking to highlight ongoing class
- Filter tabs: Today, This Week, All
- Search bar to find classes
- Each class card shows: subject, time, room, student count, status badge
- Click "Mark Attendance" button opens drawer
- Loading skeleton states
- Empty state when no classes
```

**For Attendance Drawer:**
```
Create AttendanceDrawer component that:
- Opens from bottom on mobile (full screen)
- Opens from right on desktop (600px width)
- Shows class info header
- Displays statistics bar (Total, Present, Absent, %)
- Has quick action buttons: Mark All Present, Mark All Absent
- Lists students using SwipeableAttendanceRow
- Updates statistics in real-time
- Shows unsaved changes warning
- Has Cancel, Save Draft, and Submit buttons
- Includes mobile swipe instruction card
```

**For Swipe Component:**
```
Create SwipeableAttendanceRow with exact specifications:
- Touch events: touchstart, touchmove, touchend
- Swipe left (80px min) → mark present (green flash)
- Swipe right (80px min) → mark absent (red flash)
- Show background icons during swipe
- Haptic vibration on action complete
- Loading spinner during API call
- Desktop: clickable ✔️ and ❌ buttons
- Props: studentId, name, rollNumber, initialStatus, onStatusChange
- Full accessibility support
```

**For Animations:**
```
Create my-schedule-animations.css with:
- Swipe feedback animations (green/red flash 600ms)
- Class card slide-in animations
- Loading skeleton shimmer effect
- Drawer slide animations (from bottom/right)
- Spinner rotation
- Checkmark pop animation
- Error shake animation
- Pulse animation for ongoing classes
- Dark mode variants
- Reduced motion support
```

---

## 📋 Verification Checklist

After Copilot generates the code:

- [ ] MySchedulePage.tsx created with all features
- [ ] AttendanceDrawer.tsx created with drawer layout
- [ ] SwipeableAttendanceRow.tsx created with swipe gestures
- [ ] my-schedule-animations.css created with all animations
- [ ] All TypeScript interfaces defined
- [ ] Sample data included for testing
- [ ] API integration ready
- [ ] Touch event handlers implemented
- [ ] Visual feedback animations present
- [ ] Haptic vibration code included
- [ ] Loading states implemented
- [ ] Error handling with try/catch
- [ ] Toast notifications integrated
- [ ] Dark mode support
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Accessibility features (ARIA, focus states)
- [ ] No TypeScript errors
- [ ] No compile errors

---

## 🧪 Testing Instructions

1. **Install dependencies:**
   ```bash
   npm install lucide-react sonner date-fns
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **Navigate to:**
   ```
   http://localhost:3000/faculty/my-schedule
   ```

4. **Test on Desktop:**
   - View class cards in grid layout
   - Click "Mark Attendance" button
   - Drawer opens from right
   - Click ✔️ and ❌ buttons to mark attendance
   - Check statistics update
   - Submit attendance

5. **Test on Mobile:**
   - Open Chrome DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Select iPhone or Android
   - Drawer opens from bottom
   - Swipe left on student → Green flash → Present
   - Swipe right on student → Red flash → Absent
   - Feel haptic vibration (if on real device)

6. **Test Dark Mode:**
   - Toggle dark mode
   - Verify all colors update correctly
   - Check animations work in dark mode

---

## 🐛 Common Issues & Fixes

### Issue: Drawer not opening
```
Add the Drawer component from shadcn/ui:
npx shadcn-ui@latest add drawer
```

### Issue: Swipe not working
```
Ensure touch events are properly bound:
- touchStart, touchMove, touchEnd on the row element
- preventDefault() called on horizontal swipe
- touchAction: 'pan-y' in style to allow vertical scroll
```

### Issue: Statistics not updating
```
Implement real-time calculation:
- useEffect hook that watches students array
- Calculate totals when any student status changes
- Update stats state immediately
```

### Issue: Icons not showing
```
Install lucide-react:
npm install lucide-react

Import icons:
import { Check, X, Calendar, Clock } from 'lucide-react';
```

### Issue: Animations not working
```
Import CSS file in main.tsx:
import './styles/my-schedule-animations.css';
```

---

## 🎨 Customization Examples

### Change Colors:
```
Modify in component:
- Present: Change from green (#10b981) to custom color
- Absent: Change from red (#ef4444) to custom color
- Primary: Change from blue (#3b82f6) to brand color
```

### Adjust Swipe Sensitivity:
```
In SwipeableAttendanceRow.tsx:
const swipeThreshold = 60; // Easier swipes (default: 80)
const maxSwipeDistance = 200; // Longer swipes (default: 150)
```

### Add More Quick Actions:
```
In AttendanceDrawer:
- Mark Late button
- Mark Excused button
- Import from file
- Random attendance (for testing)
```

---

## 📱 Mobile-Specific Features

1. **Haptic Feedback:** Vibrate on action complete
2. **Pull to Refresh:** Reload class list
3. **Swipe Gestures:** Main interaction method
4. **Bottom Sheet:** Full-screen drawer
5. **Large Touch Targets:** 44x44px minimum
6. **Optimized Performance:** Smooth 60fps animations

---

## 🚀 Ready to Go!

Copy the main prompt, paste it into GitHub Copilot, and you'll get a complete, production-ready My Schedule page with swipe-based attendance!

---

*This prompt creates the exact same feature as implemented in the original project* ✨
