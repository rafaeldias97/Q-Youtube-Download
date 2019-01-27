const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core')
const app = express()
const url = require('url')
const https = require('https')
app.use(cors())
app.listen(4000, () => {
  console.log('Server Works !!! At port 4000')
})
app.get('/downloadmp4', (req, res) => {
  try {
    var URL = req.query.URL
    res.header('Content-Disposition', 'attachment; filename="video.mp4"')
    ytdl(URL, {
      format: 'mp4'
    }).pipe(res)
  } catch (e) {
    console.log('Ocorreu um erro', e)
  }
})

app.get('/downloadmp3', (req, res) => {
  try {
    var URL = req.query.URL
    res.header('Content-Disposition', 'attachment; filename="audio.mp3"')
    ytdl(URL, {
      format: 'mp3'
    }).pipe(res)
  } catch (e) {
    console.log('Ocorreu um erro', e)
  }
})

app.get('/download-audio', (req, res, next) => {
  var URL = req.query.URL
  var audio = ytdl(URL, { format: 'mp3' })// youtube audio downloader

  ytdl.getInfo(URL, (err, info) => {
    if (err) throw err
    let format = ytdl.chooseFormat(info.formats, { quality: '134' })
    if (format) {
      // console.log(info);
    }
  })

  audio.on('info', function (info) {
    var formats = info.formats.slice()
    function tryNextFormat () {
      var format = formats.shift()
      if (!format) {
        // console.log('No format foudn within the limit');
        return
      }
      var parsed = url.parse(format.url)
      parsed.method = 'HEAD' // We only want headers to get the filesize
      https.request(parsed, (response) => {
        res.set({
          // 'Content-Type': 'text/plain',
          'Content-Length': parseInt(response.headers['content-length'])
          // 'ETag': '12345'
        })
        console.log(parseInt(response.headers['content-length']))
        console.log(res.headers)
        audio.pipe(res)
      }).end()
    }
    tryNextFormat()
  })
})
