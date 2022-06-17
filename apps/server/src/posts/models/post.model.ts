import { ApiProperty } from '@nestjs/swagger';

export class PostModel {
  @ApiProperty({ type: String, description: '文章标题' })
  readonly title: string;

  @ApiProperty({ type: String, description: '文章正文' })
  readonly content: string;

  @ApiProperty({ type: String, description: '文章摘要' })
  readonly summary: string;

  @ApiProperty({ type: String, description: '文章封面' })
  readonly posterUrl: string;

  @ApiProperty({ type: [String], description: '归属标签' })
  readonly tags: string[];

  @ApiProperty({ type: Boolean, description: '浏览量', default: 0 })
  readonly pv: number;

  @ApiProperty({ type: Boolean, description: '喜欢', default: 0 })
  readonly like: number;

  @ApiProperty({ type: Date, description: '最后修改时间' })
  readonly lastModifiedDate: Date;

  @ApiProperty({ type: Date, description: '创建时间' })
  readonly createAt: Date;

  @ApiProperty({ type: Date, description: '更新时间' })
  readonly updateAt: Date;

  @ApiProperty({ type: Boolean, description: '是否公开', default: true })
  readonly isPublic: boolean;
}
