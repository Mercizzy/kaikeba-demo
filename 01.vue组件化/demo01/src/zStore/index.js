import Vue from 'vue'
import ZVuex from '../plugins/ZVuex'

Vue.use(ZVuex)

export default new ZVuex.ZStore({
  state: {
    count: 0
  },
  mutations: {
    add(state, num=1) {
      state.count += num
    },
  },
  actions: {
    asyncAdd(_this, num) {
      setTimeout(()=> {
        _this.commit('add', num)
      }, 1000)
    }
  },
  getters: {
    showCount(state) {
      return `当前Zcount值为：${ state.count }`
    }
  },
})
