import http from 'http';
import { Server } from 'socket.io';
import { clientUrl } from '../config';
import * as socketService from './socket.service';
import { IMessage } from '../models/Chat.history.model';

const socketApplication = (
  server: http.Server<
    typeof http.IncomingMessage, 
    typeof http.ServerResponse
  >
) => {
  const io = new Server(server, {
    cors: {
      origin: clientUrl,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`🟢 Socket connected: ${socket.id}`);

    socket.on('become_online', (userId: string) => {
      socketService.becomeOnline(socket, userId);
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
        await socketService.sendMessage(socket, message, room);
      })();
    });

    socket.on('disconnect', () => {
      socketService.becomeOffline(socket);
      console.log(`🔴 Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default socketApplication;
