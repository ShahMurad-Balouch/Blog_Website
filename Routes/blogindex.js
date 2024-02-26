const express =require('express');
const app = express();
app.use(express.json())
const {postBlog , getAllBlog , getbyIdBlog , deleteBlogById ,deleteBlog, updateBlog ,uploadImage , getinforoles} = require('../Controllers/blogcontroller');
const upload = require('../middleware/multer');
const { verifyToken } = require('../middleware/auth');
const checkPermission = require('../middleware/checkrole');

const Router = express.Router();

Router.post('/upload/:role_id' ,upload.single('file') , verifyToken , uploadImage);




Router.get('/info'  ,getAllBlog);
Router.delete('/delete/:id',  verifyToken, deleteBlogById )
// Router.post('/create' , postBlog);
// Router.put('/update',updateBlog);
Router.delete('/delete' ,  verifyToken, deleteBlog);
Router.get('/get/:id' ,verifyToken, getbyIdBlog);












module.exports = Router;