import { parsePath } from './parsePath'

/**
 * vm.$watch('a.b.c', function(newVal, oldVal) {
 *  // do something
 * })
 */
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    // 执行 this.getter() 就可以多去 data.a.b.c 的内容
    this.getter = parsePath(expOrFn)
    // cb 就是值更改的副作用函数
    this.cb = cb
    this.value = this.get()
  }
  get() {
    // 将当前实例保存在 window.target 中，用于被 dep 收集
    window.target = this
    // 这步读取到属性的值了，成功触发 dep 中的收集操作
    let value = this.getter.call(this.vm, this.vm)
    // window.target 重置
    window.target = undefined
    return value
  }
  update() {
    const oldValue = this.value
    this.value = this.get()
    // 值更改的时候触发副作用函数
    this.cb.call(this.vm, this.value, oldValue)
  }
}

export default Watcher