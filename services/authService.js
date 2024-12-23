const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/auth');

const authService = {
  async register(username, password) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const user = new User({ username, password });
    await user.save();
    return user;
  },

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Credenciales no válidas');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
    return { token, userId: user._id };
  }
};

module.exports = authService;