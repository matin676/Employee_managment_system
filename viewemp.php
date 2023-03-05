<?php
include('nav3.php');
require_once('process/dbh.php');
$sql = "SELECT * from `employee` , `rank` WHERE employee.id = rank.eid";
//echo "$sql";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | View Employee | Admin Panel</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/styleview.css">
    <script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

    <h2>Employees Working</h2>

    <table class="viewemp-table">
        <tr>
            <th align="center">Emp. ID</th>
            <th align="center">Picture</th>
            <th align="center">Name</th>
            <th align="center">Email</th>
            <th align="center">Birthday</th>
            <th align="center">Gender</th>
            <th align="center">Contact</th>
            <th align="center">NID</th>
            <th align="center">Jdate</th>
            <th align="center">Address</th>
            <th align="center">Department</th>
            <th align="center">Degree</th>
            <th align="center">Point</th>
            <th align="center">Options</th>
        </tr>
        <?php
        while ($employee = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>" . $employee['id'] . "</td>";
            echo "<td><img src='process/" . $employee['pic'] . "' height = 60px width = 60px></td>";
            echo "<td>" . $employee['firstName'] . " " . $employee['lastName'] . "</td>";

            echo "<td>" . $employee['email'] . "</td>";
            echo "<td>" . $employee['birthday'] . "</td>";
            echo "<td>" . $employee['gender'] . "</td>";
            echo "<td>" . $employee['contact'] . "</td>";
            echo "<td>" . $employee['nid'] . "</td>";
            echo "<td>" . $employee['Jdate'] . "</td>";
            echo "<td>" . $employee['address'] . "</td>";
            echo "<td>" . $employee['dept'] . "</td>";
            echo "<td>" . $employee['degree'] . "</td>";
            echo "<td>" . $employee['points'] . "</td>";

            echo "<td><a href=\"edit.php?id=$employee[id]\">Edit</a> | <a href=\"delete.php?id=$employee[id]\" onClick=\"return confirm('Are you sure you want to delete?')\">Delete</a></td>";
        }
        ?>
    </table>
    <br>
    <br>
    <br>

</body>

</html>