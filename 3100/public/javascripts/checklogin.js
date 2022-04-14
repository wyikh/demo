$(document).ready(function () {
    if (!$.cookie('username') || $.cookie('username')== null || $.cookie('username')== "" || !$.cookie('useremail') || $.cookie('useremail') == "")
    {
        location.href="/public/index.html"
    }
  });