import express, { Application } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

import 'reflect-metadata';
import 'express-async-errors';

import { dbConnection } from './db';
import { RequestError } from './errors/RequestError';

import { routes } from './routes';

const app: Application = express();

app.use(express.json());

app.use('/api', routes);
app.use(async (err, req, res, next) => {
  if (err instanceof JsonWebTokenError && err.name === 'TokenExpiredError')
    return res.status(401).send();
  console.error(err);
  if (err instanceof RequestError && err.code)
    return res.status(err.code).send({ message: err.message });

  return res.status(500).send(err);
});

app.listen(3000, async () => {
  await dbConnection.initialize();
  console.log('Server started on 3000');
});
