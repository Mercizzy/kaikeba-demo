export default {
  namespaced: true,
  state: {
    count: 0
  },
  getters: {
    showCount(state) {
      return `当前count值为：${ state.count }`
    }
  },
  mutations: {
    add(state, num=1) {
      state.count += num
    },
  },
  actions: {
    asyncAdd(_this) {
      setTimeout(()=> {
        _this.commit('add')
      }, 1000)
    }
  },
  modules: {
  }
}