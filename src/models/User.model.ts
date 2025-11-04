import { Schema, model, Document ,Types } from 'mongoose';

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  password: string;
  profileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = model<IUser>('User', UserSchema);

export default User;
