/**
 * Created by idandagan1 on 08/09/2016.
 */
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var resultArray = [];
var url = 'mongodb://localhost:27017/local';

/* map page. */
router.get('/map', function(req, res, next) {
    res.render('map');
});

router.get('/list', function(req, res, next) {
    res.render('list');
});

router.get('/index', function(req, res, next) {
    res.render('index');
});

router.get('/get-data', function(req,res,next){

    mongo.connect(url,function(err,db){
        assert.equal(null,err);
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc,err){
            assert.equal(null,err);
            resultArray.push(doc);
        },function(){
            db.close();
            res.render('index',{siteList:resultArray});
            console.log("show the list!!");
        })
    })
});

router.post('/insert', function(req,res,next){
    var item = {
        name: req.body.name,
        address: req.body.address,
        cost: req.body.cost
    };

    mongo.connect(url, function(err, db){
        assert.equal(null,err);
        db.collection('newItems').insertOne(item,function(err,result){
            assert.equal(null,err);
            console.log("Item has been insert! You are the best!!");
            db.close();
        })
    })
    res.redirect('/');
})
module.exports = router;