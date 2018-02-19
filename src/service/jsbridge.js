/**
 * 客户端 API
 */
const userAgent = window.navigator.userAgent.toLowerCase()

// 判断微信
export const isWeiXin = /micromessenger/.test(userAgent)

// 判断安卓
export const isAndroid = /andriod|linux/.test(userAgent)

// 判断iOS
export const isIOS = /iphone|ipad/.test(userAgent)
