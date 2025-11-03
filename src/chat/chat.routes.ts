import { Router } from 'express';
import * as ChatService from './chat.service';

const chatRouter = Router();

chatRouter.get('/private/:chatId', ChatService.getPrivateChatHistoryById);
chatRouter.get('/group/:chatId', ChatService.getGroupChatHistoryById);
chatRouter.get('/group', ChatService.getGroupChats);

export default chatRouter;