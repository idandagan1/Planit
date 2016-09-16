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

//Get the data onLoad page.
router.get('/getData',function(req,res,next){
console.log("df");
    if(currentUser == null){//User is not logged in
        return res.status(404).send("UserName");
    }

    Users.findOne({UserName: currentUser})
        .then(function(doc) {
            var items = doc.Items;
            var listOfItems = [];
            items.forEach(function(item){
                listOfItems.push(item);
            })
            res.send({list:listOfItems});
        });
})

router.delete('/deleteItem',function(req,res){
    console.log(req.body.Name);
    //Users.findOne({UserName: currentUser}, function (err, obj) {
    //    if (obj !== null) {
    //        var items = obj.Items;
    //        Users.
    //    }
    //})

    Users.findOneAndUpdate(
        {UserName: currentUser},
        {$pull:{Items: {Name: req.body.Name}}},
        function(err, data){
            if(err) {
                console.log("error");
                return res.status(500).json({'error' : 'error in deleting address'});
            }
            res.json(data);
        }
    );
})

//Adding item to the list.
router.post('/addItem', function(req,res,next) {
    var item = {
        Name: req.body.item
    };

    if(currentUser != null) {
        Users.findOne({UserName: currentUser}, function (err, obj) {
            if (obj !== null) {
                var newItem = new Item(item);
                obj.Items.push(newItem);
                obj.save();
                console.log("Item has been insert to User");
            }
        })
    }else{
        console.log("User is not logged in");
        return res.status(404).send("UserName");
    }

    res.redirect('/');
})

module.exports = router;
