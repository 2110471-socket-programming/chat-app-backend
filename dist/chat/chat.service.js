'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getGroupChats =
  exports.getGroupChatHistoryById =
  exports.getPrivateChatHistoryById =
    void 0;
const Chat_model_1 = __importDefault(require('../models/Chat.model'));
const Chat_history_model_1 = __importDefault(
  require('../models/Chat.history.model'),
);
const getPrivateChatHistoryById = async (req, res) => {
  const { chatId } = req.params;
  if (!chatId) {
    return res.status(400).send('Please specify private chatId');
  }
  const membersId = chatId.split('_');
  if (membersId.length !== 2) {
    return res.status(400).send('Invalid private chatId');
  }
  let chatHistory = await Chat_history_model_1.default.findById(chatId);
  if (chatHistory !== null) {
    return res.status(200).json(chatHistory);
  }
  await Chat_model_1.default.create({
    _id: chatId,
    type: 'private',
    membersId: membersId,
  });
  chatHistory = await Chat_history_model_1.default.create({ _id: chatId });
  return res.status(200).json(chatHistory);
};
exports.getPrivateChatHistoryById = getPrivateChatHistoryById;
const getGroupChatHistoryById = async (req, res) => {
  const { chatId } = req.params;
  if (!chatId) {
    return res.status(400).send('Please specify group chatId');
  }
  let chatHistory = await Chat_history_model_1.default.findById(chatId);
  if (chatHistory === null) {
    return res.status(400).send('Group chat not found');
  }
  return res.status(200).json(chatHistory);
};
exports.getGroupChatHistoryById = getGroupChatHistoryById;
const getGroupChats = async (req, res) => {
  const groupChats = await Chat_model_1.default.find({ type: 'group' });
  return res.json({ group_chats: groupChats });
};
exports.getGroupChats = getGroupChats;
