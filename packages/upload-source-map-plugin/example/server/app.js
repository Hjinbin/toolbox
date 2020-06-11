const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

const router = new Router()
router.post('/upload', async function (ctx) {
  ctx.req
    .on('data', data => {
      const content = data.toString('utf8')
      const { querystring } = ctx.request
      const [, fileName] = querystring.split('=')
      writeFile(fileName, content)
    })
    // .on('close', () => { console.log('close') })
    // .on('error', () => console.log('error'))
    // .on('end', () => console.log('end'))
})
app.use(router.routes())

app.listen(5001, () => console.log('服务已启动：http://localhost:5001'))

function writeFile (fileName, content) {
  const dirPath = path.join(__dirname, 'upload')
  const filePath = path.join(__dirname, 'upload', fileName)
  if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  fs.writeFile(filePath, content, (err) => {
    if (err) console.log('write fail', err)
  })
}
