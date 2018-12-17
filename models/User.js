const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true,
        minlength: 3,
        maxlength:20
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
        validate: /[^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$]/
    },
    email: {
        type: String,
        required: true,
        minlength: 6, 
        validate: /[^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$]/
    }, 
    posts: {
        type: Schema.Types.ObjectId, 
        ref: "Posts"
    }
});
