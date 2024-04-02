const Role = require('../models/adminmodel');

const checkPermission = async (req, res, next) => {
  try {
    // Assuming you have the user ID from your authentication middleware
    const userId = req.user.id;

    // Find the role by user ID
    const role = await Role.findOne({ 'permissions.userid': userId });

    if (!role) {
      return res.status(403).json({ message: 'User does not have a role' });
    }

    // Check if the user has "create" permission
    const hasPermission = role.permissions.some(permission => permission.userid.userId && permission.create);

    if (!hasPermission) {
      return res.status(403).json({ message: 'User does not have permission to create' });
    }

    // If the user has "create" permission, proceed to the next middleware or route
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = checkPermission;
