<?php
/**
 * Attendance Page API
 * Handle attendance marking for timetable slots
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../helpers/Response.php';

class AttendancePageAPI {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    /**
     * Get attendance records for a slot
     * GET /api/timetable/attendancepage.php?timetable_id=TT_123&date=2025-11-12
     */
    public function getAttendance() {
        try {
            $timetable_id = isset($_GET['timetable_id']) ? $_GET['timetable_id'] : null;
            $date = isset($_GET['date']) ? $_GET['date'] : date('Y-m-d');

            if (!$timetable_id) {
                return Response::error('timetable_id is required', 400);
            }

            // Get timetable slot details
            $slotQuery = "SELECT t.*, s.name as subject_name, s.code as subject_code,
                                 t.semester, t.section, f.full_name as faculty_name
                          FROM timetable t
                          JOIN subjects s ON t.subject_code = s.code
                          JOIN faculty f ON t.faculty_id = f.id
                          WHERE t.id = ?";
            
            $slot = $this->db->getRow($slotQuery, 's', [$timetable_id]);

            if (!$slot) {
                return Response::error('Timetable slot not found', 404);
            }

            // Get students for this semester and section
            $studentsQuery = "SELECT id, name, roll, enrollment_number 
                             FROM students 
                             WHERE semester = ? AND section = ?
                             ORDER BY roll ASC";
            
            $students = $this->db->getRows($studentsQuery, 'is', [$slot['semester'], $slot['section']]);

            if (isset($students['error'])) {
                return Response::error($students['error'], 500);
            }

            // Get existing attendance records
            $attendanceQuery = "SELECT student_id, status 
                               FROM attendance_records 
                               WHERE timetable_id = ? AND date = ?";
            
            $attendanceRecords = $this->db->getRows($attendanceQuery, 'ss', [$timetable_id, $date]);

            // Map attendance status to students
            $attendanceMap = [];
            if (!isset($attendanceRecords['error'])) {
                foreach ($attendanceRecords as $record) {
                    $attendanceMap[$record['student_id']] = $record['status'];
                }
            }

            // Combine student data with attendance status
            foreach ($students as &$student) {
                $student['attendance_status'] = isset($attendanceMap[$student['id']]) ? $attendanceMap[$student['id']] : null;
            }

            return Response::success([
                'slot' => $slot,
                'students' => $students,
                'date' => $date
            ]);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Save attendance records
     * POST /api/timetable/attendancepage.php
     * Body: {
     *   "timetable_id": "TT_123",
     *   "date": "2025-11-12",
     *   "marked_by": "FAC001",
     *   "attendance": [
     *     {"student_id": "STU001", "status": "Present"},
     *     {"student_id": "STU002", "status": "Absent"}
     *   ]
     * }
     */
    public function saveAttendance() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate required fields
            if (!isset($data['timetable_id']) || !isset($data['attendance']) || !is_array($data['attendance'])) {
                return Response::error('timetable_id and attendance array are required', 400);
            }

            $timetable_id = $data['timetable_id'];
            $date = $data['date'] ?? date('Y-m-d');
            $marked_by = $data['marked_by'] ?? null;

            // Get timetable details
            $slotQuery = "SELECT subject_code, period FROM timetable WHERE id = ?";
            $slot = $this->db->getRow($slotQuery, 's', [$timetable_id]);

            if (!$slot) {
                return Response::error('Timetable slot not found', 404);
            }

            $subject_code = $slot['subject_code'];
            $period = $slot['period'];

            // Delete existing attendance for this slot and date
            $deleteQuery = "DELETE FROM attendance_records WHERE timetable_id = ? AND date = ?";
            $this->db->execute($deleteQuery, 'ss', [$timetable_id, $date]);

            // Insert new attendance records
            $insertQuery = "INSERT INTO attendance_records 
                           (student_id, subject_code, timetable_id, date, period, status, marked_by)
                           VALUES (?, ?, ?, ?, ?, ?, ?)";

            $successCount = 0;
            foreach ($data['attendance'] as $record) {
                if (!isset($record['student_id']) || !isset($record['status'])) {
                    continue;
                }

                $result = $this->db->execute(
                    $insertQuery,
                    'sssssss',
                    [
                        $record['student_id'],
                        $subject_code,
                        $timetable_id,
                        $date,
                        $period,
                        $record['status'],
                        $marked_by
                    ]
                );

                if (!isset($result['error'])) {
                    $successCount++;
                }
            }

            return Response::success([
                'message' => "Attendance saved successfully",
                'records_saved' => $successCount,
                'date' => $date
            ]);
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
                return $this->getAttendance();
            case 'POST':
                return $this->saveAttendance();
            default:
                return Response::error('Method not allowed', 405);
        }
    }
}

// Execute
$api = new AttendancePageAPI();
echo json_encode($api->route());
?>
