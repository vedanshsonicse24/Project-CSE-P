<?php
/**
 * Image With Fallback API
 * Fetches profile images from database with fallback support
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/Database.php';
require_once '../helpers/Response.php';

class ImageAPI {
    private $db;
    private $conn;
    
    // Fallback base64 SVG
    private $fallbackSvg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->connect();
    }

    /**
     * Get faculty profile image
     * GET /api/figma/imagewithfallback.php?type=faculty&id=FAC001
     */
    public function getFacultyImage() {
        try {
            $facultyId = $_GET['id'] ?? null;

            if (!$facultyId) {
                return Response::error('Faculty ID is required', 400);
            }

            $query = "SELECT id, full_name, profile_picture FROM users 
                     WHERE id = (SELECT user_id FROM faculty WHERE id = ?)";
            
            $result = $this->db->getRow($query, 's', [$facultyId]);

            if (isset($result['error'])) {
                return Response::error('Database error: ' . $result['error'], 500);
            }

            if (!$result) {
                return Response::success([
                    'image_url' => null,
                    'fallback' => $this->fallbackSvg,
                    'message' => 'Faculty not found, using fallback'
                ]);
            }

            // Check if profile picture exists and is valid
            if (!empty($result['profile_picture'])) {
                // If it's a base64 data URL, return as is
                if (strpos($result['profile_picture'], 'data:image') === 0) {
                    return Response::success([
                        'image_url' => $result['profile_picture'],
                        'fallback' => $this->fallbackSvg,
                        'name' => $result['full_name']
                    ]);
                }
                
                // If it's a file path, construct full URL
                $imageUrl = 'http://localhost/cse_portal_backend/uploads/faculty/' . $result['profile_picture'];
                
                return Response::success([
                    'image_url' => $imageUrl,
                    'fallback' => $this->fallbackSvg,
                    'name' => $result['full_name']
                ]);
            }

            // No profile picture, return fallback
            return Response::success([
                'image_url' => null,
                'fallback' => $this->fallbackSvg,
                'name' => $result['full_name'],
                'message' => 'No profile picture set'
            ]);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Get student profile image
     * GET /api/figma/imagewithfallback.php?type=student&id=STU001
     */
    public function getStudentImage() {
        try {
            $studentId = $_GET['id'] ?? null;

            if (!$studentId) {
                return Response::error('Student ID is required', 400);
            }

            $query = "SELECT id, full_name, profile_picture FROM users 
                     WHERE id = (SELECT user_id FROM students WHERE id = ?)";
            
            $result = $this->db->getRow($query, 's', [$studentId]);

            if (isset($result['error'])) {
                return Response::error('Database error: ' . $result['error'], 500);
            }

            if (!$result) {
                return Response::success([
                    'image_url' => null,
                    'fallback' => $this->fallbackSvg,
                    'message' => 'Student not found, using fallback'
                ]);
            }

            if (!empty($result['profile_picture'])) {
                // If it's a base64 data URL, return as is
                if (strpos($result['profile_picture'], 'data:image') === 0) {
                    return Response::success([
                        'image_url' => $result['profile_picture'],
                        'fallback' => $this->fallbackSvg,
                        'name' => $result['full_name']
                    ]);
                }
                
                // If it's a file path, construct full URL
                $imageUrl = 'http://localhost/cse_portal_backend/uploads/students/' . $result['profile_picture'];
                
                return Response::success([
                    'image_url' => $imageUrl,
                    'fallback' => $this->fallbackSvg,
                    'name' => $result['full_name']
                ]);
            }

            return Response::success([
                'image_url' => null,
                'fallback' => $this->fallbackSvg,
                'name' => $result['full_name'],
                'message' => 'No profile picture set'
            ]);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Validate external image URL
     * GET /api/figma/imagewithfallback.php?action=validate&url=http://...
     */
    public function validateImageUrl() {
        try {
            $url = $_GET['url'] ?? null;

            if (!$url) {
                return Response::error('Image URL is required', 400);
            }

            // Validate URL format
            if (!filter_var($url, FILTER_VALIDATE_URL)) {
                return Response::error('Invalid URL format', 400);
            }

            // Try to fetch headers to check if image exists
            $headers = @get_headers($url);
            
            if ($headers && strpos($headers[0], '200') !== false) {
                // Check if it's an image
                $contentType = '';
                foreach ($headers as $header) {
                    if (stripos($header, 'Content-Type:') !== false) {
                        $contentType = $header;
                        break;
                    }
                }

                $isImage = stripos($contentType, 'image/') !== false;

                return Response::success([
                    'valid' => true,
                    'is_image' => $isImage,
                    'url' => $url,
                    'content_type' => $contentType
                ]);
            }

            return Response::success([
                'valid' => false,
                'fallback' => $this->fallbackSvg,
                'message' => 'Image not reachable'
            ]);

        } catch (Exception $e) {
            return Response::serverError($e->getMessage());
        }
    }

    /**
     * Route requests
     */
    public function route() {
        $type = $_GET['type'] ?? 'faculty';
        $action = $_GET['action'] ?? 'get';

        if ($action === 'validate') {
            return $this->validateImageUrl();
        }

        switch ($type) {
            case 'faculty':
                return $this->getFacultyImage();
            case 'student':
                return $this->getStudentImage();
            default:
                return Response::error('Invalid type. Use faculty or student', 400);
        }
    }
}

// Execute
$api = new ImageAPI();
echo json_encode($api->route());
?>
