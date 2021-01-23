import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import config from '@/config/localstorageConfig.js'
import VueStorage from 'vue-ls'

import bootstrap from './core/bootstrap'
import './core/lazy_use'


Vue.config.productionTip = false


Vue.use(VueStorage,config.storageOptions)

new Vue({
  router,
  store,
  created:bootstrap,
  render: h => h(App)
}).$mount('#app')
