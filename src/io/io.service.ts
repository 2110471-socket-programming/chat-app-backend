import { Request, Response } from 'express';
import { Server, DefaultEventsMap } from 'socket.io';
import User from '../models/User.model';
import Chat from '../models/Chat.model';
import ChatHistory from '../models/Chat.history.model';
import Socket from '../socket/socket.application';

type ioType = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

const io = Socket.getInstance().io;

export const createUser = (io: ioType) => {
  return async (req: Request, res: Response) => {
    const newUser = await User.create({
      name: req.body.name,
      password: '1234',
    });

    io.emit('new_user', newUser);

    res.status(201).json({ new_user: newUser });
  };
};

export const createGroup = (io: ioType) => {
  return async (req: Request, res: Response) => {
    const { name, userId } = req.body;

    const newGroup = await Chat.create({
      type: 'group',
      name: name,
      membersId: [userId],
    });

    await ChatHistory.create({
      _id: newGroup._id,
    });

    io.emit('new_group', newGroup);

    res.status(201).json({ new_group: newGroup });
  };
};
