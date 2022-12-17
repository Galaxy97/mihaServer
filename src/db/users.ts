import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
