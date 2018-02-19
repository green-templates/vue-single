import axios from 'axios'
// using application/x-www-form-urlencoded
// https://github.com/mzabriskie/axios#using-applicationx-www-form-urlencoded-format
import qs from 'qs'
import * as tool from '../tool'

import setGlobal from './_global'
import setOption from './_self'

// 兼容某些低版本手机不支持 Promise  e.g. 锤子
// https://github.com/mzabriskie/axios#promises
require('es6-promise').polyfill()

/**
 * @param {Object} options.config 配置 对应 axios.defaults
 * @param {String | Object} options.host 域名配置
 * String => 'testing-host'
 * Object => {
 *  online: 'online-host',
 *  testing: 'testing-host'
 * }
 */
const defaults = {
  config: {
    headers: {}
  },
  host: ''
}
/**
 * 设置 ajax 配置
 * @param {Object} options 配置选项
 * e.g.
 * const ajax = new InitAjax()
 */
class InitAjax {
  constructor (options) {
    this.options = tool.merge(true, defaults, options)

    this.host = setOption.setHost(this.options.host)

    this.instance = axios.create(setOption.setConfig(this.options.config))
    setGlobal(this.instance)
  }

  all () {
    return axios.all
  }
  spread () {
    return axios.spread
  }
  get (url, params, options) {
    return this.instance.get(this.host + url, tool.merge({
      params
    }, options))
  }
  post (url, params, options) {
    return this.instance.post(this.host + url, qs.stringify(params), options)
  }
}

export default InitAjax

// const a = axios.create({ headers: {} })
// const b = axios.create({ headers: {} })
// a.defaults.a = 1
// a.defaults.headers.a = 1
// b.defaults.b = 1
// b.defaults.headers.b = 1
// tool.logger(a.defaults)
// tool.logger(b.defaults)

/**
 * ajax.all()
 * ajax.spread()
 *
function api1() {
    return ajax.get('api')
}

function api2() {
    return ajax.get('api')
}

function api3() {
    return ajax.get('api')
}

ajax.all([api1(), api2(), api3()])
    .then((res) => {
        // @param {Array} res
    })
    or
    .then(ajax.spread((res1, res2, res3) => {
        // @param {Object} res1 res2 res3
    }))
 */
