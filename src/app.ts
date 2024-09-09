import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import router from './app/routes';
import config from './app/config';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cors({ origin: `${config.client_url}` }));

//routes
app.use('/api', router);

//root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello poshturf-server!');
});

export default app;
