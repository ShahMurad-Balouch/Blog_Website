const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: false
},
  permissions : [
 {
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    create: {
        type: Boolean,
        default: false
    },
    update: {
        type: Boolean,
        default: false
    },
    remoove: {
        type: Boolean,
        default: false
    },

    read: {
        type: Boolean,
        default: false
}
 }
]



});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
