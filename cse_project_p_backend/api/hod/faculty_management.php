<?php
/**
 * HOD Faculty Management API
 * Handles faculty-related operations for HOD Dashboard
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration - Update these to match your setup
$db_host = 'localhost';
$db_name = 'cse_portal_database';
$db_user = 'root';
$db_pass = '';

/**
 * Get database connection
 */
function getDBConnection() {
    global $db_host, $db_name, $db_user, $db_pass;
    
    try {
        $conn = new PDO(
            "mysql:host=" . $db_host . ";dbname=" . $db_name . ";charset=utf8mb4",
            $db_user,
            $db_pass,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $conn;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed',
            'error' => $e->getMessage()
        ]);
        exit();
    }
}

/**
 * Send JSON response
 */
function sendResponse($success, $message, $data = null, $httpCode = 200) {
    http_response_code($httpCode);
    $response = [
        'success' => $success,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    echo json_encode($response, JSON_PRETTY_PRINT);
    exit();
}

/**
 * Get request JSON data
 */
function getRequestData() {
    $data = json_decode(file_get_contents('php://input'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendResponse(false, 'Invalid JSON data', null, 400);
    }
    return $data;
}

/**
 * Generate unique faculty ID
 */
function generateFacultyId($conn) {
    // Get all faculty IDs that match the FAC### pattern
    $stmt = $conn->query("SELECT id FROM faculty WHERE id REGEXP '^FAC[0-9]{3}$' ORDER BY id DESC");
    $faculties = $stmt->fetchAll();
    
    if (!empty($faculties)) {
        // Find the highest numeric ID
        $maxId = 0;
        foreach ($faculties as $faculty) {
            $numericPart = intval(substr($faculty['id'], 3));
            if ($numericPart > $maxId) {
                $maxId = $numericPart;
            }
        }
        $newId = 'FAC' . str_pad($maxId + 1, 3, '0', STR_PAD_LEFT);
    } else {
        $newId = 'FAC001';
    }
    
    // Double-check if ID exists (safety check)
    $checkStmt = $conn->prepare("SELECT id FROM faculty WHERE id = ?");
    $checkStmt->execute([$newId]);
    
    // If somehow it still exists, generate a unique one with timestamp
    if ($checkStmt->fetch()) {
        $newId = 'FAC_' . uniqid();
    }
    
    return $newId;
}

/**
 * Generate unique user ID
 */
function generateUserId($conn) {
    $stmt = $conn->query("SELECT id FROM users ORDER BY id DESC LIMIT 1");
    $lastUser = $stmt->fetch();
    
    if ($lastUser && preg_match('/^faculty(\d+)$/', $lastUser['id'], $matches)) {
        $lastId = intval($matches[1]);
        $newId = 'faculty' . ($lastId + 1);
    } else {
        $stmt = $conn->query("SELECT COUNT(*) as count FROM users WHERE role = 'faculty'");
        $count = $stmt->fetch();
        $newId = 'faculty' . ($count['count'] + 1);
    }
    
    return $newId;
}

// Route handling
$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

try {
    $conn = getDBConnection();
    
    switch ($method) {
        case 'GET':
            if ($action === 'list' || $action === '') {
                // Get all faculty members
                handleGetFacultyList($conn);
            } elseif ($action === 'stats') {
                // Get faculty statistics
                handleGetFacultyStats($conn);
            } elseif ($action === 'workload') {
                // Get workload distribution
                handleGetWorkloadDistribution($conn);
            } elseif ($action === 'leaves') {
                // Get faculty leave calendar
                handleGetLeaveCalendar($conn);
            } else {
                sendResponse(false, 'Invalid action', null, 400);
            }
            break;
            
        case 'POST':
            if ($action === 'add') {
                // Add new faculty
                handleAddFaculty($conn);
            } else {
                sendResponse(false, 'Invalid action', null, 400);
            }
            break;
            
        case 'PUT':
            if ($action === 'update') {
                // Update faculty details
                handleUpdateFaculty($conn);
            } else {
                sendResponse(false, 'Invalid action', null, 400);
            }
            break;
            
        case 'DELETE':
            if ($action === 'remove') {
                // Remove faculty
                handleRemoveFaculty($conn);
            } else {
                sendResponse(false, 'Invalid action', null, 400);
            }
            break;
            
        default:
            sendResponse(false, 'Method not allowed', null, 405);
    }
    
} catch (Exception $e) {
    sendResponse(false, 'Server error occurred', ['error' => $e->getMessage()], 500);
}

/**
 * Get faculty list
 */
function handleGetFacultyList($conn) {
    try {
        $query = "
            SELECT 
                f.id,
                f.full_name as name,
                f.designation,
                f.email,
                f.phone,
                f.department,
                f.qualification,
                f.specialization,
                f.years_of_experience as experience,
                f.total_mentees as mentees,
                f.phd_status,
                f.join_date,
                COUNT(DISTINCT t.id) as classes
            FROM faculty f
            LEFT JOIN timetable t ON f.id = t.faculty_id
            WHERE f.department = 'Computer Science'
            GROUP BY f.id
            ORDER BY f.designation, f.full_name
        ";
        
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $faculty = $stmt->fetchAll();
        
        sendResponse(true, 'Faculty list retrieved successfully', [
            'faculty' => $faculty,
            'total_count' => count($faculty)
        ]);
        
    } catch (PDOException $e) {
        sendResponse(false, 'Database error', ['error' => $e->getMessage()], 500);
    }
}

/**
 * Get faculty statistics
 */
function handleGetFacultyStats($conn) {
    try {
        $stats = [];
        
        // Total faculty count
        $stmt = $conn->query("SELECT COUNT(*) as total FROM faculty WHERE department = 'Computer Science'");
        $stats['total_faculty'] = $stmt->fetch()['total'];
        
        // Faculty by designation
        $stmt = $conn->query("
            SELECT designation, COUNT(*) as count 
            FROM faculty 
            WHERE department = 'Computer Science'
            GROUP BY designation
        ");
        $stats['by_designation'] = $stmt->fetchAll();
        
        // Average experience
        $stmt = $conn->query("
            SELECT AVG(years_of_experience) as avg_experience 
            FROM faculty 
            WHERE department = 'Computer Science'
        ");
        $stats['avg_experience'] = round($stmt->fetch()['avg_experience'], 1);
        
        // PhD holders
        $stmt = $conn->query("
            SELECT COUNT(*) as phd_count 
            FROM faculty 
            WHERE department = 'Computer Science' AND phd_status = 'Completed'
        ");
        $stats['phd_holders'] = $stmt->fetch()['phd_count'];
        
        sendResponse(true, 'Faculty statistics retrieved successfully', $stats);
        
    } catch (PDOException $e) {
        sendResponse(false, 'Database error', ['error' => $e->getMessage()], 500);
    }
}

/**
 * Get workload distribution
 */
function handleGetWorkloadDistribution($conn) {
    try {
        $query = "
            SELECT 
                f.id,
                f.full_name as name,
                COUNT(DISTINCT t.id) as classes,
                f.total_mentees as mentees,
                (COUNT(DISTINCT t.id) + f.total_mentees) as total_workload
            FROM faculty f
            LEFT JOIN timetable t ON f.id = t.faculty_id
            WHERE f.department = 'Computer Science'
            GROUP BY f.id
            ORDER BY total_workload DESC
        ";
        
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $workload = $stmt->fetchAll();
        
        sendResponse(true, 'Workload distribution retrieved successfully', [
            'workload' => $workload
        ]);
        
    } catch (PDOException $e) {
        sendResponse(false, 'Database error', ['error' => $e->getMessage()], 500);
    }
}

/**
 * Get leave calendar
 */
function handleGetLeaveCalendar($conn) {
    try {
        // This is a placeholder - you'll need to create a faculty_leaves table
        // For now, returning empty array
        $leaves = [];
        
        sendResponse(true, 'Leave calendar retrieved successfully', [
            'leaves' => $leaves
        ]);
        
    } catch (PDOException $e) {
        sendResponse(false, 'Database error', ['error' => $e->getMessage()], 500);
    }
}

/**
 * Add new faculty member
 */
function handleAddFaculty($conn) {
    try {
        $data = getRequestData();
        
        // Validate required fields
        $requiredFields = ['name', 'designation', 'email', 'phone'];
        $missingFields = [];
        
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty(trim($data[$field]))) {
                $missingFields[] = $field;
            }
        }
        
        if (!empty($missingFields)) {
            sendResponse(false, 'Missing required fields: ' . implode(', ', $missingFields), null, 400);
        }
        
        // Validate email format
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            sendResponse(false, 'Invalid email format', null, 400);
        }
        
        // Validate phone number (basic validation)
        $phone = preg_replace('/[^0-9]/', '', $data['phone']);
        if (strlen($phone) != 10) {
            sendResponse(false, 'Invalid phone number. Must be 10 digits', null, 400);
        }
        
        // Check if email already exists
        $stmt = $conn->prepare("SELECT id FROM faculty WHERE email = ?");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            sendResponse(false, 'Email already exists', null, 409);
        }
        
        // Begin transaction
        $conn->beginTransaction();
        
        try {
            // Generate IDs
            $facultyId = generateFacultyId($conn);
            $userId = generateUserId($conn);
            
            // Set default values
            $department = 'Computer Science';
            $dateOfBirth = isset($data['date_of_birth']) ? $data['date_of_birth'] : '1990-01-01';
            $gender = isset($data['gender']) ? $data['gender'] : 'Male';
            $qualification = isset($data['qualification']) ? $data['qualification'] : 'M.Tech';
            $specialization = isset($data['specialization']) ? $data['specialization'] : '';
            $joinDate = isset($data['join_date']) ? $data['join_date'] : date('Y-m-d');
            $phdStatus = isset($data['phd_status']) ? $data['phd_status'] : 'Not Applicable';
            $experience = isset($data['experience']) ? intval($data['experience']) : 0;
            
            // Create user account
            $defaultPassword = password_hash('password123', PASSWORD_BCRYPT);
            
            $userStmt = $conn->prepare("
                INSERT INTO users (id, email, password_hash, role, full_name, is_active)
                VALUES (?, ?, ?, 'faculty', ?, TRUE)
            ");
            $userStmt->execute([
                $userId,
                $data['email'],
                $defaultPassword,
                $data['name']
            ]);
            
            // Insert faculty record
            $facultyStmt = $conn->prepare("
                INSERT INTO faculty (
                    id, user_id, full_name, designation, department, 
                    email, phone, date_of_birth, gender, qualification, 
                    specialization, join_date, phd_status, years_of_experience
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $facultyStmt->execute([
                $facultyId,
                $userId,
                $data['name'],
                $data['designation'],
                $department,
                $data['email'],
                $data['phone'],
                $dateOfBirth,
                $gender,
                $qualification,
                $specialization,
                $joinDate,
                $phdStatus,
                $experience
            ]);
            
            $conn->commit();
            
            sendResponse(true, 'Faculty added successfully', [
                'faculty_id' => $facultyId,
                'user_id' => $userId,
                'name' => $data['name'],
                'email' => $data['email'],
                'designation' => $data['designation'],
                'default_password' => 'password123'
            ], 201);
            
        } catch (Exception $e) {
            $conn->rollBack();
            throw $e;
        }
        
    } catch (PDOException $e) {
        sendResponse(false, 'Database error', ['error' => $e->getMessage()], 500);
    }
}

/**
 * Update faculty details
 */
function handleUpdateFaculty($conn) {
    try {
        $data = getRequestData();
        
        if (!isset($data['faculty_id']) || empty($data['faculty_id'])) {
            sendResponse(false, 'Faculty ID is required', null, 400);
        }
        
        $facultyId = $data['faculty_id'];
        
        // Check if faculty exists
        $stmt = $conn->prepare("SELECT id FROM faculty WHERE id = ?");
        $stmt->execute([$facultyId]);
        if (!$stmt->fetch()) {
            sendResponse(false, 'Faculty not found', null, 404);
        }
        
        // Build update query dynamically
        $updateFields = [];
        $params = [];
        
        $allowedFields = [
            'full_name', 'designation', 'email', 'phone', 
            'qualification', 'specialization', 'years_of_experience'
        ];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field]) && !empty($data[$field])) {
                $updateFields[] = "$field = ?";
                $params[] = $data[$field];
            }
        }
        
        if (empty($updateFields)) {
            sendResponse(false, 'No fields to update', null, 400);
        }
        
        $params[] = $facultyId;
        $query = "UPDATE faculty SET " . implode(', ', $updateFields) . " WHERE id = ?";
        
        $stmt = $conn->prepare($query);
        $stmt->execute($params);
        
        sendResponse(true, 'Faculty updated successfully', [
            'faculty_id' => $facultyId,
            'updated_fields' => array_keys(array_filter($data, function($key) use ($allowedFields) {
                return in_array($key, $allowedFields);
            }, ARRAY_FILTER_USE_KEY))
        ]);
        
    } catch (PDOException $e) {
        sendResponse(false, 'Database error', ['error' => $e->getMessage()], 500);
    }
}

