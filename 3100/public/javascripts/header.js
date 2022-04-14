
$(document).ready(function () {
    if (!$.cookie('username') || $.cookie('username')== null || $.cookie('username')== "" || !$.cookie('useremail') || $.cookie('useremail') == "")
    {
        $('#login1').show();
        $('#logout1').hide();

    }
    else
    {
        $('#login1').hide();
        $('#logout1').show();
        $('#uname').text("Hello: " +$.cookie('username'));
    }
  });


function logout(){
    $.cookie('username', "");
    $.cookie('useremail',"");
    $.cookie('A',"");
    location.href="/public/index.html";
}