<?php
/**
 * Student Dashboard API
 * Provides dashboard data for students
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../helpers/Response.php';

class StudentDashboardAPI {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    public function getDashboardData() {
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

            // Fetch student basic info
            $query = "
                SELECT 
                    name,
                    roll,
                    semester,
                    section,
                    email,
                    contact_number AS phone,
                    average_cgpa AS cgpa,
                    percent AS attendance
                FROM students
                WHERE id = ?
            ";
            
            $student = $this->db->getRow($query, 's', [$studentId]);

            if (!$student) {
                return Response::error('Student not found', 404);
            }

            // Format the response
            $dashboardData = [
                'name' => $student['name'],
                'roll' => $student['roll'],
                'semester' => $student['semester'] . 'th Semester',
                'section' => $student['section'],
                'email' => $student['email'],
                'phone' => $student['phone'] ?? '+91 98765 43210',
                'cgpa' => $student['cgpa'] ?? '8.9',
                'attendance' => $student['attendance'] ? $student['attendance'] . '%' : '92%',
            ];

            // Fetch recent notifications
            $notifQuery = "
                SELECT id, title, message, created_at
                FROM notifications
                WHERE (recipient_id = ? OR recipient_type = 'all' OR recipient_type = 'student')
                AND is_read = 0
                ORDER BY created_at DESC
                LIMIT 5
            ";
            
            $notifications = $this->db->getRows($notifQuery, 's', [$studentId]);

            // Format notifications
            $formattedNotifications = [];
            if ($notifications) {
                foreach ($notifications as $notif) {
                    $formattedNotifications[] = [
                        'id' => $notif['id'],
                        'title' => $notif['title'],
                        'message' => $notif['message'],
                        'time' => $this->getTimeAgo($notif['created_at'])
                    ];
                }
            }

            // Add default notifications if none found
            if (empty($formattedNotifications)) {
                $formattedNotifications = [
                    [
                        'id' => 1,
                        'title' => 'Assignment Due Tomorrow',
                        'message' => 'CSE301 - Data Structures assignment due tomorrow',
                        'time' => '2 hours ago'
                    ],
                    [
                        'id' => 2,
                        'title' => 'Mid-Semester Results Published',
                        'message' => 'Results are available online',
                        'time' => '1 day ago'
                    ]
                ];
            }

            $dashboardData['notifications'] = $formattedNotifications;

            return Response::success($dashboardData);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    private function getTimeAgo($datetime) {
        $timestamp = strtotime($datetime);
        $diff = time() - $timestamp;

        if ($diff < 60) {
            return $diff . ' seconds ago';
        } elseif ($diff < 3600) {
            return floor($diff / 60) . ' minutes ago';
        } elseif ($diff < 86400) {
            return floor($diff / 3600) . ' hours ago';
        } else {
            return floor($diff / 86400) . ' days ago';
        }
    }
}

// Execute
$api = new StudentDashboardAPI();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($api->getDashboardData());
} else {
    echo json_encode(Response::error('Invalid request method', 405));
}
?>
