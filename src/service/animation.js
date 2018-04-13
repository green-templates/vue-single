import * as utils from './utils'

function getTransforms (translate3d) {
  return {
    '-webkit-transform': translate3d,
    '-moz-transform': translate3d,
    '-ms-transform': translate3d,
    'transform': translate3d
  }
}

/**
 * translate
 * @param el DOM
 * @param len 移动距离
 */
export function translate (el, {
  x = 0,
  y = 0,
  z = 0
}) {
  const translate3d = `translate3d(${x}, ${y}, ${z})`
  const transforms = getTransforms(translate3d)
  utils.setCSS(el, transforms)
}
