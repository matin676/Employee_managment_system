<?php
include('nav5.php');
require_once('process/dbh.php');
$sql = "SELECT * FROM `employee` WHERE 1";
//echo "$sql";
$result = mysqli_query($conn, $sql);
if (isset($_POST['update'])) {
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $contact = mysqli_real_escape_string($conn, $_POST['contact']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);
    $result = mysqli_query($conn, "UPDATE `employee` SET `email`='$email',`contact`='$contact',`address`='$address' WHERE id=$id");
    echo ("<SCRIPT LANGUAGE='JavaScript'>
    window.alert('Succesfully Updated')
    window.location.href='myprofile.php?id=$id  ';
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
        // $salary = $res['salary'];
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
                    <form id="registration" action="myprofileup.php" method="POST">
                        <div class="input-group">
                            <p>Email</p>
                            <input class="input--style-1" type="email" name="email" value="<?php echo $email; ?>" required>
                        </div>
                        <div class="input-group">
                            <p>Contact</p>
                            <input class="input--style-1" type="number" name="contact" value="<?php echo $contact; ?>" required>
                        </div>
                        <div class="input-group">
                            <p>Address</p>
                            <input class="input--style-1" type="text" name="address" value="<?php echo $address; ?>" required>
                        </div>
                        <input type="hidden" name="id" id="textField" value="<?php echo $id; ?>" required="required"><br><br>
                        <div class="p-t-20">
                            <button class="btn btn--radius btn--green" type="submit" name="update">Submit</button>
                        </div>
                    </form>
                    <br>
                    <button class="btn btn--radius btn--green" onclick="window.location.href = 'changepassemp.php?id=<?php echo $id ?>';">Change Password</button>
                </div>
            </div>
        </div>
    </div>

</body>

</html>