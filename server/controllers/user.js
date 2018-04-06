import Users from '../models/Users';

export const registerUser = (req, res, next) => {

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
}

export const signIn = (req, res, next) => {

    const user = req.body;

    if (!user.UserName || !user.Password) {
        return res.status(404).send('Empty');
    }

    Users.findOne({ UserName:user.UserName, Password: user.Password }, (err,obj) => {

        if (obj) {
            console.log('User logged in!')
            currentUser = obj._id;
            return res.end({ msg: 'Sign-In Successfully', status: 200 });
        } else {
            console.log('user doesn\'t exist');
            return res.status(404).send('UserName');
        }
    })

}

function isPasswordValid(first, second){
    if (!first || !second){
        return false;
    }
    return first === second;
}
