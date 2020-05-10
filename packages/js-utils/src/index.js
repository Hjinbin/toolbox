/**
 * 判断值是否为空值，即undefined、null，NaN、''，不包含0
 * @param {*} val
 * @returns {Boolean}
 */
export function isNullValue (val) {
  return typeof val === 'undefined' ||
    typeof val === 'number' && isNaN(val) ||
    !val && String(val) === 'null' ||
    val === ''
}
