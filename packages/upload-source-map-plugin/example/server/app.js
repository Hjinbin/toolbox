const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')

const app = new Koa()

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, 'upload'),
    keepExtensions: true
  }
}))

const router = new Router()
router.post('/upload', async function (ctx) {
  const file = ctx.request.files.file
  ctx.body = {
    code: 0,
    data: {
      path: file.path
    },
    msg: ''
  }
})
app.use(router.routes())

app.listen(5001, () => console.log('服务已启动：http://localhost:5001'))
