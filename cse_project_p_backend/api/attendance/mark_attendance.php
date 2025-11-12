<?php
/**
 * Mark Attendance API
 * Handles marking attendance for students, fetching attendance records
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/Database.php';
require_once '../helpers/Response.php';

class AttendanceAPI {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    /**
     * Mark individual student attendance
     * POST /api/attendance/mark_attendance.php?action=mark
     * Body: {
     *   "studentId": "STU001",
     *   "subjectCode": "CSE301",
     *   "date": "2025-11-10",
     *   "period": 1,
     *   "status": "Present" | "Absent",
     *   "markedBy": "FAC001",
     *   "timetableId": "TT001"
     * }
     */
    public function markAttendance() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!$data) {
                return Response::error('Invalid JSON data', 400);
            }

            $required = ['studentId', 'subjectCode', 'date', 'period', 'status', 'markedBy'];
            foreach ($required as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    return Response::error("Missing required field: $field", 400);
                }
            }

            $validStatuses = ['Present', 'Absent', 'BOA'];
            if (!in_array($data['status'], $validStatuses)) {
                return Response::error('Invalid status. Must be Present, Absent, or BOA', 400);
            }

            // Check if attendance already exists
            $checkQuery = "SELECT id FROM attendance_records 
                          WHERE student_id = ? AND subject_code = ? AND date = ? AND period = ?";
            $existing = $this->db->getRow($checkQuery, 'sssi', [
                $data['studentId'],
                $data['subjectCode'],
                $data['date'],
                $data['period']
            ]);

            if ($existing && !isset($existing['error'])) {
                // Update existing record
                $updateQuery = "UPDATE attendance_records 
                               SET status = ?, marked_by = ?, marked_at = NOW() 
                               WHERE id = ?";
                $result = $this->db->executeQuery($updateQuery, 'ssi', [
                    $data['status'],
                    $data['markedBy'],
                    $existing['id']
                ]);

                if (isset($result['error'])) {
                    return Response::error('Failed to update attendance: ' . $result['error'], 500);
                }

                return Response::success([
                    'id' => $existing['id'],
                    'message' => 'Attendance updated successfully'
                ]);
            }

            // Insert new record
            $insertQuery = "INSERT INTO attendance_records 
                           (student_id, subject_code, timetable_id, date, period, status, marked_by) 
                           VALUES (?, ?, ?, ?, ?, ?, ?)";
            
            $params = [
                $data['studentId'],
                $data['subjectCode'],
                $data['timetableId'] ?? null,
                $data['date'],
                $data['period'],
                $data['status'],
                $data['markedBy']
            ];

            $result = $this->db->executeQuery($insertQuery, 'ssssiss', $params);

            if (isset($result['error'])) {
                return Response::error('Failed to mark attendance: ' . $result['error'], 500);
            }

            return Response::success([
                'id' => $result['last_insert_id'],
                'message' => 'Attendance marked successfully'
            ], '', 201);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Mark bulk attendance for multiple students
     * POST /api/attendance/mark_attendance.php?action=bulk_mark
     * Body: {
     *   "subjectCode": "CSE301",
     *   "date": "2025-11-10",
     *   "period": 1,
     *   "markedBy": "FAC001",
     *   "students": [
     *     {"studentId": "STU001", "status": "Present"},
     *     {"studentId": "STU002", "status": "Absent"}
     *   ]
     * }
     */
    public function bulkMarkAttendance() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!$data || !isset($data['students']) || !is_array($data['students'])) {
                return Response::error('Invalid data format', 400);
            }

            $required = ['subjectCode', 'date', 'period', 'markedBy'];
            foreach ($required as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    return Response::error("Missing required field: $field", 400);
                }
            }

            $successCount = 0;
            $failedCount = 0;
            $errors = [];

            foreach ($data['students'] as $student) {
                if (!isset($student['studentId']) || !isset($student['status'])) {
                    $failedCount++;
                    continue;
                }

                $studentData = [
                    'studentId' => $student['studentId'],
                    'subjectCode' => $data['subjectCode'],
                    'date' => $data['date'],
                    'period' => $data['period'],
                    'status' => $student['status'],
                    'markedBy' => $data['markedBy'],
                    'timetableId' => $data['timetableId'] ?? null
                ];

                // Reuse markAttendance logic
                $checkQuery = "SELECT id FROM attendance_records 
                              WHERE student_id = ? AND subject_code = ? AND date = ? AND period = ?";
                $existing = $this->db->getRow($checkQuery, 'sssi', [
                    $studentData['studentId'],
                    $studentData['subjectCode'],
                    $studentData['date'],
                    $studentData['period']
                ]);

                if ($existing && !isset($existing['error'])) {
                    $updateQuery = "UPDATE attendance_records 
                                   SET status = ?, marked_by = ?, marked_at = NOW() 
                                   WHERE id = ?";
                    $result = $this->db->executeQuery($updateQuery, 'ssi', [
                        $studentData['status'],
                        $studentData['markedBy'],
                        $existing['id']
                    ]);
                } else {
                    $insertQuery = "INSERT INTO attendance_records 
                                   (student_id, subject_code, timetable_id, date, period, status, marked_by) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?)";
                    $result = $this->db->executeQuery($insertQuery, 'ssssiss', [
                        $studentData['studentId'],
                        $studentData['subjectCode'],
                        $studentData['timetableId'],
                        $studentData['date'],
                        $studentData['period'],
                        $studentData['status'],
                        $studentData['markedBy']
                    ]);
                }

                if (isset($result['error'])) {
                    $failedCount++;
                    $errors[] = "Failed for student {$studentData['studentId']}: " . $result['error'];
                } else {
                    $successCount++;
                }
            }

            return Response::success([
                'total' => count($data['students']),
                'success' => $successCount,
                'failed' => $failedCount,
                'errors' => $errors
            ]);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Fetch attendance records
     * GET /api/attendance/mark_attendance.php?action=fetch&subjectCode=CSE301&date=2025-11-10&period=1
     */
    public function fetchAttendance() {
        try {
            $subjectCode = $_GET['subjectCode'] ?? null;
            $date = $_GET['date'] ?? null;
            $period = $_GET['period'] ?? null;
            $facultyId = $_GET['facultyId'] ?? null;

            $query = "SELECT ar.id, ar.student_id, s.name as student_name, s.roll, 
                            ar.subject_code, ar.date, ar.period, ar.status, 
                            ar.marked_by, f.full_name as marked_by_name, ar.marked_at
                     FROM attendance_records ar
                     LEFT JOIN students s ON ar.student_id = s.id
                     LEFT JOIN faculty f ON ar.marked_by = f.id
                     WHERE 1=1";

            $params = [];
            $types = '';

            if ($subjectCode) {
                $query .= " AND ar.subject_code = ?";
                $params[] = $subjectCode;
                $types .= 's';
            }

            if ($date) {
                $query .= " AND ar.date = ?";
                $params[] = $date;
                $types .= 's';
            }

            if ($period !== null) {
                $query .= " AND ar.period = ?";
                $params[] = $period;
                $types .= 'i';
            }

            if ($facultyId) {
                $query .= " AND ar.marked_by = ?";
                $params[] = $facultyId;
                $types .= 's';
            }

            $query .= " ORDER BY ar.date DESC, ar.period ASC, s.roll ASC";

            $records = $this->db->getRows($query, $types, $params);

            if (isset($records['error'])) {
                return Response::error('Failed to fetch attendance: ' . $records['error'], 500);
            }

            return Response::success($records);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Get students for attendance marking
     * GET /api/attendance/mark_attendance.php?action=students&semester=3&section=A
     */
    public function getStudentsForAttendance() {
        try {
            $semester = $_GET['semester'] ?? null;
            $section = $_GET['section'] ?? null;

            if (!$semester || !$section) {
                return Response::error('Semester and section are required', 400);
            }

            $query = "SELECT id, name, roll, enrollment_number 
                     FROM students 
                     WHERE semester = ? AND section = ? 
                     ORDER BY roll ASC";

            $students = $this->db->getRows($query, 'is', [$semester, $section]);

            if (isset($students['error'])) {
                return Response::error('Failed to fetch students: ' . $students['error'], 500);
            }

            return Response::success($students);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Route requests
     */
    public function route() {
        $action = $_GET['action'] ?? 'mark';

        switch ($action) {
            case 'mark':
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    return $this->markAttendance();
                }
                return Response::error('Method not allowed', 405);
            
            case 'bulk_mark':
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    return $this->bulkMarkAttendance();
                }
                return Response::error('Method not allowed', 405);
            
            case 'fetch':
                if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                    return $this->fetchAttendance();
                }
                return Response::error('Method not allowed', 405);
            
            case 'students':
                if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                    return $this->getStudentsForAttendance();
                }
                return Response::error('Method not allowed', 405);
            
            default:
                return Response::error('Invalid action', 400);
        }
    }
}

// Execute
$api = new AttendanceAPI();
echo json_encode($api->route());
?>
