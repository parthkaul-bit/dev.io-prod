const User = require('../models/userModel');

exports.findUserById = async (userId) => {
    return await User.findById(userId);
};
