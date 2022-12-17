import { Expose } from 'class-transformer';
import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRoles } from '../../db/users';

export class SignUpDto {
  @Expose()
  @IsString()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  password!: string;

  @Expose()
  @IsEnum(UserRoles)
  role!: UserRoles;
}
