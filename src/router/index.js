import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Login from '@/views/login'
import Register from '@/views/register'
import Cart from '@/views/cart'
import Pay from '@/views/pay'
import Detail from '@/views/detail'
import Myorder from '@/views/myorder'
import Manage from '@/views/manage'
import Add from '@/views/add'
import Book from '@/views/book'
import Edit from '@/views/edit'

import Award from '@/views/award'
import Album from '@/views/album'
import Playlist from '@/views/playlist'
import First from '@/views/1st'
import Second from '@/views/2nd'
import Third from '@/views/3rd'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // 使用history模式
  // mode: 'hash',
  routes: [
    { path: '/', component: Layout, meta: { title: '首页 - 路易斯商城' } },
    { path: '/login', component: Login, meta: { title: '登录 - 路易斯商城' } },
    { path: '/register', component: Register, meta: { title: '注册 - 路易斯商城' } },
    { path: '/cart', component: Cart, meta: { title: '购物车 - 路易斯商城' } },
    { path: '/pay', component: Pay, meta: { title: '支付 - 路易斯商城' } },
    { path: '/myorder', component: Myorder, meta: { title: '我的订单 - 路易斯商城' } },
    { path: '/detail/:id', component: Detail, meta: { title: '商品详情 - 路易斯商城' } },

    { path: '/manage', component: Manage, meta: { title: '管理 - 路易斯商城' } },
    { path: '/add', component: Add, meta: { title: '添加商品 - 路易斯商城' } },
    { path: '/edit/:id', component: Edit, meta: { title: '编辑商品 - 路易斯商城' } },
    { path: '/book', component: Book, meta: { title: '订单管理 - 路易斯商城' } },

    { path: '/award', component: Award, meta: { title: '第四届路易斯兄弟音乐奖' } },
    { path: '/album/:id', component: Album, meta: { title: '年度专辑 - 第四届路易斯兄弟音乐奖' } },
    { path: '/playlist', component: Playlist, meta: { title: '年度歌单 - 第四届路易斯兄弟音乐奖' } },
    { path: '/1st', component: First, meta: { title: '第一届路易斯兄弟音乐奖' } },
    { path: '/2nd', component: Second, meta: { title: '第二届路易斯兄弟音乐奖' } },
    { path: '/3rd', component: Third, meta: { title: '第三届路易斯兄弟音乐奖' } }
  ]
})

// 定义所有需要权限访问的页面
const authUrls = ['/pay', '/cart', '/manage', '/book', '/add', '/edit']
// 全局前置导航守卫 在访问页面前执行
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '路易斯商城'
  const token = store.getters.token
  if (token) {
    next() // 已登录，允许访问所有路由
  } else {
    if (authUrls.includes(to.path)) {
      next('/login') // 未登录，且访问的是需要权限的路由，重定向到登录页面
    } else {
      next() // 未登录，但访问的路由不需要权限，允许访问
    }
  }
})

export default router
