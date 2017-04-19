import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Users = new Schema({
    UserName: {
        type: String,
        index:true,
        unique:true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String
    },
    Items:[
        {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Items'},
        name: {
            type: String
        }
    }]
}, {collection: 'Users'});

module.exports = mongoose.model('Users', Users);