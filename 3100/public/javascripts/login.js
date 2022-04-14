function login() {
    var email = $('#email').val();
    var password1 = $('#password1').val();

    if (email == "" || password1 == ""){
        alert("Please fillin all the fields!");
    }
    else{
        $.post("/member/login", {
            "email":email, "password":password1
        }, function(res){
            if (res.status==1){
                
                alert(res.msg);
            }
            else{
                $.cookie("username", res.data.username);
                $.cookie("useremail", res.data.email);
                $.cookie("A",res.data.admin)
                alert("Login successful!");
                location.href="/public/personalpage.html"
            }
        });
    }
}