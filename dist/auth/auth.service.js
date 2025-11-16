'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UpdateProfile =
  exports.SignOut =
  exports.SignIn =
  exports.SignUp =
    void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const util_1 = require('../lib/util');
const User_model_1 = __importDefault(require('../models/User.model'));
const config_1 = require('../config');
const socket_application_1 = __importDefault(
  require('../socket/socket.application'),
);
const io = socket_application_1.default.getInstance().io;
const SignUp = async (req, res) => {
  const { name, password, profileUrl } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: 'No name' });
    }
    if (!password) {
      return res.status(400).json({ message: 'No password' });
    }
    const userexist = await User_model_1.default.findOne({ name });
    if (userexist) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    const newUser = new User_model_1.default({
      name,
      password: hashedPassword,
      profileUrl,
    });
    await newUser.save();
    const newUserWithoutPassword = {
      _id: newUser._id,
      name: newUser.name,
      profileUrl: newUser.profileUrl,
    };
    io.emit('new_user', newUserWithoutPassword);
    (0, util_1.generateToken)(res, newUser._id.toString());
    res.status(201).json(newUserWithoutPassword);
  } catch (error) {
    console.error('Error in creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.SignUp = SignUp;
const SignIn = async (req, res) => {
  const { name, password } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: 'No name' });
    }
    if (!password) {
      return res.status(400).json({ message: 'No password' });
    }
    const user = await User_model_1.default.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    (0, util_1.generateToken)(res, user._id.toString());
    res.status(200).json({
      _id: user._id,
      name: user.name,
      profileUrl: user.profileUrl,
    });
  } catch (error) {
    console.error('Error in signing in user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.SignIn = SignIn;
const SignOut = (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: config_1.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
    });
    res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    console.error('Error in signing out user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.SignOut = SignOut;
const UpdateProfile = async (req, res) => {
  try {
    const authUser = req.user;
    if (!authUser || !authUser._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { name, profileUrl } = req.body;
    const user = await User_model_1.default.findById(authUser._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (name) {
      const userByName = await User_model_1.default.findOne({ name });
      if (userByName && userByName._id.toString() !== authUser._id.toString()) {
        return res.status(400).json({ message: 'Name already taken' });
      }
      user.name = name;
    }
    if (profileUrl) user.profileUrl = profileUrl;
    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      profileUrl: user.profileUrl,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.UpdateProfile = UpdateProfile;
