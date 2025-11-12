<?php
/**
 * Labs API for Timetable Module
 * Manage labs/laboratories
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../helpers/Response.php';

class LabsAPI {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    /**
     * Get labs
     * GET /api/timetable/labs.php
     */
    public function getLabs() {
        try {
            $query = "SELECT l.*, f.full_name as in_charge_name, f.phone as in_charge_phone
                      FROM labs l
                      LEFT JOIN faculty f ON l.in_charge = f.id
                      ORDER BY l.name ASC";

            $labs = $this->db->getRows($query, '', []);

            if (isset($labs['error'])) {
                return Response::error($labs['error'], 500);
            }

            return Response::success($labs);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Create lab
     * POST /api/timetable/labs.php
     */
    public function createLab() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate required fields
            $required = ['code', 'name'];
            foreach ($required as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    return Response::error("Missing required field: $field", 400);
                }
            }

            // Check if lab code already exists
            $check = $this->db->getRow("SELECT code FROM labs WHERE code = ?", 's', [$data['code']]);
            if ($check) {
                return Response::error("Lab code already exists", 400);
            }

            $query = "INSERT INTO labs (code, name, in_charge) VALUES (?, ?, ?)";

            $result = $this->db->execute(
                $query,
                'sss',
                [
                    $data['code'],
                    $data['name'],
                    $data['in_charge'] ?? null
                ]
            );

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success(['message' => 'Lab created successfully', 'code' => $data['code']]);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Update lab
     * PUT /api/timetable/labs.php
     */
    public function updateLab() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            if (!isset($data['code'])) {
                return Response::error('Lab code is required', 400);
            }

            $updates = [];
            $params = [];
            $types = '';

            $allowedFields = ['name', 'in_charge'];

            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $updates[] = "$field = ?";
                    $params[] = $data[$field];
                    $types .= 's';
                }
            }

            if (empty($updates)) {
                return Response::error('No fields to update', 400);
            }

            $params[] = $data['code'];
            $types .= 's';

            $query = "UPDATE labs SET " . implode(', ', $updates) . " WHERE code = ?";

            $result = $this->db->execute($query, $types, $params);

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success(['message' => 'Lab updated successfully']);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Delete lab
     * DELETE /api/timetable/labs.php?code=LAB01
     */
    public function deleteLab() {
        try {
            $code = isset($_GET['code']) ? $_GET['code'] : null;

            if (!$code) {
                return Response::error('Lab code is required', 400);
            }

            $query = "DELETE FROM labs WHERE code = ?";
            $result = $this->db->execute($query, 's', [$code]);

            if (isset($result['error'])) {
                return Response::error($result['error'], 500);
            }

            return Response::success(['message' => 'Lab deleted successfully']);
        } catch (Exception $e) {
            return Response::error($e->getMessage(), 500);
        }
    }

    /**
     * Route requests
     */
    public function route() {
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case 'GET':
                return $this->getLabs();
            case 'POST':
                return $this->createLab();
            case 'PUT':
                return $this->updateLab();
            case 'DELETE':
                return $this->deleteLab();
            default:
                return Response::error('Method not allowed', 405);
        }
    }
}

// Execute
$api = new LabsAPI();
echo json_encode($api->route());
?>
