import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import config from '@/config/localstorageConfig'
import VueStorage from 'vue-ls'
import axios from 'axios'
import bootstrap from './core/bootstrap'
import './core/lazy_use'
import _ from 'lodash'

import api from './api/index'
Vue.prototype.$request = axios
Vue.prototype.$debounce = _.debounce// 全局挂载防抖
Vue.prototype.$throttle = _.throttle// 全局挂载节流
Vue.config.productionTip = false
Vue.use(api)// 全局挂载封装的api
Vue.use(VueStorage, config.storageOptions)// 封装的localstorage

new Vue({
  router,
  store,
  created: bootstrap, // 初始化localstorage vuex
  render: h => h(App)
}).$mount('#app')
