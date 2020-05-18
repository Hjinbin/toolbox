module.exports = answers => {
  const { name, version, description, username, email, docs } = answers

  const docsConf = docs
    ? {
      vuese: {
        title: `cai-${name}`,
        outDir: 'docs',
        include: ['./src/**/*.vue'],
        exclude: []
      }
    }
    : {}

  return {
    name: `cai-${name}`,
    version,
    description,
    main: 'dist/index.js',
    module: 'src/index.vue',
    scripts: updateScripts(answers),
    author: `${username} <${email}>`,
    license: 'MIT',
    devDependencies: updateDevDependencies(answers),
    browserslist: ['defaults', 'ie >= 11, iOS >= 7, Android >= 4'],
    ...docsConf
  }
}

function updateScripts (answers) {
  const buildScripts = []
  const res = {
    'build:lib': 'rm -fr dist && bili',
  }
  const { example, test, docs } = answers

  if (example) {
    res.dev = 'cd example && npm run dev'
  }

  if (docs) {
    res.docs = 'vuese gen'
    res['docs:serve'] = 'npm run docs && vuese serve --open'
    buildScripts.push('npm run docs')
  }

  if (test) {
    res.test = 'jest'
    buildScripts.push('npm run test')
  }

  buildScripts.push('npm run build:lib')
  res.build = buildScripts.join(' && ')

  return res
}

function updateDevDependencies (answers) {
  let res = {
    bili: '^4.10.0',
    'node-sass': '^4.13.1',
    'rollup-plugin-vue': '^5.1.6',
    vue: '^2.6.11',
    'vue-template-compiler': '^2.6.11'
  }

  const { test } = answers

  if (test) {
    res = {
      "@vue/cli-plugin-unit-jest": "^4.3.1",
      "@vue/test-utils": "^1.0.2",
      "babel-core": "^6.26.3",
      "babel-jest": "^26.0.1",
      "bili": "^4.10.0",
      "jest": "^26.0.1",
      "node-sass": "^4.13.1",
      "rollup-plugin-vue": "^5.1.6",
      "vue": "^2.6.11",
      "vue-jest": "^3.0.5",
      "vue-template-compiler": "^2.6.11"
    }
  }

  return res
}
