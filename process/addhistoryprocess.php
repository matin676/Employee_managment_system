<?php

require_once('dbh.php');

$year = $_POST['year'];
$ysalary = $_POST['ysalary'];
$month = $_POST['Month'];
$salary = $_POST['salary'];


$sql = "INSERT INTO `history`(`year`,`ysalary`) VALUES ('$year','$ysalary')";
$result = mysqli_query($conn, $sql);

$sql2 = "INSERT INTO `monthlysalary`(`Month`,`salary`) VALUES ('$month','$salary')";
$result2 = mysqli_query($conn, $sql2);

if (($result) == 1 || ($result2) == 1) {

    echo ("<SCRIPT LANGUAGE='JavaScript'>
    window.alert('Succesfully Registered')
    window.location.href='..//emphistory.php';
    </SCRIPT>");
    //header("Location: ..//aloginwel.php");
}
else {
    echo ("<SCRIPT LANGUAGE='JavaScript'>
    window.alert('Failed to Registere')
    window.location.href='javascript:history.go(-1)';
    </SCRIPT>");
}