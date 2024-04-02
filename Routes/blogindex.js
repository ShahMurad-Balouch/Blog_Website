const express =require('express');
const app = express();
app.use(express.json())
const {postBlog , getAllBlog , getbyIdBlog , deleteBlogById ,deleteBlog, updateBlog ,uploadImage , getinforoles} = require('../Controllers/blogcontroller');
const upload = require('../middleware/multer');
const { verifyToken } = require('../middleware/auth');

const Router = express.Router();

Router.post('/:role_id/upload' ,upload.single('file') , verifyToken , uploadImage);




Router.get('/info',verifyToken  ,getAllBlog);
Router.delete('/:id/delete',  verifyToken, deleteBlogById )
// Router.post('/create' , postBlog);
// Router.put('/update',updateBlog);
Router.delete('/delete' ,  verifyToken, deleteBlog);
Router.get('/:id/get' ,verifyToken, getbyIdBlog);












module.exports = Router;