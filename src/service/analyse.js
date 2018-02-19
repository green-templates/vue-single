/**
 * 数据分析
 */
;
((window) => {
  // 百度统计
  window._hmt = window._hmt || [];
  (function () {
    var hm = document.createElement('script')
    hm.src = '//hm.baidu.com/hm.js?'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
    // window.addEventListener("hashchange", function() {
    //     _hmt.push(['_trackPageview', location.pathname + location.search + location.hash]);
    // })
    window._hmt.push(['_trackPageview', window.location.pathname + window.location.search + window.location.hash])
  })()
})(window)
