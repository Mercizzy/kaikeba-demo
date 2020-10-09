class Compile {
  constructor(vm, el) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    this.$fragment = this.node2Fragment(this.$el)
    this.compile(this.$fragment)

    this.$el.appendChild(this.$fragment)
  }

  node2Fragment(el) {
    const fragment = document.createDocumentFragment()
    let child
    while(child = el.firstChild) {
      fragment.appendChild(child)
    }

    return fragment
  }

  compile(fragment) {
    const childNodes = fragment.childNodes
    Array.from(childNodes).forEach(node=> {
      if(node.nodeType == 1) {
        // 元素
        // console.log(`编译元素${node.nodeName}`);
        this.compileElement(node)
        
      }else if(this.isInterpolation(node)) {
        // 插值表达式
        // console.log(`编译插值文本${node.textContent}`);
        this.compileText(node)
      }

      // 递归子节点
      if(node.children && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }
  // 判断是否为插值表达式
  isInterpolation(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  compileText(node) {
    // console.log(this);
    
    const key = RegExp.$1.replace(/\s/g, "")
    this.update(node, key, 'text')
  }

  compileElement(node) {
    const attrs = node.attributes
    Array.from(attrs).forEach(attr=> {
      const attrName = attr.name
      const exp = attr.value
      if(attrName.indexOf('z-') == 0) {
        const dir = attrName.substring(2)
        this.update(node, exp, dir)
      }
      if(attrName.indexOf('@') == 0) {
        const dir = attrName.substring(1)
        this.bindMethod(this, node, dir, exp)
      }
    })
  }

  update(node, key, dir) {
    const updator = this[dir+'Updator']
    updator && updator(this, node, this.$vm[key], key)
    new Watcher(this.$vm, key, (value)=> {
      updator && updator(this, node, value, key)
    })
  }

  textUpdator(_this, node, value) {
    node.textContent = value
  }

  htmlUpdator(_this, node, value) {
    node.innerHTML = value
  }

  modelUpdator(_this, node, value, key) {
    // console.log(this);
    
    if(node.nodeName != "INPUT") throw Error('请在input组件上使用z-model指令')
    // for(let key in node) {
    //   if(node[key]) {
    //     console.log(`key: ${key}, value: ${node[key]}`);
        
    //   }
    // }
    node.value = value
    node.addEventListener('input', (e)=> {
      _this.$vm[key] = e.target.value
    })
  }

  bindMethod(_this, node, dir, exp) {
    const m = _this.$vm.$props.methods ? _this.$vm.$props.methods[exp] : null
    if(!m) throw Error(`${dir}方法不存在`)

    node.addEventListener(dir, ()=> {
      m.call(_this.$vm)
    })
  }
}