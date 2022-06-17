export const debounce = (fn, delay) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn.call(this, arguments), delay)
  }
}

export const throttle = (fn, delay) => {
  let valid = true
  return function (...args) {
    if (!valid) {
      return false
    }
    valid = false
    setTimeout(() => {
      // fn && fn().call(this, arguments)
      fn.apply(this, args)
      valid = true
    }, delay)
  }
}