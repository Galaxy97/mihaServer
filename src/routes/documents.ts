import { CreateDocumentDto } from './../interfaces/dto/documentDto';
import { authMiddleware } from '../authValidating';
import { Router } from 'express';
import { bodyValidator } from '../helpers/bodyValidator';
import { createDocumentService } from '../services/documents';

export const documents = Router();

documents.post('/:folderId/documents', authMiddleware, async (req, res) => {
  const data = await bodyValidator(CreateDocumentDto, req.body);
  const result = await createDocumentService(
    req['userId'],
    Number(req.params.folderId),
    data,
  );
  res.send(result);
});

// folders.put('/folders/:folderId', authMiddleware, async (req, res) => {
//   const data = await bodyValidator(UpdateFolderDto, req.body);
//   const result = await updateFolderService(
//     req['userId'],
//     Number(req.params.folderId),
//     data,
//   );
//   res.send(result);
// });

// folders.get('/folders', authMiddleware, async (req, res) => {
//   const result = await getFolderService(req['userId']);
//   res.send(result);
// });

// folders.get('/folders/:folderId', authMiddleware, async (req, res) => {
//   const result = await getFolderByIdService(
//     req['userId'],
//     Number(req.params.folderId),
//   );
//   res.send(result);
// });

// folders.delete('/folders/:folderId', authMiddleware, async (req, res) => {
//   const result = await deleteFolderByIdService(
//     req['userId'],
//     Number(req.params.folderId),
//   );
//   res.send(result);
// });
