'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const ChatHistorySchema = new mongoose_1.Schema(
  {
    _id: String,
    messages: [
      {
        senderId: {
          type: mongoose_1.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        senderName: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true },
);
const ChatHistory = (0, mongoose_1.model)('ChatHistory', ChatHistorySchema);
exports.default = ChatHistory;
