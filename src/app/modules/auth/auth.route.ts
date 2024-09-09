import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { UserController } from '../user/user.controller';
import auth from '../../middlewares/authHandler';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.SignUpUserValidationSchema),
  UserController.signUpUser,
);
router.post(
  '/create-admin',
  auth('admin'),
  validateRequest(UserValidation.SignUpUserValidationSchema),
  UserController.signUpAdmin,
);

router.post(
  '/login',
  validateRequest(AuthValidation.logInUserValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
