// Router
const express = require('express');

const {getAllUsers , signUp , loginUsers , logoutUser, deactivate ,assignRoles} = require('../Controllers/usercontroller');
const { verifyToken } = require('../middleware/auth');

const Router = express.Router();

Router.get('/info',getAllUsers);
Router.post('/signup' , signUp);
Router.post('/login' , loginUsers);
Router.post('/logout' , verifyToken ,logoutUser);

Router.delete('/deactivate/:id',verifyToken ,deactivate);
module.exports = Router;