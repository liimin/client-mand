import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// const _import = require('./_import_' + process.env.NODE_ENV)
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 这个样式必须引入
// import { Toast } from 'mand-mobile'
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: true })
Vue.use(Router)
// const Foo = resolve => {
//   Toast.open()
//   require.ensure(['./Foo.vue'], () => {
//     resolve(require('./Foo.vue'))
//     Toast.close()
//   })
// }
const routes = [
  {
    path: '/',
    redirect: '/temples/list'
  },
  {
    path: '/temples/list',
    name: 'TempleList',
    component: resolve => require(['@/views/temples/List'], resolve)
  },
  {
    path: '/temple',
    redirect: '/temple/index'
  },
  {
    path: '/temple/index',
    name: 'Temple',
    component: resolve => require(['@/views/temple/index'], resolve)
  },
  {
    path: '/temple/detail',
    name: 'TempleDetail',
    component: resolve => require(['@/views/temple/Detail'], resolve)
  },
  {
    path: '/temple/order',
    name: 'Order',
    component: resolve => require(['@/views/temple/Order'], resolve)
  },
  {
    path: '/temple/payment',
    name: 'Payment',
    component: resolve => require(['@/views/temple/Payment'], resolve)
  },
  {
    path: '/temple/certificate',
    name: 'Certificate',
    component: resolve => require(['@/views/temple/Certificate'], resolve)
  }
]
Router.prototype.goBack = function() { // 重点，给VueRoute添加一个goBack方法，用于记录路由的前进后退状态 this.isBack = true
  this.isBack = true
  window.history.go(-1)
}
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  // Toast.loading('载入中')
  next()
})
router.afterEach((to, from) => {
  // Toast.hide()
  NProgress.done()
})
export default router
