const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core')
const app = express()
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
