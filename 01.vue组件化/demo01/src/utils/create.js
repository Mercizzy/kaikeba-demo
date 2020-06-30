import Vue from 'vue';

export default function create(Component, props) {
  const vm = new Vue({
    render: h=> h(Component, { props })
  }).$mount()

  // 手动挂载
  document.body.appendChild(vm.$el);

  // 销毁方法
  const comp = vm.$children[0];
  comp.remove = ()=> {
    document.body.removeChild(vm.$el)
    vm.$destroy();
  }

  return comp;
}