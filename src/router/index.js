import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Temple',
    redirect: '/temple/list'
  },
  {
    path: '/temple/list',
    name: 'TempleList',
    component: resolve => require(['@/views/temple/List'],resolve)
  }
]
export default new Router({
  routes
})
