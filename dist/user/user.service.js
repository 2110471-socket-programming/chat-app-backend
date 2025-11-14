'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getOnlineUsersId = exports.getUsers = void 0;
const User_model_1 = __importDefault(require('../models/User.model'));
const user_online_1 = __importDefault(require('./user.online'));
const userSocket = user_online_1.default.userSocket;
const getUsers = async (req, res) => {
  try {
    const users = await User_model_1.default.find().select('-password');
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};
exports.getUsers = getUsers;
const getOnlineUsersId = async (req, res) => {
  return res.json({
    online_clients: Array.from(userSocket.values()),
  });
};
exports.getOnlineUsersId = getOnlineUsersId;
