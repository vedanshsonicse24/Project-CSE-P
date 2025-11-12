<?php
header("Access-Control-Allow-Origin: *");
include_once __DIR__ . "/../../../config/db_connect.php";

$semester = isset($_GET["semester"]) ? (int)$_GET["semester"] : null;
$section = $_GET["section"] ?? null;

$sql = "SELECT student_id, full_name, semester, section, email FROM students";
$cond = [];
$params = [];
$types = "";

if ($semester) { $cond[] = "semester = ?"; $params[] = $semester; $types .= "i"; }
if ($section) { $cond[] = "section = ?"; $params[] = $section; $types .= "s"; }

if ($cond) $sql .= " WHERE " . implode(" AND ", $cond);

$stmt = $conn->prepare($sql);
if ($params) $stmt->bind_param($types, @params);
$stmt->execute();
$res = $stmt->get_result();
$rows = [];
while ($r = $res->fetch_assoc()) $rows[] = $r;
echo json_encode(["success" => true, "students" => $rows]);
?>
