import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Users from '../models/Users';
mongoose.Promise = global.Promise;


/* Register Method */
router.post('/register', (req,res) => {

  const user = req.body;

  if(isPasswordValid(user.password, user.ConfirmPassword)) {
    if(user.email != "") {
      Users.count({"UserName": user.username})
          .then((count) => {
            if (count == 0) {
              let data = new Users(user);
              data.save();
              currentUser = data._id;
              console.log("New user has been insert!");
              res.end('{"success" : "Updated Successfully", "status" : 200}');
            } else {
              console.log("User name already exist.");
              return res.status(404).send("UserName");
            }
          });
    }else{//Email error
      console.log("Email is required");
      return res.status(404).send("Email");
    }
  }else{//Pqssword error
    console.log("Password does not match");
    return res.status(404).send("Password");
  }
});

function isPasswordValid(first, second){
  if(first == "" || second == ""){
    return false;
  }
  return first === second;
}

/* Sign-In Method */
router.post('/signIn', (req,res) => {

  const user = req.body;

  if(user.UserName == "" || user.Password == ""){
    return res.status(404).send("Empty");
  }
  Users.findOne({UserName:user.UserName, Password: user.Password}, (err,obj) => {

    if(obj){
      console.log("User logged in!")
      currentUser = obj._id;
      res.end('{"success" : "Sign-In Successfully", "status" : 200}');
    }else{
      console.log("User Doesn't exist");
      return res.status(404).send("UserName");
    }
  })

});

module.exports = router;
