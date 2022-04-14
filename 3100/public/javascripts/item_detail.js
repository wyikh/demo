$(document).ready(function () {




    var postid = window.location.search.substring(7);

    $.post("/post/show", {
        "_id": postid
    }, function (res) {
        if (res.status == 2) {
            location.href = "/public/photos.html"
        }
        else {

            
            element =
                `<div class ="row" style="margin-top:4em; margin-bottom:4em;  border: 2px solid ; border-radius:5px ;padding: 2em;">
                <div class="col-md-6">
                <img src='photos/`+ res.data[0]["photos"] + `'  style="max-width:300px">
                </div>
                <div class="col-md-6">
                <h6><span> Holder:</span> &ensp;`+ res.data[0]["holder"] + `</h6> <br/><br/>
                <h5><span>Item name:</span> &ensp;`+ res.data[0]["title"] + `</h5> <br/><br/>
                <h4><span>Item Description:</span> &ensp;` + res.data[0]["content"] + `</h4><br/><br/>
                <p><span>Item Usage: </span> &ensp; --` + res.data[0]["itemusage"] + `--</p><br/>
                <div style="display: flex;" id="ebtn">
                <a onclick="deletepost()" class="delt"  id="delt1" style="margin-right: 2em;">Delet</a>
                <a onclick="editpost()" class="edit" id="edit1">Edit</a> 
             </div>
                </div>
                </div>
                `

            document.querySelector("#postdetail").innerHTML += element;

            if (res.data[0]["holder"] == $.cookie('username') || $.cookie("A") == "true") {
                $("#delt1").show();
                $("#edit1").show();
            }
            else {
                $("#delt1").hide();
                $("#edit1").hide();
            }


        }
    });


    $.post("/blog/loadarticle", {
        "postid": postid
    }, function (res) {
        if (res.status == 1) {

            alert(res.msg)
        }
        else {

            var date1 = new Date(res.data.postdate)
            var date = (date1.getDate() + "/" + [date1.getMonth() + 1] + "/" + date1.getFullYear() + "&ensp; &ensp;" + date1.getHours() + ":" + date1.getMinutes());

            var element2
            element2
                =
                `<div class ="row" style="margin-top:4em; margin-bottom:4em;">
            <div class="col-md-12" >
            <h2>Leave Your Comment!</h2>
            <div style="position: relative; border: 0.8px solid rgb(0, 0, 0); border-radius: 8px;padding:1.5em; background-color: #dddddd;">
            <div style="display:flex">
            <img src="../public/images/usericon.png" style="width:35px; float:left;"/>
            <h5 style=" float:left;">`+ res.data["username"] + `</h5>
            </div><br/>
            <h4 style=" position:absolute; right:15px;top:10px">Post Date: &ensp;` + date + `</h4>
            <div id="content1">
            <h3 style="font-weight:bold; font-size:1.2em;" >Title: &ensp;`+ res.data["title"] + `</h3>  <hr style="border-top: 1px dashed"/><br/>
            
            <h4 style="color: #2b2b2b;">` + res.data["content"] + `</h4>
            <div class="btns"style=" position:absolute !important; right:30px !important;bottom:15px;>
            <input type="submit" onclick="" value="" />
            <input type="submit" onclick="showcomment()" value="Comment" />
            <input type="submit" onclick="editarticle()" id="editpost1" value="Edit" />
            </div>
            </div>
            </div>
            </div>
            </div>
            
            `
            document.querySelector("#postdetail").innerHTML += element2;

            if (res.data["username"] == $.cookie('username') || $.cookie("A") == "true") {
                $("#editpost1").show();
                
            }
            else {

                $("#editpost1").hide();
            }
            


            var comment
            var count = 1;

            res.data.comment.forEach((e) => {
                comment = "";
                var cmdate = new Date(e.date)
                cmdate = (cmdate.getDate() + "/" + [cmdate.getMonth() + 1] + "/" + cmdate.getFullYear() + "&ensp; &ensp;" + cmdate.getHours() + ":" + cmdate.getMinutes());
                comment =
                    `<div class ="row" style="margin-top:1em; margin-bottom:1em;">
            <div class="col-md-12" >
            <div style="position: relative; border: 0.8px solid rgb(0, 0, 0); border-radius: 8px;padding:1.5em; background-color: #e4e3e3;">
            <h4>Comment #`+ count + `<h4><br/>
            <div style="display:flex">
            <img src="../public/images/usericon.png" style="width:35px; float:left;"/>
            <h5 style=" float:left;">`+ e.name + `</h5>
            </div>
            <h4 style=" position:absolute; right:15px;top:10px">Date: &ensp;` + cmdate + `</h4>
            <div id="content1">
            <hr style="border-top: 1px dashed"/>
            <h4 style="color: #2b2b2b;">` + e.message + `</h4>
            <div class="btns"style=" position:absolute !important; right:30px !important;bottom:10px;>
            <input type="submit" onclick="" value="" />
            <input type="submit" onclick="deletecomment()" id ="decom" value="Delete" />
            <input type="submit" onclick="editcommentbtn() id="editcom1" value="Edit" />
            </div>
            </div>
            </div>
            </div>
            </div>
            `
                count++;
                document.querySelector("#postdetail").innerHTML += comment;
                

                var ed = `


                <div id="editcomment1" style="width:40%; padding: 2em; ;display: none; position: fixed; top:50%; left:30%; border-radius: 8px; background-color: rgb(192, 192, 192, 0.8); z-index: 100;">
                <fieldset style="margin-left:auto; margin-right:auto;">
                    <h3>Comment</h3>
            
                    <label>Edit Content</label>
                    <textarea id="content4" name="content4" style="width: 100%; height:100px"></textarea>
            
                    <div class="btns">
                        <input type="submit" onclick="editcomment1()" value="Edit" />
                        <input type="submit" onclick="editcommentbtn()" value="Cancel" />
                    </div>
                </fieldset>
            </div>`
                document.querySelector("#postdetail").innerHTML += ed;

                if (e.name == $.cookie('username') || $.cookie("A") == "true") {
                    $("#decom").show();
                    $("#editcom1").show();
                    
                }
                else {
    
                    $("#decom").hide();
                    $("#editcom1").hide();
                }

            });


        }


    });



});


