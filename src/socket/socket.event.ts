import { Server, DefaultEventsMap } from 'socket.io';
import * as SocketService from './socket.service';
import { IMessage } from '../models/Chat.history.model';
import { IUser } from '../models/User.model';

type ioType = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

const socketEventListener = (io: ioType) => {
  io.on('connection', (socket) => {
    console.log(`🟢 Socket connected: ${socket.id}`);

    socket.on('become_online', (userId: string) => {
      SocketService.becomeOnline(socket, userId);
    });

    socket.on('create_user', (newUser: IUser) => {
      SocketService.newUser(socket, newUser);
    });

    socket.on('join_room', (room: string) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    socket.on('leave_room', (room: string) => {
      socket.leave(room);
      console.log(`Socket ${socket.id} left room ${room}`);
    });

    socket.on('send_message', (message: IMessage, room: string) => {
      (async () => {
        await SocketService.sendMessage(socket, message, room);
      })();
    });

    socket.on('disconnect', () => {
      SocketService.becomeOffline(socket);
      console.log(`🔴 Socket disconnected: ${socket.id}`);
    });
  });
};

export default socketEventListener;
