import express, { Application } from 'express';
import http from 'http';
import { Server, DefaultEventsMap } from 'socket.io';
import { clientUrl } from '../config';
import socketEventListener from './socket.event';

type serverType = http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

type ioType = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

class SocketApplication {
  private static instance: SocketApplication;
  public app: Application;
  public server: serverType;
  public io: ioType;

  private constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: clientUrl,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    socketEventListener(this.io);
  }

  public static getInstance(): SocketApplication {
    if (!SocketApplication.instance) {
      SocketApplication.instance = new SocketApplication();
    }
    return SocketApplication.instance;
  }
}

export default SocketApplication;
