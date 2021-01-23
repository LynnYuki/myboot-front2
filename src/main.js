import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import config from '@/config/localstorageConfig.js'
import VueStorage from 'vue-ls'


Vue.config.productionTip = false


Vue.use(VueStorage,config.storageOptions)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
