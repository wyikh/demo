$(document).ready(function () {

    if ($.cookie("A")!="true")
    {
        $("#vuser").hide();
    }
    viewpost()

});


function viewpost()
{
    var name = $.cookie("username");
    $.post("/post/show", {
        "holder":name
    }, function(res){
        if (res.status==1){
            alert(res.msg);
        }
        else{

            console.log(res.data)

            var locMap = {};
            var count = 0;
            var element ;

            var content=document.createElement("div")

            const el = document.getElementById("action");
            while (el.firstChild) el.removeChild(el.firstChild);
          
            res.data.forEach((e2) => {
              locMap[count] = e2;
              count++;
            });
            if (count==0)
            {
                document.querySelector("#action").innerHTML += `<h4 style="color:red;">You don not have post, Create One Post Now!</h4>`;
            }

            for (let i = 0; i < count; i++) {
                element = 
                `
                <div class="col-md-3">
                <a href="item_detail.html?value=`+locMap[i]["_id"]+`">
                <div class="outside">
                <div style="display:flex">
                <img src="../public/images/usericon.png" style="width:30px; float:left;"/>
                <h6> `+ locMap[i]["holder"] +`</h6> 
                </div><br/>

                    <div class="upper">
                    <img src='photos/`+locMap[i]["photos"]+`'>
                    </div>
                    <div class="lower">
                        <h5>`+ locMap[i]["title"]+ `</h5>
                        <span>` +locMap[i]["content"]+ `</span><br/><br/>
                        <u> --` +locMap[i]["itemusage"]+ `--</u>
                    </div>
                </div>
                </a>
            </div>
                
            `
                 document.querySelector("#action").innerHTML += element;
  
              }
  
        }
    });

    
}


function changepwd()
{
    const el = document.getElementById("action");
    while (el.firstChild) el.removeChild(el.firstChild);


    element=
    `
    <fieldset id="chpwd" style="margin-left:auto; margin-right:auto;">
        <h3>Change Password</h3>
        <label>Old Password</label>
        <input type="password" id="opwd1" name="opwd1" style="width: 100% !important;" />

        <label>Password</label>
        <input type="password" id="pwd1" name="pwd1" style="width: 100% !important;"/>

        <label>Confirm Password</label>
        <input type="password" id="confirmpassword" name="confirmpassword" style="width: 100% !important;"/>

        <div class="btns">
            <input type="submit" onclick="updatepwd()" value="Update" />
        </div>
    </fieldset>
    `;

    document.querySelector("#action").innerHTML += element;

}

function updatepwd()
{
    let opwd = $("#opwd1").val();
    let pwd = $("#pwd1").val();
    let confirmpassword = $("#confirmpassword").val();

    if (opwd=="" || pwd == "" || confirmpassword == "")
    {
        alert("please fillin all the fields!");
    }

    else if (pwd != confirmpassword) {
        alert("Your Password and Confirm Password do not match!");
    }

    else {
        $.post("/member/changePass", { "email": $.cookie("useremail"), "password": pwd ,"oldpassword":opwd , "confirmpassword":confirmpassword}, function (res) {
            if (res.status == 0) {
                alert("Password Changed!");
                location.href = '/public/personalpage.html';
            }
            else
            {
                alert(res.msg);
            }
        });
    }

}


function creatpost()
{
    const el = document.getElementById("action");
    while (el.firstChild) el.removeChild(el.firstChild);


    element=
    `
    <fieldset id="chpwd" style="margin-left:auto; margin-right:auto;">
        <h3>Create Post</h3>
        <label>Item Name</label>
        <input type="text" id="title" name="title" style="width: 100% !important;" />

        <label>itemusage</label>
            <select id="itemusage" style="width: 100% !important;">
                <option value="First-Hand">First-Hand</option>
                <option value="Second-Hand">Second-Hand</option>
            </select>
            <div>
            <label for="editim"> Choose Image </label>
            <div> <input type="file" name="file" id="photo1" accept="image/jpeg,image/jpg,image/gif,image/png" onchange="Editp(event)" /> </div>
            <div> <img id="edit1"/> </div>
        </div>

        <label>Description</label>
        <textarea id="description" name="description" style="width: 100% !important;"></textarea>

        <div class="btns">
            <input type="submit" onclick="postcreate()" value="Create" />
        </div>
    </fieldset>
    `;

    document.querySelector("#action").innerHTML += element;


}


function Editp(e) {
    var image = document.getElementById('edit1');
    image.src = URL.createObjectURL(e.target.files[0]);
    image.onload = function () {
        URL.revokeObjectURL(image.src)
    }
};

function postcreate()
{   
    let title = $("#title").val();
    let itemusage = $("#itemusage").val();
    let photo = $("#photo1").val().replace(/C:\\fakepath\\/i, '');
    let description = $("#description").val();
   


    if (title=="" || itemusage == "" || description == "")
    {
        alert("please fillin all the fields!");
    }

    else {
        $.post("/post/create", { "holder": $.cookie("username"), "title": title ,"itemusage":itemusage , "content":description, "photo":photo}, function (res) {
            if (res.status == 0) {
                
                var postdata = { 
                    title:title, content:description, username: $.cookie("username"), postid:res.data._id, itemusage:itemusage
                }
                $.post("/blog/addarticle", postdata, function(res){
                    if(res.status == 0)
                    {
                        viewpost();
                    }
                });
            }
            else
            {
                alert(res.msg);
            }
        });
    }
}

function viewuser()
{
    $.get("/member/view", {
    }, function(res){
        if (res.status==1){
            alert(res.msg);
        }
        else{
            var locMap = {};
            var count = 0;
            var element ;

            const el = document.getElementById("action");
            while (el.firstChild) el.removeChild(el.firstChild);
          
            res.data.forEach((e2) => {
              locMap[count] = e2;
              count++;
            });
            if (count==0)
            {
                document.querySelector("#action").innerHTML += `<h4 style="color:red;">NO users</h4>`;
            }


            for (let i = 0; i < count; i++) {
                element = 
               ` <div class="col-md-3">
                <div class="outside">
                    <h6> User#`+[i+1]+`: `+ res.data[i]["username"]  +`</h6> <br/>
                    <h6> Email: `+ res.data[i]["email"]+ `</h6>
                </div>
            </div>`
                 document.querySelector("#action").innerHTML += element;
  
              }
  
        }
    });
}
