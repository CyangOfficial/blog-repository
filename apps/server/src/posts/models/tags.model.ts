import { ApiProperty } from '@nestjs/swagger';

export class TagsModel {
  @ApiProperty({ type: String, description: '标签' })
  readonly tags: string[];
}
