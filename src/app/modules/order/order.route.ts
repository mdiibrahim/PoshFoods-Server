import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/authHandler';
import { OrderValidation } from './order.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.get('/', auth('admin'), OrderController.getAllOrders);
router.post(
  '/',
  auth('user'),
  validateRequest(OrderValidation.orderValidationSchema),
  OrderController.createOrder,
);
router.get('/user', auth('user'), OrderController.getAUserOrders);
router.delete('/:id', auth('user'), OrderController.cancelOrder);
router.get('/:id', auth('user'), OrderController.getAUserSingleOrder);

export const OrderRoutes = router;