function deletepost() {
    if (confirm('Are you sure to delet this post?')) {
        var postid = window.location.search.substring(7);

        $.post("/post/delete", {
            "_id": postid
        }, function (res) {
            if (res.status == 1) {
                alert(res.msg);
            }
            else {
                $.post("/blog/deletearticle", {
                    "postid": postid
                }, function (res) {
                    if (res.status == 1) {
                        alert(res.msg);
                    }
                    else {
                        alert("Deleted!")
                        location.href = "/public/photos.html"
                    }

                })
            }
        });

    }

}






function editpost() {

    var postid = window.location.search.substring(7);

    $.post("/post/show", {
        "_id": postid
    }, function (res) {
        if (res.status == 1) {
            alert(res.msg);
        }
        else {
            const el = document.getElementById("postdetail");
            while (el.firstChild) el.removeChild(el.firstChild);

            var element2
            if (res.data[0]["itemusage"] == "First-Hand") {
                element2 = `                        
                <option value="First-Hand" selected>First-Hand</option>
                <option value="Second-Hand">Second-Hand</option>`
            }
            else {
                element2 =
                    `<option value="First-Hand">First-Hand</option>
                <option value="Second-Hand" selected>Second-Hand</option>`
            }

            element =
                `<br/>
            <fieldset id="chpwd" style="margin-left:auto; margin-right:auto;">
                <h3>Edit Post</h3>
                <label>Title</label>
                <input type="text" id="title" name="title" value="`+ res.data[0]["title"] + `" />
        
                <label>itemusage</label>
                    <select id="itemusage">
                    `+ element2 + `
                    </select>
                <label>Description</label>
                <label for="editim"> Choose Image </label>
                <div> <input type="file" ' name="file" id="photo1" accept="image/jpeg,image/jpg,image/gif,image/png" onchange="Editp(event)" /> </div>
                <div> <img id="edit1" style="max-width:300px"/> </div>
                <textarea id="description" name="description"  >`+ res.data[0]["content"] + `</textarea>
                <div class="btns">
                    <input type="submit" onclick="postedit()" value="Update" />
                    <input type="submit" onclick="canceledit()" value="Cancel" />
                </div>
            </fieldset>
            `;

            document.querySelector("#postdetail").innerHTML += element;

        }
    });

}

