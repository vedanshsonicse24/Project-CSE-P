<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$studentProfile = [
    "fullName" => "Priya Sharma",
    "rollNumber" => "21CS002",
    "enrollmentNumber" => "0827CS211002",
    "email" => "priya.sharma@student.edu",
    "phone" => "+91 98765 43210",
    "address" => "123, Model Town, Raipur, Chhattisgarh",
    "semester" => "5",
    "section" => "A",
    "mentor" => "Dr. Rajesh Kumar",
    "averageCGPA" => "8.5",
    "attendance" => "92%",
    "achievements" => [
        "First Prize in Hackathon 2024",
        "Best Project Award - Web Development",
        "Published Research Paper on AI"
    ]
];

echo json_encode(["status" => "success", "data" => $studentProfile], JSON_PRETTY_PRINT);
?>
