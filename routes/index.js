var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('localhost:27017/local');

var Users = require('../models/Users');
var path = require('path');

/* Register Method */
router.post('/register', function(req,res,next) {

  var user = req.body;

  currentUser = user.UserName;
  //Validation and insert the user.
  if(isPasswordValid(user.Password,user.ConfirmPassword)) {
    if(user.Email != "") {
      Users.count({"UserName": currentUser})
          .then(function (count) {
            if (count == 0) {
              var data = new Users(user);
              data.save();
              console.log("New user has been insert!");
              res.end('{"success" : "Updated Successfully", "status" : 200}');
            } else {
              console.log("User name already exist.");
              return res.status(404).send("UserName");
            }
          });
    }else{//Email error
      console.log("Email is required");
      return res.status(404).send("Email");
    }
  }else{//Pqssword error
    console.log("Password does not match");
    return res.status(404).send("Password");
  }
});

function isPasswordValid(first, second){
  if(first == "" || second == ""){
    return false;
  }
  return first === second;
}

/* Sign-In Method */
router.post('/signIn',function(req,res,next) {

  var user = req.body;

  if(user.UserName == "" || user.Password == ""){
    return res.status(404).send("Empty");
  }
  Users.findOne({UserName:user.UserName, Password: user.Password}, function(err,obj){

    if(obj !== null){//Log into the website.
      console.log("User logged in!")
      currentUser = user.UserName;
      res.end('{"success" : "Sign-In Successfully", "status" : 200}');
    }else{
      console.log("User Doesn't exist");
      return res.status(404).send("UserName");
    }
  })

});

module.exports = router;
