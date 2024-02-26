const multer = require('multer');
const {v4 : uuidv4} = require('uuid');
const path = require('path')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {

   return cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
      
   return cb(null,uuidv4() + "-" + Date.now()  + path.extname(file.originalname));
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;