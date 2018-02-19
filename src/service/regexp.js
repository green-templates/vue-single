/**
 * 验证是否为空
 */
export function empty (i) {
  return !!i && i.replace(/\s/g, '') !== ''
}

/**
 * 验证姓名不能有数字
 */
export function name (i) {
  const regName = new RegExp('^[^\\d]+$')
  return !!i && regName.test(i)
}

/**
 * 验证手机号码
 */
export function mobile (i) {
  const regPhone = new RegExp('^1[34578]\\d{9}$')
  return regPhone.test(i)
}

/**
 * 验证电话号码（包括座机和手机）
 */
export function tel (i) {
  const regTel = new RegExp('(^(0[0-9]{2,3}\\-?)?([2-9][0-9]{6,7})+(\\-?[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-?))?(1[34578]\\d{9})$)')

  return regTel.test(i) && !/-400/.test(i)
}

/**
 * 验证字符串不包含数字
 */
export function noNumber (i) {
  const regNoNumber = new RegExp('\\d+')

  return !regNoNumber.test(i)
}

/**
 * 验证身份证号
 */
export function idCard (i) {
  const regIdCard = new RegExp('^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}(\\d|x|X)$')

  return regIdCard.test(i)
}

/**
 * 验证日期（年月） 2016-08
 */
export function date (i) {
  const regDate = new RegExp('^[1-9]\\d{3}-((0?[1-9])|(1[0-2]))$')

  return regDate.test(i)
}

/**
 * 验证日期（年月日） 2016-08-01
 */
export function wholeDate (i) {
  const regWholeDate = new RegExp('\\d{4}-\\d{2}-\\d{2}')

  return regWholeDate.test(i)
}

/**
 * 验证金额
 */
export function money (i) {
  const regMoney = new RegExp('^[1-9]\\d*.\\d*$')

  return regMoney.test(i)
}

/**
 * 银行卡验证，最大 19 位数字
 */
export function bankcard (i) {
  const reg = new RegExp('^\\d{14,19}$')

  return reg.test(i)
}

/**
 * 密码强度检查（6-16位数字或字母）
 */
export function password (i) {
  const reg = new RegExp('^[0-9a-zA-Z]{6,16}$')
  return reg.test(i)
}

/**
 * 车牌
 */
export function carid (i) {
  return /^[\u4e00-\u9fa5][A-Z0-9]{6}$/.test(i)
}

/**
 * 车架号
 */
export function carnum (i) {
  return /^[A-Z0-9]{17}$/.test(i)
}

/**
 * 0 | 正整数
 */
export function nonnegativeinteger (i) {
  return /^(?:0|[1-9]\d*)$/.test(i)
}
