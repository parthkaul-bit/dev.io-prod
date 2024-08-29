const authService = require('../services/authService');

exports.signup = async (req, res) => {
    try {
        const user = await authService.signup(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error.message === 'Email already exists.') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An internal server error occurred.' });
        }
    }
};

exports.login = async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
