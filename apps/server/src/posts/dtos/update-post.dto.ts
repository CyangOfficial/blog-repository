import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';
export class UpdatePostDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly _id: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsString()
  @IsOptional()
  readonly summary?: string;

  @IsString()
  @IsOptional()
  readonly postUrl?: string;

  @IsArray()
  @IsOptional()
  readonly tags?: string[];

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly lastModifiedDate?: Date;

  @IsBoolean()
  @IsOptional()
  readonly isPublic?: boolean;

  @IsNumber()
  @IsOptional()
  readonly pv?: number;

  @IsNumber()
  @IsOptional()
  readonly like?: number;
}
