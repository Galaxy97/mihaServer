import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {
  @Expose()
  @IsString()
  name!: string;
}

export class UpdateFolderDto {
  @Expose()
  @IsString()
  @IsOptional()
  name?: string;
}
