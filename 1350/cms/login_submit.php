<?php
include("inc_common.php");
open_db();

$username=$_POST[username];
$password=$_POST[password];

$sql="select * from `admin` where username='$username' and password='$password'";
$result=mysqli_query($connect,$sql);
$row_total=mysqli_num_rows($result);

if($row_total>0){
	session_start();
	$_SESSION[username]=$username;
	header("location:index.php");
}else{
	setcookie("msg","fail",time()+60);
	header("location:login.php");
}
?>













