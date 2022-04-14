var express = require('express');
var router = express.Router();
var memberModel = require('../models/memberModel.js');

//register function
router.post('/register', function(req,res){

    var newmember = new memberModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin:false,
        photos:[]
    });
    memberModel.count({ email: req.body.email },function(err,data){
        if (data > 0){
            res.json({"status":1, "msg":"The email has been used!"});
        }
        else {
            memberModel.count({ username: req.body.username },function(err,data){
                if (data > 0){
                    res.json({"status":1, "msg":"The username has been used!"});
                }
                else {
                    newmember.save( function (err, data) {
                        if (err){
                            res.json({"status":1 ,"msg":"error"});
                        }
                        else {
                            res.json({"status":0 , "msg":"success", "data": data});
                        }
                    });
                }
            });
        }
    });
});


router.get('/view', function (req,res) {
    memberModel.find({

    }, function (err, data) {
        if (data == null){
            res.json({"status": 1, "msg": "NO users"});
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



//Login function
router.post('/login', function (req,res) {
    memberModel.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, data) {
        if (data == null){
            res.json({"status": 1, "msg": "Incorrect email or password!"});
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


router.post('/changePass', function (req,res) {

    memberModel.findOne({
        email: req.body.email,
        password: req.body.oldpassword
        
    }, function (err, data) {
        if (data == null){
            res.json({"status": 1, "msg": "Incorrect old password!"});
        }
        else{
            data.password = req.body.password;
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




module.exports = router;