<?php
include("inc_common.php");
check_login();
?>
<!doctype html>
<html>
	<head>
		<?php include("inc_head.php");?>
		<title>Untitled Document</title>
	</head>

	<body>
		<?php include("inc_header.php");?>
		<main>
		
			<section id="form">
				<div class="container">
					<h1>Meun Item- Create</h1>
					<form action="meun_create_submit.php" method="post" enctype="multipart/form-data">
						<fieldset>
							<label>Name</label>
							<input type="text" name="name" required>
						</fieldset>
						<fieldset>
							<label>Description</label>
							<textarea name="description" required></textarea>
						</fieldset>
						<fieldset>
							<label>Pic</label>
							<input type="file" name="pic" required>
						</fieldset>
						<fieldset>
							<label>Date</label>
							<input type="date" name="date" required>
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

















