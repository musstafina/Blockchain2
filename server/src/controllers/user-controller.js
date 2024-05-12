const User = require('../models/User-model');
const AuthService = require('../services/auth-service');

const register = async (req, res) => {
    try {
        const userData = req.body;

        const isEmailUsed = await User.findOne({ email: userData.email });
        if (isEmailUsed) {
            return res.status(400).json({ message: 'This email is already registered' });
        }

        const newUser = await AuthService.register(userData);
        res.status(201).json({ message: 'Registration successful!', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred during registration' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const loginResponse = await AuthService.login(email, password);
        res.status(200).json({ message: 'Login successful!', ...loginResponse });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = {
    register,
    login,
};
