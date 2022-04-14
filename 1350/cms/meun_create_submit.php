<?php
include("inc_common.php");
check_login();
open_db();

$name=urlencode($_POST[name]);
$description=urlencode($_POST[description]);
$date=$_POST[date];

//======================Pic=========================
$org_name=$_FILES[pic][name];
$tmp_name=$_FILES[pic][tmp_name];
$ext=pathinfo($org_name,PATHINFO_EXTENSION);

if($ext!="jpg" && $ext!="png"){
	setcookie("msg","support jpg & png only",time()+60);
	header("location:meun_create.php");
	exit();
}

$new_name=time().rand(1000,9999).".".$ext;
$path="images/$new_name";

move_uploaded_file($tmp_name,"../$path");

//echo("$org_name<br>$tmp_name<br>$ext<br>$new_name<br>$path");
//exit();
//======================Pic=========================

$sql="insert into `meun` (name,description,date,pic) values ('$name','$description','$date','$path')";

if(mysqli_query($connect,$sql)){
	setcookie("msg","created",time()+60);
	header("location:meun.php");
}else{
	setcookie("msg","fail",time()+60);
	header("location:meun_create.php");
}
?>













