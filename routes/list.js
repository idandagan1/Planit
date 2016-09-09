/**
 * Created by idandagan1 on 08/09/2016.
 */
var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.createConnection('localhost:27017/local');
var Schema = mongoose.Schema;

/* list page. */
router.get('/list', function(req, res, next) {
    res.render('list');
});

router.get('/index', function(req, res, next) {
    res.render('index');
});

router.get('/map', function(req, res, next) {
    res.render('map');
});

var listSchema = new Schema({
    name: {type: String, required: true},
    quantity: Number
}, {collection: 'list-data'});


var listData = mongoose.model('list-data', listSchema);

module.exports = router;
