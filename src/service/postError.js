import * as tool from './tool'
import * as jsbridge from './jsbridge'

const errType = {
  js: 'js-error',
  ajax: 'ajax-error',
  render: 'vue-render'
}
const errMsg = {
  script: 'Script error.',
  header: 'setRequestHeader'
}

/**
 * 报错信息上报
 * @param {String} type 类型
 * @param {Object} err error 对象 || {} 自定义 message stack
 * @param {Object} info 额外信息
 */
export function postError (type, err = {
  message: '',
  stack: ''
}, info) {
  type = type || errType.js

  let data = {
    phone: jsbridge.getPhone(),
    url: window.location.href,
    message: err.message,
    stack: err.stack
  }

  if (info) data = tool.merge(info, data)
  if (!tool.env.isOnline()) {
    console.warn(type)
    console.warn(data)
  }

  if (type === errType.ajax && data.ajaxUrl === '') {
    if (data.message.indexOf(errMsg.header) > -1) {
      window.ajax.instance.defaults.headers = {}
    }
  }

  if (!tool.env.isDev()) {
    window.ajax.post('', {
      type,
      data: JSON.stringify(data)
    }, {
      loading: false
    })
  }
}

// window.onerror = (msg, url, line, col, err) => {
//     if (msg === errMsg.script || !err) return

//     const info = {
//         line,
//         col
//     }

//     window.postError('', err, info)
// }
