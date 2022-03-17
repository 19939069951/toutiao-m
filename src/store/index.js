/*
 * @Description: Vuex数据仓库
 * @Author: Li Guangyin
 * @Date: 2022-03-11 18:04:10
 * @LastEditTime: 2022-03-12 18:19:47
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {
  getItem,
  setItem
} from '@/utils/stroage'

Vue.use(Vuex)
const TOKEN = 'token'
export default new Vuex.Store({
  state: {
    // 存储当前登录用户信息
    // user: JSON.parse(window.localStorage.getItem(USER_INFO))
    user: getItem(TOKEN)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止刷新丢失,需要将数据备份到本地存储
      setItem(TOKEN, state.user)
      // window.localStorage.setItem(USER_INFO, JSON.stringify(data))
    }
  },
  actions: {},
  modules: {}
})
