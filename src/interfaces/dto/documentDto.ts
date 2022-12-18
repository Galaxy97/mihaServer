import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsString()
  description!: string;

  @Expose()
  @IsInt()
  foldersId!: number;
}

export class UpdateDocumentDto {
  @Expose()
  @IsString()
  @IsOptional()
  name?: string;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @IsInt()
  @IsOptional()
  foldersId?: number;
}
