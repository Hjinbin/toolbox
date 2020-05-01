const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const inquirer = require('inquirer')

const pkgPath = 'packages'

const generatorMap = {
  js: 'nm'
}

const questions = [
  {
    default: 'js',
    type: 'rawlist',
    name: 'projectType',
    message: '请选择组件类型',
    choices: [
      {
        value: 'js',
        name: 'js 组件'
      }
    ]
  },
  {
    name: 'name',
    message: '输入项目名字，只能包含小写字母以及短横线',
    default: '',
    validate (name) {
      if (!name) return '名字不能为空'
      if (/[^a-z-]/.test(name)) {
        return '名字只能包含小写字母以及短横线'
      }
      if (fs.existsSync(cwd(`${pkgPath}/${name}`))) {
        return `${name} 目录已存在，请重新创建`
      }
      return true
    }
  }
]

const cwd = (...args) => path.join(process.cwd(), ...args)

async function init () {
  const answer = await inquirer.prompt(questions)
  const { projectType, name } = answer

  const generator = generatorMap[projectType]
  const cmd = `sao ${generator} ./${pkgPath}/${name} --update`
  child_process.execSync(cmd, { stdio: 'inherit' })
}

init()
