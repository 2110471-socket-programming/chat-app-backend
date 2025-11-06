import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const generateToken = (
  res: Response<any, Record<string, any>>,
  userId: string,
) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};
