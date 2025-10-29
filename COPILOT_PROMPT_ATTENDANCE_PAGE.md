# 🎯 GitHub Copilot Prompt: Faculty Attendance Feature Page (Exact UI Replica)

## 📝 Instructions for Your Friend

Copy and paste this ENTIRE prompt into GitHub Copilot Chat to recreate the **Faculty Attendance Feature Page** with the exact same UI, colors, animations, and design system.

---

## 🚀 PROMPT START

I need you to create a **Faculty Attendance Page** component with the EXACT design specifications below. This is a professional, modern attendance marking interface for faculty members.

### 📐 Component Structure

**File:** `src/components/timetable/AttendancePage.tsx`

### 🎨 Design Specifications

#### **Background:**
- Dark radial gradient: `radial-gradient(circle at center, #0a0e1a 0%, #1a2b46 50%, #0f1724 100%)`
- Full-screen min-height layout
- Padding: 4 (mobile) to 8 (desktop)

#### **Layout:**
- Max width container: 1200px, centered
- Responsive grid system
- Space-y: 6 between sections

---

### 🔵 Section 1: Header Card (Top Information)

**Design:**
```
┌─────────────────────────────────────────────────────────────┐
│  📖 Data Structures & Algorithms                            │
│  👥 Mr. Vaibhav Chandrakar                           [92]   │
│  🕐 Monday, Period 5 (12:20 to 1:00)                Present │
│                                                       [8]    │
│                                                      Absent  │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Card Style:**
  - Rounded: `rounded-2xl`
  - Padding: `p-6`
  - Background: `linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(8, 145, 178, 0.2) 100%)`
  - Border: `1px solid rgba(59, 130, 246, 0.3)`
  - Backdrop blur: `backdrop-blur-md`

- **Left Side (Subject Info):**
  - Subject name with `BookOpen` icon (h-6 w-6, white)
  - Faculty name with `Users` icon (h-4 w-4, gray-300)
  - Time slot with `Clock` icon (h-4 w-4, gray-300)
  - Text colors: h2 = white, details = gray-300
  - Font size: Details = text-sm

- **Right Side (Statistics):**
  - Two stat boxes: Present & Absent
  - **Present Box:**
    - Background: `rgba(34, 197, 94, 0.2)`
    - Border: `1px solid rgba(34, 197, 94, 0.3)`
    - Number: text-2xl, text-green-300
    - Label: text-xs, text-green-200
  - **Absent Box:**
    - Background: `rgba(239, 68, 68, 0.2)`
    - Border: `1px solid rgba(239, 68, 68, 0.3)`
    - Number: text-2xl, text-red-300
    - Label: text-xs, text-red-200

- **Animation:**
  - Initial: `opacity: 0, y: -20`
  - Animate: `opacity: 1, y: 0`

---

### 🟢 Section 2: Quick Action Buttons

**Design:**
```
┌──────────────────────────┐  ┌──────────────────────────┐
│  ✓  Mark All Present     │  │  ✗  Mark All Absent      │
└──────────────────────────┘  └──────────────────────────┘
```

**Specifications:**
- Two buttons side-by-side, equal width (`flex-1`)
- Height: `h-12`
- Gap: 2 (`gap-2`)

- **Mark All Present Button:**
  - Background: `#16a34a` (green)
  - Hover: `#15803d`
  - Icon: `Check` (h-5 w-5)
  - Text: White

- **Mark All Absent Button:**
  - Variant: outline
  - Border: `#dc2626`
  - Text color: `#ef4444`
  - Hover background: `#dc2626/10`
  - Icon: `X` (h-5 w-5)

- **Functionality:**
  - Mark All Present: Sets all students to present, shows success toast
  - Mark All Absent: Sets all students to absent, shows success toast

- **Animation:**
  - Initial: `opacity: 0, y: 20`
  - Animate: `opacity: 1, y: 0`
  - Transition delay: 0.1s

---

### 👥 Section 3: Student Grid Cards

