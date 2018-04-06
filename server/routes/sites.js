import express from 'express';
import mongoose from 'mongoose';
import Site from '../models/Sites';
import Visitor from '../models/Visitors';

const router = express.Router();
mongoose.Promise = global.Promise;

router.get('/', (req, res, next) => {
    return res.render('sites');
})

//Get data when page loads.
router.get('/getData', (req, res, next) => {

    const { currentUser } = req.session;

    if (!currentUser) {//User is not logged in.
        return next(new Error('user not logged'));
    }

    Site.find({ 'Visitors.Name': currentUser },
        { SiteName:1 , 'Visitors':1 },{ 'Visitors.$': 1 })
        .then((sites, err) => {
            if(!err) {
                var listOfSites = sites;
                res.send({ list: listOfSites });
            }else{
                return res.status(404).send('UserName');
            }
        });

})

//Get top 5 most visited sites.
router.get('/getTop', (req, res, next) => {

    const topFive = [];

    Site.find({}, { SiteName:1, Visitors:1 })
        .then((sites, err) => {
            if (!sites || sites.length == 0) {
                console.log('Site list is empty.');
                return res.status(404).send('Empty Sites');
            } else {
                sites.sort((a, b) => {
                    return b.Visitors.length - a.Visitors.length
                });
                for (let i = 0; i < sites.length && i < 5; i++) {
                    topFive.push(sites[i].SiteName);
                }
                return res.send({ list: topFive }, 200);
            }
        })
        .catch(next);
})

//Adding site to the list.
router.post('/addSite', (req, res, next) => {

    const { currentUser } = req.session;
    
    if (!currentUser) {
        return next(new Error('user not logged'));
    }

    //Creating the site to insert.
    const site = req.body;

    if(isSiteValid(site)){

        const visitor = {
            Name: currentUser,
            Cost: site.Cost
        };

        const newVisitor = new Visitor(visitor);
        Site.findOne({ SiteName: site.SiteName, Address: site.Address }, (err,obj) => {
            if (obj) {
                obj.Visitors.push(newVisitor);
                obj.save();
                console.log('visitor has been added');
            } else {
                addSite(site, newVisitor);
            }
            res.end({ msg: 'Updated Successfully', status: 200 });
        });
    }

});

function isSiteValid(site) {
    return site && site.SiteName && site.Address;
}
//actual method for inserting the site.
function addSite(site,visitor) {
    const newSite = new Site(site);
    newSite.Visitors.push(visitor);
    newSite.save();
    console.log('New Site');
}

module.exports = router;
