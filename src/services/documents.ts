import { RequestError } from './../errors/RequestError';
import { dbConnection } from '../db';
import { Documents, DocumentStatuses } from '../db/document';
import { getFolderByIdService } from './folders';
import {
  CreateDocumentDto,
  UpdateDocumentDto,
} from '../interfaces/dto/documentDto';

export const createDocumentService = async (
  usersId: number,
  dataDto: CreateDocumentDto,
) => {
  const folder = await getFolderByIdService(usersId, dataDto.foldersId);

  if (!folder) throw new RequestError(400, 'Folder is not exist');
  const document = dbConnection.getRepository(Documents).create({
    ...dataDto,
    status: DocumentStatuses.Signature,
    foldersId: folder.folderId,
    usersId,
  });
  const savedDocument = await dbConnection
    .getRepository(Documents)
    .save(document);

  return {
    folderId: savedDocument.foldersId,
    documentId: savedDocument.id,
    name: savedDocument.name,
    description: savedDocument.description,
    status: savedDocument.status,
    createdAt: savedDocument.createdAt,
    updatedAt: savedDocument.updatedAt,
  };
};

export const getDocumentsByFolderIdService = async (
  usersId: number,
  foldersId?: number,
) => {
  let documents: Documents[] = [];

  if (foldersId) {
    const folder = await getFolderByIdService(usersId, foldersId);
    if (!folder) throw new RequestError(400, 'Folder is not exist');

    documents = await dbConnection.getRepository(Documents).find({
      where: {
        usersId,
        foldersId,
      },
    });

    return documents.map((document) => {
      return {
        folderId: document.foldersId,
        documentId: document.id,
        name: document.name,
        description: document.description,
        status: document.status,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      };
    });
  }

  documents = await dbConnection.getRepository(Documents).find({
    where: {
      usersId,
    },
  });
  return documents.map((document) => {
    return {
      folderId: document.foldersId,
      documentId: document.id,
      name: document.name,
      description: document.description,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  });
};

export const updateDocumentByIdService = async (
  usersId: number,
  documentsId: number,
  updateData: UpdateDocumentDto,
) => {
  const existedDocument = await dbConnection.getRepository(Documents).findOne({
    where: {
      usersId,
      id: documentsId,
    },
  });

  if (!existedDocument) throw new RequestError(400, 'Document is not exist');

  if (updateData.foldersId) {
    const folder = await getFolderByIdService(usersId, updateData.foldersId);

    if (!folder) throw new RequestError(400, 'Folder is not exist');
  }

  if (!updateData.foldersId) updateData.foldersId = existedDocument.foldersId;

  const updatedDocument = { ...existedDocument, ...updateData };
  const savedDocument = await dbConnection
    .getRepository(Documents)
    .save(updatedDocument);

  return {
    folderId: savedDocument.foldersId,
    documentId: savedDocument.id,
    name: savedDocument.name,
    description: savedDocument.description,
    status: savedDocument.status,
    createdAt: savedDocument.createdAt,
    updatedAt: savedDocument.updatedAt,
  };
};

export const deleteDocumentByIdService = async (
  usersId: number,
  documentsId: number,
) => {
  const existedDocument = await dbConnection.getRepository(Documents).findOne({
    where: {
      usersId,
      id: documentsId,
    },
  });

  if (!existedDocument) throw new RequestError(400, 'Document is not exist');

  await dbConnection.getRepository(Documents).remove(existedDocument);

  return {
    documentId: existedDocument.id,
  };
};
