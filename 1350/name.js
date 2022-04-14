$(document).ready(function(){
	$("header .icon").on("click",function(){
		$("header nav").slideToggle();
		$("header .icon img").toggle();
	});

});
