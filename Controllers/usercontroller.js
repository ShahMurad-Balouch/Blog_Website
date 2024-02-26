// // Controller

const User = require('../models/usermodel');
const blogmodel = require('../models/blogmodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());






const  jwtkey  = process.env.JWT_SECRET || 'defaultSecretKey';




 exports.getAllUsers = async(req,res) => {
    let users
    try{
        users = await User.find()
        return res.json(users)
    }
    catch (error) {
        return res.status(500).send(error)
    }
};


// SignUp
exports.signUp = async(req, res) => {
    try {
        const { name , email, password, contact}= req.body;
        // Validate required fields
        if (!name || !email || !password || !contact) {
            return res.status(400).json({ message: "All fields are required" });
}
// Validate email format
if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
}
// Implement these validation functions based on your requirements
function isValidEmail(email) {
    // Implement email validation logic
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
}
let existingUser = await User.findOne({email});
if(existingUser){
    return res.status(400).json({message: "Email already exist"})
}
const saltRound = 10;
const hashedPassword = await bcrypt.hash(password, saltRound);
const user =new User({
    name,email,
    password : hashedPassword
    ,contact,
    
});

const savedUser = await user.save();
//   jwt.sign({ savedUser } , jwtkey , { expiresIn:'2h' } , ( err , token )=>{
    if(savedUser){
        return res.status(200).json({ success: true, data: { savedUser } });
    }
    else{
        return res.status(500).json({ error: "Internal server error" });
    }
    // })
    
} 
catch (error) {
    return res.status(500).json({ error: "Internal server error" });
}
}




// Login
exports.loginUsers = async (req, res) => {
    const {email, password  } = req.body;
    try{
        let existingUser = await User.findOne({email});
        
        // const match = await bcrypt.compare(password, existingUser.password);
        
        if (!existingUser) {
            return res.status(404).json({ message: "Email and Password are required" });
        }

        const match = await bcrypt.compare(password, existingUser.password);

        if (!match) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        let token = jwt.sign({userid : existingUser._id , role : User.role},jwtkey,{expiresIn:'10d'})
    //    return res.header('authorization', token ).json({ success: true, message: 'Logged in successfully' , user: existingUser ,token : token })
        return res.cookie("Token", token , { httpOnly : true })
            .status(200)
            .json({ success: true, message: 'Logged in successfully' , user: existingUser , role : User.role ,token : token })
          // Set the Authorization header with the JWT token
        
        // res.json({token})
        
    }
    catch(error){
        console.log(error)
        return res.status(500).json( error.message );
        
    }
}





// Logout
exports.logoutUser =async (req,res) => {
    try{
        return res.cookie("Token" , "" , {
            httpOnly : true
        }).status(200).json({ success: true, message: 'Logged out successfully' });
        
    }
    catch (error){
        return res.status(500).json({ error: 'Internal server error' });
    }
}


// Deactivat the user
exports.deactivate = async(req,res) => {
    const {id} = req.params;
try{
    const user = await User.find({_id : id})

    if(!user) {
        return res.json({Error : "This user is not found"})
    }
    else{
   const result =await blogmodel.deleteMany({user_id: id})
   if(result.deleteCount === 0){
    return res.status(404).json({ success: false, error: 'No blog posts found for the user' });
   }
   const deluser = await User.deleteOne({_id : id})
   console.log(deluser)
   return res.json({success : true , message : "User is deactivated"})
//    res.json({ success: true, message: 'All blog posts deleted successfully' });
    }
} catch (error) {
  res.status(500).json({ success: false, error: 'Internal Server Error', message: error.message });
}
}





