const Role = require('../models/adminmodel')
const blogmodel = require('../models/blogmodel');

exports.uploadImage = async(req, res)=>{
  const{ title , content , description , createdAt} = req.body;
  const file = req.file ? req.file.path : null;
  console.log(file)
  
  const {role_id} = req.params; // Replace with the actual user ID
console.log({"permissions.userid" : role_id })
  try {
    // Find the user's role and permissions using Mongoose methods
//     const role = await Role.find({ 'permissions.userid': user_id,
// "permissions.create" : true });
// console.log(role)

const roles = await Role.find(
    {}, {
    permissions : { $elemMatch : {
        userid : role_id,
        create : true,
    }
  }
}
);

  console.log(roles);

 



// Find the first object with create field set to true
// const roleWithCreateTrue = roles.find(role => role.permissions.user_id && role.permissions[0].create);
// console.log(roleWithCreateTrue)

// const roleWithCreateTrue = roles.find(role => 
//     role.permissions.some(permission => permission.userid == role_id && permission.create)
//   );
  
//   console.log(roleWithCreateTrue);
  
if (roles?.permissions) {
        const newp = await blogmodel.create(req.body)
        return res.json(newp)
}
  // If no matching role or no matching permissions were found
  return res.status(403).json({ error: 'Permission denied' });

}
  catch(error){
    return  res.status(500).send(error.message)
  }
}


// get the images

// exports.getImage = async(req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, 'uploads', filename);

//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error('Error sending file:', err);
//       res.status(500).send('Internal Server Error');
//     }
//   });
// };





// CRUD Operation 

// Create a data and add in the mongodb

// exports.postBlog = async(req,res) => {
//     const{ title , content } = req.body;
// try {
//     const newPost = await blogmodel.create({title , content})
//     res.json(newPost)
// } catch (error) {
//     res.status(500).send(error)
// }
// }

// Get method
exports.getAllBlog = async(req,res) => {
    
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;

        // Check if req.query.page is present before calculating skip and limit
        if (req.query.page) {
            var blogCount = await blogmodel.countDocuments();
            
            if (skip >= blogCount) {
                throw new Error("This page is not found");
            }
        }

        // Now you can use skip and limit in the find query
        const blogs = await blogmodel.find().skip(skip).limit(limit);
        res.json({
            blogs,
            blogCount,
            currentPage: page,
            totalPages: Math.ceil(blogCount / limit),
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
};
// Get by the id of post

exports.getbyIdBlog = async(req,res) => {
    const {id} =req.params; 
    // console.log(req.params); // Assuming your route has a parameter named 'user'
    console.log(id)
    try {
        const getbyid = await blogmodel
            .find({user_id : id})
            .populate('user_id');
        console.log(getbyid);
        return res.json(getbyid);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

// Update any value
exports.updateBlog = async(req,res) => {
    const {id} = req.params;
    const {title , content} = req.body
    try {
        const updateblog = await blogmodel.findByIdAndUpdate(id,{title,content})
        res.json(updateblog)
    } catch (error) {
        res.status(500).send(error)       
    }
}


// Delete One document
exports.deleteBlogById = async(req,res) => {
    const {user_id} = req.params.id;
    try {
        const result = await blogmodel.deleteOne({_id : user_id});
        console.log(result);
        if (result.deletedCount == 0) {
            res.status(404).json({ success: false, error: 'Not Found', message: 'Blog not found' });
        } else {
            res.json({ success: true, message: 'Delete Successfully' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error', message: error.message });
    }
}



// Delete all data
exports.deleteBlog = async(req,res) => {
//  const {id} = req.params;
 try {
    await blogmodel.deleteMany({});
    res.json("Delete Successfully");

 } catch (error) {
    res.status(500).send(error)
 }
}
