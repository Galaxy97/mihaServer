import { authMiddleware } from './../authValidating';
import { Router } from 'express';

export const documents = Router();

documents.post('/documents', authMiddleware, (req, res) => {
  //
});
