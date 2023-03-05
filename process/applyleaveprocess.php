<?php
//including the database connection file
require_once ('dbh.php');
// require('..//salaryemp.php');


//getting id of the data from url
$id = $_GET['id'];

$reason = $_POST['reason'];

$leave = $_POST['leave'];

// $CutSalary = $_POST['CutSalary'];

$start = $_POST['start'];
//echo "$reason";
$end = $_POST['end'];

$sql = "INSERT INTO `employee_leave`(`id`,`token`, `start`, `end`, `reason`, `leave`, `CutSalary`, `status`) VALUES ('$id','','$start','$end','$reason','$leave', '','Pending')";

$result = mysqli_query($conn, $sql);

//redirecting to the display page (index.php in our case)
header("Location:..//eloginwel.php?id=$id");
?>