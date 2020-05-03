const modifyPkg = require('./lib/modifyPkg')

module.exports = {
  prompts () {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder,
        when () {
          // 如果已有项目名则不提问，action 需要手动设置 name
          return !process.env.PROJECT_NAME
        },
        validate (name) {
          if (!name) return 'The name cannot be empty'
          if (/[^a-z-]/.test(name)) {
            return 'Names can only contain lowercase letters and short horizontal lines'
          }
          return true
        }
      },
      {
        name: 'description',
        message: 'How would you descript the new project',
        default: ({ name }) => name || process.env.PROJECT_NAME
      },
      {
        name: 'version',
        message: 'What is the version number of this project',
        default: '1.0.0'
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: this.gitUser.username || this.gitUser.name,
        filter: val => val.toLowerCase(),
        store: true
      },
      {
        name: 'email',
        message: 'What is your email?',
        default: this.gitUser.email,
        store: true
      },
      {
        name: 'website',
        message: 'The URL of your website',
        default ({ username }) {
          return `github.com/${username}`
        },
        store: true
      },
      // TODO: apiDocs, gitoapage, example, test, coverage
      {
        name: 'example',
        type: 'confirm',
        message: 'Whether to generate an example directory',
        default: true
      },
      {
        name: 'test',
        type: 'confirm',
        message: 'Whether to initialize the Jest test template',
        default: true
      },
      {
        name: 'coverage',
        type: 'confirm',
        message: 'Whether to increase test coverage',
        default: true
      }
    ]
  },
  actions () {
    // 手动设置 name
    if (process.env.PROJECT_NAME && !this.answers.name) {
      this.answers.name = process.env.PROJECT_NAME
    }

    const { name } = this.answers
    this.answers.camelName = name
      .replace(/-([a-z])/g, (all, m) => m.toUpperCase())
      .replace(/^[a-z]/, m => m.toUpperCase())

    return [
      {
        type: 'add',
        // Copy and transform all files in `template` folder into output directory
        files: '**',
        filters: {
          'example/**/*': 'example',
          'test/**/*': 'test',
          'jest.config.js': 'test'
        }
      },
      {
        type: 'move',
        patterns: {
          gitignore: '.gitignore',
          // If we use `package.json` directly
          // Then `template` folder will be treated as a package too, which isn't safe
          '_package.json': 'package.json',
          npmignore: '.npmignore'
        }
      },
      {
        type: 'modify',
        files: 'package.json',
        handler: () => modifyPkg(this.answers)
      }
    ]
  },
  async completed () {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  }
}
