const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const inquirer = require('inquirer')

const pkgPath = 'packages'

const generatorMap = {
  js: path.join(__dirname, '..', 'generators/js-template'),
  vue: path.join(__dirname, '..', 'generators/vue-template')
}

const questions = [
  {
    default: 'js',
    type: 'rawlist',
    name: 'projectType',
    message: 'Please select the component type',
    choices: [
      {
        value: 'js',
        name: 'js library'
      },
      {
        value: 'vue',
        name: 'vue component'
      }
    ]
  },
  {
    name: 'name',
    message: 'Enter the project name, with only lowercase letters and short horizontal lines',
    default: '',
    validate (name) {
      if (!name) return 'The name cannot be empty'
      if (/[^a-z-]/.test(name)) {
        return 'Names can only contain lowercase letters and short horizontal lines'
      }
      if (fs.existsSync(cwd(`${pkgPath}/${name}`))) {
        return `${name} directory already exists, please re-create`
      }
      return true
    }
  }
]

const cwd = (...args) => path.join(process.cwd(), ...args)

async function init () {
  const answer = await inquirer.prompt(questions)
  const { projectType, name } = answer
  process.env.PROJECT_NAME = name

  const generator = generatorMap[projectType]
  const cmd = `sao ${generator} ./${pkgPath}/${name} --update`
  child_process.execSync(cmd, { stdio: 'inherit' })
}

init()
