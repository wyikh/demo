<?php
$connect="";
function open_db(){
	global $connect;
	$connect=mysqli_connect("localhost","root","password","buger");
	if(mysqli_connect_error()){
		echo("DB connect error");
		exit();
	}
}

function check_login(){
	session_start();
	if(!isset($_SESSION[username])){
		header("location:login.php");
	}
}
?>