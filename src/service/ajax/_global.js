import layer from '../layer'
import * as utils from '../utils'

const POST = 'post'
let method, lid

/**
 * loading type
 * @param {Object} config ajax 配置
 * @param {Number} config.loading loading '../layer.js:214'
 */
const loading = (config) => {
  // utils.logger(config)
  const type = config.method === POST ? 4 : 3
  return config.loading || type
}

/**
 * err 处理
 * @param {Object} error
 */
const errHandle = (error) => {
  // utils.logger('Response', error.response)
  // utils.logger('Request', error.request)
  // utils.logger('Error', error.message)
  // utils.logger('Config', error.config)

  const errMsg = error.message.indexOf('timeout') > -1 ? '请求超时' : '网络错误'

  layer.warning('', {
    content: errMsg + '<p class="xhr-info">' + error.message + '</p>',
    end () {
      if (method === POST) layer.close(lid)
    }
  })

  // const ajaxUrl = error.config ? error.config.url : ''
  // postError('ajax-error', error, { ajaxUrl })
}

/**
 * axios 全局配置
 * @param {Object} instance  axios 实例
 */
export default (instance) => { /* 添加请求拦截器 */
  instance.interceptors.request.use((config) => {
    /* 在发送请求之前做某事 */
    method = config.method
    if (config.loading !== false) lid = layer.loading(loading(config))

    return config
  }, (error) => {
    /* 请求错误时做些事 */
    errHandle(error)
    return Promise.reject(error)
  })

  /* 添加响应拦截器 */
  instance.interceptors.response.use((res) => {
    /* 对响应数据做些事 */
    utils.logger(res)
    layer.closeAll()

    return res.data
  }, (error) => {
    /* 请求错误时做些事 */
    errHandle(error)
    return Promise.reject(error)
  })
}
