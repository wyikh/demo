

$(document).ready(function(){
    $("#file1").change(function () {
        readURL(this);
    });
  });

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) { 
            $("file1").attr('src',e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function upload() {
    var img = document.getElementById('u_img_file');
    if (!/.(jpg|JPG|png|PNG|jpeg|JPEG)$/.test(img.value)) {
        alert("Invaild photo type!");
        return;
    }
    var formData = new FormData();
    formData.append("file", img.files[0]);


    var url = "/photo/upload?email=" + $.cookie('useremail');
    
    $.ajax({
        url: url,
        type: "POST",
        data: FormData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (res) {
            if (res.status == 0) {
                alert("Posted!");
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

