/* eslint-disable */
import * as utils from './utils'


/*!

 @Name：layer mobile v2.0 弹层组件移动版
 @Author：贤心
 @Site：http://layer.layui.com/mobile/
 @License：LGPL

 */
'use strict'

var doc = document,
  query = 'querySelectorAll',
  claname = 'getElementsByClassName',
  S = function(s) {
    return doc[query](s)
  }

// 默认配置
var config = {
  type: 0,
  shade: true,
  shadeClose: true,
  fixed: true,
  anim: 'scale' // 默认动画类型
}

var ready = {
  extend: function(obj) {
    var newobj = JSON.parse(JSON.stringify(config))
    for (var i in obj) {
      newobj[i] = obj[i]
    }
    return newobj
  },
  timer: {},
  end: {}
}

// 点触事件
ready.touch = function(elem, fn) {
  elem.addEventListener('click', function(e) {
    fn.call(this, e)
  }, false)
}

var index = 0,
  classs = ['layui-m-layer'],
  Layer = function(options) {
    var that = this
    that.config = ready.extend(options)
    that.view()
  }

Layer.prototype.view = function() {
  var that = this,
    config = that.config,
    layerbox = doc.createElement('div')

  that.id = layerbox.id = classs[0] + index
  layerbox.setAttribute('class', classs[0] + ' ' + classs[0] + (config.type || 0))
  layerbox.setAttribute('index', index)

  // 标题区域
  var title = (function() {
    var titype = typeof config.title === 'object'
    return config.title ?
      '<h3 style="' + (titype ? config.title[1] : '') + '">' + (titype ? config.title[0] : config.title) + '</h3>' :
      ''
  }())

  // 按钮区域
  var button = (function() {
    typeof config.btn === 'string' && (config.btn = [config.btn])
    var btns = (config.btn || []).length,
      btndom
    if (btns === 0 || !config.btn) {
      return ''
    }
    btndom = '<span yes type="1">' + config.btn[0] + '</span>'
    if (btns === 2) {
      btndom = '<span no type="0">' + config.btn[1] + '</span>' + btndom
    }
    return '<div class="layui-m-layerbtn">' + btndom + '</div>'
  }())

  if (!config.fixed) {
    config.top = config.hasOwnProperty('top') ? config.top : 100
    config.style = config.style || ''
    config.style += ' top:' + (doc.body.scrollTop + config.top) + 'px'
  }

  if (config.type === 2) {
    config.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (config.content || '') + '</p>'
  }

  // 新增 loading
  if (config.type === 3 || config.type === 4) {
    config.content = '<i class="layui-m-layerload"></i>'
  }
  if (config.type === 5) {
    config.content = ''
  }

  if (config.skin) config.anim = 'up'
  if (config.skin === 'msg') config.shade = false

  layerbox.innerHTML = (config.shade ? '<div ' + (typeof config.shade === 'string' ? 'style="' + config.shade + '"' : '') + ' class="layui-m-layershade"></div>' : '') +
    '<div class="layui-m-layermain" ' + (!config.fixed ? 'style="position:static;"' : '') + '>' +
    '<div class="layui-m-layersection">' +
    '<div class="layui-m-layerchild ' + (config.skin ? 'layui-m-layer-' + config.skin + ' ' : '') + (config.className ? config.className : '') + ' ' + (config.anim ? 'layui-m-anim-' + config.anim : '') + '" ' + (config.style ? 'style="' + config.style + '"' : '') + '>' +
    title +
    '<div class="layui-m-layercont">' + config.content + '</div>' +
    button +
    '</div>' +
    '</div>' +
    '</div>'

  if (!config.type || config.type === 2) {
    var dialogs = doc[claname](classs[0] + config.type),
      dialen = dialogs.length
    if (dialen >= 1) {
      layer.close(dialogs[0].getAttribute('index'))
    }
  }

  document.body.appendChild(layerbox)
  var elem = that.elem = S('#' + that.id)[0]
  config.success && config.success(elem)

  that.index = index++
    that.action(config, elem)
}

Layer.prototype.action = function(config, elem) {
  var that = this

  // 自动关闭
  if (config.time) {
    ready.timer[that.index] = setTimeout(function() {
      layer.close(that.index)
    }, config.time * 1000)
  }

  // 确认取消
  var btn = function() {
    var type = this.getAttribute('type')
    if (type == 0) {
      config.no && config.no()
      layer.close(that.index)
    } else {
      config.yes ? config.yes(that.index) : layer.close(that.index)
    }
  }
  if (config.btn) {
    var btns = elem[claname]('layui-m-layerbtn')[0].children,
      btnlen = btns.length
    for (var ii = 0; ii < btnlen; ii++) {
      ready.touch(btns[ii], btn)
    }
  }

  // 点遮罩关闭
  if (config.shade && config.shadeClose) {
    var shade = elem[claname]('layui-m-layershade')[0]
    ready.touch(shade, function() {
      layer.close(that.index, config.end)
    })
  }

  config.end && (ready.end[that.index] = config.end)
}

var layer = {
  v: '2.0',
  index: index,

  // 核心方法
  open: function(options) {
    var o = new Layer(options || {})
    return o.index
  },

  close: function(index) {
    var ibox = S('#' + classs[0] + index)[0]
    if (!ibox) return
    ibox.innerHTML = ''
    doc.body.removeChild(ibox)
    clearTimeout(ready.timer[index])
    delete ready.timer[index]
    typeof ready.end[index] === 'function' && ready.end[index]()
    delete ready.end[index]
  },

  // 关闭所有layer层
  closeAll: function() {
    var boxs = doc[claname](classs[0])
    for (var i = 0, len = boxs.length; i < len; i++) {
      layer.close((boxs[0].getAttribute('index') | 0))
    }
  }
}

/**
 * 自定义
 */
var custom = {
  /**
   * loading
   * @param {Bool} close 能否关闭 true 能 false 不能
   * @param {Number} type loading 样式 2: 3个点  3,4: 转圈 3有白色遮罩  5: 透明遮罩
   */
  loading(type, close) {
    return layer.open({
      shadeClose: close || false,
      type: type || 2
    })
  },
  toast(msg, option) {
    return layer.open(utils.merge({
      skin: 'msg',
      content: msg || '',
      time: 2
    }, option))
  },
  /**
   * 提示框  一个按钮
   * @param {String} msg 弹框内容
   * @param {Object} option 参数选项
   * e.g. layer.warning('msg', {
   *  shadeClose: false, // 浮层点击不可关闭
   *  btn: ['是', '否']
   *  yes() {} // 点击确定回调函数
   *  no() {} // 点击取消回调函数
   *  end() {} // layer 关闭后回调函数 点击浮层关闭也会调用
   * })
   */
  warning(msg, option) {
    return layer.open(utils.merge({
      shadeClose: false,
      content: msg || '',
      btn: ['确定']
    }, option))
  },
  /**
   * 提示框  2 个按钮
   * @param {String} msg 弹框内容
   * @param {Object} option 参数选项
   */
  confirm(msg, option) {
    return layer.open(utils.merge({
      shadeClose: false,
      content: msg || '',
      btn: ['确定', '取消']
    }, option))
  }
}

layer = utils.merge(layer, custom)

export default layer