function Editp(e) {
    var image = document.getElementById('edit1');
    image.src = URL.createObjectURL(e.target.files[0]);
    image.onload = function () {
        URL.revokeObjectURL(image.src)
    }
};

function canceledit() {
    location.reload()
}


function postedit() {
    let postid = window.location.search.substring(7);
    let title = $("#title").val();
    let itemusage = $("#itemusage").val();
    let description = $("#description").val().replace(/ /g, '&nbsp').replace(/\n/g, '<br />');
    let photo = $("#photo1").val().replace(/C:\\fakepath\\/i, '');


    if (title == "" || itemusage == "" || description == "") {
        alert("please fillin all the fields!");
    }

    else {
        $.post("/post/update", { "_id": postid, "title": title, "itemusage": itemusage, "content": description, "photo": photo }, function (res) {
            if (res.status == 0) {
                alert("Post Updated");
                location.href = "/public/photos.html"
            }
            else {
                alert(res.msg);
            }
        });
    }
}


function editarticle() {


    var postid = window.location.search.substring(7);

    $.post("/blog//loadarticle", {
        "postid": postid
    }, function (res) {
        if (res.status == 1) {
            alert(res.msg);
        }
        else {
            const el = document.getElementById("content1");
            while (el.firstChild) el.removeChild(el.firstChild);

            element =
                `<br/>
            <fieldset id="chpwd" style="margin-left:auto; margin-right:auto;">
                <label>Title</label>
                <input type="text" id="title1" name="title" value="`+ res.data["title"] + `"  style="width:80%"/>
        
                <label>Content</label>
                <textarea id="content2" name="description"  style="width:80%; height:150px; !important;">`+ res.data["content"] + `</textarea>
        
                <div class="btns">
                    <input type="submit" onclick="articleedit()" value="Update" />
                    <input type="submit" onclick="canceledit()" value="Cancel" />
                </div>
            </fieldset>
            `;
            document.querySelector("#content1").innerHTML += element;

        }
    });


}

function articleedit() {
    let postid = window.location.search.substring(7);
    let title = $("#title1").val();
    let description = $("#content2").val().replace(/ /g, '&nbsp').replace(/\n/g, '<br />');

    if (title == "" || description == "") {
        alert("please fillin all the fields!");
    }

    else {
        $.post("/blog/articleupdate", { "postid": postid, "title": title, "content": description }, function (res) {
            if (res.status == 0) {
                alert("Updated");
                location.reload()
            }
            else {
                alert(res.msg);
            }
        });
    }
}

function showcomment() {
    if ($('#commentbox').css('display') == "none") {
        $('#commentbox').css('display', 'block');
    }
    else {
        $('#commentbox').css('display', 'none');
    }

}

function editcommentbtn() {
    if ($('#editcomment1').css('display') == "none") {
        $('#editcomment1').css('display', 'block');
    }
    else {
        $('#editcomment1').css('display', 'none');
    }

}




function editcomment() {


    var postid = window.location.search.substring(7);

    $.post("/blog//loadarticle", {
        "postid": postid
    }, function (res) {
        if (res.status == 1) {
            alert(res.msg);
        }
        else {
            const el = document.getElementById("content1");
            while (el.firstChild) el.removeChild(el.firstChild);

            element =
                `<br/>
            <fieldset id="chpwd" style="margin-left:auto; margin-right:auto;">
                <label>Title</label>
                <input type="text" id="title1" name="title" value="`+ res.data["title"] + `"  style="width:80%"/>
        
                <label>Content</label>
                <textarea id="content2" name="description"  style="width:80%; height:150px; !important;">`+ res.data["content"] + `</textarea>
        
                <div class="btns">
                    <input type="submit" onclick="articleedit()" value="Update" />
                    <input type="submit" onclick="showcomment()" value="Cancel" />
                </div>
            </fieldset>
            `;
            document.querySelector("#content1").innerHTML += element;

        }
    });


}



function addcomment() {
    var message = $('#content3').val().replace(/ /g, '&nbsp').replace(/\n/g, '<br />');
    var postid = window.location.search.substring(7);
    if (message == "") {
        alert("Please type something")
    }
    else {


        $.post("/blog/addcomment", { "postid": postid, "content": message, "name": $.cookie("username") }, function (res) {
            if (res.status == 0) {
                location.reload()
            }
            else {
                alert(res.msg);
            }
        });

    }





}