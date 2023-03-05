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
</head>

<body>
    <nav class="navbar">
        <div class="max-width">
            <div class="logo"><a href="index.html">DDO<span>Bharuch</span></a></div>
            <ul class="menu">
                <li><a href="index.php" class="menu-btn">Home</a></li>
                <li><a href="elogin.php" class="menu-btn">Employee Login</a></li>
				<li><a href="alogin.php" class="menu-btn">Admin Login</a></li>
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