const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core')
const app = express()
const url = require('url')
const https = require('https')
const port = process.env.PORT || 4000
app.use(cors())
app.listen(port, () => {
  console.log('Server Works !!! At port ' + port)
})

app.get('/download', (req, res, next) => {
  var URL = req.query.URL
  var Format = req.query.Format || 'mp4'
  var audio = ytdl(URL, { format: Format })// youtube audio downloader

  ytdl.getInfo(URL, (err, info) => {
    if (err) throw err
    let format = ytdl.chooseFormat(info.formats, { quality: '134' })
    if (format) {
      console.log(info)
    }
  })

  audio.on('info', function (info) {
    var formats = info.formats.slice()
    function tryNextFormat () {
      var format = formats.shift()
      if (!format) {
        return
      }
      var parsed = url.parse(format.url)
      parsed.method = 'HEAD'
      https.request(parsed, (response) => {
        res.set({
          'Content-Length': parseInt(response.headers['content-length'])
        })
        audio.pipe(res)
      }).end()
    }
    tryNextFormat()
  })
})
