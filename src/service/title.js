/**
 * 设置网页标题
 * hack iOS title 在不刷新时不修改
 */
export default (title) => {
  window.document.title = title

  setTimeout(function () {
    const iframe = document.createElement('iframe')

    iframe.style.visibility = 'hidden'
    iframe.style.width = '1px'
    iframe.style.height = '1px'
    iframe.src = '/favicon.ico'

    iframe.onload = function () {
      setTimeout(function () {
        document.body.removeChild(iframe)
      }, 0)
    }

    document.body.appendChild(iframe)
  }, 0)
}
