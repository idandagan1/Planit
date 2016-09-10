/**
 * Created by idandagan1 on 08/09/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('localhost:27017/local');
var Schema = mongoose.Schema;

var siteSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    cost: {type: Number}
}, {collection: 'site-data'});

var siteData = mongoose.model('site-data', siteSchema);


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


router.get('/get-data', function(req, res, next) {
    siteData.find()
        .then(function(doc) {
            res.render('index', {items: doc});
        });
});

router.post('/addSite', function(req,res,next){
    var item = {
        name: req.body.name,
        address: req.body.address,
        cost: req.body.cost
    };
    var data = new siteData(item);
    data.save();

    res.redirect('/');
});
module.exports = router;
