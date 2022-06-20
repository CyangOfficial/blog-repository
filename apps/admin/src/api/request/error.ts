import { defHttp } from '/@/utils/http/axios';
import { PostListResultModel } from './model/postModel';

enum Api {
  POST_LIST = '/post/getPosts',
  POST_CREATE = '/post',
  POST_UPDATE = '/post',
  ERROR_LOG = '/error',
}

export const fireErrorApi = () =>
  defHttp.put<PostListResultModel>({
    url: Api.ERROR_LOG,
  });
