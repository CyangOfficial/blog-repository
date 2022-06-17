import { ApiProperty } from '@nestjs/swagger';
import { PostModel } from './post.model';

export class PostsModel {
  @ApiProperty({ type: Number, description: '总计' })
  readonly total: number;

  @ApiProperty({ type: Number, description: '页' })
  readonly page: number;

  @ApiProperty({ type: Number, description: '页数' })
  readonly pageSize: number;

  @ApiProperty({ type: Array, description: '列表' })
  readonly items: PostModel[];
}
