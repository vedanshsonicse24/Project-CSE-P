# ImageWithFallback Integration Guide

## Overview
The `ImageWithFallback` component now dynamically fetches profile images from the database via PHP backend API with graceful fallback handling.

---

## Backend API: `imagewithfallback.php`

### Location
- **Source**: `cse_project_p_backend/api/figma/imagewithfallback.php`
- **Deployed**: `D:\new_xammp\htdocs\cse_portal_backend\api\figma\imagewithfallback.php`

### Endpoints

#### 1. Get Faculty Profile Image
**Request**:
```http
GET /api/figma/imagewithfallback.php?type=faculty&id=FAC001
```

**Response** (Success with image):
```json
{
  "status": "success",
  "data": {
    "image_url": "http://localhost/cse_portal_backend/uploads/faculty/FAC001.jpg",
    "fallback": "data:image/svg+xml;base64,...",
    "name": "Dr. John Smith"
  }
}
```

**Response** (Success with base64 image):
```json
{
  "status": "success",
  "data": {
    "image_url": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "fallback": "data:image/svg+xml;base64,...",
    "name": "Dr. John Smith"
  }
}
```

**Response** (No image set):
```json
{
  "status": "success",
  "data": {
    "image_url": null,
    "fallback": "data:image/svg+xml;base64,...",
    "name": "Dr. John Smith",
    "message": "No profile picture set"
  }
}
```

**Response** (Faculty not found):
```json
{
  "status": "success",
  "data": {
    "image_url": null,
    "fallback": "data:image/svg+xml;base64,...",
    "message": "Faculty not found, using fallback"
  }
}
```

---

#### 2. Get Student Profile Image
**Request**:
```http
GET /api/figma/imagewithfallback.php?type=student&id=STU001
```

**Response** (Same format as faculty):
```json
{
  "status": "success",
  "data": {
    "image_url": "http://localhost/cse_portal_backend/uploads/students/STU001.jpg",
    "fallback": "data:image/svg+xml;base64,...",
    "name": "Jane Doe"
  }
}
```

---

#### 3. Validate External Image URL
**Request**:
```http
GET /api/figma/imagewithfallback.php?action=validate&url=https://example.com/image.jpg
```

**Response** (Valid image):
```json
{
  "status": "success",
  "data": {
    "valid": true,
    "is_image": true,
    "url": "https://example.com/image.jpg",
    "content_type": "Content-Type: image/jpeg"
  }
}
```

**Response** (Invalid/unreachable):
```json
{
  "status": "success",
  "data": {
    "valid": false,
    "fallback": "data:image/svg+xml;base64,...",
    "message": "Image not reachable"
  }
}
```

---

### Database Queries

The API queries the `users` table joined with `faculty` or `students`:

**Faculty Image Query**:
```sql
SELECT id, full_name, profile_picture 
FROM users 
WHERE id = (SELECT user_id FROM faculty WHERE id = ?)
```

**Student Image Query**:
```sql
SELECT id, full_name, profile_picture 
FROM users 
WHERE id = (SELECT user_id FROM students WHERE id = ?)
```

**Expected `profile_picture` formats**:
1. **Base64 Data URL**: `data:image/jpeg;base64,/9j/4AAQSkZJRg...`
2. **File Path**: `FAC001.jpg` (converted to `http://localhost/cse_portal_backend/uploads/faculty/FAC001.jpg`)
3. **NULL**: Returns fallback SVG

---

## Frontend Component: `ImageWithFallback.tsx`

### Location
`src/components/figma/ImageWithFallback.tsx`

### Props Interface

```typescript
interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Static image URL (original functionality)
  src?: string
  
  // Database-driven props (NEW)
  facultyId?: string       // Fetch from faculty table
  studentId?: string       // Fetch from student table
  type?: 'faculty' | 'student' // User type for generic fetching
  
  // Loading state (NEW)
  showLoader?: boolean     // Show spinner while fetching
  
  // Standard HTML img attributes
  alt?: string
  style?: React.CSSProperties
  className?: string
}
```

---

### Usage Examples

