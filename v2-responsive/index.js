import { Observer } from "./package/observer"
import Watcher from "./package/watcher"

const obj = {
  name: 'zs',
  classes: ['java', 'c++']
}

// 先给整个obj的属性都给监听上
new Observer(obj)

console.log('obj: ', obj);

// 属性测试
// 实例化指定对象的 watcher，添加指定的回调
// new Watcher(obj, 'name', (a, b, c) => {
//   console.log('a, b: ', a, b);
// })

// // 在设置值的时候会触发收集到的 dep（也就是 watcher）
// obj.name = 'eee'


// 数组测试
new Watcher(obj, 'classes', (a, b, c) => {
  console.log('a, b: ', a, b);
})
obj.classes.push('js')