import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import getters from './getters'
// import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app
  },
  getters,
  plugins:[
    createPersistedState({
      storage:window.localStorage,
      paths:['app','user']
    })
  ]
})
