import { defHttp } from '/@/utils/http/axios';
import {
  DefaultParams,
  PostListResultModel,
  CreatePostDTO,
  UpdatePostDto,
  PostItem,
} from './model/postModel';

enum Api {
  POST_LIST = '/post/getPosts',
  POST_CREATE = '/post',
  POST_UPDATE = '/post',
  POST_ITEM = '/post',
  POST_DELETE = '/post',
}

/**
 * @description: Get sample list value
 */

export const postListApi = (params: DefaultParams) =>
  defHttp.get<PostListResultModel>({
    url: Api.POST_LIST,
    params,
  });

export const createPostApi = (params: CreatePostDTO) =>
  defHttp.post<PostListResultModel>({
    url: Api.POST_CREATE,
    params,
  });

export const updatePostApi = (params: UpdatePostDto) =>
  defHttp.put<PostListResultModel>({
    url: Api.POST_UPDATE,
    params,
  });

export const postItemApi = (url: string) =>
  defHttp.get<PostItem>(
    {
      url: url,
    },
    {
      // 是否添加时间戮
      joinTime: false,
    },
  );

export const deletePostApi = (id: string) =>
  defHttp.delete(
    {
      url: Api.POST_DELETE + `/${id}`,
    },
    {
      // 是否添加时间戮
      joinTime: false,
    },
  );
