import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest'
import {isAuth} from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import X2js from 'x2js'

Vue.prototype.$x2js = new X2js()
Vue.use(VueCookie)
Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

Vue.prototype.$http = httpRequest
Vue.prototype.isAuth = isAuth

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
