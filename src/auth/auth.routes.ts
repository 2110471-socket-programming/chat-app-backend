import { Router } from 'express';
import { SignUp, SignIn, SignOut, UpdateProfile } from './auth.controllers';
import { protectRoute } from '../middleware/protectroute';
const authRouter = Router();

authRouter.post('/signup',SignUp);
authRouter.post('/signin',SignIn);
authRouter.post('/signout',SignOut);
authRouter.put('/update',protectRoute,UpdateProfile);

export default authRouter;