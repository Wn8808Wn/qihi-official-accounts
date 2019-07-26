// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入vuex 
import store from './store/index'

//下载准考证插件
import htmlToPdf from "./utils/htmlToPdf";
Vue.use(htmlToPdf);

// 引入public.js
import {format,formatDate} from './utils/public'
Vue.prototype.format = format;
Vue.prototype.formatDate = formatDate;
//引入iconfont文件
import '../src/assets/icon/iconfont.css'

//fastclick插件：解决移动端click 300ms延迟
import fastclick from 'fastclick'
fastclick.attach(document.body)

// 引入axios 挂载
import axios from 'axios'
Vue.prototype.$axios = axios;
// import axios from './config/axios'
// Vue.prototype.$axios = axios

//引入重置样式
import '../static/style/reset.css'

// main.js文件// 全局路由守卫，动态改变tille
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title || '默认'
  next()
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
