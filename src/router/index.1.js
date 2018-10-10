import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// const _import = require('./_import_' + process.env.NODE_ENV)
import { Toast } from 'mand-mobile'
Vue.use(Router)
const TempleList = resolve => {
  Toast.loading('载入中')
  require.ensure(['@/views/temples/List'], () => {
    resolve(require('@/views/temples/List'))
    Toast.close()
  })
}
const Temple = resolve => {
  Toast.loading('载入中')
  require.ensure(['@/views/temple/index'], () => {
    resolve(require('@/views/temple/index'))
    Toast.close()
  })
}
const TempleDetail = resolve => {
  Toast.loading('载入中')
  require.ensure(['@/views/temple/Detail'], () => {
    resolve(require('@/views/temple/Detail'))
    Toast.close()
  })
}
const Order = resolve => {
  Toast.loading('载入中')
  require.ensure(['@/views/temple/Order'], () => {
    resolve(require('@/views/temple/Order'))
    Toast.close()
  })
}
const Payment = resolve => {
  Toast.loading('载入中')
  require.ensure(['@/views/temple/Payment'], () => {
    resolve(require('@/views/temple/Payment'))
    Toast.close()
  })
}
const Certificate = resolve => {
  Toast.loading('载入中')
  require.ensure(['@/views/temple/Certificate'], () => {
    resolve(require('@/views/temple/Certificate'))
    Toast.close()
  })
}
const routes = [
  {
    path: '/',
    redirect: '/temples/list'
  },
  {
    path: '/temples/list',
    name: 'TempleList',
    component: TempleList
  },
  {
    path: '/temple',
    redirect: '/temple/index'
  },
  {
    path: '/temple/index',
    name: 'Temple',
    component: Temple
  },
  {
    path: '/temple/detail',
    name: 'TempleDetail',
    component: TempleDetail
  },
  {
    path: '/temple/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/temple/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/temple/certificate',
    name: 'Certificate',
    component: Certificate
  }
]
Router.prototype.goBack = function() { // 重点，给VueRoute添加一个goBack方法，用于记录路由的前进后退状态 this.isBack = true
  this.isBack = true
  window.history.go(-1)
}
// Router.beforeEach((to, from, next) => {
//   Toast.loading('载入中')
//   next()
// })
// Router.afterEach((to, from) => {
//   Toast.hide()
// })
export default new Router({
  routes
})
