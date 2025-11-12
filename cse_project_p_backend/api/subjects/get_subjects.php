<?php
header("Access-Control-Allow-Origin: *");
include_once __DIR__ . "/../../../config/db_connect.php";

$res = $conn->query("SELECT subject_code, subject_name, semester, credits FROM subjects ORDER BY subject_name");
$data = [];
while ($r = $res->fetch_assoc()) $data[] = $r;
echo json_encode(["success" => true, "subjects" => $data]);
?>
