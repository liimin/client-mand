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
Vue.prototype.$get_storage = (name) => {
  return sessionStorage.getItem(name)
}
Vue.prototype.$set_storage = (name, value) => {
  return sessionStorage.setItem(name, value)
}
if ('ontouchstart' in window) {
  FastClick.attach(document.body)
}
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
