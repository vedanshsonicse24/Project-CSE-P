<?php
/**
 * Student Profile Modern API
 * Handles student profile viewing and updating
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../helpers/Response.php';

class StudentProfileModernAPI {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    public function getProfile() {
        try {
            // Get student ID from query parameter or Authorization header
            $studentId = null;
            
            // Check Authorization header for student_id
            $headers = getallheaders();
            if (isset($headers['Authorization'])) {
                $authHeader = $headers['Authorization'];
                // Extract student_id from Bearer token format: "Bearer student_id"
                if (preg_match('/Bearer\s+(\S+)/', $authHeader, $matches)) {
                    $studentId = $matches[1];
                }
            }
            
            // Fallback to query parameter
            if (!$studentId && isset($_GET['student_id'])) {
                $studentId = $_GET['student_id'];
            }
            
            if (!$studentId) {
                return Response::error('Student ID is required. Please login again.', 401);
            }

            $query = "
                SELECT 
                    name AS fullName,
                    date_of_birth AS dateOfBirth,
                    roll AS rollNumber,
                    enrollment_number AS enrollmentNumber,
                    semester,
                    section,
                    percent AS attendance,
                    designation,
                    linkedin AS linkedIn,
                    github,
                    father_name AS fatherName,
                    father_contact AS fatherPhone,
                    mother_name AS motherName,
                    mother_contact AS motherPhone,
                    email,
                    contact_number AS phone
                FROM students
                WHERE id = ?
            ";
            
            $profile = $this->db->getRow($query, 's', [$studentId]);

            if (!$profile) {
                return Response::error('Student not found', 404);
            }

            // Convert attendance to number if exists
            if (isset($profile['attendance'])) {
                $profile['attendance'] = floatval($profile['attendance']);
            }

            return Response::success($profile);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    public function updateProfile() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            if (!$input) {
                return Response::error('Invalid JSON input', 400);
            }

            // Get student ID from query parameter or Authorization header
            $studentId = null;
            
            // Check Authorization header for student_id
            $headers = getallheaders();
            if (isset($headers['Authorization'])) {
                $authHeader = $headers['Authorization'];
                // Extract student_id from Bearer token format: "Bearer student_id"
                if (preg_match('/Bearer\s+(\S+)/', $authHeader, $matches)) {
                    $studentId = $matches[1];
                }
            }
            
            // Fallback to query parameter
            if (!$studentId && isset($_GET['student_id'])) {
                $studentId = $_GET['student_id'];
            }
            
            if (!$studentId) {
                return Response::error('Student ID is required. Please login again.', 401);
            }

            // Validate required fields
            $requiredFields = ['fullName', 'dateOfBirth', 'rollNumber', 'enrollmentNumber', 'email', 'phone'];
            foreach ($requiredFields as $field) {
                if (empty($input[$field])) {
                    return Response::error("Missing required field: $field", 400);
                }
            }

            // Update student profile
            $query = "
                UPDATE students SET
                    name = ?,
                    date_of_birth = ?,
                    roll = ?,
                    enrollment_number = ?,
                    semester = ?,
                    section = ?,
                    designation = ?,
                    linkedin = ?,
                    github = ?,
                    father_name = ?,
                    father_contact = ?,
                    mother_name = ?,
                    mother_contact = ?,
                    email = ?,
                    contact_number = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            ";

            $params = [
                $input['fullName'],
                $input['dateOfBirth'],
                $input['rollNumber'],
                $input['enrollmentNumber'],
                $input['semester'] ?? NULL,
                $input['section'] ?? NULL,
                $input['designation'] ?? NULL,
                $input['linkedIn'] ?? NULL,
                $input['github'] ?? NULL,
                $input['fatherName'] ?? NULL,
                $input['fatherPhone'] ?? NULL,
                $input['motherName'] ?? NULL,
                $input['motherPhone'] ?? NULL,
                $input['email'],
                $input['phone'],
                $studentId
            ];

            $types = 'ssssssssssssssss';

            $result = $this->db->executeQuery($query, $types, $params);

            if (isset($result['error'])) {
                return Response::error('Failed to update profile: ' . $result['error'], 500);
            }

            return Response::success([
                'message' => 'Profile updated successfully',
                'student_id' => $studentId
            ]);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }
}

// Execute
$api = new StudentProfileModernAPI();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    echo json_encode($api->getProfile());
} elseif ($method === 'POST') {
    echo json_encode($api->updateProfile());
} else {
    echo json_encode(Response::error('Invalid request method', 405));
}
?>
