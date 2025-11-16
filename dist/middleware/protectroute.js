'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const User_model_1 = __importDefault(require('../models/User.model'));
const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
      return;
    }
    const decoded = jsonwebtoken_1.default.verify(
      token,
      process.env.JWT_SECRET || '',
    );
    req.user = await User_model_1.default
      .findById(decoded.userId)
      .select('-password');
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Not authorized' });
  }
};
exports.protectRoute = protectRoute;