#### 1. Static Image URL (Original Behavior)
```tsx
<ImageWithFallback 
  src="https://example.com/profile.jpg" 
  alt="Profile" 
  className="w-24 h-24 rounded-full"
/>
```

#### 2. Fetch Faculty Image by ID
```tsx
<ImageWithFallback 
  facultyId="FAC001" 
  alt="Faculty Profile" 
  className="w-32 h-32 rounded-full object-cover"
  showLoader={true}
/>
```

#### 3. Fetch Student Image by ID
```tsx
<ImageWithFallback 
  studentId="STU001" 
  alt="Student Profile" 
  className="w-20 h-20 rounded-full"
  showLoader={true}
/>
```

#### 4. Generic Type-Based Fetch (with localStorage)
```tsx
// Component will read facultyId or studentId from localStorage
// Example: localStorage.getItem('facultyId') => 'FAC001'
<ImageWithFallback 
  type="faculty" 
  alt="My Profile" 
  className="w-16 h-16 rounded-full"
/>
```

#### 5. In Faculty Dashboard Context
```tsx
import { ImageWithFallback } from "../figma/ImageWithFallback";

function FacultyProfile() {
  const facultyId = localStorage.getItem('facultyId'); // 'FAC001'
  
  return (
    <div className="profile-header">
      <ImageWithFallback 
        facultyId={facultyId}
        alt="Profile Picture"
        className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
        showLoader={true}
      />
      <h2>Dr. John Smith</h2>
    </div>
  );
}
```

#### 6. In Faculty List (Multiple Images)
```tsx
function FacultyList({ faculty }: { faculty: Faculty[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {faculty.map((member) => (
        <div key={member.id} className="faculty-card">
          <ImageWithFallback 
            facultyId={member.id}
            alt={member.full_name}
            className="w-24 h-24 rounded-full mx-auto"
            showLoader={true}
          />
          <p>{member.full_name}</p>
        </div>
      ))}
    </div>
  );
}
```

---

### Component Behavior

#### Loading State
When `showLoader={true}` and fetching from API:
```tsx
// Shows animated spinner
<div className="inline-flex items-center justify-center bg-gray-100">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
</div>
```

#### Error/Fallback State
When image fails to load or `image_url` is `null`:
```tsx
// Shows default fallback SVG
<div className="inline-block bg-gray-100">
  <img src={fallbackSvg} alt="Error loading image" />
</div>
```

#### Success State
When image loads successfully:
```tsx
<img src={imageSrc} alt={alt} className={className} onError={handleError} />
```

---

## Integration Flow

### 1. Component Mount
```typescript
useEffect(() => {
  // Priority: static src > facultyId > studentId > type
  if (src) {
    setImageSrc(src); // Use static URL
    return;
  }
  
  if (facultyId) {
    fetchUrl = `${BaseURL}api/figma/imagewithfallback.php?type=faculty&id=${facultyId}`;
  } else if (studentId) {
    fetchUrl = `${BaseURL}api/figma/imagewithfallback.php?type=student&id=${studentId}`;
  } else if (type) {
    // Fallback to localStorage
    const storedId = localStorage.getItem(`${type}Id`);
    fetchUrl = `${BaseURL}api/figma/imagewithfallback.php?type=${type}&id=${storedId}`;
  }
  
  // Fetch and update state
}, [src, facultyId, studentId, type]);
```

### 2. Backend Processing
```php
// Route based on type
if ($type === 'faculty') {
  // Query faculty user
  $query = "SELECT id, full_name, profile_picture FROM users 
            WHERE id = (SELECT user_id FROM faculty WHERE id = ?)";
  $result = $db->getRow($query, 's', [$facultyId]);
  
  // Check profile_picture format
  if (strpos($result['profile_picture'], 'data:image') === 0) {
    return base64 data URL;
  } else {
    return 'http://localhost/cse_portal_backend/uploads/faculty/' . $result['profile_picture'];
  }
}
```

### 3. Frontend Update
```typescript
fetch(fetchUrl)
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success' && data.data.image_url) {
      setImageSrc(data.data.image_url); // Display image
    } else {
      setDidError(true); // Show fallback
    }
  })
  .catch(() => setDidError(true));
```

---

## Testing

### 1. Test with Postman

