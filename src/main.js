import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/icons'
import '@/styles/index.scss'
import 'normalize.css/normalize.css'

import App from './App'
import mixin from './mixin'
import store from './store'
import router from './router'

Vue.mixin(mixin)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})