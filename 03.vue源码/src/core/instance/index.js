import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)  // 全局挂载了一个_init方法，所以上面可以使用
stateMixin(Vue) // 全局挂载$set,$delete,$watch
eventsMixin(Vue)  // 全局挂载$on,$once,$off,$emit
lifecycleMixin(Vue) // 全局挂载$forceUpdate,$destroy,_update
renderMixin(Vue)  // 全局挂载$nextTick, _render

export default Vue
