import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/Items';
import Users from '../models/Users';

const router = express.Router();
mongoose.Promise = global.Promise;

router.get('/', (req, res, next) => {
    return res.render('list');
})

//Get the data onLoad page.
router.get('/getData', (req, res, next) => {

    const { currentUser } = req.session;

    if (!currentUser) { //User is not logged in
        return next(new Error('user not logged'));
    }

    Users.findOne({ UserName: currentUser }).exec()
        .then( doc => {
            const items = doc.Items;
            const listOfItems = [];
            items.forEach( item => {
                listOfItems.push(item);
            })
            res.send({ list:listOfItems });
        })
        .catch(next);
})

router.delete('/deleteItem', (req,res) => {

    const { currentUser } = req.session;
    const { itemToDelete } = req.body;

    if (!currentUser) { //User is not logged in
        return next(new Error('user not logged'));
    }

    Users.findOneAndUpdate(
        { UserName: currentUser },
        { $pull: { Items: { Name: itemToDelete.Name } } },
        (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'error while deleting address' });
            } else {
                console.log(`deleted ${req.body.Name} from list.`);
                return res.end({ msg: 'Delete item Successfully', status: 200 });
            }
        }
    );
})
//Adding item to the list.
router.post('/addItem', (req,res) => {

    const { item } = req.body;

    if (!currentUser) {

        Users.findById(currentUser, (err, result) =>{
            if (result) {
                const newItem = new Item(item);
                const newitem = {
                    _id: newItem._id,
                    name: item.Name
                }

                result.Items.push(newitem);
                result.save();
                return res.end({ msg: 'Added Item Successfully', status: 200 });
            }
        })
    }

})

module.exports = router;
