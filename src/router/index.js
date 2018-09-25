import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
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
  }
]
Router.prototype.goBack = function() { // 重点，给VueRoute添加一个goBack方法，用于记录路由的前进后退状态 this.isBack = true
  this.isBack = true
  window.history.go(-1)
}
export default new Router({
  routes
})
