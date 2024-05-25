const User = require('../models/User-model');
const AuthService = require('../services/auth-service');

class UserController {
	async register(req, res) {
		try {
			const userData = req.body;

			const isEmailUsed = await User.findOne({ email: userData.email });
			if (isEmailUsed) {
				return res
					.status(400)
					.json({ message: 'This email is already registered' });
			}

			const newUser = await AuthService.register(userData);
			res.status(201).json({
				message: 'Registration successful!',
				user: newUser,
			});
		} catch (err) {
			console.error(err);
			res.status(500).json({
				message: 'An error occurred during registration',
			});
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;

			const loginResponse = await AuthService.login(email, password);
			res.status(200).json({
				message: 'Login successful!',
				...loginResponse,
			});
		} catch (err) {
			console.error(err);
			res.status(401).json({ message: 'Invalid credentials' });
		}
	}

	async getUserData(req, res) {
		try {
			const user = await User.findById(req.params.id);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			const { password, ...userData } = user.toObject();
			res.json(userData);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Internal Server error' });
		}
	}

	async getMyProfile(req, res) {
		try {
			const user = await User.findById(req.user.userId).populate(
				'friends'
			);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			const { password, ...profileData } = user.toObject();
			res.json(profileData);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Internal Server error' });
		}
	}

	async getMyFriends(req, res) {
		try {
			const userId = req.user.userId;
			const user = await User.findById(userId).populate(
				'friends',
				'firstName lastName email personalPhoto biography'
			);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.json(user.friends);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Internal Server error' });
		}
	}

	async searchUsersByName(req, res) {
		try {
			const { query } = req.query; // Assuming the search query is passed as a parameter named 'query'
			if (!query) {
				return res
					.status(400)
					.json({ message: 'Search query is required' });
			}

			const regex = new RegExp(query.split(' ').join('|'), 'i'); // 'i' for case insensitive
			const users = await User.find({
				$or: [
					{ firstName: { $regex: regex } },
					{ lastName: { $regex: regex } },
				],
			}).select('firstName lastName email personalPhoto biography'); // Adjust the fields as necessary for the frontend

			res.json(users);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Internal Server error' });
		}
	}
}

module.exports = new UserController();
