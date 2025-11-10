import { Request, Response } from 'express';
import SocketApplication from '../socket/socket.application';
import Chat from '../models/Chat.model';
import ChatHistory from '../models/Chat.history.model';
import { Types } from 'mongoose';

const io = SocketApplication.getInstance().io;

export const createGroup = async (req: Request, res: Response) => {
  const { userId, groupName } = req.body;

  const chat = await Chat.create({
    _id: new Types.ObjectId(),
    type: 'group',
    name: groupName,
    membersId: [userId],
  });

  await ChatHistory.create({ _id: chat._id });

  io.emit('new_group', chat);

  return res.status(200).json(chat);
};

export const joinGroup = async (req: Request, res: Response) => {
  const { groupId, userId } = req.body;

  const chat = await Chat.findById(groupId);
  if (!chat) {
    return res.status(404).send('Chat not found');
  }

  chat.membersId.push(userId);
  await chat.save();

  io.emit('join_group', groupId, userId);

  return res.status(200).json(chat);
};

export const leaveGroup = async (req: Request, res: Response) => {
  const { groupId, userId } = req.body;

  const chat = await Chat.findById(groupId);
  if (!chat) {
    return res.status(404).send('Chat not found');
  }

  chat.membersId = chat.membersId.filter((id) => id.toString() !== userId.toString());
  await chat.save();

  io.emit('leave_group', groupId, userId);

  return res.status(200).json(chat);
};
