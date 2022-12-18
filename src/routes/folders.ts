import {
  createFolderService,
  deleteFolderByIdService,
  getFolderByIdService,
  getFolderService,
  updateFolderService,
} from './../services/folders';
import { authMiddleware } from '../authValidating';
import { Router } from 'express';
import { bodyValidator } from '../helpers/bodyValidator';
import { CreateFolderDto, UpdateFolderDto } from '../interfaces/dto/folderDto';

export const folders = Router();

folders.post('/folders', authMiddleware, async (req, res) => {
  const data = await bodyValidator(CreateFolderDto, req.body);
  const result = await createFolderService(req['userId'], data);
  res.send(result);
});

folders.put('/folders/:folderId', authMiddleware, async (req, res) => {
  const data = await bodyValidator(UpdateFolderDto, req.body);
  const result = await updateFolderService(
    req['userId'],
    Number(req.params.folderId),
    data,
  );
  res.send(result);
});

folders.get('/folders', authMiddleware, async (req, res) => {
  const result = await getFolderService(req['userId']);
  res.send(result);
});

folders.get('/folders/:folderId', authMiddleware, async (req, res) => {
  const result = await getFolderByIdService(
    req['userId'],
    Number(req.params.folderId),
  );
  res.send(result);
});

folders.delete('/folders/:folderId', authMiddleware, async (req, res) => {
  const result = await deleteFolderByIdService(
    req['userId'],
    Number(req.params.folderId),
  );
  res.send(result);
});
