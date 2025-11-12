<?php
/**
 * Pages API
 * Handles content for all informational pages: FacultyInfoPage, NewsEventsPage, ResearchPage, 
 * AboutPage, AdmissionsPage, ApplyPage, COEPage, ContactPage, etc.
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/Database.php';
require_once '../helpers/Response.php';

class PagesAPI {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    /**
     * Get all faculty members (for FacultyInfoPage)
     * GET /api/pages/faculty?department=CSE&designation=Professor
     * Corresponds to: FacultyInfoPage - faculty list display
     */
    public function getFacultyList() {
        try {
            $department = isset($_GET['department']) ? $_GET['department'] : null;
            $designation = isset($_GET['designation']) ? $_GET['designation'] : null;

            $query = "SELECT f.id, f.full_name as name, f.designation, f.qualification, 
                             f.specialization, f.years_of_experience as experience, 
                             u.profile_picture as photo 
                      FROM faculty f
                      LEFT JOIN users u ON f.user_id = u.id
                      WHERE 1=1";

            $params = [];
            $types = '';

            if ($department) {
                $query .= " AND f.department = ?";
                $params[] = $department;
                $types .= 's';
            }

            if ($designation) {
                $query .= " AND f.designation = ?";
                $params[] = $designation;
                $types .= 's';
            }

            $query .= " ORDER BY f.designation DESC, f.full_name ASC";

            if (!empty($params)) {
                $faculties = $this->db->getRows($query, $types, $params);
            } else {
                $faculties = $this->db->getRows($query, '', []);
            }

            if (isset($faculties['error'])) {
                return Response::error($faculties['error'], 500);
            }

            return Response::success($faculties);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get all notifications/news (for NewsEventsPage)
     * GET /api/pages/news?type=event&limit=10
     * Corresponds to: NewsEventsPage - upcoming events and news display
     */
    public function getNewsAndEvents() {
        try {
            $type = isset($_GET['type']) ? $_GET['type'] : null; // event, news, all
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
            $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

            $query = "SELECT id, title, message as description, type, created_at as date, 
                             recipient_type, is_read 
                      FROM notifications 
                      WHERE recipient_type IN ('all', 'student')";

            $params = [];
            $types = '';

            if ($type && $type !== 'all') {
                $query .= " AND type = ?";
                $params[] = $type;
                $types .= 's';
            }

            $query .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;
            $types .= 'ii';

            $news = $this->db->getRows($query, $types, $params);

            if (isset($news['error'])) {
                return Response::error($news['error'], 500);
            }

            return Response::success($news);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get research information (for ResearchPage)
     * GET /api/pages/research?department=CSE
     * Corresponds to: ResearchPage - research areas and information
     */
    public function getResearchInfo() {
        try {
            $department = isset($_GET['department']) ? $_GET['department'] : 'CSE';

            // Get faculty involved in research
            $query = "SELECT id, full_name, designation, specialization, 
                             research_interest, years_of_experience 
                      FROM faculty 
                      WHERE department = ? AND (specialization IS NOT NULL OR research_interest IS NOT NULL)
                      ORDER BY designation DESC";

            $researchers = $this->db->getRows($query, 's', [$department]);

            if (isset($researchers['error'])) {
                return Response::error($researchers['error'], 500);
            }

            // Mock research areas data (can be stored in a table if needed)
            $researchAreas = [
                [
                    'id' => 1,
                    'title' => 'Artificial Intelligence',
                    'description' => 'Machine Learning, Deep Learning, and Neural Networks',
                    'faculty_count' => count($researchers)
                ],
                [
                    'id' => 2,
                    'title' => 'Data Mining & Big Data',
                    'description' => 'Large scale data analysis and pattern recognition',
                    'faculty_count' => count($researchers)
                ],
                [
                    'id' => 3,
                    'title' => 'Cybersecurity',
                    'description' => 'Information security, encryption, and cyber defense',
                    'faculty_count' => count($researchers)
                ]
            ];

            $data = [
                'research_areas' => $researchAreas,
                'researchers' => $researchers
            ];

            return Response::success($data);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get contact information
     * GET /api/pages/contact?type=department
     * Corresponds to: ContactPage - contact details
     */
    public function getContactInfo() {
        try {
            $type = isset($_GET['type']) ? $_GET['type'] : 'general';

            // Mock contact data (can be stored in database)
            $contactData = [
                'general' => [
                    'name' => 'SSIPMT - Computer Science Engineering',
                    'address' => 'SSIPMT, Raipur, Chhattisgarh, India',
                    'phone' => '+91-771-4242424',
                    'email' => 'cse@ssipmt.edu',
                    'website' => 'https://www.ssipmt.edu'
                ],
                'department' => [
                    'name' => 'Computer Science & Engineering Department',
                    'phone' => '+91-771-4242424',
                    'email' => 'cse@ssipmt.edu',
                    'head' => 'Dr. Anand Tamrakar',
                    'office' => 'Room 301, CSE Building'
                ],
                'admissions' => [
                    'phone' => '+91-771-4242400',
                    'email' => 'admissions@ssipmt.edu',
                    'website' => 'https://admissions.ssipmt.edu'
                ]
            ];

            $data = isset($contactData[$type]) ? $contactData[$type] : $contactData['general'];

            return Response::success($data);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get student achievements (for student profile pages)
     * GET /api/pages/achievements?student_id=STU001
     * Corresponds to: Student achievement display
     */
    public function getAchievements() {
        try {
            $studentId = isset($_GET['student_id']) ? $_GET['student_id'] : null;
            $type = isset($_GET['type']) ? $_GET['type'] : null;

            $query = "SELECT id, student_id, title, description, achievement_date, 
                             status, type FROM student_achievements WHERE status = 'Approved'";

            $params = [];
            $types = '';

            if ($studentId) {
                $query .= " AND student_id = ?";
                $params[] = $studentId;
                $types .= 's';
            }

            if ($type) {
                $query .= " AND type = ?";
                $params[] = $type;
                $types .= 's';
            }

            $query .= " ORDER BY achievement_date DESC";

            if (!empty($params)) {
                $achievements = $this->db->getRows($query, $types, $params);
            } else {
                $achievements = $this->db->getRows($query, '', []);
            }

            if (isset($achievements['error'])) {
                return Response::error($achievements['error'], 500);
            }

            return Response::success($achievements);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get page content (for static pages like About, CSE Department info, etc.)
     * GET /api/pages/content?page=about
     * Corresponds to: AboutPage, CSEDepartmentPage, etc.
     */
    public function getPageContent() {
        try {
            $page = isset($_GET['page']) ? $_GET['page'] : 'about';

            // Mock page content data
            $pageContent = [
                'about' => [
                    'title' => 'About SSIPMT',
                    'content' => 'Founded in 2003, SSIPMT is a premier technical institution...',
                    'mission' => 'To provide quality engineering education...',
                    'vision' => 'To be a leading technical institution...'
                ],
                'cse_department' => [
                    'title' => 'Computer Science & Engineering Department',
                    'established' => '2003',
                    'description' => 'Offering comprehensive programs in CSE...',
                    'head' => 'Dr. Anand Tamrakar',
                    'specializations' => ['AI & ML', 'Data Science', 'Cybersecurity', 'Web Development']
                ],
                'admissions' => [
                    'title' => 'Admissions Information',
                    'programs' => ['B.Tech CSE', 'M.Tech CSE', 'PhD CSE'],
                    'eligibility' => 'JEE Main/Advanced qualified candidates',
                    'intake' => '180 seats for B.Tech'
                ],
                'research' => [
                    'title' => 'Research & Innovation',
                    'focus_areas' => ['AI', 'ML', 'Big Data', 'Cybersecurity'],
                    'publications_count' => 150,
                    'patents_count' => 12
                ]
            ];

            $content = isset($pageContent[$page]) ? $pageContent[$page] : $pageContent['about'];

            return Response::success($content);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get department statistics (for dashboard pages)
     * GET /api/pages/stats?department=CSE
     * Corresponds to: Department info pages
     */
    public function getDepartmentStats() {
        try {
            $department = isset($_GET['department']) ? $_GET['department'] : 'CSE';

            // Get faculty count
            $facultyQuery = "SELECT COUNT(*) as total FROM faculty WHERE department = ?";
            $facultyCount = $this->db->getRow($facultyQuery, 's', [$department]);

            // Get student count (all semesters in CSE)
            $studentQuery = "SELECT COUNT(*) as total FROM students";
            $studentCount = $this->db->getRow($studentQuery, '', []);

            // Mock statistics
            $stats = [
                'faculty_count' => $facultyCount['total'] ?? 0,
                'student_count' => $studentCount['total'] ?? 0,
                'research_publications' => 150,
                'patents_filed' => 12,
                'industry_collaborations' => 25,
                'placement_percentage' => 95,
                'average_package' => '8.5 LPA'
            ];

            return Response::success($stats);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Get programs information (for ProgramsPage)
     * GET /api/pages/programs
     * Corresponds to: ProgramsPage - all programs offered
     */
    public function getPrograms() {
        try {
            // Mock programs data (can be stored in database)
            $programs = [
                [
                    'id' => 1,
                    'name' => 'B.Tech Computer Science & Engineering',
                    'duration' => '4 Years',
                    'seats' => 180,
                    'eligibility' => 'JEE Main/Advanced',
                    'specializations' => ['Core CSE', 'AI & ML', 'Data Science']
                ],
                [
                    'id' => 2,
                    'name' => 'M.Tech Computer Science & Engineering',
                    'duration' => '2 Years',
                    'seats' => 60,
                    'eligibility' => 'GATE/Valid Bachelor\'s Degree',
                    'specializations' => ['AI', 'Data Science', 'Cybersecurity']
                ],
                [
                    'id' => 3,
                    'name' => 'PhD Computer Science & Engineering',
                    'duration' => '3-5 Years',
                    'seats' => 10,
                    'eligibility' => 'M.Tech or Equivalent',
                    'specializations' => ['AI & ML', 'Big Data', 'Cybersecurity']
                ]
            ];

            return Response::success($programs);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Route requests to appropriate methods
     */
    public function route() {
        $endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : null;

        switch ($endpoint) {
            case 'faculty':
                return $this->getFacultyList();
            case 'news':
                return $this->getNewsAndEvents();
            case 'research':
                return $this->getResearchInfo();
            case 'contact':
                return $this->getContactInfo();
            case 'achievements':
                return $this->getAchievements();
            case 'content':
                return $this->getPageContent();
            case 'stats':
                return $this->getDepartmentStats();
            case 'programs':
                return $this->getPrograms();
            default:
                return Response::error('Invalid endpoint', 400);
        }
    }
}

// Execute
$api = new PagesAPI();
echo json_encode($api->route());
?>
