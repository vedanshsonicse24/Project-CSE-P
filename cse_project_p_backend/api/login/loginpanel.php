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

class LoginPanelAPI {
    private $db;

    public function __construct() {
        $this->db = new Database();
        $this->db->connect();
    }

    public function login() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!$data || empty($data["username"]) || empty($data["password"]) || empty($data["role"])) {
                $response = Response::error("Missing credentials", 400);
                echo json_encode($response);
                return;
            }

            $username = trim($data["username"]);
            $password = $data["password"];
            $role = strtolower(trim($data["role"]));

            // Query users table
            $sql = "SELECT u.id, u.email, u.password_hash, u.role, u.full_name, u.is_active 
                    FROM users u 
                    WHERE (u.email = ? OR u.id = ?) 
                    AND u.role = ? 
                    AND u.is_active = 1";

            $user = $this->db->getRow($sql, '', [$username, $username, $role]);

            if (!$user || isset($user['error'])) {
                $response = Response::error("Invalid username or password", 401);
                echo json_encode($response);
                return;
            }

            // For demo: accepting any password
            // In production, use: password_verify($password, $user['password_hash'])

            // Update last login
            $updateSql = "UPDATE users SET last_login = NOW() WHERE id = ?";
            $this->db->executeQuery($updateSql, '', [$user['id']]);

            // Get profile data
            $profileData = $this->getProfileData($user['id'], $role);

            // Generate token
            $token = base64_encode($user['email'] . ":" . time() . ":" . $role);

            $response = Response::success([
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['email'],
                    'role' => ucfirst($user['role']),
                    'full_name' => $user['full_name'],
                    'profile' => $profileData
                ],
                'token' => $token
            ], 'Login successful');

            echo json_encode($response);
        } catch (Exception $e) {
            $response = Response::error($e->getMessage(), 500);
            echo json_encode($response);
        }
    }

    private function getProfileData($userId, $role) {
        try {
            if ($role === 'student') {
                $sql = "SELECT name, roll, enrollment_number, semester, section, average_cgpa 
                        FROM students WHERE user_id = ?";
                return $this->db->getRow($sql, '', [$userId]) ?: [];
            } elseif ($role === 'faculty' || $role === 'hod') {
                $sql = "SELECT full_name, designation, department, specialization 
                        FROM faculty WHERE user_id = ?";
                return $this->db->getRow($sql, '', [$userId]) ?: [];
            }
            return [];
        } catch (Exception $e) {
            return [];
        }
    }
}

$api = new LoginPanelAPI();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $api->login();
} else {
    $response = Response::error('Method not allowed', 405);
    echo json_encode($response);
}
?>
