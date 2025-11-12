<?php
/**
 * Student CVs Fetch API
 * Retrieves list of uploaded CVs for a student
 */

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

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
            echo json_encode([
                "status" => "error",
                "message" => "Roll number is required"
            ]);
            exit();
        }

        $conn = getDBConnection();
        
        // Get student_id from roll number
        $stmtStudent = $conn->prepare("SELECT id FROM students WHERE roll = ?");
        $stmtStudent->execute([$rollNo]);
        $student = $stmtStudent->fetch(PDO::FETCH_ASSOC);
        
        if (!$student) {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "Student not found"
            ]);
            exit();
        }
        
        $studentId = $student['id'];
        
        // Fetch all CVs for this student
        $stmt = $conn->prepare("
            SELECT 
                id,
                file_name,
                file_path,
                file_size,
                upload_date,
                status
            FROM student_cvs
            WHERE student_id = ?
            ORDER BY upload_date DESC
        ");
        
        $stmt->execute([$studentId]);
        $cvs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Format the response
        $formattedCVs = array_map(function($cv) {
            return [
                'id' => $cv['id'],
                'fileName' => $cv['file_name'],
                'filePath' => $cv['file_path'],
                'fileSize' => (float)$cv['file_size'],
                'uploadDate' => $cv['upload_date'],
                'status' => $cv['status']
            ];
        }, $cvs);
        
        echo json_encode([
            "status" => "success",
            "data" => $formattedCVs
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Failed to fetch CVs: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed"
    ]);
}
?>
