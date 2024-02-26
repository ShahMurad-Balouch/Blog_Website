
// // Controller

require('dotenv').config();


const  jwtkey  = process.env.JWT_SECRET || 'defaultSecretKey';



const jwt = require('jsonwebtoken');
// Middleware to verify JWT token
exports.verifyToken = (req, res, next)=> {
  var token = req.header('authorization');
    console.log(token)
// const uservari =     jwt.verify(token.replace('Bearer ', ''), jwtkey)
//     console.log(uservari)
    if (token) {
      jwt.verify(token.replace('Bearer ', ''), jwtkey, (err, decoded)=> {
       if (err) {
         res.status(403).send({ success: false, message: "Failed to authenticate user." })
        } else {
          req.user = decoded
          next()
        }
      })
    } else {
      res.status(403).send({ success: false, message: "No Token Provided." })
    }
  };
  
  

 
























