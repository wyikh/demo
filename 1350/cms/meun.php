<?php
include("inc_common.php");
check_login();
open_db();
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
			<h1>Meun</h1>
			<nav>
				<a href="meun_create.php">Add new meun item</a>
			</nav>
			<table width="800">
				<thead>
					<tr>
						<td>id</td>
						<td>name</td>
						<td>pic</td>
						<td>date</td>
						<td>actions</td>
					</tr>
				</thead>
				<tbody>
					<?php
					$sql="select * from `meun`";	
					$result=mysqli_query($connect,$sql);
					while($row=mysqli_fetch_array($result, MYSQLI_ASSOC)){
					?>
					<tr>
						<td><?=$row[id]?></td>
						<td><?=urldecode($row[name])?></td>
						<td><img src="../<?=$row[pic]?>" width="80"></td>
						<td><?=$row[date]?></td>
						<td>
							<a href="meun_edit.php?id=<?=$row[id]?>">Edit</a>
							<a onClick="return confirm('Are you sure to Detete it?')" href="meun_delete.php?id=<?=$row[id]?>">Delete</a>
						</td>
					</tr>
					<?php
					}
					?>
				</tbody>
			</table>
			<?php
			echo($_COOKIE[msg]);
			setcookie("msg","",time()-10);
			?>
		</main>
		
	</body>
</html>


























