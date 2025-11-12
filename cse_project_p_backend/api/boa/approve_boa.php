<?php
/**
 * BOA Approval API
 * Handles approval/rejection by HOD and Class In-charge
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/database.php';

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    try {
        $input = json_decode(file_get_contents("php://input"), true);
        
        // Validate required fields
        if (!isset($input['boaRequestId']) || !isset($input['approverRole']) || !isset($input['action'])) {
            http_response_code(400);
            echo json_encode([
                "status" => "error", 
                "message" => "Missing required fields: boaRequestId, approverRole, action"
            ]);
            exit();
        }
        
        $boaRequestId = $input['boaRequestId'];
        $approverRole = $input['approverRole']; // 'HOD' or 'ClassIncharge'
        $action = $input['action']; // 'approve' or 'reject'
        $approverName = $input['approverName'] ?? 'Unknown';
        $remarks = $input['remarks'] ?? null;
        
        $conn = getDBConnection();
        
        // Get current BOA request status
        $stmtCheck = $conn->prepare("
            SELECT hod_approval_status, class_incharge_approval_status, status 
            FROM boa_requests 
            WHERE id = ?
        ");
        $stmtCheck->execute([$boaRequestId]);
        $currentRequest = $stmtCheck->fetch(PDO::FETCH_ASSOC);
        
        if (!$currentRequest) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "BOA request not found"]);
            exit();
        }
        
        // Update based on approver role
        if ($approverRole === 'HOD') {
            $status = ($action === 'approve') ? 'Approved' : 'Rejected';
            
            $stmt = $conn->prepare("
                UPDATE boa_requests SET 
                    hod_approval_status = ?,
                    hod_approved_by = ?,
                    hod_approval_date = NOW(),
                    hod_remarks = ?
                WHERE id = ?
            ");
            $stmt->execute([$status, $approverName, $remarks, $boaRequestId]);
            
            // Check if we need to update overall status
            $hodStatus = $status;
            $classInchargeStatus = $currentRequest['class_incharge_approval_status'];
            
        } else if ($approverRole === 'ClassIncharge') {
            $status = ($action === 'approve') ? 'Approved' : 'Rejected';
            
            $stmt = $conn->prepare("
                UPDATE boa_requests SET 
                    class_incharge_approval_status = ?,
                    class_incharge_approved_by = ?,
                    class_incharge_approval_date = NOW(),
                    class_incharge_remarks = ?
                WHERE id = ?
            ");
            $stmt->execute([$status, $approverName, $remarks, $boaRequestId]);
            
            // Check if we need to update overall status
            $hodStatus = $currentRequest['hod_approval_status'];
            $classInchargeStatus = $status;
            
        } else {
            http_response_code(400);
            echo json_encode([
                "status" => "error", 
                "message" => "Invalid approver role. Must be 'HOD' or 'ClassIncharge'"
            ]);
            exit();
        }
        
        // Update overall status based on both approvals
        $overallStatus = 'Pending';
        
        // If either rejected, overall is rejected
        if ($hodStatus === 'Rejected' || $classInchargeStatus === 'Rejected') {
            $overallStatus = 'Rejected';
        }
        // If both approved, overall is approved
        else if ($hodStatus === 'Approved' && $classInchargeStatus === 'Approved') {
            $overallStatus = 'Approved';
        }
        // Otherwise keep as pending
        
        // Update overall status
        $stmtOverall = $conn->prepare("UPDATE boa_requests SET status = ? WHERE id = ?");
        $stmtOverall->execute([$overallStatus, $boaRequestId]);
        
        echo json_encode([
            "status" => "success",
            "message" => "BOA request " . strtolower($action) . "ed successfully",
            "data" => [
                "id" => $boaRequestId,
                "overallStatus" => $overallStatus,
                "hodApprovalStatus" => ($approverRole === 'HOD') ? $status : $hodStatus,
                "classInchargeApprovalStatus" => ($approverRole === 'ClassIncharge') ? $status : $classInchargeStatus
            ]
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
