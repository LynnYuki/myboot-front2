import store from '@/store'
import storage from 'store'
import {
  ACCESS_TOKEN,
  // APP_LANGUAGE,
  TOGGLE_MULTI_TAB
} from '@/store/mutation-types'
import defaultSettings from '@/config/defaultSettings'
export default function Initializer() {
  store.commit('SET_TOKEN', storage.get(ACCESS_TOKEN))
  store.commit(TOGGLE_MULTI_TAB, storage.get(TOGGLE_MULTI_TAB, defaultSettings.multiTab))
  // store.dispatch('setLang',storage.get(APP_LANGUAGE,'zh-CH'))
}
