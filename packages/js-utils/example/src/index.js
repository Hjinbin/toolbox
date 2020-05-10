import { isNullValue } from '../../src'

const obj = {}
console.log(obj, isNullValue(obj))
const num = 12
console.log(num, isNullValue(num))
const str = '1231'
console.log(str, isNullValue(str))
console.log(0, isNullValue(0))
const theNull = null
console.log(theNull, isNullValue(theNull))
const theUndefined = undefined
console.log(theUndefined, isNullValue(theUndefined))
const theNaN = NaN
console.log(theNaN, isNullValue(theNaN))
const thenEmptyStr = ''
console.log(thenEmptyStr, isNullValue(thenEmptyStr))
