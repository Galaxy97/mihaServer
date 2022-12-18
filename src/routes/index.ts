import { Router } from 'express';
import { documents } from './documents';
import { entry } from './entry';
import { folders } from './folders';

export const routes = Router();

routes.use(entry);
routes.use(folders);
routes.use(documents);
