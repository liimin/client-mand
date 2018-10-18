import Vue from 'vue'
import FastClick from 'fastclick'
import 'normalize.css/normalize.css'
import App from './App.vue'
import './assets/responsive'
import './assets/global.css'
import router from '@/router'
import 'weui'
import AxiosPlugin from './axios'
Vue.use(AxiosPlugin)
if ('ontouchstart' in window) {
  FastClick.attach(document.body)
}
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
