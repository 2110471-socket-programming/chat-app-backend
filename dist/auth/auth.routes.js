'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const auth_service_1 = require('./auth.service');
const protectroute_1 = require('../middleware/protectroute');
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', auth_service_1.SignUp);
authRouter.post('/signin', auth_service_1.SignIn);
authRouter.post('/signout', auth_service_1.SignOut);
authRouter.put(
  '/update',
  protectroute_1.protectRoute,
  auth_service_1.UpdateProfile,
);
exports.default = authRouter;
