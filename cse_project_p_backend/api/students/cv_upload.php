<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
include_once(__DIR__ . "/../../config/db_connect.php");
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
    if (!isset($_GET['student_id'])) { echo json_encode(["status"=>"error","message"=>"Student ID required"]); exit; }
    $student_id = mysqli_real_escape_string($conn, $_GET['student_id']);
    $res = mysqli_query($conn, "SELECT id, filename, upload_date, file_size, file_type, file_path FROM cvs WHERE student_id='$student_id'");
    $data = [];
    while ($r = mysqli_fetch_assoc($res)) { $r['downloadUrl'] = 'http://localhost/cse_portal_backend/uploads/'.basename($r['file_path']); $data[] = $r; }
    echo json_encode(["status"=>"success","data"=>$data]); exit;
}
if ($method === 'POST') {
    if (!isset($_POST['student_id']) || !isset($_FILES['cv_file'])) { echo json_encode(["status"=>"error","message"=>"Missing data"]); exit; }
    $student_id = mysqli_real_escape_string($conn, $_POST['student_id']);
    $file = $_FILES['cv_file']; $allowed = ['pdf','doc','docx']; $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext,$allowed)) { echo json_encode(["status"=>"error","message"=>"Invalid file type"]); exit; }
    if ($file['size'] > 5*1024*1024) { echo json_encode(["status"=>"error","message"=>"File too large"]); exit; }
    $uploadDir = __DIR__ . "/../../uploads/"; if (!file_exists($uploadDir)) { mkdir($uploadDir,0777,true); }
    $fileName = uniqid('cv_',true).".$ext"; $filePath = $uploadDir.$fileName;
    if (move_uploaded_file($file['tmp_name'],$filePath)) {
        $sizeKB = round($file['size']/1024);
        mysqli_query($conn, "INSERT INTO cvs (student_id,filename,upload_date,file_size,file_type,file_path) VALUES ('$student_id','{$file['name']}',NOW(),'$sizeKB','$ext','$filePath')");
        echo json_encode(["status"=>"success","message"=>"File uploaded"]);
    } else { echo json_encode(["status"=>"error","message"=>"Upload failed"]); }
    exit;
}
if ($method === 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    if (!isset($_DELETE['id'])) { echo json_encode(["status"=>"error","message"=>"CV ID required"]); exit; }
    $id = mysqli_real_escape_string($conn, $_DELETE['id']);
    $res = mysqli_query($conn, "SELECT file_path FROM cvs WHERE id='$id'"); $row = mysqli_fetch_assoc($res);
    if ($row && file_exists($row['file_path'])) unlink($row['file_path']);
    $success = mysqli_query($conn, "DELETE FROM cvs WHERE id='$id'");
    echo json_encode(["status"=>$success?"success":"error"]); exit;
}
echo json_encode(["status"=>"error","message"=>"Invalid request"]);
?>
