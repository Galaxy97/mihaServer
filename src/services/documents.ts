import { RequestError } from './../errors/RequestError';
import { dbConnection } from '../db';
import { Documents, DocumentStatuses } from '../db/document';
import { Folder } from '../db/folder';
import { CreateFolderDto } from '../interfaces/dto/folderDto';

export const createDocumentService = async (
  userId: number,
  folderId: number,
  dataDto: CreateFolderDto,
) => {
  const folder = await dbConnection.getRepository(Folder).findOne({
    where: {
      id: folderId,
    },
  });

  if (!folder) throw new RequestError(400, 'Folder is not exist');
  const document = dbConnection.getRepository(Documents).create({
    ...dataDto,
    status: DocumentStatuses.Signature,
    foldersId: folder.id,
    usersId: userId,
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
