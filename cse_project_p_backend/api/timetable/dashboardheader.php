<?php
/**
 * Dashboard Header API for Timetable Module
 * Get statistics and info for dashboard header
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

class DashboardHeaderAPI {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    /**
     * Get dashboard statistics
     * GET /api/timetable/dashboardheader.php?faculty_id=FAC001
     */
    public function getDashboardStats() {
        try {
            $faculty_id = isset($_GET['faculty_id']) ? $_GET['faculty_id'] : null;

            // Get total classes count
            $classesQuery = "SELECT COUNT(*) as total_classes FROM timetable";
            $classesParams = [];
            $classesTypes = '';

            if ($faculty_id) {
                $classesQuery .= " WHERE faculty_id = ?";
                $classesParams[] = $faculty_id;
                $classesTypes = 's';
            }

            $classesResult = $this->db->getRow($classesQuery, $classesTypes, $classesParams);
            $totalClasses = $classesResult['total_classes'] ?? 0;

            // Get today's classes count
            $today = date('l'); // Monday, Tuesday, etc.
            $todayClassesQuery = "SELECT COUNT(*) as today_classes FROM timetable WHERE day = ?";
            $todayParams = [$today];
            $todayTypes = 's';

            if ($faculty_id) {
                $todayClassesQuery .= " AND faculty_id = ?";
                $todayParams[] = $faculty_id;
                $todayTypes .= 's';
            }

            $todayResult = $this->db->getRow($todayClassesQuery, $todayTypes, $todayParams);
            $todayClasses = $todayResult['today_classes'] ?? 0;

            // Get attendance taken today
            $attendanceQuery = "SELECT COUNT(DISTINCT timetable_id) as attendance_taken 
                               FROM attendance_records 
                               WHERE date = CURDATE()";
            $attendanceParams = [];
            $attendanceTypes = '';

            if ($faculty_id) {
                $attendanceQuery .= " AND marked_by = ?";
                $attendanceParams[] = $faculty_id;
                $attendanceTypes = 's';
            }

            $attendanceResult = $this->db->getRow($attendanceQuery, $attendanceTypes, $attendanceParams);
            $attendanceTaken = $attendanceResult['attendance_taken'] ?? 0;

            // Get total subjects
            $subjectsQuery = "SELECT COUNT(*) as total_subjects FROM subjects";
            $subjectsParams = [];
            $subjectsTypes = '';

            if ($faculty_id) {
                $subjectsQuery .= " WHERE faculty_id = ?";
                $subjectsParams[] = $faculty_id;
                $subjectsTypes = 's';
            }

            $subjectsResult = $this->db->getRow($subjectsQuery, $subjectsTypes, $subjectsParams);
            $totalSubjects = $subjectsResult['total_subjects'] ?? 0;

            // Get next class today
            $currentHour = (int)date('H');
            $nextClassQuery = "SELECT t.*, s.name as subject_name, s.code as subject_code
                              FROM timetable t
                              JOIN subjects s ON t.subject_code = s.code
                              WHERE t.day = ? AND t.period > ?";
            
            $nextClassParams = [$today, $currentHour - 9]; // Assuming classes start at 9 AM
            $nextClassTypes = 'si';

            if ($faculty_id) {
                $nextClassQuery .= " AND t.faculty_id = ?";
                $nextClassParams[] = $faculty_id;
                $nextClassTypes .= 's';
            }

            $nextClassQuery .= " ORDER BY t.period ASC LIMIT 1";

            $nextClass = $this->db->getRow($nextClassQuery, $nextClassTypes, $nextClassParams);

            return Response::success([
                'total_classes' => $totalClasses,
                'today_classes' => $todayClasses,
                'attendance_taken' => $attendanceTaken,
                'total_subjects' => $totalSubjects,
                'attendance_pending' => $todayClasses - $attendanceTaken,
                'next_class' => $nextClass ?: null,
                'current_day' => $today
            ]);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }
}

// Execute
$api = new DashboardHeaderAPI();
echo json_encode($api->getDashboardStats());
?>
