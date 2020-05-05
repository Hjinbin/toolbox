const bs = require('browser-sync').create('doc-serve')
const child_process = require('child_process')

bs.init({
  files: [
    {
      match: ['src/**/*', 'README.md'],
      fn (ev, file) {
        child_process.execSync('npm run docs')
        bs.reload()
      }
    }
  ],
  server: './',
  port: 3333,
  startPath: 'docs'
})
