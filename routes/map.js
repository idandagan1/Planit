/**
 * Created by idandagan1 on 08/09/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('localhost:27017/local');
var Schema = mongoose.Schema;
var Sites = require('../models/Sites');
var Visitors = require('../models/Visitors');

router.get('/getData',function(req,res,next){

    if(currentUser == null){
        return;
    }
/*
    Sites.find({visitor: currentUser})
        .then(function(doc) {
            var items = doc.Items;
            var listOfItems = [];
            items.forEach(function(item){
                listOfItems.push(item);
            })
            res.send({list:listOfItems});

        });*/
})

router.post('/addSite', function(req,res,next){
    var site = {
        name: req.body.sitename,
        address: req.body.siteaddress,
        cost: req.body.sitecost
    };

    if(isSiteValid(site)){
        if(currentUser==null){
            return;
        }
        var visitor = {
            name: currentUser,
            cost: site.cost
        };
        var newVisitor = new Visitors(visitor);
        newVisitor.save();
        Sites.findOne({SiteName: site.name, Address: site.address}, function(err,obj) {
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
    if(site && site.name && site.address){
        return true;
    }else{
        return false;
    }

}

function addSite(site,visitor){
    var data = new Sites(site);
    data.Visitors.push(visitor);
    data.save();
    console.log("Site has been added");
}
module.exports = router;
