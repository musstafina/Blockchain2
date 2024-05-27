const User = require('../models/User-model');
const UserService = require('../services/user-service');

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

			const newUser = await UserService.register(userData);
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

			const loginResponse = await UserService.login(email, password);
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
			const visitorId = req.user.userId;
			const profileId = req.params.id;

			const user = await User.findById(profileId);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			if (visitorId !== profileId) {
				await UserService.addVisitor(profileId, visitorId);
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
			const { query } = req.query;
			if (!query) {
				return res
					.status(400)
					.json({ message: 'Search query is required' });
			}

			const regex = new RegExp(query.split(' ').join('|'), 'i');
			const users = await User.find({
				$or: [
					{ firstName: { $regex: regex } },
					{ lastName: { $regex: regex } },
				],
			}).select('firstName lastName email personalPhoto biography');

			res.json(users);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Internal Server error' });
		}
	}

	async getAllVisitors(req, res) {
		try {
			const user = await User.findById(req.params.id).populate(
				'visitors.visitorInfo',
				'firstName lastName email personalPhoto'
			);

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			res.json({ visitors: user.visitors });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Internal Server error' });
		}
	}
}

module.exports = new UserController();
