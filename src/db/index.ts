import { DataSource } from 'typeorm';
import { Users } from './users';

export const dbConnection = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'andrii',
  password: '192143120',
  database: 'db',
  synchronize: true,
  logging: false,
  entities: [Users],
});
