import { Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

export class SignInDto {
  @Expose()
  @IsString()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  password!: string;
}
