const express = require('express');
const path =require('path')
const userrouter = require('./Routes/userindex')
const blogrouter = require('./Routes/blogindex')
const rolerouter = require('./Routes/roleIndex')
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
require('dotenv').config()

// this is the access 
app.use(express.static(path.join(__dirname, './uploads/')))

// this is the API that allow to access the files 

app.use('/uploads', express.static(path.join(__dirname, './uploads/')));



// Enable CORS for all routes
const corsOptions = ({
    origin : "*" , 
    Credential : true
})


app.use(cors(corsOptions));
app.options("*" , cors(corsOptions))


// encoded url basically check every request and  read the content type . it also use to parse the data like 
// kis trha ka data aa rha hai or kis form ma parse krna hai or request.body ma parse krna hai 
app.use('/user' , userrouter)
app.use('/blog' , blogrouter)
app.use('/role' , rolerouter)




const user = process.env.MONGO_USER || "qwerty";
const password = process.env.MONGO_PASSWORD || "qwerty";

const uri = `mongodb+srv://${user}:${password}@atlascluster.5wzpbvn.mongodb.net/webblog?retryWrites=true&w=majority`;

const connect = mongoose.connect(uri)
.then(()=>console.log("Connected to MongoDb"))

const port = process.env.PORT || '2000';

app.listen(port , () => {
    console.log(`listening to port ${port}`)
})




module.exports = connect;