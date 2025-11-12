<?php
/**
 * Faculty API
 * Handles all faculty-related operations for FacultyDashboard, FacultyProfile, FacultyRegistration, FacultyDetails
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/Database.php';
require_once '../helpers/Response.php';

class FacultyAPI {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    /**
     * Get all faculty members
     * GET /api/faculty/list?department=CSE&designation=Professor
     * Corresponds to: FacultyDetails - faculty list display
     */
    public function getFacultyList() {
        try {
            $department = isset($_GET['department']) ? $_GET['department'] : null;
            $designation = isset($_GET['designation']) ? $_GET['designation'] : null;

            $query = "SELECT id, full_name, designation, department, email, phone, 
                             date_of_birth, gender, qualification, specialization, 
                             join_date, phd_status, office_location, office_hours, 
                             mentor_for, total_mentees, years_of_experience, research_interest 
                      FROM faculty WHERE 1=1";

            $params = [];
            $types = '';

            if ($department) {
                $query .= " AND department = ?";
                $params[] = $department;
                $types .= 's';
            }

            if ($designation) {
                $query .= " AND designation = ?";
                $params[] = $designation;
                $types .= 's';
            }

            $query .= " ORDER BY full_name ASC";

            if (!empty($params)) {
                $faculties = $this->db->getRows($query, $types, $params);
            } else {
                $faculties = $this->db->getRows($query, '', []);
            }

            if (isset($faculties['error'])) {
                return Response::error($faculties['error'], 500);
            }

            return Response::success($faculties);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get single faculty profile
     * GET /api/faculty/profile?id=FAC001
     * Corresponds to: FacultyProfile - display current faculty profile
     */
    public function getFacultyProfile() {
        try {
            $facultyId = isset($_GET['id']) ? $_GET['id'] : null;

            if (!$facultyId) {
                return Response::error('Faculty ID is required', 400);
            }

            $query = "SELECT id, user_id, full_name, designation, department, email, phone, 
                             date_of_birth, gender, qualification, specialization, join_date, 
                             phd_status, office_location, office_hours, mentor_for, total_mentees, 
                             years_of_experience, research_interest 
                      FROM faculty 
                      WHERE id = ?";

            $faculty = $this->db->getRow($query, 's', [$facultyId]);

            if (isset($faculty['error'])) {
                return Response::error($faculty['error'], 500);
            }

            if (!$faculty) {
                return Response::error('Faculty not found', 404);
            }

            return Response::success($faculty);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Update faculty profile
     * PUT /api/faculty/profile
     * Body: {
     *   "id": "FAC001",
     *   "office_location": "Room 305",
     *   "office_hours": "10:00-12:00",
     *   "research_interest": "AI and ML"
     * }
     * Corresponds to: FacultyProfile - handleSave function
     */
    public function updateFacultyProfile() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!$data) {
                return Response::error('Invalid JSON', 400);
            }

            if (!isset($data['id'])) {
                return Response::error('Faculty ID is required', 400);
            }

            // Build dynamic update query
            $updateFields = [];
            $params = [];
            $types = '';

            $allowedFields = ['office_location', 'office_hours', 'research_interest', 'mentor_for', 'total_mentees'];

            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $updateFields[] = "$field = ?";
                    $params[] = $data[$field];
                    $types .= 's';
                }
            }

            if (empty($updateFields)) {
                return Response::error('No fields to update', 400);
            }

            $updateFields[] = "updated_at = NOW()";
            $query = "UPDATE faculty SET " . implode(', ', $updateFields) . " WHERE id = ?";
            $params[] = $data['id'];
            $types .= 's';

            $result = $this->db->executeQuery($query, $types, $params);

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success(['message' => 'Profile updated successfully']);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Register new faculty
     * POST /api/faculty/register
     * Body: FacultyRegistrationData (all fields)
     * Corresponds to: FacultyRegistration - onRegister function
     */
    public function registerFaculty() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!$data) {
                return Response::error('Invalid JSON', 400);
            }

            $required = ['fullName', 'facultyId', 'email', 'phoneNumber', 'department', 'designation', 'joinDate'];
            foreach ($required as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    return Response::error("Missing field: $field", 400);
                }
            }

            // Check if faculty already exists
            $checkQuery = "SELECT id FROM faculty WHERE id = ? OR email = ?";
            $existing = $this->db->getRow($checkQuery, 'ss', [$data['facultyId'], $data['email']]);

            if ($existing && !isset($existing['error'])) {
                return Response::error('Faculty ID or email already exists', 409);
            }

            // Create user first
            $userId = 'USER_' . $data['facultyId'];
            $passwordHash = password_hash($data['password'] ?? 'default123', PASSWORD_BCRYPT);

            $userQuery = "INSERT INTO users (id, email, password_hash, role, full_name) 
                          VALUES (?, ?, ?, 'faculty', ?)";
            $userResult = $this->db->executeQuery($userQuery, 'ssss', 
                [$userId, $data['email'], $passwordHash, $data['fullName']]);

            if (isset($userResult['error'])) {
                return Response::error('User creation failed: ' . $userResult['error'], 500);
            }

            // Create faculty record
            $facultyQuery = "INSERT INTO faculty 
                             (id, user_id, full_name, designation, department, email, phone, 
                              date_of_birth, gender, qualification, specialization, join_date, 
                              phd_status, office_location, office_hours, mentor_for, total_mentees, 
                              years_of_experience, research_interest) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $params = [
                $data['facultyId'],
                $userId,
                $data['fullName'],
                $data['designation'],
                $data['department'],
                $data['email'],
                $data['phoneNumber'],
                $data['dateOfBirth'],
                $data['gender'],
                $data['qualification'],
                $data['specialization'],
                $data['joinDate'],
                $data['phdStatus'] ?? 'Not Applicable',
                $data['officeLocation'] ?? '',
                $data['officeHours'] ?? '',
                $data['mentorFor'] ?? '',
                $data['totalMentees'] ?? 0,
                $data['yearsOfExperience'] ?? 0,
                $data['researchInterest'] ?? ''
            ];

            $facultyResult = $this->db->executeQuery($facultyQuery, 'ssssssssssssssssis', $params);

            if (isset($facultyResult['error'])) {
                return Response::error('Faculty creation failed: ' . $facultyResult['error'], 500);
            }

            return Response::success(['id' => $data['facultyId'], 'message' => 'Faculty registered successfully'], '', 201);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get faculty dashboard stats
     * GET /api/faculty/stats?id=FAC001
     * Corresponds to: FacultyDashboard - stats cards display
     */
    public function getFacultyStats() {
        try {
            $facultyId = isset($_GET['id']) ? $_GET['id'] : null;

            if (!$facultyId) {
                return Response::error('Faculty ID is required', 400);
            }

            // Get faculty info
            $facultyQuery = "SELECT total_mentees, years_of_experience FROM faculty WHERE id = ?";
            $faculty = $this->db->getRow($facultyQuery, 's', [$facultyId]);

            if (isset($faculty['error']) || !$faculty) {
                return Response::error('Faculty not found', 404);
            }

            // Get classes count
            $classesQuery = "SELECT COUNT(*) as total FROM subjects WHERE faculty_id = ?";
            $classes = $this->db->getRow($classesQuery, 's', [$facultyId]);
            $classesCount = $classes['total'] ?? 0;

            // Get mentees (active)
            $menteesQuery = "SELECT COUNT(*) as total FROM students WHERE mentor_id = ?";
            $mentees = $this->db->getRow($menteesQuery, 's', [$facultyId]);
            $menteesCount = $mentees['total'] ?? 0;

            // Get average attendance
            $attendanceQuery = "SELECT AVG(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) * 100 as avg_attendance 
                                FROM attendance_records 
                                WHERE marked_by = ?";
            $attendance = $this->db->getRow($attendanceQuery, 's', [$facultyId]);
            $avgAttendance = $attendance['avg_attendance'] ? round($attendance['avg_attendance'], 2) : 0;

            $stats = [
                'totalClasses' => $classesCount,
                'totalMentees' => $menteesCount,
                'yearsOfExperience' => $faculty['years_of_experience'],
                'averageAttendance' => $avgAttendance
            ];

            return Response::success($stats);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get faculty's classes/subjects
     * GET /api/faculty/classes?id=FAC001
     * Corresponds to: FacultyDashboard - classes list
     */
    public function getFacultyClasses() {
        try {
            $facultyId = isset($_GET['id']) ? $_GET['id'] : null;

            if (!$facultyId) {
                return Response::error('Faculty ID is required', 400);
            }

            $query = "SELECT code, name, semester, type, credits FROM subjects WHERE faculty_id = ? ORDER BY code ASC";
            $classes = $this->db->getRows($query, 's', [$facultyId]);

            if (isset($classes['error'])) {
                return Response::error($classes['error'], 500);
            }

            return Response::success($classes);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get faculty's mentees
     * GET /api/faculty/mentees?id=FAC001
     * Corresponds to: FacultyDashboard - mentees list
     */
    public function getFacultyMentees() {
        try {
            $facultyId = isset($_GET['id']) ? $_GET['id'] : null;

            if (!$facultyId) {
                return Response::error('Faculty ID is required', 400);
            }

            $query = "SELECT id, name, roll, enrollment_number, email, contact_number, average_cgpa 
                      FROM students 
                      WHERE mentor_id = ? 
                      ORDER BY name ASC";

            $mentees = $this->db->getRows($query, 's', [$facultyId]);

            if (isset($mentees['error'])) {
                return Response::error($mentees['error'], 500);
            }

            return Response::success($mentees);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Delete faculty
     * DELETE /api/faculty/delete?id=FAC001
     * Corresponds to: FacultyDetails - delete function
     */
    public function deleteFaculty() {
        try {
            $facultyId = isset($_GET['id']) ? $_GET['id'] : null;

            if (!$facultyId) {
                return Response::error('Faculty ID is required', 400);
            }

            // Soft delete - mark as inactive
            $query = "UPDATE faculty SET is_active = 0 WHERE id = ?";
            $result = $this->db->executeQuery($query, 's', [$facultyId]);

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success(['message' => 'Faculty deleted successfully']);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Route requests to appropriate methods
     */
    public function route() {
        $endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : null;

        switch ($endpoint) {
            case 'list':
                return $this->getFacultyList();
            case 'profile':
                if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                    return $this->getFacultyProfile();
                } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
                    return $this->updateFacultyProfile();
                }
                break;
            case 'register':
                return $this->registerFaculty();
            case 'stats':
                return $this->getFacultyStats();
            case 'classes':
                return $this->getFacultyClasses();
            case 'mentees':
                return $this->getFacultyMentees();
            case 'delete':
                return $this->deleteFaculty();
            default:
                return Response::error('Invalid endpoint', 400);
        }
    }
}

// Execute
$api = new FacultyAPI();
echo json_encode($api->route());
?>
