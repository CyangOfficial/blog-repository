import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
export class PaginationDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Transform(({ value, key, obj, type, options }) => {
    // console.log(value, key, obj, type)
    return value * 1;
  })
  public page: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value, key, obj, type, options }) => {
    // console.log(value, key, obj, type)
    return value * 1;
  })
  public pageSize: number;

  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public tag?: string;

  @IsString()
  @IsOptional()
  public field?: string;
}

// export class UpdatePostDTO extends OmitType(CreatePostDTO, ['name'] as const) { }
// export class UpdateCatDto extends OmitType(CreatePostDTO, ['name'] as const) {}
