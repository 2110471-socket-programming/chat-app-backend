import { Server, DefaultEventsMap } from 'socket.io';
import { Router } from 'express';
import * as ioService from './io.service';

const ioRoutes = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  const router = Router();

  router.post('/api/users', ioService.createUser(io));
  router.post('/api/chats/group', ioService.createGroup(io));

  return router;
};

export default ioRoutes;