**Design:**
```
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│ Rahul Kumar         │  │ Priya Sharma        │  │ Amit Patel          │
│ 21CS001             │  │ 21CS002             │  │ 21CS003             │
│                     │  │                     │  │                     │
│ [✓ Present] [✗ Abs] │  │ [✓ Present] [✗ Abs] │  │ [✓ Present] [✗ Abs] │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

**Grid Layout:**
- Responsive: 1 column (mobile), 2 columns (md), 3 columns (lg)
- Gap: 3 between cards
- Cards animate in sequence with stagger effect

**Card States:**

1. **Unmarked (Default):**
   - Background: `rgba(55, 65, 81, 0.3)` (gray)
   - Border: `2px solid rgba(75, 85, 99, 0.5)`

2. **Marked Present:**
   - Background: `rgba(34, 197, 94, 0.2)` (green tint)
   - Border: `2px solid rgba(34, 197, 94, 0.5)` (green)

3. **Marked Absent:**
   - Background: `rgba(239, 68, 68, 0.2)` (red tint)
   - Border: `2px solid rgba(239, 68, 68, 0.5)` (red)

**Card Content:**
- Padding: `p-4`
- Rounded: `rounded-lg`
- Transition: `transition-all duration-300`

- **Student Info:**
  - Name: text-white, normal weight
  - Roll Number: text-xs, text-gray-400

- **Action Buttons (Grid 2 columns):**
  - **Present Button:**
    - Active: `bg-[#16a34a] hover:bg-[#15803d] text-white`
    - Inactive: `bg-gray-700/50 hover:bg-gray-700 text-gray-300`
    - Icon: `Check` (h-4 w-4)
    - Text: "Present" (text-xs)
  
  - **Absent Button:**
    - Active: `bg-[#dc2626] hover:bg-[#b91c1c] text-white`
    - Inactive: `bg-gray-700/50 hover:bg-gray-700 text-gray-300`
    - Icon: `X` (h-4 w-4)
    - Text: "Absent" (text-xs)

**Card Animation:**
- Each card animates individually
- Initial: `opacity: 0, scale: 0.9`
- Animate: `opacity: 1, scale: 1`
- Transition delay: `index * 0.02` (stagger effect)

---

### 🔻 Section 4: Bottom Action Bar

**Design:**
```
┌──────────────────────────┐  ┌──────────────────────────┐
│  ← Cancel                │  │  Submit Attendance       │
└──────────────────────────┘  └──────────────────────────┘
```

**Specifications:**
- Two buttons side-by-side, equal width (`flex-1`)
- Height: `h-12`
- Gap: 3
- Padding top: 4

- **Cancel Button:**
  - Variant: outline
  - Border: gray-600
  - Text: gray-300
  - Hover: bg-gray-700
  - Icon: `ArrowLeft` (h-4 w-4, mr-2)

- **Submit Button:**
  - Background: `linear-gradient(135deg, #2563eb 0%, #0891b2 100%)`
  - Text: White
  - No icon

- **Animation:**
  - Initial: `opacity: 0, y: 20`
  - Animate: `opacity: 1, y: 0`
  - Transition delay: 0.3s

---

### 💾 State Management

```typescript
interface AttendancePageProps {
  slotId: string;
  onBack: () => void;
}

// State structure:
const [students, setStudents] = useState<Student[]>(initialStudents);
const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});

// Functions needed:
1. toggleAttendance(rollNo: string, status: boolean)
2. markAllPresent() - with toast notification
3. markAllAbsent() - with toast notification
4. handleSubmit() - shows "Attendance saved: X/Y students present", then calls onBack after 1.5s
5. handleCancel() - calls onBack immediately
```

---

### 📊 Sample Student Data

```typescript
interface Student {
  name: string;
  rollNo: string;
}

const students: Student[] = [
  { name: "Rahul Kumar", rollNo: "21CS001" },
  { name: "Priya Sharma", rollNo: "21CS002" },
  { name: "Amit Patel", rollNo: "21CS003" },
  { name: "Sneha Verma", rollNo: "21CS004" },
  { name: "Rohan Singh", rollNo: "21CS005" },
  { name: "Neha Gupta", rollNo: "21CS006" },
  { name: "Vikram Rao", rollNo: "21CS007" },
  { name: "Anjali Reddy", rollNo: "21CS008" },
  { name: "Karthik Nair", rollNo: "21CS009" },
  { name: "Pooja Shah", rollNo: "21CS010" },
  { name: "Arjun Desai", rollNo: "21CS011" },
  { name: "Divya Iyer", rollNo: "21CS012" },
];
```

---

### 📦 Required Dependencies

```typescript
import { useState } from 'react';
import { motion } from 'framer-motion'; // or 'motion/react'
import { UserCheck, UserX, ArrowLeft, BookOpen, Users, Clock, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
```

---

### 🎯 Key Features to Implement

1. ✅ **Real-time Stats Update**: Present/Absent count updates as you mark students
2. ✅ **Visual Feedback**: Cards change color immediately when marked
3. ✅ **Toast Notifications**: Success messages for bulk operations and final submission
4. ✅ **Smooth Animations**: 
   - Staggered card entrance
   - Button hover effects
   - Transition on state changes
5. ✅ **Responsive Design**: Works on mobile, tablet, and desktop
6. ✅ **Dark Theme**: Professional dark UI with blue-green gradient accents

---

### 🎨 Color Palette Reference

```css
/* Backgrounds */
--page-bg: radial-gradient(circle at center, #0a0e1a 0%, #1a2b46 50%, #0f1724 100%)
--card-bg: linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(8, 145, 178, 0.2) 100%)

/* States */
--unmarked-bg: rgba(55, 65, 81, 0.3)
--unmarked-border: rgba(75, 85, 99, 0.5)
--present-bg: rgba(34, 197, 94, 0.2)
--present-border: rgba(34, 197, 94, 0.5)
--absent-bg: rgba(239, 68, 68, 0.2)
--absent-border: rgba(239, 68, 68, 0.5)

/* Buttons */
--green-button: #16a34a
--green-button-hover: #15803d
--red-button: #dc2626
--red-button-hover: #b91c1c
--gradient-button: linear-gradient(135deg, #2563eb 0%, #0891b2 100%)

/* Text Colors */
--white: #ffffff
--gray-300: rgb(209, 213, 219)
--gray-400: rgb(156, 163, 175)
--green-200: rgb(187, 247, 208)
--green-300: rgb(134, 239, 172)
--red-200: rgb(254, 202, 202)
--red-300: rgb(252, 165, 165)
```

---

### 📱 Responsive Breakpoints

- **Mobile (< 768px):** 1 column grid, compact spacing
- **Tablet (768px - 1024px):** 2 column grid
- **Desktop (> 1024px):** 3 column grid, full feature display

---

### ⚡ Performance Optimizations

1. Use `motion.div` for smooth animations
2. Stagger effect: `delay: index * 0.02` for sequential card rendering
3. Transition duration: `300ms` for state changes
4. Debounce toast notifications for bulk operations

---

### 🧪 Testing Scenarios

1. ✓ Click individual Present/Absent buttons → Card changes color immediately
2. ✓ Click "Mark All Present" → All cards turn green, toast appears
3. ✓ Click "Mark All Absent" → All cards turn red, toast appears
4. ✓ Mix present/absent → Stats update correctly
5. ✓ Click Submit → Toast shows count, redirects after 1.5s
6. ✓ Click Cancel → Returns immediately without saving

---

### 🎬 Animation Timeline

```
0.0s: Header card fades in from top
0.1s: Quick action buttons slide up
0.2s: Student grid starts appearing
0.2s - 0.44s: Each card scales in with 0.02s delay (12 cards)
0.3s: Bottom action bar slides up
```

---

## 🏁 PROMPT END

---

## 📌 Additional Notes for Your Friend

1. **This component is part of a Faculty Dashboard** - It appears when faculty clicks "Mark Attendance" for a specific class period.

2. **The component receives two props:**
   - `slotId`: ID of the class period (e.g., "monday-period-5")
   - `onBack`: Function to return to the timetable view

3. **The design uses:**
   - Tailwind CSS for styling
   - Framer Motion for animations
   - Lucide React for icons
   - Sonner for toast notifications
   - shadcn/ui Button component

4. **Color scheme follows your app's design system:**
   - Dark theme with blue-green gradients
   - Green for positive actions (Present)
   - Red for negative actions (Absent)
   - Gray for neutral/unmarked states

5. **Make sure to install required packages:**
   ```bash
   npm install framer-motion lucide-react sonner
   ```

6. **The component is fully responsive** and works seamlessly on all devices with touch support for mobile users.

---

## 📂 File Location

Save this component at:
```
src/components/timetable/AttendancePage.tsx
```

Import and use it like:
```typescript
import { AttendancePage } from './components/timetable/AttendancePage';

// In your Faculty Dashboard:
{showAttendance && (
  <AttendancePage 
    slotId={selectedSlotId} 
    onBack={() => setShowAttendance(false)}
  />
)}
```

---

## ✨ Expected Result

Your friend will get a **pixel-perfect replica** of your Faculty Attendance page with:
- ✅ Same dark gradient background
- ✅ Same blue-green card design
- ✅ Same green/red color states
- ✅ Same animations and transitions
- ✅ Same button styles and interactions
- ✅ Same responsive layout
- ✅ Same functionality and toast notifications

**Happy Coding! 🚀**
