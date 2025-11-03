import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  _id: string;
  name: string;
  password: string;
  profileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    _id: String,
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
