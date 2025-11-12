<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../helpers/Response.php';

class RoleCarouselAPI {
    public function getRoles() {
        try {
            $roles = [
                [
                    "id" => "student",
                    "title" => "Student Portal",
                    "caption" => "Access your courses, grades, assignments, and academic resources. Stay connected with your learning journey.",
                    "image" => "/src/assets/student-role.png"
                ],
                [
                    "id" => "faculty",
                    "title" => "Faculty Portal",
                    "caption" => "Manage classes, track student progress, grade assignments, and collaborate with colleagues.",
                    "image" => "/src/assets/faculty-role.png"
                ],
                [
                    "id" => "hod",
                    "title" => "HOD Portal",
                    "caption" => "Full system access and administrative controls for department management and strategic decisions.",
                    "image" => "/src/assets/hod-role.png"
                ],
                [
                    "id" => "admin",
                    "title" => "Admin Portal",
                    "caption" => "System-wide administration and configuration management with complete control.",
                    "image" => "/src/assets/admin-role.png"
                ]
            ];

            $response = Response::success($roles, 'Roles fetched successfully');
            echo json_encode($response);
        } catch (Exception $e) {
            $response = Response::error($e->getMessage(), 500);
            echo json_encode($response);
        }
    }
}

$api = new RoleCarouselAPI();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $api->getRoles();
} else {
    $response = Response::error('Method not allowed', 405);
    echo json_encode($response);
}
?>
