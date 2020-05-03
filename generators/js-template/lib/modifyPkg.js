module.exports = answers => {
  const { name, version, description, username, email } = answers

  return {
    name: `@cai/${name}`,
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
  const res = {
    build: 'rm -fr dist && bili'
  }
  const { example, test } = answers

  if (example) {
    res.dev = 'cd example && npm run dev'
  }

  if (test) {
    res.test = 'jest'
    res.build = 'npm run test && ' + res.build
  }

  return res
}

function updateDevDependencies (answers) {
  const res = {
    bili: '^4.8.1'
  }

  const { test } = answers

  if (test) {
    res.jest = '^25.5'
  }

  return res
}
