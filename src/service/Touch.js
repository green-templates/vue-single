const action = {
  /**
   * touchend
   * @param {Number} dX
   * @param {Number} dY
   * @param {Number} delta
   * @param {Object} options
   */
  touchEnd (dX, dY, delta, options) {
    const holdTime = 300
    const holdDis = 100

    if (delta < holdTime && (Math.abs(dX) > holdDis || Math.abs(dY) > holdDis)) {
      this.swipe(dX, dY, options.swipe)
    } else {
      this.drag(dX, dY, options.drag, 'end')
    }
  },
  /**
   * 滑动
   * @param {Number} dX
   * @param {Number} dY
   * @param {Function} callback
   */
  swipe (dX, dY, callback) {
    typeof callback === 'function' && callback(dX, dY)
  },
  /**
   * 拖动
   * @param {Number} dX
   * @param {Number} dY
   * @param {Function} callback
   * @param {String} end
   */
  drag (dX, dY, callback, end) {
    typeof callback === 'function' && callback(dX, dY, end)
  }
}
/**
 * touch 事件
 * @param {Object} el DOM
 * @param {Object} options 动作函数
 * @param {Function} options.swipe 滑动 (dX, dY)
 * @param {Function} options.drag 拖动 (dX, dY, end)
 */
function Touch (el, options) {
  this.touchEl = el || null
  this.options = options || {}

  this.init()
}

Touch.prototype.init = function () {
  let sX = 0 // start x
  let sY = 0 // start y

  let tStart = 0 // start time
  let tEnd = 0 // end time
  let delta = 0 // 间隔

  this.touchEl.addEventListener('touchstart', (e) => {
    prevent(e)

    tStart = Date.now()

    sX = e.touches[0].pageX // start x
    sY = e.touches[0].pageY // start y
  }, false)

  this.touchEl.addEventListener('touchmove', (e) => {
    e.preventDefault()
    prevent(e)

    const mX = e.touches[0].pageX
    const mY = e.touches[0].pageY
    const dX = mX - sX
    const dY = mY - sY

    action.drag(dX, dY, this.options.drag)
  }, false)

  this.touchEl.addEventListener('touchend', (e) => {
    prevent(e)

    tEnd = Date.now()
    delta = tEnd - tStart

    let eX = e.changedTouches[0].pageX
    let eY = e.changedTouches[0].pageY
    const dX = eX - sX
    const dY = eY - sY

    action.touchEnd(dX, dY, delta, this.options)
  }, false)
}

function prevent (e) {
  // e.preventDefault()
  e.stopPropagation()
}

export default Touch
