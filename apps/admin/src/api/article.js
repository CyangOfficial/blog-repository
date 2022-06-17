import http from '@/utils/request'

// 获取文章
export const getPosts = params => http.get('/api/post/getAll', params)
// 修改文章数据
export const toogleStatus = params => http.put('/api/post', params)
// 创建文章
export const createPost = params => http.post('/api/post', params)
// 上传图片
export const uploadImg = params => http.post('/api/uploader/upload', params)