import { Router } from 'express';
import * as GroupService from './group.service';

const groupRouter = Router();

groupRouter.post('/', GroupService.createGroup);
groupRouter.put('/', GroupService.joinGroup);
groupRouter.delete('/', GroupService.leaveGroup);

export default groupRouter;
