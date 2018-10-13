import axios from 'axios'
import { Toast } from 'mand-mobile'
// import qs from 'qs'
export const Axios = axios.create({
  baseURL: 'http://weeechat.free.idcfengye.com/api/v1/',
  timeout: 10000
})
// POST传参序列化(添加请求拦截器)
// 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
  // 设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
  // if (config.method === 'post') {
  //   // JSON 转换为 FormData
  //   const formData = new FormData()
  //   Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
  //   config.data = formData
  // }
  if (config.method === 'get') {
    Toast.loading('载入中')
  }
  // 下面会说在什么时候存储 token
  if (localStorage.token) {
    config.headers.Authorization = 'JWT ' + localStorage.token
  }
  config.timeout = 20 * 1000
  return config
}, error => {
  Toast.failed('错误的传参')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {
  Toast.hide()
  const { code, msg } = res.data
  // 对响应数据做些事
  if (code !== 200) {
    Toast.failed(msg)
    return Promise.reject(res)
  }
  return res.data
}, error => {
  var originalRequest = error.config
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
    // originalRequest.timeout = 20 * 1000
    Toast.failed('请求超时')
    return
    // originalRequest._retry = true
    // return axios.request(originalRequest)
  }

  if (error.code === 401) {
    // 401 说明 token 验证失败
    // 可以直接跳转到登录页面，重新登录获取 token
    //   location.href = '/login'
    // Toast.failed(msg)
  } else if (error.code === 500) {
    // 服务器错误
    // do something
    return Promise.reject(error.msg)
  }
  // 返回 response 里的错误信息
  return Promise.reject(error.msg)
})

// Axios.defaults.retry = 4
// Axios.defaults.retryDelay = 1000

// Axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
//   var config = err.config
//   // If config does not exist or the retry option is not set, reject
//   if (!config || !config.retry) return Promise.reject(err)

//   // Set the variable for keeping track of the retry count
//   config.__retryCount = config.__retryCount || 0

//   // Check if we've maxed out the total number of retries
//   if (config.__retryCount >= config.retry) {
//     // Reject with the error
//     return Promise.reject(err)
//   }

//   // Increase the retry count
//   config.__retryCount += 1

//   // Create new promise to handle exponential backoff
//   var backoff = new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve()
//     }, config.retryDelay || 1)
//   })

//   // Return the promise in which recalls axios to retry the request
//   return backoff.then(function() {
//     return axios(config)
//   })
// })

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}
