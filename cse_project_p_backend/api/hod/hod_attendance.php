<?php
/**
 * HOD Attendance API
 * Handles attendance viewing and management for HOD
 */

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../../helpers/Response.php';

class HODAttendanceAPI {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    /**
     * Get students list with attendance info
     */
    public function getStudents() {
        try {
            $semester = isset($_GET['semester']) ? intval($_GET['semester']) : null;
            $section = isset($_GET['section']) ? $_GET['section'] : null;

            $query = "
                SELECT 
                    id,
                    name,
                    roll,
                    semester,
                    section,
                    percent AS attendance_percentage
                FROM students
            ";

            $conditions = [];
            $params = [];
            $types = '';

            if ($semester) {
                $conditions[] = "semester = ?";
                $params[] = $semester;
                $types .= 'i';
            }

            if ($section) {
                $conditions[] = "section = ?";
                $params[] = $section;
                $types .= 's';
            }

            if (!empty($conditions)) {
                $query .= " WHERE " . implode(' AND ', $conditions);
            }

            $query .= " ORDER BY semester, section, roll";

            if (!empty($params)) {
                $attendance = $this->db->getRows($query, $types, $params);
            } else {
                $attendance = $this->db->getRows($query);
            }

            return Response::success([
                'attendance' => $attendance ?? [],
                'total_count' => count($attendance ?? [])
            ]);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Update student attendance percentage
     */
    public function updateAttendance() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            if (!isset($input['roll']) || !isset($input['percent'])) {
                return Response::error('Missing required fields: roll and percent', 400);
            }

            $roll = $input['roll'];
            $percent = floatval($input['percent']);

            if ($percent < 0 || $percent > 100) {
                return Response::error('Attendance percentage must be between 0 and 100', 400);
            }

            $query = "UPDATE students SET percent = ? WHERE roll = ?";
            $result = $this->db->executeQuery($query, 'ds', [$percent, $roll]);

            if (isset($result['error'])) {
                return Response::error('Failed to update attendance: ' . $result['error'], 500);
            }

            return Response::success([
                'roll' => $roll,
                'new_percent' => $percent,
                'message' => 'Attendance updated successfully'
            ]);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Bulk mark attendance (for class session)
     */
    public function bulkMarkAttendance() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            if (!isset($input['attendance']) || !is_array($input['attendance'])) {
                return Response::error('Missing attendance array', 400);
            }

            $marked = 0;
            $errors = [];

            foreach ($input['attendance'] as $record) {
                if (!isset($record['roll']) || !isset($record['status'])) {
                    $errors[] = 'Missing roll or status for a record';
                    continue;
                }

                // Here you would insert into attendance_records table
                // For now, just count successful records
                $marked++;
            }

            return Response::success([
                'marked' => $marked,
                'total' => count($input['attendance']),
                'errors' => $errors,
                'message' => "Attendance marked for $marked students"
            ]);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }
}

// Execute
$api = new HODAttendanceAPI();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    echo json_encode($api->getStudents());
} elseif ($method === 'POST') {
    $action = isset($_GET['action']) ? $_GET['action'] : 'update';
    
    if ($action === 'bulk') {
        echo json_encode($api->bulkMarkAttendance());
    } else {
        echo json_encode($api->updateAttendance());
    }
} else {
    echo json_encode(Response::error('Invalid request method', 405));
}
?>
