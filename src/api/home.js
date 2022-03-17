/*
 * @Description: 首页数据
 * @Author: Li Guangyin
 * @Date: 2022-03-12 21:44:29
 * @LastEditTime: 2022-03-16 21:35:32
 */
import request from '@/utils/request'

/**
 *
 * @returns 获取频道信息
 */
export function channel() {
  return request({
    url: '/mobile/channel',
    method: 'get'

  })
}
/**
 *获取文章列表数据
 */
export function channelList(params) {
  return request({
    url: '/mobile/channellist',
    method: 'get',
    params
  })
}
/**
 * 获取所有频道列表
 */
export function allChannelList() {
  return request({
    url: '/mobile/allChannel',
    method: 'get'
  })
}
/**
 * 获取文章详情
 */
export function articleDetail(id) {
  return request({
    url: '/mobile/article-detail',
    method: 'get',
    params: {
      id
    }
  })
}