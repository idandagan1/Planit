var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('localhost:27017/local');
var Schema = mongoose.Schema;

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

var userSchema = new Schema({
  UserName: {type: String, required: true},
  Password: {type: String, required: true}
}, {collection: 'user-data'});

var UserData = mongoose.model('user-data', userSchema);

/* Register Method */
router.post('/register', function(req,res,next) {
  var user = {
    UserName: req.body.userName,
    Password: req.body.password
  };

  currentUser = user.UserName;

  UserData.count({"UserName":currentUser})
      .then(function(count) {
        if(count == 0){
          var data = new UserData(user);
          data.save();
          console.log("New user has been insert!");
        }else{
          console.log("UserName already exist.");
        }
      });

    res.redirect('/');
});


function addNewUser(user,doc){

};
/* Sign-In Method */
router.post('/signIn',function(req,res,next) {
  var user = {
    UserName: req.body.userName,
    Password: req.body.password
  };
  var data = new UserData(user);
  data.save();
  console.log("New user has been insert!");

  res.redirect('/');

});

module.exports = router;
