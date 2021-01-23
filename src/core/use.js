import Vue from 'vue'
//基础组件库
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'

//其他组件
import VueClipboard from 'vue-clipboard2'
import PageLoading from '@/components/PageLoading'
VueClipboard.config.autoSetContainer = true

Vue.use(Antd)
Vue.use(Viser)
Vue.use(PageLoading)
// Vue.use(MultiTab)
Vue.use(VueCropper)
process.env.NODE_ENV !== 'production' && console.warn('[lynnyuki] WARNING:  now use fulled imported.')