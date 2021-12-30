import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem} from '@/utils/storage'

Vue.use(Vuex)

// 定义用户token
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 存储当前登录用户信息（token等数据）
    // user: null
    // user: JSON.parse( window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止刷新网页数据丢失,需要把数据备份到本地存储
      // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
