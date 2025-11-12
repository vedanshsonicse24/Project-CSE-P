<?php
/**
 * Student CV Upload API
 * Handles CV file upload and storage
 */

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/database.php';

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    try {
        // Validate required fields
        if (!isset($_POST['rollNo'])) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Roll number is required"
            ]);
            exit();
        }

        // Validate file upload
        if (!isset($_FILES['cv']) || $_FILES['cv']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "No file uploaded or upload error"
            ]);
            exit();
        }

        $rollNo = $_POST['rollNo'];
        $file = $_FILES['cv'];
        
        // Validate file type
        $allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        $fileType = $file['type'];
        
        if (!in_array($fileType, $allowedTypes)) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Invalid file type. Only PDF, DOC, and DOCX files are allowed."
            ]);
            exit();
        }
        
        // Validate file size (5MB max)
        $maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if ($file['size'] > $maxSize) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "File size exceeds 5MB limit"
            ]);
            exit();
        }

        $conn = getDBConnection();
        
        // Get student_id from roll number
        $stmtStudent = $conn->prepare("SELECT id, name FROM students WHERE roll = ?");
        $stmtStudent->execute([$rollNo]);
        $student = $stmtStudent->fetch(PDO::FETCH_ASSOC);
        
        if (!$student) {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "Student not found with roll number: " . $rollNo
            ]);
            exit();
        }
        
        $studentId = $student['id'];
        $studentName = $student['name'];
        
        // Create upload directory if it doesn't exist
        $uploadDir = __DIR__ . '/../../uploads/cvs/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        // Generate unique filename
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileName = 'CV_' . $rollNo . '_' . date('YmdHis') . '.' . $fileExtension;
        $filePath = $uploadDir . $fileName;
        $relativePath = 'uploads/cvs/' . $fileName;
        
        // Move uploaded file
        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            throw new Exception("Failed to save uploaded file");
        }
        
        // Get file size in MB
        $fileSizeMB = round($file['size'] / (1024 * 1024), 2);
        
        // Insert CV record into database
        $stmt = $conn->prepare("
            INSERT INTO student_cvs (
                student_id, 
                file_name, 
                file_path, 
                file_size, 
                upload_date,
                status
            ) VALUES (?, ?, ?, ?, NOW(), 'Approved')
        ");
        
        $stmt->execute([
            $studentId,
            $fileName,
            $relativePath,
            $fileSizeMB
        ]);
        
        $cvId = $conn->lastInsertId();
        
        echo json_encode([
            "status" => "success",
            "message" => "CV uploaded successfully",
            "data" => [
                "id" => $cvId,
                "fileName" => $fileName,
                "filePath" => $relativePath,
                "fileSize" => $fileSizeMB,
                "uploadDate" => date('Y-m-d H:i:s'),
                "status" => "Approved"
            ]
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Upload failed: " . $e->getMessage()
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
