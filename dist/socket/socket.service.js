'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendMessage = exports.becomeOffline = exports.becomeOnline = void 0;
const Chat_history_model_1 = __importDefault(
  require('../models/Chat.history.model'),
);
const user_online_1 = __importDefault(require('../user/user.online'));
const userSocket = user_online_1.default.userSocket;
const becomeOnline = (socket, userId) => {
  userSocket.set(socket.id, userId);
  console.log(`${userId} become online!`);
  socket.broadcast.emit('online_clients', Array.from(userSocket.values()));
};
exports.becomeOnline = becomeOnline;
const becomeOffline = (socket) => {
  userSocket.delete(socket.id);
  socket.broadcast.emit('online_clients', Array.from(userSocket.values()));
};
exports.becomeOffline = becomeOffline;
const sendMessage = async (socket, message, room) => {
  socket.to(room).emit('receive_message', message);
  const chatHistory = await Chat_history_model_1.default.findById(room);
  if (chatHistory === null) return;
  chatHistory.messages.push(message);
  await chatHistory.save();
};
exports.sendMessage = sendMessage;
