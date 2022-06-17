import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDTO, UpdatePostDTO, PaginationDTO } from './dtos/index.dto';
import { PostModel, TagsModel } from './models/index.model';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ValidateObjectIdPipe } from '../shared/pipes/validate-object-id.pipe';
import { identity } from 'rxjs';
@ApiTags('文章详情')
@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  async posts(@Query() query: PaginationDTO) {
    return await this.postsService.fintPublicByPagination(query);
  }

  // 分页查找所有文章
  @UseGuards(AuthGuard('jwt'))
  @Get('getPosts')
  async getPosts(@Query() query: PaginationDTO) {
    return await this.postsService.findByPagination(query);
  }

  // 获取所有文章
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'success', type: PostModel })
  @Get('getAll')
  async findAll() {
    const posts = this.postsService.findAllPosts();
    return posts;
  }

  // 根据ID查找文章(已发布)
  @Get(':postId')
  async findOneById(@Param('postId', new ValidateObjectIdPipe()) postId) {
    const post = await this.postsService.findOneById(postId, true);
    return {
      items: post,
    };
  }

  // 根据ID查找文章(发布/未发布)
  @Get('itemPost/:postId')
  @UseGuards(AuthGuard('jwt'))
  async findJwtItemPost(@Param('postId', new ValidateObjectIdPipe()) postId) {
    const post = await this.postsService.findOneById(postId, false);
    return {
      items: post,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  // 文章访客+1
  @Get('updatePV/:postId')
  async updatePV(@Param('postId', new ValidateObjectIdPipe()) postId) {
    const post = await this.postsService.updatePV(postId);
    return post;
  }

  // 获取所有标签
  @ApiBody({ type: TagsModel })
  @Get('tags')
  getTags() {
    const tags = this.postsService.findTags();
  }

  // 创建文章
  @UseGuards(AuthGuard('jwt'))
  // @ApiResponse({ status: 200, description: 'success', type: PostModel })
  @Post()
  // @ApiResponse({ status: 201, description: '创建成功' })
  // @ApiResponse({ status: 403, description: '创建失败' })
  create(@Body() postInfo: CreatePostDTO) {
    return this.postsService.createPost(postInfo);
  }

  // 更新文章
  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Body(new ValidateObjectIdPipe()) updatePostDTO: UpdatePostDTO) {
    return this.postsService.updateById(updatePostDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deletePost(@Param('id', new ValidateObjectIdPipe()) id) {
    return await this.postsService.deleteOneById(id);
  }
}
