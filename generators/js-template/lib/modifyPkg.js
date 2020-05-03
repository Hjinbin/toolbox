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
    devDependencies: updatedevDependencies(answers),
    browserslist: ['defaults', 'ie >= 11, iOS >= 7, Android >= 4']
  }
}

function updateScripts (answers) {
  const res = {
    build: 'rm -fr dist && bili'
  }
  const { example } = answers

  if (example) {
    res.dev = 'cd example && npm run dev'
  }

  return res
}

function updatedevDependencies () {
  return {
    bili: '^4.8.1'
  }
}
