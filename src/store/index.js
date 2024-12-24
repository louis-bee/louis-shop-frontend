import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: 'all'
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    },
    userAccount (state) {
      return state.user.userInfo.userAccount
    },
    userId (state) {
      return state.user.userInfo.userId
    },
    type (state) {
      return state.type
    },
    cartNum (state) {
      return state.user.cartNum
    }
  },
  mutations: {
    setType (state, payload) {
      state.type = payload // 设置数据
    }
  },
  actions: {
  },
  modules: {
    user
  }
})
