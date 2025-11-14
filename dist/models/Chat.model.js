'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const ChatSchema = new mongoose_1.Schema(
  {
    _id: String,
    type: {
      type: String,
      required: true,
      enum: ['private', 'group'],
    },
    name: {
      type: String,
    },
    membersId: {
      type: [mongoose_1.Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  { timestamps: true },
);
const Chat = (0, mongoose_1.model)('Chat', ChatSchema);
exports.default = Chat;
