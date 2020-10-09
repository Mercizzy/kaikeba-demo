/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':  // push和unshift一样都是向数组添加参数，所以push没有写break
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)  // splice(index, num, item1, item2)，splice从第三个参数开始代表向数组插入参数，所以取args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted) //新增的参数也进行响应式操作
    // notify change
    ob.dep.notify()
    return result
  })
})
