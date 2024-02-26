const Role = require('../models/adminmodel');

exports.createRole = async (req, res) => {
console.log(req.body)
    try {
        const newRole = await Role.create(req.body);
        console.log(newRole)
        // const savedroles = await save(newRole)
        return res.json(newRole);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
    
// it will show the user id with its role details

exports.getuserRole = async (req,res) => {
    const {id} = req.params;
    try{
        const getRole = await Role.findOne({ "permissions.userid" : id})
     return res.json(getRole);
    }
    catch(error) {
        res.json({"messgae" : error})
    }
}