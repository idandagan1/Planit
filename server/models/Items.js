import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Items = new Schema({
    Name: {
        type: String,
        required: true
    },
    Quantity: Number
}, { collection: 'list-data' });

module.exports = mongoose.model('Items', Items);
