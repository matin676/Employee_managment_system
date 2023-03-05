<?php
include('nav4.php');
require_once('process/dbh.php');
$sql = "SELECT * FROM `employee` WHERE 1";
//echo "$sql";
$result = mysqli_query($conn, $sql);
$id = (isset($_GET['id']) ? $_GET['id'] : '');
$sql = "SELECT * from `employee` WHERE id=$id";
$sql2 = "SELECT total from `salary` WHERE id = $id";
$result = mysqli_query($conn, $sql);
$result2 = mysqli_query($conn, $sql2);
$salary = mysqli_fetch_array($result2);
$empS = ($salary['total']);
if ($result) {
    while ($res = mysqli_fetch_assoc($result)) {
        $firstname = $res['firstName'];
        $lastname = $res['lastName'];
        $email = $res['email'];
        $contact = $res['contact'];
        $address = $res['address'];
        $gender = $res['gender'];
        $birthday = $res['birthday'];
        $nid = $res['nid'];
        $Jdate = $res['Jdate'];
        $dept = $res['dept'];
        $degree = $res['degree'];
        $pic = $res['pic'];
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | My Profile</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
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
                    <h2 class="title">My Profile</h2>
                    <form method="POST" action="myprofileup.php?id=<?php echo $id ?>">
                        <div class="input-group" style="border: none;">
                            <img class="myprofile-img" src="process/<?php echo $pic; ?>" height=150px width=150px>
                        </div>
                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <p>First Name</p>
                                    <input class="input--style-1" type="text" name="firstName" value="<?php echo $firstname; ?>" readonly>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <p>Last Name</p>
                                    <input class="input--style-1" type="text" name="lastName" value="<?php echo $lastname; ?>" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <p>Email</p>
                            <input class="input--style-1" type="email" name="email" value="<?php echo $email; ?>" readonly>
                        </div>
                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <p>Date of Birth</p>
                                    <input class="input--style-1" type="text" name="birthday" value="<?php echo $birthday; ?>" readonly>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <p>Gender</p>
                                    <input class="input--style-1" type="text" name="gender" value="<?php echo $gender; ?>" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <p>Contact Number</p>
                            <input class="input--style-1" type="number" name="contact" value="<?php echo $contact; ?>" readonly>
                        </div>
                        <div class="input-group">
                            <p>NID</p>
                            <input class="input--style-1" type="number" name="nid" value="<?php echo $nid; ?>" readonly>
                        </div>
                        <div class="input-group">
                            <p>Jdate</p>
                            <input class="input--style-1" type="date" name="Jdate" value="<?php echo $Jdate; ?>" readonly>
                        </div>
                        <div class="input-group">
                            <p>Address</p>
                            <input class="input--style-1" type="text" name="address" value="<?php echo $address; ?>" readonly>
                        </div>
                        <div class="input-group">
                            <p>Department</p>
                            <input class="input--style-1" type="text" name="dept" value="<?php echo $dept; ?>" readonly>
                        </div>
                        <div class="input-group">
                            <p>Degree</p>
                            <input class="input--style-1" type="text" name="degree" value="<?php echo $degree; ?>" readonly>
                        </div>
                        <div class="input-group">
                            <p>Total Salary</p>
                            <input class="input--style-1" type="text" name="degree" value="<?php echo $empS; ?>" readonly>
                        </div>
                        <input type="hidden" name="id" id="textField" value="<?php echo $id; ?>" required="required"><br><br>
                        <div class="p-t-20">
                            <button class="btn btn--radius btn--green" name="send">Update Info</button>
                        </div>
                    </form>
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