import express from 'express';
import corsApplication from './cors.application';
import { PORT, NODE_ENV, mongoUri } from './config';
import userRouter from './user/user.routes';
import chatRouter from './chat/chat.routes';
import authRouter from './auth/auth.routes';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import SocketApplication from './socket/socket.application';

const { app, server } = SocketApplication.getInstance();

(async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');
})();

app.use(cookieParser());
app.use(corsApplication);
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/chats', chatRouter);
app.use('/api/auth', authRouter);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${NODE_ENV} mode`);
});
