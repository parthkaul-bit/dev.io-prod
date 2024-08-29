const UserService = require('../services/userService');

exports.getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
