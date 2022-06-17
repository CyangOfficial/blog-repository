/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
import axios from 'axios' //引用axios

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/api',
  // baseURL: 'http://localhost:3000/api', // 所有异步请求都加上/api,nginx转发到后端Springboot
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['-Token'] = getToken()
    console.log('request')
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code ==0 || data.code == 200) {
      return data
   }
    // const res = response.data //res is my own data
    // console.log(response)
    // return res
  },
  err => {
    const statusCode = err.response.data.statusCode
    switch(statusCode) {
      case 404:
        break;
      default:
        break;
    }
    return Promise.reject(err)
  }
)

export default service //导出封装后的axios