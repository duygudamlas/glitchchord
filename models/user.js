var   mongoose  = require("mongoose"),
      validator = require("validator"),
      bcrypt    = require("bcryptjs"),
      _         = require("lodash");

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email:{
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true,
        validate:{
            validator: (value) =>{
                return validator.isEmail(value);
            },
            message: "Not a valid Email"
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    }
});

//userSchema.plugin(passportLocalMongoose);

// // Generating a hash
// userSchema.methods.generateHash = function(password) {
//     // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//     bcrypt.genSalt(10, (err, salt) =>{
//         bcrypt.hash(password, salt, (err, res) =>{
//             return res;
//         });
//     });
// };

userSchema.methods.toJSON = function(){
    var user = this;
    var userObj = user.toObject();
    return _.pick(userObj, ["_id"]);
}


module.exports = mongoose.model("User", userSchema);