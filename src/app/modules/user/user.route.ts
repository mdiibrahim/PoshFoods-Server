import express from 'express';
import auth from '../../middlewares/authHandler';
import { UserController } from './user.controller';

const router = express.Router();
router.get('/profile', auth('user', 'admin'), UserController.getAUserDetails);

export const UserRoutes = router;
