import { Router } from 'express';
import { PaymentControllers } from './payment.controller';

const router = Router();

router.post('/', PaymentControllers.initiatePaymentController);
router.post('/success', PaymentControllers.confirmationController);
router.post('/fail', PaymentControllers.failedController);

export const PaymentRoutes = router;
