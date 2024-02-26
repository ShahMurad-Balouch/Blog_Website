// Model
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    contact : {
        type : Number,
        required : true
    },

});




const User = mongoose.model("User" , userSchema);
 module.exports = User
