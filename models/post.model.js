const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:String,
    post:String,
    username:String,
    userId: {type : mongoose.Schema.Types.ObjectId }

})

module.exports = mongoose.model('post',postSchema)