const { request } = require('http')
const fs = require('fs')

module.exports = uploadFile = ({ url, filePath, fileName }) => {
  const match = url.match(/^(http:\/\/?)(.+)\:(\d+)(.*)/)
  const [, , hostname, port, pathname] = match || []
  if (!hostname) return
  const options = {
    host: hostname,
    path: pathname + `?fileName=${fileName}`,
    port,
    method: 'POST',
    headers: {
      // 二进制文件没有特定或已知的 subtype，即使用 application/octet-stream
      'Content-Type': 'application/octet-stream',
      Connection: 'keep-alive',
      // 数据以一系列分块的形式进行发送
      'Transfer-Encoding': 'chunked'
    }
  }
  const req = request(options)
  fs.createReadStream(filePath)
    .on('data', chunk => {
      req.write(chunk)
    })
    .on('end', () => {
      req.end()
    })
}
