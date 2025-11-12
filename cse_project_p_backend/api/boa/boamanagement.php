<?php
/**
 * BOA Management API
 * Handles BOA request management for faculty/admin
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../helpers/Response.php';

class BOAManagementAPI {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    public function getBOARequests() {
        try {
            $query = "
                SELECT 
                    br.id, br.event_name, br.event_date_from, br.event_date_to, 
                    br.organizing_dept, br.teacher_in_charge, br.num_theory_lectures, 
                    br.num_practical_lectures, br.branch, br.semester, br.section,
                    br.class_in_charge, br.submission_date, br.status, 
                    br.approved_by, br.approval_date, br.remarks, br.created_at,
                    s.name as student_name, s.roll as roll_no,
                    GROUP_CONCAT(bep.photo_url) as event_photos
                FROM boa_requests br
                LEFT JOIN students s ON br.student_id = s.id
                LEFT JOIN boa_event_photos bep ON br.id = bep.boa_request_id
                GROUP BY br.id
                ORDER BY br.created_at DESC
            ";
            
            $requests = $this->db->getRows($query);

            if (!$requests) {
                // Return empty array if no requests found
                return Response::success([]);
            }
            
            // Convert to frontend format
            $formattedRequests = array_map(function($request) {
                return [
                    'id' => $request['id'],
                    'eventName' => $request['event_name'],
                    'eventDate' => $request['event_date_from'],
                    'organizingDept' => $request['organizing_dept'],
                    'teacherInCharge' => $request['teacher_in_charge'],
                    'studentName' => $request['student_name'],
                    'branch' => $request['branch'],
                    'semester' => $request['semester'],
                    'rollNo' => $request['roll_no'],
                    'section' => $request['section'],
                    'date' => $request['event_date_from'],
                    'numLectures' => (int)$request['num_theory_lectures'] + (int)$request['num_practical_lectures'],
                    'classInCharge' => $request['class_in_charge'],
                    'submissionDate' => $request['submission_date'],
                    'eventPhotos' => $request['event_photos'] ? explode(',', $request['event_photos']) : [],
                    'status' => strtolower($request['status']),
                    'approvedBy' => $request['approved_by'],
                    'approvalDate' => $request['approval_date'],
                    'remarks' => $request['remarks'],
                    'submittedAt' => $request['created_at']
                ];
            }, $requests);
            
            return Response::success($formattedRequests);
            
        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    public function updateBOAStatus() {
        try {
            $input = json_decode(file_get_contents("php://input"), true);
            
            if (!isset($input["id"]) || !isset($input["status"])) {
                return Response::error("Missing required fields: id and status", 400);
            }
            
            // Get current user (implement proper authentication in production)
            $currentUser = $input['approvedBy'] ?? 'Admin User';
            
            // Convert status to match database ENUM ('Pending', 'Approved', 'Rejected')
            $statusForDB = ucfirst(strtolower($input['status']));
            
            $query = "
                UPDATE boa_requests SET 
                    status = ?,
                    approved_by = ?,
                    approval_date = NOW(),
                    remarks = ?
                WHERE id = ?
            ";
            
            $result = $this->db->executeQuery($query, 'ssss', [
                $statusForDB,
                $currentUser,
                $input['remarks'] ?? null,
                $input['id']
            ]);
            
            if (isset($result['error'])) {
                return Response::error('Failed to update BOA status: ' . $result['error'], 500);
            }
            
            return Response::success([
                "message" => "Status updated successfully",
                "updatedRequest" => [
                    "id" => $input["id"],
                    "status" => $input["status"],
                    "approvedBy" => $currentUser,
                    "approvalDate" => date("Y-m-d H:i:s"),
                    "remarks" => $input["remarks"] ?? null
                ]
            ]);
            
        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }
}

// Execute
$api = new BOAManagementAPI();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    echo json_encode($api->getBOARequests());
} elseif ($method === 'POST') {
    echo json_encode($api->updateBOAStatus());
} else {
    echo json_encode(Response::error('Invalid request method', 405));
}
?>
