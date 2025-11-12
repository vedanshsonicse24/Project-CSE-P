<?php
/**
 * Timetable API
 * Handles CRUD operations for timetable entries
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

class TimetableAPI {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    /**
     * Get timetable entries
     * GET /api/timetable/timetable.php?semester=3&section=D&day=Monday
     */
    public function getTimetable() {
        try {
            $semester = isset($_GET['semester']) ? $_GET['semester'] : null;
            $section = isset($_GET['section']) ? $_GET['section'] : null;
            $day = isset($_GET['day']) ? $_GET['day'] : null;
            $faculty_id = isset($_GET['faculty_id']) ? $_GET['faculty_id'] : null;

            $query = "SELECT t.*, s.name as subject_name, s.type as subject_type,
                             f.full_name as faculty_name, f.designation as faculty_designation
                      FROM timetable t
                      LEFT JOIN subjects s ON t.subject_code = s.code
                      LEFT JOIN faculty f ON t.faculty_id = f.id
                      WHERE 1=1";

            $params = [];
            $types = '';

            if ($semester !== null) {
                $query .= " AND t.semester = ?";
                $params[] = $semester;
                $types .= 'i';
            }

            if ($section !== null) {
                $query .= " AND t.section = ?";
                $params[] = $section;
                $types .= 's';
            }

            if ($day !== null) {
                $query .= " AND t.day = ?";
                $params[] = $day;
                $types .= 's';
            }

            if ($faculty_id !== null) {
                $query .= " AND t.faculty_id = ?";
                $params[] = $faculty_id;
                $types .= 's';
            }

            $query .= " ORDER BY 
                        FIELD(t.day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
                        t.period ASC";

            if (!empty($params)) {
                $timetable = $this->db->getRows($query, $types, $params);
            } else {
                $timetable = $this->db->getRows($query, '', []);
            }

            if (isset($timetable['error'])) {
                return Response::error($timetable['error'], 500);
            }

            return Response::success($timetable);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Create new timetable entry
     * POST /api/timetable/timetable.php
     */
    public function createTimetable() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate required fields
            $required = ['day', 'period', 'subject_code', 'faculty_id', 'semester', 'section', 'time'];
            foreach ($required as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    return Response::error("Missing required field: $field", 400);
                }
            }

            // Generate unique ID
            $id = 'TT_' . uniqid();

            // Check if subject exists
            $subjectCheck = $this->db->getRow(
                "SELECT code FROM subjects WHERE code = ?",
                's',
                [$data['subject_code']]
            );

            if (!$subjectCheck) {
                return Response::error("Invalid subject_code: {$data['subject_code']}", 400);
            }

            // Check if faculty exists
            $facultyCheck = $this->db->getRow(
                "SELECT id FROM faculty WHERE id = ?",
                's',
                [$data['faculty_id']]
            );

            if (!$facultyCheck) {
                return Response::error("Invalid faculty_id: {$data['faculty_id']}", 400);
            }

            // Check for duplicate slot
            $duplicateCheck = $this->db->getRow(
                "SELECT id FROM timetable WHERE day = ? AND period = ? AND semester = ? AND section = ?",
                'siis',
                [$data['day'], $data['period'], $data['semester'], $data['section']]
            );

            if ($duplicateCheck) {
                return Response::error("Timetable slot already exists for this day, period, semester, and section", 400);
            }

            // Insert timetable entry
            $query = "INSERT INTO timetable 
                      (id, day, period, subject_code, faculty_id, time, semester, section, room_number, start_time, end_time)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $result = $this->db->execute(
                $query,
                'ssisssissss',
                [
                    $id,
                    $data['day'],
                    $data['period'],
                    $data['subject_code'],
                    $data['faculty_id'],
                    $data['time'],
                    $data['semester'],
                    $data['section'],
                    $data['room_number'] ?? '',
                    $data['start_time'] ?? null,
                    $data['end_time'] ?? null
                ]
            );

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success([
                'id' => $id,
                'message' => 'Timetable entry created successfully'
            ]);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Update timetable entry
     * PUT /api/timetable/timetable.php
     */
    public function updateTimetable() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            if (!isset($data['id'])) {
                return Response::error('Timetable ID is required', 400);
            }

            // Build update query dynamically
            $updates = [];
            $params = [];
            $types = '';

            $allowedFields = ['day', 'period', 'subject_code', 'faculty_id', 'time', 'semester', 'section', 'room_number', 'start_time', 'end_time'];

            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $updates[] = "$field = ?";
                    $params[] = $data[$field];
                    $types .= ($field === 'period' || $field === 'semester') ? 'i' : 's';
                }
            }

            if (empty($updates)) {
                return Response::error('No fields to update', 400);
            }

            $params[] = $data['id'];
            $types .= 's';

            $query = "UPDATE timetable SET " . implode(', ', $updates) . " WHERE id = ?";

            $result = $this->db->execute($query, $types, $params);

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success(['message' => 'Timetable entry updated successfully']);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Delete timetable entry
     * DELETE /api/timetable/timetable.php?id=TT_123
     */
    public function deleteTimetable() {
        try {
            $id = isset($_GET['id']) ? $_GET['id'] : null;

            if (!$id) {
                return Response::error('Timetable ID is required', 400);
            }

            $query = "DELETE FROM timetable WHERE id = ?";
            $result = $this->db->execute($query, 's', [$id]);

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success(['message' => 'Timetable entry deleted successfully']);
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
                return $this->getTimetable();
            case 'POST':
                return $this->createTimetable();
            case 'PUT':
                return $this->updateTimetable();
            case 'DELETE':
                return $this->deleteTimetable();
            default:
                return Response::error('Method not allowed', 405);
        }
    }
}

// Execute
$api = new TimetableAPI();
echo json_encode($api->route());
?>
