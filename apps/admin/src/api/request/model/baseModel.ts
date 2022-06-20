export interface BasicPageParams {
  page: number;
  pageSize: number;
}

type ResultBasicParams<T> = {
  total?: number;
  page?: number;
  pageSize?: number;
  items: T;
};

export interface BasicFetchResult<T> {
  code: number;
  message: string;
  result: ResultBasicParams<T>;
}
