<?php
include('nav3.php');
require_once('process/dbh.php');

$sql = "SELECT employee.id,employee.firstName,employee.lastName,salary.base,salary.DA,salary.HRA,salary.Medical,salary.Vehicle,salary.total,salary.ProfessionalTax,salary.GroupInsurance,salary.IncomeTax,salary.ProvidentFund,salary.NetSalary,salary.CutSalary from `employee`, `salary` where employee.id = salary.id";

$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Employee Salary</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/styleview.css">
    <script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

    <h2>Employee Salary</h2>
    <div id="divimg">
        <table class="salary-table">
            <tr>
                <th align="center">Emp. ID</th>
                <th align="center">Name</th>
                <th align="center">Base Salary</th>
                <th align="center">DA</th>
                <th align="center">HRA</th>
                <th align="center">Medical</th>
                <th align="center">Vehicle</th>
                <th align="center">TotalSalary</th>
                <th align="center">Professional Tax</th>
                <th align="center">Group Insurance</th>
                <th align="center">Income Tax</th>
                <th align="center">Provident Fund</th>
                <th align="center">Cut Salary</th>
                <th align="center">Net Salary</th>
                <th align="center">History</th>
            </tr>
            <?php
            while ($employee = mysqli_fetch_assoc($result)) {
                echo "<tr>";
                echo "<td>" . $employee['id'] . "</td>";
                echo "<td>" . $employee['firstName'] . " " . $employee['lastName'] . "</td>";
                echo "<td>" . $employee['base'] . "</td>";
                echo "<td>" . $employee['DA'] . "</td>";
                echo "<td>" . $employee['HRA'] . "</td>";
                echo "<td>" . $employee['Medical'] . "</td>";
                echo "<td>" . $employee['Vehicle'] . "</td>";
                echo "<td>" . $employee['total'] . "</td>";
                echo "<td class='minus'>" . $employee['ProfessionalTax'] . "</td>";
                echo "<td class='minus'>" . $employee['GroupInsurance'] . "</td>";
                echo "<td class='minus'>" . $employee['IncomeTax'] . "</td>";
                echo "<td class='minus'>" . $employee['ProvidentFund'] . "</td>";
                echo "<td class='minus'>" . $employee['CutSalary'] . "</td>";
                echo "<td>" . $employee['NetSalary'] . "</td>";
                echo "<td><a href=\"editsalary.php?id=$employee[id]\">Edit</a> | <a href=\"emphistory.php?id=$employee[id]\" class='arrow'>&#11086</a>";
            }
            ?>
        </table>
    </div>

</body>

</html>