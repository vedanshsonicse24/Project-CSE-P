<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once(__DIR__ . "/../../config/db_connect.php");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // ✅ Fetch all HOD/faculty profiles
    $query = "
        SELECT 
            id,
            full_name AS name,
            designation,
            department,
            email,
            phone,
            date_of_birth,
            gender,
            qualification,
            specialization,
            phd_status,
            join_date,
            years_of_experience,
            research_interest,
            office_location,
            office_hours,
            mentor_for,
            total_mentees
        FROM faculty
    ";

    $result = mysqli_query($conn, $query);

    if (!$result) {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
        exit;
    }

    $profiles = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $profiles[] = $row;
    }

    echo json_encode(["status" => "success", "profiles" => $profiles]);
    exit;
}

if ($method === 'POST') {
    // ✅ Update or insert profile info
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id']) || !isset($data['full_name'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    $id = mysqli_real_escape_string($conn, $data['id']);
    $name = mysqli_real_escape_string($conn, $data['full_name']);
    $email = mysqli_real_escape_string($conn, $data['email'] ?? '');
    $phone = mysqli_real_escape_string($conn, $data['phone'] ?? '');
    $department = mysqli_real_escape_string($conn, $data['department'] ?? '');
    $designation = mysqli_real_escape_string($conn, $data['designation'] ?? '');

    $query = "
        UPDATE faculty 
        SET 
            full_name = '$name',
            email = '$email',
            phone = '$phone',
            department = '$department',
            designation = '$designation',
            updated_at = CURRENT_TIMESTAMP
        WHERE id = '$id'
    ";

    $success = mysqli_query($conn, $query);

    echo json_encode([
        "status" => $success ? "success" : "error",
        "message" => $success ? "Profile updated successfully" : mysqli_error($conn)
    ]);
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid request"]);
?>
