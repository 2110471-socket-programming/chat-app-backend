import { Request, Response } from 'express';
import User from '../models/User.model';
import userSocket from './online.users';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
}

export const getOnlineUsersId = async (req: Request, res: Response) => {
  return res.json({
    online_clients: Array.from(userSocket.values()),
  })
}