<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../helpers/Response.php';

class StudentRegistrationAPI {
    private $db;

    public function __construct() {
        $this->db = new Database();
        $this->db->connect();
    }

    public function register() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            // Validate required fields
            $required = ["name", "roll", "enrollment_number", "email", "password", "contact_number", "semester", "section", "date_of_birth", "address", "father_name", "father_contact", "father_occupation", "mother_name", "mother_contact", "mother_occupation", "gender"];
            
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    $response = Response::error("$field is required", 400);
                    echo json_encode($response);
                    return;
                }
            }

            // Check if student already exists
            $checkSql = "SELECT id FROM students WHERE roll = ? OR enrollment_number = ? OR email = ?";
            $existing = $this->db->getRow($checkSql, '', [$data["roll"], $data["enrollment_number"], $data["email"]]);
            
            if ($existing && !isset($existing['error'])) {
                $response = Response::error("Student with this roll number, enrollment number, or email already exists", 409);
                echo json_encode($response);
                return;
            }

            // Generate unique student ID
            $studentId = 'STU' . str_pad(rand(1, 99999), 5, '0', STR_PAD_LEFT);
            
            // Hash password
            $passwordHash = password_hash($data["password"], PASSWORD_BCRYPT);

            // Start transaction
            $this->db->beginTransaction();

            try {
                // 1. Create user account
                $userSql = "INSERT INTO users (id, email, password_hash, role, full_name, is_active) 
                           VALUES (?, ?, ?, 'student', ?, 1)";
                $this->db->query($userSql, '', [$studentId, $data["email"], $passwordHash, $data["name"]]);

                // 2. Create student record
                $studentSql = "INSERT INTO students 
                    (id, user_id, name, roll, enrollment_number, semester, section, date_of_birth, email, 
                     contact_number, address, linkedin, github, designation, average_cgpa, research_papers, 
                     projects_made, father_name, father_contact, father_occupation, mother_name, mother_contact, 
                     mother_occupation, mentor_id, percent) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Student', 0.00, 0, 0, ?, ?, ?, ?, ?, ?, NULL, 0.00)";

                $params = [
                    $studentId,
                    $studentId,
                    $data["name"],
                    $data["roll"],
                    $data["enrollment_number"],
                    $data["semester"],
                    $data["section"],
                    $data["date_of_birth"],
                    $data["email"],
                    $data["contact_number"],
                    $data["address"],
                    $data["linkedin"] ?? null,
                    $data["github"] ?? null,
                    $data["father_name"],
                    $data["father_contact"],
                    $data["father_occupation"],
                    $data["mother_name"],
                    $data["mother_contact"],
                    $data["mother_occupation"]
                ];

                $this->db->query($studentSql, '', $params);

                // Commit transaction
                $this->db->commit();

                $studentData = [
                    "student_id" => $studentId,
                    "name" => $data["name"],
                    "roll" => $data["roll"],
                    "email" => $data["email"]
                ];
                
                $response = Response::success($studentData, "Student registered successfully");
                echo json_encode($response);

            } catch (Exception $e) {
                $this->db->rollback();
                throw $e;
            }

        } catch (Exception $e) {
            $response = Response::error("Registration failed: " . $e->getMessage(), 500);
            echo json_encode($response);
        }
    }
}

// Handle the request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $api = new StudentRegistrationAPI();
    $api->register();
} else {
    $response = Response::error("Method not allowed", 405);
    echo json_encode($response);
}
?>
