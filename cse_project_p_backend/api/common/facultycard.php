<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Include database connection
require_once __DIR__ . '/../../config/database.php';

try {
    $conn = getDBConnection();
    
    // If a GET request with ?name=... is provided, return a single record
    if (isset($_GET['name'])) {
        $name = trim($_GET['name']);
        
        $stmt = $conn->prepare("SELECT 
            full_name as name, 
            designation as title, 
            department,
            CONCAT('http://localhost/cse_portal_backend/uploads/faculty/', id, '.jpg') as image,
            (designation = 'HOD') as isHOD
            FROM faculty 
            WHERE full_name LIKE ?
            LIMIT 1
        ");
        
        $stmt->execute(["%$name%"]);
        $faculty = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($faculty) {
            // Convert isHOD to boolean
            $faculty['isHOD'] = (bool)$faculty['isHOD'];
            echo json_encode($faculty, JSON_PRETTY_PRINT);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Faculty not found"]);
        }
        exit;
    }
    
    // If GET request with ?id=... is provided
    if (isset($_GET['id'])) {
        $id = trim($_GET['id']);
        
        $stmt = $conn->prepare("SELECT 
            full_name as name, 
            designation as title, 
            department,
            CONCAT('http://localhost/cse_portal_backend/uploads/faculty/', id, '.jpg') as image,
            (designation = 'HOD') as isHOD
            FROM faculty 
            WHERE id = ?
        ");
        
        $stmt->execute([$id]);
        $faculty = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($faculty) {
            $faculty['isHOD'] = (bool)$faculty['isHOD'];
            echo json_encode($faculty, JSON_PRETTY_PRINT);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Faculty not found"]);
        }
        exit;
    }
    
    // Default: return all faculty
    $stmt = $conn->query("SELECT 
        id,
        full_name as name, 
        designation as title, 
        department,
        CONCAT('http://localhost/cse_portal_backend/uploads/faculty/', id, '.jpg') as image,
        (designation = 'HOD') as isHOD
        FROM faculty 
        ORDER BY 
            CASE designation 
                WHEN 'HOD' THEN 1
                WHEN 'Professor' THEN 2
                WHEN 'Associate Professor' THEN 3
                WHEN 'Assistant Professor' THEN 4
                ELSE 5
            END,
            full_name
    ");
    
    $faculty = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Convert isHOD to boolean for all records
    $faculty = array_map(function($f) {
        $f['isHOD'] = (bool)$f['isHOD'];
        return $f;
    }, $faculty);
    
    echo json_encode([
        "status" => "success",
        "data" => $faculty
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
