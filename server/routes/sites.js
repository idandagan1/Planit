import express from 'express';
import mongoose from 'mongoose';
import {
    addSite,
    getData,
    getTopSites
} from '../controllers/sites';

const router = express.Router();
mongoose.Promise = global.Promise;

router.get('/', (req, res, next) => {
    return res.render('sites');
})

//Get data when page loads.
router.get('/getData', getData);

//Get top most visited sites.
router.get('/getTop', getTopSites);

//Adding site to the list.
router.post('/addSite', addSite);

module.exports = router;
