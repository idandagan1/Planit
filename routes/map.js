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

//Get data onLoad page.
router.get('/getData',function(req,res,next){

    if(currentUser == null){//User is not logged in.
        return res.status(404).send("UserName");
    }

    Site.find({'Visitors.Name': currentUser},{SiteName:1 , 'Visitors':1},{'Visitors.$': 1})
        .then(function(sites, err) {
        if(!err) {
            var listOfSites = sites;
            res.send({list: listOfSites});
        }else{
            return res.status(404).send("UserName");
        }
    });

})

//Get top 5 most visited sites.
router.get('/getTop',function(req,res,next){

    var topFive = [];

    Site.find({},{SiteName:1, Visitors:1}).then(function(sites,err){

        if(sites == null || sites.length == 0) {
            console.log("Site list is empty.");
            return res.status(404).send("Empty Sites");
        }else{
            sites.sort(function (a, b) {
                return b.Visitors.length - a.Visitors.length
            });
            for (var i = 0; i < sites.length && i < 5; i++) {
                topFive.push(sites[i].SiteName);
            }
            res.send({list: topFive});
        }
    })
})

//Adding site to the list.
router.post('/addSite', function(req,res,next){

    if(currentUser == null){
        return res.status(404).send("UserName");
    }

    //Creating the site to insert.
    var site = req.body;

    if(isSiteValid(site)){

        var visitor = {
            Name: currentUser,
            Cost: site.Cost
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

});

function isSiteValid(site)
{
    if(site && site.SiteName && site.Address){
        return true;
    }else{
        return false;
    }

}
//actual method for inserting the site.
function addSite(site,visitor){
    var newSite = new Site(site);
    newSite.Visitors.push(visitor);
    newSite.save();
    console.log("New Site");
}

module.exports = router;
