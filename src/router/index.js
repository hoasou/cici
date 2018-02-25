import Vue from 'vue'
import Router from 'vue-router'

const framePage = r => require.ensure([], () => r(require('../views/framePage/index')), 'framePage')
const routerView = r => require.ensure([], () => r(require('../components/router/routerView')), 'routerView')

const works = r => require.ensure([], () => r(require('../views/works/index')), 'works')

const shopHome = r => require.ensure([], () => r(require('../views/shop/home')), 'shopHome')
const search = r => require.ensure([], () => r(require('../views/shop/children/search')), 'search')
const service = r => require.ensure([], () => r(require('../views/shop/children/service')), 'service')
const serviceDetail = r => require.ensure([], () => r(require('../views/shop/children/serviceDetail')), 'serviceDetail')
const goods = r => require.ensure([], () => r(require('../views/shop/children/goods')), 'goods')
const payment = r => require.ensure([], () => r(require('../views/shop/children/payment')), 'payment')

const memberHome = r => require.ensure([], () => r(require('../views/member/home')), 'memberHome')
const setup = r => require.ensure([], () => r(require('../views/member/children/setup')), 'setup')
const order = r => require.ensure([], () => r(require('../views/member/children/order')), 'order')
const userinfo = r => require.ensure([], () => r(require('../views/member/children/userinfo')), 'userinfo')
const login = r => require.ensure([], () => r(require('../views/member/children/login')), 'login')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/works',
      component: works
    }, {
      path: '/shop',
      component: routerView,
      children: [  // 二级路由
        {
          path: 'home',
          component: shopHome
        }, {
          path: 'search',
          component: search
        }, {
          path: 'service',
          component: service
        }, {
          path: 'serviceDetail',
          component: serviceDetail
        }, {
          path: 'goods',
          component: goods
        }, {
          path: 'payment',
          component: payment
        }
      ]
    }, {
      path: '/member',
      component: routerView,
      children: [  // 二级路由
        {
          path: 'home',
          component: memberHome
        }, {
          path: 'setup',
          component: setup
        }, {
          path: 'order',
          component: order
        }, {
          path: 'userinfo',
          component: userinfo
        }, {
          path: 'login',
          component: login
        }
      ]
    }, {
      path: '/framePage',
      component: framePage
    },
    {
      path: '*',
      redirect: '/shop/home'
    }
  ]
})
