import { def } from "../uitls";

const arrayProto = Array.prototype
// 新建一个中间对象来拦截数组原型方法
export const arrayMethods = Object.create(arrayProto)

;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'reverse',
  'sort'
].forEach(method => {
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)
    // 拿到 __ob__ 值，然后发送相关通知
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 监测新增进来的数据
    if (inserted) ob.observeArray(inserted)
    ob.dep.notify()
    return result
  })
})