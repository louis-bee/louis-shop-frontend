import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import '@/styles/base.less'
import '@/styles/common.less'

// import ... from '...'
// Vue.use(...)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
