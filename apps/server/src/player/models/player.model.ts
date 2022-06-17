import { ApiProperty } from '@nestjs/swagger';
export class PlayerModel {
  @ApiProperty({ type: String, description: '歌曲标题' })
  readonly title: string;

  @ApiProperty({ type: String, description: '歌曲作者' })
  readonly artist: string;

  @ApiProperty({ type: String, description: '歌词' })
  readonly lrc: string;

  @ApiProperty({ type: String, description: '歌曲歌词' })
  readonly coverUrl: string;

  @ApiProperty({ type: String, description: '歌曲路径' })
  readonly musicUrl: string;

  @ApiProperty({ type: Boolean, description: '是否公开' })
  readonly isPublic: boolean;
}
