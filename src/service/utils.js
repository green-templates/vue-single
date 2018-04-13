import * as tcheck from './tcheck'

const root = document.documentElement

/**
 * 客户端 API
 */
const userAgent = window.navigator.userAgent.toLowerCase()

// 判断微信
export const isWeiXin = /micromessenger/.test(userAgent)

// 判断安卓
export const isAndroid = /andriod|linux/.test(userAgent)

// 判断iOS
export const isIOS = /iphone|ipad/.test(userAgent)

/**
 * 环境判断
 */
export const env = {
  isDev () {
    return !!window.location.port
  },
  isOnline () {
    return window.location.origin.indexOf('https') > -1
  },
  isTesting () {
    return !(this.isDev() && this.isOnline())
  }
}

/**
 * 选择器
 * @param {String} selector css 选择器
 * @param {Object | String} context DOM | css 选择器
 * $$('.test', $$('#app'))
 * $$('.test', '#app')
 */
export function $$ (selector, context) {
  context = context || document
  context = tcheck.isString(context) ? $$(context)[0] : context

  const element = context.querySelectorAll(selector)
  return Array.prototype.slice.call(element)
}

export function $ (selector, context) {
  context = context || document
  context = tcheck.isString(context) ? $(context) : context

  const element = context.querySelector(selector)
  return element
}

/**
 * 设置 css
 * @param {Object} el DOM
 * @param {Object} styleObj 样式对象
 * setCSS(el, { width: '100%' })
 */
export function setCSS (el, styleObj) {
  for (const k in styleObj) {
    if (styleObj.hasOwnProperty(k)) {
      const val = styleObj[k]
      el.style[k] = val
    }
  }
}

/**
 * 检测属性
 * @param {String} property css 属性
 * testProperty('filter')
 */
export function testProperty (property) {
  if (property in root.style) {
    root.classList.add(property.toLowerCase())
    return true
  }
  root.classList.add('no-' + property.toLowerCase())
  return false
}

/**
 * 检测属性值
 * @param {String} id 标识
 * @param {String} value 值
 * @param {String} property 属性
 * testValue('blur', 'blur(10px)', 'filter')
 */
export function testValue (id, value, property) {
  const dummy = document.createElement('p')
  dummy.style[property] = value

  if (dummy.style[property]) {
    root.classList.add(id)
    return true
  }
  root.classList.add('no-' + id)
  return false
}

/**
 * 合并
 * merge(obj1, obj2, ...)
 * merge(true, obj1, obj2, ...)
 */
function isArrObj (i) {
  return tcheck.isArray(i) || tcheck.isObject(i)
}
export function merge (obj1, obj2) {
  const arr =
    obj1 === true ? Array.prototype.slice.call(arguments, 1) : Array.prototype.slice.call(arguments)

  let obj = {}
  let i = 0
  const len = arr.length

  if (obj1 !== true) {
    obj = arr[0]
    i++
  }

  for (; i < len; i++) {
    const el = arr[i]
    loop(obj, el)
  }

  function loop (obj, el) {
    for (const k in el) {
      if (typeof el[k] === 'object') {
        // !{} | ![]
        if (!isArrObj(el[k]) || (obj1 !== true && !isArrObj(obj[k]))) {
          obj[k] = el[k]
        } else {
          // Array | Object
          // 深拷贝
          if (obj1 === true && !isArrObj(obj[k])) {
            obj[k] = tcheck.isArray(el[k]) ? [] : {}
          }

          // 浅拷贝
          loop(obj[k], el[k])
        }
        continue
      }
      obj[k] = el[k]
    }
  }

  return obj
}

/**
 * 去除空格
 * @param {String} s
 */
export function trim (s) {
  return s.replace(/\s/g, '')
}

/**
 * 某段时间内只执行 1 次
 * @param {Function} cb 回调函数
 * @param {Number} time 时间
 */
let now, old
export function once (cb, time) {
  time = time || 1000
  now = Date.now()
  old = old || 0
  const detel = now - old

  logger(now, old, detel)

  detel > time && cb()
  old = now
}

/**
 * 创建带 src 的 dom
 * @param {String} tag 'script'
 * @param {String} url src link
 */
export function createUrlEl (tag, url) {
  if (!tag || !url) return

  const el = document.createElement(tag)
  el.setAttribute('src', url)
  document.body.appendChild(el)

  return el
}

/**
 * 非线上环境 console
 */
export function logger (...args) {
  if (!env.isOnline()) {
    console.log(...args)
  }
}

/**
 * 转换 \n => br
 * @param {String} s
 */
export function br (s) {
  return s.replace(/\n/g, '<br>')
}
