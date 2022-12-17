import { Router } from 'express';
import { entry } from './entry';

export const routes = Router();

routes.use(entry);
