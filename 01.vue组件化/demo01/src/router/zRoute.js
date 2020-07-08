let Vue;

export default class ZRouter {
  constructor(options) {
    this.$options = options;
    
    // 创建一个路由path和route映射
    this.routeMap = {}

    // 将来当前路径current需要响应式
    // 利用Vue响应式原理可以做到这一点
    this.app = new Vue({
      data: {
        current: '/'
      }
    })

  }

  init() {
    // 绑定浏览器事件
    this.bindEvents()

    // 解析路由配置
    this.createRouteMap(this.$options)

    // 创建<route-link></route-link> 和 <route-view></route-view>
    this.initComponent()
  }

  bindEvents() {
    window.addEventListener('hashchange', ()=> { this.handleHashChange() })
    window.addEventListener('load', ()=> { this.handleHashChange() })
  }

  handleHashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
  }

  createRouteMap(options) {
    options.routes.forEach(item=> {
      this.routeMap[item.path] = item
    })
  }

  initComponent() {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h){
        return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
      } 
    })

    Vue.component('router-view', {
      render: h=> {
        const Comp = this.routeMap[this.app.current].component
        return h(Comp)
      }
    })
  }
}

// 将ZRouter变成插件
ZRouter.install = function(_Vue) {
  Vue = _Vue;

  // 混入任务
  Vue.mixin({
    beforeCreate() {
      if(this.$options.router) {  // 只有根节点才有router，所以只会在根节点执行以下代码
        Vue.prototype.$router = this.$options.router;

        // 初始化
        this.$options.router.init()
      }
    }
  })
}