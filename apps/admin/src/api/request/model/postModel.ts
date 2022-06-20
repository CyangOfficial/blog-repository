import { BasicPageParams, BasicFetchResult } from './baseModel';
/**
 * @description: Request list interface parameters
 */
export type DefaultParams = {
  title?: string;
} & BasicPageParams;

export type CreatePostDTO = {
  title: string;
  content: string;
  summary: string;
  posterUrl: string;
  tags: string[];
  lastModifiedDate: Date;
  isPublic: boolean;
};

export type UpdatePostDto = Partial<CreatePostDTO> & { _id: string };

export interface PostListItem {
  id: string;
  title: string;
  content?: string;
  summary: string;
  posterUrl: string;
  tags: string[];
  lastModifiedDate: Date;
  isPublic: boolean;
  pv: number;
  like: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePostParams = {
  title: string;
  content: string;
  summary: string;
  posterUrl: string;
  tags: Array<string>;
  lastModifiedDate: Date;
  isPublic: boolean;
};

/**
 * @description: Request list return value
 */
export type PostListResultModel = BasicFetchResult<PostListItem>;
export type PostItem = BasicFetchResult<PostListItem>;
// export type CreatePostResultModel = BasicFetchResult<CreatePostParams>;
