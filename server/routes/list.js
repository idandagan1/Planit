import express from 'express';
import mongoose from 'mongoose';
import {
    getData,
    deleteItem
} from '../controllers/list';

const router = express.Router();
mongoose.Promise = global.Promise;

router.get('/', (req, res, next) => {
    return res.render('list');
})

router.delete('/deleteItem', deleteItem);

router.post('/addItem', addItem);

router.get('/getData', getData);

module.exports = router;
