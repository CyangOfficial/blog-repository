import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { PostModel, TagsModel, PostsModel } from './models/index.model';
import { CreatePostDTO, UpdatePostDTO, PaginationDTO } from './dtos/index.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  // 查找所有文章
  async findAllPosts(): Promise<PostModel[]> {
    return await this.postModel.find().exec();
  }

  // 分页查找公开文章
  async fintPublicByPagination(params: PaginationDTO): Promise<PostsModel> {
    const { page, pageSize = 10, title, tag } = params;
    const queryCondition = {
      title: { $regex: title ? title : '', $options: 'i' },
      isPublic: { $ne: false },
      // tags: tag,
    };

    const total = await this.getTotalPosts(title);
    const items = await this.postModel
      .find(queryCondition, { content: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    return {
      total,
      page: page * 1,
      pageSize: pageSize * 1,
      items,
    };
  }

  // 统计文章数量
  async getTotalPosts(title, isPublic = true): Promise<number> {
    let queryCondition = {
      title: { $regex: title ? title : '', $options: 'i' },
    };
    queryCondition = isPublic
      ? Object.assign({ isPublic: { $ne: false } }, queryCondition)
      : queryCondition;
    return this.postModel.countDocuments(queryCondition);
  }

  // 分页查找所有文章
  async findByPagination(params: PaginationDTO): Promise<PostsModel> {
    const { page, pageSize, title } = params;
    const total = await this.getTotalPosts(title, false);
    const items = await this.postModel
      .find(
        { title: { $regex: title ? title : '', $options: 'i' } },
        { content: 0, __v: 0 },
      )
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));
    return {
      total,
      page: page * 1,
      pageSize: pageSize * 1,
      items,
    };
  }

  // 根据ID查找文章
  async findPublicOneById(id: string): Promise<PostModel> {
    const itemPost = await this.postModel.findById(id);
    if (!itemPost || itemPost.isPublic === false) {
      throw new NotFoundException('没找到该文章');
    }
    return itemPost;
  }

  // 根据ID查找文章
  async findOneById(id: string, isPublic: boolean): Promise<PostModel> {
    // const queryCondition = publicPost ? { isPublic: { $ne: false } } :
    const itemPost = await this.postModel.findById(id, { _id: 0 });
    if (!itemPost || (isPublic && itemPost.isPublic === false)) {
      throw new NotFoundException('没找到该文章');
    }
    return itemPost;
  }

  // async findPublicById()

  // 根据ID更新文章
  async updateById(params: UpdatePostDTO): Promise<PostModel> {
    const { _id, ...rest } = params;
    return this.postModel.findByIdAndUpdate(_id, rest, { new: true });
  }

  // 找到所有标签
  async findTags(): Promise<TagsModel> {
    const tags = await this.postModel.find().exec();
    return { tags: [''] };
  }

  // 创建文章
  async createPost(post: CreatePostDTO): Promise<PostModel> {
    return await this.postModel.create(post);
  }

  // 更新文章访客量 +1
  async updatePV(id: string): Promise<PostModel> {
    const { pv } = await this.findOneById(id, false);
    return await this.postModel.findByIdAndUpdate(
      id,
      { pv: pv + 1 },
      { new: true },
    );
  }

  // 更新文章点赞 +1
  async updateLike(id: string): Promise<PostModel> {
    const { like } = await this.findOneById(id, false);
    return await this.postModel.findByIdAndUpdate(
      id,
      { like: like + 1 },
      { new: true },
    );
  }

  // 获取排行榜
  async getRankingList(limit: number): Promise<PostModel[]> {
    return await this.postModel
      .find({ isPublic: { $ne: false } })
      .sort({ like: -1 })
      .limit(limit);
  }

  // 动态ID删除
  async deleteOneById(id: string): Promise<PostModel> {
    return await this.postModel.findByIdAndDelete(id);
  }

  // 批量删除
  async batchDelete(ids: string): Promise<any> {
    return await this.postModel.deleteMany({});
  }
}
