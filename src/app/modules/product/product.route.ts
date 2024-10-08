import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.validation';
import auth from '../../middlewares/authHandler';
const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.post(
  '/',
  auth('admin'),
  validateRequest(ProductValidation.productValidationSchema),
  ProductController.createProduct,
);
router.get('/:id', ProductController.getSingleProduct);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(ProductValidation.productValidationSchema),
  ProductController.updateProduct,
);
router.delete('/:id', auth('admin'), ProductController.deleteSingleProduct);

export const ProductRoutes = router;
