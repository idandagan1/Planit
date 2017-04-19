import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Visitors = new Schema({
    Name: {
        type: String,
        index:true,
        required: true
    },
    Cost: {
        type: Number,
        required: false
    },
}, {collection: 'Visitors'});

module.exports = mongoose.model('Visitors', Visitors);

