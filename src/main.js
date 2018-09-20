import Vue from 'vue'
import FastClick from 'fastclick'
import 'normalize.css'
import App from './App.vue'
import './assets/responsive'
import './assets/style/global.styl'
import router  from '@/router';
// import 'weui/dist/style/weui.min.css'
if ('ontouchstart' in window) {
  FastClick.attach(document.body)
}

Vue.config.productionTip = false
// hack for active mobile
document.addEventListener("touchstart", function(){}, true)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
