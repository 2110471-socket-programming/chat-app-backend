import { Router } from 'express';
import * as UserService from './user.service';

const userRouter = Router();

userRouter.get('/', UserService.getUsers);
userRouter.get('/online', UserService.getOnlineUsersId);


export default userRouter;