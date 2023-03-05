<?php
include('nav6.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Employee Salary Panel</title>
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
                    <h2 class="title">Salary History</h2>
                    <form id="historyUpdation" action="process/addhistoryprocess.php" method="POST" enctype="multipart/form-data">
                        <div class="col-2">
                            <div class="input-group">
                                <input class="input--style-1" type="number" placeholder="Year" name="year">
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="input-group">
                                <input class="input--style-1" type="number" placeholder="Yearly Salary" name="ysalary">
                            </div>
                        </div>
                        <div class="input-group">
                            <input class="input--style-1" type="text" placeholder="Month" name="Month">
                        </div>
                        <div class="col-2">
                            <div class="input-group">
                                <input class="input--style-1" type="number" placeholder="Monthly Salary" name="salary">
                            </div>
                        </div>
                </div>
                <div class="p-t-20" style="position: absolute; right: 33rem; bottom: 11rem;">
                    <button class="btn btn--radius btn--green" type="submit" name="update_salary">Submit</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    </div>

</body>

</html>