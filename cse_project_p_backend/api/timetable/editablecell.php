<?php
header("Content-Type: application/json");
include("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? null;
$subject_code = $data["subject_code"] ?? null;
$faculty_id = $data["faculty_id"] ?? null;

if (!$id || !$subject_code || !$faculty_id) {
    echo json_encode(array(
        "status" => "error",
        "message" => "Missing required fields: id, subject_code, or faculty_id"
    ));
    exit;
}

// ✅ Validate that subject_code exists
$checkSubject = $conn->query("SELECT code FROM subjects WHERE code='$subject_code'");
if ($checkSubject->num_rows === 0) {
    echo json_encode(array(
        "status" => "error",
        "message" => "Invalid subject_code '$subject_code' — not found in subjects table."
    ));
    exit;
}

// ✅ Validate that faculty_id exists
$checkFaculty = $conn->query("SELECT id FROM faculty WHERE id='$faculty_id'");
if ($checkFaculty->num_rows === 0) {
    echo json_encode(array(
        "status" => "error",
        "message" => "Invalid faculty_id '$faculty_id' — not found in faculty table."
    ));
    exit;
}

// ✅ Update timetable row
$sql = "UPDATE timetable 
        SET subject_code='$subject_code', faculty_id='$faculty_id', updated_at=NOW()
        WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(array(
        "status" => "success",
        "message" => "Timetable cell updated successfully"
    ));
} else {
    echo json_encode(array(
        "status" => "error",
        "message" => $conn->error
    ));
}
?>
