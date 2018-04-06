import express from 'express';
import mongoose from 'mongoose';
import {
    registerUser,
    signIn
} from '../controllers/user';

const router = express.Router();
mongoose.Promise = global.Promise;

router.get('/', (req, res, next) => {
    return res.render('index');
})

router.post('/register', registerUser);

router.post('/signIn', signIn);

module.exports = router;
