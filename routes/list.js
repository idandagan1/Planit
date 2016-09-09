/**
 * Created by idandagan1 on 08/09/2016.
 */
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var resultArray = [];
var url = 'mongodb://localhost:27017/local';

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

module.exports = router;
