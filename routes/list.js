import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Item from '../models/Items';
import Users from '../models/Users';
mongoose.Promise = global.Promise;


//Get the data onLoad page.
router.get('/getData', (req,res) => {

    if(!currentUser){//User is not logged in
        return res.status(404).send("UserName");
    }

    Users.findOne({UserName: currentUser})
        .then( doc => {
            const items = doc.Items;
            const listOfItems = [];
            items.forEach( item => {
                listOfItems.push(item);
            })
            res.send({list:listOfItems});
        });
})

router.delete('/deleteItem', (req,res) => {

    if(!currentUser){//User is not logged in
        return res.status(404).send("UserName");
    }
    const itemToDelete = req.body;

    Users.findOneAndUpdate(
        {UserName: currentUser},
        {$pull:{Items: {Name: itemToDelete.Name}}},
        (err, data) => {
            if(err) {
                console.log("error");
                return res.status(500).json({'error' : 'error in deleting address'});
            }else{
                console.log("Deleted "+req.body.Name+" from list.");
                res.end('{"success" : "Delete item Successfully", "status" : 200}');
            }
        }
    );
})
//Adding item to the list.
router.post('/addItem', (req,res) => {

    const item = req.body;

    if(!currentUser) {

        Users.findById(currentUser, (err, result) =>{
            if (result) {
                const newItem = new Item(item);
                const newitem = {
                    _id: newItem._id,
                    name: item.Name
                }

                result.Items.push(newitem);
                result.save();
                res.end('{"success" : "Added Item Successfully", "status" : 200}');
            }

        })
    }

})

module.exports = router;
