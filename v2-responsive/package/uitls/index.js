function def(obj, key, val, enumberable) {
  Object.defineProperty(obj, key, {
    enumerable: !!enumberable,
    value: val,
    writable: true,
    configurable: true
  })
}

export {
  def
}