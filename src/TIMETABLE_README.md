# Time Table Management System

## Overview
A comprehensive Time Table Management System integrated into the CSE Department Portal with features for viewing, editing timetables, managing teacher schedules, and marking student attendance.

## Features

### 1. Student Timetable View
- **Editable Grid**: 6 days × 8 periods timetable grid
- **Color-Coded Cells**:
  - Yellow (bg-yellow-50) for lab sessions
  - Blue (bg-blue-50) for library/breaks
  - Gray (bg-gray-50) for regular subjects
- **View/Edit Modes**: Toggle between viewing and inline editing
- **Filters**: Semester (3rd-8th) and Section (A-D) dropdowns
- **Export Options**: Export to PNG and Print functionality
- **Responsive Design**: Works on all screen sizes

### 2. Teacher's Schedule View
- **Weekly Class Overview**: View all classes for each day
- **Dark Gradient Theme**: Professional dark background (from-[#0a0e1a] via-[#1a2b46] to-[#0f1724])
- **Attendance Status**: Visual indicators for completed/pending attendance
- **Quick Access**: Click any class to mark attendance
- **Animated Cards**: Smooth entrance animations for class cards

### 3. Attendance Marking Interface
- **Student List**: All 20 students with roll numbers
- **Present/Absent Toggle**: Click student cards to toggle attendance
- **Real-time Stats**: Live count of present/absent students and attendance percentage
- **Bulk Actions**: Mark all present or all absent with one click
- **Visual Feedback**: Green for present, red for absent with smooth transitions

### 4. Data Management Tables
Three editable tables for managing:
- **Subjects**: Code, name, faculty, and type
- **Faculty**: Initial and full name
- **Labs**: Code, name, and in-charge faculty
- **Inline Editing**: Click to edit, Enter to save
- **Add/Delete**: Green "Add" buttons and red "Delete" buttons

## Technology Stack

- **React 18+** with TypeScript
- **Tailwind CSS v4.0** for styling
- **Shadcn/ui** components
- **Motion/React** for animations
- **Lucide React** for icons
- **html2canvas** for PNG export
- **Sonner** for toast notifications
- **Poppins** font (400, 500, 600, 700 weights)

## Color Scheme

### SSIPMT Theme
- **Navy Header**: #1c2e4a
- **Gradient Backgrounds**: from-blue-50 to-indigo-50
- **Dark Gradient** (Teacher View): from-[#0a0e1a] via-[#1a2b46] to-[#0f1724]

### Cell Colors
- **Regular Classes**: bg-gray-50 with border-gray-200
- **Lab Sessions**: bg-yellow-50 with border-yellow-200
- **Library/Breaks**: bg-blue-50 with border-blue-200

## File Structure

```
/components/timetable/
├── types.ts                 # TypeScript interfaces
├── data.ts                  # Sample data and initial state
├── DashboardHeader.tsx      # SSIPMT themed header with navigation
├── EditableCell.tsx         # Dropdown cell editor component
├── Timetable.tsx           # Main timetable grid and data tables
├── TeacherTimetable.tsx    # Teacher's weekly schedule view
├── AttendancePage.tsx      # Student attendance marking interface
└── TimetableApp.tsx        # Main app component that ties everything together
```

## Usage

### Accessing the Timetable System

1. **From Main Portal**: Click "Timetable" link in the permanent header
2. **Navigation**: Use the dropdown menu in the timetable header to switch between:
   - Student Timetable
   - Teacher's Schedule
   - Mark Attendance

### Editing Timetable

1. Click the "Edit" button in the controls
2. Click any cell to open the subject dropdown
3. Select a new subject from the dropdown
4. The cell automatically updates with the subject and teacher
5. Click "Save" to exit edit mode

### Managing Data Tables

**To Add:**
- Click the green "+ Add" button at the bottom of any table
- Edit the new row inline
- Click outside or press Enter to save

**To Edit:**
- Click on any row in the table
- Edit the fields inline
- Click outside or press Enter to save

**To Delete:**
- Click the red "Delete" button on any row

### Exporting Timetable

**Export as PNG:**
1. Click the "Export PNG" button
2. The timetable grid will be captured and downloaded

**Print:**
1. Click the "Print" button
2. Use your browser's print dialog to print or save as PDF

### Marking Attendance (Teacher View)

1. Navigate to "Teacher's Schedule"
2. Select the day from the day selector
3. Click "Mark Attendance" on any class card
4. Toggle students present/absent by clicking their cards
5. Click "Submit Attendance" when done

## Data Structures

### Subject
```typescript
{
  code: string;        // e.g., 'CS301'
  name: string;        // e.g., 'Data Structures'
  faculty: string;     // e.g., 'Dr. Sharma'
  type: 'theory' | 'lab' | 'library' | 'break';
}
```

### Faculty
```typescript
{
  initial: string;     // e.g., 'DS'
  name: string;        // e.g., 'Dr. Sharma'
}
```

### Lab
```typescript
{
  code: string;        // e.g., 'LAB1'
  name: string;        // e.g., 'DS Lab'
  inCharge: string;    // e.g., 'Dr. Sharma'
}
```

### Student
```typescript
{
  rollNo: string;      // e.g., '21CS001'
  name: string;        // e.g., 'Amit Kumar'
  attendance: { [key: string]: boolean };
}
```

## Customization

### Adding More Periods
Edit `/components/timetable/Timetable.tsx`:
```typescript
const periods = ['Period 1', 'Period 2', 'Break', 'Period 3', ...];
const times = ['9:00-10:00', '10:00-11:00', '11:00-11:30', ...];
```

### Changing Semesters/Sections
The system supports semesters 3-8 and sections A-D by default. To modify:
- Edit the Select components in `Timetable.tsx`

### Adding More Days
Edit the `days` array and update `initialTimetableData` in `data.ts`:
```typescript
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
```

### Custom Color Scheme
Modify the `getCellColor()` function in `EditableCell.tsx` to change cell colors based on type.

## Animations

The system uses Motion/React for smooth animations:
- **Card Entrance**: Staggered fade-in-up for teacher schedule cards
- **Student Cards**: Scale animation on attendance page
- **Transitions**: Smooth transitions on all interactive elements (300ms duration)

## Responsive Design

- **Desktop**: Full grid layout with all features visible
- **Tablet**: Adjusted grid with horizontal scroll for timetable
- **Mobile**: Stacked layout with optimized touch interactions

## Toast Notifications

The system shows toast notifications for:
- Cell updates
- Mode changes (Edit/View)
- Data table operations (Add/Edit/Delete)
- Export operations
- Attendance submission

## Print Optimization

When printing:
- Removes shadows and backgrounds
- Hides unnecessary UI elements (buttons, controls)
- Ensures timetable grid fits on page
- Uses print-optimized styling

## Future Enhancements

Potential additions:
- Backend integration with database
- User authentication tied to existing portal users
- Real-time collaboration for multiple teachers
- Conflict detection for overlapping classes
- Analytics and reporting
- Mobile app integration
- Email notifications for attendance
- Import/Export in Excel format

## Support

For issues or questions:
1. Check the component code in `/components/timetable/`
2. Review the data structures in `types.ts`
3. Test with sample data in `data.ts`

## License

Part of the CSE Department Portal - Internal Use Only
