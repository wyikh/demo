<?php
include("inc_common.php");
check_login();
open_db();

$id=$_GET[id];
$sql="select * from `meun` where id='$id'";	
$result=mysqli_query($connect,$sql);
$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
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
					<h1>Member News - Edit</h1>
					<form action="meun_edit_submit.php" method="post" enctype="multipart/form-data">
						<fieldset>
							<label>Name</label>
							<input type="text" name="name" value="<?=urldecode($row[name])?>" required>
						</fieldset>
						<fieldset>
							<label>Description</label>
							<textarea name="description" required><?=urldecode($row[description])?></textarea>
						</fieldset>
						<fieldset>
							<label>Pic</label>
							<input type="file" name="pic" >
							<h3>Current:</h3>
							<img src="../<?=$row[pic]?>" height="130">
						</fieldset>
						<fieldset>
							<label>Date</label>
							<input type="date" name="date" value="<?=$row[date]?>" required>
						</fieldset>
						<div class="btns">
							<input type="submit" value="Send">
							<input type="reset" value="Clear">
						</div>
						<input type="hidden" name="id" value="<?=$id?>">
						<input type="hidden" name="cur_pic" value="<?=$row[pic]?>">
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

















