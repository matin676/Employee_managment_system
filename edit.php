<?php
include('nav6.php');
require_once('process/dbh.php');
$sql = "SELECT * FROM `employee` WHERE 1";
//echo "$sql";
$result = mysqli_query($conn, $sql);
if (isset($_POST['update'])) {
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $firstname = mysqli_real_escape_string($conn, $_POST['firstName']);
    $lastname = mysqli_real_escape_string($conn, $_POST['lastName']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $birthday = mysqli_real_escape_string($conn, $_POST['birthday']);
    $contact = mysqli_real_escape_string($conn, $_POST['contact']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);
    $nid = mysqli_real_escape_string($conn, $_POST['nid']);
    $dept = mysqli_real_escape_string($conn, $_POST['dept']);
    $degree = mysqli_real_escape_string($conn, $_POST['degree']);
    $result = mysqli_query($conn, "UPDATE `employee` SET `firstName`='$firstname',`lastName`='$lastname',`email`='$email',`birthday`='$birthday',`gender`='$gender',`contact`='$contact',`nid`='$nid',`address`='$address',`dept`='$dept',`degree`='$degree' WHERE id=$id");
    echo ("<SCRIPT LANGUAGE='JavaScript'>
    window.alert('Succesfully Updated')
    window.location.href='viewemp.php';
    </SCRIPT>");
}
?>
<?php
$id = (isset($_GET['id']) ? $_GET['id'] : '');
$sql = "SELECT * from `employee` WHERE id=$id";
$result = mysqli_query($conn, $sql);
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
        $dept = $res['dept'];
        $degree = $res['degree'];
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Employee Panel</title>
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
                    <h2 class="title">Update Employee Info</h2>
                    <form id="registration" action="edit.php" method="POST">
                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <label>First Name</label>
                                    <input class="input--style-1" type="text" placeholder="Firstname" required="required" name="firstName" value="<?php echo $firstname; ?>">
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <label>Last Name</label>
                                    <input class="input--style-1" type="text" placeholder="Lastname" required="required" name="lastName" value="<?php echo $lastname; ?>">
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Email</label>
                            <input class="input--style-1" type="email" placeholder="Email" required="required" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" name="email" value="<?php echo $email; ?>">
                        </div>
                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <label>Birthday</label>
                                    <input class="input--style-1" type="text" placeholder="Birthday" name="birthday" required="required" value="<?php echo $birthday; ?>">
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <label>Gender</label>
                                    <input class="input--style-1" type="text" placeholder="Gender" name="gender" required="required" value="<?php echo $gender; ?>">
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Contact</label>
                            <input class="input--style-1" type="number" placeholder="Phone No" pattern="[0-9]{1}[0-9]{9}" name="contact" value="<?php echo $contact; ?>">
                        </div>
                        <div class="input-group">
                            <label>Nid</label>
                            <input class="input--style-1" type="number" placeholder="Network ID" name="nid" required="required" value="<?php echo $nid; ?>">
                        </div>
                        <div class="input-group">
                            <label>Address</label>
                            <input class="input--style-1" type="text" placeholder="Address" name="address" required="required" value="<?php echo $address; ?>">
                        </div>
                        <div class="input-group">
                            <label>Department</label>
                            <input class="input--style-1" type="text" placeholder="Department" name="dept" required="required" value="<?php echo $dept; ?>">
                        </div>
                        <div class="input-group">
                            <label>Degree</label>
                            <input class="input--style-1" type="text" placeholder="Degree" name="degree" required="required" value="<?php echo $degree; ?>">
                        </div>
                        <input type="hidden" name="id" id="textField" value="<?php echo $id; ?>" required="required"><br><br>
                        <div class="p-t-20">
                            <button class="btn btn--radius btn--green" type="submit" name="update">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</body>

</html>