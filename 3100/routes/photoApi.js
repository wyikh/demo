var express = require('express');
var router = express.Router();
var multer = require('multer');
var memberModel = require('../models/memberModel.js');

var storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'./public/photos');
    },
    filename: function(req, file, cb){
        var str = file.originalname.split('.');
        cb(null, Date.now() + '.' +str[1]);
    }
});



var upload = multer({storage: storage});


router.post("/upload", upload.single("file"), function(req,res, next){
    memberModel.findOne({email: req.query.email}, function(err, data){
        console.log(req);
        data.photos.push(req.file.filename);
        data.markModified('photos');
        data.save(function (err){
            if (err){
                res.json({"status": 1, "msg": "error"});
            }
            else {
                res.json({"status": 0, "msg": "success", "photos": data.photos});
            }
        });
   });
});


router.post("/getPhoto", function(req,res, next){
    memberModel.findOne({email: req.query.email}, 
        function(err, data){

            if (err){
                res.json({"status": 1, "msg": "error"});
            }
            else {
                res.json({"status": 0, "msg": "success", "photos": data});
            }
    });
});


module.exports=router;
