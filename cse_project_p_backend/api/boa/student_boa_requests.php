<?php
/**
 * Student BOA Requests API
 * Allows students to view their submitted BOA requests and their status
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/database.php';

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    try {
        $rollNo = $_GET['rollNo'] ?? null;
        
        if (!$rollNo) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Roll number is required"]);
            exit();
        }

        $conn = getDBConnection();
        
        // Get student_id from roll number
        $stmtStudent = $conn->prepare("SELECT id FROM students WHERE roll = ?");
        $stmtStudent->execute([$rollNo]);
        $student = $stmtStudent->fetch(PDO::FETCH_ASSOC);
        
        if (!$student) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Student not found"]);
            exit();
        }
        
        $studentId = $student['id'];
        
        // Fetch all BOA requests for this student with approval status
        $query = "
            SELECT 
                br.id, 
                br.event_name, 
                br.event_date_from, 
                br.event_date_to, 
                br.organizing_dept, 
                br.teacher_in_charge, 
                br.num_theory_lectures, 
                br.num_practical_lectures,
                br.branch, 
                br.semester, 
                br.section,
                br.class_in_charge, 
                br.submission_date, 
                br.status,
                br.hod_approval_status,
                br.class_incharge_approval_status,
                br.hod_approved_by,
                br.class_incharge_approved_by,
                br.hod_approval_date,
                br.class_incharge_approval_date,
                br.hod_remarks,
                br.class_incharge_remarks,
                br.created_at,
                GROUP_CONCAT(bep.photo_url) as event_photos
            FROM boa_requests br
            LEFT JOIN boa_event_photos bep ON br.id = bep.boa_request_id
            WHERE br.student_id = ?
            GROUP BY br.id
            ORDER BY br.created_at DESC
        ";
        
        $stmt = $conn->prepare($query);
        $stmt->execute([$studentId]);
        $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Format the response
        $formattedRequests = array_map(function($request) {
            return [
                'id' => $request['id'],
                'eventName' => $request['event_name'],
                'eventDateFrom' => $request['event_date_from'],
                'eventDateTo' => $request['event_date_to'],
                'organizingDept' => $request['organizing_dept'],
                'teacherInCharge' => $request['teacher_in_charge'],
                'numTheoryLectures' => (int)$request['num_theory_lectures'],
                'numPracticalLectures' => (int)$request['num_practical_lectures'],
                'branch' => $request['branch'],
                'semester' => $request['semester'],
                'section' => $request['section'],
                'classInCharge' => $request['class_in_charge'],
                'submissionDate' => $request['submission_date'],
                'status' => $request['status'], // Overall status
                'hodApprovalStatus' => $request['hod_approval_status'],
                'classInchargeApprovalStatus' => $request['class_incharge_approval_status'],
                'hodApprovedBy' => $request['hod_approved_by'],
                'classInchargeApprovedBy' => $request['class_incharge_approved_by'],
                'hodApprovalDate' => $request['hod_approval_date'],
                'classInchargeApprovalDate' => $request['class_incharge_approval_date'],
                'hodRemarks' => $request['hod_remarks'],
                'classInchargeRemarks' => $request['class_incharge_remarks'],
                'eventPhotos' => $request['event_photos'] ? explode(',', $request['event_photos']) : [],
                'submittedAt' => $request['created_at']
            ];
        }, $requests);
        
        echo json_encode([
            "status" => "success",
            "data" => $formattedRequests
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Database error: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
?>
