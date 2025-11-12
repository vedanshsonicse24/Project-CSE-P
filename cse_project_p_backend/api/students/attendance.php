<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once(__DIR__ . "/../../config/db_connect.php");

$result = mysqli_query($conn, "
    SELECT 
        ar.id,
        s.name AS student_name,
        ar.subject_code,
        ar.timetable_id,
        ar.date,
        ar.period,
        ar.status,
        ar.marked_by,
        ar.marked_at
    FROM attendance_records ar
    JOIN students s ON ar.student_id = s.id
");

if (!$result) {
    echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    exit;
}

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode(["status" => "success", "attendance" => $data]);
?>
