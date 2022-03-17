/*
 * @Description: 搜索模块的数据
 * @Author: Li Guangyin
 * @Date: 2022-03-14 19:15:07
 * @LastEditTime: 2022-03-14 20:25:04
 */
import request from '@/utils/request'
// 获取建议数据
export function suggestionList(q) {
  return request({
    url: '/mobile/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export function searchResult(params) {
  return request({
    url: '/mobile/searchresult',
    params
  })
}