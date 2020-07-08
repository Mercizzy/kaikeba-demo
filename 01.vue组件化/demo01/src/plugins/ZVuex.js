let Vue;

class ZStore {
  constructor(options) {
    this.state = new Vue({
      data: options.state
    })
    this.mutations = options.mutations
    this.actions = options.actions
    this.getters = {}
    options.getters && this.handleGetters(options.getters)
  }

  commit(type, ...arg){
    this.mutations[type](this.state, ...arg)
  }

  dispatch(type, ...arg){
    const fn = this.actions[type]
    fn(this, ...arg)
  }

  handleGetters(getters) {
    Object.keys(getters).forEach(key=> {
      Object.defineProperty(this.getters, key, {
        get: ()=> { // 定义成只读
          return getters[key](this.state)
        }
      })
    })
  }
}

function install(_Vue) {
  Vue = _Vue;

  // 混入，把store选项指定到Vue原型上
  Vue.mixin({
    beforeCreate() {
      if(this.$options.ZStore) {
        Vue.prototype.$ZStore = this.$options.ZStore

        // this.$options.ZStore.init()
      }
    }
  })
}

export default { ZStore, install }