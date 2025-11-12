<?php
header("Content-Type: application/json");
include("db_connect.php");

$response = [
    "status" => "success",
    "message" => "Timetable API connected successfully",
    "available_endpoints" => [
        "GET timetable" => "/timetable/Timetable.php",
        "POST timetable" => "/timetable/Timetable.php",
        "GET attendance" => "/timetable/AttendancePage.php",
        "POST attendance" => "/timetable/AttendancePage.php",
        "GET faculty timetable" => "/timetable/TeacherTimetable.php"
    ]
];
echo json_encode($response);
?>
