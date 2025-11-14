'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.leaveGroup = exports.joinGroup = exports.createGroup = void 0;
const socket_application_1 = __importDefault(
  require('../socket/socket.application'),
);
const Chat_model_1 = __importDefault(require('../models/Chat.model'));
const Chat_history_model_1 = __importDefault(
  require('../models/Chat.history.model'),
);
const mongoose_1 = require('mongoose');
const io = socket_application_1.default.getInstance().io;
const createGroup = async (req, res) => {
  const { userId, groupName } = req.body;
  const chat = await Chat_model_1.default.create({
    _id: new mongoose_1.Types.ObjectId(),
    type: 'group',
    name: groupName,
    membersId: [userId],
  });
  await Chat_history_model_1.default.create({ _id: chat._id });
  io.emit('new_group', chat);
  return res.status(200).json(chat);
};
exports.createGroup = createGroup;
const joinGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  const chat = await Chat_model_1.default.findById(groupId);
  if (!chat) {
    return res.status(404).send('Chat not found');
  }
  chat.membersId.push(userId);
  await chat.save();
  io.emit('join_group', groupId, userId);
  return res.status(200).json(chat);
};
exports.joinGroup = joinGroup;
const leaveGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  const chat = await Chat_model_1.default.findById(groupId);
  if (!chat) {
    return res.status(404).send('Chat not found');
  }
  chat.membersId = chat.membersId.filter(
    (id) => id.toString() !== userId.toString(),
  );
  await chat.save();
  io.emit('leave_group', groupId, userId);
  return res.status(200).json(chat);
};
exports.leaveGroup = leaveGroup;