/**
 * Remove faculty member
 */
function handleRemoveFaculty($conn) {
    try {
        $facultyId = isset($_GET['faculty_id']) ? $_GET['faculty_id'] : null;
        
        if (!$facultyId) {
            sendResponse(false, 'Faculty ID is required', null, 400);
        }
        
        // Check if faculty exists
        $stmt = $conn->prepare("SELECT user_id, full_name FROM faculty WHERE id = ?");
        $stmt->execute([$facultyId]);
        $faculty = $stmt->fetch();
        
        if (!$faculty) {
            sendResponse(false, 'Faculty not found', null, 404);
        }
        
        $conn->beginTransaction();
        
        try {
            // Delete faculty record
            $stmt = $conn->prepare("DELETE FROM faculty WHERE id = ?");
            $stmt->execute([$facultyId]);
            
            // Delete user account if exists
            if ($faculty['user_id']) {
                $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
                $stmt->execute([$faculty['user_id']]);
            }
            
            $conn->commit();
            
            sendResponse(true, 'Faculty removed successfully', [
                'faculty_id' => $facultyId,
                'faculty_name' => $faculty['full_name']
            ]);
            
        } catch (Exception $e) {
            $conn->rollBack();
            throw $e;
        }
        
    } catch (PDOException $e) {
        sendResponse(false, 'Database error', ['error' => $e->getMessage()], 500);
    }
}
?>
