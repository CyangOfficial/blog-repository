import { defHttp } from '/@/utils/http/axios';
import { UploadModel } from './model/uploadModel';

enum Api {
  POST_LIST = '/post/getPosts',
  UPLOAD = '/upload',
}

export const uploadApi = (data: FormData) => defHttp.post<UploadModel>({ url: Api.UPLOAD, data });
