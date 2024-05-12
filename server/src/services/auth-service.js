const User = require('../models/User-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  async register (userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 5);
    userData.password = hashedPassword;

    const newUser = new User(userData);
    return newUser.save();
  }


  async login (email, password) {
    const user = await User.findOne({email});
    if (!user) throw new Error('Invalid email!');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password!');

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    return {token, user};
  }
}

module.exports = new AuthService();