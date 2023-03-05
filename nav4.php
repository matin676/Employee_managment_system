<?php
$id = (isset($_GET['id']) ? $_GET['id'] : '');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/nav.css">
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat" rel="stylesheet">
    <script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        @media (max-width: 1000px) {
            .max-width {
                padding: 0 50px;
            }

            .menu-btn {
                display: block;
                z-index: 999;
            }

            .menu-btn i.active:before {
                content: "\f00d";
            }

            .navbar .menu {
                position: fixed;
                height: 100vh;
                width: 100%;
                left: -100%;
                top: 0;
                background: black;
                text-align: center;
                padding-top: 80px;
                transition: all 0.3s ease;
            }

            .navbar .menu.active {
                left: 0;
            }

            .navbar .menu li {
                display: block;
            }

            .navbar .menu li a {
                display: inline-block;
                margin: 20px 0;
                font-size: 25px;
            }
        }
    </style>
</head>

<body>
    <nav class="navbar">
        <div class="max-width">
            <div class="logo"><a href="index.html">DDO<span>Bharuch</span></a></div>
            <ul class="menu">
                <li><a class="menu-btn" href="eloginwel.php?id=<?php echo $id ?>">Dashboard</a></li>
                <li><a class="menu-btn" href="myprofile.php?id=<?php echo $id ?>">My Profile</a></li>
                <li><a class="menu-btn" href="empproject.php?id=<?php echo $id ?>">My Projects</a></li>
                <li><a class="menu-btn" href="applyleave.php?id=<?php echo $id ?>">Apply Leave</a></li>
                <li><a href="elogin.php" class="menu-btn">Log Out</a></li>
            </ul>
            <div class="menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </nav>

    <script>
        $(document).ready(function () {
            $(window).scroll(function () {
                if (this.scrollY > 20) {
                    $('.navbar').addClass("sticky");
                } else {
                    $('.navbar').removeClass("sticky");
                }
            });

            $('.menu-btn').click(function () {
                $('.navbar .menu').toggleClass("active");
                $('.menu-btn i').toggleClass("active");
            })
        });
    </script>
</body>

</html>