module.exports = answers => {
  const { name, version, description, username, email } = answers

  return {
    name: `cai-${name}`,
    version,
    description,
    main: 'dist/index.min.js',
    module: 'dist/index.esm.min.js',
    scripts: updateScripts(answers),
    author: `${username} <${email}>`,
    license: 'MIT',
    devDependencies: updateDevDependencies(answers),
    browserslist: ['defaults', 'ie >= 11, iOS >= 7, Android >= 4']
  }
}

function updateScripts (answers) {
  const buildScripts = []
  const res = {
    'build:lib': 'rm -fr dist && bili',
  }
  const { example, test,  coverage, docs } = answers

  if (example) {
    res.dev = 'cd example && npm run dev'
  }

  if (docs) {
    // windows10 报错找不到 ./src/*.js 对应的文件
    res.docs = 'jsdoc -d ./docs --readme ./README.md src'
    res['docs:serve'] = 'npm run docs && node ../../scripts/pkgDocsServe.js'
    buildScripts.push('npm run docs')
  }

  if (test) {
    res.test = `jest${coverage ? ' --coverage' : ''}`
    buildScripts.push('npm run test')
  }

  buildScripts.push('npm run build:lib')
  res.build = buildScripts.join(' && ')

  return res
}

function updateDevDependencies (answers) {
  const res = {
    bili: '^4.10.0'
  }

  const { test } = answers

  if (test) {
    res.jest = '^25.5'
  }

  return res
}
