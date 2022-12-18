import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Documents } from './document';
import { Folder } from './folder';

export enum UserRoles {
  Admin = 'admin',
  Customer = 'customer',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  email!: string;

  @Column('varchar')
  password!: string;

  @Column({ type: 'enum', enum: UserRoles })
  role!: UserRoles;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Folder, (s) => s.users)
  folders!: Folder[];

  @OneToMany(() => Documents, (s) => s.users)
  documents!: Documents[];
}
