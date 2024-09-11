import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import router from './app/routes';
import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cors({ origin: `${config.client_url}` }));

//routes
app.use('/api', router);

//centralized error handler
app.use(globalErrorHandler);

//root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello PoshFoods-server!');
});

//not found route
app.use(notFoundRoute);

export default app;
