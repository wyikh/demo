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
?>