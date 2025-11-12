<?php
/**
 * HOD Dashboard API
 * Provides dashboard statistics and overview data for HOD
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/Database.php';
require_once '../helpers/Response.php';

class HODDashboardAPI {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    /**
     * Get dashboard statistics
     */
    public function getDashboardStats() {
        try {
            // Get total students count
            $studentsQuery = "SELECT COUNT(*) as total FROM students";
            $studentsResult = $this->db->getRow($studentsQuery);
            $totalStudents = $studentsResult['total'] ?? 0;

            // Get total faculty count
            $facultyQuery = "SELECT COUNT(*) as total FROM faculty WHERE department = 'Computer Science'";
            $facultyResult = $this->db->getRow($facultyQuery);
            $totalFaculty = $facultyResult['total'] ?? 0;

            // Get sections count (distinct semester-section combinations)
            $sectionsQuery = "SELECT COUNT(DISTINCT CONCAT(semester, section)) as total FROM students";
            $sectionsResult = $this->db->getRow($sectionsQuery);
            $sections = $sectionsResult['total'] ?? 0;

            // Calculate average attendance
            $attendanceQuery = "SELECT AVG(percent) as avg_attendance FROM students WHERE percent IS NOT NULL";
            $attendanceResult = $this->db->getRow($attendanceQuery);
            $avgAttendance = round($attendanceResult['avg_attendance'] ?? 0, 2);

            $dashboard = [
                'total_students' => (int)$totalStudents,
                'total_faculty' => (int)$totalFaculty,
                'sections' => (int)$sections,
                'average_attendance' => $avgAttendance . '%'
            ];

            // Get faculty list with real data
            $facultyQuery = "
                SELECT 
                    id,
                    full_name AS name,
                    designation,
                    department,
                    email,
                    phone,
                    mentor_for,
                    total_mentees,
                    years_of_experience
                FROM faculty
                WHERE department = 'Computer Science'
                ORDER BY designation, full_name
            ";
            $faculty = $this->db->getRows($facultyQuery);

            // Get students list
            $studentsQuery = "
                SELECT 
                    id,
                    name,
                    roll,
                    enrollment_number,
                    semester,
                    section,
                    percent AS attendance_percentage,
                    average_cgpa AS cgpa
                FROM students
                ORDER BY semester, section, roll
            ";
            $students = $this->db->getRows($studentsQuery);

            return Response::success([
                'dashboard' => $dashboard,
                'faculty' => $faculty ?? [],
                'students' => $students ?? []
            ]);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }
}

// Execute
$api = new HODDashboardAPI();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($api->getDashboardStats());
} else {
    echo json_encode(Response::error('Invalid request method', 405));
}
?>
