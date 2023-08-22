// 依赖类
export default class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    remove(this.subs, sub)
  }
  // 收集依赖
  depend() {
    // window.target 是当前需要收集的依赖
    // window.target 就是一个 watcher（有多种不同的 watcher）
    if (window.target) {
      this.addSub(window.target)
    }
  }
  // 触发依赖
  notify() {
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      arr.splice(index, 1)
    }
  }
}