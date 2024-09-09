// review.route.ts
import express from 'express';
import auth from '../../middlewares/authHandler';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidations } from './review.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.get('/', ReviewControllers.getAllProductsReviews);
router.post(
  '/',
  auth('user'),
  validateRequest(ReviewValidations.reviewValidationSchema),
  ReviewControllers.createReview,
);
router.get('/:id', ReviewControllers.getAProductReviews);
export const ReviewRoutes = router;
