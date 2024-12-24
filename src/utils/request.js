import axios from 'axios'
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://8.134.114.241:81/post/',
  timeout: 10000
  // headers: {
  //   'Content-Type': 'multipart/form-data'
  // }
  // headers: { 'X-Custom-Header': 'foobar' }
})

// 自定义配置 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    // 抛出错误信息
    // console.log(res.message)
    // return Promise.reject(res.Promise)
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出
export default instance
