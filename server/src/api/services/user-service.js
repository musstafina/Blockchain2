const User = require('../models/User-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
	async register(userData) {
		const hashedPassword = await bcrypt.hash(userData.password, 5);
		userData.password = hashedPassword;

		const newUser = new User(userData);
		return newUser.save();
	}

	async login(email, password) {
		const user = await User.findOne({ email });
		if (!user) throw new Error('Invalid email!');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new Error('Invalid password!');

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
		return { token, user };
	}

	async addVisitor(profileId, visitorId) {
		const profile = await User.findById(profileId);
		if (!profile) throw new Error('Profile not found');

		let visitor = profile.visitors.find((visitor) =>
			visitor.visitorInfo.equals(visitorId)
		);

		if (visitor) {
			visitor.visitedAt = new Date();
			visitor.visitCount += 1;
		} else {
			profile.visitors.push({
				visitorInfo: visitorId,
				visitedAt: new Date(),
				visitCount: 1,
			});
		}

		await profile.save();
	}
}

module.exports = new UserService();
