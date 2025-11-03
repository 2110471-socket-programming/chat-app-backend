import express, { Application } from 'express';
import http from 'http';
import corsApplication from './cors.application';
import socketApplication from './socket/socket.application';
import { PORT, NODE_ENV, mongoUri } from './config';
import ioRoutes from './io/io.routes';
import userRouter from './user/user.routes';
import chatRouter from './chat/chat.routes';
import mongoose from 'mongoose';

const app: Application = express();
const server = http.createServer(app);

(async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
})();

app.use(corsApplication);
app.use(express.json());

const io = socketApplication(server);

app.use('/api/users', userRouter);
app.use('/api/chats', chatRouter);
app.use(ioRoutes(io));

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${NODE_ENV} mode`);
});
