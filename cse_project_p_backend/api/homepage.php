<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/Database.php';
require_once '../helpers/Response.php';

class HomepageAPI {
    private $db;
    
    public function __construct() {
        $this->db = new Database();
        $this->db->connect();
    }
    
    /**
     * Get homepage data including stats, announcements, faculty, and projects
     */
    public function getHomepageData() {
        try {
            // Get stats from database
            $stats = $this->getStats();
            
            // Get recent announcements
            $announcements = $this->getAnnouncements();
            
            // Get faculty highlights (HOD + 2 featured faculty)
            $faculty = $this->getFacultyHighlights();
            
            // Get featured projects
            $projects = $this->getFeaturedProjects();
            
            $response = Response::success([
                'stats' => $stats,
                'announcements' => $announcements,
                'faculty' => $faculty,
                'projects' => $projects
            ], 'Homepage data fetched successfully');
            
            echo json_encode($response);
        } catch (Exception $e) {
            $response = Response::error('Failed to fetch homepage data: ' . $e->getMessage());
            echo json_encode($response);
        }
    }
    
    /**
     * Get statistics for homepage
     */
    private function getStats() {
        // Get actual counts from database
        $studentCount = $this->db->getRow("SELECT COUNT(*) as count FROM students WHERE 1=1");
        $facultyCount = $this->db->getRow("SELECT COUNT(*) as count FROM faculty WHERE 1=1");
        $subjectCount = $this->db->getRow("SELECT COUNT(*) as count FROM subjects WHERE 1=1");
        
        return [
            ["label" => "Students Enrolled", "value" => ($studentCount['count'] ?? 0) . "+"],
            ["label" => "Courses Offered", "value" => ($subjectCount['count'] ?? 0) . "+"],
            ["label" => "Faculty Members", "value" => ($facultyCount['count'] ?? 0) . "+"],
            ["label" => "Years of Excellence", "value" => "25+"]
        ];
    }
    
    /**
     * Get recent announcements (from notifications table)
     */
    private function getAnnouncements() {
        $query = "SELECT id, title, created_at as date, message as content 
                  FROM notifications 
                  WHERE recipient_type IN ('all', 'student') 
                  ORDER BY created_at DESC 
                  LIMIT 3";
        
        $results = $this->db->getRows($query);
        
        // If no notifications, return default announcements
        if (empty($results)) {
            return [
                ["id" => 1, "title" => "Mid-Semester Examinations", "date" => "2025-10-20", "content" => "Mid-term exams will commence from October 20th, 2025."],
                ["id" => 2, "title" => "Faculty Development Program", "date" => "2025-10-18", "content" => "FDP on AI in Education scheduled for next week."],
                ["id" => 3, "title" => "Research Paper Submission Deadline", "date" => "2025-10-25", "content" => "Submit your research papers by October 25th."]
            ];
        }
        
        return $results;
    }
    
    /**
     * Get faculty highlights (HOD first, then others)
     */
    private function getFacultyHighlights() {
        $query = "SELECT full_name as name, designation as role 
                  FROM faculty 
                  WHERE 1=1
                  ORDER BY FIELD(designation, 'HOD', 'Professor', 'Associate Professor', 'Assistant Professor')
                  LIMIT 18";
        
        $results = $this->db->getRows($query);
        
        // If no faculty in database, return default
        if (empty($results)) {
            return [
                ["name" => "Dr. Anand Tamrakar", "role" => "HOD"],
                ["name" => "Mrs. Keshika Jangde", "role" => "Assistant Professor"],
                ["name" => "Ms. Jyoti Gautam", "role" => "Assistant Professor"]
            ];
        }
        
        return $results;
    }
    
    /**
     * Get featured student projects
     */
    private function getFeaturedProjects() {
        // Return default projects for now
        // TODO: Create student_projects table for dynamic projects
        return [
            [
                "title" => "E-Commerce Platform",
                "description" => "A full-stack web application for online shopping, featuring user authentication, product management, and a payment gateway.",
                "tech" => "React, Node.js, Express, MongoDB"
            ],
            [
                "title" => "AI Health Scanner",
                "description" => "A machine learning model trained to detect anomalies and classify medical images (like X-rays) to assist in early diagnosis.",
                "tech" => "Python, TensorFlow, Keras, OpenCV"
            ],
            [
                "title" => "Campus Connect App",
                "description" => "A cross-platform mobile app for college event tracking, class schedules, and real-time notifications for students and faculty.",
                "tech" => "Flutter, Firebase, Dart"
            ]
        ];
    }
}

// Handle request
$api = new HomepageAPI();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $api->getHomepageData();
} else {
    $response = Response::error('Method not allowed', 405);
    echo json_encode($response);
}
?>
