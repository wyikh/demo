$(document).ready(function () {
  $("#slogan").hide();
  $("#overview").hide();
  $("#slogan").fadeIn(1500);
  $("#overview").fadeIn(1200);


});




function opennavbar() {
  document.getElementById("loginpage").style.width = "100%";
}
function closenavbar() {
  document.getElementById("loginpage").style.width = "0%";
}


function send_login() {
  let loginemail = document.querySelector("#loginemail").value;
  let loginpassword = document.querySelector("#loginpassword").value;

  if (loginemail == '' || loginpassword == '') {
    alert("Please fill in all the fields!")
  }
  else {
    console.log("success")
  }

}




