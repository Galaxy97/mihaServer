import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { Documents } from './document';
import { Folder } from './folder';
import { Users } from './users';

dotenv.config();

export const dbConnection = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'db',
  synchronize: true,
  logging: false,
  entities: [Users, Folder, Documents],
});
