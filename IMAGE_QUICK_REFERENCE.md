# 🚀 ImageWithFallback - Quick Reference Card

## 📦 Component Props

```typescript
interface ImageWithFallbackProps {
  // Static mode (original behavior)
  src?: string
  
  // Dynamic database mode (NEW)
  facultyId?: string        // Fetch faculty image by ID
  studentId?: string        // Fetch student image by ID
  type?: 'faculty' | 'student'  // Generic type with localStorage
  
  // UI options
  showLoader?: boolean      // Show spinner while loading
  
  // Standard img attributes
  alt?: string
  className?: string
  style?: React.CSSProperties
  ...rest: HTMLImageElement attributes
}
```

---

## 🎯 Usage Patterns

### Pattern 1: Static Image
```tsx
<ImageWithFallback 
  src="https://example.com/image.jpg" 
  alt="Profile"
/>
```

### Pattern 2: Faculty Image
```tsx
<ImageWithFallback 
  facultyId="FAC001" 
  showLoader={true}
/>
```

### Pattern 3: Student Image
```tsx
<ImageWithFallback 
  studentId="STU001" 
  showLoader={true}
/>
```

### Pattern 4: Type-based (uses localStorage)
```tsx
<ImageWithFallback 
  type="faculty"  // Reads localStorage.getItem('facultyId')
  showLoader={true}
/>
```

---

## 🔌 API Endpoints

```javascript
// Faculty image
GET /api/figma/imagewithfallback.php?type=faculty&id=FAC001

// Student image
GET /api/figma/imagewithfallback.php?type=student&id=STU001

// Validate external URL
GET /api/figma/imagewithfallback.php?action=validate&url=https://...

// Using API_ENDPOINTS
import { API_ENDPOINTS } from '../../server'
const url = API_ENDPOINTS.image.faculty('FAC001')
```

---

## 📊 Response Format

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

---

## 🗄️ Database Structure

### Query Used
```sql
SELECT id, full_name, profile_picture 
FROM users 
WHERE id = (SELECT user_id FROM faculty WHERE id = ?)
```

### profile_picture Formats
1. **File path**: `FAC001.jpg` → `http://localhost/.../uploads/faculty/FAC001.jpg`
2. **Base64**: `data:image/jpeg;base64,/9j/4AAQ...`
3. **NULL**: Returns fallback SVG

---

## ✅ Component Behavior

| Scenario | Behavior |
|----------|----------|
| Valid image URL | Shows image |
| Image not found | Shows fallback SVG |
| Network error | Shows fallback SVG |
| Loading (showLoader=true) | Shows animated spinner |
| No props provided | Shows fallback SVG |

---

## 🧪 Testing

### Browser Test
```bash
# Open in browser
d:\Project-CSE-P\image-api-tester.html
```

### Postman Test
```
GET http://localhost/cse_portal_backend/api/figma/imagewithfallback.php?type=faculty&id=FAC001
```

### React Test Page
```tsx
import ImageTestPage from './components/pages/ImageTestPage'
// Visit /image-test route
```

---

## 🔧 Common Use Cases

### Faculty Profile Card
```tsx
<div className="profile-card">
  <ImageWithFallback 
    facultyId={facultyId}
    alt="Faculty Profile"
    className="w-32 h-32 rounded-full"
    showLoader={true}
  />
  <h2>{facultyName}</h2>
</div>
```

### Faculty List
```tsx
{faculty.map(member => (
  <ImageWithFallback 
    key={member.id}
    facultyId={member.id}
    className="w-20 h-20 rounded-full"
  />
))}
```

### Student Attendance
```tsx
<ImageWithFallback 
  studentId={student.id}
  className="w-16 h-16 rounded-full"
  showLoader={true}
/>
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS Error | Check XAMPP is running |
| 404 Not Found | Verify file deployed to XAMPP |
| Always fallback | Check database has profile_picture data |
| Infinite spinner | Check network tab for errors |

---

## 📁 Files

### Backend
- `cse_project_p_backend/api/figma/imagewithfallback.php`
- Deployed: `D:\new_xammp\htdocs\cse_portal_backend\api\figma\`

### Frontend
- `src/components/figma/ImageWithFallback.tsx`
- `src/server.tsx` (API_ENDPOINTS.image)

### Documentation
- `IMAGE_WITH_FALLBACK_INTEGRATION.md` (Full guide)
- `IMAGE_INTEGRATION_SUMMARY.md` (Summary)
- `image-api-tester.html` (Test tool)

### Example
- `src/components/pages/ImageTestPage.tsx`

---

## 🎨 Styling Examples

### Circular Avatar
```tsx
<ImageWithFallback 
  facultyId="FAC001"
  className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg object-cover"
/>
```

### Square Card Image
```tsx
<ImageWithFallback 
  facultyId="FAC001"
  className="w-full h-48 rounded-lg object-cover"
/>
```

### Small Thumbnail
```tsx
<ImageWithFallback 
  studentId="STU001"
  className="w-12 h-12 rounded-full"
/>
```

---

## 🔐 Security Notes

- ✅ SQL injection protected (prepared statements)
- ✅ CORS configured for localhost
- ✅ URL validation for external images
- ✅ Error handling prevents data leaks
- ⚠️ Update CORS for production domain

---

## 📈 Performance Tips

1. **Cache images**: Store in localStorage
2. **Lazy load**: Use Intersection Observer
3. **Optimize uploads**: Compress before saving
4. **Use CDN**: For production deployment
5. **Preload critical images**: Use `<link rel="preload">`

---

## 🎯 Next Actions

1. ✅ Integration complete
2. ⏳ Test with XAMPP running
3. ⏳ Add sample profile pictures
4. ⏳ Update existing components
5. ⏳ Implement upload endpoint

---

**Status**: 🟢 Ready for Testing  
**Documentation**: ✅ Complete  
**Deployment**: ✅ Done  
**Examples**: ✅ Provided
