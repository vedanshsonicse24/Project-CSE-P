<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once("../../config/db_connect.php");

$conn = $conn; // Assuming $conn is from db_connect.php

// ✅ Correct query – matches your 'attendance_records' table structure
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
?>
