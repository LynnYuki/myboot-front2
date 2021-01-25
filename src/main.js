import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import config from '@/config/localstorageConfig.js'
import VueStorage from 'vue-ls'
import axios from 'axios'
import bootstrap from './core/bootstrap'
import './core/lazy_use'

import api from './api/index'
Vue.prototype.$request = axios
Vue.config.productionTip = false
Vue.use(api)
Vue.use(VueStorage, config.storageOptions)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
