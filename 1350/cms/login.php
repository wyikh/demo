<!doctype html>
<html>
	<head>
		<?php include("inc_head.php");?>
		<title>Untitled Document</title>
	</head>

	<body>
		
		<main>
		
			<section id="form">
				<div class="container">
					<h1>CMS Login</h1>
					<form action="login_submit.php" method="post">
						<fieldset>
							<label>Username</label>
							<input type="text" name="username" required>
						</fieldset>
						<fieldset>
							<label>Password</label>
							<input type="password" name="password" required>
						</fieldset>
						<div class="btns">
							<input type="submit" value="Send">
							<input type="reset" value="Clear">
						</div>
					</form>
					<?php
					echo($_COOKIE[msg]);
					setcookie("msg","",time()-10);
					?>
				</div>
			</section>
		</main>
		
		
	</body>
</html>

















