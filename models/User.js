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
        maxlength:25,
        validate: /^[a-zA-Z0-9_]+$/
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8,
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

// User Schema Error Handlers
var handleE11000 = function(error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('There was a duplicate key error', error.path));
    } else {
      next();
    }
  };

  var handleValidationE = function(error, res, next){
      if (error.name === 'ValidatorError'){
          next(new Error(error.message), error.path);
      }
      else{
          next();
      }
  }

  userSchema.post("save", handleE11000);
  userSchema.post("save", handleValidationE);

let User = mongoose.model("Users", userSchema);
module.exports= User;

// 'Path `password` (`test`) is shorter than the minimum allowed length (8).'
// 'Validator failed for path `email` with value `test@test.com`'
// 'Validator failed for path `email` with value `testing`'
// 'Validator failed for path `password` with value `testinng`'