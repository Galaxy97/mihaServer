import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Folder } from './folder';
import { Users } from './users';

export enum DocumentStatuses {
  Signature = 'Signature is Required',
  Signed = 'Signed!',
}

@Entity()
export class Documents {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  description!: string;

  @Column({ type: 'enum', enum: DocumentStatuses })
  status!: DocumentStatuses;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Folder, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  folders!: Folder;
  @Column({ nullable: true })
  foldersId!: number;

  @ManyToOne(() => Users, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  users!: Users;
  @Column({ nullable: true })
  usersId!: number;
}
