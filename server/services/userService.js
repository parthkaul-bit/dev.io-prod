const userRepository = require('../repositories/userRepository');

exports.getUserById = async (userId) => {
    return await userRepository.findUserById(userId);
};
