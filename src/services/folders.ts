import { dbConnection } from '../db';
import { Folder } from '../db/folder';
import { RequestError } from '../errors/RequestError';
import { CreateFolderDto, UpdateFolderDto } from '../interfaces/dto/folderDto';

export const createFolderService = async (
  usersId: number,
  dataDto: CreateFolderDto,
) => {
  const folder = dbConnection.getRepository(Folder).create({
    ...dataDto,
    usersId,
  });
  const savedFolder = await dbConnection.getRepository(Folder).save(folder);
  return {
    folderId: savedFolder.id,
    name: savedFolder.name,
    createdAt: savedFolder.createdAt,
    updatedAt: savedFolder.updatedAt,
  };
};

export const updateFolderService = async (
  usersId: number,
  folderId: number,
  dataDto: UpdateFolderDto,
) => {
  const existedFolder = await dbConnection
    .getRepository(Folder)
    .findOne({ where: { usersId, id: folderId } });

  const updatedFolder = { ...existedFolder, ...dataDto };
  const savedFolder = await dbConnection
    .getRepository(Folder)
    .save(updatedFolder);
  return {
    folderId: savedFolder.id,
    name: savedFolder.name,
    createdAt: savedFolder.createdAt,
    updatedAt: savedFolder.updatedAt,
  };
};

export const getFolderService = async (usersId: number) => {
  const folders = await dbConnection.getRepository(Folder).find({
    where: {
      usersId,
    },
  });
  return folders.map((folder) => {
    return {
      folderId: folder.id,
      name: folder.name,
      createdAt: folder.createdAt,
      updatedAt: folder.updatedAt,
    };
  });
};

export const getFolderByIdService = async (
  usersId: number,
  folderId: number,
) => {
  const folder = await dbConnection.getRepository(Folder).findOne({
    where: {
      usersId,
      id: folderId,
    },
  });
  if (!folder) throw new RequestError(400, 'Folder is not exist');
  return {
    folderId: folder.id,
    name: folder.name,
    createdAt: folder.createdAt,
    updatedAt: folder.updatedAt,
  };
};

export const deleteFolderByIdService = async (
  usersId: number,
  folderId: number,
) => {
  const folder = await dbConnection.getRepository(Folder).findOne({
    where: {
      usersId,
      id: folderId,
    },
  });
  if (!folder) throw new RequestError(400, 'Folder is not exist');
  await dbConnection.getRepository(Folder).remove(folder);
  return {
    folderId: folder.id,
  };
};
