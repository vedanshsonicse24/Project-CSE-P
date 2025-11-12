<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Database connection
require_once __DIR__ . '/../../config/database.php';

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    try {
        // Get form data from POST parameters (not JSON since we're using FormData)
        $required = ["eventName", "eventDate", "organizingDept", "teacherInCharge", "studentName", "branch", "semester", "rollNo", "section", "date", "numLectures", "classInCharge", "submissionDate"];

        $missing = [];
        foreach ($required as $field) {
            if (empty($_POST[$field])) {
                $missing[] = $field;
            }
        }

        if (!empty($missing)) {
            echo json_encode(["status" => "error", "message" => "Missing fields", "missing" => $missing]);
            exit;
        }

        // Handle file uploads
        $uploadedPhotos = [];
        $uploadDir = __DIR__ . '/../../uploads/boa/';
        
        // Create upload directory if it doesn't exist
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (isset($_FILES['eventPhotos']) && !empty($_FILES['eventPhotos']['name'][0])) {
            $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
            $maxFileSize = 1048576; // 1MB in bytes

            foreach ($_FILES['eventPhotos']['tmp_name'] as $key => $tmpName) {
                if ($_FILES['eventPhotos']['error'][$key] === UPLOAD_ERR_OK) {
                    $fileType = $_FILES['eventPhotos']['type'][$key];
                    $fileSize = $_FILES['eventPhotos']['size'][$key];
                    $fileName = $_FILES['eventPhotos']['name'][$key];

                    // Validate file type
                    if (!in_array($fileType, $allowedTypes)) {
                        echo json_encode(["status" => "error", "message" => "Invalid file type. Only JPG, PNG, and GIF allowed."]);
                        exit;
                    }

                    // Validate file size
                    if ($fileSize > $maxFileSize) {
                        echo json_encode(["status" => "error", "message" => "File size exceeds 1MB limit."]);
                        exit;
                    }

                    // Generate unique filename
                    $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
                    $uniqueFileName = 'boa_' . time() . '_' . $key . '.' . $fileExt;
                    $targetPath = $uploadDir . $uniqueFileName;

                    // Move uploaded file
                    if (move_uploaded_file($tmpName, $targetPath)) {
                        $uploadedPhotos[] = 'uploads/boa/' . $uniqueFileName;
                    } else {
                        echo json_encode(["status" => "error", "message" => "Failed to upload file: " . $fileName]);
                        exit;
                    }
                }
            }
        }

        // Generate unique BOA request ID
        $requestId = "BOA" . strtoupper(uniqid());

        // Get student_id from roll number
        $conn = getDBConnection();
        $stmtStudent = $conn->prepare("SELECT id FROM students WHERE roll = ?");
        $stmtStudent->execute([$_POST['rollNo']]);
        $student = $stmtStudent->fetch(PDO::FETCH_ASSOC);
        
        if (!$student) {
            throw new Exception("Student not found with roll number: " . $_POST['rollNo']);
        }
        
        $studentId = $student['id'];

        // Insert into database with dual approval status
        $stmt = $conn->prepare("INSERT INTO boa_requests (
            id, student_id, event_name, event_date_from, event_date_to, 
            organizing_dept, teacher_in_charge, num_theory_lectures, num_practical_lectures,
            branch, semester, section, class_in_charge, submission_date, 
            status, hod_approval_status, class_incharge_approval_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', 'Pending', 'Pending')");
        
        // Split numLectures if you want, or use as theory lectures
        $stmt->execute([
            $requestId,
            $studentId,
            $_POST['eventName'],
            $_POST['eventDate'],
            $_POST['eventDate'], // Using same date for from/to
            $_POST['organizingDept'],
            $_POST['teacherInCharge'],
            $_POST['numLectures'], // theory lectures
            0, // practical lectures (set to 0 for now)
            $_POST['branch'],
            $_POST['semester'],
            $_POST['section'],
            $_POST['classInCharge'],
            $_POST['submissionDate']
        ]);
        
        // Insert event photos into separate table
        if (!empty($uploadedPhotos)) {
            $stmtPhoto = $conn->prepare("INSERT INTO boa_event_photos (boa_request_id, photo_url) VALUES (?, ?)");
            foreach ($uploadedPhotos as $photoPath) {
                $stmtPhoto->execute([$requestId, $photoPath]);
            }
        }

        echo json_encode([
            "status" => "success", 
            "message" => "BOA request submitted successfully", 
            "data" => [
                "id" => $requestId,
                "eventPhotos" => $uploadedPhotos
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
    echo json_encode(["error" => "Method not allowed"]);
}
?>
