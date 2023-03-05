<?php

require_once('dbh.php');

$id = $_GET['id'];

$base = $_POST['base'];
$DA = $_POST['DA'];
$HRA = $_POST['HRA'];
$Medical = $_POST['Medical'];
$Vehicle = $_POST['Vehicle'];
$total = $_POST['total'];
$ProfessionalTax = $_POST['ProfessionalTax'];
$GroupInsurance = $_POST['GroupInsurance'];
$IncomeTax = $_POST['IncomeTax'];
$ProvidentFund = $_POST['ProvidentFund'];
$NetSalary = $_POST['NetSalary'];


$sql = "INSERT INTO `salary`(`id`,`base`,`DA`,`HRA`,`Medical`,`Vehicle`,`total`,`ProfessionalTax`,`GroupInsurance`,`IncomeTax`,`ProvidentFund`,`NetSalary`) VALUES ($id,'','$base','$DA','$HRA','$Medical','$Vehicle','$total','$ProfessionalTax','$GroupInsurance','$IncomeTax','$ProvidentFund','$NetSalary')";

$result = mysqli_query($conn, $sql);

if (($result) == 1) {

    echo ("<SCRIPT LANGUAGE='JavaScript'>
    window.alert('Succesfully Registered')
    window.location.href='..//salaryemp.php';
    </SCRIPT>");
    //header("Location: ..//aloginwel.php");
} else {
    echo ("<SCRIPT LANGUAGE='JavaScript'>
    window.alert('Failed to Registere')
    window.location.href='javascript:history.go(-1)';
    </SCRIPT>");
}