<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$students = [
    ["id"=>1, "name"=>"Amit Kumar", "roll"=>"301", "semester"=>3, "section"=>"A", "percent"=>92, "averageCGPA"=>8.9],
    ["id"=>2, "name"=>"Priya Sharma", "roll"=>"302", "semester"=>3, "section"=>"A", "percent"=>88, "averageCGPA"=>8.8],
    ["id"=>3, "name"=>"Rahul Verma", "roll"=>"401", "semester"=>4, "section"=>"B", "percent"=>78, "averageCGPA"=>7.5],
    ["id"=>4, "name"=>"Sneha Patel", "roll"=>"501", "semester"=>5, "section"=>"A", "percent"=>95, "averageCGPA"=>9.1],
    ["id"=>5, "name"=>"Karan Singh", "roll"=>"601", "semester"=>6, "section"=>"B", "percent"=>72, "averageCGPA"=>7.2]
];

if (isset($_GET['roll'])) {
    $roll = $_GET['roll'];
    foreach ($students as $s) {
        if ($s['roll'] == $roll) {
            echo json_encode(["status"=>"success", "data"=>$s], JSON_PRETTY_PRINT);
            exit;
        }
    }
    echo json_encode(["status"=>"error", "message"=>"Student not found"]);
    exit;
}

echo json_encode(["status"=>"success", "data"=>$students], JSON_PRETTY_PRINT);
?>
