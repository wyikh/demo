var express = require('express');
var router = express.Router();
var multer = require('multer');
var postModel = require('../models/postModel.js');


var storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'./public/photos');
    },
    filename: function(req, file, cb){
        var str = file.originalname.split('.');
        cb(null, Date.now() + '.' +str[1]);
    }
});



var upload = multer({storage: storage}).single("file");





router.post('/create', function (req, res) {

    var newpost = new postModel({
        title: req.body.title,
        content: req.body.content,
        itemusage: req.body.itemusage,
        holder: req.body.holder,
        photos: req.body.photo
    });

    newpost.save(function (err, data) {
        if (err) {
            res.json({ "status": 1, "msg": "error" });
        }
        else {
            res.json({ "status": 0, "msg": "success", "data": data });
        }
    });

});



router.post('/show', function (req, res) {

    var field;
    var content;

    if (req.body._id !=null)
    {
        field="_id";
        content = req.body._id;

        postModel.find({"_id": [content]}, function (err, data) {
            if (data == null){
                res.json({"status": 2, "msg": "no post"});
            }
            else{
                if (err){
                    res.json({"status": 1, "msg": "err"});
                }
                else {
                    res.json({"status": 0, "msg": "success", "data": data});
                }
            }
        });
    }

    else if (req.body.holder!=null)
    {
        field="holder";
        content = req.body.holder;

    }
    else if (req.body.title !=null)
    {
        field="title";
        content = req.body.title;
    }


    if(req.body.title !=null || req.body.holder!=null )
    {
        
        postModel.find({[field]: { $regex: '.*' + content + '.*' }}, function (err, data) {
            if (data == null){
                res.json({"status": 2 , "msg": "no post"});
            }
            else{
                if (err){
                    res.json({"status": 1, "msg": "err"});
                }
                else {
                    res.json({"status": 0, "msg": "success", "data": data});
                }
            }
        });
    }


});



router.post('/search', function (req, res) {


    if(req.body.title !=null || req.body.holder!=null || req.body._id !=null)
    {
        var keywords = req.body.title;
        keywords = keywords.toLowerCase();
  
        
        postModel.find({}, function (err, data) {
            if (data == null){
                res.json({"status": 2 , "msg": "no post"});
            }
            else{
                if (err){
                    res.json({"status": 1, "msg": "err"});
                }
                else {        
                    
                    var result1 = [];
                    for(i of data)
                    {
                        
                        if(i["holder"].toLowerCase().search(keywords) != -1||i["title"].toLowerCase().search(keywords) != -1 || i["itemusage"].toLowerCase().search(keywords) != -1)
                        {
                            result1.push(i);
                        }

                    }
                    
                    res.json({"status": 0, "msg": "success", "data": result1});
                }
            }
        });
    }


});

router.post('/delete', function (req, res) {


    content = req.body._id;

    postModel.remove({"_id": [content]}, function (err, data) {
        if (data == null){
            res.json({"status": 1, "msg": "no post"});
        }
        else{
            if (err){
                res.json({"status": 1, "msg": "err"});
            }
            else {
                res.json({"status": 0, "msg": "success"});
            }
        }
    });




});





router.post('/update', function (req, res) {



    postModel.findOne({
        _id: req.body._id
    }, function (err, data) {
        if (data == null){
            res.json({"status": 1, "msg": "err"});
        }
        else{
            if( req.body.photo != "")
            {
                data.photos = req.body.photo
            }
           
            data.itemusage = req.body.itemusage,
            data.content = req.body.content,
            data.title = req.body.title
            data.save (function (err){
                if (err){
                    res.json({"status": 1, "msg": "err"});
                }
                else {
                    res.json({"status": 0, "msg": "success"});
                }

            })
        }
    });


});




router.get('/show', function (req, res) {


    
        postModel.find({}, function (err, data) {
            if (data == null){
                res.json({"status": 1, "msg": "no post"});
            }
            else{
                if (err){
                    res.json({"status": 1, "msg": "err"});
                }
                else {
                    res.json({"status": 0, "msg": "success", "data": data});
                }
            }
        });
    



});


module.exports = router;