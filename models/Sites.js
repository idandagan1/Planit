import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const siteSchema = new Schema({
    SiteName: {
        type: String,
        index:true,
        unique:true,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Visitors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
}, {collection: 'Sites'});

module.exports = mongoose.model('Sites', siteSchema);