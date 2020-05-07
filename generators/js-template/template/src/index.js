/**
 * 两数相加
 * @param {Number} a 数字A
 * @param {Number} b 数字B
 */
export function add (a, b) {
  return a + b
}

/**
 * @class
 * @name Person
 * @description 人员类
 * @param {String} name 名字
 * @param {Number} age 年龄
 */
export class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  /**
   * say
   */
  say () {
    console.log('hi, my name is ' + this.name)
  }
}
