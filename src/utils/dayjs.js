/*
 * @Description: 封装时间处理函数
 * @Author: Li Guangyin
 * @Date: 2022-03-13 19:13:32
 * @LastEditTime: 2022-03-13 19:29:51
 */
import dayjs from 'dayjs'
import Vue from 'vue'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// dayjs默认语言是英文,我们这里配置为中文
dayjs.locale('zh-cn') // 全局使用

// 定义一个全局过滤器,然后就可以在任何组件的模板中使用了
// 其实过滤器就相当于一个全局可用的方法(仅供模板使用)
// 参数1: 过滤器名称  参数2:过滤器函数
// 使用方式:{{表达式| 过滤器名称}}

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

// dayjs()获取当前最新时间
dayjs().format('YYYY-MM-DD')

// 获取多少年内
dayjs().from(dayjs('1990'))
// 获取多少年前
dayjs().to(dayjs('1990'))
