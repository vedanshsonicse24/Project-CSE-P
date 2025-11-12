<?php
/**
 * Teacher Timetable API
 * Get teacher's schedule for a specific day or week
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../helpers/Response.php';

class TeacherTimetableAPI {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    /**
     * Get teacher's timetable
     * GET /api/timetable/teachertimetable.php?faculty_id=FAC001&day=Monday
     */
    public function getTeacherSchedule() {
        try {
            $faculty_id = isset($_GET['faculty_id']) ? $_GET['faculty_id'] : null;
            $day = isset($_GET['day']) ? $_GET['day'] : null;

            if (!$faculty_id) {
                return Response::error('faculty_id is required', 400);
            }

            $query = "SELECT t.*, s.name as subject_name, s.type as subject_type, s.credits,
                             t.semester, t.section, t.room_number,
                             CONCAT(s.code, ' - ', s.name) as full_subject_name
                      FROM timetable t
                      JOIN subjects s ON t.subject_code = s.code
                      WHERE t.faculty_id = ?";

            $params = [$faculty_id];
            $types = 's';

            if ($day !== null) {
                $query .= " AND t.day = ?";
                $params[] = $day;
                $types .= 's';
            }

            $query .= " ORDER BY 
                        FIELD(t.day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
                        t.period ASC";

            $schedule = $this->db->getRows($query, $types, $params);

            if (isset($schedule['error'])) {
                return Response::error($schedule['error'], 500);
            }

            // Check attendance status for each slot
            foreach ($schedule as &$slot) {
                $attendanceQuery = "SELECT COUNT(*) as count 
                                   FROM attendance_records 
                                   WHERE timetable_id = ? AND date = CURDATE()";
                
                $attendanceCheck = $this->db->getRow($attendanceQuery, 's', [$slot['id']]);
                $slot['attendance_taken'] = isset($attendanceCheck['count']) && $attendanceCheck['count'] > 0;
            }

            return Response::success($schedule);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }
}

// Execute
$api = new TeacherTimetableAPI();
echo json_encode($api->getTeacherSchedule());
?>
