import Item from '../models/Items';
import Users from '../models/Users';

export const getData = (req, res, next) => {

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
};

export const deleteItem = (req, res, next) => {

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
}

export const addItem = (req, res, next) => {

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

}
