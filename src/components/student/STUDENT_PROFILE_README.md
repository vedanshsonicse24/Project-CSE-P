# Student Profile Page

## Overview
A comprehensive Student Profile management page for the CSE Department Portal that allows students to view and update their academic and personal information.

## File Location
- **Component**: `/src/components/student/StudentProfile.tsx`
- **Route**: `/student-profile` (accessed via navigation)

## Features

### 1. **Personal Information Section**
- Full Name (required)
- Date of Birth (required)
- Email Address (required)
- Phone Number (required)

### 2. **Academic Information Section**
- Roll Number (required)
- Enrollment Number (required)
- Attendance Percentage (required, 0-100)
- Designation/Role (optional)

### 3. **Social & Professional Links**
- LinkedIn Profile URL
- GitHub Profile URL

### 4. **Parent/Guardian Information**
- Father's Name (required)
- Mother's Name (required)

### 5. **Achievements & Honors**
- Multi-line text area for listing achievements, awards, and certifications

## Design Specifications

### Color Scheme
- **Primary**: Blue gradient (`from-blue-900 to-blue-700`)
- **Background**: Subtle gradient (`from-gray-50 via-blue-50 to-gray-100`)
- **Card**: White with subtle transparency (`bg-white/90`)
- **Icons**: Blue accent (`text-blue-600/700`)

### Typography
- **Page Title**: 4xl, bold, gradient text
- **Section Headers**: xl, semibold with bottom border
- **Labels**: Medium weight with icon accompaniment
- **Inputs**: Clean with focus states

### Layout
- **Container**: Max-width of 5xl, centered
- **Grid**: Responsive 2-column layout (collapses to 1 column on mobile)
- **Spacing**: Consistent 6-8 unit gaps
- **Card**: Rounded corners with shadow-xl

## User Interactions

### Save Changes Button
- **Style**: Primary blue gradient button
- **Action**: Logs form data to console and shows success toast
- **Future**: Will connect to backend API

### Reset Form Button
- **Style**: Secondary outlined button
- **Action**: Clears all form fields and shows info toast

## Navigation

### How to Access
1. Login as a student
2. Click on the user profile dropdown in the header
3. Select "My Profile" option
4. Page will navigate to the Student Profile

### Integration Points
- **App.tsx**: Route added for `student-profile` page
- **Header.tsx**: Added `onNavigateToProfile` prop and "My Profile" menu item
- **User Role**: Only accessible when logged in as a student

## State Management

### Component State
```typescript
interface StudentProfileData {
  fullName: string;
  dateOfBirth: string;
  rollNumber: string;
  enrollmentNumber: string;
  attendance: string;
  designation: string;
  linkedIn: string;
  github: string;
  fatherName: string;
  motherName: string;
  email: string;
  phone: string;
  achievements: string;
}
```

### Default Values
Pre-populated with sample data for "Priya Sharma" - can be replaced with actual user data from backend.

## Responsive Design

### Breakpoints
- **Mobile (< 768px)**: Single column layout, stacked buttons
- **Tablet/Desktop (≥ 768px)**: Two-column grid, side-by-side buttons

### Mobile Optimizations
- Touch-friendly input sizes
- Proper spacing for mobile keyboards
- Stacked button layout
- Responsive padding and margins

## Future Enhancements

### Planned Features
1. **Backend Integration**: Connect to student API endpoints
2. **Image Upload**: Add profile photo upload functionality
3. **Validation**: Add comprehensive form validation
4. **Auto-save**: Implement auto-save on field blur
5. **Edit History**: Show last modified timestamp
6. **PDF Export**: Export profile as PDF
7. **Privacy Settings**: Control what information is visible
8. **Additional Fields**: 
   - Department
   - Semester/Year
   - CGPA
   - Blood Group
   - Address
   - Emergency Contact

### Backend API Requirements
```typescript
// GET /api/student/profile/:id
// Response: StudentProfileData

// PUT /api/student/profile/:id
// Body: StudentProfileData
// Response: { success: boolean, message: string }
```

## Dependencies

### UI Components
- `Card`, `CardContent`, `CardHeader`, `CardTitle`, `CardDescription` from `ui/card`
- `Button` from `ui/button`
- `Input` from `ui/input`
- `Label` from `ui/label`
- `Textarea` from `ui/textarea`
- `toast` from `sonner`

### Icons (lucide-react)
- User
- Calendar
- Hash
- Award
- Mail
- Phone
- Users
- Linkedin
- Github
- BookOpen

## Usage Example

```tsx
// In App.tsx
import { StudentProfile } from "./components/student/StudentProfile";

// Add route handling
if (currentPage === "student-profile" && userRole === "student") {
  return (
    <PageTransition>
      <StudentProfile />
    </PageTransition>
  );
}
```

## Styling Guidelines

### Consistency with Dashboard Theme
- Uses same blue color scheme as header
- Matches card styles from other dashboard components
- Consistent icon usage and placement
- Professional, institutional appearance

### Accessibility
- All form fields have proper labels
- Color contrast meets WCAG standards
- Keyboard navigation support
- Screen reader friendly

## Testing Checklist

- [ ] Form loads with default values
- [ ] All input fields are editable
- [ ] Save button logs data to console
- [ ] Reset button clears all fields
- [ ] Toast notifications appear correctly
- [ ] Responsive layout works on mobile
- [ ] Navigation from header works
- [ ] Only accessible to student role
- [ ] Form validation (when implemented)
- [ ] Backend integration (when implemented)

## Support

For issues or questions regarding the Student Profile page:
- Check console logs for data output
- Verify user is logged in as student
- Ensure all UI components are properly imported
- Check routing configuration in App.tsx
