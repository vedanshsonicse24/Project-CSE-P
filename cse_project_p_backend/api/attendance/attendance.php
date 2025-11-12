<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once("../../config/db_connect.php");

$conn = $conn; // Assuming $conn is from db_connect.php

// Handle POST request - Mark/Update Attendance
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from request body
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    // Validate required fields
    if (!isset($data['student_id']) || !isset($data['status']) || !isset($data['date'])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Missing required fields: student_id, status, date"
        ]);
        exit;
    }

    $student_id = mysqli_real_escape_string($conn, $data['student_id']);
    $status = mysqli_real_escape_string($conn, $data['status']);
    $date = mysqli_real_escape_string($conn, $data['date']);
    
    // Optional fields
    $subject_code = isset($data['subject_code']) ? mysqli_real_escape_string($conn, $data['subject_code']) : null;
    $period = isset($data['period']) ? intval($data['period']) : 1;
    $marked_by = isset($data['marked_by']) ? mysqli_real_escape_string($conn, $data['marked_by']) : null;

    // Validate status values
    $valid_statuses = ['Present', 'Absent', 'BOA', 'present', 'absent'];
    if (!in_array($status, $valid_statuses)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Invalid status. Must be 'present', 'absent', or 'BOA'"
        ]);
        exit;
    }

    // Normalize status to capitalize first letter
    $status = ucfirst(strtolower($status));

    // Check if student exists
    $check_student = "SELECT id FROM students WHERE id = '$student_id'";
    $student_result = mysqli_query($conn, $check_student);
    
    if (mysqli_num_rows($student_result) == 0) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Student not found"
        ]);
        exit;
    }

    // Check if attendance record already exists for this student, date, and period
    $check_query = "
        SELECT id FROM attendance_records 
        WHERE student_id = '$student_id' 
        AND date = '$date' 
        AND period = $period
    ";
    
    $check_result = mysqli_query($conn, $check_query);

    if (mysqli_num_rows($check_result) > 0) {
        // Update existing record
        $update_query = "
            UPDATE attendance_records 
            SET status = '$status',
                marked_at = NOW()
        ";
        
        if ($marked_by) {
            $update_query .= ", marked_by = '$marked_by'";
        }
        
        $update_query .= " WHERE student_id = '$student_id' AND date = '$date' AND period = $period";
        
        if (mysqli_query($conn, $update_query)) {
            echo json_encode([
                "success" => true,
                "message" => "Attendance updated successfully",
                "data" => [
                    "student_id" => $student_id,
                    "status" => $status,
                    "date" => $date,
                    "period" => $period,
                    "action" => "updated"
                ]
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Failed to update attendance",
                "error" => mysqli_error($conn)
            ]);
        }
    } else {
        // Insert new record
        $insert_query = "
            INSERT INTO attendance_records 
            (student_id, subject_code, date, period, status, marked_by, marked_at)
            VALUES ('$student_id', " . ($subject_code ? "'$subject_code'" : "NULL") . ", '$date', $period, '$status', " . ($marked_by ? "'$marked_by'" : "NULL") . ", NOW())
        ";
        
        if (mysqli_query($conn, $insert_query)) {
            echo json_encode([
                "success" => true,
                "message" => "Attendance marked successfully",
                "data" => [
                    "id" => mysqli_insert_id($conn),
                    "student_id" => $student_id,
                    "status" => $status,
                    "date" => $date,
                    "period" => $period,
                    "action" => "created"
                ]
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Failed to mark attendance",
                "error" => mysqli_error($conn)
            ]);
        }
    }
    exit;
}

// Handle GET request - Fetch Attendance Records
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // ✅ Correct query – matches your attendance_records table
    $query = "
        SELECT 
            ar.id,
            s.name AS student_name,
            ar.student_id,
            ar.subject_code,
            ar.timetable_id,
            ar.date,
            ar.period,
            ar.status,
            ar.marked_by,
            ar.marked_at
        FROM attendance_records ar
        LEFT JOIN students s ON ar.student_id = s.id
    ";

    $result = mysqli_query($conn, $query);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => mysqli_error($conn)]);
        exit;
    }

    $attendance = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $attendance[] = $row;
    }

    echo json_encode([
        "success" => true,
        "count" => count($attendance),
        "data" => $attendance
    ]);
    exit;
}

// Handle unsupported methods
http_response_code(405);
echo json_encode([
    "success" => false,
    "message" => "Method not allowed"
]);
?>
