import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreatePostDTO {
  @IsString()
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string;

  @IsString()
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string;

  @IsString()
  @IsNotEmpty({ message: '摘要不能为空' })
  readonly summary: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty({ message: '封面不能为空' })
  readonly posterUrl: string;

  @IsArray()
  @IsNotEmpty({ message: '标签不能为空' })
  readonly tags: string[];

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly lastModifiedDate: Date;

  @IsBoolean()
  @IsNotEmpty({ message: '状态不能为空' })
  readonly isPublic: boolean;
}

// export class UpdatePostDTO extends OmitType(CreatePostDTO, ['name'] as const) { }
// export class UpdateCatDto extends OmitType(CreatePostDTO, ['name'] as const) {}
