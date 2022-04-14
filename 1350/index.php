<?php
include("inc_common.php");
open_db();
?>
<!doctype html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>Lesson of web buiilding</title>
	<link href="https://fonts.googleapis.com/css2?family=Bad+Script&family=Roboto:wght@400;700&display=swap"
		rel="stylesheet">
	<link href="reset.css" rel="stylesheet">
	<link href="style.css" rel="stylesheet">
	<script src="jquery-3.5.1.min.js"></script>
	<script src="name.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.css">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Kiwi+Maru&display=swap" rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.min.js"></script>

</head>

<body>
	<header>
		<div class="container">
			<a href="index.html" class="logo">Burger House</a>
			<div class="icon">
				<img src="images/menu.svg" class="menu" style="color: white;">
				<img src="images/close.svg" class="close" style="color: white;">
			</div>
			<nav>
				<a href="index.html">Home</a>
			</nav>
		</div>
	</header>

	<main>
		<section id="banner" style=" background-image: url(images/banner1.jpg) ;">
			<div class="slogan">
				<h1>Burger House</h1>
				<hr>
				<p>Taste the best burger</p>
			</div>
		</section>

		<section id="welcome">
			<div class="container">
				<h1>-welcome-</h1>
				<div id="row">
					<p>It is a long established fact that a reader will be distracted by the readable content of a page
						when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
						distribution of letters, as opposed to using 'Content here, content here', making it look like
						readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
						their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
						their infancy.</p>
					<div id="imgoutside">
						<img src="images/welcome.jpg">
					</div>
				</div>
			</div>
		</section>


		<section id="enjoy" style=" background-image: url(images/enjoy.jpg);">
			<h1>Share Happiness With Friends & Family</h1>
		</section>


		<section id="news">
			<div id="meun">
				<h1>-Meun-</h1>
			</div>
			<div class="container">
                <?php
                $sql="select * from `meun`";
                $result=mysqli_query($connect,$sql);
                
                while($row=mysqli_fetch_array($result,MYSQLI_ASSOC)){
                ?>
                
                <div class="item">
                    <div class="imgbox">
                        <img src="<?=$row[pic]?>">
                    </div>
                    <h1><?=urldecode($row[name])?></h1>
                    <p><?=nl2br(urldecode($row[description]))?></p>
                    </div>
                    <?php
                    }
                    ?>
			    </div>
		</section>
		<section id="faq" style=" background-image: url(images/qa.jpg);">
			<div class="container">
				<h1>FAQs</h1>
				<ul>
					<li>
						<div class="q">HOW CAN I CHANGE MY SHIPPING ADDRESS?</div>
						<div class="a">By default, the last used shipping address will be saved into to your Sample
							Store account. When you are checking out your order, the default shipping address will be
							displayed and you have the option to amend it if you need to.</div>
					</li>
					<li>
						<div class="q">HOW DO I ACTIVATE MY ACCOUNT?</div>
						<div class="a">The instructions to activate your account will be sent to your email once you
							have submitted the registration form. If you did not receive this email, your email service
							provider’s mailing software may be blocking it. You can try checking your junk / spam folder
							or contact us at help@samplestore.com</div>
					</li>
					<li>
						<div class="q">WHAT DO YOU MEAN BY POINTS? HOW DO I EARN IT?</div>
						<div class="a">Because you are important to us, we want to know what you think about the
							products. As an added value, every time you rate the products you earn points which go
							straight to your account. 1 point are added to your account for every review that you give.
							You will need those points in order to redeem the sample products. So keep rating the
							products to keep earning points!</div>
					</li>
					<li>
						<div class="q">HOW CAN I USE MY REMAINING ACCOUNT CREDITS?</div>
						<div class="a">We are in the process of removing the option to pay for your orders by ‘Account
							Credits’. If you have remaining credits in your account, it will be used to pay for your
							next checkout. If there are insufficient credits, the system will direct you automatically
							to pay the balance via Paypal.</div>
					</li>
				</ul>
			</div>
		</section>
	</main>

	<footer>© Kennth Lam 2020</footer>

	<script>
		$(document).ready(function () {


			$(".slogan").hide();
			$(".slogan").fadeIn(1600);
			$('.slider').bxSlider({ mode: "vertical", auto: true });
			$("#faq .a").hide();

			$("#faq .q").on("click", function () {
				$(this).siblings().slideToggle();
				$(this).parent().toggleClass("open").siblings().removeClass("open").children(".a").slideUp();
			});

		});


	</script>
</body>

</html>