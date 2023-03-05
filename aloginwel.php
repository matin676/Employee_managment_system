<?php
include('nav3.php');
require_once('process/dbh.php');
$sql = "SELECT id, firstName, lastName,  points FROM employee, rank WHERE rank.eid = employee.id order by rank.points desc";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Admin Panel</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/styleemplogin.css">
    <script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
</head>

<body>
    <div id="divimg" class="aloginwel-divimg">
        <h2 class="alogin-h2">Empolyee Leaderboard </h2>
        <table class="alogin-table">
            <tr>
                <th align="center">Seq.</th>
                <th align="center">Emp. ID</th>
                <th align="center">Name</th>
                <th align="center">Points</th>
            </tr>
            <?php
            $seq = 1;
            while ($employee = mysqli_fetch_assoc($result)) {
                echo "<tr>";
                echo "<td>" . $seq . "</td>";
                echo "<td>" . $employee['id'] . "</td>";
                echo "<td>" . $employee['firstName'] . " " . $employee['lastName'] . "</td>";
                echo "<td>" . $employee['points'] . "</td>";
                $seq += 1;
            }
            ?>
        </table>
        <div class="p-t-20">
            <button class="btn btn--radius btn--green" type="submit" name="Reset Points" style="float: right; margin-right: 60px">
                <a href="reset.php">Reset Points</a>
            </button>
        </div>
    </div>
</body>

</html>