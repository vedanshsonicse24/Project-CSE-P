# Valid Login Credentials

## How to Use
Enter these credentials in the login form at `localhost:3000/login`

## Student Portal
- **Email**: `amit.verma@student.ssipmt.edu`
- **Password**: `password123`
- **Role**: Select "Student Portal"

### Additional Student Account (Newly Registered):
- **Email**: `test.student@ssipmt.edu`
- **Password**: `Test@1234`
- **Roll**: CS24999
- **Role**: Select "Student Portal"

## Faculty Portal
- **Email**: `priyasingh02@ssipmt.com`
- **Password**: `password123`
- **Role**: Select "Faculty Portal"
- **Department**: Computer Science Engineering
- **Designation**: Assistant Professor

### Alternative Faculty Account:
- **Email**: `dr.sharma@ssipmt.edu`
- **Password**: `password123`
- **Role**: Select "Faculty Portal"
- *Note: This account may not exist - use the one above*

## HOD Portal
- **Email**: `ssws@ssipmt.com`
- **Password**: `password123`
- **Role**: Select "HOD Portal"
- **Name**: Dr. S.S. Wadhwa
- **Department**: Computer Science Engineering
- **Designation**: Head of Department

### Alternative HOD Account:
- **Email**: `hod.cse@ssipmt.edu`
- **Password**: `password123`
- **Role**: Select "HOD Portal"
- *Note: This account may not exist in your database - use the one above*

## Admin Portal
- **Email**: `admin@ssipmt.edu`
- **Password**: `password123`
- **Role**: Select "Admin Portal"
- *Note: This account may not exist in your database*

---

## What Happened?
The email `hdbdb@ssipmt.com` you were trying doesn't exist in the database. The backend correctly returned a 401 error meaning "Invalid credentials".

## Note
The password verification is currently disabled in `loginpage.php` for demo purposes, but the user must exist in the database with the correct role.
