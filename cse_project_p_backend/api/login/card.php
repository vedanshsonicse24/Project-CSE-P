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

class CardAPI {
    public function getCardConfig() {
        try {
            $cardData = [
                "institution" => "Shri Shankaracharya Institute of Professional Management and Technology",
                "logo" => "/src/assets/logo.png",
                "backgroundImage" => "/src/assets/building.png",
                "department" => "Computer Science & Engineering",
                "portalName" => "CSE Portal"
            ];

            $response = Response::success($cardData, 'Card configuration fetched successfully');
            echo json_encode($response);
        } catch (Exception $e) {
            $response = Response::error($e->getMessage(), 500);
            echo json_encode($response);
        }
    }
}

$api = new CardAPI();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $api->getCardConfig();
} else {
    $response = Response::error('Method not allowed', 405);
    echo json_encode($response);
}
?>
