const User = require('../models/userModel');

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};
