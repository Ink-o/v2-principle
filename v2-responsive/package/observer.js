import Dep from "./dep"
import { arrayMethods } from "./array/arrayMethods"
import { def } from "./uitls"

/**
 * Observer 类会附加到每一个被侦测的 object 上
 * 一旦被附加上，Observer 会将 object 的所有睡醒转换为 getter/setter 的形式
 * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖
 */
export class Observer {
  constructor(value) {
    this.value = value
    // 这个 dep 主要是收集数组的依赖。给数组在拦截方法中使用的
    this.dep = new Dep()

    // 保存 Observer 实例到 value 上
    // 这样就可以拿到 Observer 上的 deps 了
    // 作用：1. 作为响应式的一个标识 2. 数组拦截方法中通过 this 可以拿到 deps 中收集的依赖
    def(value, '__ob__', this)

    // 数组拦截原型
    // vue 这里还做了没有原型的兼容，这里省略了
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods
      // 侦测数组的每一项
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  /**
   * walk 会将每一个属性都转换成 getter/setter 的形式来侦测变化
   * 
   * 这个方法只有在类型为 Object 时被调用
   */
  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
  /**
   * 侦测 Array 中的每一项
   */
  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }
}

function defineReactive(data, key, value) {
  // childOb 是一个 Observer 的实例
  let childOb = observe(value)
  // 这个 dep 是一个闭包，用来管理这个属性的依赖的，里面可以装多个 watcher
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 收集依赖（这块主要在实例化 Watcher 的时候起到作用）
      dep.depend()

      // 这里手动管理 Observer 的依赖收集（主要是给数组中使用的）
      if (childOb) {
        childOb.dep.depend()
      }
      return value
    },
    set(newVal) {
      console.log('设置值');
      if (value === newVal) return
      value = newVal
      // 触发
      dep.notify()
    }
  })
}

/**
 * 尝试为 value 创建一个 Observer 实例
 * 如果创建成功，直接返回新创建的 Observer 实例
 * 如果 value 已经存在一个 Observer 实例，则直接返回它
 */
export function observe(value, asRootData) {
  if (typeof value !== 'object' || value === null) {
    return
  }
  let ob
  if (Object.prototype.hasOwnProperty(value, '__ob__') && value.__ob__ instanceof Observer) {
    return value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}