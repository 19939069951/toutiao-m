/*
 * @Description: 封装请求模块
 * @Author: Li Guangyin
 * @Date: 2022-03-11 22:01:34
 * @LastEditTime: 2022-03-16 22:22:51
 */
import axios from 'axios'
import store from '@/store'
// JSONBig 可以处理数据中心超出JavaScript安全整数范围的问题
import JSONBig from 'json-bigint'
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn' // 接口的基准路径
  baseURL: 'https://www.fastmock.site/mock/595655a88a215fe20edca6c2ab671c03',
  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据,说白了就是JSON格式的字符串
  transformResponse: [function(data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 任何请求都会经过这里
  const {
    user
  } = store.state
  if (user && user.token) {
    config.headers.token = `Bearer ${user.token}`
  }
  // 这里必须返回config,否则请求就停在这里出不去了
  return config
}, error => {
  // 如果请求出错了,(请求还没有发出去)会进入这里
  return Promise.error(error)
})
// 响应拦截器

export default request
