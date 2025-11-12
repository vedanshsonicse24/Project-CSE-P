# Login API - Quick Reference

## 🚀 Endpoint
```
POST http://localhost/cse_portal_backend/api/loginpage.php
```

## 📥 Request
```json
{
  "username": "amit.verma@student.ssipmt.edu",
  "password": "test123",
  "role": "student"
}
```

## 📤 Response
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "student1",
      "username": "amit.verma@student.ssipmt.edu",
      "role": "Student",
      "full_name": "Amit Verma",
      "profile": {...}
    },
    "token": "auth_token_here"
  }
}
```

## 💻 Frontend Usage
```typescript
const response = await fetch(API_ENDPOINTS.login, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: email,
    password: password,
    role: currentRole.id
  })
});

const result = await response.json();

if (result.status === 'success') {
  localStorage.setItem('authToken', result.data.token);
  localStorage.setItem('userRole', result.data.user.role);
  // ... redirect to dashboard
}
```

## 🧪 Test Credentials
| Role | Email | Password |
|------|-------|----------|
| Student | amit.verma@student.ssipmt.edu | any |
| Faculty | rajesh.kumar@ssipmt.edu | any |
| Faculty | priya.sharma@ssipmt.edu | any |

## 🔐 Stored Session Data
```javascript
authToken       // Authentication token
userRole        // student|faculty|hod|admin
userId          // User ID from database
username        // User email
fullName        // User's full name
userProfile     // JSON profile data
```

## ✅ Status
- Backend: ✅ Deployed & Working
- Frontend: ✅ Integrated
- Tests: ✅ Passed
- Docs: ✅ Complete

## 📁 Files
- Backend: `api/loginpage.php`
- Frontend: `src/components/LoginPage.tsx`
- Config: `src/server.tsx`

## ⚠️ Security Note
Password verification currently disabled for demo.
Enable in production by uncommenting password_verify() check.
