import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import create from './utils/create'
import ZStore from './zStore'

Vue.config.productionTip = false

Vue.prototype.$create = create


new Vue({
  router,
  store,
  ZStore,
  render: h => h(App)
}).$mount('#app')
