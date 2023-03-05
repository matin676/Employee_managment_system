<?php
$id = (isset($_GET['id']) ? $_GET['id'] : '');
include('nav4.php');
require_once('process/dbh.php');
$sql = "SELECT * FROM `project` where eid = '$id'";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Employee Panel</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/styleview.css">
    <script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

    <h2>Project Details</h2>

    <div id="divimg">
        <table class="empproject-table">
            <tr>
                <th align="center">Project ID</th>
                <th align="center">Project Name</th>
                <th align="center">Due Date</th>
                <th align="center">Sub Date</th>
                <th align="center">Mark</th>
                <th align="center">Status</th>
                <th align="center">Option</th>
            </tr>
            <?php
            while ($employee = mysqli_fetch_assoc($result)) {
                echo "<tr>";
                echo "<td>" . $employee['pid'] . "</td>";
                echo "<td>" . $employee['pname'] . "</td>";
                echo "<td>" . $employee['duedate'] . "</td>";
                echo "<td>" . $employee['subdate'] . "</td>";
                echo "<td>" . $employee['mark'] . "</td>";
                echo "<td>" . $employee['status'] . "</td>";
                echo "<td><a href=\"psubmit.php?pid=$employee[pid]&id=$employee[eid]\">Submit</a>";
            }
            ?>
        </table>
    </div>
</body>

</html>