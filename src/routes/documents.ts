import { RequestError } from './../errors/RequestError';
import {
  deleteDocumentByIdService,
  signDocumentByIdService,
  updateDocumentByIdService,
} from './../services/documents';
import {
  CreateDocumentDto,
  UpdateDocumentDto,
} from './../interfaces/dto/documentDto';
import { authMiddleware } from '../authValidating';
import { Router } from 'express';
import { bodyValidator } from '../helpers/bodyValidator';
import {
  createDocumentService,
  getDocumentsByFolderIdService,
} from '../services/documents';
import { UserRoles } from '../db/users';

export const documents = Router();

documents.post('/documents', authMiddleware, async (req, res) => {
  const data = await bodyValidator(CreateDocumentDto, req.body);
  const result = await createDocumentService(req['userId'], data);
  res.send(result);
});

documents.put('/documents/:documentsId', authMiddleware, async (req, res) => {
  const data = await bodyValidator(UpdateDocumentDto, req.body);
  const result = await updateDocumentByIdService(
    req['userId'],
    Number(req.params.documentsId),
    data,
  );
  res.send(result);
});

documents.get('/documents', authMiddleware, async (req, res) => {
  if (req['userRole'] !== UserRoles.Admin) {
    const result = await getDocumentsByFolderIdService();
    res.send(result);
  }
  const result = await getDocumentsByFolderIdService(
    req['userId'],
    Number(req.query.folderId),
  );
  res.send(result);
});

documents.delete(
  '/documents/:documentsId',
  authMiddleware,
  async (req, res) => {
    const result = await deleteDocumentByIdService(
      req['userId'],
      Number(req.params.documentsId),
    );
    res.send(result);
  },
);

documents.post(
  '/documents/:documentsId/signed',
  authMiddleware,
  async (req, res) => {
    if (req['userRole'] !== UserRoles.Admin)
      throw new RequestError(401, 'Action is not allowed');

    const result = await signDocumentByIdService(
      Number(req.params.documentsId),
    );

    res.send(result);
  },
);
