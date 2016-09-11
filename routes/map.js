/**
 * Created by idandagan1 on 08/09/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('localhost:27017/local');
var Schema = mongoose.Schema;
var Site = require('../models/Sites');
var Visitor = require('../models/Visitors');

router.get('/getData',function(req,res,next){

    if(currentUser == null){
        return;
    }

    Site.find({'Visitors.Name': currentUser},{SiteName:1},{'Visitors.$': 1}).then(function(visitor, err) {
        if(!err) {
            var listOfSites = visitor;
            res.send({list: listOfSites});
        }
    });

})

router.post('/addSite', function(req,res,next){

    if(currentUser==null){
        return;
    }
    var site = {
        SiteName: req.body.sitename,
        Address: req.body.siteaddress
    };

    if(isSiteValid(site)){

        var visitor = {
            Name: currentUser,
            Cost: req.body.sitecost
        };

        var newVisitor = new Visitor(visitor);
        Site.findOne({SiteName: site.SiteName, Address: site.Address}, function(err,obj) {
            if (obj !== null) {
                obj.Visitors.push(newVisitor);
                obj.save();
                console.log('visitor has been added');
            } else {
                addSite(site, newVisitor);
            }
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        });
    }

    res.redirect('/');
});

function isSiteValid(site)
{
    if(site && site.SiteName && site.Address){
        return true;
    }else{
        return false;
    }

}

function addSite(site,visitor){
    var newSite = new Site(site);
    newSite.Visitors.push(visitor);
    newSite.save();
    console.log("New Site");
}

module.exports = router;