**Get Faculty Image**:
```http
GET http://localhost/cse_portal_backend/api/figma/imagewithfallback.php?type=faculty&id=FAC001
```

**Get Student Image**:
```http
GET http://localhost/cse_portal_backend/api/figma/imagewithfallback.php?type=student&id=STU001
```

**Validate External URL**:
```http
GET http://localhost/cse_portal_backend/api/figma/imagewithfallback.php?action=validate&url=https://via.placeholder.com/150
```

### 2. Test in React Component

**Test Page** (`src/components/pages/ImageTestPage.tsx`):
```tsx
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function ImageTestPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Image With Fallback Test</h1>
      
      {/* Static Image */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Static Image</h2>
        <ImageWithFallback 
          src="https://via.placeholder.com/150"
          alt="Static"
          className="w-32 h-32 rounded-lg"
        />
      </section>
      
      {/* Faculty Image */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Faculty Image (FAC001)</h2>
        <ImageWithFallback 
          facultyId="FAC001"
          alt="Faculty"
          className="w-32 h-32 rounded-full"
          showLoader={true}
        />
      </section>
      
      {/* Student Image */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Student Image (STU001)</h2>
        <ImageWithFallback 
          studentId="STU001"
          alt="Student"
          className="w-32 h-32 rounded-full"
          showLoader={true}
        />
      </section>
      
      {/* Broken Image (Fallback Test) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Fallback Test</h2>
        <ImageWithFallback 
          facultyId="INVALID_ID"
          alt="Fallback"
          className="w-32 h-32 rounded-full"
          showLoader={true}
        />
      </section>
    </div>
  );
}
```

### 3. Browser Console Verification

Open Developer Tools → Console:
```javascript
// Should see logs like:
// "Fetching image: http://localhost/cse_portal_backend/api/figma/imagewithfallback.php?type=faculty&id=FAC001"
// "Image loaded successfully"
// OR
// "Failed to fetch image: No profile picture set"
```

---

## Database Setup

### Ensure Profile Pictures Exist

**Option 1: Base64 Data URL**
```sql
UPDATE users 
SET profile_picture = 'data:image/jpeg;base64,/9j/4AAQSkZJRg...' 
WHERE id = (SELECT user_id FROM faculty WHERE id = 'FAC001');
```

**Option 2: File Path**
```sql
-- Store just the filename
UPDATE users 
SET profile_picture = 'FAC001.jpg' 
WHERE id = (SELECT user_id FROM faculty WHERE id = 'FAC001');

-- Ensure file exists at:
-- D:\new_xammp\htdocs\cse_portal_backend\uploads\faculty\FAC001.jpg
```

**Option 3: NULL (Will use fallback)**
```sql
UPDATE users 
SET profile_picture = NULL 
WHERE id = (SELECT user_id FROM faculty WHERE id = 'FAC001');
```

### Create Upload Directories
```powershell
# Create upload folders if they don't exist
New-Item -ItemType Directory -Path "D:\new_xammp\htdocs\cse_portal_backend\uploads\faculty" -Force
New-Item -ItemType Directory -Path "D:\new_xammp\htdocs\cse_portal_backend\uploads\students" -Force
```

---

## Error Handling

### Frontend Errors
1. **Network Error**: Caught by `.catch()`, sets `didError = true`, shows fallback
2. **Invalid Response**: `data.status !== 'success'`, shows fallback
3. **Image Load Error**: `onError` handler triggers, shows fallback
4. **No Image URL**: `!data.data.image_url`, shows fallback

### Backend Errors
1. **Missing ID**: Returns `Response::error('Faculty ID is required', 400)`
2. **Database Error**: Returns `Response::error('Database error: ...', 500)`
3. **Invalid Type**: Returns `Response::error('Invalid type. Use faculty or student', 400)`
4. **Exception**: Returns `Response::serverError($e->getMessage())`

---

## Deployment Checklist

