<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once(__DIR__ . "/../../config/db_connect.php");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') { 
    echo json_encode(["status"=>"error","message"=>"Invalid request method"]); 
    exit; 
}

if (!isset($_GET['student_id'])) { 
    echo json_encode(["status"=>"error","message"=>"Student ID required"]); 
    exit; 
}

$student_id = mysqli_real_escape_string($conn, $_GET['student_id']);

$q = "SELECT s.subject AS subject,
             COUNT(a.id) AS total,
             SUM(CASE WHEN a.status='present' THEN 1 ELSE 0 END) AS attended,
             ROUND((SUM(CASE WHEN a.status='present' THEN 1 ELSE 0 END)/COUNT(a.id))*100,0) AS percentage,
             SUM(CASE WHEN a.is_boa=1 THEN 1 ELSE 0 END) AS benefitOfAttendance
      FROM attendance_records a 
      JOIN subjects s ON a.subject_id=s.id
      WHERE a.student_id='$student_id'
      GROUP BY s.subject";

$r = mysqli_query($conn, $q);

$sub = [];
$tot = 0;
$att = 0;
$boa = 0;

while ($row = mysqli_fetch_assoc($r)) {
    $sub[] = $row;
    $tot += $row['total'];
    $att += $row['attended'];
    $boa += $row['benefitOfAttendance'];
}

$p = $tot > 0 ? round(($att / $tot) * 100, 2) : 0;

echo json_encode([
    "status" => "success",
    "statsData" => [
        "totalClasses" => $tot,
        "attended" => $att,
        "percentage" => $p,
        "totalBenefitOfAttendance" => $boa
    ],
    "subjectData" => $sub
]);
?>
