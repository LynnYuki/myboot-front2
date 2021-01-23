import storage from 'store'
import {
    TOGGLE_MOBILE_TYPE,
    TOGGLE_MULTI_TAB,
    // i18n
    APP_LANGUAGE
  } from '@/store/mutation-types'

const app = {
    state: {
        multiTab: true,
        lang: 'zn-CH',
        isMobile: false,
        _antLocale: {}
    },
    mutations: {
        [TOGGLE_MULTI_TAB]: (state,bool) => {
            storage.set(TOGGLE_MULTI_TAB,bool)
            state.multiTab = bool;
        },
        [APP_LANGUAGE] : (state, lang, antd = {}) => {
            state.lang = lang
            state._antLocale = antd
            storage.set(APP_LANGUAGE,lang)
        },
        [TOGGLE_MOBILE_TYPE]: (state,isMobile) => {
            state.isMobile = isMobile
        }
    },
    // actions: {
    //     setLang ({ commit }, lang) {
    //       return new Promise((resolve, reject) => {
    //         commit(APP_LANGUAGE, lang)
    //         loadLanguageAsync(lang).then(() => {
    //           resolve()
    //         }).catch((e) => {
    //           reject(e)
    //         })
    //       })
    //     }
    //   }
}
  export default app
