<?php
include('nav3.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Add Salary</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
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
                    <h2 class="title addemp-h2">Salary Info</h2>
                    <form action="process/addsalaryprocess.php" name="Salary Form" method="POST" enctype="multipart/form-data">

                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <input class="input--style-1" type="number" placeholder="Base Salary" required="required" name="base">
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <input class="input--style-1" type="number" placeholder="DA" required="required" name="DA" >
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <input class="input--style-1" type="number" placeholder="HRA" required="required" name="HRA">
                        </div>
                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <input class="input--style-1" type="number" placeholder="Medical" name="Medical" required="required">

                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <input class="input--style-1" type="number" placeholder="Vehicle" name="Vehicle" required="required">
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <input class="input--style-1" type="number" placeholder="Total" name="total" >
                        </div>
                        <div class="input-group">
                            <input class="input--style-1" type="number" placeholder="Professional Tax" name="ProfessionalTax" required="required">
                        </div>
                        <div class="input-group">
                            <input class="input--style-1" type="number" placeholder="Group Insurance" name="GroupInsurance" required="required">
                        </div>
                        <div class="input-group">
                            <input class="input--style-1" type="number" placeholder="Income Tax" name="IncomeTax" required="required">
                        </div>
                        <div class="input-group">
                            <input class="input--style-1" type="number" placeholder="Provident Fund" name="ProvidentFund" required="required">
                        </div>
                        <div class="input-group">
                            <input class="input--style-1" type="number" placeholder="Net Salary" name="NetSalary" required="required">
                        </div>

                        <div class="p-t-20">
                            <button class="btn btn--radius btn--green" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/select2/select2.min.js"></script>

</body>

</html>