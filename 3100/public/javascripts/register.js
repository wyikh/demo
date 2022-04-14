function register() {
    let username1 = $("#username1").val();
    let email1 = $("#email1").val();
    let confirmemail = $("#confirmemail").val();
    let pwd = $("#pwd1").val();
    let confirmpassword = $("#confirmpassword").val();

    if (username1 == "" ||  email1 == "" || confirmemail == "" || pwd == "" || confirmpassword == "")
    {
        alert("please fillin all the fields!");
    }
    else if(email1.search("cuhk.edu.hk") == -1)
    {
        alert("You HAVE TO use CUHK email for register")
    }

    else if (email1 != confirmemail) {
        alert("Your Email and Confirm Email do not match!");
    }

    else if (pwd != confirmpassword) {
        alert("Your Password and Confirm Password do not match!");
    }

    else {
        $.post("/member/register", { "username": username1, "email": email1, "password": pwd }, function (res) {
            if (res.status == 0) {
                alert("account created!");
                location.href = '/public/index.html';
            }
            else if (res.status == 1) {
                alert(res.msg);
            }
        });
    }
}