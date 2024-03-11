const mongoose = require("mongoose"); 
const bcrypt =  require("bcrypt")
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
 

   name: {
    type : String
   },
    email: {
        type : String
    },
    mobile: {
        type :Number
    },
    image : {
        type :String
    },

    password: {
        type:String
    }
  
  
})

User.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(1, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash,data,salt) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

module.exports = mongoose.model('User', User);