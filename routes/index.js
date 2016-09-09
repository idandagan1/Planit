var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/local';

/* home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/list', function(req, res, next) {
  res.render('list');
});

router.get('/map', function(req, res, next) {
  res.render('map');
});


router.post('/register', function(req,res,next) {
  var user = {
    userName: req.body.userName,
    password: req.body.password
  };

  currentUser = user.userName;

  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    var collect = db.collection('users');
    db.collection('users', function(err, collection) {
      if (!err) {
        collection.find().toArray(function (err, docs) {
          if (!err) {
            db.close();
            var intCount = docs.length;
            if (intCount > 0) {
              var strJson = "";
              for (var i = 0; i < intCount;) {
                strJson += '{"userName":"' + docs[i].userName + '"}'
                i++;
                if (i < intCount) {
                  strJson += ',';
                }
              }
            }
          } else {
            console.log('empty');
          }
        }); //end collection.find
      }
    })

    /*
    var res = db.collection('users').find({"userName":currentUser}).toArray(function(err,docs){
      var count = docs.length;
    });*/
    db.close();
    });
    res.redirect('/');
});


function addNewUser(user,doc){

  doc.forEach(function(name){
    console.log(name);
  })
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('users').insertOne({"userName":user.userName, "password":user.password}, function (err, result) {
      assert.equal(null, err);
      console.log("user has been insert! You are the best!!");
      db.close();
    })
  });

};

router.post('/signIn',function(req,res,next) {

  Ext.create('Ext.window.Window', {
    title: 'Sign In',
    height: 200,
    width: 400,
    layout: 'fit'
  }).show();

});

module.exports = router;
