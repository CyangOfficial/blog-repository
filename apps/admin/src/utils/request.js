import axios from 'axios'
import router from '@/router'
// import { ElMessage } from 'element-plus'
import {
  getToken
} from '@/utils/cookie'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 8000,
})
// service.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded'

service.interceptors.request.use(config => {
  const ACCESS_TOKEN = getToken('access-token') || ''
  config.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

const errorHandle = (statusCode, msg) => {
  switch (statusCode) {
    // 账号或密码错误
    case 400:
      // ElMessage.error(msg)
      break;
    // 未授权
    case 401:
      toLogin()
      break;
    // token过期
    case 403:
    default:
      // ElMessage.error(msg)

  }
}
service.interceptors.response.use(response => {
  return response
}, error => {
  const {
    response
  } = error
  if (response) {
    console.log(response.data.statusCode)
    errorHandle(response.data.statusCode, response.data.message)
  }
  return Promise.reject(error)
})

export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      service({
        url,
        method: 'get',
        params
      })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, data ) {
    return new Promise((resolve, reject) => {
      service({
        url,
        method: 'post',
        data
      })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  put(url, data) {
    return new Promise((resolve, reject) => {
      service({
        url,
        method: 'put',
        data
      })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  delete(url, params) {
    return new Promise((resolve, reject) => {
      service({
        url,
        method: 'delete',
        data: params
      })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
