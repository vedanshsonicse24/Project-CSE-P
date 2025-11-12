<?php
/**
 * Engage Lectures API (Proxy/Substitute Lectures)
 * Handles faculty proxy lecture management
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

class EngageLecturesAPI {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    /**
     * Get engage lectures list
     * GET /api/faculty/engage_lectures.php?action=list&facultyId=FAC001&status=pending
     */
    public function getEngageLectures() {
        try {
            $facultyId = $_GET['facultyId'] ?? null;
            $status = $_GET['status'] ?? null;

            $query = "SELECT el.id, el.original_faculty_id, el.proxy_faculty_id, 
                            el.timetable_id, el.engage_date, el.reason, el.status,
                            f1.full_name as original_faculty_name, 
                            f2.full_name as proxy_faculty_name,
                            t.day, t.period, t.time, t.semester, t.section, t.room_number,
                            s.code as subject_code, s.name as subject_name
                     FROM engage_lectures el
                     LEFT JOIN faculty f1 ON el.original_faculty_id = f1.id
                     LEFT JOIN faculty f2 ON el.proxy_faculty_id = f2.id
                     LEFT JOIN timetable t ON el.timetable_id = t.id
                     LEFT JOIN subjects s ON t.subject_code = s.code
                     WHERE 1=1";

            $params = [];
            $types = '';

            if ($facultyId) {
                $query .= " AND (el.original_faculty_id = ? OR el.proxy_faculty_id = ?)";
                $params[] = $facultyId;
                $params[] = $facultyId;
                $types .= 'ss';
            }

            if ($status) {
                $query .= " AND el.status = ?";
                $params[] = $status;
                $types .= 's';
            }

            $query .= " ORDER BY el.engage_date DESC, t.period ASC";

            $lectures = $this->db->getRows($query, $types, $params);

            if (isset($lectures['error'])) {
                return Response::error('Failed to fetch engage lectures: ' . $lectures['error'], 500);
            }

            return Response::success($lectures);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Create engage lecture request
     * POST /api/faculty/engage_lectures.php?action=create
     * Body: {
     *   "originalFacultyId": "FAC001",
     *   "proxyFacultyId": "FAC002",
     *   "timetableId": "TT001",
     *   "engageDate": "2025-11-15",
     *   "reason": "Conference attendance",
     *   "semester": "6",
     *   "section": "A",
     *   "subject": "Data Structures",
     *   "period": "3"
     * }
     */
    public function createEngageLecture() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!$data) {
                return Response::error('Invalid JSON data', 400);
            }

            $required = ['originalFacultyId', 'proxyFacultyId', 'engageDate', 'reason'];
            foreach ($required as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    return Response::error("Missing required field: $field", 400);
                }
            }

            // Check if faculty members exist
            $checkFaculty = "SELECT id FROM faculty WHERE id IN (?, ?)";
            $faculties = $this->db->getRows($checkFaculty, 'ss', [
                $data['originalFacultyId'],
                $data['proxyFacultyId']
            ]);

            if (count($faculties) < 2) {
                return Response::error('One or both faculty members not found', 404);
            }

            // Find timetable_id if not provided
            $timetableId = $data['timetableId'] ?? null;
            
            if (!$timetableId && isset($data['semester']) && isset($data['section']) && isset($data['period'])) {
                // Try to find matching timetable entry
                $findTimetable = "SELECT id FROM timetable 
                                 WHERE faculty_id = ? 
                                 AND semester = ? 
                                 AND section = ? 
                                 AND period = ?
                                 LIMIT 1";
                
                $timetableResult = $this->db->getRows($findTimetable, 'ssss', [
                    $data['originalFacultyId'],
                    $data['semester'],
                    $data['section'],
                    $data['period']
                ]);
                
                if (!empty($timetableResult) && isset($timetableResult[0]['id'])) {
                    $timetableId = $timetableResult[0]['id'];
                }
            }

            // Insert engage lecture
            $insertQuery = "INSERT INTO engage_lectures 
                           (original_faculty_id, proxy_faculty_id, timetable_id, 
                            engage_date, reason, status) 
                           VALUES (?, ?, ?, ?, ?, 'pending')";

            $params = [
                $data['originalFacultyId'],
                $data['proxyFacultyId'],
                $timetableId,
                $data['engageDate'],
                $data['reason']
            ];

            $result = $this->db->executeQuery($insertQuery, 'sssss', $params);

            if (isset($result['error'])) {
                return Response::error('Failed to create engage lecture: ' . $result['error'], 500);
            }

            return Response::success([
                'id' => $result['last_insert_id'],
                'message' => 'Engage lecture request created successfully'
            ], '', 201);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Approve/Reject engage lecture
     * PUT /api/faculty/engage_lectures.php?action=approve
     * Body: {
     *   "id": 1,
     *   "status": "approved" | "rejected",
     *   "approvedBy": "FAC003" (HOD ID)
     * }
     */
    public function updateEngageStatus() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!$data || !isset($data['id']) || !isset($data['status'])) {
                return Response::error('ID and status are required', 400);
            }

            $validStatuses = ['approved', 'rejected'];
            if (!in_array($data['status'], $validStatuses)) {
                return Response::error('Invalid status. Must be approved or rejected', 400);
            }

            $updateQuery = "UPDATE engage_lectures 
                           SET status = ?, approved_by = ? 
                           WHERE id = ?";

            $result = $this->db->executeQuery($updateQuery, 'ssi', [
                $data['status'],
                $data['approvedBy'] ?? null,
                $data['id']
            ]);

            if (isset($result['error'])) {
                return Response::error('Failed to update status: ' . $result['error'], 500);
            }

            if ($result['affected_rows'] === 0) {
                return Response::notFound('Engage lecture not found');
            }

            return Response::success([
                'message' => 'Engage lecture status updated successfully'
            ]);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Get available faculty for proxy
     * GET /api/faculty/engage_lectures.php?action=available_faculty&date=2025-11-15&period=3
     */
    public function getAvailableFaculty() {
        try {
            $date = $_GET['date'] ?? null;
            $period = $_GET['period'] ?? null;

            if (!$date || !$period) {
                return Response::error('Date and period are required', 400);
            }

            // Get faculty who don't have class at this time
            $query = "SELECT f.id, f.full_name, f.designation, f.department
                     FROM faculty f
                     WHERE f.id NOT IN (
                         SELECT DISTINCT t.faculty_id
                         FROM timetable t
                         WHERE t.period = ?
                         AND DAYNAME(?) = t.day
                     )
                     ORDER BY f.full_name ASC";

            $faculties = $this->db->getRows($query, 'is', [$period, $date]);

            if (isset($faculties['error'])) {
                return Response::error('Failed to fetch available faculty: ' . $faculties['error'], 500);
            }

            return Response::success($faculties);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Route requests
     */
    public function route() {
        $action = $_GET['action'] ?? 'list';

        switch ($action) {
            case 'list':
                if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                    return $this->getEngageLectures();
                }
                return Response::error('Method not allowed', 405);
            
            case 'create':
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    return $this->createEngageLecture();
                }
                return Response::error('Method not allowed', 405);
            
            case 'approve':
                if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
                    return $this->updateEngageStatus();
                }
                return Response::error('Method not allowed', 405);
            
            case 'available_faculty':
                if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                    return $this->getAvailableFaculty();
                }
                return Response::error('Method not allowed', 405);
            
            default:
                return Response::error('Invalid action', 400);
        }
    }
}

// Execute
$api = new EngageLecturesAPI();
echo json_encode($api->route());
?>
