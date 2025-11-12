<?php
// Allow API access from anywhere (for Postman, frontend, etc.)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

/*
Original React/TypeScript Component: StatsCard.tsx
---------------------------------------------------
This PHP version returns JSON-formatted statistics data
that can be fetched and displayed dynamically in the frontend.
*/

// Database connection
require_once __DIR__ . '/../../config/database.php';

try {
    $conn = getDBConnection();
    
    // Fetch real-time stats from database
    $statsData = [];
    
    // Total Students
    $stmt = $conn->query("SELECT COUNT(*) as count FROM students WHERE user_id IS NOT NULL");
    $totalStudents = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    $statsData[] = [
        "title" => "Total Students",
        "value" => (int)$totalStudents,
        "icon" => "user-graduate",
        "bgColor" => "blue",
        "iconColor" => "#1e3a8a"
    ];
    
    // Active Faculty
    $stmt = $conn->query("SELECT COUNT(*) as count FROM faculty WHERE user_id IS NOT NULL");
    $totalFaculty = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    $statsData[] = [
        "title" => "Active Faculty",
        "value" => (int)$totalFaculty,
        "icon" => "chalkboard-teacher",
        "bgColor" => "green",
        "iconColor" => "#15803d"
    ];
    
    // Courses Offered (Subjects)
    $stmt = $conn->query("SELECT COUNT(DISTINCT code) as count FROM subjects");
    $totalCourses = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    $statsData[] = [
        "title" => "Courses Offered",
        "value" => (int)$totalCourses,
        "icon" => "book-open",
        "bgColor" => "orange",
        "iconColor" => "#c2410c"
    ];
    
    // Departments (unique from faculty)
    $stmt = $conn->query("SELECT COUNT(DISTINCT department) as count FROM faculty");
    $totalDepts = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    $statsData[] = [
        "title" => "Departments",
        "value" => (int)$totalDepts,
        "icon" => "building-columns",
        "bgColor" => "purple",
        "iconColor" => "#6d28d9"
    ];

    // If GET parameter ?title= is passed, return specific stat
    if (isset($_GET['title'])) {
        $title = strtolower(trim($_GET['title']));
        foreach ($statsData as $stat) {
            if (strtolower($stat['title']) === $title) {
                echo json_encode([
                    "status" => "success",
                    "data" => $stat
                ], JSON_PRETTY_PRINT);
                exit;
            }
        }
        echo json_encode([
            "status" => "error",
            "message" => "Statistic not found"
        ]);
        exit;
    }

    // Otherwise return all stats
    echo json_encode([
        "status" => "success",
        "data" => $statsData
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
