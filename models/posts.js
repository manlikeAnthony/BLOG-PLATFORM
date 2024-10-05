const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'must provide title']
    },
    content: {
        type : String,
        required : [true , 'must provide content']
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true , 'must have a user']
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true})

module.exports = mongoose.model('Post' , PostSchema)