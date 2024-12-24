import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // userInfo: {
      //   token: '',
      //   userAccount:'',
      //   userName:'',
      //   userId: ''
      // }
      userInfo: getInfo(),
      cartNum: 0
    }
  },
  mutations: {
    // vuex持久化
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    },
    setCartNum (state, num) {
      state.cartNum = num
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('setCartNum', 0)
    }
  },
  getters: {

  }
}
