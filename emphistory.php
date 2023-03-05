<?php
include('nav3.php');
require_once('process/dbh.php');

$sql = "SELECT * from `history` where 1";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Salary History</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/styleview.css">
    <link rel="stylesheet" type="text/css" href="css/styleemplogin.css">
    <script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
    <h2>Employee Salary History</h2>

    <table class="histemp-table">
        <tr>
            <th align="center">Year</th>
            <th align="center">Salary</th>
        </tr>
        <?php
        while ($employee = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>" . $employee['year'] . "</td>";
            echo "<td>" . $employee['ysalary'] . "</td>";
        }
        ?>
    </table>

    <div class="p-t-20">
        <button class="btn btn--radius btn--green" style="float: right; margin-right: 60px; position: absolute; bottom: 10rem; right: 5rem;">
            <a href="monthlysalary.php">Monthly Salary</a>
        </button>
        <button class="btn btn--radius btn--green" style="float: right; margin-right: 60px; position: absolute; bottom: 10rem; right: 20rem;">
            <a href="edithistory.php">Edit History</a>
        </button>
    </div>

</body>

</html>