<?php
include('nav2.php');
// include('nav.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DDO Bharuch | Log In</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat" rel="stylesheet">
    <!-- <link rel="stylesheet" type="text/css" href="css/stylelogin.css"> -->
    <link rel="stylesheet" type="text/css" href="css/registration.css">
    <script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

    <!-- <div class="loginbox">
        <img src="assets/avatar.png" class="avatar">
        <h1>Employee Login</h1>
        <form action="process/eprocess.php" method="POST">
            <div class="container">
                <div class="input-field">
                    <input class="focus" type="email" name="mailuid" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                        required="required">
                    <label class="email">Email</label>
                </div>
                <div class="input-field">
                    <input class="pswrd focus" type="password" name="pwd" required="required">
                    <span class="show" style="left: 77%;">SHOW</span>
                    <label class="pass">Password</label>
                </div>
                <div class="button">
                    <input type="submit" name="login-submit" value="Login">
                </div>
            </div>
        </form>
    </div> -->

    <div class="login_container">
        <header>Employee Login</header>
        <form action="process/eprocess.php" method="POST">
            <div class="input-field">
                <input name="mailuid" type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$">
                <label>Email</label>
            </div>
            <div class="input-field">
                <input name="pwd" class="pswrd" type="password" required>
                <span class="show">SHOW</span>
                <label>Password</label>
            </div>
            <div class="button">
                <div class="inner"></div>
                <button name="login-submit">Log in</button>
            </div>
        </form>
    </div>

    <script>
        var input = document.querySelector('.pswrd');
        var show = document.querySelector('.show');
        show.addEventListener('click', active);

        function active() {
            if (input.type === "password") {
                input.type = "text";
                show.style.color = "#f78569";
                show.textContent = "HIDE";
            } else {
                input.type = "password";
                show.textContent = "SHOW";
                show.style.color = "#111";
            }
        }
    </script>
</body>

</html>