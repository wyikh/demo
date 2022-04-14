$(document).ready(function () {

    $.get("/post/show", {
        
    }, function(res){
        if (res.status==1){
            alert(res.msg);
        }
        else{

            var locMap = {};
            var count = 0;
            var element
            res.data.forEach((e2) => {
              locMap[count] = e2;
              count++;
            });
            

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

                document.querySelector("#post").innerHTML +=element;
  
              }

        }
    });


  });


  function search1()
  {

      var search = $('#search').val();
    $.post("/post/search", {
        "title":search
    }, function(res){
        if (res.status==1){
            alert(res.msg);
        }
        else{

            var locMap = {};
            var count = 0;
            var element

            const el = document.getElementById("post");
            while (el.firstChild) el.removeChild(el.firstChild);
          
            res.data.forEach((e2) => {
              locMap[count] = e2;
              count++;
            });

            if (count==0)
            {
                element=
                `<div class="col-md-12">
                <h3>Your search did not match any post</h3>
                </div>`
                document.querySelector("#post").innerHTML +=element;
            }
            else
            {
                for (let i = 0; i < count; i++) {
                    element = 
                    `<div class="col-md-3">
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
                </div>`
    
                    document.querySelector("#post").innerHTML +=element;
      
                  }

            }

  
        }
    });
  }