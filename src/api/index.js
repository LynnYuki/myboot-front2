// 将所有接口挂载到vue原型链上

import apis from './interface'

const install = Vue => {
  if (install.installed) {
    return
  }

  install.installed = true

  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return apis
      }
    }
  })
}
export default install
