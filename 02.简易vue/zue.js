class Zue {
  constructor(props) {
    this.$props = props

    this.$data = this.$props.data
    // 响应化处理
    this.observe(this.$data)

    // new Watcher(this, 'foo')
    // this.foo
    // new Watcher(this, 'foo')
    // this.foo
    // new Watcher(this, 'bar')
    // this.bar
    new Compile(this, props.el)
    props.created && props.created.call(this)

    // 将方法挂载到this上
    this.proxyMethods()
  }

  observe(data) {
    if(!data || (typeof data !== 'object' && typeof data !== 'function')) return

    // 遍历添加监听
    Object.keys(data).forEach(key=> {
      this.defineReactive(data, key, data[key])

      // 将参数挂载到this上
      this.proxyData(key)
    })
  }

  defineReactive(obj, key, value) {
    this.observe(value)

    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target)
        // dep.showDep()
        return value
      },
      set(newValue) {
        if(newValue !== value) {
          value = newValue
          console.log(`${key}发生了改变，变成了${newValue}`);
          dep.notify()
        }
      }
    })
  }

  proxyMethods() {
    for(let key in this.$props.methods) {
      this[key] = this.$props.methods[key]
    }
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newValue) {
        this.$data[key] = newValue
      }
    })
  }
}

// 创建Dep，管理所有的Watcher
class Dep {
  constructor() {
    this.deps = []
  }
  
  addDep(dep) {
    this.deps.push(dep)
  }

  showDep() {
    console.log(this.deps);
  }

  notify() {
    console.log(this.deps);
    
    this.deps.forEach(dep=> dep.update())
  }
}

// 创建Watcher：保存打他中数值和页面中的挂钩关系
class Watcher {
  constructor(vm, key, cb) {
    this.vm= vm
    this.key = key
    this.cb = cb

    // 创建实例时，立即将该实例指向Dep.target，便于依赖收集
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
    
  }

  update() {
    // console.log(this.key + '更新了');
    this.cb(this.vm[this.key])
  }
}