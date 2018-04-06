import express from 'express';
import mongoose from 'mongoose';
import Users from '../models/Users';

const router = express.Router();
mongoose.Promise = global.Promise;

router.get('/', (req, res, next) => {
    return res.render('index');
})
/* Register Method */
router.post('/register', (req,res) => {

    const user = req.body;

    if (isPasswordValid(user.password, user.ConfirmPassword)) {
        if (!user.email) {
            Users.count({ 'UserName': user.username })
                .then((count) => {
                    if (count == 0) {
                        let data = new Users(user);
                        data.save();
                        currentUser = data._id;
                        console.log('New user has been insert!');
                        res.end({ msg: 'Updated Successfully', status: 200 });
                    } else {
                        console.log('User name already exist.');
                        return res.status(404).send('UserName');
                    }
                });
        } else { //Email error
            console.log('Email is required');
            return res.status(404).send('Email');
        }
    } else {//Pqssword error
        console.log('Password does not match');
        return res.status(404).send('Password');
    }
});

/* Sign-In Method */
router.post('/signIn', (req,res) => {

    const user = req.body;

    if (!user.UserName || !user.Password) {
        return res.status(404).send('Empty');
    }
    Users.findOne({ UserName:user.UserName, Password: user.Password }, (err,obj) => {

        if (obj) {
            console.log('User logged in!')
            currentUser = obj._id;
            res.end({ msg: 'Sign-In Successfully', status: 200 });
        } else {
            console.log('user doesn\'t exist');
            return res.status(404).send('UserName');
        }
    })

});

function isPasswordValid(first, second){
    if (!first || !second){
        return false;
    }
    return first === second;
}

module.exports = router;
