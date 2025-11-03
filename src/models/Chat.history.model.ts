import { Schema, model, Document } from 'mongoose';

export interface IMessage {
  senderId: Schema.Types.ObjectId;
  senderName: string;
  type: string;
  content: string;
  date: Date;
}

interface IChatHistory extends Document {
  _id: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatHistorySchema = new Schema<IChatHistory>(
  {
    _id: String,
    messages: [
      {
        senderId: {
          type: Schema.Types.ObjectId,
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
        }
      },
    ],
  },
  { timestamps: true },
);

const ChatHistory = model<IChatHistory>('ChatHistory', ChatHistorySchema);

export default ChatHistory;
