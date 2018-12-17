const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

// User Schema Definitions
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
        validate: /\[^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$\]/
    },
    email: {
        type: String,
        required: true,
        minlength: 6, 
        unique: true,
        validate: /[^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$]/
    }, 
    posts: {
        type: Schema.Types.ObjectId, 
        ref: "Posts"
    }
});

// User Schema + Bcrypt Password Methods
userSchema.pre('save', function(next){
    let user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(saltRounds, function(err, salt){
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err);

            user.password=hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        return cb(null, isMatch);
    });
};

// User Schema Error Handler
var handleE11000 = function(error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('There was a duplicate key error'));
    } else {
      next();
    }
  };

  userSchema.post("save", handleE11000);

let User = mongoose.model("Users", userSchema);
module.exports= User;