const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	personalPhoto: {
		type: String,
	},
	biography: {
		type: String,
	},
	walletAddress: {
		type: String,
		required: true,
		unique: true,
	},
	visitors: [
		{
			visitorInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
			visitedAt: { type: Date, default: Date.now },
			visitCount: { type: Number, default: 1 },
		},
	],
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

userSchema.index({ firstName: 'text', lastName: 'text' });

module.exports = mongoose.model('User', userSchema);
