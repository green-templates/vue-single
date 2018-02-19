import * as tcheck from '../tcheck'
import * as tool from '../tool'

// 各实例不同配置
export default {
  /**
   * 设置 host
   * @param {String|Object} hosts
   * String => 'testing-host'
   * Object => {
   *  online: 'online-host',
   *  testing: 'testing-host'
   * }
   */
  setHost (hosts) {
    let host = ''

    if (hosts && tcheck.isString(hosts) && !tool.env.isOnline()) host = hosts

    if (tcheck.isObject(hosts)) {
      host = tool.env.isOnline() ? hosts.online : hosts.testing
    }

    return host
  },
  /**
   * 设置 axios.defaults 配置
   * @param {Object} options
   * @param {Object} instance axios 实例
   */
  setConfig (options, instance) {
    const config = {
      headers: {}
    }

    // 处理 headers 中文等非法字符
    if (options && options.headers) {
      for (var k in options.headers) {
        var el = options.headers[k]
        options.headers[k] = encodeURI(el)
      }
    }

    if (instance) {
      return tool.merge(instance.defaults, config, options)
    }

    return tool.merge(config, options)
  }
}
