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
        message: 'How would you descripe the new project',
        default: ({ name }) => name || process.env.PROJECT_NAME
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
      }
      // TODO: apiDocs, gitoapage, example, test, coverage
    ].filter(Boolean)
  },
  actions () {
    // 手动设置 name
    if (process.env.PROJECT_NAME && !this.answers.name) {
      this.answers.name = process.env.PROJECT_NAME
    }
    return [
      {
        type: 'add',
        // Copy and transform all files in `template` folder into output directory
        files: '**'
      },
      {
        type: 'move',
        patterns: {
          gitignore: '.gitignore'
        }
      }
    ]
  },
  async completed () {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  }
}
