const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String, 
        default: "Untitled",
        maxlength: 100
    },
    postBody: {
        type: String,
        required: true,
    },
    moonPhase: {
        type: String,
        required: true
    },
    category: {
        type: String
    }
});

const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;