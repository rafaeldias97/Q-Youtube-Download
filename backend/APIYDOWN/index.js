const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ytdl = require('ytdl-core')
const url = require('url')
const https = require('https')
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/info', (req, res) => {
  var URL = req.query.URL
  ytdl.getInfo(URL, (err, info) => {
    if (err) throw err
    let format = ytdl.chooseFormat(info.formats, { quality: '134' })
    if (format) {
      res.json(info.formats)
    } else {
      res.json("Formato não encontrado")
    }
  })
})

app.post('/download', (req, res, next) => {
  let URL = req.body.URL
  let Format = req.body.Format
  let file = ytdl(URL, { format: Format })

  file.on('info', function (info) {
    let formats = info.formats.slice()
    formats.unshift(Format)
    function tryNextFormat () {
      let format = formats.shift()
      if (!format) {
        return
      }
      let parsed = url.parse(format.url)
      parsed.method = 'HEAD'
      https.request(parsed, (response) => {
        res.set({
          'Content-Length': parseInt(response.headers['content-length'])
        })
        file.pipe(res)
      }).end()
    }
    tryNextFormat()
  })
})

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`)
})