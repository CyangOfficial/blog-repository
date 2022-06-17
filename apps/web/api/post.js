import request from './request'
export function getPosts(params) {
  return request({
    url: '/post',
    method: 'get',
    params: { _t: new Date().getTime(), ...params }
  })
}

export function getItemPost({ _id }) {
  return request({
    url: `/post/${_id}`,
    method: 'get'
  })
}