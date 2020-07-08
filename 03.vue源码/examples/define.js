let obj = {
  a: "11"
}

Object.defineProperty(obj, 'a', {
  get() {
    console.log('获取obj[a]的值');
    return obj['a']
  },
  set(newValue) {
    console.log('修改obj[a]的值');
    obj['a'] = newValue
  }
})