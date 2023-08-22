const bailRE = /[^\w.$]/

export function parsePath(path) {
  if (bailRE.test(path)) return
  const segments = path.split('.')
  console.log('segments: ', segments);
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}