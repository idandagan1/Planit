/**
 * Created by idandagan1 on 08/09/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('localhost:27017/local');
var Schema = mongoose.Schema;



router.post('/addSite', function(req,res,next){
    var site = {
        name: req.body.sitename,
        address: req.body.siteaddress,
        cost: req.body.sitecost
    };
    var data = new siteData(site);
    data.save();

    if(!isSiteValid(site)){
        var visitor = {
            name: currentUser,
            cost: site.cost
        };
        var visitorToInsert = new newVisitor(visitor);
        siteData.findOne({SiteName: site.name, Address: site.address}, function(err,obj) {
        if(obj !== null) {

            obj.visitors.push(visitorToInsert);
            siteData.save();
            console.log('visitor has been added');
        }else{
            addSite(site);
            //data.visitors.push(visitorToInsert);
            console.log('site has been added');
        }
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

function addSite(site){
    var data = new siteData(site);
    data.save();
}
module.exports = router;
