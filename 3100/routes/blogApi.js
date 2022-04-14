var express = require('express');
var router = express.Router();
var articleModel = require('../models/articleModel.js');

router.post('/addarticle', function (req, res) {

    var newarticle = new articleModel({
        username: req.body.username,
        title: req.body.title,
        content: req.body.content,
        like: [],
        content: req.body.content,
        postid: req.body.postid,
        itemusage: req.body.postiditemusage,
        like: [],
        comment: [],
        postdate: new Date()
    });

    newarticle.save(function (err, data) {
        if (err) {
            res.json({ "status": 1, "msg": "error" });
        }
        else {
            res.json({ "status": 0, "msg": "success", "data": data });
        }
    });
});


router.post('/loadarticle', function (req, res) {


    articleModel.findOne({ "postid": req.body.postid }, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "NO post" });
        }
        else {
            if (err) {
                res.json({ "status": 1, "msg": "err" });
            }
            else {
                res.json({ "status": 0, "msg": "success", "data": data });
            }
        }
    });
});

router.post('/deletearticle', function (req, res) {


    articleModel.remove({ "postid": req.body.postid }, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "NO post" });
        }
        else {
            if (err) {
                res.json({ "status": 1, "msg": "err" });
            }
            else {
                res.json({ "status": 0, "msg": "success", "data": data });
            }
        }
    });
    
});


router.post('/articleupdate', function (req, res) {


    articleModel.findOne({
        postid: req.body.postid
    }, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "err" });
        }
        else {
            data.content = req.body.content,
                data.title = req.body.title
            data.save(function (err) {
                if (err) {
                    res.json({ "status": 1, "msg": "err" });
                }
                else {
                    res.json({ "status": 0, "msg": "success" });
                }

            })
        }
    });


});


router.post('/addcomment', function (req, res) {


    articleModel.findOne({
        postid: req.body.postid
    }, function (err, data) {
        var nid = 1
        if(data.comment.length > 0 )
        {
            nid = Math.max(...data.comment.map(p => p.id));
        }

        var newcomment = {
            id: nid + 1,
            name: req.body.name,
            message: req.body.content,
            like: [],
            date: new Date()
        }
        data.comment.push(newcomment);

        data.save(function (err) {
            if (err) {
                res.json({ "status": 1, "msg": "err" });
            }
            else {
                res.json({ "status": 0, "msg": "success" });
            }

        })

    });


});






module.exports = router;
