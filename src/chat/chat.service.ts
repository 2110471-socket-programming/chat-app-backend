import { Request, Response } from 'express';
import Chat from '../models/Chat.model';
import ChatHistory from '../models/Chat.history.model';

export const getPrivateChatHistoryById = async (req: Request, res: Response) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).send('Please specify private chatId');
  }

  const membersId = (chatId as string).split('_');

  if (membersId.length !== 2) {
    return res.status(400).send('Invalid private chatId');
  }

  let chatHistory = await ChatHistory.findById(chatId);

  if (chatHistory !== null) {
    return res.status(200).json(chatHistory);
  }

  await Chat.create({
    _id: chatId,
    type: 'private',
    membersId: membersId,
  });

  chatHistory = await ChatHistory.create({ _id: chatId });

  return res.status(200).json(chatHistory);
};

export const getGroupChatHistoryById = async (req: Request, res: Response) => {
  const { chatId } = req.query;

  if (!chatId) {
    return res.status(400).send('Please specify group chatId');
  }

  let chatHistory = await ChatHistory.findById(chatId);

  if (chatHistory === null) {
    return res.status(400).send('Group chat not found');
  }

  return res.status(200).json(chatHistory);
};

export const getGroupChats = async (req: Request, res: Response) => {
  const groupChats = await Chat.find({ type: 'group' });

  return res.json({ group_chats: groupChats });
}