- [x] Update `imagewithfallback.php` with database integration
- [x] Add CORS headers to PHP file
- [x] Include `Database.php` and `Response.php` helpers
- [x] Update `ImageWithFallback.tsx` with `useEffect` fetching
- [x] Add loading state with spinner
- [x] Deploy PHP file to XAMPP: `D:\new_xammp\htdocs\cse_portal_backend\api\figma\`
- [ ] Ensure upload directories exist
- [ ] Add sample profile pictures to database
- [ ] Test with XAMPP running
- [ ] Verify CORS works from React dev server (port 5173)

---

## Troubleshooting

### Issue: CORS Error
**Symptom**: "Access to fetch blocked by CORS policy"
**Solution**: Ensure PHP file has CORS headers at the top:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

### Issue: 404 Not Found
**Symptom**: `GET http://localhost/cse_portal_backend/api/figma/imagewithfallback.php 404`
**Solution**: 
1. Check XAMPP is running
2. Verify file exists at `D:\new_xammp\htdocs\cse_portal_backend\api\figma\imagewithfallback.php`
3. Check Apache virtual host configuration

### Issue: Database Connection Failed
**Symptom**: "Database error: Connection failed"
**Solution**:
1. Verify MySQL is running in XAMPP
2. Check `Database.php` credentials match your setup
3. Ensure `cse_portal_database` exists

### Issue: Image Not Loading (Always Fallback)
**Symptom**: Always shows fallback SVG even when `facultyId` is valid
**Solutions**:
1. **Check Database**: Verify `profile_picture` column has data
   ```sql
   SELECT u.id, u.full_name, u.profile_picture, f.id as faculty_id
   FROM users u
   JOIN faculty f ON f.user_id = u.id
   WHERE f.id = 'FAC001';
   ```
2. **Check API Response**: Use Postman to test endpoint directly
3. **Check Console**: Look for JavaScript errors in browser console
4. **Check Network Tab**: Verify request/response in DevTools Network tab

### Issue: Spinner Never Stops
**Symptom**: Loading spinner shows indefinitely
**Solution**: 
1. Check `finally()` block executes: `setLoading(false)` should run even on error
2. Verify network request completes (check Network tab)
3. Ensure `showLoader={true}` prop is intentional

---

## Advanced Use Cases

### 1. Upload New Profile Picture
```tsx
async function uploadProfilePicture(facultyId: string, file: File) {
  const formData = new FormData();
  formData.append('profile_picture', file);
  formData.append('faculty_id', facultyId);
  
  const response = await fetch(
    `${BaseURL}api/faculty/faculty.php?endpoint=updateProfile`,
    {
      method: 'POST',
      body: formData
    }
  );
  
  const data = await response.json();
  if (data.status === 'success') {
    // Re-fetch image component will auto-update
    window.location.reload();
  }
}
```

### 2. Cache Images in localStorage
```tsx
useEffect(() => {
  const cacheKey = `image_${facultyId || studentId}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    setImageSrc(cached);
    return;
  }
  
  // Fetch and cache
  fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
      if (data.data.image_url) {
        localStorage.setItem(cacheKey, data.data.image_url);
        setImageSrc(data.data.image_url);
      }
    });
}, [facultyId, studentId]);
```

### 3. Lazy Load Images
```tsx
import { useInView } from 'react-intersection-observer';

function LazyImage({ facultyId }: { facultyId: string }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  
  return (
    <div ref={ref}>
      {inView && (
        <ImageWithFallback 
          facultyId={facultyId}
          showLoader={true}
        />
      )}
    </div>
  );
}
```

---

## Next Steps

1. **Test Integration**: Start XAMPP and React dev server, verify images load
2. **Add Sample Data**: Insert profile pictures for existing faculty/students
3. **Update Related Components**: Use `ImageWithFallback` in:
   - `FacultyProfile.tsx`
   - `FacultyDetails.tsx`
   - `StudentProfile.tsx`
   - `AttendanceScheduleDemo.tsx` (student photos)
4. **Implement Upload**: Create image upload endpoint in `faculty.php`
5. **Optimize**: Add image caching and compression

---

## Summary

✅ **Backend**: Database-integrated API with fallback support  
✅ **Frontend**: Dynamic component with loading states  
✅ **Error Handling**: Graceful fallback on all error scenarios  
✅ **Deployment**: Files copied to XAMPP server  
✅ **Documentation**: Complete usage guide with examples  

**Status**: 🟢 Ready for Testing
