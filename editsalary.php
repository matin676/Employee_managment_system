<?php
include('nav3.php');
require_once('process/dbh.php');
$sql = "SELECT * FROM `salary` WHERE 1";
$result = mysqli_query($conn, $sql);
if (isset($_POST['salary'])) {
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $base = mysqli_real_escape_string($conn, $_POST['base']);
    $DA = mysqli_real_escape_string($conn, $_POST['DA']);
    $HRA = mysqli_real_escape_string($conn, $_POST['HRA']);
    $Medical = mysqli_real_escape_string($conn, $_POST['Medical']);
    $Vehicle = mysqli_real_escape_string($conn, $_POST['Vehicle']);
    $total = mysqli_real_escape_string($conn, $_POST['total']);
    $ProfessionalTax = mysqli_real_escape_string($conn, $_POST['ProfessionalTax']);
    $GroupInsurance = mysqli_real_escape_string($conn, $_POST['GroupInsurance']);
    $IncomeTax = mysqli_real_escape_string($conn, $_POST['IncomeTax']);
    $ProvidentFund = mysqli_real_escape_string($conn, $_POST['ProvidentFund']);
    $NetSalary = mysqli_real_escape_string($conn, $_POST['NetSalary']);
    $CutSalary = mysqli_real_escape_string($conn, $_POST['CutSalary']);

    $result = mysqli_query($conn, "UPDATE `salary` SET `base`='$base',`DA`='$DA',`HRA`='$HRA',`Medical`='$Medical',`Vehicle`='$Vehicle',`total`='$total',`ProfessionalTax`='$ProfessionalTax',`GroupInsurance`='$GroupInsurance',`IncomeTax`='$IncomeTax',`ProvidentFund`='$ProvidentFund',`NetSalary`='$NetSalary', `CutSalary`='$CutSalary' WHERE salary.id = $id");

    $upDA = ($base * 34) / 100;
    $upHRA = ($base * 10) / 100;
    $uptotal = $upHRA + $base + $Medical + $Vehicle;

    $upProvidentFund = (($base + $upDA) * 10) / 100;
    $upNetSalary = $uptotal - $ProfessionalTax - $GroupInsurance - $IncomeTax - $upProvidentFund - $CutSalary;


    $result = mysqli_query($conn, "UPDATE `salary` SET `base`='$base',`DA`='$upDA',`HRA`='$upHRA',`Medical`='$Medical',`Vehicle`='$Vehicle',`total`='$uptotal',`ProfessionalTax`='$ProfessionalTax',`GroupInsurance`='$GroupInsurance',`IncomeTax`='$IncomeTax',`ProvidentFund`='$upProvidentFund',`NetSalary`='$upNetSalary',`CutSalary` = '$CutSalary' WHERE salary.id = $id");

    echo ("<SCRIPT LANGUAGE='JavaScript'>
    window.alert('Succesfully Updated')
    window.location.href='salaryemp.php';
    </SCRIPT>");
}
?>

<?php
$id = (isset($_GET['id']) ? $_GET['id'] : '');
$sql = "SELECT * from `salary` WHERE id=$id";
$result = mysqli_query($conn, $sql);
if ($result) {
    while ($res = mysqli_fetch_assoc($result)) {
        $base = $res['base'];
        $DA = $res['DA'];
        $HRA = $res['HRA'];
        $Medical = $res['Medical'];
        $Vehicle = $res['Vehicle'];
        $total = $res['total'];
        $ProfessionalTax = $res['ProfessionalTax'];
        $GroupInsurance = $res['GroupInsurance'];
        $IncomeTax = $res['IncomeTax'];
        $ProvidentFund = $res['ProvidentFund'];
        $NetSalary = $res['NetSalary'];
        $CutSalary = $res['CutSalary'];
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Edit Salary</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/main.css" media="all">
    <link href="vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
    <link href="vendor/select2/select2.min.css" rel="stylesheet" media="all">
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
                    <h2 class="title">Update Salary</h2>
                    <form id="registration" action="editsalary.php" method="POST">
                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <label>Basic Salary</label>
                                    <input class="input--style-1" type="number" placeholder="Base Salary" required="required" name="base" value="<?php echo $base; ?>">
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <label>DA</label>
                                    <input class="input--style-1" type="number" readonly placeholder="DA" required="required" name="DA" value="<?php echo $DA; ?>">
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>HRA</label>
                            <input class="input--style-1" type="number" readonly placeholder="HRA" required="required" name="HRA" value="<?php echo $HRA; ?>">
                        </div>
                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <label>Medical</label>
                                    <input class="input--style-1" type="number" placeholder="Medical" name="Medical" required="required" value="<?php echo $Medical; ?>">
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <label>Vehicle</label>
                                    <input class="input--style-1" type="number" placeholder="Vehicle" name="Vehicle" required="required" value="<?php echo $Vehicle; ?>">
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Total Salary</label>
                            <input class="input--style-1" type="number" readonly placeholder="Total" name="total" value="<?php echo $total; ?>">
                        </div>
                        <div class="input-group">
                            <label>Professional Tax</label>
                            <input class="input--style-1" type="number" placeholder="Professional Tax" name="ProfessionalTax" required="required" value="<?php echo $ProfessionalTax; ?>">
                        </div>
                        <div class="input-group">
                            <label>Group Insurance</label>
                            <input class="input--style-1" type="number" placeholder="Group Insurance" name="GroupInsurance" required="required" value="<?php echo $GroupInsurance; ?>">
                        </div>
                        <div class="input-group">
                            <label>Income Tax</label>
                            <input class="input--style-1" type="number" placeholder="Income Tax" name="IncomeTax" required="required" value="<?php echo $IncomeTax; ?>">
                        </div>
                        <div class="input-group">
                            <label>Provident Fund</label>
                            <input class="input--style-1" type="number" readonly placeholder="Provident Fund" name="ProvidentFund" required="required" value="<?php echo $ProvidentFund; ?>">
                        </div>
                        <div class="input-group">
                            <label>Cut Salary</label>
                            <input class="input--style-1" type="number" readonly placeholder="Cut Salary" name="CutSalary" required="required" value="<?php echo $CutSalary; ?>">
                        </div>
                        <div class="input-group">
                            <label>Net Salary</label>
                            <input class="input--style-1" type="number" readonly placeholder="Net Salary" name="NetSalary" required="required" value="<?php echo $NetSalary; ?>">
                        </div>
                        <input type="hidden" name="id" id="textField" value="<?php echo $id; ?>" required="required"><br><br>
                        <div class="p-t-20">
                            <button class="btn btn--radius btn--green" type="submit" name="salary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</body>

</html>