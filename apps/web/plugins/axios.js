const request = {
  fetchPosts(params) {
    return axios.get('/post', { params })
  }
}
let axios = null
export default function ({ app, $axios, redirect }, inject) {

  axios = $axios

  $axios.defaults.timeout = 10000

  // 请求拦截器
  $axios.onRequest(config => {
    console.log('请求url: ' + config.url)
    
  })

  // 响应拦截器
  $axios.onResponse((resp) => {
    return Promise.resolve(resp.data);
  });

  $axios.onError(error => {
    console.log('error:', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

  inject('request', request)
}