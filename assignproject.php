<?php
include('nav3.php');
require_once('process/dbh.php');
$sql = "SELECT * from `project` order by subdate desc";
//echo "$sql";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Assign Project</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/styleview.css" media="all">
    <script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

    <h2>Company Projects</h2>

    <table class="project-table">
        <tr>
            <th align="center">Project ID</th>
            <th align="center">Emp. ID</th>
            <th align="center">Project Name</th>
            <th align="center">Due Date</th>
            <th align="center">Submission Date</th>
            <th align="center">Mark</th>
            <th align="center">Status</th>
            <th align="center">Option</th>
        </tr>
        <?php
        while ($employee = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>" . $employee['pid'] . "</td>";
            echo "<td>" . $employee['eid'] . "</td>";
            echo "<td>" . $employee['pname'] . "</td>";
            echo "<td>" . $employee['duedate'] . "</td>";
            echo "<td>" . $employee['subdate'] . "</td>";
            echo "<td>" . $employee['mark'] . "</td>";
            echo "<td>" . $employee['status'] . "</td>";
            echo "<td><a href=\"mark.php?id=$employee[eid]&pid=$employee[pid]\">Mark</a>";
        }
        ?>
    </table>
    <br>
    <br>
    <br>

</body>

</html>