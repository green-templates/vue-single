// canvas width height 通过 width 设置自适应
const cvsWidth = document.documentElement.offsetWidth
const cvsHeight = cvsWidth * 0.48

// 公共参数
const arcX = cvsWidth / 2 // x 坐标
const arcY = cvsWidth * 0.32 // y 坐标
const arcL = cvsWidth * 0.24 // 半径
const arcStart = getDeg(150) // 起始位置
const arcEnd = getDeg(30) // 结束位置
const arcLineWidth = 4 // 圆弧宽度
const lineCap = 'round' // 线段两端圆弧

export const setCanvas = (el) => {
  if (!el) return
  const canvas = el

  if (!canvas.getContext) return
  const ctx = canvas.getContext('2d')

  canvas.width = cvsWidth
  canvas.height = cvsHeight

  let width = canvas.width
  let height = canvas.height
  if (window.devicePixelRatio) {
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    canvas.width = width * window.devicePixelRatio
    canvas.height = height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }
  return ctx
}

export const drawBg = (el) => {
  const ctx = setCanvas(el)

  ctx.lineCap = lineCap

  const bgCircle = {
    x: arcX,
    y: arcY,
    r: arcL,
    start: arcStart,
    end: arcEnd,
    type: 'stroke',
    color: '#D1F2FF'
  }
  ctx.lineWidth = arcLineWidth
  drawCircle.call(ctx, bgCircle)

  ctx.save()
  ctx.beginPath()
  ctx.translate(arcX, arcY)
  const bigDegree = {
    n: 5,
    start: arcL + 10,
    end: arcL + 14,
    deg: 60,
    width: 2,
    color: '#fff'
  }
  const smallDegree = {
    n: 120,
    start: arcL + 10,
    end: arcL + 12,
    deg: -2,
    width: 1,
    color: '#fff'
  }
  drawDegree.call(ctx, bigDegree)
  drawDegree.call(ctx, smallDegree)
  ctx.restore()
}

export const drawRing = (el, endDeg) => {
  const ctx = setCanvas(el)

  const width = ctx.canvas.width
  const height = ctx.canvas.height

  ctx.clearRect(0, 0, width, height)

  ctx.lineCap = lineCap

  // 进度条圆弧
  const upLineColor = '#FFC041' // 填充色
  const degStart = endDeg || 270 // 进度条角度
  const upEnd = getDeg(degStart) // 进度条结束位置

  const inCircle = {
    x: arcX,
    y: arcY,
    r: arcL,
    start: arcStart,
    end: upEnd,
    color: upLineColor,
    type: 'stroke'
  }
  ctx.lineWidth = arcLineWidth
  drawCircle.call(ctx, inCircle)

  // 进度条顶端圆点
  ctx.save()
  const cirDeg = degStart - 180 // 圆点角度
  const cirX = arcX - Math.cos(getDeg(cirDeg)) * arcL // 圆点 x 坐标
  const cirY = arcY - Math.sin(getDeg(cirDeg)) * arcL // 圆点 y 坐标

  const point = {
    x: cirX,
    y: cirY,
    r: 4,
    start: 0,
    end: getDeg(360),
    type: 'fill',
    color: upLineColor
  }
  ctx.shadowColor = '#969696' // 阴影颜色
  ctx.shadowBlur = 8 // 阴影大小
  drawCircle.call(ctx, point)
  ctx.restore()
}

// 角度换算弧度
function getDeg (deg) {
  return Math.PI / 180 * deg
}

/**
 * 圆
 * @param {Object} option
 * x, y, r, start, end
 * type: fill | stroke, color
 */
function drawCircle (option) {
  const ctx = this
  // // 圆心
  // ctx.beginPath()
  // ctx.arc(option.x, option.y, 1, 0, getDeg(360), 0)
  // ctx.fill()

  ctx.beginPath()
  ctx.arc(option.x, option.y, option.r, option.start, option.end, 0)
  ctx[option.type + 'Style'] = option.color
  ctx[option.type]()
}

// 刻度
function drawDegree (option) {
  const ctx = this
  ctx.beginPath()
  // 刻度公共参数
  ctx.strokeStyle = option.color
  // 大刻度
  ctx.lineWidth = option.width
  for (let i = 0; i < option.n; i++) {
    ctx.rotate(getDeg(option.deg))
    ctx.moveTo(0, option.start)
    ctx.lineTo(0, option.end)
  }
  ctx.stroke()
}
