import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
// 加载vant组件和样式
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载动态设置rem基准值
import 'amfe-flexible'
// 加载时间处理函数
import './utils/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
