/**
 * Created by idandagan1 on 08/09/2016.
 */
var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.createConnection('localhost:27017/local');

var Item = require('../models/Items');
var Users = require('../models/Users');

router.post('/addItem', function(req,res,next) {
    var item = {
        Name: req.body.item
    };
    if(currentUser != null) {
        Users.findOne({UserName: currentUser}, function (err, obj) {

            if (obj !== null) {
                var newItem = new Item(item);
                obj.Items.push(newItem);
                console.log("Item has been insert to User");
            }
        })
    }else{
        console.log("User is not logged in");
    }


    res.redirect('/');
})

module.exports = router;
