import * as utils from './utils'
import * as tcheck from './tcheck'
import InitAjax from './ajax/InitAjax'

/**
 * 文件上传 cos
 * @param {String} fileName
 * @param {Function} cb
 */
export default {
  getFile (event) {
    // https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/Camera#.E6.B5.8F.E8.A7.88.E5.99.A8.E5.85.BC.E5.AE.B9.E6.80.A7
    // Get a reference to the taken picture or chosen file
    const files = event.target.files
    let file

    if (files && files.length > 0) {
      file = files[0]
      utils.logger(file)
      // 限制 20 MB
      const limit = 20000000
      const fileSize = file.size
      if (fileSize > limit) {
        window.layer.warning('文件过大，请更换')
        return
      }
      return file
    } else {
      window.layer.warning('暂不支持文件上传')
    }
  },
  /**
   * cos 上传
   * @param {Object} event
   * @param {Array} inputEl input[type=file] DOM
   * @param {Function} cb
   * @return access_url resource_path source_url url
   */
  cos (event, inputEl, cb) {
    const file = this.getFile(event)
    const fileName = Date.now() + file.name

    // 清空 value 响应 change 事件，否则同一张图不会触发 change
    inputEl.forEach(function (el) {
      el.value = ''
    }, this)

    if (!fileName) return

    window.ajax.get('', {}, {
      loading: 4
    }).then((res) => {
      if (res.code === 0) {
        const url = `http://sh.file.myqcloud.com/files/v2/${res.data.app_id}/${res.data.bucket}/${res.data.dir}/${fileName}`

        const formdata = new window.FormData()
        formdata.append('op', 'upload')
        formdata.append('filecontent', file)
        formdata.append('insertOnly', 0)

        // https://cloud.tencent.com/document/product/430/6005
        const qcloud = new InitAjax({
          config: {
            headers: {
              'authorization': res.data.signature
            }
          }
        })
        qcloud.upload(url, formdata)
          .then((res) => {
            if (res.code === 0) {
              tcheck.isFunction(cb) && cb(res.data)
            } else {
              window.layer.warning(res.message)
            }
          })
      } else {
        window.layer.warning(res.message)
      }
    })
  }
}
