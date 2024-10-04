import express from 'express';
import auth from '../../middlewares/authHandler';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();
router.get('/profile', auth('user', 'admin'), UserController.getAUserDetails);
router.put(
  '/profile',
  auth('user', 'admin'),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserController.updateUserProfile,
);

export const UserRoutes = router;
