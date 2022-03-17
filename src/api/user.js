/*
 * @Description: 用户请求模块
 * @Author: Li Guangyin
 * @Date: 2022-03-11 23:39:58
 * @LastEditTime: 2022-03-12 19:00:13
 */
import request from '@/utils/request'

/**
 *
 * @param {data} 登录接口
 * @returns
 */
export function login(data) {
  return request({
    url: '/mobile/login',
    method: 'post',
    data
  })
}
/**
 *
 * @param {mobiel} 获取验证码
 * @returns
 */
export function codes(mobile) {
  return request({
    url: `/mobile/codes/:${mobile}`,
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/mobile/userinfo',
    method: 'get'
    // 该接口需要授权才能访问
    // headers: {
    //   token: `bearer ${store.state.user.token}`
    // }
  })
}
