/*
 * @Description: 路由配置
 * @Author: Li Guangyin
 * @Date: 2022-03-11 18:04:10
 * @LastEditTime: 2022-03-16 20:47:03
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', // 如果父路由有默认子路由,那么它的name便没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由,只能有一个
        name: 'Home',
        component: () => import('@/views/home')
      },
      {
        path: '/question',
        name: 'Question',
        component: () => import('@/views/question')
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    naem: 'Search',
    component: () => import('@/views/search/search.vue')
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: () => import('@/views/article/article.vue'),
    props: true // 开启props传参,说白了就是把路由参数映射到组件的props中
  }
]

const router = new VueRouter({
  routes
})

export default router
