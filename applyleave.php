<?php
$id = (isset($_GET['id']) ? $_GET['id'] : '');
include('nav4.php');
require_once('process/dbh.php');
$sql = "SELECT * FROM `employee` where id = '$id'";
$result = mysqli_query($conn, $sql);
$employee = mysqli_fetch_array($result);
$empName = ($employee['firstName']);

// echo "$id";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Apply Leave | Employee Panel</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/styleapply.css" media="all">
    <link rel="stylesheet" type="text/css" href="css/main.css" media="all">
    <link href="vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
    <link href="vendor/select2/select2.min.css" rel="stylesheet" media="all">
    <script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        .cutsalary {
            color: red;
        }
    </style>
</head>

<body>

    <body bgcolor="#F0FFFF">
        <div class="page-wrapper bg-blue p-t-100 p-b-100 font-robo">
            <div class="wrapper wrapper--w680">
                <div class="card card-1">
                    <div class="card-heading"></div>
                    <div class="card-body">
                        <h2 class="title">Apply Leave Form</h2>
                        <form action="process/applyleaveprocess.php?id=<?php echo $id ?>" method="POST">
                            <div class="input-group">
                                <div class="rs-select2 js-select-simple select--no-search">
                                    <select name="leave" id="leave" required style="border-radius: 5px;border: none;font-family: 'Montserrat', sans-serif;">
                                        <option disabled selected>Select your leave: </option>
                                        <option disabled>--Casual--</option>
                                        <option value="full">Casual Full</option>
                                        <option value="half">Casual Half</option>
                                        <option disabled>--Others--</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Paternity">Paternity</option>
                                        <option value="Maternity">Maternity</option>
                                        <option value="LWP">LWP</option>
                                        <option value="Restricted">Restricted</option>
                                        <option value="Half Pay">Half Pay</option>
                                        <option value="Joining">Joining</option>
                                        <option value="Duty">Duty</option>
                                        <option value="Vacation">Vacation</option>
                                    </select>
                                    <div class="select-dropdown"></div>
                                </div>
                            </div>
                            <div class="input-group">
                                <input class="input--style-1" type="text" placeholder="Reason" name="reason" required>
                            </div>
                            <div class="row row-space">
                                <div class="col-2">
                                    <p>Start Date</p>
                                    <div class="input-group">
                                        <input class="input--style-1" type="date" placeholder="start" name="start" required>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <p>End Date</p>
                                    <div class="input-group">
                                        <input class="input--style-1" type="date" placeholder="end" name="end" required>
                                    </div>
                                </div>
                            </div>
                            <div class="p-t-20">
                                <button class="btn btn--radius btn--green" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <h2 class="leave-h2">Leave Details</h2>

        <table class="empleave-table">
            <tr>
                <th align="center">Emp. ID</th>
                <th align="center">Name</th>
                <th align="center">Start Date</th>
                <th align="center">End Date</th>
                <th align="center">Total Days</th>
                <th align="center">Reason</th>
                <th align="center">Leave</th>
                <th align="center">Cut Salary</th>
                <th align="center">Status</th>
            </tr>
            <?php
            $sql = "Select employee.id, employee.firstName, employee.lastName, employee_leave.start, employee_leave.end, employee_leave.reason,
            employee_leave.leave ,salary.CutSalary ,employee_leave.status From employee, employee_leave, salary Where employee.id = $id and employee_leave.id = $id and salary.id = $id order by employee_leave.token";
            $result = mysqli_query($conn, $sql);
            $sql1 = "Select salary.NetSalary From employee,salary WHERE employee.id = $id and salary.id = $id";
            $result2 = mysqli_query($conn, $sql1);
            $salary = mysqli_fetch_array($result2);
            while ($employee = mysqli_fetch_assoc($result)) {
                $date1 = new DateTime($employee['start']);
                $date2 = new DateTime($employee['end']);
                $interval = $date1->diff($date2);
                $interval = $date1->diff($date2);
                echo "<tr>";
                echo "<td>" . $employee['id'] . "</td>";
                echo "<td>" . $employee['start'] . "</td>";
                echo "<td>" . $employee['firstName'] . " " . $employee['lastName'] . "</td>";
                echo "<td>" . $employee['end'] . "</td>";
                echo "<td>" . $interval->days . "</td>";
                echo "<td>" . $employee['reason'] . "</td>";
                echo "<td>" . $employee['leave'] . "</td>";
                $CutSalary = ($salary['NetSalary'] / 30) * $interval->days;
                $sql3 = "UPDATE `salary` JOIN `employee_leave` ON salary.id = employee_leave.id set salary.CutSalary = $CutSalary WHERE salary.id = $id AND employee_leave.leave = 'LWP'";
                $result3 = mysqli_query($conn, $sql3);
                echo "<td class='cutsalary'>" . $employee['CutSalary'] . "</td>";
                echo "<td>" . $employee['status'] . "</td>";
            }
            ?>
        </table>

        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/select2/select2.min.js"></script>
        <script src="js/global.js"></script>
    </body>

</html>