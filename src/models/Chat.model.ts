import { Schema, model, Document } from 'mongoose';

interface IChat extends Document {
  _id: string;
  type: 'private' | 'group';
  name?: string;
  membersId: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
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
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Chat = model<IChat>('Chat', ChatSchema);

export default Chat;
