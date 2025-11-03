import { Socket, DefaultEventsMap } from 'socket.io';
import ChatHistory, { IMessage } from '../models/Chat.history.model';
import userSocket from '../user/online.users';

type socketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export const becomeOnline = (
  socket: socketType,
  userId: string
) => {
  userSocket.set(socket.id, userId);
  socket.broadcast.emit('online_clients', Array.from(userSocket.values()));
}

export const becomeOffline = (socket: socketType) => {
  userSocket.delete(socket.id);
  socket.broadcast.emit('online_clients', Array.from(userSocket.values()));
}

export const sendMessage = async (
  socket: socketType, 
  message: IMessage,
  room: string
) => {
  socket.to(room).emit('receive_message', message);
  
  const chatHistory = await ChatHistory.findById(room);
  if (chatHistory === null) return;

  chatHistory.messages.push(message);
  await chatHistory.save();
};
