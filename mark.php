<?php
include('nav3.php');
require_once('process/dbh.php');

if (isset($_POST['update'])) {

    $eid = mysqli_real_escape_string($conn, $_POST['eid']);
    $pid = mysqli_real_escape_string($conn, $_POST['pid']);
    $mark = mysqli_real_escape_string($conn, $_POST['mark']);
    $points = mysqli_real_escape_string($conn, $_POST['points']);
    $base = mysqli_real_escape_string($conn, $_POST['base']);
    $bonus = mysqli_real_escape_string($conn, $_POST['bonus']);
    $total = mysqli_real_escape_string($conn, $_POST['total']);

    $result = mysqli_query($conn, "UPDATE `project` SET `mark`='$mark' WHERE eid=$eid and pid=$pid");
    $sql = "SELECT SUM(`mark`) AS upPoint FROM `project` WHERE `eid` = '$eid'";

    $result = mysqli_query($conn, $sql);
    if ($result) {
        while ($res1 = mysqli_fetch_assoc($result)) {
            $upPoint = $res1['upPoint'];
        }
    }

    $upBonus = $upPoint;
    $upSalary = $base + ($upBonus * $base) / 100;

    $result = mysqli_query($conn, "UPDATE `rank` SET `points`='$upPoint' WHERE eid=$eid");
    $result = mysqli_query($conn, "UPDATE `salary` SET `bonus`='$upBonus' ,`total`='$upSalary' WHERE id=$eid");
    echo ("<SCRIPT LANGUAGE='JavaScript'>
   
    window.location.href='assignproject.php  ';
    </SCRIPT>");
}

$id = (isset($_GET['id']) ? $_GET['id'] : '');
$pid = (isset($_GET['pid']) ? $_GET['pid'] : '');

try {
    $sql = "SELECT pid, project.eid, pname, duedate, subdate, mark, points, firstName, lastName, base, bonus, total FROM `project` , `rank` ,`employee`, `salary`  WHERE project.eid = $id AND pid = $pid";
    $result = mysqli_query($conn, $sql);
} catch (mysqli_sql_exception $e) {
    var_dump($e);
    exit;
}
?>

<?php
$id = (isset($_GET['id']) ? $_GET['id'] : '');
$pid = (isset($_GET['pid']) ? $_GET['pid'] : '');

$sql1 = "SELECT project.pid, project.eid, project.pname, project.duedate, project.subdate, project.mark, rank.points, employee.firstName, employee.lastName, salary.base, salary.bonus, salary.total FROM `project` , `rank` ,`employee`, `salary`  WHERE project.eid=$id AND project.pid=$pid AND project.eid=rank.eid AND salary.id=project.eid AND employee.id=project.eid AND employee.id=rank.eid";

$result1 = mysqli_query($conn, $sql1);
if ($result1) {
    while ($res = mysqli_fetch_assoc($result1)) {
        $pname = $res['pname'];
        $duedate = $res['duedate'];
        $subdate = $res['subdate'];
        $firstName = $res['firstName'];
        $lastName = $res['lastName'];
        $mark = $res['mark'];
        $points = $res['points'];
        $base = $res['base'];
        $bonus = $res['bonus'];
        $total = $res['total'];
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Assign Project</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/main.css" media="all">
    <link href="vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
    <link href="vendor/select2/select2.min.css" rel="stylesheet" media="all">
    <link href="vendor/datepicker/daterangepicker.css" rel="stylesheet" media="all">
    <script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

    <div class="page-wrapper bg-blue p-t-100 p-b-100 font-robo">
        <div class="wrapper wrapper--w680">
            <div class="card card-1">
                <div class="card-heading"></div>
                <div class="card-body">
                    <h2 class="title">Project Mark</h2>
                    <form id="registration" action="mark.php" method="POST">
                        <div class="input-group">
                            <p>Project Name</p>
                            <input class="input--style-1" type="text" name="pname" value="<?php echo $pname; ?>" readonly>
                        </div>
                        <div class="input-group">
                            <p>Employee Name</p>
                            <input class="input--style-1" type="text" name="firstName" value="<?php echo $firstName; ?> <?php echo $lastName; ?>" readonly>
                        </div>
                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <p>Due Date</p>
                                    <input class="input--style-1" type="text" name="duedate" value="<?php echo $duedate; ?>" readonly>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <p>Submission Date</p>
                                    <input class="input--style-1" type="text" name="subdate" value="<?php echo $subdate; ?>" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <p>Assign Mark</p>
                            <input class="input--style-1" type="text" name="mark" value="<?php echo $mark; ?>" required>
                        </div>
                        <input type="hidden" name="eid" id="textField" value="<?php echo $id; ?>" required="required">
                        <input type="hidden" name="pid" id="textField" value="<?php echo $pid; ?>" required="required">
                        <input type="hidden" name="points" id="textField" value="<?php echo $points; ?>" required="required">
                        <input type="hidden" name="base" id="textField" value="<?php echo $base; ?>" required="required">
                        <input type="hidden" name="bonus" id="textField" value="<?php echo $bonus; ?>" required="required">
                        <input type="hidden" name="total" id="textField" value="<?php echo $total; ?>" required="required">
                        <div class="p-t-20">
                            <button class="btn btn--radius btn--green" type="submit" name="update">Assign Mark</button>
                        </div>
                    </form>
                    <br>
                </div>
            </div>
        </div>
    </div>

    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/select2/select2.min.js"></script>
    <script src="vendor/datepicker/moment.min.js"></script>
    <script src="vendor/datepicker/daterangepicker.js"></script>
    <script src="js/global.js"></script>

</body>

</html>