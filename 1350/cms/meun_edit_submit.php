<?php
include("inc_common.php");
check_login();
open_db();

$name=urlencode($_POST[name]);
$description=urlencode($_POST[description]);
$date=$_POST[date];
$id=$_POST[id];
$cur_pic=$_POST[cur_pic];

//======================Pic=========================
if($_FILES[pic][name]!=""){
	$org_name=$_FILES[pic][name];
	$tmp_name=$_FILES[pic][tmp_name];
	$ext=pathinfo($org_name,PATHINFO_EXTENSION);

	if($ext!="jpg" && $ext!="png"){
		setcookie("msg","support jpg & png only",time()+60);
		header("location:meun_edit.php?id=$id");
		exit();
	}

	$new_name=time().rand(1000,9999).".".$ext;
	$path="images/$new_name";

	move_uploaded_file($tmp_name,"../$path");
}else{
	$path=$cur_pic;
}


//echo("$org_name<br>$tmp_name<br>$ext<br>$new_name<br>$path");
//exit();
//======================Pic=========================

$sql="update `meun` set name='$name',description='$description',date='$date',pic='$path' where id='$id'";

if(mysqli_query($connect,$sql)){
	setcookie("msg","updated",time()+60);
	header("location:meun.php");
}else{
	setcookie("msg","fail",time()+60);
	header("location:meun_edit.php?id=$id");
}
?>













