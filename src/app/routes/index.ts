import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { ProductRoutes } from '../modules/product/product.route';
import { ReviewRoutes } from '../modules/review/review.route';

import { OrderRoutes } from '../modules/order/order.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },

  {
    path: '/order',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
