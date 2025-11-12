<?php
/**
 * Subjects API for Timetable Module
 * Manage subjects used in timetable
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../helpers/Response.php';

class SubjectsAPI {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    /**
     * Get subjects
     * GET /api/timetable/subjects.php?semester=3&type=theory
     */
    public function getSubjects() {
        try {
            $semester = isset($_GET['semester']) ? $_GET['semester'] : null;
            $type = isset($_GET['type']) ? $_GET['type'] : null;

            $query = "SELECT s.*, f.full_name as faculty_name, f.designation as faculty_designation
                      FROM subjects s
                      LEFT JOIN faculty f ON s.faculty_id = f.id
                      WHERE 1=1";

            $params = [];
            $types = '';

            if ($semester !== null) {
                $query .= " AND s.semester = ?";
                $params[] = $semester;
                $types .= 'i';
            }

            if ($type !== null) {
                $query .= " AND s.type = ?";
                $params[] = $type;
                $types .= 's';
            }

            $query .= " ORDER BY s.name ASC";

            if (!empty($params)) {
                $subjects = $this->db->getRows($query, $types, $params);
            } else {
                $subjects = $this->db->getRows($query, '', []);
            }

            if (isset($subjects['error'])) {
                return Response::error($subjects['error'], 500);
            }

            return Response::success($subjects);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Create subject
     * POST /api/timetable/subjects.php
     */
    public function createSubject() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate required fields
            $required = ['code', 'name', 'type'];
            foreach ($required as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    return Response::error("Missing required field: $field", 400);
                }
            }

            // Check if subject code already exists
            $check = $this->db->getRow("SELECT code FROM subjects WHERE code = ?", 's', [$data['code']]);
            if ($check) {
                return Response::error("Subject code already exists", 400);
            }

            $query = "INSERT INTO subjects (code, name, faculty_id, type, semester, credits)
                      VALUES (?, ?, ?, ?, ?, ?)";

            $result = $this->db->execute(
                $query,
                'ssssii',
                [
                    $data['code'],
                    $data['name'],
                    $data['faculty_id'] ?? null,
                    $data['type'],
                    $data['semester'] ?? null,
                    $data['credits'] ?? null
                ]
            );

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success(['message' => 'Subject created successfully', 'code' => $data['code']]);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Update subject
     * PUT /api/timetable/subjects.php
     */
    public function updateSubject() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            if (!isset($data['code'])) {
                return Response::error('Subject code is required', 400);
            }

            $updates = [];
            $params = [];
            $types = '';

            $allowedFields = ['name', 'faculty_id', 'type', 'semester', 'credits'];

            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $updates[] = "$field = ?";
                    $params[] = $data[$field];
                    $types .= ($field === 'semester' || $field === 'credits') ? 'i' : 's';
                }
            }

            if (empty($updates)) {
                return Response::error('No fields to update', 400);
            }

            $params[] = $data['code'];
            $types .= 's';

            $query = "UPDATE subjects SET " . implode(', ', $updates) . " WHERE code = ?";

            $result = $this->db->execute($query, $types, $params);

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success(['message' => 'Subject updated successfully']);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Delete subject
     * DELETE /api/timetable/subjects.php?code=CS301
     */
    public function deleteSubject() {
        try {
            $code = isset($_GET['code']) ? $_GET['code'] : null;

            if (!$code) {
                return Response::error('Subject code is required', 400);
            }

            $query = "DELETE FROM subjects WHERE code = ?";
            $result = $this->db->execute($query, 's', [$code]);

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success(['message' => 'Subject deleted successfully']);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Route requests
     */
    public function route() {
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case 'GET':
                return $this->getSubjects();
            case 'POST':
                return $this->createSubject();
            case 'PUT':
                return $this->updateSubject();
            case 'DELETE':
                return $this->deleteSubject();
            default:
                return Response::error('Method not allowed', 405);
        }
    }
}

// Execute
$api = new SubjectsAPI();
echo json_encode($api->route());
?>
