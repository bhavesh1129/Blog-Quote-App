const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        trime: true,
        require: true
    },
    description: {
        type: String,
        trim: true,
        require: true
    }
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;