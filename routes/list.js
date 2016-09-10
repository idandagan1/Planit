/**
 * Created by idandagan1 on 08/09/2016.
 */
var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.createConnection('localhost:27017/local');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    Name: {type: String, required: true},
    Quantity: Number
}, {collection: 'list-data'});

var listData = mongoose.model('list-data', listSchema);

/* Register Method */
router.post('/insert', function(req,res,next) {

    var item = {
        Name: req.body.item
    }

})
router.post('/addItem', function(req,res,next){

    console.log('inserted item');
})

module.exports = router;
