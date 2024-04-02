const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title : String,
    content : String,
    description : String,
    file : String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id :  {
    type : mongoose.Schema.Types.ObjectId,  
    ref : "User",
    },
    role_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Role"
    }
});

const blog = mongoose.model("blog" , schema);
module.exports = blog;