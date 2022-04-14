<?php
include("inc_common.php");
check_login();
open_db();

$id=$_GET[id];

$sql="delete from `meun` where id='$id'";

if(mysqli_query($connect,$sql)){
	setcookie("msg","deleted",time()+60);
	header("location:meun.php");
}else{
	setcookie("msg","fail",time()+60);
	header("location:meun.php");
}
?>













